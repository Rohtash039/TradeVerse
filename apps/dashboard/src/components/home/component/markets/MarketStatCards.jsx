import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { formatPrice } from './marketData';
import MiniSparkline from './MiniSparkline';
import './MarketStatCards.css';

export default function MarketStatCards({ assets = [] }) {
  const topGainer = useMemo(() => {
    if (!assets || assets.length === 0) return null;
    return [...assets].sort((a, b) => b.change24h - a.change24h)[0];
  }, [assets]);

  const topLoser = useMemo(() => {
    if (!assets || assets.length === 0) return null;
    return [...assets].sort((a, b) => a.change24h - b.change24h)[0];
  }, [assets]);

  const newListing = useMemo(() => {
    if (!assets || assets.length === 0) return null;
    // Fall back to a render token or any coin at index 8/last
    return assets.find((a) => a.id === 'render-token') || assets[Math.min(8, assets.length - 1)];
  }, [assets]);

  if (!topGainer || !topLoser || !newListing) {
    return <div className="market-stats-loading" style={{ color: "var(--text-secondary)", padding: "12px" }}>Loading statistics...</div>;
  }

  return (
    <div className="market-stats">
      {/* Top Gainer */}
      <div className="market-stats__card market-stats__card--gainer">
        <div className="market-stats__info">
          <span className="market-stats__label">
            <span className="market-stats__label-icon">
              <TrendingUp size={12} />
            </span>
            Top Gainer
          </span>
          <div className="market-stats__asset">
            <span className="market-stats__symbol">{topGainer.symbol}</span>
            <span className="market-stats__price">{formatPrice(topGainer.price)}</span>
            <span className="market-stats__change market-stats__change--up">
              +{topGainer.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <MiniSparkline data={topGainer.sparkline} color="var(--success)" />
      </div>

      {/* Top Loser */}
      <div className="market-stats__card market-stats__card--loser">
        <div className="market-stats__info">
          <span className="market-stats__label">
            <span className="market-stats__label-icon">
              <TrendingDown size={12} />
            </span>
            Top Loser
          </span>
          <div className="market-stats__asset">
            <span className="market-stats__symbol">{topLoser.symbol}</span>
            <span className="market-stats__price">{formatPrice(topLoser.price)}</span>
            <span className="market-stats__change market-stats__change--down">
              {topLoser.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <MiniSparkline data={topLoser.sparkline} color="var(--danger)" />
      </div>

      {/* New Listing */}
      <div className="market-stats__card market-stats__card--new">
        <div className="market-stats__info">
          <span className="market-stats__label">
            <span className="market-stats__label-icon">
              <Sparkles size={12} />
            </span>
            New Listing
          </span>
          <div className="market-stats__asset">
            <span className="market-stats__symbol">{newListing.symbol}</span>
            <span className="market-stats__price">{formatPrice(newListing.price)}</span>
            <span
              className={`market-stats__change ${
                newListing.change24h >= 0
                  ? 'market-stats__change--up'
                  : 'market-stats__change--down'
              }`}
            >
              {newListing.change24h >= 0 ? '+' : ''}
              {newListing.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <MiniSparkline data={newListing.sparkline} color="var(--accent-blue)" />
      </div>
    </div>
  );
}
