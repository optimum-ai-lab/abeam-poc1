import { AgentActivity, BudgetUtilizationData, CostDriversData, CostSummaryData, CostTrendData, DeploymentLocation, WidgetConfig } from './types';

export const WIDGET_LIBRARY: WidgetConfig[] = [
  { id: 'metrics_1', type: 'metrics', title: 'Key Metrics', description: 'Overview of total, active agents, and cost.', size: 'full' },
  { id: 'trends_1', type: 'trends', title: 'Performance Trends', description: 'Token usage and latency over time.', size: 'large' },
  { id: 'status_1', type: 'status', title: 'Agent Status', description: 'Success vs Failure rates.', size: 'medium' },
  { id: 'agent_state_1', type: 'agent_state', title: 'Work States', description: 'Current states of agents.', size: 'medium' },
  { id: 'deployment_1', type: 'deployment', title: 'Deployment Regions', description: 'Distribution of agents globally.', size: 'medium' },
  { id: 'issue_rate_1', type: 'issue_rate', title: 'Issue Rate', description: 'Error rates across models.', size: 'medium' },
  { id: 'activities_1', type: 'activities', title: 'Recent Activities', description: 'Real-time log of agent actions.', size: 'full' },
  { id: 'cost_summary_1', type: 'cost_summary', title: 'Cost Summary', description: 'KPI tiles for today/month spend, cost per run and per task.', size: 'medium' },
  { id: 'cost_trend_1', type: 'cost_trend', title: 'Cost Trend', description: 'Area chart of cost over time with optional budget overlay.', size: 'large' },
  { id: 'budget_utilization_1', type: 'budget_utilization', title: 'Budget Utilization', description: 'Spend vs. budget gauge with on-track / warning / over-budget status.', size: 'small' },
  { id: 'cost_drivers_1', type: 'cost_drivers', title: 'Top Cost Drivers', description: 'Ranked leaderboard of agents by cost for the selected period.', size: 'medium' },
];

export const MOCK_TRENDS_DATA = [
  { time: '00:00', tokens: 4000, latency: 240 },
  { time: '04:00', tokens: 3000, latency: 139 },
  { time: '08:00', tokens: 2000, latency: 980 },
  { time: '12:00', tokens: 2780, latency: 390 },
  { time: '16:00', tokens: 1890, latency: 480 },
  { time: '20:00', tokens: 2390, latency: 380 },
  { time: '24:00', tokens: 3490, latency: 430 },
];

export const MOCK_STATUS_DATA = [
  { name: 'Success', value: 85, color: '#10b981' }, // emerald-500
  { name: 'Failed', value: 10, color: '#ef4444' }, // red-500
  { name: 'Pending', value: 5, color: '#f59e0b' }, // amber-500
];

export const MOCK_AGENT_STATES = [
  { name: 'Working', count: 42 },
  { name: 'Pending Confirm', count: 12 },
  { name: 'Idle', count: 8 },
  { name: 'Ideating', count: 24 },
  { name: 'Blocked', count: 3 },
];

export const MOCK_DEPLOYMENTS: DeploymentLocation[] = [
  { region: 'us-east-1', count: 120, health: 99 },
  { region: 'us-west-2', count: 85, health: 98 },
  { region: 'eu-central-1', count: 64, health: 95 },
  { region: 'ap-northeast-1', count: 42, health: 92 },
  { region: 'sa-east-1', count: 12, health: 85 },
];

export const MOCK_ACTIVITIES: AgentActivity[] = [
  { id: '1', agentName: 'DataScraper_Alpha', action: 'Completed web scraping task', timestamp: '2 mins ago', status: 'success' },
  { id: '2', agentName: 'ReportGen_V2', action: 'Encountered rate limit', timestamp: '5 mins ago', status: 'failed' },
  { id: '3', agentName: 'SupportBot_Prod', action: 'Waiting for user confirmation', timestamp: '12 mins ago', status: 'pending' },
  { id: '4', agentName: 'CodeReviewer', action: 'Merged PR #442', timestamp: '18 mins ago', status: 'success' },
  { id: '5', agentName: 'EmailAgent', action: 'Drafted campaign outline', timestamp: '22 mins ago', status: 'success' },
  { id: '6', agentName: 'DataScraper_Beta', action: 'Failed to parse JSON', timestamp: '1 hour ago', status: 'failed' },
];

