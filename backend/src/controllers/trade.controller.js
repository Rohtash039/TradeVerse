import User from '../models/User.js';
import Trade from '../models/Trade.js';
import * as tradeService from '../services/trade.service.js';
import { executeTradeSchema, tradeHistorySchema } from '../validators/trade.validator.js';
import { success } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';

export async function execute(req, res, next) {
  try {
    const { error, value } = executeTradeSchema.validate(req.body);
    if (error) throw AppError.badRequest(error.details[0].message);

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    const result = await tradeService.executeTrade(user._id, value);
    return success(res, result, 'Trade executed successfully');
  } catch (err) { next(err); }
}

export async function getHistory(req, res, next) {
  try {
    const { error, value } = tradeHistorySchema.validate(req.query);
    if (error) throw AppError.badRequest(error.details[0].message);

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    const { limit, offset } = value;
    const [trades, total] = await Promise.all([
      Trade.find({ userId: user._id }).sort({ createdAt: -1 }).skip(offset).limit(limit),
      Trade.countDocuments({ userId: user._id }),
    ]);

    return success(res, { trades, total, limit, offset });
  } catch (err) { next(err); }
}
