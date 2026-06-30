import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight } from 'lucide-react';
import { depositFunds, withdrawFunds } from "../../../../utils/api";
import "./FundActions.css";
import { useFlash } from "../../../../context/FlashContext";

export default function FundActions({ onUpdate }) {
  const [loading, setLoading] = useState(false);
  const { showFlash } = useFlash();

  const handleDeposit = async () => {
    const amountStr = prompt("Enter the amount to deposit in USD ($):", "1000");
    if (!amountStr) return;

    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) {
      showFlash("Please enter a valid positive number", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await depositFunds(amount);
      if (res.success) {
        showFlash(`Successfully deposited $${amount.toFixed(2)}!`, "success");
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      showFlash(err.message || "Deposit failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const amountStr = prompt("Enter the amount to withdraw in USD ($):", "1000");
    if (!amountStr) return;

    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) {
      showFlash("Please enter a valid positive number", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await withdrawFunds(amount);
      if (res.success) {
        showFlash(`Successfully withdrew $${amount.toFixed(2)}!`, "success");
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      showFlash(err.message || "Withdrawal failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fund-actions">
      <h3 className="fund-actions-title">Fund Management</h3>

      <div className="fund-actions-buttons">
        <button className="fund-btn fund-btn-deposit" onClick={handleDeposit} disabled={loading}>
          <div className="fund-btn-icon-wrap">
            <ArrowDownToLine size={22} />
          </div>
          <div className="fund-btn-text">
            <span className="fund-btn-label">Deposit</span>
            <span className="fund-btn-desc">Add mock USD funds</span>
          </div>
        </button>

        <button className="fund-btn fund-btn-withdraw" onClick={handleWithdraw} disabled={loading}>
          <div className="fund-btn-icon-wrap">
            <ArrowUpFromLine size={22} />
          </div>
          <div className="fund-btn-text">
            <span className="fund-btn-label">Withdraw</span>
            <span className="fund-btn-desc">Send USD funds out</span>
          </div>
        </button>

        <button className="fund-btn fund-btn-transfer" onClick={() => showFlash("Transfer is mock only (Spot ↔ Futures shares same balance)", "info")} disabled={loading}>
          <div className="fund-btn-icon-wrap">
            <ArrowLeftRight size={22} />
          </div>
          <div className="fund-btn-text">
            <span className="fund-btn-label">Transfer</span>
            <span className="fund-btn-desc">Spot ↔ Futures</span>
          </div>
        </button>
      </div>
    </div>
  );
}