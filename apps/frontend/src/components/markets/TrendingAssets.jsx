import { Flame, TrendingUp, TrendingDown } from "lucide-react";
import "./TrendingAssets.css";

export default function TrendingAssets({ trending, loading }) {
  // Combine gainers and losers, sorted by absolute change (biggest movers first)
  const trendingItems = [
    ...(trending.gainers || []),
    ...(trending.losers || []),
  ].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h))
   .slice(0, 4);

  return (
    <div className="trending-main">
      <h3 className="trending-heading">
        <Flame color="#ef4444" size={24} />
        Trending Now
      </h3>

      <div className="trending-data">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div className="trending-card trending-skeleton-card" key={idx}>
                <div className="skeleton-line skeleton-short" />
                <div className="skeleton-line skeleton-medium" />
                <div className="skeleton-line skeleton-large" />
              </div>
            ))
          : trendingItems.map((item) => (
              <div className="trending-card" key={item.id}>
                <div className="trending-card-header">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="trending-coin-img"
                    />
                  )}
                  <div>
                    <p className="trending-symbol">{item.symbol}</p>
                    <p className="trending-name">{item.name}</p>
                  </div>
                </div>
                <p className="trending-price">
                  ${item.price?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: item.price < 1 ? 8 : 2,
                  })}
                </p>
                <p
                  className={`trending-change ${item.change24h >= 0 ? "badge-up" : "badge-down"}`}
                >
                  {item.change24h >= 0 ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {Math.abs(item.change24h).toFixed(1)}%
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}