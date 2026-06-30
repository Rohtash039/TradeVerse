import React from 'react';
import { Clock, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './NewsCard.css';

const SENTIMENT_CONFIG = {
  bullish: { label: 'Bullish', icon: TrendingUp, className: 'news-card__sentiment--bullish' },
  bearish: { label: 'Bearish', icon: TrendingDown, className: 'news-card__sentiment--bearish' },
  neutral: { label: 'Neutral', icon: Minus, className: 'news-card__sentiment--neutral' },
};

export default function NewsCard({ article }) {
  const sentimentInfo = SENTIMENT_CONFIG[article.sentiment];
  const SentimentIcon = sentimentInfo.icon;

  return (
    <article className={`news-card ${article.isBreaking ? 'news-card--breaking' : ''}`}>
      {/* Breaking Badge */}
      {article.isBreaking && (
        <div className="news-card__breaking-badge">
          <span className="news-card__breaking-dot" />
          BREAKING
        </div>
      )}

      {/* Card Header: Source + Time */}
      <div className="news-card__header">
        <span className="news-card__source">{article.source}</span>
        <span className="news-card__time">
          <Clock size={12} />
          {article.time}
        </span>
      </div>

      {/* Headline */}
      <h3 className="news-card__headline">{article.headline}</h3>

      {/* Description */}
      <p className="news-card__description">{article.description}</p>

      {/* Footer: Assets + Sentiment + Link */}
      <div className="news-card__footer">
        <div className="news-card__assets">
          {article.relatedAssets.map((asset) => (
            <span
              key={asset.symbol}
              className={`news-card__asset-badge news-card__asset-badge--${asset.impact}`}
            >
              <span className="news-card__asset-symbol">{asset.symbol}</span>
              <span className="news-card__asset-change">{asset.change}</span>
            </span>
          ))}
        </div>

        <div className="news-card__actions">
          <span className={`news-card__sentiment ${sentimentInfo.className}`}>
            <SentimentIcon size={12} />
            {sentimentInfo.label}
          </span>
          <button className="news-card__link-btn" aria-label="Open full article">
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
