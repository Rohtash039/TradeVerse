import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { success } from '../utils/apiResponse.js';
import { updateProfileSchema } from '../validators/user.validator.js';
import AppError from '../utils/AppError.js';

export async function getProfile(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');
    return success(res, { profile: user });
  } catch (err) { next(err); }
}

export async function updateProfile(req, res, next) {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) throw AppError.badRequest(error.details[0].message);

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $set: value },
      { new: true, runValidators: true }
    );
    if (!user) throw AppError.notFound('User not found');
    return success(res, { profile: user });
  } catch (err) { next(err); }
}

export async function deposit(req, res, next) {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) throw AppError.badRequest('Amount must be positive');

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    user.balance += Number(amount);
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: 'deposit',
      asset: 'USD',
      amount: `+${Number(amount).toFixed(2)} USD`,
      value: Number(amount),
      status: 'completed',
    });

    return success(res, { balance: user.balance }, 'Deposit successful');
  } catch (err) { next(err); }
}

export async function withdraw(req, res, next) {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) throw AppError.badRequest('Amount must be positive');

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) throw AppError.notFound('User not found');

    if (user.balance < amount) {
      throw AppError.badRequest(`Insufficient balance to withdraw $${amount}`);
    }

    user.balance -= Number(amount);
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: 'withdraw',
      asset: 'USD',
      amount: `-${Number(amount).toFixed(2)} USD`,
      value: Number(amount),
      status: 'completed',
    });

    return success(res, { balance: user.balance }, 'Withdrawal successful');
  } catch (err) { next(err); }
}
