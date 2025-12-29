
-- ---------- EXCHANGES ----------
INSERT INTO exchanges (code, country, timezone)
VALUES
    ('NSE', 'India', 'Asia/Kolkata'),
    ('BSE', 'India', 'Asia/Kolkata'),
    ('NASDAQ', 'USA', 'America/New_York')
ON CONFLICT (code) DO NOTHING;

-- ---------- MARKET INDICES ----------
-- NIFTY 50
INSERT INTO instruments (
    instrument_type,
    symbol,
    name,
    exchange_id,
    currency,
    sector
)
SELECT
    'index',
    '^NSEI',
    'NIFTY 50',
    exchange_id,
    'INR',
    'Market'
FROM exchanges
WHERE code = 'NSE'
ON CONFLICT DO NOTHING;

-- SENSEX
INSERT INTO instruments (
    instrument_type,
    symbol,
    name,
    exchange_id,
    currency,
    sector
)
SELECT
    'index',
    '^BSESN',
    'SENSEX',
    exchange_id,
    'INR',
    'Market'
FROM exchanges
WHERE code = 'BSE'
ON CONFLICT DO NOTHING;

-- ---------- MUTUAL FUND CATEGORIES (CORE SET) ----------
INSERT INTO mf_categories (category_name, asset_class)
VALUES
    ('Large Cap Equity', 'Equity'),
    ('Mid Cap Equity', 'Equity'),
    ('Small Cap Equity', 'Equity'),
    ('Flexi Cap Equity', 'Equity'),
    ('Hybrid Fund', 'Hybrid'),
    ('Debt Fund', 'Debt'),
    ('Index Fund', 'Equity')
ON CONFLICT DO NOTHING;
