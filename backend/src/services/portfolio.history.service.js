import pool from '../config/db.js';

export const getPortfolioHistory = async (portfolioId) => {
  const result = await pool.query(
    `
    WITH transaction_days AS (
      SELECT DISTINCT transaction_date::date AS date
      FROM transactions
      WHERE portfolio_id = $1
    ),
    holdings_by_date AS (
      SELECT
        d.date,
        t.instrument_id,
        SUM(
          CASE
            WHEN t.transaction_type = 'buy'  THEN t.quantity
            WHEN t.transaction_type = 'sell' THEN -t.quantity
          END
        ) AS net_quantity
      FROM transaction_days d
      JOIN transactions t
        ON t.transaction_date <= d.date
       AND t.portfolio_id = $1
      GROUP BY d.date, t.instrument_id
      HAVING SUM(
        CASE
          WHEN t.transaction_type = 'buy'  THEN t.quantity
          WHEN t.transaction_type = 'sell' THEN -t.quantity
        END
      ) > 0
    )
    SELECT
      h.date,
      SUM(h.net_quantity * p.close) AS total_value
    FROM holdings_by_date h
    JOIN price_daily p
      ON p.instrument_id = h.instrument_id
     AND p.trade_date = h.date
    GROUP BY h.date
    ORDER BY h.date
    `,
    [portfolioId]
  );

  return result.rows.map(row => ({
    date: row.date,
    total_value: Number(row.total_value),
  }));
};
