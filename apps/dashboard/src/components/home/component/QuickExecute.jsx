import { useEffect, useState } from "react";
import { executeTrade } from "../../../utils/api";
import "./QuickExecute.css";
import { useFlash } from "../../../context/FlashContext";

export default function QuickExecute({
  balance,
  setBalance,
  positions,
  setPositions,
  selectedCoin,
  currentPrice,
  tradeHistory,
  setTradeHistory,
  saveUserData,
  watchlist,
}) {
  const [side, setSide] = useState("buy");
  const [leverage, setLeverage] = useState(10);

  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const { showFlash } = useFlash();

  const isBuy = side === "buy";
  const assetSymbol = selectedCoin
    ?.replace("BINANCE:", "")
    ?.replace(/USDT$/, "") || "Asset";
  const total = (currentPrice * Number(quantity || 0)).toFixed(2);

  useEffect(() => {
    setQuantity("");
  }, [selectedCoin]);

  const handleBuy = async () => {
    if (!selectedCoin || !quantity) {
      showFlash("Select the coin and Quantity", "error");

      return;
    }

    try {
      setLoading(true);

      const result = await executeTrade({
        symbol: assetSymbol,

        quantity: Number(quantity),

        action: side,

        orderType: "market",

        price: currentPrice,

        leverage,
      });

      setBalance(result.balance);
      await saveUserData();

      showFlash(
        `Trade successful: ${quantity} ${selectedCoin} ${side === "buy" ? "buy" : "sell"} with ${leverage}x leverage!`,
        "success"
      );
    } catch (err) {
      showFlash(`Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="execute-main">
      <div className="execute-header">
        <span className="execute-title">Quick Execute</span>
      </div>

      <div className="execute-tabs">
        <button
          className={`execute-tab execute-tab-buy ${side === "buy" ? "execute-tab-active" : ""}`}
          onClick={() => setSide("buy")}
        >
          Buy / Long
        </button>

        <button
          className={`execute-tab execute-tab-sell ${side == "sell" ? "execute-tab-active" : ""}`}
          onClick={() => setSide("sell")}
        >
          Sell / Short
        </button>
      </div>

      <div className="execute-form">
        <div className="execute-field">
          <label className="execute-label">
            Price
            <span className="execute-label-hint">Limit</span>
          </label>
          <div className="execute-input-wrap execute-input-wrap-readonly">
            <input className="execute-input" type="text" value={currentPrice} readOnly />
            <span className="execute-input-suffix">USDT</span>
          </div>
        </div>

        <div className="execute-field">
          <label className="execute-label">
            Amount
            <span className="execute-label-hint">{assetSymbol}</span>
          </label>
          <div className="execute-input-wrap">
            <input
              className="execute-input"
              type="number"
              min="0"
              step="0.0001"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <span className="execute-input-suffix">{assetSymbol}</span>
          </div>
        </div>

        <div className="execute-field">
          <div className="execute-slider-group">
            <div className="execute-slider-header">
              <span className="execute-label">Leverage</span>
              <span className="execute-slider-value">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={leverage}
              onChange={(event) => setLeverage(Number(event.target.value))}
              className="execute-slider"
            />
            <div className="execute-slider-marks">
              <span>1x</span>
              <span>25x</span>
              <span>50x</span>
              <span>75x</span>
              <span>100x</span>
            </div>
          </div>
        </div>

        <div className="execute-summary">
          <div className="execute-summary-row">
            <span className="execute-summary-label">Order Value</span>
            <span className="execute-summary-value">
              ${Number(total).toLocaleString()}
            </span>
          </div>
          <div className="execute-summary-row">
            <span className="execute-summary-label">Margin Required</span>
            <span className="execute-summary-value">
              ${(parseFloat(total) / leverage).toFixed(2)}
            </span>
          </div>
          <div className="execute-summary-row">
            <span className="execute-summary-label">Est. Fee</span>
            <span className="execute-summary-value">$5.13</span>
          </div>
        </div>

        <button
          className={`execute-submit ${isBuy ? "execute-submit-buy" : "execute-submit-sell"}`}
          onClick={handleBuy}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : isBuy
              ? `Buy / Long ${assetSymbol}`
              : `Sell / Short ${assetSymbol}`}
        </button>
      </div>
    </div>
  );
}
