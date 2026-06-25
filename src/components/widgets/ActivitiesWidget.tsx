import React from 'react';
import { MOCK_ACTIVITIES } from '../../data';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ActivitiesWidget() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'failed': return <XCircle size={16} className="text-red-500" />;
      case 'pending': return <Clock size={16} className="text-amber-500" />;
      default: return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex flex-col space-y-3">
        {MOCK_ACTIVITIES.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <div className="mt-0.5">
              {getStatusIcon(activity.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{activity.agentName}</span>
                <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{activity.timestamp}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{activity.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
