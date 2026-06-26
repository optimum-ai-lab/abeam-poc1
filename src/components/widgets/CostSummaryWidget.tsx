import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { fetchCostSummary } from '../../api/cost';
import { CostSummaryData } from '../../types';
import { MOCK_COST_SUMMARY } from '../../data';

function DeltaBadge({ delta }: { delta: number }) {
  const positive = delta >= 0;
  const Icon = positive ? TrendingUp : TrendingDown;
  const color = positive ? 'text-emerald-500' : 'text-red-500';
  return (
    <span className={`flex items-center gap-0.5 text-xs font-medium ${color}`}>
      <Icon size={12} />
      {positive ? '+' : ''}{delta.toFixed(1)}%
    </span>
  );
}

export function CostSummaryWidget() {
  const [data, setData] = useState<CostSummaryData>(MOCK_COST_SUMMARY);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    const result = await fetchCostSummary();
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, []);

  const tiles = [
    {
      label: data.spendToday.label,
      value: `$${data.spendToday.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      delta: data.spendToday.delta,
      bg: 'bg-purple-500/10',
      color: 'text-purple-500',
    },
    {
      label: data.spendThisMonth.label,
      value: `$${data.spendThisMonth.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      delta: data.spendThisMonth.delta,
      bg: 'bg-indigo-500/10',
      color: 'text-indigo-500',
    },
    {
      label: data.avgCostPerRun.label,
      value: `$${data.avgCostPerRun.value.toFixed(2)}`,
      delta: data.avgCostPerRun.delta,
      bg: 'bg-emerald-500/10',
      color: 'text-emerald-500',
    },
    {
      label: data.avgCostPerTask.label,
      value: `$${data.avgCostPerTask.value.toFixed(2)}`,
      delta: data.avgCostPerTask.delta,
      bg: 'bg-amber-500/10',
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="relative h-full">
      {loading && (
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      )}
      <div className="grid grid-cols-2 gap-3 h-full">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="flex flex-col justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800/50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider leading-tight">
                {t.label}
              </span>
              <div className={`p-1.5 rounded-md ${t.bg}`}>
                <DollarSign size={12} className={t.color} />
              </div>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-none">
                {t.value}
              </span>
            </div>
            <div className="mt-1">
              <DeltaBadge delta={t.delta} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
