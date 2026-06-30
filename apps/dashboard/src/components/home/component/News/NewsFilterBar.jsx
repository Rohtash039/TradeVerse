import React from 'react';
import { Zap } from 'lucide-react';
import { FILTER_TABS } from './newsData';
import './NewsFilterBar.css';

export default function NewsFilterBar({ activeFilter, onFilterChange, breakingOnly, onBreakingToggle }) {
  return (
    <div className="news-filter-bar">
      {/* Filter Tabs */}
      <div className="news-filter-bar__tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            id={`news-filter-${tab.id}`}
            className={`news-filter-bar__tab ${activeFilter === tab.id ? 'news-filter-bar__tab--active' : ''}`}
            onClick={() => onFilterChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Breaking News Toggle */}
      <div className="news-filter-bar__toggle-group">
        <Zap size={14} className="news-filter-bar__toggle-icon" />
        <span className="news-filter-bar__toggle-label">Breaking Only</span>
        <button
          id="breaking-news-toggle"
          className={`news-filter-bar__toggle ${breakingOnly ? 'news-filter-bar__toggle--active' : ''}`}
          onClick={onBreakingToggle}
          role="switch"
          aria-checked={breakingOnly}
          aria-label="Toggle breaking news only"
        >
          <span className="news-filter-bar__toggle-knob" />
        </button>
      </div>
    </div>
  );
}
