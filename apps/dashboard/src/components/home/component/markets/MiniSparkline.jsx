import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './MiniSparkline.css';

export default function MiniSparkline({ data, color, width = 80, height = 36 }) {
  const chartData = data.map((v, i) => ({ v, i }));

  return (
    <div className="mini-sparkline" style={{ width, height, minWidth: width, minHeight: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
