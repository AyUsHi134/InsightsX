import express from 'express';
import { getPortfolioHistory } from '../../services/portfolio.history.service.js';

const router = express.Router();

router.get('/:id/history', async (req, res) => {
  try {
    const history = await getPortfolioHistory(req.params.id);
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
