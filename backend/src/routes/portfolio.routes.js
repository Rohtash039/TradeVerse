import express from 'express';
import * as portfolioController from '../controllers/portfolio.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// All portfolio routes require authentication
router.use(authMiddleware);

router.get('/', portfolioController.getPortfolio);
router.get('/holdings', portfolioController.getHoldings);
router.get('/allocation', portfolioController.getAllocation);
router.get('/performance', portfolioController.getPerformance);

export default router;

