import express from 'express';
import portfolioRoutes from './api/routes/portfolio.routes.js';
import portfolioPnlRoutes from './api/routes/portfolio.pnl.routes.js';
import portfolioXirrRoutes from './api/routes/portfolio.xirr.routes.js';

const app = express();

app.use(express.json());
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/portfolio', portfolioPnlRoutes);
app.use('/api/portfolio', portfolioXirrRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'InsightX Backend',
    timestamp: new Date().toISOString(),
  });
});

export default app;
