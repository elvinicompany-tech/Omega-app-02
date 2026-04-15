import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Lead, Project, Client, StrategyItem, OKR, Step, Capture, UserRole, Sale, Seller, Goal, Note, Mission, ClientMetricRecord, ManagerTask } from '../types';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  onSnapshot, 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  query,
  orderBy,
  OperationType,
  handleFirestoreError
} from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { ToastType } from '../components/ui/Toast';

interface DataContextType {
  user: FirebaseUser | null;
  loading: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toast: { message: string; type: ToastType } | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
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
  addClient: (client: Omit<Client, 'id'>) => Client;
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
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  getCurrentMonthGoal: () => Goal;

  notes: Note[];
  updateNote: (userId: string, content: string) => void;

  missions: Mission[];
  addMission: (mission: Omit<Mission, 'id' | 'createdAt' | 'completed'>) => void;
  toggleMission: (id: string) => void;
  deleteMission: (id: string) => void;

  clientMetrics: ClientMetricRecord[];
  addClientMetric: (metric: Omit<ClientMetricRecord, 'id'>) => void;
  updateClientMetric: (id: string, updates: Partial<ClientMetricRecord>) => void;

  managerTasks: ManagerTask[];
  addManagerTask: (task: Omit<ManagerTask, 'id' | 'completed'>) => void;
  toggleManagerTask: (id: string) => void;
  deleteManagerTask: (id: string) => void;
  currentUserId: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
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
  const [missions, setMissions] = useState<Mission[]>([]);
  const [clientMetrics, setClientMetrics] = useState<ClientMetricRecord[]>([]);
  const [managerTasks, setManagerTasks] = useState<ManagerTask[]>([]);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const currentUserId = user?.uid || 'guest';

