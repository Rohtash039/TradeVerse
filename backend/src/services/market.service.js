import env from '../config/env.js';
import cacheService from './cache.service.js';
import { SUPPORTED_COINS, COIN_SYMBOL_MAP } from '../utils/constants.js';

const BASE = env.COINGECKO_BASE_URL;

/**
 * Fetch market data for multiple coins. Cached for 30s.
 */
export async function getMarketQuotes(coinIds = SUPPORTED_COINS) {
  const cacheKey = `market_quotes_${coinIds.join(',')}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const ids = coinIds.join(',');
  const res = await fetch(
    `${BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
  );

  if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`);
  const data = await res.json();

  const quotes = data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    image: coin.image,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h || 0,
    volume: coin.total_volume,
    marketCap: coin.market_cap,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    sparkline: coin.sparkline_in_7d?.price?.slice(-10) || [],
    color: getColorForCoin(coin.id),
  }));

  cacheService.set(cacheKey, quotes, 30);
  return quotes;
}

/**
 * Fetch a single coin price.
 */
export async function getSingleQuote(coinId) {
  const quotes = await getMarketQuotes([coinId]);
  const quote = quotes[0] || null;
  if (!quote) return null;

  return {
    ...quote,
    fundingRate: await getFundingRate(quote.symbol),
  };
}

/**
 * Get top gainers and losers.
 */
export async function getTrending() {
  const quotes = await getMarketQuotes();
  const sorted = [...quotes].sort((a, b) => b.change24h - a.change24h);
  return {
    gainers: sorted.slice(0, 3),
    losers: sorted.slice(-3).reverse(),
  };
}

/**
 * Fetch global market data (total market cap, 24h volume, etc.).
 */
export async function getGlobalData() {
  const cacheKey = 'global_market_data';
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const res = await fetch(`${BASE}/global`);
  if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`);
  const { data } = await res.json();

  const globalData = {
    totalMarketCap: data.total_market_cap?.usd || 0,
    totalVolume: data.total_volume?.usd || 0,
    marketCapChangePercentage24h: data.market_cap_change_percentage_24h_usd || 0,
    volumeChangePercentage24h: data.volume_change_percentage_24h_usd || 0,
    activeCryptocurrencies: data.active_cryptocurrencies || 0,
  };

  cacheService.set(cacheKey, globalData, 60);
  return globalData;
}

function getColorForCoin(id) {
  const colors = {
    bitcoin: '#f7931a', ethereum: '#627eea', solana: '#9945ff',
    binancecoin: '#f0b90b', ripple: '#23292f', cardano: '#0033ad',
    dogecoin: '#c2a633', 'avalanche-2': '#e84142',
    'render-token': '#00b4d8', 'fetch-ai': '#1b0f3b',
    pepe: '#479a3f', chainlink: '#2a5ada',
  };
  return colors[id] || '#8b5cf6';
}

async function getFundingRate(symbol) {
  const cacheKey = `funding_rate_${symbol}`;
  const cached = cacheService.get(cacheKey);
  if (cached !== undefined) return cached;

  try {
    const res = await fetch(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}USDT`);
    if (!res.ok) throw new Error(`Binance funding API error: ${res.status}`);

    const data = await res.json();
    const rate = Number(data.lastFundingRate);
    const fundingRate = Number.isFinite(rate) ? rate * 100 : null;
    cacheService.set(cacheKey, fundingRate, 30);
    return fundingRate;
  } catch {
    cacheService.set(cacheKey, null, 30);
    return null;
  }
}

