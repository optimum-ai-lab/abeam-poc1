import React from 'react';
import { MOCK_DEPLOYMENTS } from '../../data';
import { Server } from 'lucide-react';

export function DeploymentLocationWidget() {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <div className="flex flex-col space-y-4">
        {MOCK_DEPLOYMENTS.map((dep, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-800">
                <Server size={16} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{dep.region}</div>
                <div className="text-xs text-slate-500">{dep.count} agents deployed</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{dep.health}%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Health</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
