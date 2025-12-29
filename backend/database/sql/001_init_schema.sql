
-- ---------- EXTENSIONS ----------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------- ENUM TYPES ----------
CREATE TYPE instrument_type_enum AS ENUM (
    'stock',
    'index',
    'mutual_fund',
    'etf'
);

CREATE TYPE transaction_type_enum AS ENUM (
    'buy',
    'sell'
);

CREATE TYPE data_source_enum AS ENUM (
    'yahoo',
    'fmp',
    'amfi'
);

-- ---------- MASTER TABLES ----------

CREATE TABLE exchanges (
    exchange_id     BIGSERIAL PRIMARY KEY,
    code            VARCHAR(20) NOT NULL UNIQUE,
    country         VARCHAR(50) NOT NULL,
    timezone        VARCHAR(50) NOT NULL
);

CREATE TABLE instruments (
    instrument_id   BIGSERIAL PRIMARY KEY,
    instrument_type instrument_type_enum NOT NULL,
    symbol          VARCHAR(50) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    exchange_id     BIGINT REFERENCES exchanges(exchange_id),
    currency        VARCHAR(10) NOT NULL,
    sector          VARCHAR(100),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE mf_categories (
    category_id     BIGSERIAL PRIMARY KEY,
    category_name   VARCHAR(255) NOT NULL,
    asset_class     VARCHAR(50) NOT NULL
);

-- ---------- RAW TIME-SERIES DATA ----------

CREATE TABLE price_daily (
    price_id        BIGSERIAL PRIMARY KEY,
    instrument_id   BIGINT NOT NULL REFERENCES instruments(instrument_id),
    trade_date      DATE NOT NULL,
    open            NUMERIC(18,4),
    high            NUMERIC(18,4),
    low             NUMERIC(18,4),
    close           NUMERIC(18,4),
    volume          BIGINT,
    data_source     data_source_enum NOT NULL DEFAULT 'yahoo',
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (instrument_id, trade_date)
);

CREATE TABLE nav_daily (
    nav_id          BIGSERIAL PRIMARY KEY,
    instrument_id   BIGINT NOT NULL REFERENCES instruments(instrument_id),
    nav_date        DATE NOT NULL,
    nav_value       NUMERIC(18,4) NOT NULL,
    data_source     data_source_enum NOT NULL DEFAULT 'amfi',
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (instrument_id, nav_date)
);

-- ---------- FINANCIAL STATEMENTS ----------

CREATE TABLE financial_statements (
    statement_id    BIGSERIAL PRIMARY KEY,
    instrument_id   BIGINT NOT NULL REFERENCES instruments(instrument_id),
    statement_type  VARCHAR(20) NOT NULL,
    period_type     VARCHAR(20) NOT NULL,
    fiscal_year     INTEGER NOT NULL,
    fiscal_quarter  INTEGER,
    data            JSONB NOT NULL,
    data_source     data_source_enum NOT NULL DEFAULT 'fmp',
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE financial_ratios (
    ratio_id        BIGSERIAL PRIMARY KEY,
    instrument_id   BIGINT NOT NULL REFERENCES instruments(instrument_id),
    period_type     VARCHAR(20) NOT NULL,
    fiscal_year     INTEGER NOT NULL,
    ratios          JSONB NOT NULL,
    data_source     data_source_enum NOT NULL DEFAULT 'fmp',
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------- INTELLIGENCE / FEATURE STORE ----------

CREATE TABLE market_intelligence (
    market_intel_id BIGSERIAL PRIMARY KEY,
    trade_date      DATE NOT NULL,
    market_index_id BIGINT NOT NULL REFERENCES instruments(instrument_id),
    trend_label     VARCHAR(20),
    volatility_regime VARCHAR(50),
    risk_on_off     VARCHAR(20),
    metadata        JSONB,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (market_index_id, trade_date)
);

CREATE TABLE instrument_intelligence (
    instrument_intel_id BIGSERIAL PRIMARY KEY,
    instrument_id       BIGINT NOT NULL REFERENCES instruments(instrument_id),
    trade_date          DATE NOT NULL,
    momentum_score      NUMERIC(10,4),
    risk_score          NUMERIC(10,4),
    consistency_score   NUMERIC(10,4),
    max_drawdown        NUMERIC(10,4),
    rolling_returns     JSONB,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (instrument_id, trade_date)
);

CREATE TABLE peer_rankings (
    peer_rank_id    BIGSERIAL PRIMARY KEY,
    instrument_id   BIGINT NOT NULL REFERENCES instruments(instrument_id),
    category_id     BIGINT REFERENCES mf_categories(category_id),
    trade_date      DATE NOT NULL,
    percentile_rank NUMERIC(5,2),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (instrument_id, trade_date)
);

-- ---------- USERS & PORTFOLIOS ----------

CREATE TABLE users (
    user_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       VARCHAR(255) NOT NULL UNIQUE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE portfolios (
    portfolio_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID NOT NULL REFERENCES users(user_id),
    name         VARCHAR(255) NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE transactions (
    transaction_id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id     UUID NOT NULL REFERENCES portfolios(portfolio_id),
    instrument_id    BIGINT NOT NULL REFERENCES instruments(instrument_id),
    transaction_type transaction_type_enum NOT NULL,
    quantity          NUMERIC(18,6) NOT NULL,
    price             NUMERIC(18,4) NOT NULL,
    transaction_date  DATE NOT NULL,
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
