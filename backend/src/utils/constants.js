export const DEFAULT_BALANCE = 10000;
export const TRADE_FEE_PERCENT = 0.001; // 0.1%
export const MAX_WATCHLIST_SIZE = 20;
export const SUPPORTED_COINS = [
  'bitcoin', 'ethereum', 'solana', 'ripple', 'dogecoin',
  'binancecoin', 'cardano', 'avalanche-2', 'render-token',
  'fetch-ai', 'pepe', 'chainlink',
];
export const COIN_SYMBOL_MAP = {
  bitcoin: 'BTC', ethereum: 'ETH', solana: 'SOL', ripple: 'XRP',
  dogecoin: 'DOGE', binancecoin: 'BNB', cardano: 'ADA',
  'avalanche-2': 'AVAX', 'render-token': 'RNDR', 'fetch-ai': 'FET',
  pepe: 'PEPE', chainlink: 'LINK',
};
export const SYMBOL_TO_COINGECKO = Object.fromEntries(
  Object.entries(COIN_SYMBOL_MAP).map(([k, v]) => [v, k])
);
