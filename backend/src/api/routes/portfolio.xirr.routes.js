import express from 'express';
import { getPortfolioXIRR } from '../../services/portfolio.xirr.service.js';

const router = express.Router();

router.get('/:id/xirr', async (req, res) => {
  try {
    const data = await getPortfolioXIRR(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
