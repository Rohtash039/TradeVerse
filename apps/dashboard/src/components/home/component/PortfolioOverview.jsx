import { TrendingUp } from "lucide-react";
import "./PortfolioOverview.css";

export default function PortfolioOverview({
  balance,
  positions,
  currentPrice,
}) {
  const SPARKLINE_POINTS = [
    40, 38, 42, 35, 45, 43, 50, 48, 55, 52, 58, 54, 60, 57, 62, 65, 60, 68, 64,
    70, 72, 68, 75, 73, 78,
  ];
  const chartWidth = 300;
  const chartHeight = 56;
  const linePath = generateSparklinePath(
    SPARKLINE_POINTS,
    chartWidth,
    chartHeight,
  );
  const areaPath = generateAreaPath(SPARKLINE_POINTS, chartWidth, chartHeight);

  const portfolioValue = positions.reduce(
    (total, position) => total + (position.currentValue || (position.quantity * (position.currentPrice || currentPrice))),
    0
  );

  const totalPnL = positions.reduce(
    (total, position) => total + (position.pnl || 0),
    0
  );

  const totalAssets = balance + portfolioValue;

  const roi = totalAssets > 0 ? ((totalPnL / totalAssets) * 100).toFixed(2) : 0;
  
  // Get BTC price for display (default to BTC price or current selected price)
  const btcPrice = currentPrice || 60000;

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <span className="portfolio-title">
          Total Estimated <br /> Value
        </span>
        <span
          className="portfolio-badge"
          style={{
            color: totalPnL >= 0 ? "lime" : "red",
          }}
        >
          <TrendingUp size={12} />
          {roi}%
        </span>
      </div>

      <div className="portfolio-value">
        <span className="portfolio-value-usd">${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span className="portfolio-value-btc">≈ {(totalAssets / btcPrice).toFixed(4)} BTC</span>
      </div>

      <div className="portfolio-chart">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--primary-neon)"
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor="var(--primary-neon)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <path d={areaPath} className="portfolio-chart-area" />
          <path d={linePath} className="portfolio-chart-line" />
        </svg>
      </div>

      <div className="portfolio-stats">
        <div className="portfolio-stat">
          <span className="portfolio-stat-label">Total PNL</span>
          <span
            className="portfolio-stat-value"
            style={{
              color: totalPnL >= 0 ? "lime" : "red",
            }}
          >
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
          </span>
        </div>

        <div className="portfolio-stat">
          <span className="portfolio-stat-label">Available</span>
          <span className="portfolio-stat-value">${balance.toFixed(2)}</span>
        </div>

        <div className="portfolio-stat">
          <span className="portfolio-stat-label">In Orders</span>
          <span className="portfolio-stat-value">$0.00</span>
        </div>

        <div className="portfolio-stat">
          <span className="portfolio-stat-label">Assets Value</span>
          <span className="portfolio-stat-value">
            ${portfolioValue.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

function generateSparklinePath(points, width, height) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);

  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function generateAreaPath(points, width, height) {
  const linePath = generateSparklinePath(points, width, height);
  return `${linePath} L${width},${height} L0,${height} Z`;
}
