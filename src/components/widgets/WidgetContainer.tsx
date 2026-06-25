import React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface WidgetContainerProps {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function WidgetContainer({ title, onRemove, children, className }: WidgetContainerProps) {
  return (
    <div className={cn("flex flex-col bg-slate-900 border border-slate-800 rounded-3xl p-5 overflow-hidden h-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{title}</h3>
        {onRemove && (
          <button 
            onClick={onRemove}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-800"
            aria-label="Remove widget"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
