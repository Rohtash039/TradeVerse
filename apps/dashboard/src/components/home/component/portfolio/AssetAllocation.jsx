import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./AssetAllocation.css";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="allocation-tooltip">
        <span className="allocation-tooltip-name">{data.name}</span>
        <span className="allocation-tooltip-value">{data.amount}</span>
        <span className="allocation-tooltip-pct">{data.value}%</span>
      </div>
    );
  }
  return null;
}

export default function AssetAllocation({ holdings = [], balance = 0, totalValue = 0 }) {
  const formatUSD = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const getColor = (symbol) => {
    const colors = {
      BTC: '#f7931a', ETH: '#627eea', USDT: '#26a17b', SOL: '#9945ff',
      ADA: '#0033ad', DOGE: '#c2a633', XRP: '#23292f'
    };
    return colors[symbol.toUpperCase()] || '#8b5cf6';
  };

  const data = useMemo(() => {
    if (totalValue === 0) return [];

    const list = holdings.map(h => ({
      name: `${h.name || h.symbol} (${h.symbol})`,
      value: Math.round((h.currentValue / totalValue) * 100),
      amount: formatUSD(h.currentValue),
      color: getColor(h.symbol),
    }));

    if (balance > 0) {
      list.push({
        name: 'Cash (USD)',
        value: Math.round((balance / totalValue) * 100),
        amount: formatUSD(balance),
        color: '#3b82f6',
      });
    }

    return list.filter(item => item.value > 0);
  }, [holdings, balance, totalValue]);

  const displayTotal = useMemo(() => {
    if (totalValue >= 1e6) return `$${(totalValue / 1e6).toFixed(1)}M`;
    if (totalValue >= 1e3) return `$${(totalValue / 1e3).toFixed(1)}K`;
    return formatUSD(totalValue);
  }, [totalValue]);

  if (data.length === 0) {
    return (
      <div className="asset-allocation" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "280px", color: "var(--text-secondary)" }}>
        No assets owned yet.
      </div>
    );
  }

  return (
    <div className="asset-allocation">
      <h3 className="asset-allocation-title">Asset Allocation</h3>

      <div className="asset-allocation-chart-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="asset-allocation-center-label">
          <span className="asset-allocation-center-amount">{displayTotal}</span>
          <span className="asset-allocation-center-text">Total</span>
        </div>
      </div>

      <div className="asset-allocation-legend">
        {data.map((item) => (
          <div key={item.name} className="asset-allocation-legend-item">
            <span
              className="asset-allocation-legend-dot"
              style={{ background: item.color }}
            />
            <span className="asset-allocation-legend-name">{item.name}</span>
            <span className="asset-allocation-legend-pct">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}