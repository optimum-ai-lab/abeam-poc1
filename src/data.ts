import { AgentActivity, DeploymentLocation, WidgetConfig } from './types';

export const WIDGET_LIBRARY: WidgetConfig[] = [
  { id: 'metrics_1', type: 'metrics', title: 'Key Metrics', description: 'Overview of total, active agents, and cost.', size: 'full' },
  { id: 'trends_1', type: 'trends', title: 'Performance Trends', description: 'Token usage and latency over time.', size: 'large' },
  { id: 'status_1', type: 'status', title: 'Agent Status', description: 'Success vs Failure rates.', size: 'medium' },
  { id: 'agent_state_1', type: 'agent_state', title: 'Work States', description: 'Current states of agents.', size: 'medium' },
  { id: 'deployment_1', type: 'deployment', title: 'Deployment Regions', description: 'Distribution of agents globally.', size: 'medium' },
  { id: 'issue_rate_1', type: 'issue_rate', title: 'Issue Rate', description: 'Error rates across models.', size: 'medium' },
  { id: 'activities_1', type: 'activities', title: 'Recent Activities', description: 'Real-time log of agent actions.', size: 'full' },
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
