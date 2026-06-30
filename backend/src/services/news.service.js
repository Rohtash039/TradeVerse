import cacheService from './cache.service.js';
import { getGlobalData, getMarketQuotes } from './market.service.js';

const FALLBACK_ARTICLES = [
  { id: 1, source: 'Market Engine', time: 'just now', headline: 'Crypto market snapshot temporarily using cached intelligence', description: 'Live market news generation will resume when market data is available.', category: 'latest', sentiment: 'neutral', isBreaking: false, relatedAssets: [{ symbol: 'BTC', impact: 'neutral', change: '0.0%' }] },
];

function formatPercent(value = 0) {
  const rounded = Math.round(value * 100) / 100;
  return `${rounded >= 0 ? '+' : ''}${rounded}%`;
}

function formatMoney(value = 0) {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(value).toLocaleString()}`;
}

function getSentiment(change = 0) {
  if (change > 1) return 'bullish';
  if (change < -1) return 'bearish';
  return 'neutral';
}

function getImpact(change = 0) {
  if (change > 0.25) return 'positive';
  if (change < -0.25) return 'negative';
  return 'neutral';
}

function buildArticleFromQuote(quote, index) {
  const change = quote.change24h || 0;
  const direction = change >= 0 ? 'extends gains' : 'slides lower';
  const volume = formatMoney(quote.volume || 0);
  const marketCap = formatMoney(quote.marketCap || 0);

  return {
    id: index + 1,
    source: 'CoinGecko Live Market',
    time: `${Math.max(1, index * 4 + 2)}m ago`,
    headline: `${quote.name} ${direction} with ${formatPercent(change)} move over 24 hours`,
    description: `${quote.symbol} is trading near $${Number(quote.price || 0).toLocaleString(undefined, { maximumFractionDigits: 4 })}, with ${volume} in 24h volume and a market cap around ${marketCap}.`,
    category: index < 3 ? 'latest' : 'corporate',
    sentiment: getSentiment(change),
    isBreaking: Math.abs(change) >= 5,
    relatedAssets: [{ symbol: quote.symbol, impact: getImpact(change), change: formatPercent(change) }],
  };
}

function buildMacroArticle(globalData, id) {
  const change = globalData.marketCapChangePercentage24h || 0;
  return {
    id,
    source: 'Global Market Data',
    time: '18m ago',
    headline: `Total crypto market cap ${change >= 0 ? 'rises' : 'falls'} ${formatPercent(change)} in the last 24 hours`,
    description: `Aggregate market value is near ${formatMoney(globalData.totalMarketCap)}, while 24h trading volume is around ${formatMoney(globalData.totalVolume)} across ${Number(globalData.activeCryptocurrencies || 0).toLocaleString()} tracked assets.`,
    category: 'macro',
    sentiment: getSentiment(change),
    isBreaking: Math.abs(change) >= 3,
    relatedAssets: [{ symbol: 'TOTAL', impact: getImpact(change), change: formatPercent(change) }],
  };
}

function buildSentiment(quotes, globalData) {
  const averageChange = quotes.length
    ? quotes.reduce((sum, quote) => sum + (quote.change24h || 0), 0) / quotes.length
    : 0;
  const globalChange = globalData.marketCapChangePercentage24h || 0;
  const score = Math.max(0, Math.min(100, Math.round(50 + averageChange * 5 + globalChange * 3)));
  const previousScore = Math.max(0, Math.min(100, Math.round(score - globalChange * 2)));
  const change = score - previousScore;

  return {
    score,
    label: score >= 80 ? 'Extreme Greed' : score >= 60 ? 'Greed' : score >= 40 ? 'Neutral' : score >= 20 ? 'Fear' : 'Extreme Fear',
    previousScore,
    change: `${change >= 0 ? '+' : ''}${change}`,
  };
}

function buildTrending(quotes) {
  return [...quotes]
    .sort((a, b) => Math.abs(b.change24h || 0) - Math.abs(a.change24h || 0))
    .slice(0, 10)
    .map((quote, index) => ({
      name: `${quote.name} ${formatPercent(quote.change24h || 0)}`,
      mentions: Math.max(120, Math.round((quote.volume || 0) / 1_000_000) + 1000 - index * 75),
      heat: index < 2 ? 'hot' : index < 5 ? 'warm' : index < 8 ? 'mild' : 'cool',
    }));
}

export async function getNews(category = null) {
  const cacheKey = `news_${category || 'all'}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  try {
    const [quotes, globalData] = await Promise.all([
      getMarketQuotes(),
      getGlobalData(),
    ]);

    const sortedQuotes = [...quotes].sort((a, b) => Math.abs(b.change24h || 0) - Math.abs(a.change24h || 0));
    let articles = [
      ...sortedQuotes.slice(0, 7).map(buildArticleFromQuote),
      buildMacroArticle(globalData, sortedQuotes.length + 1),
    ];

    articles = articles.map((article, index) => ({ ...article, id: index + 1 }));

    if (category && category !== 'all') {
      articles = category === 'watchlist'
        ? articles.filter((article) => ['BTC', 'ETH', 'SOL'].some((symbol) => article.relatedAssets.some((asset) => asset.symbol === symbol)))
        : articles.filter((article) => article.category === category);
    }

    const result = {
      articles,
      sentiment: buildSentiment(quotes, globalData),
      trending: buildTrending(quotes),
    };
    cacheService.set(cacheKey, result, 120);
    return result;
  } catch (err) {
    const result = {
      articles: FALLBACK_ARTICLES,
      sentiment: { score: 50, label: 'Neutral', previousScore: 50, change: '+0' },
      trending: [{ name: 'Market data reconnecting', mentions: 120, heat: 'cool' }],
    };
    cacheService.set(cacheKey, result, 30);
    return result;
  }
}
