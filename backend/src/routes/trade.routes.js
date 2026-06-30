import express from 'express';
import * as tradeController from '../controllers/trade.controller.js';
import authMiddleware from '../middlewares/auth.js';
import { tradeLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// All trade routes require authentication
router.use(authMiddleware);

// Apply trade rate limiter to prevent duplicate/spam execution
router.post('/execute', tradeLimiter, tradeController.execute);
router.get('/history', tradeController.getHistory);

export default router;
