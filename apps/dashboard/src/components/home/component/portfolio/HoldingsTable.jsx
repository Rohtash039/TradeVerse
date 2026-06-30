import React from 'react';
import './HoldingsTable.css';

export default function HoldingsTable({ holdings = [] }) {
  const formatUSD = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const getBadge = (symbol) => {
    const badges = { BTC: '₿', ETH: 'Ξ', USDT: '₮', SOL: '◎', ADA: '₳' };
    return badges[symbol.toUpperCase()] || symbol[0];
  };

  const getBadgeClass = (symbol) => {
    return `holdings-badge--${symbol.toLowerCase()}`;
  };

  return (
    <div className="holdings">
      <div className="holdings__header">
        <h3 className="holdings__title">Holdings</h3>
        <span className="holdings__count">{holdings.length} Assets</span>
      </div>

      <div className="holdings__table-wrap">
        <table className="holdings__table">
          <thead>
            <tr>
              <th className="holdings__th">Asset</th>
              <th className="holdings__th holdings__th--right">Amount</th>
              <th className="holdings__th holdings__th--right">Avg. Entry</th>
              <th className="holdings__th holdings__th--right">Market Price</th>
              <th className="holdings__th holdings__th--right">Value</th>
              <th className="holdings__th holdings__th--right">PNL ($)</th>
              <th className="holdings__th holdings__th--right">PNL (%)</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length === 0 ? (
              <tr className="holdings__row">
                <td colSpan="7" className="holdings__td" style={{ textAlign: "center", color: "var(--text-secondary)", padding: "24px" }}>
                  No open holdings. Visit the Trade page to buy assets.
                </td>
              </tr>
            ) : (
              holdings.map((h) => {
                const isProfit = h.pnl >= 0;
                return (
                  <tr key={h.symbol} className="holdings__row">
                    <td className="holdings__td">
                      <div className="holdings__asset">
                        <span className={`holdings-badge ${getBadgeClass(h.symbol)}`}>
                          {getBadge(h.symbol)}
                        </span>
                        <div className="holdings__asset-info">
                          <span className="holdings__asset-name">{h.name || h.symbol}</span>
                          <span className="holdings__asset-symbol">{h.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="holdings__td holdings__td--right holdings__td--mono">
                      {h.quantity.toFixed(4)}
                    </td>
                    <td className="holdings__td holdings__td--right holdings__td--mono">
                      {formatUSD(h.avgBuyPrice)}
                    </td>
                    <td className="holdings__td holdings__td--right holdings__td--mono">
                      {formatUSD(h.currentPrice)}
                    </td>
                    <td className="holdings__td holdings__td--right holdings__td--mono">
                      {formatUSD(h.currentValue)}
                    </td>
                    <td
                      className={`holdings__td holdings__td--right holdings__td--mono ${
                        isProfit ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {isProfit ? '+' : ''}{formatUSD(h.pnl)}
                    </td>
                    <td
                      className={`holdings__td holdings__td--right holdings__td--mono ${
                        isProfit ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {isProfit ? '+' : ''}{h.pnlPercent.toFixed(2)}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
