import React, { useState } from 'react';
import { LayoutDashboard, Plus, Settings, Sun, Moon } from 'lucide-react';
import { useDashboardLayout } from './hooks/useDashboardLayout';
import { WidgetLibrary } from './components/WidgetLibrary';
import { WidgetContainer } from './components/widgets/WidgetContainer';
import { MetricsWidget } from './components/widgets/MetricsWidget';
import { TrendsWidget } from './components/widgets/TrendsWidget';
import { StatusWidget } from './components/widgets/StatusWidget';
import { AgentStateWidget } from './components/widgets/AgentStateWidget';
import { DeploymentLocationWidget } from './components/widgets/DeploymentLocationWidget';
import { IssueRateWidget } from './components/widgets/IssueRateWidget';
import { ActivitiesWidget } from './components/widgets/ActivitiesWidget';
import { CostSummaryWidget } from './components/widgets/CostSummaryWidget';
import { CostTrendWidget } from './components/widgets/CostTrendWidget';
import { BudgetUtilizationWidget } from './components/widgets/BudgetUtilizationWidget';
import { CostDriversWidget } from './components/widgets/CostDriversWidget';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const { activeWidgets, addWidget, removeWidget } = useDashboardLayout();

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const renderWidgetContent = (type: string) => {
    switch (type) {
      case 'metrics': return <MetricsWidget />;
      case 'trends': return <TrendsWidget />;
      case 'status': return <StatusWidget />;
      case 'agent_state': return <AgentStateWidget />;
      case 'deployment': return <DeploymentLocationWidget />;
      case 'issue_rate': return <IssueRateWidget />;
      case 'activities': return <ActivitiesWidget />;
      case 'cost_summary': return <CostSummaryWidget />;
      case 'cost_trend': return <CostTrendWidget />;
      case 'budget_utilization': return <BudgetUtilizationWidget />;
      case 'cost_drivers': return <CostDriversWidget />;
      default: return <div className="text-slate-400 text-sm p-4">Widget component not found.</div>;
    }
  };

  const getColSpan = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-12 md:col-span-4 lg:col-span-3 row-span-2';
      case 'medium': return 'col-span-12 md:col-span-6 lg:col-span-4 row-span-2';
      case 'large': return 'col-span-12 lg:col-span-8 row-span-4';
      case 'full': return 'col-span-12 row-span-2';
      default: return 'col-span-12 md:col-span-6 row-span-2';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans p-4 flex flex-col gap-4 selection:bg-indigo-500/30 overflow-hidden transition-colors duration-300">
      {/* Top Navigation */}
      <header className="flex items-center justify-between bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-3 shrink-0 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Agent Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Global Agent Fleet</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLibraryOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Widget</span>
          </button>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeWidgets.length === 0 ? (
          <div className="h-full min-h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl bg-white/30 dark:bg-slate-900/20">
            <LayoutDashboard size={48} className="text-slate-400 dark:text-slate-600 mb-4" />
            <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Your dashboard is empty</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-sm text-center">Customize your view by adding widgets from the library to monitor your agent fleet.</p>
            <button
              onClick={() => setIsLibraryOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Open Widget Library
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
            <AnimatePresence mode="popLayout">
              {activeWidgets.map((widget) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  key={widget.id}
                  className={getColSpan(widget.size)}
                >
                  <WidgetContainer
                    title={widget.title}
                    onRemove={() => removeWidget(widget.id)}
                  >
                    {renderWidgetContent(widget.type)}
                  </WidgetContainer>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <WidgetLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        activeWidgetIds={activeWidgets.map(w => w.id)}
        onAddWidget={addWidget}
      />
    </div>
  );
}
