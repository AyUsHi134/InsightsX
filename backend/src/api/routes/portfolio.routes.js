import express from 'express';
import {
  createPortfolio,
  addTransaction,
  getPortfolioHoldings,
  getPortfolioSummary,
  getPortfolioAllocation
} from '../../services/portfolio.service.js';

const router = express.Router();

/**
 * CREATE PORTFOLIO
 */
router.post('/', async (req, res) => {
  try {
    const portfolio = await createPortfolio(req.body.name);
    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * ADD TRANSACTION
 */
router.post('/:id/transactions', async (req, res) => {
  try {
    const transaction = await addTransaction(req.params.id, req.body);
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * HOLDINGS
 */
router.get('/:id/holdings', async (req, res) => {
  try {
    const holdings = await getPortfolioHoldings(req.params.id);
    res.json({ success: true, data: holdings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * SUMMARY
 */
router.get('/:id/summary', async (req, res) => {
  try {
    const summary = await getPortfolioSummary(req.params.id);
    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * ALLOCATION
 */
router.get('/:id/allocation', async (req, res) => {
  try {
    const allocation = await getPortfolioAllocation(req.params.id);
    res.json({ success: true, data: allocation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