  const showToast = (message: string, type: ToastType) => setToast({ message, type });
  const hideToast = () => setToast(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch user role from Firestore
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              setUserRole(docSnap.data().role as UserRole);
            } else {
              const isAdmin = firebaseUser.email === 'viniciusbarbosasampaio71@gmail.com';
              setDoc(userDocRef, {
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                role: isAdmin ? 'CEO' : 'Colaborador',
                avatar: firebaseUser.photoURL
              });
              if (isAdmin) setUserRole('CEO');
            }
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Listeners
  useEffect(() => {
    if (!user) return;

    const unsubscribes = [
      onSnapshot(collection(db, 'clients'), (snap) => {
        setClients(snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Client)));
      }, (err) => handleFirestoreError(err, OperationType.LIST, 'clients')),

      onSnapshot(collection(db, 'sales'), (snap) => {
        setSales(snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Sale)));
      }),

      onSnapshot(collection(db, 'managerTasks'), (snap) => {
        setManagerTasks(snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as ManagerTask)));
      }),

      onSnapshot(collection(db, 'sellers'), (snap) => {
        setSellers(snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Seller)));
      }),

      onSnapshot(collection(db, 'goals'), (snap) => {
        setGoals(snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Goal)));
      }),

      onSnapshot(collection(db, 'clientMetrics'), (snap) => {
        setClientMetrics(snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as ClientMetricRecord)));
      })
    ];

    return () => unsubscribes.forEach(unsub => unsub());
  }, [user]);

  const addLead = (lead: Omit<Lead, 'id'>) => {
    // For now keeping leads in memory or implement Firestore if needed
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
    const clientData = { ...client, createdAt: new Date().toISOString() };
    addDoc(collection(db, 'clients'), clientData)
      .catch(err => handleFirestoreError(err, OperationType.CREATE, 'clients'));
    return { ...clientData, id: 'temp' } as Client;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    updateDoc(doc(db, 'clients', id), updates)
      .catch(err => handleFirestoreError(err, OperationType.UPDATE, `clients/${id}`));
  };

  const deleteClient = (id: string) => {
    deleteDoc(doc(db, 'clients', id))
      .catch(err => handleFirestoreError(err, OperationType.DELETE, `clients/${id}`));
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
    setSteps(steps.filter(s => s.action !== id));
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
    addDoc(collection(db, 'sales'), sale)
      .catch(err => handleFirestoreError(err, OperationType.CREATE, 'sales'));
  };

  const addSeller = (seller: Omit<Seller, 'id'>) => {
    addDoc(collection(db, 'sellers'), seller)
      .catch(err => handleFirestoreError(err, OperationType.CREATE, 'sellers'));
  };

  const deleteSeller = (id: string) => {
    deleteDoc(doc(db, 'sellers', id))
      .catch(err => handleFirestoreError(err, OperationType.DELETE, `sellers/${id}`));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    addDoc(collection(db, 'goals'), goal)
      .catch(err => handleFirestoreError(err, OperationType.CREATE, 'goals'));
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    updateDoc(doc(db, 'goals', id), updates)
      .catch(err => handleFirestoreError(err, OperationType.UPDATE, `goals/${id}`));
  };

  const getCurrentMonthGoal = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const existingGoal = goals.find(g => g.month === currentMonth);
    
    const activeClientsValue = clients
      .filter(c => c.status === 'Ativo')
      .reduce((acc, c) => {
        const clean = c.revenue.replace(/[R$\.\/mês\s]/g, '').replace(',', '.');
        return acc + (parseFloat(clean) || 0);
      }, 0);

    if (existingGoal) {
      if (existingGoal.renewalTarget === 0) {
        return { ...existingGoal, renewalTarget: activeClientsValue };
      }
      return existingGoal;
    }

    return {
      id: 'temp',
      month: currentMonth,
      targetValue: 0,
      renewalTarget: activeClientsValue
    };
  };

  const updateNote = (userId: string, content: string) => {
    // Notes logic can be migrated to Firestore too
    const existing = notes.find(n => n.userId === userId);
    if (existing) {
      setNotes(notes.map(n => n.userId === userId ? { ...n, content, updatedAt: new Date().toISOString() } : n));
    } else {
      setNotes([...notes, { id: Math.random().toString(36).substr(2, 9), userId, content, updatedAt: new Date().toISOString() }]);
    }
  };

  const addMission = (mission: Omit<Mission, 'id' | 'createdAt' | 'completed'>) => {
    setMissions([...missions, { 
      ...mission, 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString(),
      completed: false 
    }]);
  };

  const toggleMission = (id: string) => {
    setMissions(missions.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const deleteMission = (id: string) => {
    setMissions(missions.filter(m => m.id !== id));
  };

  const addClientMetric = (metric: Omit<ClientMetricRecord, 'id'>) => {
    addDoc(collection(db, 'clientMetrics'), metric)
      .catch(err => handleFirestoreError(err, OperationType.CREATE, 'clientMetrics'));
  };

  const updateClientMetric = (id: string, updates: Partial<ClientMetricRecord>) => {
    updateDoc(doc(db, 'clientMetrics', id), updates)
      .catch(err => handleFirestoreError(err, OperationType.UPDATE, `clientMetrics/${id}`));
  };

  const addManagerTask = (task: Omit<ManagerTask, 'id' | 'completed'>) => {
    addDoc(collection(db, 'managerTasks'), { ...task, completed: false })
      .catch(err => handleFirestoreError(err, OperationType.CREATE, 'managerTasks'));
  };

  const toggleManagerTask = (id: string) => {
    const task = managerTasks.find(t => t.id === id);
    if (task) {
      updateDoc(doc(db, 'managerTasks', id), { completed: !task.completed })
        .catch(err => handleFirestoreError(err, OperationType.UPDATE, `managerTasks/${id}`));
    }
  };

  const deleteManagerTask = (id: string) => {
    deleteDoc(doc(db, 'managerTasks', id))
      .catch(err => handleFirestoreError(err, OperationType.DELETE, `managerTasks/${id}`));
  };

  return (
    <DataContext.Provider value={{
      user, loading,
      userRole, setUserRole,
      toast, showToast, hideToast,
      leads, addLead, moveLead, deleteLead,
      projects, addProject, updateProjectProgress, updateProject, deleteProject,
      clients, addClient, updateClient, deleteClient,
      strategies, addStrategy, deleteStrategy,
      okrs, addOKR, deleteOKR, steps, addStep, deleteStep,
      captures, addCapture, updateCapture, deleteCapture,
      sales, addSale, sellers, addSeller, deleteSeller, 
      goals, addGoal, updateGoal, getCurrentMonthGoal,
      notes, updateNote,
      missions, addMission, toggleMission, deleteMission,
      clientMetrics, addClientMetric, updateClientMetric,
      managerTasks, addManagerTask, toggleManagerTask, deleteManagerTask, currentUserId
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
