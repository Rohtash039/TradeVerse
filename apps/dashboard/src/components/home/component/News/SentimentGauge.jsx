import React from 'react';
import { Gauge } from 'lucide-react';
import { SENTIMENT_DATA } from './newsData';
import './SentimentGauge.css';

const SCORE_LABELS = [
  { max: 20, label: 'Extreme Fear', color: '#ef4444' },
  { max: 40, label: 'Fear', color: '#f97316' },
  { max: 60, label: 'Neutral', color: '#eab308' },
  { max: 80, label: 'Greed', color: '#22c55e' },
  { max: 100, label: 'Extreme Greed', color: '#10b981' },
];

function getScoreConfig(score) {
  return SCORE_LABELS.find((s) => score <= s.max) || SCORE_LABELS[4];
}

export default function SentimentGauge({ sentiment }) {
  const activeSentiment = sentiment || SENTIMENT_DATA;
  const { score, previousScore, change } = activeSentiment;
  const config = getScoreConfig(score);

  // SVG arc math
  const radius = 64;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // semicircle
  const progress = (score / 100) * circumference;

  return (
    <div className="sentiment-gauge">
      <div className="sentiment-gauge__header">
        <h3 className="sentiment-gauge__title">
          <Gauge size={16} />
          Market Sentiment
        </h3>
        <span className="sentiment-gauge__subtitle">Fear & Greed Index</span>
      </div>

      <div className="sentiment-gauge__ring-container">
        <svg
          className="sentiment-gauge__svg"
          viewBox="0 0 150 90"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background arc */}
          <path
            className="sentiment-gauge__track"
            d="M 11 80 A 64 64 0 0 1 139 80"
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            className="sentiment-gauge__progress"
            d="M 11 80 A 64 64 0 0 1 139 80"
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              stroke: config.color,
              strokeDasharray: `${circumference}`,
              strokeDashoffset: `${circumference - progress}`,
            }}
          />
        </svg>

        {/* Center label */}
        <div className="sentiment-gauge__value-container">
          <span className="sentiment-gauge__score" style={{ color: config.color }}>
            {score}
          </span>
          <span className="sentiment-gauge__label" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Stats footer */}
      <div className="sentiment-gauge__stats">
        <div className="sentiment-gauge__stat">
          <span className="sentiment-gauge__stat-label">Previous</span>
          <span className="sentiment-gauge__stat-value">{previousScore}</span>
        </div>
        <div className="sentiment-gauge__stat-divider" />
        <div className="sentiment-gauge__stat">
          <span className="sentiment-gauge__stat-label">Change</span>
          <span className="sentiment-gauge__stat-value sentiment-gauge__stat-value--positive">
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
