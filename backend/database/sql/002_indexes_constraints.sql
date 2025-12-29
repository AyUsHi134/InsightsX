
-- ---------- INSTRUMENT LOOKUPS ----------
CREATE INDEX idx_instruments_symbol
    ON instruments(symbol);

CREATE INDEX idx_instruments_type
    ON instruments(instrument_type);

CREATE INDEX idx_instruments_exchange
    ON instruments(exchange_id);

-- ---------- PRICE TIME-SERIES ----------
CREATE INDEX idx_price_daily_instrument_date
    ON price_daily(instrument_id, trade_date DESC);

CREATE INDEX idx_price_daily_trade_date
    ON price_daily(trade_date);

-- ---------- NAV TIME-SERIES ----------
CREATE INDEX idx_nav_daily_instrument_date
    ON nav_daily(instrument_id, nav_date DESC);

CREATE INDEX idx_nav_daily_nav_date
    ON nav_daily(nav_date);

-- ---------- FINANCIAL DATA ----------
CREATE INDEX idx_financial_statements_instrument_year
    ON financial_statements(instrument_id, fiscal_year);

CREATE INDEX idx_financial_ratios_instrument_year
    ON financial_ratios(instrument_id, fiscal_year);

-- ---------- INTELLIGENCE TABLES ----------
CREATE INDEX idx_market_intelligence_date
    ON market_intelligence(trade_date);

CREATE INDEX idx_instrument_intelligence_instrument_date
    ON instrument_intelligence(instrument_id, trade_date DESC);

CREATE INDEX idx_peer_rankings_category_date
    ON peer_rankings(category_id, trade_date);

-- ---------- PORTFOLIO ----------
CREATE INDEX idx_portfolios_user
    ON portfolios(user_id);

CREATE INDEX idx_transactions_portfolio_date
    ON transactions(portfolio_id, transaction_date);

CREATE INDEX idx_transactions_instrument
    ON transactions(instrument_id);
