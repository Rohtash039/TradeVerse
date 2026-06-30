import { Search, TrendingUp, Activity } from "lucide-react";
import "./MarketOverview.css";

function formatLargeNumber(num) {
  if (!num) return "$0";
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)} T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)} B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)} M`;
  return `$${num.toLocaleString()}`;
}

export default function MarketOverview({
  globalData,
  searchQuery,
  onSearchChange,
  loading,
}) {
  const marketCap = globalData?.totalMarketCap || 0;
  const totalVolume = globalData?.totalVolume || 0;
  const marketCapChange = globalData?.marketCapChangePercentage24h || 0;
  const volumeChange = globalData?.volumeChangePercentage24h || 0;

  return (
    <div className="market-overview-main">
      <div className="market-overview-content">
        <div className="market-overview-text">
          <h1 className="market-overview-title">
            Market <span className="gradient-text">Overview</span>
          </h1>
          <p className="market-overview-subtitle">
            Track real-time prices, market capitalization, and trading volumes
            across all major assets.
          </p>

          <div className="market-search-box">
            <Search className="market-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search assets (e.g. BTC, Solana)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="market-overview-stats">
          <div className="market-stat-card">
            <div className={`stat-icon-wrap ${!loading && (marketCapChange >= 0 ? "up" : "down")}`}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-details">
              <span className="stat-label">Global Market Cap</span>
              <span className="stat-value">
                {loading ? (
                  <span className="stat-skeleton" />
                ) : (
                  formatLargeNumber(marketCap)
                )}
              </span>
              {!loading && (
                <span
                  className={`stat-change ${marketCapChange >= 0 ? "text-green" : "text-red"}`}
                >
                  {marketCapChange >= 0 ? "+" : ""}
                  {marketCapChange.toFixed(1)}%
                </span>
              )}
            </div>
          </div>

          <div className="market-stat-card glass-panel">
            <div className={`stat-icon-wrap ${!loading && (volumeChange >= 0 ? "up" : "down")}`}>
              <Activity size={24} />
            </div>
            <div className="stat-details">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">
                {loading ? (
                  <span className="stat-skeleton" />
                ) : (
                  formatLargeNumber(totalVolume)
                )}
              </span>
              {!loading && (
                <span
                  className={`stat-change ${volumeChange >= 0 ? "text-green" : "text-red"}`}
                >
                  {volumeChange >= 0 ? "+" : ""}
                  {volumeChange.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}