import React from 'react';
import { MOCK_ISSUE_RATES } from '../../data';
import { AlertTriangle } from 'lucide-react';

export function IssueRateWidget() {
  return (
    <div className="h-full flex flex-col justify-center space-y-4">
      {MOCK_ISSUE_RATES.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="w-24 text-sm text-slate-300 truncate">{item.model}</div>
          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500/80 rounded-full" 
              style={{ width: `${Math.min(item.rate * 10, 100)}%` }} 
            />
          </div>
          <div className="w-12 text-right flex items-center justify-end gap-1">
            <span className="text-sm font-medium text-slate-200">{item.rate}%</span>
            {item.rate > 2.5 && <AlertTriangle size={12} className="text-red-400" />}
          </div>
        </div>
      ))}
    </div>
  );
}
