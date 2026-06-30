import { useState } from "react";
import "./Positions.css";
import { FileText } from "lucide-react";
import { executeTrade } from "../../../utils/api";

const getTabs = (positions) => [
  {
    id: "positions",
    label: "Active Positions",
    count: positions.length,
  },

  {
    id: "orders",
    label: "Open Orders",
    count: 2,
  },

  {
    id: "history",
    label: "Trade History",
    count: null,
  },
];

const ORDERS = [
  {
    symbol: "BTC/USDT",
    side: "long",
    leverage: "10x",
    type: "Limit",
    price: "65,000.00",
    amount: "0.2000 BTC",
    filled: "0%",
  },
  {
    symbol: "NVDA",
    side: "long",
    leverage: "5x",
    type: "Stop-Limit",
    price: "920.00",
    amount: "15 Shares",
    filled: "0%",
  },
];

export default function Positions({
  positions,
  currentPrice,
  setPositions,
  balance,
  setBalance,
  tradeHistory,
  setTradeHistory,
  saveUserData,
  watchlist,
}) {
  const [activeTab, setActiveTab] = useState("positions");
  const tabs = getTabs(positions);

  const handleSell = async (index) => {
    const soldPosition = positions[index];

    const result = await executeTrade({
      symbol: soldPosition.symbol,
      quantity: soldPosition.quantity,
      action: "sell",
      orderType: "market",
      price: currentPrice,
    });

    const sellTrade = {
      type: "SELL",
      symbol: soldPosition.symbol,
      quantity: soldPosition.quantity,
      price: currentPrice,
      leverage: result.trade?.leverage,
      pnl: result.trade?.pnl,
      timestamp: new Date().toLocaleString(),
    };

    setBalance(result.balance);
    setTradeHistory([sellTrade, ...tradeHistory]);
    await saveUserData();
  };

  return (
    <div className="positions">
      <div className="positions-header">
        <div className="positions-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`positions-tab ${activeTab === tab.id ? "positions-tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count != null && (
                <span className="positions-tab-badge">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="positions-actions">
          <button className="positions-action-btn">Close All</button>
        </div>
      </div>

      <div className="positions-table-wrap">
        {activeTab === "positions" && (
          <table className="positions-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Leverage</th>
                <th>Size</th>
                <th>Entry Price</th>
                <th>Mark Price</th>
                <th>Liq. Price</th>
                <th>PNL</th>
              </tr>
            </thead>

            <tbody>
              {positions.length === 0 && (
                <tr>
                  <td colSpan="8">No Open Positions</td>
                </tr>
              )}

              {positions.map((position, index) => {
                const pnl =
                  (currentPrice - position.avgBuyPrice) * position.quantity;

                return (
                  <tr key={index}>
                    <td>
                      <span className="positions-symbol-name">
                        {position.symbol.replace("BINANCE:", "")}
                      </span>
                    </td>

                    <td>
                      <span
                        className="
              positions-side-badge
              positions-side-badge-long
            "
                      >
                        long
                      </span>
                    </td>

                    <td>
                      <span className="positions-leverage">{position.leverage || 1}x</span>
                    </td>

                    <td>
                      <span className="positions-mono">
                        {position.quantity}
                      </span>
                    </td>

                    <td>
                      <span className="positions-mono">
                        ${position.avgBuyPrice.toFixed(2)}
                      </span>
                    </td>

                    <td>
                      <span className="positions-mono">
                        ${currentPrice.toFixed(2)}
                      </span>
                    </td>

                    <td>
                      <span className="positions-mono">--</span>
                    </td>

                    <td>
                      <div
                        className={`positions-pnl ${
                          pnl >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        <span>${pnl.toFixed(2)}</span>

                        <button
                          className="positions-close-btn"
                          onClick={() => handleSell(index)}
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {activeTab === "orders" && (
          <table className="positions-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Leverage</th>
                <th>Type</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Filled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((ord, i) => (
                <tr key={i}>
                  <td>
                    <span className="positions-symbol-name">{ord.symbol}</span>
                  </td>
                  <td>
                    <span
                      className={`positions-side-badge positions-side-badge-${ord.side}`}
                    >
                      {ord.side}
                    </span>
                  </td>
                  <td>
                    <span className="positions-leverage">{ord.leverage}</span>
                  </td>
                  <td>
                    <span className="positions-mono">{ord.type}</span>
                  </td>
                  <td>
                    <span className="positions-mono">${ord.price}</span>
                  </td>
                  <td>
                    <span className="positions-mono">{ord.amount}</span>
                  </td>
                  <td>
                    <span className="positions-mono">{ord.filled}</span>
                  </td>
                  <td>
                    <button className="positions-close-btn">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "history" && (
          <div className="positions-history">
            {tradeHistory.length === 0 && (
              <div className="positions-empty">
                <FileText size={24} />
                <span>No Trade History</span>
              </div>
            )}

            {tradeHistory.map((trade, index) => (
              <div key={index} className="history-card">
                <div className="history-card-top">
                  <div
                    className={`history-type ${
                      trade.type === "BUY" ? "history-buy" : "history-sell"
                    }`}
                  >
                    {trade.type}
                  </div>

                  <div className="history-symbol">
                    {trade.symbol.replace("BINANCE:", "")}
                  </div>
                </div>

                <div className="history-card-body">
                  <div className="history-item">
                    <span>Quantity</span>
                    <strong>{trade.quantity}</strong>
                  </div>

                  <div className="history-item">
                    <span>Price</span>
                    <strong>${trade.price.toFixed(2)}</strong>
                  </div>

                  {trade.pnl !== undefined && (
                    <div className="history-item">
                      <span>PnL</span>

                      <strong
                        style={{
                          color: trade.pnl >= 0 ? "lime" : "red",
                        }}
                      >
                        ${trade.pnl.toFixed(2)}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="history-time">{trade.timestamp}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
