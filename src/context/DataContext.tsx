import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lead, Project, Client, StrategyItem, OKR, Step } from '../types';

interface DataContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id'>) => void;
  moveLead: (id: string, stage: Lead['stage']) => void;
  deleteLead: (id: string) => void;
  
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProjectProgress: (id: number, progress: number) => void;
  deleteProject: (id: number) => void;
  
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  deleteClient: (id: string) => void;
  
  strategies: StrategyItem[];
  addStrategy: (strategy: Omit<StrategyItem, 'id'>) => void;
  deleteStrategy: (id: string) => void;
  
  okrs: OKR[];
  addOKR: (okr: Omit<OKR, 'id'>) => void;
  deleteOKR: (id: string) => void;
  
  steps: Step[];
  addStep: (step: Step) => void;
  deleteStep: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'Nexus Tech Solutions', desc: 'Implementação de infraestrutura Cloud e segurança de dados.', value: 'R$ 45.000', time: '3 dias', stage: 'prospect' },
    { id: '2', name: 'Solaris Global', desc: 'Consultoria de expansão para mercado LatAm.', value: 'R$ 82.000', time: '1 dia', stage: 'prospect' },
    { id: '3', name: 'Capital Venture S.A', desc: 'Apresentação Técnica', value: 'R$ 120.000', time: '8 dias', stage: 'meeting', event: { time: 'Hoje às 15:30', label: 'Apresentação Técnica' } },
    { id: '4', name: 'Innovate Retail', desc: 'Aguardando Aceite', value: 'R$ 38.500', time: '14 dias', stage: 'proposal', status: 'Aguardando Aceite' },
    { id: '5', name: 'Quantum Logistcs', desc: 'Contrato em revisão jurídica', value: 'R$ 210.000', time: '22 dias', stage: 'closing', verified: true },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: 'Campanha de Lançamento - Nexus V2', status: 'Em Edição', progress: 65, team: ['https://picsum.photos/seed/user1/200/200', 'https://picsum.photos/seed/user2/200/200'], deadline: '24 Out', priority: 'Alta' },
    { id: 2, title: 'Institucional Solaris Global', status: 'Captação', progress: 30, team: ['https://picsum.photos/seed/user3/200/200'], deadline: '02 Nov', priority: 'Média' },
    { id: 3, title: 'Série de Reels - Quantum Logistcs', status: 'Roteirização', progress: 15, team: ['https://picsum.photos/seed/user1/200/200', 'https://picsum.photos/seed/user3/200/200'], deadline: '15 Nov', priority: 'Alta' },
  ]);

  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Nexus Tech Solutions', industry: 'Tecnologia & SaaS', status: 'Ativo', revenue: 'R$ 12.500/mês', location: 'São Paulo, SP', contact: 'Ricardo Mendes', since: 'Jan 2024', logo: 'https://picsum.photos/seed/nexus/200/200' },
    { id: '2', name: 'Solaris Global', industry: 'Energia Renovável', status: 'Ativo', revenue: 'R$ 8.200/mês', location: 'Curitiba, PR', contact: 'Julia Santos', since: 'Mar 2024', logo: 'https://picsum.photos/seed/solaris/200/200' },
    { id: '3', name: 'Quantum Logistics', industry: 'Transporte & Logística', status: 'Onboarding', revenue: 'R$ 15.000/mês', location: 'Santos, SP', contact: 'Marcos Pereira', since: 'Abr 2024', logo: 'https://picsum.photos/seed/quantum/200/200' },
    { id: '4', name: 'Innovate Retail', industry: 'Varejo Digital', status: 'Pausado', revenue: 'R$ 5.400/mês', location: 'Belo Horizonte, MG', contact: 'Ana Clara', since: 'Dez 2023', logo: 'https://picsum.photos/seed/innovate/200/200' },
  ]);

  const [strategies, setStrategies] = useState<StrategyItem[]>([
    { id: '1', title: 'Expansão LatAm 2024', client: 'Solaris Global', status: 'Em Execução', priority: 'Crítica', progress: 45, tags: ['Market Entry', 'Branding', 'Ads'] },
    { id: '2', title: 'Otimização de Funil Q4', client: 'Nexus Tech', status: 'Planejamento', priority: 'Alta', progress: 15, tags: ['CRO', 'SaaS', 'Retention'] },
    { id: '3', title: 'Rebranding Institucional', client: 'Quantum Logistics', status: 'Aprovação', priority: 'Média', progress: 90, tags: ['Visual Identity', 'Motion'] },
  ]);

  const [okrs, setOkrs] = useState<OKR[]>([
    { id: '1', title: 'Dominância no Setor Tech', target: '15% market share', progress: 65, category: 'Crescimento' },
    { id: '2', title: 'Eficiência de Produção', target: 'Reduzir tempo em 20%', progress: 40, category: 'Eficiência' },
    { id: '3', title: 'Expansão de Receita', target: 'R$ 500k MRR', progress: 82, category: 'Crescimento' },
  ]);

  const [steps, setSteps] = useState<Step[]>([
    { action: 'Finalizar Roteiro Nexus V2', due: 'Hoje', priority: 'Urgente' },
    { action: 'Reunião de Alinhamento Solaris', due: 'Amanhã, 14:00', priority: 'Alta' },
    { action: 'Review de Performance Semanal', due: 'Sexta, 09:00', priority: 'Média' },
    { action: 'Update de Criativos Quantum', due: '24 Out', priority: 'Baixa' },
  ]);

  const addLead = (lead: Omit<Lead, 'id'>) => {
    setLeads([...leads, { ...lead, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const moveLead = (id: string, stage: Lead['stage']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, stage } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects([...projects, { ...project, id: projects.length + 1 }]);
  };

  const updateProjectProgress = (id: number, progress: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, progress } : p));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    setClients([...clients, { ...client, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addStrategy = (strategy: Omit<StrategyItem, 'id'>) => {
    setStrategies([...strategies, { ...strategy, id: Math.random().toString(36).substr(2, 9), client: 'N/A', tags: [] }]);
  };

  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter(s => s.id !== id));
  };

  const addOKR = (okr: Omit<OKR, 'id'>) => {
    setOkrs([...okrs, { ...okr, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const deleteOKR = (id: string) => {
    setOkrs(okrs.filter(o => o.id !== id));
  };

  const addStep = (step: Step) => {
    setSteps([...steps, step]);
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter(s => s.action !== id)); // Using action as ID for steps as they don't have one
  };

  return (
    <DataContext.Provider value={{
      leads, addLead, moveLead, deleteLead,
      projects, addProject, updateProjectProgress, deleteProject,
      clients, addClient, deleteClient,
      strategies, addStrategy, deleteStrategy,
      okrs, addOKR, deleteOKR, steps, addStep, deleteStep
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
