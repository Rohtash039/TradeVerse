import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';
import { addSymbolSchema } from '../validators/watchlist.validator.js';
import { success } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';
import { SUPPORTED_COINS } from '../utils/constants.js';

export async function getWatchlist(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');
    let watchlist = await Watchlist.findOne({ userId: user._id });
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId: user._id });
    } else {
      // Auto-backfill: add any missing supported coins
      const missing = SUPPORTED_COINS.filter(c => !watchlist.symbols.includes(c));
      if (missing.length > 0) {
        watchlist = await Watchlist.findOneAndUpdate(
          { userId: user._id },
          { $addToSet: { symbols: { $each: missing } } },
          { new: true }
        );
      }
    }
    return success(res, { symbols: watchlist.symbols });
  } catch (err) { next(err); }
}

export async function addSymbol(req, res, next) {
  try {
    const { error, value } = addSymbolSchema.validate(req.body);
    if (error) throw AppError.badRequest(error.details[0].message);

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    const watchlist = await Watchlist.findOneAndUpdate(
      { userId: user._id },
      { $addToSet: { symbols: value.symbol } },
      { new: true, upsert: true }
    );
    return success(res, { symbols: watchlist.symbols });
  } catch (err) { next(err); }
}

export async function removeSymbol(req, res, next) {
  try {
    const { symbol } = req.params;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    const watchlist = await Watchlist.findOneAndUpdate(
      { userId: user._id },
      { $pull: { symbols: symbol.toLowerCase() } },
      { new: true }
    );
    return success(res, { symbols: watchlist?.symbols || [] });
  } catch (err) { next(err); }
}
