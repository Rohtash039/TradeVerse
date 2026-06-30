import User from '../models/User.js';
import Holding from '../models/Holding.js';
import Trade from '../models/Trade.js';
import Transaction from '../models/Transaction.js';
import AppError from '../utils/AppError.js';
import { TRADE_FEE_PERCENT, SYMBOL_TO_COINGECKO } from '../utils/constants.js';

/**
 * Execute a BUY or SELL trade.
 * ALL financial logic lives here on the server - never trust the client.
 */
export async function executeTrade(userId, { symbol, quantity, action, orderType, price, leverage = 1 }) {
  const user = await User.findById(userId);
  if (!user) throw AppError.notFound('User not found');

  const normalizedLeverage = Math.min(Math.max(Number(leverage) || 1, 1), 100);
  const total = quantity * price;
  const fee = total * TRADE_FEE_PERCENT;
  const marginUsed = total / normalizedLeverage;
  const coinId = SYMBOL_TO_COINGECKO[symbol] || symbol.toLowerCase();

  if (action === 'buy') {
    return executeBuy(user, {
      symbol,
      coinId,
      quantity,
      price,
      total,
      fee,
      marginUsed,
      leverage: normalizedLeverage,
      orderType,
    });
  }

  return executeSell(user, { symbol, coinId, quantity, price, total, fee, orderType });
}

async function executeBuy(user, { symbol, coinId, quantity, price, total, fee, marginUsed, leverage, orderType }) {
  const requiredBalance = marginUsed + fee;
  if (user.balance < requiredBalance) {
    throw AppError.badRequest(
      `Insufficient balance. Required margin: $${requiredBalance.toFixed(2)}, Available: $${user.balance.toFixed(2)}`,
      'INSUFFICIENT_BALANCE'
    );
  }

  user.balance -= requiredBalance;
  await user.save();

  let holding = await Holding.findOne({ userId: user._id, symbol });
  if (holding) {
    const totalQty = holding.quantity + quantity;
    const totalMargin = (holding.marginUsed || 0) + marginUsed;
    holding.avgBuyPrice = ((holding.avgBuyPrice * holding.quantity) + (price * quantity)) / totalQty;
    holding.quantity = totalQty;
    holding.marginUsed = totalMargin;
    holding.leverage = totalMargin > 0 ? Math.round((holding.avgBuyPrice * totalQty) / totalMargin) : leverage;
    await holding.save();
  } else {
    const coinName = coinId.charAt(0).toUpperCase() + coinId.slice(1);
    holding = await Holding.create({
      userId: user._id,
      symbol,
      coinId,
      name: coinName,
      quantity,
      avgBuyPrice: price,
      leverage,
      marginUsed,
    });
  }

  const trade = await Trade.create({
    userId: user._id,
    symbol,
    coinId,
    action: 'buy',
    orderType,
    quantity,
    price,
    total,
    leverage,
    marginUsed,
    fee,
    status: 'completed',
  });

  await Transaction.create({
    userId: user._id,
    type: 'buy',
    asset: symbol,
    amount: `+${quantity} ${symbol}`,
    value: marginUsed + fee,
    tradeId: trade._id,
    status: 'completed',
  });

  return {
    trade: {
      id: trade._id,
      symbol,
      action: 'buy',
      quantity,
      price,
      total,
      leverage,
      marginUsed,
      fee,
      status: 'completed',
    },
    balance: user.balance,
    holding: {
      symbol,
      quantity: holding.quantity,
      avgBuyPrice: holding.avgBuyPrice,
      leverage: holding.leverage,
      marginUsed: holding.marginUsed,
    },
  };
}

async function executeSell(user, { symbol, coinId, quantity, price, total, fee, orderType }) {
  const holding = await Holding.findOne({ userId: user._id, symbol });
  if (!holding || holding.quantity < quantity) {
    const available = holding?.quantity || 0;
    throw AppError.badRequest(
      `Insufficient holdings. Requested: ${quantity} ${symbol}, Available: ${available}`,
      'INSUFFICIENT_HOLDINGS'
    );
  }

  const closeRatio = quantity / holding.quantity;
  const releasedMargin = (holding.marginUsed || total) * closeRatio;
  const leverage = holding.leverage || 1;
  const pnl = (price - holding.avgBuyPrice) * quantity;
  const balanceChange = releasedMargin + pnl - fee;

  if (user.balance + balanceChange < 0) {
    throw AppError.badRequest(
      `Trade loss exceeds available balance. Required: $${Math.abs(balanceChange).toFixed(2)}, Available: $${user.balance.toFixed(2)}`,
      'INSUFFICIENT_BALANCE'
    );
  }

  user.balance += balanceChange;
  await user.save();

  holding.quantity -= quantity;
  holding.marginUsed = Math.max((holding.marginUsed || 0) - releasedMargin, 0);
  if (holding.quantity <= 0) {
    await Holding.deleteOne({ _id: holding._id });
  } else {
    await holding.save();
  }

  const trade = await Trade.create({
    userId: user._id,
    symbol,
    coinId,
    action: 'sell',
    orderType,
    quantity,
    price,
    total,
    leverage,
    marginUsed: releasedMargin,
    fee,
    pnl,
    status: 'completed',
  });

  await Transaction.create({
    userId: user._id,
    type: 'sell',
    asset: symbol,
    amount: `-${quantity} ${symbol}`,
    value: Math.max(balanceChange, 0),
    tradeId: trade._id,
    status: 'completed',
  });

  return {
    trade: {
      id: trade._id,
      symbol,
      action: 'sell',
      quantity,
      price,
      total,
      leverage,
      marginUsed: releasedMargin,
      fee,
      pnl,
      status: 'completed',
    },
    balance: user.balance,
  };
}