import mongoose from 'mongoose';

const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  symbol: { type: String, required: true, uppercase: true },
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  avgBuyPrice: { type: Number, required: true, min: 0 },
  leverage: { type: Number, default: 1, min: 1, max: 100 },
  marginUsed: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

holdingSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export default mongoose.model('Holding', holdingSchema);
