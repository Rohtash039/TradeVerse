import React, { useState, useEffect, useMemo } from 'react';
import { Newspaper } from 'lucide-react';
import { getNewsData } from '../../../../utils/api';
import NewsFilterBar from './NewsFilterBar';
import NewsCard from './NewsCard';
import SentimentGauge from './SentimentGauge';
import TrendingTopics from './TrendingTopics';
import './NewsView.css';

export default function NewsView() {
  const [articles, setArticles] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState('all');
  const [breakingOnly, setBreakingOnly] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await getNewsData();
        if (res.success) {
          setArticles(res.articles || []);
          setSentiment(res.sentiment || null);
          setTrending(res.trending || []);
        }
      } catch (err) {
        console.error("Error loading news feed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    let list = articles;

    // Category filter
    if (activeFilter === 'latest') {
      list = [...list].sort((a, b) => b.id - a.id);
    } else if (activeFilter !== 'all') {
      list = list.filter((article) => article.category === activeFilter);
    }

    // Breaking only toggle
    if (breakingOnly) {
      list = list.filter((article) => article.isBreaking);
    }

    return list;
  }, [articles, activeFilter, breakingOnly]);

  if (loading) {
    return <div className="news-view-loading" style={{ color: "var(--text-secondary)", padding: "40px", textAlign: "center" }}>Loading intelligence feed...</div>;
  }

  return (
    <section className="news-view">
      {/* ── Page Header ── */}
      <div className="news-view__header">
        <div className="news-view__header-left">
          <h1 className="news-view__title">
            <span className="news-view__title-icon">
              <Newspaper size={18} />
            </span>
            Market Intelligence
          </h1>
          <span className="news-view__subtitle">
            Real-time news & sentiment analysis
            <span className="news-view__live-badge">
              <span className="news-view__live-dot" />
              LIVE
            </span>
          </span>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <NewsFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        breakingOnly={breakingOnly}
        onBreakingToggle={() => setBreakingOnly((prev) => !prev)}
      />

      {/* ── Two-Column Layout ── */}
      <div className="news-view__grid">
        {/* Left: News Feed */}
        <div className="news-view__feed">
          {filteredNews.length > 0 ? (
            filteredNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="news-view__empty">
              <Newspaper size={32} />
              <span>No articles match your filters</span>
            </div>
          )}
        </div>

        {/* Right: Sticky Sidebar */}
        <aside className="news-view__sidebar">
          <SentimentGauge sentiment={sentiment} />
          <TrendingTopics trending={trending} />
        </aside>
      </div>
    </section>
  );
}
