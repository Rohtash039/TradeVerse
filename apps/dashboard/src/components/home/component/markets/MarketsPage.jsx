import { useState, useEffect, useMemo } from 'react';
import { getMarketQuotes } from '../../../../utils/api';
import MarketsHeader from './MarketsHeader';
import MarketStatCards from './MarketStatCards';
import MarketCategoryTabs from './MarketCategoryTabs';
import MarketTable from './MarketTable';
import './MarketsPage.css';

function getMockCategories(id) {
  if (['bitcoin', 'ethereum', 'ripple'].includes(id)) return ['spot', 'futures'];
  if (['solana', 'cardano', 'avalanche-2', 'chainlink'].includes(id)) return ['spot', 'defi'];
  if (['dogecoin', 'pepe'].includes(id)) return ['spot', 'meme'];
  if (['render-token', 'fetch-ai'].includes(id)) return ['spot', 'ai'];
  return ['spot'];
}

export default function MarketsPage({ onNavigate }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set(['bitcoin', 'ethereum', 'solana']));

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const { quotes } = await getMarketQuotes();
        if (quotes) {
          const formatted = quotes.map((q, index) => ({
            id: q.id,
            rank: index + 1,
            symbol: q.symbol,
            name: q.name,
            price: q.price,
            change24h: q.change24h,
            volume: q.volume,
            marketCap: q.marketCap,
            color: q.color,
            category: getMockCategories(q.id),
            sparkline: q.sparkline,
          }));
          setAssets(formatted);
        }
      } catch (err) {
        console.error("Error fetching market quotes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  /* Filter assets based on active tab + search query */
  const filteredAssets = useMemo(() => {
    let list = assets;

    if (activeTab === 'favorites') {
      list = list.filter((a) => favorites.has(a.id));
    } else if (activeTab !== 'all') {
      list = list.filter((a) => a.category.includes(activeTab));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.symbol.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q)
      );
    }

    return list;
  }, [assets, activeTab, searchQuery, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTrade = () => {
    if (onNavigate) onNavigate('trade');
  };

  if (loading) {
    return <div className="markets-page-loading" style={{ color: "var(--text-secondary)", padding: "40px", textAlign: "center" }}>Loading market rates...</div>;
  }

  return (
    <div className="markets-page">
      <MarketsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MarketStatCards assets={assets} />
      <MarketCategoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favorites.size}
      />
      <MarketTable
        assets={filteredAssets}
        totalCount={assets.length}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onTrade={handleTrade}
      />
    </div>
  );
}
