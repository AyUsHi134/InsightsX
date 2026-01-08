import pool from '../config/db.js';

export const getPortfolioPnL = async (portfolioId) => {
  const result = await pool.query(
    `
    SELECT
      i.instrument_id,
      i.symbol,

      -- Net quantity held
      SUM(
        CASE
          WHEN t.transaction_type = 'buy'  THEN t.quantity
          WHEN t.transaction_type = 'sell' THEN -t.quantity
        END
      ) AS net_quantity,

      -- Average buy price
      SUM(
        CASE
          WHEN t.transaction_type = 'buy'
          THEN t.quantity * t.price
          ELSE 0
        END
      ) / NULLIF(
        SUM(CASE WHEN t.transaction_type = 'buy' THEN t.quantity END),
        0
      ) AS avg_buy_price,

      -- Latest available price
      MAX(p.close) AS current_price

    FROM transactions t
    JOIN instruments i
      ON i.instrument_id = t.instrument_id
    LEFT JOIN price_daily p
      ON p.instrument_id = i.instrument_id

    WHERE t.portfolio_id = $1

    GROUP BY i.instrument_id, i.symbol

    HAVING
      SUM(
        CASE
          WHEN t.transaction_type = 'buy'  THEN t.quantity
          WHEN t.transaction_type = 'sell' THEN -t.quantity
        END
      ) > 0
    `,
    [portfolioId]
  );

  return result.rows.map(row => {
    const quantity = Number(row.net_quantity);
    const avgBuyPrice = Number(row.avg_buy_price || 0);
    const currentPrice = Number(row.current_price || 0);

    const investedValue = quantity * avgBuyPrice;
    const currentValue = quantity * currentPrice;
    const pnl = currentValue - investedValue;

    return {
      instrument_id: row.instrument_id,
      symbol: row.symbol,
      quantity,
      avg_buy_price: avgBuyPrice,
      current_price: currentPrice,
      invested_value: investedValue,
      current_value: currentValue,
      pnl,
      pnl_percent: investedValue === 0 ? 0 : (pnl / investedValue) * 100,
    };
  });
};

export const getPortfolioRealizedPnL = async (portfolioId) => {
  const result = await pool.query(
    `
    SELECT
      i.instrument_id,
      i.symbol,
      SUM(
        CASE
          WHEN t.transaction_type = 'sell'
          THEN t.quantity * (t.price -
            (
              SELECT
                SUM(tb.quantity * tb.price) /
                NULLIF(SUM(tb.quantity), 0)
              FROM transactions tb
              WHERE tb.portfolio_id = t.portfolio_id
                AND tb.instrument_id = t.instrument_id
                AND tb.transaction_type = 'buy'
                AND tb.transaction_date <= t.transaction_date
            )
          )
          ELSE 0
        END
      ) AS realized_pnl
    FROM transactions t
    JOIN instruments i ON i.instrument_id = t.instrument_id
    WHERE t.portfolio_id = $1
    GROUP BY i.instrument_id, i.symbol
    `,
    [portfolioId]
  );

  return result.rows.map(r => ({
    instrument_id: r.instrument_id,
    symbol: r.symbol,
    realized_pnl: Number(r.realized_pnl || 0),
  }));
};

export const getPortfolioPnLSummary = async (portfolioId) => {
  const unrealized = await getPortfolioPnL(portfolioId);
  const realized = await getPortfolioRealizedPnL(portfolioId);

  const unrealizedPnl = unrealized.reduce((s, i) => s + i.pnl, 0);
  const invested = unrealized.reduce((s, i) => s + i.invested_value, 0);
  const current = unrealized.reduce((s, i) => s + i.current_value, 0);
  const realizedPnl = realized.reduce((s, r) => s + r.realized_pnl, 0);

  return {
    invested_value: invested,
    current_value: current,
    unrealized_pnl: unrealizedPnl,
    realized_pnl: realizedPnl,
    total_pnl: unrealizedPnl + realizedPnl,
  };
};

