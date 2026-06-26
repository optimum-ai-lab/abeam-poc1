export type WidgetType =
  | 'metrics'
  | 'activities'
  | 'trends'
  | 'deployment'
  | 'status'
  | 'issue_rate'
  | 'agent_state'
  | 'cost_summary'
  | 'cost_trend'
  | 'budget_utilization'
  | 'cost_drivers';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large' | 'full';
}

// --- Cost / Billing API types ---

export interface CostKpi {
  label: string;
  value: number;       // USD
  delta: number;       // % change vs previous period (positive = increase)
}

export interface CostSummaryData {
  spendToday: CostKpi;
  spendThisMonth: CostKpi;
  avgCostPerRun: CostKpi;
  avgCostPerTask: CostKpi;
  currency: 'USD';
}

export type TrendGranularity = 'hourly' | 'daily';

export interface CostTrendPoint {
  time: string;        // ISO-8601 timestamp (UTC) (e.g. "2026-06-26T14:00:00Z")
  label: string;       // display label (e.g. "14:00" or "Jun 20")
  cost: number;        // USD
  budget?: number;     // optional budget reference line value
}

export interface CostTrendData {
  range: '24h' | '7d' | '30d';
  granularity: TrendGranularity;
  points: CostTrendPoint[];
  currency: 'USD';
}

export interface BudgetUtilizationData {
  daily: {
    limit: number;     // USD
    spent: number;     // USD
    projectedSpend: number;
  };
  monthly: {
    limit: number;     // USD
    spent: number;     // USD
    projectedSpend: number;
  };
  currency: 'USD';
}

export interface CostDriver {
  agentId: string;
  agentName: string;
  totalCost: number;   // USD
  runCount: number;
  costPerRun: number;  // USD
  shareOfTotal: number;  // 0–100 %
}

export interface CostDriversData {
  period: 'today' | 'week';
  totalSpend: number;
  drivers: CostDriver[];
  currency: 'USD';
}

// --- End cost types ---

export interface AgentActivity {
  id: string;
  agentName: string;
  action: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
}

export interface DeploymentLocation {
  region: string;
  count: number;
  health: number;
}
