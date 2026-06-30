import Holding from '../models/Holding.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { getMarketQuotes } from './market.service.js';
import { DEFAULT_BALANCE } from '../utils/constants.js';

/**
 * Get full portfolio summary for a user.
 */
export async function getPortfolioSummary(userId) {
  const user = await User.findById(userId);
  const holdings = await Holding.find({ userId });

  // Fetch current prices for all held coins
  const coinIds = holdings.map(h => h.coinId);
  let priceMap = {};
  if (coinIds.length > 0) {
    const quotes = await getMarketQuotes(coinIds);
    priceMap = Object.fromEntries(quotes.map(q => [q.symbol, q.price]));
  }

  let portfolioValue = 0;
  let unrealizedPnl = 0;
  const enrichedHoldings = holdings.map(h => {
    const currentPrice = priceMap[h.symbol] || 0;
    const exposureValue = h.quantity * currentPrice;
    const pnl = (currentPrice - h.avgBuyPrice) * h.quantity;
    const marginUsed = h.marginUsed || (h.quantity * h.avgBuyPrice);
    const positionValue = marginUsed + pnl;
    const pnlPercent = marginUsed > 0 ? (pnl / marginUsed) * 100 : 0;
    portfolioValue += positionValue;
    unrealizedPnl += pnl;
    return {
      symbol: h.symbol, coinId: h.coinId, name: h.name,
      quantity: h.quantity, avgBuyPrice: h.avgBuyPrice,
      updatedAt: h.updatedAt, leverage: h.leverage || 1, marginUsed,
      currentPrice, currentValue: positionValue, exposureValue,
      pnl, pnlPercent: Math.round(pnlPercent * 100) / 100,
    };
  });

  const totalValue = user.balance + portfolioValue;

  return {
    totalValue,
    balance: user.balance,
    lockedBalance: user.lockedBalance,
    portfolioValue,
    unrealizedPnl,
    dailyPnlPercent: totalValue > 0 ? Math.round((unrealizedPnl / totalValue) * 10000) / 100 : 0,
    holdings: enrichedHoldings,
  };
}

/**
 * Get asset allocation percentages.
 */
export async function getAssetAllocation(userId) {
  const { holdings, balance, totalValue } = await getPortfolioSummary(userId);

  const allocations = holdings.map(h => ({
    name: `${h.name} (${h.symbol})`,
    value: h.currentValue,
    percent: totalValue > 0 ? Math.round((h.currentValue / totalValue) * 10000) / 100 : 0,
  }));

  // Add cash allocation
  if (balance > 0) {
    allocations.push({
      name: 'Cash (USD)',
      value: balance,
      percent: totalValue > 0 ? Math.round((balance / totalValue) * 10000) / 100 : 0,
    });
  }

  return { allocations, totalValue };
}

const PERFORMANCE_RANGES = {
  '7d': 7,
  '1m': 30,
  '3m': 90,
  '1y': 365,
  all: 730,
};

/**
 * Build a deterministic account-equity history from real user activity.
 * Historical intraday pricing is not stored, so open PnL is blended from the
 * first open holding date to today while realized events use their real dates.
 */
export async function getPortfolioPerformance(userId, range = '1m') {
  const days = PERFORMANCE_RANGES[range] || PERFORMANCE_RANGES['1m'];
  const [user, transactions, summary] = await Promise.all([
    User.findById(userId),
    Transaction.find({ userId, status: 'completed' })
      .populate('tradeId')
      .sort({ createdAt: 1 }),
    getPortfolioSummary(userId),
  ]);

  const now = new Date();
  const createdAt = user?.createdAt ? new Date(user.createdAt) : now;
  const requestedStart = new Date(now.getTime() - days * 86400000);
  const startDate = range === 'all'
    ? createdAt
    : new Date(Math.max(createdAt.getTime(), requestedStart.getTime()));

  const firstHoldingDate = summary.holdings.reduce((earliest, holding) => {
    if (!holding.updatedAt) return earliest;
    const date = new Date(holding.updatedAt);
    return earliest && earliest < date ? earliest : date;
  }, null);

  const points = [];
  const dayCount = Math.max(1, Math.ceil((now - startDate) / 86400000));

  for (let i = 0; i <= dayCount; i += 1) {
    const pointDate = new Date(startDate);
    pointDate.setDate(startDate.getDate() + i);
    pointDate.setHours(23, 59, 59, 999);

    let value = DEFAULT_BALANCE;

    transactions.forEach((tx) => {
      const txDate = new Date(tx.createdAt);
      if (txDate > pointDate) return;

      if (tx.type === 'deposit') value += tx.value;
      if (tx.type === 'withdraw') value -= tx.value;
      if (tx.type === 'buy') value -= tx.tradeId?.fee || 0;
      if (tx.type === 'sell') value += (tx.tradeId?.pnl || 0) - (tx.tradeId?.fee || 0);
      if (tx.type === 'fee') value -= tx.value;
    });

    if (firstHoldingDate && summary.unrealizedPnl) {
      const elapsed = Math.max(0, pointDate - firstHoldingDate);
      const span = Math.max(1, now - firstHoldingDate);
      value += summary.unrealizedPnl * Math.min(elapsed / span, 1);
    }

    points.push({
      date: pointDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(0, Math.round(value * 100) / 100),
    });
  }

  if (points.length) {
    points[points.length - 1].value = Math.round(summary.totalValue * 100) / 100;
  }

  const startValue = points[0]?.value || 0;
  const endValue = points[points.length - 1]?.value || 0;
  const change = endValue - startValue;
  const changePct = startValue > 0 ? (change / startValue) * 100 : 0;

  return {
    range,
    points,
    change: Math.round(change * 100) / 100,
    changePct: Math.round(changePct * 100) / 100,
  };
}



