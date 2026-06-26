import React, { useEffect, useState } from 'react';
import { MOCK_COST_DRIVERS } from '../../data';

type Period = 'today' | 'week';

interface CostDriver {
  agentId: string;
  agentName: string;
  totalCost: number;
  runCount: number;
  costPerRun: number;
  shareOfTotal: number;
}

interface CostDriversData {
  period: Period;
  totalSpend: number;
  drivers: CostDriver[];
  currency: 'USD';
}

async function fetchDrivers(period: Period): Promise<CostDriversData> {
  try {
    const res = await fetch(`/api/cost/drivers?period=${period}`);
    if (!res.ok) throw new Error('not ok');
    return res.json();
  } catch {
    return { ...MOCK_COST_DRIVERS, period };
  }
}

export function CostDriversWidget() {
  const [period, setPeriod] = useState<Period>('today');
  const [drivers, setDrivers] = useState<CostDriver[]>(MOCK_COST_DRIVERS.drivers);
  const [loading, setLoading] = useState(false);

  async function load(p: Period) {
    setLoading(true);
    const result = await fetchDrivers(p);
    setDrivers(result.drivers);
    setLoading(false);
  }

  useEffect(() => {
    load(period);
    const id = setInterval(() => load(period), 5 * 60_000);
    return () => clearInterval(id);
  }, [period]);

  const handlePeriod = (p: Period) => {
    setPeriod(p);
    load(p);
  };

  const maxCost = drivers.length > 0 ? drivers[0].totalCost : 1;

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex gap-1">
          {(['today', 'week'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriod(p)}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {p === 'today' ? 'Today' : 'This Week'}
            </button>
          ))}
        </div>
        {loading && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
      </div>

      {drivers.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">No cost data for this period</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {drivers.map((d, i) => (
              <div key={d.agentId} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-4 text-right">{i + 1}</span>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate flex-1">
                    {d.agentName}
                  </span>
                  <span className="text-xs font-semibold text-purple-500 whitespace-nowrap">
                    ${d.totalCost.toLocaleString()}
                  </span>
                </div>
                <div className="ml-6 mb-1.5">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-purple-500 transition-all duration-500"
                      style={{ width: `${(d.totalCost / maxCost) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="ml-6 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                  <span>{d.runCount} runs</span>
                  <span>${d.costPerRun.toFixed(2)}/run</span>
                  <span>{d.shareOfTotal.toFixed(1)}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