export const MOCK_ISSUE_RATES = [
  { model: 'Claude 3 Opus', rate: 2.1 },
  { model: 'Llama 3.1 70B', rate: 1.4 },
  { model: 'GPT-4o', rate: 2.8 },
  { model: 'Claude 3.5 Sonnet', rate: 1.9 },
];

// --- Cost / Billing mock data ---

export const MOCK_COST_SUMMARY: CostSummaryData = {
  spendToday: { label: 'Spend Today', value: 2450.0, delta: 3.2 },
  spendThisMonth: { label: 'Spend This Month', value: 48320.5, delta: -1.8 },
  avgCostPerRun: { label: 'Avg Cost / Run', value: 0.42, delta: 0.5 },
  avgCostPerTask: { label: 'Avg Cost / Task', value: 1.87, delta: -2.1 },
  currency: 'USD',
};

export const MOCK_COST_TREND_24H: CostTrendData = {
  range: '24h',
  granularity: 'hourly',
  currency: 'USD',
  points: [
    { time: '2026-06-25T14:00:00Z', label: '14:00', cost: 98.2, budget: 125 },
    { time: '2026-06-25T15:00:00Z', label: '15:00', cost: 112.5, budget: 125 },
    { time: '2026-06-25T16:00:00Z', label: '16:00', cost: 145.3, budget: 125 },
    { time: '2026-06-25T17:00:00Z', label: '17:00', cost: 138.9, budget: 125 },
    { time: '2026-06-25T18:00:00Z', label: '18:00', cost: 95.4, budget: 125 },
    { time: '2026-06-25T19:00:00Z', label: '19:00', cost: 78.1, budget: 125 },
    { time: '2026-06-25T20:00:00Z', label: '20:00', cost: 65.0, budget: 125 },
    { time: '2026-06-25T21:00:00Z', label: '21:00', cost: 52.3, budget: 125 },
    { time: '2026-06-25T22:00:00Z', label: '22:00', cost: 44.8, budget: 125 },
    { time: '2026-06-25T23:00:00Z', label: '23:00', cost: 39.1, budget: 125 },
    { time: '2026-06-26T00:00:00Z', label: '00:00', cost: 31.2, budget: 125 },
    { time: '2026-06-26T01:00:00Z', label: '01:00', cost: 28.9, budget: 125 },
    { time: '2026-06-26T02:00:00Z', label: '02:00', cost: 25.4, budget: 125 },
    { time: '2026-06-26T03:00:00Z', label: '03:00', cost: 22.7, budget: 125 },
    { time: '2026-06-26T04:00:00Z', label: '04:00', cost: 31.5, budget: 125 },
    { time: '2026-06-26T05:00:00Z', label: '05:00', cost: 48.3, budget: 125 },
    { time: '2026-06-26T06:00:00Z', label: '06:00', cost: 87.6, budget: 125 },
    { time: '2026-06-26T07:00:00Z', label: '07:00', cost: 122.4, budget: 125 },
    { time: '2026-06-26T08:00:00Z', label: '08:00', cost: 154.8, budget: 125 },
    { time: '2026-06-26T09:00:00Z', label: '09:00', cost: 178.2, budget: 125 },
    { time: '2026-06-26T10:00:00Z', label: '10:00', cost: 165.9, budget: 125 },
    { time: '2026-06-26T11:00:00Z', label: '11:00', cost: 143.1, budget: 125 },
    { time: '2026-06-26T12:00:00Z', label: '12:00', cost: 198.5, budget: 125 },
    { time: '2026-06-26T13:00:00Z', label: '13:00', cost: 186.3, budget: 125 },
  ],
};

