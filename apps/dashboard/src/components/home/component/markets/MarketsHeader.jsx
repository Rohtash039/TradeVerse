import { BarChart3, Search } from 'lucide-react';
import './MarketsHeader.css';

export default function MarketsHeader({ searchQuery, onSearchChange }) {
  return (
    <div className="markets-header">
      <div className="markets-header__left">
        <h1 className="markets-header__title">
          <span className="markets-header__title-icon">
            <BarChart3 size={18} />
          </span>
          Market Overview
        </h1>
        <span className="markets-header__subtitle">
          Real-time prices across all markets
        </span>
      </div>
      <div className="markets-header__right">
        <div className="markets-header__search">
          <Search size={16} />
          <input
            id="markets-search"
            className="markets-header__search-input"
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
