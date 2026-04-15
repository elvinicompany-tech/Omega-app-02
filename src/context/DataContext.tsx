import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lead, Project, Client, StrategyItem, OKR, Step, Capture, UserRole, Sale, Seller, Goal, Note } from '../types';

interface DataContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id'>) => void;
  moveLead: (id: string, stage: Lead['stage']) => void;
  deleteLead: (id: string) => void;
  
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProjectProgress: (id: number, progress: number) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
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

  captures: Capture[];
  addCapture: (capture: Omit<Capture, 'id'>) => void;
  updateCapture: (id: string, updates: Partial<Capture>) => void;
  deleteCapture: (id: string) => void;

  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id'>) => void;
  
  sellers: Seller[];
  addSeller: (seller: Omit<Seller, 'id'>) => void;
  deleteSeller: (id: string) => void;

  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;

  notes: Note[];
  updateNote: (userId: string, content: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>('CEO');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [strategies, setStrategies] = useState<StrategyItem[]>([]);
  const [okrs, setOkrs] = useState<OKR[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

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
    setProjects([...projects, { ...project, id: projects.length + 1, type: project.type || 'Único' }]);
  };

  const updateProjectProgress = (id: number, progress: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, progress } : p));
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    setClients([...clients, { ...client, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() }]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
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

  const addCapture = (capture: Omit<Capture, 'id'>) => {
    setCaptures([...captures, { ...capture, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateCapture = (id: string, updates: Partial<Capture>) => {
    setCaptures(captures.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCapture = (id: string) => {
    setCaptures(captures.filter(c => c.id !== id));
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    setSales([...sales, { ...sale, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const addSeller = (seller: Omit<Seller, 'id'>) => {
    setSellers([...sellers, { ...seller, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const deleteSeller = (id: string) => {
    setSellers(sellers.filter(s => s.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals([...goals, { ...goal, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateNote = (userId: string, content: string) => {
    const existing = notes.find(n => n.userId === userId);
    if (existing) {
      setNotes(notes.map(n => n.userId === userId ? { ...n, content, updatedAt: new Date().toISOString() } : n));
    } else {
      setNotes([...notes, { id: Math.random().toString(36).substr(2, 9), userId, content, updatedAt: new Date().toISOString() }]);
    }
  };

  return (
    <DataContext.Provider value={{
      userRole, setUserRole,
      leads, addLead, moveLead, deleteLead,
      projects, addProject, updateProjectProgress, updateProject, deleteProject,
      clients, addClient, updateClient, deleteClient,
      strategies, addStrategy, deleteStrategy,
      okrs, addOKR, deleteOKR, steps, addStep, deleteStep,
      captures, addCapture, updateCapture, deleteCapture,
      sales, addSale, sellers, addSeller, deleteSeller, goals, addGoal, notes, updateNote
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
