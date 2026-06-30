import { useEffect, useState } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { getMarketData } from "../../../utils/api";
import "./TradingChart.css";

export default function TradingChart({ selectedCoin, setCurrentPrice }) {
  const [marketQuote, setMarketQuote] = useState(null);

  const assetSymbol = selectedCoin
    ?.replace("BINANCE:", "")
    ?.replace(/USDT$/, "") || "BTC";

  const coinName = selectedCoin
    ?.replace("BINANCE:", "")
    ?.replace("USDT", "/USDT");

  useEffect(() => {
    let isMounted = true;

    const fetchMarketQuote = async () => {
      try {
        const response = await getMarketData(assetSymbol);
        const quote = response.quote;

        if (!isMounted || !quote) return;

        setMarketQuote(quote);
        if (typeof quote.price === "number") setCurrentPrice(quote.price);
      } catch (error) {
        console.error("Market quote load error:", error);
      }
    };

    fetchMarketQuote();
    const interval = setInterval(fetchMarketQuote, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [assetSymbol, setCurrentPrice]);

  const fundingClass = (marketQuote?.fundingRate ?? 0) >= 0 ? "text-success" : "text-danger";
  const priceClass = (marketQuote?.change24h ?? 0) >= 0 ? "text-success" : "text-danger";

  return (
    <div className="chart-main" key={selectedCoin}>
      <div className="chart-panel-header">
        <div className="chart-panel-pair-info">
          <div className="chart-panel-pair">
            <div className="chart-panel-pair-icon">{assetSymbol.charAt(0)}</div>
            <div className="chart-panel-pair-name">{coinName}</div>
            <span className="chart-panel-pair-type">Perpetual</span>
          </div>
          <span className={`chart-panel-live-price ${priceClass}`}>
            {formatCurrency(marketQuote?.price)}
          </span>
        </div>

        <div className="chart-panel-stats">
          <div className="chart-panel-stat">
            <span className="chart-panel-stat-label">24h High</span>
            <span className="chart-panel-stat-value">{formatCurrency(marketQuote?.high24h)}</span>
          </div>
          <div className="chart-panel-stat">
            <span className="chart-panel-stat-label">24h Low</span>
            <span className="chart-panel-stat-value">{formatCurrency(marketQuote?.low24h)}</span>
          </div>
          <div className="chart-panel-stat">
            <span className="chart-panel-stat-label">24h Volume</span>
            <span className="chart-panel-stat-value">{formatCompactCurrency(marketQuote?.volume)}</span>
          </div>
          <div className="chart-panel-stat">
            <span className="chart-panel-stat-label">Funding</span>
            <span className={`chart-panel-stat-value ${fundingClass}`}>
              {formatPercent(marketQuote?.fundingRate)}
            </span>
          </div>
        </div>
      </div>

      <div className="chart-panel-canvas">
        <AdvancedRealTimeChart
          theme="dark"
          symbol={selectedCoin}
          autosize
          interval="15"
          timezone="Etc/UTC"
          hide_side_toolbar={true}
          withdateranges
          allow_symbol_change={false}
        />
      </div>
    </div>
  );
}

function formatCurrency(value) {
  if (typeof value !== "number") return "$--";

  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value >= 1 ? 2 : 4,
    maximumFractionDigits: value >= 1 ? 2 : 8,
  });
}

function formatCompactCurrency(value) {
  if (typeof value !== "number") return "$--";

  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });
}

function formatPercent(value) {
  if (typeof value !== "number") return "N/A";
  return `${value.toFixed(4)}%`;
}
