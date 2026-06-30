import User from '../models/User.js';
import { getPortfolioSummary, getAssetAllocation, getPortfolioPerformance } from '../services/portfolio.service.js';
import { success } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';

export async function getPortfolio(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');
    const portfolio = await getPortfolioSummary(user._id);
    return success(res, { portfolio });
  } catch (err) { next(err); }
}

export async function getHoldings(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');
    const { holdings } = await getPortfolioSummary(user._id);
    return success(res, { holdings });
  } catch (err) { next(err); }
}

export async function getAllocation(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');
    const data = await getAssetAllocation(user._id);
    return success(res, data);
  } catch (err) { next(err); }
}

export async function getPerformance(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');
    const performance = await getPortfolioPerformance(user._id, req.query.range);
    return success(res, { performance });
  } catch (err) { next(err); }
}
