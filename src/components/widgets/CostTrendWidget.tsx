import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { MOCK_COST_TREND_24H, MOCK_COST_TREND_7D, MOCK_COST_TREND_30D } from '../../data';
import { useTheme } from '../../context/ThemeContext';

type Range = '24h' | '7d' | '30d';

interface TrendPoint { time: string; label: string; cost: number; budget?: number; }
interface CostTrendData { range: Range; granularity: string; currency: 'USD'; points: TrendPoint[]; }

async function fetchCostTrend(range: Range): Promise<CostTrendData> {
  try {
    const res = await fetch(`/api/cost/trend?range=${range}`);
    if (!res.ok) throw new Error('not ok');
    return res.json();
  } catch {
    return range === '24h' ? MOCK_COST_TREND_24H : range === '7d' ? MOCK_COST_TREND_7D : MOCK_COST_TREND_30D;
  }
}

export function CostTrendWidget() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [range, setRange] = useState<Range>('24h');
  const [points, setPoints] = useState<TrendPoint[]>(MOCK_COST_TREND_24H.points);
  const [loading, setLoading] = useState(false);

  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const axisColor = isDark ? '#64748b' : '#94a3b8';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';
  const tooltipText = isDark ? '#e2e8f0' : '#1e293b';

  async function load(r: Range) {
    setLoading(true);
    const result = await fetchCostTrend(r);
    setPoints(result.points);
    setLoading(false);
  }

  useEffect(() => {
    load(range);
    if (range !== '24h') return;
    const id = setInterval(() => load('24h'), 5 * 60_000);
    return () => clearInterval(id);
  }, [range]);

  const handleRange = (r: Range) => {
    setRange(r);
    load(r);
  };

  const ranges: Range[] = ['24h', '7d', '30d'];

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex gap-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => handleRange(r)}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                range === r
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        {loading && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
      </div>
      <div className="flex-1 w-full min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="label" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke={axisColor}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px' }}
              itemStyle={{ color: tooltipText }}
              formatter={(v: number, name: string) => [`$${v}`, name === 'budget' ? 'Budget' : 'Cost']}
            />
            <Area
              type="monotone"
              dataKey="budget"
              stroke="#ef4444"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
