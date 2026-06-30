import { useMemo } from 'react';
import { CATEGORY_TABS, MARKET_DATA } from './marketData';
import './MarketCategoryTabs.css';

export default function MarketCategoryTabs({ activeTab, onTabChange, favoritesCount }) {
  const tabCounts = useMemo(() => {
    const counts = {};
    CATEGORY_TABS.forEach((tab) => {
      if (tab.id === 'all') counts[tab.id] = MARKET_DATA.length;
      else if (tab.id === 'favorites') counts[tab.id] = favoritesCount;
      else counts[tab.id] = MARKET_DATA.filter((a) => a.category.includes(tab.id)).length;
    });
    return counts;
  }, [favoritesCount]);

  return (
    <div className="market-tabs">
      {CATEGORY_TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            id={`market-tab-${tab.id}`}
            className={`market-tabs__tab ${
              activeTab === tab.id ? 'market-tabs__tab--active' : ''
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={14} />
            {tab.label}
            <span className="market-tabs__count">{tabCounts[tab.id]}</span>
          </button>
        );
      })}
    </div>
  );
}
