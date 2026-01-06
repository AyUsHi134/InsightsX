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
