import express from 'express';
import portfolioRoutes from './api/routes/portfolio.routes.js';

const app = express();

app.use(express.json());
app.use('/api/portfolio', portfolioRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'InsightX Backend',
    timestamp: new Date().toISOString(),
  });
});

export default app;
