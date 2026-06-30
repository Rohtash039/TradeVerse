import { useState, useEffect, useMemo } from "react";
import MarketCategory from "./MarketCategory";
import MarketOverview from "./MarketOverview";
import MarketTable from "./MarketTable";
import TrendingAssets from "./TrendingAssets";
import "./Market.css";

const API_BASE = "http://localhost:5000/api/market";

export default function Markets() {
  const [assets, setAssets] = useState([]);
  const [trending, setTrending] = useState({ gainers: [], losers: [] });
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Assets");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [quotesRes, trendingRes, globalRes] = await Promise.all([
          fetch(`${API_BASE}/quotes`),
          fetch(`${API_BASE}/trending`),
          fetch(`${API_BASE}/global`),
        ]);

        if (!quotesRes.ok || !trendingRes.ok || !globalRes.ok) {
          throw new Error("Failed to fetch market data");
        }

        const quotesData = await quotesRes.json();
        const trendingData = await trendingRes.json();
        const globalDataRes = await globalRes.json();

        setAssets(quotesData.quotes || []);
        setTrending({
          gainers: trendingData.gainers || [],
          losers: trendingData.losers || [],
        });
        setGlobalData(globalDataRes.global || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();

    // Refresh every 30 seconds
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter assets by category and search
  const filteredAssets = useMemo(() => {
    let result = assets;

    // Category filter — all coins from CoinGecko are "Crypto"
    if (activeCategory !== "All Assets") {
      if (activeCategory === "Crypto") {
        result = assets; // All CoinGecko assets are crypto
      } else {
        result = []; // No stocks/forex/commodities from CoinGecko
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.symbol.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [assets, activeCategory, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchQuery]);

  return (
    <div className="markets-page">
      <div className="container">
        <MarketOverview
          globalData={globalData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          loading={loading}
        />
        {!searchQuery && <TrendingAssets trending={trending} loading={loading} />}
        {!searchQuery && (
          <MarketCategory
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}
        <MarketTable
          assets={filteredAssets}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}