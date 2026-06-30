import "./Watchlist.css";
import { useState, useEffect } from "react";
import { getMarketQuotes } from "../../../utils/api";

export default function Watchlist({ onSelectAsset, watchlist = [
  "bitcoin", "ethereum", "solana", "ripple", "dogecoin",
  "binancecoin", "cardano", "avalanche-2", "render-token",
  "fetch-ai", "pepe", "chainlink",
] }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState("bitcoin");

  useEffect(() => {
    let active = true;
    const fetchMarketData = async () => {
      try {
        if (!watchlist || watchlist.length === 0) {
          setAssets([]);
          setLoading(false);
          return;
        }

        const { quotes } = await getMarketQuotes(watchlist.join(","));
        
        if (active) {
          const formattedData = quotes.map((coin) => ({
            id: coin.id,
            symbol: coin.symbol,
            label: coin.name,
            price: coin.price,
            change: coin.change24h,
            image: coin.image,
          }));

          setAssets(formattedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [watchlist]);

  if (loading) {
    return <div className="watchlist-loading">Loading market data...</div>;
  }

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <span className="watchlist-title">WatchList</span>
        <span className="watchlist-count">{assets.length} assets</span>
      </div>

      <div className="watchlist-table-header">
        <span>Asset</span>
        <span>Price</span>
        <span>24h</span>
      </div>

      <div className="watchlist-list">
        {assets.map((asset) => {
          const isActive = activeId === asset.id;

          return (
            <div
              key={asset.id}
              className={`watchlist-row 
                ${isActive ? "watchlist-row-active" : ""}
              `}
              onClick={() => {
                setActiveId(asset.id);
                onSelectAsset(asset);
              }}
            >
              <div className="watchlist-asset">
                <img
                  src={asset.image}
                  alt={asset.label}
                  className="watchlist-coin-image"
                />
                <div className="watchlist-asset-name">
                  <span className="watchlist-asset-symbol">{asset.symbol}</span>
                  <span className="watchlist-asset-label">{asset.label}</span>
                </div>
              </div>

              <span className="watchlist-price mono">
                ${formatPrice(asset.price)}
              </span>

              <span
                className={`watchlist-change ${
                  asset.change >= 0
                    ? "watchlist-change-up"
                    : "watchlist-change-down"
                }`}
              >
                {asset.change >= 0 ? "+" : ""}
                {asset.change.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatPrice(price) {
  if (price >= 1000)
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(4);
}

