import React from 'react';
import { WIDGET_LIBRARY } from '../data';
import { Plus, X } from 'lucide-react';
import { WidgetConfig } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WidgetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  activeWidgetIds: string[];
  onAddWidget: (widget: WidgetConfig) => void;
}

export function WidgetLibrary({ isOpen, onClose, activeWidgetIds, onAddWidget }: WidgetLibraryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-100">Widget Library</h2>
                <p className="text-xs text-slate-400">Add widgets to customize your dashboard</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {WIDGET_LIBRARY.map((widget) => {
                const isActive = activeWidgetIds.includes(widget.id);
                return (
                  <div 
                    key={widget.id}
                    className={`p-3 rounded-lg border flex items-start justify-between gap-4 transition-colors ${
                      isActive ? 'bg-slate-800/30 border-slate-700/50 opacity-60' : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-slate-200">{widget.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{widget.description}</p>
                      <div className="mt-2 text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                        Size: {widget.size}
                      </div>
                    </div>
                    <button
                      disabled={isActive}
                      onClick={() => onAddWidget(widget)}
                      className={`p-1.5 rounded-md flex-shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
