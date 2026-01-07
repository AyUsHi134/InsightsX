import pool from '../config/db.js';

const getCashFlows = async (portfolioId) => {
  const result = await pool.query(
    `
    SELECT
      transaction_date,
      SUM(
        CASE
          WHEN transaction_type = 'buy'  THEN -(quantity * price)
          WHEN transaction_type = 'sell' THEN  (quantity * price)
        END
      ) AS cash_flow
    FROM transactions
    WHERE portfolio_id = $1
    GROUP BY transaction_date
    ORDER BY transaction_date
    `,
    [portfolioId]
  );

  return result.rows.map(r => ({
    date: new Date(r.transaction_date),
    amount: Number(r.cash_flow),
  }));
};

/*XIRR calculation */
const calculateXIRR = (cashFlows) => {
  if (cashFlows.length < 2) return null;

  const daysBetween = (d1, d2) =>
    (d2 - d1) / (1000 * 60 * 60 * 24);

  const startDate = cashFlows[0].date;

  let rate = 0.1;
  const maxIterations = 100;
  const tolerance = 1e-6;

  for (let i = 0; i < maxIterations; i++) {
    let f = 0;
    let df = 0;

    for (const cf of cashFlows) {
      const days = daysBetween(startDate, cf.date);
      const frac = days / 365;
      f += cf.amount / Math.pow(1 + rate, frac);
      df += (-frac * cf.amount) / Math.pow(1 + rate, frac + 1);
    }

    const newRate = rate - f / df;
    if (Math.abs(newRate - rate) < tolerance) {
      return newRate;
    }
    rate = newRate;
  }

  return null;
};

export const getPortfolioXIRR = async (portfolioId) => {
  const cashFlows = await getCashFlows(portfolioId);

  if (cashFlows.length === 0) {
    return {
      xirr_percent: null,
      total_invested: 0,
      total_withdrawn: 0,
      net_cash_flow: 0,
    };
  }

  const invested = cashFlows
    .filter(c => c.amount < 0)
    .reduce((s, c) => s + Math.abs(c.amount), 0);

  const withdrawn = cashFlows
    .filter(c => c.amount > 0)
    .reduce((s, c) => s + c.amount, 0);

  const xirr = calculateXIRR(cashFlows);

  return {
    xirr_percent: xirr === null ? null : Number((xirr * 100).toFixed(2)),
    total_invested: Number(invested.toFixed(2)),
    total_withdrawn: Number(withdrawn.toFixed(2)),
    net_cash_flow: Number((withdrawn - invested).toFixed(2)),
  };
};
