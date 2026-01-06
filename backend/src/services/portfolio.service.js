import pool from '../config/db.js';

/*Create portfolio*/
export const createPortfolio = async (name) => {
  const USER_ID = '00000000-0000-0000-0000-000000000001';

  const result = await pool.query(
    `
    INSERT INTO portfolios (user_id, name)
    VALUES ($1, $2)
    RETURNING portfolio_id, name, created_at
    `,
    [USER_ID, name]
  );

  return result.rows[0];
};

/*transaction (BUY or SELL)*/
export const addTransaction = async (portfolioId, data) => {
  const {
    instrument_id,
    transaction_type,
    quantity,
    price,
    transaction_date,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO transactions
      (portfolio_id, instrument_id, transaction_type, quantity, price, transaction_date)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      portfolioId,
      instrument_id,
      transaction_type,
      quantity,
      price,
      transaction_date,
    ]
  );

  return result.rows[0];
};

/*holdings from transactions*/
export const getPortfolioHoldings = async (portfolioId) => {
  const result = await pool.query(
    `
    SELECT
      i.instrument_id,allocation
      i.symbol,
      SUM(
        CASE
          WHEN t.transaction_type = 'buy' THEN t.quantity
          WHEN t.transaction_type = 'sell' THEN -t.quantity
        END
      ) AS net_quantity,
      MAX(p.close) AS current_price
    FROM transactions t
    JOIN instruments i ON i.instrument_id = t.instrument_id
    LEFT JOIN price_daily p
      ON p.instrument_id = i.instrument_id
    WHERE t.portfolio_id = $1
    GROUP BY i.instrument_id, i.symbol
    HAVING SUM(
      CASE
        WHEN t.transaction_type = 'buy' THEN t.quantity
        WHEN t.transaction_type = 'sell' THEN -t.quantity
      END
    ) > 0
    ORDER BY i.symbol
    `,
    [portfolioId]
  );

  return result.rows.map((row) => {
    const quantity = Number(row.net_quantity);
    const price = Number(row.current_price || 0);

    return {
      instrument_id: row.instrument_id,
      symbol: row.symbol,
      quantity,
      current_price: price,
      current_value: quantity * price,
    };
  });
};

/*Portfolio summary*/
export const getPortfolioSummary = async (portfolioId) => {
  const holdings = await getPortfolioHoldings(portfolioId);

  const totalValue = holdings.reduce(
    (sum, h) => sum + h.current_value,
    0
  );

  return {
    total_value: totalValue,
    holdings_count: holdings.length,
  };
};

/*Allocation by instrument*/
export const getPortfolioAllocation = async (portfolioId) => {
  const holdings = await getPortfolioHoldings(portfolioId);

  const total = holdings.reduce(
    (sum, h) => sum + h.current_value,
    0
  );

  return holdings.map((h) => ({
    instrument_id: h.instrument_id,
    symbol: h.symbol,
    allocation_percent:
      total === 0 ? 0 : (h.current_value / total) * 100,
  }));
};
