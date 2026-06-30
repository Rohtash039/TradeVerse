import express from 'express';
import * as transactionController from '../controllers/transaction.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Requiring authentication for transaction endpoints
router.use(authMiddleware);

router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);

export default router;
