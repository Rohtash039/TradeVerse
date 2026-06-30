import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import portfolioRoutes from './portfolio.routes.js';
import tradeRoutes from './trade.routes.js';
import watchlistRoutes from './watchlist.routes.js';
import marketRoutes from './market.routes.js';
import transactionRoutes from './transaction.routes.js';
import newsRoutes from './news.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/trades', tradeRoutes);
router.use('/watchlist', watchlistRoutes);
router.use('/market', marketRoutes);
router.use('/transactions', transactionRoutes);
router.use('/news', newsRoutes);

export default router;
