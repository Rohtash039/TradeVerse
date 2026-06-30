import React, { useEffect, useMemo, useState } from 'react';
import { Rss } from 'lucide-react';
import { getNewsData } from '../../../../utils/api';
import './NewsFeed.css';

const FALLBACK_ITEMS = [
  {
    headline: 'Market intelligence is loading live data',
    source: 'NexusTrade',
    time: 'now',
    sentiment: 'neutral',
    tag: 'market',
    tagLabel: 'Macro',
  },
];

function toFeedItem(article) {
  const primaryAsset = article.relatedAssets?.[0];
  const symbolTag = primaryAsset?.symbol?.toLowerCase();
  const tag = ['btc', 'eth'].includes(symbolTag) ? symbolTag : article.category === 'regulations' ? 'regulation' : 'market';
  return {
    id: article.id,
    headline: article.headline,
    source: article.source,
    time: article.time,
    sentiment: article.sentiment || 'neutral',
    tag,
    tagLabel: primaryAsset?.symbol || article.category || 'Market',
  };
}

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        const res = await getNewsData();
        if (isMounted && res.success) {
          setArticles(res.articles || []);
        }
      } catch (err) {
        console.error('Error loading market intelligence:', err);
        if (isMounted) setArticles([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadNews();
    const interval = setInterval(loadNews, 120000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const feedItems = useMemo(() => {
    const items = articles.slice(0, 8).map(toFeedItem);
    return items.length > 0 ? items : FALLBACK_ITEMS;
  }, [articles]);

  return (
    <div className="newsfeed">
      <div className="newsfeed__header">
        <span className="newsfeed__title">
          <Rss size={14} />
          Market Intelligence
          <span className="newsfeed__live-dot" />
        </span>
        <button className="newsfeed__filter" type="button">{loading ? 'Sync' : 'All'}</button>
      </div>

      <div className="newsfeed__list">
        {feedItems.map((item, i) => (
          <div key={item.id || i} className="newsfeed__item">
            <div className={`newsfeed__item-indicator newsfeed__item-indicator--${item.sentiment}`} />
            <div className="newsfeed__item-content">
              <span className="newsfeed__item-headline">{item.headline}</span>
              <div className="newsfeed__item-meta">
                <span className="newsfeed__item-source">{item.source}</span>
                <span className="newsfeed__item-dot" />
                <span>{item.time}</span>
                <span className="newsfeed__item-dot" />
                <span className={`newsfeed__item-tag newsfeed__item-tag--${item.tag}`}>
                  {item.tagLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

