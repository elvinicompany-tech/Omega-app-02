import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Eye,
  Building2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import { Lead } from '../types';

export default function CRM() {
  const { leads, addLead, moveLead, deleteLead } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newLead, setNewLead] = useState<Omit<Lead, 'id'>>({
    name: '',
    desc: '',
    value: '',
    time: 'Recente',
    stage: 'prospect'
  });

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stages = [
    { id: 'prospect', label: 'Prospecção', color: 'bg-blue-400' },
    { id: 'meeting', label: 'Reunião Agendada', color: 'bg-purple-400' },
    { id: 'proposal', label: 'Proposta Enviada', color: 'bg-amber-400' },
    { id: 'closing', label: 'Fechamento', color: 'bg-white' },
  ];

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(newLead);
    setIsModalOpen(false);
    setNewLead({ name: '', desc: '', value: '', time: 'Recente', stage: 'prospect' });
  };

  return (
    <div className="space-y-12">
      {/* Header & Goal */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">Performance do Vendedor</span>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-white mb-6">CRM de Vendas</h2>
          
          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-white transition-colors" />
              <input 
                className="bg-surface-low border-b border-white/20 focus:border-white focus:ring-0 text-sm py-3 pl-12 pr-6 rounded-t-lg w-full md:w-80 transition-all outline-none" 
                placeholder="Buscar leads ou empresas..." 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => alert('Filtros avançados em desenvolvimento.')}
              className="flex items-center gap-2 bg-surface-high border border-white/10 px-4 py-2.5 rounded-full hover:bg-surface-highest transition-colors"
            >
              <Filter size={16} />
              <span className="font-label text-[11px] uppercase tracking-wider">Filtros</span>
            </button>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="w-full md:w-72 glass-panel p-6 rounded-lg ghost-border">
          <div className="flex justify-between items-center mb-3">
            <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Meta Mensal</span>
            <span className="font-headline font-bold text-white">72%</span>
          </div>
          <div className="bg-surface-high h-1.5 rounded-full mb-3 overflow-hidden">
            <div className="bg-gradient-to-r from-white to-secondary h-full rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)]" style={{ width: '72%' }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-on-surface-variant">R$ 180.000,00</span>
            <span className="text-xs text-on-surface-variant opacity-40">R$ 250.000,00</span>
          </div>
        </div>
      </section>

      {/* Funnel Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stage.color} shadow-[0_0_8px_rgba(255,255,255,0.4)]`}></div>
                <h3 className="font-label text-[11px] uppercase tracking-[0.15em] text-on-surface-variant font-semibold">{stage.label}</h3>
              </div>
              <span className="bg-surface-high px-2 py-0.5 rounded text-[10px] text-on-surface-variant">
                {filteredLeads.filter(l => l.stage === stage.id).length.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-4 min-h-[200px]">
              {filteredLeads.filter(l => l.stage === stage.id).map((lead) => (
                <div 
                  key={lead.id} 
                  onClick={() => { setSelectedLead(lead); setIsDetailsOpen(true); }}
                  className="bg-surface glass-panel p-5 rounded-lg ghost-border hover:bg-surface-high transition-all group cursor-pointer relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-headline text-lg font-medium text-white group-hover:text-primary transition-colors">{lead.name}</h4>
                      {lead.verified && <CheckCircle2 size={14} className="text-blue-400" />}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                        className="p-1 hover:bg-red-500/20 rounded text-on-surface-variant hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      <MoreVertical size={16} className="text-on-surface-variant" />
                    </div>
                  </div>
                  
                  {lead.event ? (
                    <div className="bg-white/5 p-3 rounded-lg mb-4 flex items-center gap-3">
                      <Calendar size={18} className="text-white" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant">{lead.event.time}</span>
                        <span className="text-[11px] text-white font-medium">{lead.event.label}</span>
                      </div>
                    </div>
                  ) : lead.status ? (
                    <div className="flex items-center gap-2 mb-6">
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20">{lead.status}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{lead.desc}</p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant opacity-50">Valor Estimado</span>
                      <span className="font-headline font-semibold text-white">{lead.value}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full">
                      <Clock size={12} className="text-on-surface-variant" />
                      <span className="text-[11px] text-on-surface-variant">{lead.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    {stages.indexOf(stages.find(s => s.id === stage.id)!) > 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveLead(lead.id, stages[stages.indexOf(stages.find(s => s.id === stage.id)!) - 1].id as Lead['stage']) }}
                        className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white transition-all flex justify-center"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    )}
                    {stages.indexOf(stages.find(s => s.id === stage.id)!) < stages.length - 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveLead(lead.id, stages[stages.indexOf(stages.find(s => s.id === stage.id)!) + 1].id as Lead['stage']) }}
                        className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white transition-all flex justify-center"
                      >
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-on-primary shadow-2xl pill-glow hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus size={28} />
      </button>

      {/* Modal Detalhes Lead */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Detalhes do Lead">
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold text-white">{selectedLead.name}</h3>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest">{selectedLead.stage}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Descrição</p>
                <p className="text-sm text-white leading-relaxed">{selectedLead.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Valor Estimado</p>
                  <p className="text-lg font-headline font-bold text-white">{selectedLead.value}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Tempo no Funil</p>
                  <p className="text-lg font-headline font-bold text-white">{selectedLead.time}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-3">
              <button 
                onClick={() => alert('Iniciando contato via WhatsApp...')}
                className="flex-1 py-3 rounded-xl bg-white text-on-primary font-bold uppercase tracking-widest text-[10px] hover:scale-95 transition-transform"
              >
                Contatar Lead
              </button>
              <button 
                onClick={() => { deleteLead(selectedLead.id); setIsDetailsOpen(false); }}
                className="px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Novo Lead */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Lead">
        <form onSubmit={handleAddLead} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Nome da Empresa</label>
            <input 
              required
              type="text" 
              value={newLead.name}
              onChange={e => setNewLead({...newLead, name: e.target.value})}
              className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Ex: Nexus Tech"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Descrição / Projeto</label>
            <textarea 
              required
              value={newLead.desc}
              onChange={e => setNewLead({...newLead, desc: e.target.value})}
              className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 h-24"
              placeholder="Descreva o projeto ou necessidade..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Valor Estimado</label>
              <input 
                required
                type="text" 
                value={newLead.value}
                onChange={e => setNewLead({...newLead, value: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Ex: R$ 50.000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Estágio Inicial</label>
              <select 
                value={newLead.stage}
                onChange={e => setNewLead({...newLead, stage: e.target.value as Lead['stage']})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 appearance-none"
              >
                {stages.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-white text-on-primary font-bold uppercase tracking-widest signature-glow hover:scale-[0.98] transition-transform mt-4">
            Criar Lead
          </button>
        </form>
      </Modal>
    </div>
  );
}
