import {
  Layers,
  Star,
  Coins,
  BarChart3,
  Flame,
  Bot,
  Dog,
} from 'lucide-react';

/* ──────────────────────────────────────────────────
   Dummy Market Data — 12 assets
   ────────────────────────────────────────────────── */
export const MARKET_DATA = [
  {
    id: 'btc',
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 103482.12,
    change24h: 2.34,
    volume: 48_230_000_000,
    marketCap: 2_034_000_000_000,
    color: '#f7931a',
    category: ['spot', 'futures'],
    sparkline: [98, 97, 99, 100, 98, 101, 103, 102, 104, 103],
  },
  {
    id: 'eth',
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2587.43,
    change24h: -1.12,
    volume: 21_450_000_000,
    marketCap: 311_200_000_000,
    color: '#627eea',
    category: ['spot', 'futures', 'defi'],
    sparkline: [26, 27, 26, 25, 24, 25, 26, 25, 26, 25],
  },
  {
    id: 'sol',
    rank: 3,
    symbol: 'SOL',
    name: 'Solana',
    price: 178.92,
    change24h: 5.67,
    volume: 8_920_000_000,
    marketCap: 82_500_000_000,
    color: '#9945ff',
    category: ['spot', 'futures', 'defi'],
    sparkline: [160, 162, 165, 170, 168, 172, 175, 174, 178, 179],
  },
  {
    id: 'bnb',
    rank: 4,
    symbol: 'BNB',
    name: 'BNB Chain',
    price: 638.21,
    change24h: 0.89,
    volume: 2_340_000_000,
    marketCap: 95_600_000_000,
    color: '#f0b90b',
    category: ['spot', 'futures'],
    sparkline: [630, 632, 635, 634, 636, 637, 635, 638, 639, 638],
  },
  {
    id: 'xrp',
    rank: 5,
    symbol: 'XRP',
    name: 'Ripple',
    price: 2.41,
    change24h: -0.45,
    volume: 4_560_000_000,
    marketCap: 138_900_000_000,
    color: '#23292f',
    category: ['spot', 'futures'],
    sparkline: [2.5, 2.48, 2.45, 2.43, 2.44, 2.42, 2.41, 2.43, 2.42, 2.41],
  },
  {
    id: 'ada',
    rank: 6,
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.782,
    change24h: 3.21,
    volume: 1_230_000_000,
    marketCap: 27_800_000_000,
    color: '#0033ad',
    category: ['spot', 'defi'],
    sparkline: [0.72, 0.73, 0.74, 0.75, 0.76, 0.75, 0.77, 0.78, 0.78, 0.78],
  },
  {
    id: 'doge',
    rank: 7,
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.234,
    change24h: 8.45,
    volume: 3_450_000_000,
    marketCap: 34_200_000_000,
    color: '#c2a633',
    category: ['spot', 'meme'],
    sparkline: [0.20, 0.21, 0.22, 0.21, 0.22, 0.23, 0.22, 0.23, 0.234, 0.234],
  },
  {
    id: 'avax',
    rank: 8,
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 41.23,
    change24h: -2.78,
    volume: 980_000_000,
    marketCap: 16_700_000_000,
    color: '#e84142',
    category: ['spot', 'futures', 'defi'],
    sparkline: [44, 43, 42.5, 43, 42, 41.5, 42, 41, 41.5, 41],
  },
  {
    id: 'rndr',
    rank: 9,
    symbol: 'RNDR',
    name: 'Render',
    price: 10.82,
    change24h: 12.34,
    volume: 1_870_000_000,
    marketCap: 5_600_000_000,
    color: '#00b4d8',
    category: ['spot', 'ai'],
    sparkline: [8.5, 9, 9.2, 9.5, 10, 9.8, 10.2, 10.5, 10.8, 10.8],
  },
  {
    id: 'fet',
    rank: 10,
    symbol: 'FET',
    name: 'Fetch.ai',
    price: 2.87,
    change24h: 6.78,
    volume: 890_000_000,
    marketCap: 7_200_000_000,
    color: '#1b0f3b',
    category: ['spot', 'ai'],
    sparkline: [2.4, 2.5, 2.55, 2.6, 2.65, 2.7, 2.75, 2.8, 2.85, 2.87],
  },
  {
    id: 'pepe',
    rank: 11,
    symbol: 'PEPE',
    name: 'Pepe',
    price: 0.00001423,
    change24h: -4.56,
    volume: 2_340_000_000,
    marketCap: 6_000_000_000,
    color: '#479a3f',
    category: ['spot', 'meme'],
    sparkline: [0.000016, 0.0000155, 0.000015, 0.0000148, 0.0000145, 0.0000147, 0.0000143, 0.0000144, 0.0000142, 0.0000142],
  },
  {
    id: 'link',
    rank: 12,
    symbol: 'LINK',
    name: 'Chainlink',
    price: 18.45,
    change24h: 1.92,
    volume: 1_120_000_000,
    marketCap: 11_500_000_000,
    color: '#2a5ada',
    category: ['spot', 'defi'],
    sparkline: [17.5, 17.8, 17.9, 18, 18.1, 18, 18.2, 18.3, 18.4, 18.45],
  },
];

export const CATEGORY_TABS = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'spot', label: 'Spot', icon: Coins },
  { id: 'futures', label: 'Futures', icon: BarChart3 },
  { id: 'defi', label: 'DeFi', icon: Flame },
  { id: 'ai', label: 'AI', icon: Bot },
  { id: 'meme', label: 'Meme', icon: Dog },
];

/* ──────────────────────────────────────────────────
   Helper Functions
   ────────────────────────────────────────────────── */
export function formatPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(8)}`;
}

export function formatVolume(vol) {
  if (vol >= 1e12) return `$${(vol / 1e12).toFixed(2)}T`;
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(1)}M`;
  return `$${vol.toLocaleString()}`;
}

export function formatMarketCap(cap) {
  if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
  if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
  if (cap >= 1e6) return `$${(cap / 1e6).toFixed(1)}M`;
  return `$${cap.toLocaleString()}`;
}
