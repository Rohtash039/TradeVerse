import React, { useEffect, useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { getPortfolioPerformance } from '../../../../utils/api';
import './PnlAnalysis.css';

const TIME_RANGES = [
  { key: '7d', label: '7D', days: 7 },
  { key: '1m', label: '1M', days: 30 },
  { key: '3m', label: '3M', days: 90 },
  { key: '1y', label: '1Y', days: 365 },
  { key: 'all', label: 'ALL', days: 730 },
];

function buildFallbackData(days, currentTotalEquity) {
  const now = new Date();
  const startingValue = currentTotalEquity || 0;

  return Array.from({ length: days + 1 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (days - index));

    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(startingValue * 100) / 100,
    };
  });
}

function PnlTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="pnl-tooltip">
        <span className="pnl-tooltip__date">{label}</span>
        <span className="pnl-tooltip__value">
          ${Number(payload[0].value).toLocaleString()}
        </span>
      </div>
    );
  }
  return null;
}

export default function PnlAnalysis({ currentTotalEquity = 0 }) {
  const [activeRange, setActiveRange] = useState('1m');
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPerformance = async () => {
      try {
        setLoading(true);
        const res = await getPortfolioPerformance(activeRange);
        if (isMounted && res.success) {
          setPerformance(res.performance || null);
        }
      } catch (err) {
        console.error('Error loading portfolio performance:', err);
        if (isMounted) setPerformance(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPerformance();
    return () => { isMounted = false; };
  }, [activeRange]);

  const chartData = useMemo(() => {
    if (performance?.points?.length) return performance.points;
    const range = TIME_RANGES.find((r) => r.key === activeRange);
    return buildFallbackData(range?.days || 30, currentTotalEquity);
  }, [activeRange, currentTotalEquity, performance]);

  const startVal = chartData[0]?.value || 0;
  const endVal = chartData[chartData.length - 1]?.value || 0;
  const change = performance?.change ?? (endVal - startVal);
  const changePct = performance?.changePct ?? (startVal > 0 ? (change / startVal) * 100 : 0);
  const isPositive = change >= 0;

  return (
    <div className="pnl-analysis">
      <div className="pnl-analysis__header">
        <div className="pnl-analysis__header-left">
          <h3 className="pnl-analysis__title">Performance History</h3>
          <span
            className={`pnl-analysis__change ${
              isPositive ? 'pnl-analysis__change--up' : 'pnl-analysis__change--down'
            }`}
          >
            {loading ? 'Updating...' : `${isPositive ? '+' : ''}$${change.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${isPositive ? '+' : ''}${Number(changePct).toFixed(2)}%)`}
          </span>
        </div>

        <div className="pnl-analysis__tabs">
          {TIME_RANGES.map((r) => (
            <button
              key={r.key}
              className={`pnl-analysis__tab ${
                activeRange === r.key ? 'pnl-analysis__tab--active' : ''
              }`}
              onClick={() => setActiveRange(r.key)}
              type="button"
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pnl-analysis__chart">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? '#00ffcc' : '#ef4444'}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? '#00ffcc' : '#ef4444'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              width={55}
            />
            <Tooltip content={<PnlTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? '#00ffcc' : '#ef4444'}
              strokeWidth={2}
              fill="url(#pnlGradient)"
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
