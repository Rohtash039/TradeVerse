import express from 'express';
import * as marketController from '../controllers/market.controller.js';

const router = express.Router();

router.get('/quotes', marketController.getQuotes);
router.get('/quote/:symbol', marketController.getQuote);
router.get('/trending', marketController.getTrending);
router.get('/global', marketController.getGlobal);

export default router;