export const MOCK_COST_TREND_7D: CostTrendData = {
  range: '7d',
  granularity: 'daily',
  currency: 'USD',
  points: [
    { time: '2026-06-20T00:00:00Z', label: 'Jun 20', cost: 1823.4, budget: 3000 },
    { time: '2026-06-21T00:00:00Z', label: 'Jun 21', cost: 2104.7, budget: 3000 },
    { time: '2026-06-22T00:00:00Z', label: 'Jun 22', cost: 1956.2, budget: 3000 },
    { time: '2026-06-23T00:00:00Z', label: 'Jun 23', cost: 2389.5, budget: 3000 },
    { time: '2026-06-24T00:00:00Z', label: 'Jun 24', cost: 2212.8, budget: 3000 },
    { time: '2026-06-25T00:00:00Z', label: 'Jun 25', cost: 2098.1, budget: 3000 },
    { time: '2026-06-26T00:00:00Z', label: 'Jun 26', cost: 2450.0, budget: 3000 },
  ],
};

// 30D range excludes today — today's partial spend is shown in the 24h/7d views only.
export const MOCK_COST_TREND_30D: CostTrendData = {
  range: '30d',
  granularity: 'daily',
  currency: 'USD',
  points: [
    { time: '2026-05-27T00:00:00Z', label: 'May 27', cost: 1640.2 },
    { time: '2026-05-28T00:00:00Z', label: 'May 28', cost: 1720.5 },
    { time: '2026-05-29T00:00:00Z', label: 'May 29', cost: 1589.1 },
    { time: '2026-05-30T00:00:00Z', label: 'May 30', cost: 1803.4 },
    { time: '2026-05-31T00:00:00Z', label: 'May 31', cost: 1950.0 },
    { time: '2026-06-01T00:00:00Z', label: 'Jun 1', cost: 2012.7 },
    { time: '2026-06-02T00:00:00Z', label: 'Jun 2', cost: 1876.3 },
    { time: '2026-06-03T00:00:00Z', label: 'Jun 3', cost: 1765.9 },
    { time: '2026-06-04T00:00:00Z', label: 'Jun 4', cost: 1923.4 },
    { time: '2026-06-05T00:00:00Z', label: 'Jun 5', cost: 2145.2 },
    { time: '2026-06-06T00:00:00Z', label: 'Jun 6', cost: 2234.8 },
    { time: '2026-06-07T00:00:00Z', label: 'Jun 7', cost: 2089.5 },
    { time: '2026-06-08T00:00:00Z', label: 'Jun 8', cost: 1978.1 },
    { time: '2026-06-09T00:00:00Z', label: 'Jun 9', cost: 2156.7 },
    { time: '2026-06-10T00:00:00Z', label: 'Jun 10', cost: 2301.3 },
    { time: '2026-06-11T00:00:00Z', label: 'Jun 11', cost: 2189.6 },
    { time: '2026-06-12T00:00:00Z', label: 'Jun 12', cost: 2045.8 },
    { time: '2026-06-13T00:00:00Z', label: 'Jun 13', cost: 1934.2 },
    { time: '2026-06-14T00:00:00Z', label: 'Jun 14', cost: 2212.9 },
    { time: '2026-06-15T00:00:00Z', label: 'Jun 15', cost: 2387.4 },
    { time: '2026-06-16T00:00:00Z', label: 'Jun 16', cost: 2256.1 },
    { time: '2026-06-17T00:00:00Z', label: 'Jun 17', cost: 2143.7 },
    { time: '2026-06-18T00:00:00Z', label: 'Jun 18', cost: 1989.3 },
    { time: '2026-06-19T00:00:00Z', label: 'Jun 19', cost: 2067.8 },
    { time: '2026-06-20T00:00:00Z', label: 'Jun 20', cost: 1823.4 },
    { time: '2026-06-21T00:00:00Z', label: 'Jun 21', cost: 2104.7 },
    { time: '2026-06-22T00:00:00Z', label: 'Jun 22', cost: 1956.2 },
    { time: '2026-06-23T00:00:00Z', label: 'Jun 23', cost: 2389.5 },
    { time: '2026-06-24T00:00:00Z', label: 'Jun 24', cost: 2212.8 },
    { time: '2026-06-25T00:00:00Z', label: 'Jun 25', cost: 2098.1 },
  ],
};

