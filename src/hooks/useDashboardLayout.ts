import { useState } from 'react';
import { WidgetConfig } from '../types';
import { WIDGET_LIBRARY } from '../data';

const STORAGE_KEY = 'abeam_dashboard_layout';

const DEFAULT_IDS = ['metrics_1', 'trends_1', 'status_1', 'activities_1'];

const VALID_WIDGET_TYPES = new Set<string>([
  'metrics',
  'activities',
  'trends',
  'deployment',
  'status',
  'issue_rate',
  'agent_state',
  'cost_summary',
  'cost_trend',
  'budget_utilization',
  'cost_drivers',
]);

function getDefaultWidgets(): WidgetConfig[] {
  return WIDGET_LIBRARY.filter((w) => DEFAULT_IDS.includes(w.id));
}

function validateWidgets(items: unknown[]): WidgetConfig[] {
  return items.filter((item): item is WidgetConfig => {
    if (typeof item !== 'object' || item === null) return false;
    const w = item as Record<string, unknown>;
    if (typeof w.id !== 'string' || w.id.length === 0) return false;
    if (!VALID_WIDGET_TYPES.has(w.type as string)) return false;
    if (typeof w.title !== 'string') return false;
    if (typeof w.description !== 'string') return false;
    if (!['small', 'medium', 'large', 'full'].includes(w.size as string)) return false;
    return true;
  });
}

function loadLayout(): WidgetConfig[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return getDefaultWidgets();
  }

  if (raw === null) {
    return getDefaultWidgets();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.warn('[useDashboardLayout] Failed to parse stored layout; using defaults.');
    return getDefaultWidgets();
  }

  if (!Array.isArray(parsed)) {
    return getDefaultWidgets();
  }

  const validated = validateWidgets(parsed);
  if (validated.length === 0) {
    return getDefaultWidgets();
  }

  return validated;
}

function saveLayout(widgets: WidgetConfig[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  } catch {
    // silent — e.g. private browsing with storage disabled
  }
}

export function useDashboardLayout() {
  const [activeWidgets, setActiveWidgets] = useState<WidgetConfig[]>(() => loadLayout());

  const addWidget = (widget: WidgetConfig): void => {
    setActiveWidgets((prev) => {
      const next = [...prev, widget];
      saveLayout(next);
      return next;
    });
  };

  const removeWidget = (widgetId: string): void => {
    setActiveWidgets((prev) => {
      const next = prev.filter((w) => w.id !== widgetId);
      saveLayout(next);
      return next;
    });
  };

  return { activeWidgets, addWidget, removeWidget };
}
