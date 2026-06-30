/* ========================================================
   News Module — Dummy Data
   ======================================================== */

export const FILTER_TABS = [
  { id: 'all', label: 'All News' },
  { id: 'latest', label: 'Latest' },
  { id: 'regulations', label: 'Regulations' },
  { id: 'macro', label: 'Macro' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'watchlist', label: 'My Watchlist' },
];

export const NEWS_DATA = [
  {
    id: 1,
    source: 'Bloomberg',
    time: '3m ago',
    headline: 'Fed Holds Interest Rates Steady, Markets React With Sharp Rally',
    description:
      'The Federal Reserve kept its benchmark rate unchanged at 5.25%-5.50%, signaling patience on future cuts. Equities surged on dovish commentary from Chair Powell, with tech leading gains.',
    category: 'macro',
    sentiment: 'bullish',
    isBreaking: true,
    relatedAssets: [
      { symbol: 'SPY', impact: 'positive', change: '+1.8%' },
      { symbol: 'BTC', impact: 'positive', change: '+3.2%' },
    ],
  },
  {
    id: 2,
    source: 'CoinDesk',
    time: '5m ago',
    headline: 'Ethereum Gas Fees Drop to Multi-Year Lows After Dencun Upgrade',
    description:
      'Average gas fees on Ethereum mainnet have fallen below 3 gwei for the first time since 2020, driven by blob transactions and increased L2 adoption post-Dencun.',
    category: 'latest',
    sentiment: 'bullish',
    isBreaking: true,
    relatedAssets: [
      { symbol: 'ETH', impact: 'positive', change: '+5.4%' },
      { symbol: 'ARB', impact: 'positive', change: '+8.1%' },
    ],
  },
  {
    id: 3,
    source: 'Reuters',
    time: '12m ago',
    headline: 'SEC Approves Spot Solana ETF in Landmark Decision for Altcoins',
    description:
      'The U.S. Securities and Exchange Commission has greenlighted the first spot Solana ETF, marking a pivotal expansion beyond Bitcoin and Ethereum exchange-traded products.',
    category: 'regulations',
    sentiment: 'bullish',
    isBreaking: true,
    relatedAssets: [
      { symbol: 'SOL', impact: 'positive', change: '+12.6%' },
    ],
  },
  {
    id: 4,
    source: 'Financial Times',
    time: '28m ago',
    headline: 'European Central Bank Cuts Rates by 25bps, Euro Weakens Against Dollar',
    description:
      'The ECB reduced its main refinancing rate to 3.75%, citing cooling inflation and weakening economic activity across the eurozone. EUR/USD fell 0.6% on the announcement.',
    category: 'macro',
    sentiment: 'bearish',
    isBreaking: false,
    relatedAssets: [
      { symbol: 'EUR', impact: 'negative', change: '-0.6%' },
      { symbol: 'DXY', impact: 'positive', change: '+0.4%' },
    ],
  },
  {
    id: 5,
    source: 'The Block',
    time: '42m ago',
    headline: 'MicroStrategy Acquires Additional 12,000 BTC Worth $780M',
    description:
      'Michael Saylor\'s MicroStrategy has purchased another 12,000 Bitcoin, bringing total holdings to 226,000 BTC. The acquisition was funded through convertible notes and cash reserves.',
    category: 'corporate',
    sentiment: 'bullish',
    isBreaking: false,
    relatedAssets: [
      { symbol: 'BTC', impact: 'positive', change: '+2.1%' },
      { symbol: 'MSTR', impact: 'positive', change: '+6.8%' },
    ],
  },
  {
    id: 6,
    source: 'CNBC',
    time: '1h ago',
    headline: 'NVIDIA Reports Record AI Revenue, Announces 10-for-1 Stock Split',
    description:
      'NVIDIA\'s data center segment generated $26.3B in Q1 revenue, up 427% year-over-year. The company also announced a 10-for-1 forward stock split effective June 2026.',
    category: 'corporate',
    sentiment: 'bullish',
    isBreaking: false,
    relatedAssets: [
      { symbol: 'NVDA', impact: 'positive', change: '+9.3%' },
    ],
  },
  {
    id: 7,
    source: 'Decrypt',
    time: '1.5h ago',
    headline: 'China Signals Potential Reversal of Crypto Mining Ban Amid Energy Surplus',
    description:
      'Senior officials from China\'s State Council hinted at reconsidering the 2021 crypto mining ban, citing excess renewable energy capacity in Sichuan and Yunnan provinces.',
    category: 'regulations',
    sentiment: 'bullish',
    isBreaking: false,
    relatedAssets: [
      { symbol: 'BTC', impact: 'positive', change: '+1.4%' },
    ],
  },
  {
    id: 8,
    source: 'Wall Street Journal',
    time: '2h ago',
    headline: 'Global Bond Yields Surge as Inflation Data Surprises to the Upside',
    description:
      'U.S. 10-year Treasury yields climbed to 4.82% after CPI data showed core inflation at 3.6%, above the 3.4% consensus. Risk assets sold off sharply in response.',
    category: 'macro',
    sentiment: 'bearish',
    isBreaking: false,
    relatedAssets: [
      { symbol: 'TLT', impact: 'negative', change: '-2.3%' },
      { symbol: 'BTC', impact: 'negative', change: '-1.8%' },
    ],
  },
];

export const SENTIMENT_DATA = {
  score: 72,
  label: 'Greed',
  previousScore: 65,
  change: '+7',
};

export const TRENDING_TOPICS = [
  { name: 'Bitcoin ETF', mentions: 2840, heat: 'hot' },
  { name: 'Fed Rate Decision', mentions: 2210, heat: 'hot' },
  { name: 'Ethereum Dencun', mentions: 1650, heat: 'warm' },
  { name: 'AI Stocks', mentions: 1420, heat: 'warm' },
  { name: 'Solana ETF', mentions: 1380, heat: 'warm' },
  { name: 'MicroStrategy', mentions: 890, heat: 'mild' },
  { name: 'NVIDIA Earnings', mentions: 780, heat: 'mild' },
  { name: 'ECB Rate Cut', mentions: 620, heat: 'mild' },
  { name: 'DeFi Summer', mentions: 540, heat: 'cool' },
  { name: 'Crypto Mining', mentions: 430, heat: 'cool' },
  { name: 'Layer 2', mentions: 380, heat: 'cool' },
  { name: 'Digital Euro', mentions: 290, heat: 'cool' },
];

export const WATCHLIST_SYMBOLS = ['BTC', 'ETH', 'SOL', 'NVDA', 'SPY'];
