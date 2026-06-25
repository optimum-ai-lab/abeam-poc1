export type WidgetType = 
  | 'metrics' 
  | 'activities' 
  | 'trends' 
  | 'deployment' 
  | 'status' 
  | 'issue_rate' 
  | 'agent_state';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large' | 'full';
}

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
