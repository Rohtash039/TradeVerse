import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { success } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';

export async function getTransactions(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;

    const [transactions, total] = await Promise.all([
      Transaction.find({ userId: user._id }).sort({ createdAt: -1 }).skip(offset).limit(limit),
      Transaction.countDocuments({ userId: user._id }),
    ]);

    return success(res, { transactions, total, limit, offset });
  } catch (err) {
    next(err);
  }
}

export async function getTransactionById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    const transaction = await Transaction.findOne({ _id: id, userId: user._id });
    if (!transaction) throw AppError.notFound('Transaction not found');

    return success(res, { transaction });
  } catch (err) {
    next(err);
  }
}
