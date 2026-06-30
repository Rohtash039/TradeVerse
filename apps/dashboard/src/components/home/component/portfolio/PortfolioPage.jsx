import { useState, useEffect } from "react";
import AssetAllocation from "./AssetAllocation";
import BalanceBreakdown from "./BalanceBreakdown";
import FundActions from "./FundActions";
import HoldingsTable from "./HoldingsTable";
import PnlAnalysis from "./PnlAnalysis";
import "./PortfolioPage.css";
import TransactionHistory from "./TransactionHistory";
import { getPortfolio, getTransactions } from "../../../../utils/api";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [portRes, txRes] = await Promise.all([
        getPortfolio(),
        getTransactions(20),
      ]);
      
      if (portRes.success && portRes.portfolio) {
        setPortfolio(portRes.portfolio);
      }
      if (txRes.success && txRes.transactions) {
        setTransactions(txRes.transactions);
      }
    } catch (err) {
      console.error("Error loading portfolio data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div className="portfolio-page-loading" style={{ color: "var(--text-secondary)", padding: "40px", textAlign: "center" }}>Loading portfolio dashboard...</div>;
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-page-header">
        <h1 className="portfolio-page-title">Portfolio Dashboard</h1>
        <span className="portfolio-page-subtitle">
          Detailed overview of your assets and performance
        </span>
      </div>

      <BalanceBreakdown portfolio={portfolio} />

      <div className="portfolio-page-row-two">
        <AssetAllocation 
          holdings={portfolio?.holdings || []} 
          balance={portfolio?.balance || 0} 
          totalValue={portfolio?.totalValue || 0} 
        />
        <FundActions onUpdate={loadData} />
      </div>
      
      <PnlAnalysis currentTotalEquity={portfolio?.totalValue || 10000} />
      
      <HoldingsTable holdings={portfolio?.holdings || []} />
      
      <TransactionHistory transactions={transactions} />
    </div>
  );
}