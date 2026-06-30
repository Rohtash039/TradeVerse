import React from 'react';
import { Flame, TrendingUp, Hash } from 'lucide-react';
import { TRENDING_TOPICS } from './newsData';
import './TrendingTopics.css';

const HEAT_ICONS = {
  hot: Flame,
  warm: TrendingUp,
  mild: Hash,
  cool: Hash,
};

function formatMentions(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export default function TrendingTopics({ trending }) {
  const topics = trending && trending.length > 0 ? trending : TRENDING_TOPICS;
  return (
    <div className="trending-topics">
      <div className="trending-topics__header">
        <h3 className="trending-topics__title">
          <Flame size={16} />
          Trending Hot Topics
        </h3>
        <span className="trending-topics__subtitle">Most discussed today</span>
      </div>

      <div className="trending-topics__cloud">
        {topics.map((topic, index) => {
          const HeatIcon = HEAT_ICONS[topic.heat];
          return (
            <button
              key={topic.name}
              className={`trending-topics__tag trending-topics__tag--${topic.heat}`}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <HeatIcon size={12} className="trending-topics__tag-icon" />
              <span className="trending-topics__tag-name">{topic.name}</span>
              <span className="trending-topics__tag-count">{formatMentions(topic.mentions)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
