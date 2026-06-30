import mongoose from 'mongoose';
import { MAX_WATCHLIST_SIZE, SUPPORTED_COINS } from '../utils/constants.js';

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  symbols: {
    type: [String],
    default: () => [...SUPPORTED_COINS],
    validate: [arr => arr.length <= MAX_WATCHLIST_SIZE, `Watchlist cannot exceed ${MAX_WATCHLIST_SIZE} items`],
  },
}, { timestamps: true });

export default mongoose.model('Watchlist', watchlistSchema);
