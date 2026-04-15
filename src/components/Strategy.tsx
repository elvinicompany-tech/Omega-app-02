import React, { useState } from 'react';
import { 
  Target, 
  Zap, 
  Brain, 
  Search, 
  ArrowRight, 
  MoreVertical, 
  Plus, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  Eye,
  Circle,
  Trash2,
  Clock
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import { OKR, StrategyItem } from '../types';

export default function Strategy() {
  const { strategies, okrs, steps, addStrategy, addOKR, deleteStrategy, deleteOKR, deleteStep } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'strategy' | 'okr'>('strategy');
  const [searchTerm, setSearchTerm] = useState('');

  const [newStrategy, setNewStrategy] = useState<Omit<StrategyItem, 'id'>>({
    title: '',
    client: '',
    status: 'Em Execução',
    progress: 0,
    priority: 'Alta',
    tags: []
  });

  const [newOKR, setNewOKR] = useState<Omit<OKR, 'id'>>({
    title: '',
    progress: 0,
    target: '',
    category: 'Crescimento'
  });

  const filteredStrategies = strategies.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'strategy') {
      addStrategy(newStrategy);
      setNewStrategy({ title: '', client: '', status: 'Em Execução', progress: 0, priority: 'Alta', tags: [] });
    } else {
      addOKR(newOKR);
      setNewOKR({ title: '', progress: 0, target: '', category: 'Crescimento' });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Strategic Planning</p>
          <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tight">Visão & OKRs</h2>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-white transition-colors" />
            <input 
              className="bg-surface-low border-b border-white/20 focus:border-white focus:ring-0 text-sm py-3 pl-12 pr-6 rounded-t-lg w-full md:w-64 transition-all outline-none" 
              placeholder="Buscar estratégias..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { setModalType('strategy'); setIsModalOpen(true); }}
            className="px-6 py-2.5 rounded-full bg-white text-on-primary font-label text-xs font-bold uppercase tracking-wider signature-glow hover:scale-95 transition-transform flex items-center gap-2"
          >
            <Plus size={16} />
            Nova Estratégia
          </button>
        </div>
      </section>

      {/* OKRs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {okrs.map((okr) => (
          <div key={okr.id} className="glass-panel p-8 rounded-2xl ghost-border space-y-6 group hover:bg-white/5 transition-all">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded bg-white/5 text-white">
                <Target size={20} />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => deleteOKR(okr.id)}
                  className="p-1 hover:bg-red-500/10 text-on-surface-variant hover:text-red-400 transition-colors rounded"
                  title="Excluir OKR"
                >
                  <Trash2 size={14} />
                </button>
                <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{okr.category}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-headline font-bold text-white group-hover:text-glow transition-all">{okr.title}</h3>
              <p className="text-xs text-on-surface-variant font-body">Meta: {okr.target}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                <span>Progresso</span>
                <span>{okr.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full pill-glow transition-all duration-1000" 
                  style={{ width: `${okr.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        <div 
          onClick={() => { setModalType('okr'); setIsModalOpen(true); }}
          className="rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-white/30 transition-all hover:bg-white/2"
        >
          <Plus size={24} className="text-white/40 group-hover:text-white mb-2" />
          <p className="text-xs font-bold text-white/40 group-hover:text-white uppercase tracking-widest">Novo OKR</p>
        </div>
      </div>

      {/* Strategic Initiatives */}
      <section className="glass-panel rounded-2xl ghost-border overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-headline font-bold text-white uppercase tracking-tight">Iniciativas Estratégicas</h3>
          <button className="text-on-surface-variant hover:text-white transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {filteredStrategies.map((strategy) => (
            <div key={strategy.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-6">
                <div className={`p-3 rounded-xl bg-white/5 ${strategy.progress === 100 ? 'text-emerald-400' : 'text-white'}`}>
                  {strategy.progress === 100 ? <CheckCircle2 size={24} /> : <Zap size={24} />}
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-headline font-bold text-white group-hover:text-glow transition-all">{strategy.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      strategy.priority === 'Alta' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {strategy.priority}
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{strategy.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-48 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                    <span>{strategy.progress}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-500" 
                      style={{ width: `${strategy.progress}%` }}
                    />
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/10 text-on-surface-variant hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => deleteStrategy(strategy.id)}
                  className="p-2 rounded-full hover:bg-red-500/10 text-on-surface-variant hover:text-red-400 transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximos Passos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-2xl ghost-border space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 text-white">
                <Clock size={20} />
              </div>
              <h3 className="font-headline font-bold text-white uppercase tracking-tight">Próximos Passos</h3>
            </div>
            <button className="text-[10px] font-label font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Ver Calendário</button>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/5 group hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    step.priority === 'Urgente' ? 'bg-red-400' :
                    step.priority === 'Alta' ? 'bg-amber-400' :
                    'bg-blue-400'
                  }`} />
                  <div>
                    <p className="text-sm text-white font-medium">{step.action}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{step.due}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteStep(step.action)}
                  className="p-2 text-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl ghost-border bg-gradient-to-br from-surface to-surface-low flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center ghost-border">
            <Brain size={32} className="text-white" />
          </div>
          <div className="space-y-2">
            <h4 className="font-headline text-xl font-bold text-white">AI Strategy Advisor</h4>
            <p className="text-sm text-on-surface-variant max-w-[280px]">Deixe nossa IA analisar seus OKRs e sugerir as melhores táticas para o próximo sprint.</p>
          </div>
          <button 
            onClick={() => alert('Análise estratégica em processamento...')}
            className="px-8 py-3 rounded-full bg-white text-on-primary font-label text-xs font-bold uppercase tracking-widest signature-glow hover:scale-95 transition-transform"
          >
            Gerar Insights
          </button>
        </div>
      </section>

      {/* Modal Nova Estratégia / OKR */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalType === 'strategy' ? 'Nova Iniciativa' : 'Novo OKR'}>
        <form onSubmit={handleAdd} className="space-y-4">
          {modalType === 'strategy' ? (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Título da Iniciativa</label>
                <input 
                  required
                  type="text" 
                  value={newStrategy.title}
                  onChange={e => setNewStrategy({...newStrategy, title: e.target.value})}
                  className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Ex: Expansão para Mercado SaaS"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Prioridade</label>
                  <select 
                    value={newStrategy.priority}
                    onChange={e => setNewStrategy({...newStrategy, priority: e.target.value as StrategyItem['priority']})}
                    className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 appearance-none"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Status</label>
                  <select 
                    value={newStrategy.status}
                    onChange={e => setNewStrategy({...newStrategy, status: e.target.value as StrategyItem['status']})}
                    className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 appearance-none"
                  >
                    <option value="Em Execução">Em Execução</option>
                    <option value="Planejamento">Planejamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Título do OKR</label>
                <input 
                  required
                  type="text" 
                  value={newOKR.title}
                  onChange={e => setNewOKR({...newOKR, title: e.target.value})}
                  className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Ex: Aumentar MRR em 20%"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Meta Quantitativa</label>
                <input 
                  required
                  type="text" 
                  value={newOKR.target}
                  onChange={e => setNewOKR({...newOKR, target: e.target.value})}
                  className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Ex: R$ 500.000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Categoria</label>
                <select 
                  value={newOKR.category}
                  onChange={e => setNewOKR({...newOKR, category: e.target.value})}
                  className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 appearance-none"
                >
                  <option value="Crescimento">Crescimento</option>
                  <option value="Retenção">Retenção</option>
                  <option value="Eficiência">Eficiência</option>
                  <option value="Produto">Produto</option>
                </select>
              </div>
            </>
          )}
          <button type="submit" className="w-full py-4 rounded-xl bg-white text-on-primary font-bold uppercase tracking-widest signature-glow hover:scale-[0.98] transition-transform mt-4">
            {modalType === 'strategy' ? 'Criar Iniciativa' : 'Criar OKR'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