export const MOCK_BUDGET: BudgetUtilizationData = {
  daily: {
    limit: 3000,
    spent: 2450,
    projectedSpend: 2840,
  },
  monthly: {
    limit: 60000,
    spent: 48320.5,
    projectedSpend: 59120,
  },
  currency: 'USD',
};

export const MOCK_COST_DRIVERS: CostDriversData = {
  period: 'today',
  totalSpend: 2450.0,
  currency: 'USD',
  drivers: [
    { agentId: 'agent-001', agentName: 'DataScraper_Alpha', totalCost: 612.5, runCount: 1250, costPerRun: 0.49, shareOfTotal: 25.0 },
    { agentId: 'agent-002', agentName: 'ReportGen_V2', totalCost: 490.0, runCount: 845, costPerRun: 0.58, shareOfTotal: 20.0 },
    { agentId: 'agent-003', agentName: 'CodeReviewer', totalCost: 367.5, runCount: 620, costPerRun: 0.59, shareOfTotal: 15.0 },
    { agentId: 'agent-004', agentName: 'SupportBot_Prod', totalCost: 294.0, runCount: 980, costPerRun: 0.30, shareOfTotal: 12.0 },
    { agentId: 'agent-005', agentName: 'EmailAgent', totalCost: 245.0, runCount: 490, costPerRun: 0.50, shareOfTotal: 10.0 },
    { agentId: 'agent-006', agentName: 'DataScraper_Beta', totalCost: 196.0, runCount: 392, costPerRun: 0.50, shareOfTotal: 8.0 },
    { agentId: 'agent-007', agentName: 'AnalyticsBot', totalCost: 147.0, runCount: 245, costPerRun: 0.60, shareOfTotal: 6.0 },
    { agentId: 'agent-008', agentName: 'TranslationAgent', totalCost: 98.0, runCount: 280, costPerRun: 0.35, shareOfTotal: 4.0 },
  ],
};

export const MOCK_COST_DRIVERS_WEEK: CostDriversData = {
  period: 'week',
  totalSpend: 17150.0,
  currency: 'USD',
  drivers: [
    { agentId: 'agent-001', agentName: 'DataScraper_Alpha', totalCost: 4287.5, runCount: 8750, costPerRun: 0.49, shareOfTotal: 25.0 },
    { agentId: 'agent-002', agentName: 'ReportGen_V2', totalCost: 3430.0, runCount: 5915, costPerRun: 0.58, shareOfTotal: 20.0 },
    { agentId: 'agent-003', agentName: 'CodeReviewer', totalCost: 2572.5, runCount: 4340, costPerRun: 0.59, shareOfTotal: 15.0 },
    { agentId: 'agent-004', agentName: 'SupportBot_Prod', totalCost: 2058.0, runCount: 6860, costPerRun: 0.30, shareOfTotal: 12.0 },
    { agentId: 'agent-005', agentName: 'EmailAgent', totalCost: 1715.0, runCount: 3430, costPerRun: 0.50, shareOfTotal: 10.0 },
    { agentId: 'agent-006', agentName: 'DataScraper_Beta', totalCost: 1372.0, runCount: 2744, costPerRun: 0.50, shareOfTotal: 8.0 },
    { agentId: 'agent-007', agentName: 'AnalyticsBot', totalCost: 1029.0, runCount: 1715, costPerRun: 0.60, shareOfTotal: 6.0 },
    { agentId: 'agent-008', agentName: 'TranslationAgent', totalCost: 686.0, runCount: 1960, costPerRun: 0.35, shareOfTotal: 4.0 },
  ],
};
