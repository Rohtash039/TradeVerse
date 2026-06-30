import mongoose from 'mongoose';
import { DEFAULT_BALANCE } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  displayName: { type: String, default: '' },
  balance: { type: Number, default: DEFAULT_BALANCE, min: 0 },
  lockedBalance: { type: Number, default: 0, min: 0 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  settings: {
    currency: { type: String, default: 'USD' },
    theme: { type: String, default: 'dark' },
    notifications: { type: Boolean, default: true },
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
