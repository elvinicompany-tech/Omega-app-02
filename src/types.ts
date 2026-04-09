export interface Stat {
  label: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down' | 'neutral';
}

export interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
  img?: string;
  online?: boolean;
  isBot?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  desc: string;
  value: string;
  time: string;
  stage: 'prospect' | 'meeting' | 'proposal' | 'closing';
  event?: { time: string; label: string };
  status?: string;
  verified?: boolean;
}

export interface Project {
  id: number;
  title: string;
  status: string;
  progress: number;
  team: string[];
  deadline: string;
  priority: 'Alta' | 'Média' | 'Baixa';
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'Ativo' | 'Onboarding' | 'Pausado';
  revenue: string;
  location: string;
  contact: string;
  since: string;
  logo: string;
}

export interface StrategyItem {
  id: string;
  title: string;
  client: string;
  status: string;
  priority: 'Crítica' | 'Alta' | 'Média' | 'Baixa';
  progress: number;
  tags: string[];
}

export interface OKR {
  id: string;
  title: string;
  progress: number;
  target: string;
  category: string;
}

export interface Step {
  action: string;
  due: string;
  priority: 'Urgente' | 'Alta' | 'Média' | 'Baixa';
}
