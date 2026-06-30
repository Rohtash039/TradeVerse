import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  symbol: { type: String, required: true, uppercase: true },
  coinId: { type: String, required: true },
  action: { type: String, enum: ['buy', 'sell'], required: true },
  orderType: { type: String, enum: ['market', 'limit'], default: 'market' },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true },
  leverage: { type: Number, default: 1, min: 1, max: 100 },
  marginUsed: { type: Number, default: 0, min: 0 },
  fee: { type: Number, default: 0 },
  pnl: { type: Number, default: 0 },
  status: { type: String, enum: ['completed', 'pending', 'cancelled', 'failed'], default: 'completed' },
  executedAt: { type: Date, default: Date.now },
}, { timestamps: true });

tradeSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Trade', tradeSchema);
