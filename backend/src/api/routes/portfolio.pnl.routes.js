import express from 'express';
import { getPortfolioPnL } from '../../services/portfolio.pnl.service.js';
import { getPortfolioRealizedPnL } from '../../services/portfolio.pnl.service.js';
import { getPortfolioPnLSummary } from '../../services/portfolio.pnl.service.js';

const router = express.Router();

router.get('/:id/pnl', async (req, res) => {
  try {
    const pnl = await getPortfolioPnL(req.params.id);
    res.status(200).json({
      success: true,
      data: pnl,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

router.get('/:id/pnl/realized', async (req, res) => {
  try {
    const data = await getPortfolioRealizedPnL(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/:id/pnl/summary', async (req, res) => {
  try {
    const data = await getPortfolioPnLSummary(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
