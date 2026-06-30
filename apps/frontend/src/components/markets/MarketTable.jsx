import "./MarketTable.css";
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";

function formatPrice(price) {
  if (!price && price !== 0) return "$0.00";
  if (price < 0.01) return `$${price.toFixed(8)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatCompact(num) {
  if (!num) return "$0";
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
}

export default function MarketTable({ assets, loading, error }) {
  if (error) {
    return (
      <div className="table-main">
        <div className="table-error">
          <p>⚠️ Failed to load market data</p>
          <p className="table-error-msg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-main">
      <div className="table-info">
        <table className="market-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th className="text-right">Price</th>
              <th className="text-right">24h Change</th>
              <th className="text-right hide-mobile">Market Cap</th>
              <th className="text-right hide-mobile">Volume (24h)</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="table-row-hover">
                    <td>
                      <div className="asset-cell">
                        <div className="asset-icon skeleton-circle" />
                        <div className="asset-info">
                          <span className="skeleton-line skeleton-short" />
                          <span className="skeleton-line skeleton-medium" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="skeleton-line skeleton-price" />
                    </td>
                    <td>
                      <span className="skeleton-line skeleton-short" />
                    </td>
                    <td className="hide-mobile">
                      <span className="skeleton-line skeleton-medium" />
                    </td>
                    <td className="hide-mobile">
                      <span className="skeleton-line skeleton-medium" />
                    </td>
                  </tr>
                ))
              : assets.length === 0
                ? (
                  <tr>
                    <td colSpan={5} className="table-empty">
                      No assets found matching your criteria.
                    </td>
                  </tr>
                )
                : assets.map((item) => (
                  <tr key={item.id} className="table-row-hover">
                    <td>
                      <div className="asset-cell">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="asset-icon-img"
                          />
                        ) : (
                          <div className="asset-icon">
                            {item.symbol.charAt(0)}
                          </div>
                        )}
                        <div className="asset-info">
                          <span className="asset-symbol">{item.symbol}</span>
                          <span className="asset-name">{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="asset-price">{formatPrice(item.price)}</td>
                    <td className="text-right">
                      <span
                        className={`asset-change ${item.change24h >= 0 ? "positive" : "negative"}`}
                      >
                        {item.change24h >= 0 ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        {Math.abs(item.change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="text-right font-mono hide-mobile">
                      {formatCompact(item.marketCap)}
                    </td>
                    <td className="text-right font-mono hide-mobile">
                      {formatCompact(item.volume)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}