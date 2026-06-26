import React, { useEffect, useState } from 'react';
import { fetchBudget } from '../../api/cost';
import { BudgetUtilizationData } from '../../types';
import { MOCK_BUDGET } from '../../data';
import { cn } from '../../lib/utils';

function getStatus(pct: number): { label: string; color: string; barColor: string } {
  if (pct >= 100) return { label: 'Over Budget', color: 'text-red-500', barColor: 'bg-red-500' };
  if (pct >= 75) return { label: 'Warning', color: 'text-amber-500', barColor: 'bg-amber-500' };
  return { label: 'On Track', color: 'text-emerald-500', barColor: 'bg-emerald-500' };
}

export function BudgetUtilizationWidget() {
  const [data, setData] = useState<BudgetUtilizationData>(MOCK_BUDGET);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    const result = await fetchBudget();
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, []);

  const monthly = data.monthly;
  const pct = Math.min((monthly.spent / monthly.limit) * 100, 100);
  const { label, color, barColor } = getStatus(pct);

  return (
    <div className="h-full flex flex-col justify-between gap-3 relative">
      {loading && <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}

      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-semibold uppercase tracking-wide', color)}>{label}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{pct.toFixed(1)}%</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={cn('h-3 rounded-full transition-all duration-500', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-800 dark:text-slate-200">
          ${monthly.spent.toLocaleString()}
        </span>
        <span>/ ${monthly.limit.toLocaleString()}</span>
      </div>

      <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Projected: <span className="font-medium text-slate-600 dark:text-slate-300">${Math.round(monthly.projectedSpend).toLocaleString()}</span>
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Daily: ${data.daily.spent.toLocaleString()} / ${data.daily.limit.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
