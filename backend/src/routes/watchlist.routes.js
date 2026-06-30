import express from 'express';
import * as watchlistController from '../controllers/watchlist.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Watchlist requires authentication
router.use(authMiddleware);

router.get('/', watchlistController.getWatchlist);
router.post('/', watchlistController.addSymbol);
router.delete('/:symbol', watchlistController.removeSymbol);

export default router;
