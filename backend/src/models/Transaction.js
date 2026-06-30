import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['buy', 'sell', 'deposit', 'withdraw', 'fee'], required: true },
  asset: { type: String, required: true },
  amount: { type: String, required: true },
  value: { type: Number, required: true },
  tradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade', default: null },
  status: { type: String, enum: ['completed', 'pending'], default: 'completed' },
}, { timestamps: true });

transactionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Transaction', transactionSchema);
