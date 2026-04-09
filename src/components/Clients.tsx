import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Globe, 
  Plus,
  Building2,
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import { Client } from '../types';

export default function Clients() {
  const { clients, addClient, deleteClient } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'Ativo',
    revenue: 'R$ 0',
    logo: 'https://picsum.photos/seed/company/200/200'
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(newClient);
    setIsModalOpen(false);
    setNewClient({ name: '', company: '', email: '', phone: '', status: 'Ativo', revenue: 'R$ 0', logo: 'https://picsum.photos/seed/company/200/200' });
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Portfolio Management</p>
          <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tight">Gestão de Clientes</h2>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-white transition-colors" />
            <input 
              className="bg-surface-low border-b border-white/20 focus:border-white focus:ring-0 text-sm py-3 pl-12 pr-6 rounded-t-lg w-full md:w-64 transition-all outline-none" 
              placeholder="Buscar clientes..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-white text-on-primary font-label text-xs font-bold uppercase tracking-wider signature-glow hover:scale-95 transition-transform flex items-center gap-2"
          >
            <Plus size={16} />
            Novo Cliente
          </button>
        </div>
      </section>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="glass-panel p-8 rounded-2xl ghost-border space-y-8 group hover:bg-white/5 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 flex gap-2">
              <button 
                onClick={() => deleteClient(client.id)}
                className="text-on-surface-variant hover:text-red-400 transition-colors p-1 hover:bg-red-500/10 rounded"
                title="Excluir Cliente"
              >
                <Trash2 size={18} />
              </button>
              <button className="text-on-surface-variant hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center ghost-border overflow-hidden p-4">
                <img src={client.logo} alt={client.company} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold text-white group-hover:text-glow transition-all">{client.company}</h3>
                <p className="text-sm text-on-surface-variant font-body">{client.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Status</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  client.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {client.status}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Revenue</p>
                <p className="text-sm font-mono text-white font-bold">{client.revenue}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex gap-3">
                <a 
                  href={`mailto:${client.email || 'contato@empresa.com'}`}
                  className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
                >
                  <Mail size={16} />
                </a>
                <a 
                  href={`tel:${client.phone || ''}`}
                  className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
                >
                  <Phone size={16} />
                </a>
                <button 
                  onClick={() => alert('Abrindo site institucional...')}
                  className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
                >
                  <Globe size={16} />
                </button>
              </div>
              <button 
                onClick={() => alert(`Visualizando perfil completo de ${client.company}`)}
                className="flex items-center gap-2 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors"
              >
                Ver Perfil
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Client Card */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-white/30 transition-all hover:bg-white/2"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-white/40 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-headline font-bold text-white/40 group-hover:text-white mb-2">Adicionar Novo Cliente</h3>
          <p className="text-sm text-on-surface-variant max-w-[200px]">Inicie um novo processo de onboarding e contrato.</p>
        </div>
      </div>

      {/* Client Health Section */}
      <section className="glass-panel p-8 rounded-2xl ghost-border">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h4 className="font-headline text-2xl font-bold text-white">Saúde da Carteira</h4>
            <p className="text-sm text-on-surface-variant font-body">Métricas de satisfação e retenção</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-headline font-bold text-white">94%</p>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">NPS Médio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-headline font-bold text-white">2.4%</p>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Churn Rate</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Projetos no Prazo', value: '98%', icon: Clock, color: 'text-emerald-400' },
            { label: 'Tickets Resolvidos', value: '142', icon: CheckCircle2, color: 'text-blue-400' },
            { label: 'Reuniões este Mês', value: '24', icon: Calendar, color: 'text-purple-400' },
            { label: 'Novos Contratos', value: '03', icon: Globe, color: 'text-orange-400' },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white/2 rounded-xl border border-white/5 space-y-4">
              <item.icon size={24} className={item.color} />
              <div>
                <p className="text-3xl font-headline font-bold text-white">{item.value}</p>
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Novo Cliente */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Cliente">
        <form onSubmit={handleAddClient} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Nome da Empresa</label>
            <div className="relative">
              <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input 
                required
                type="text" 
                value={newClient.company}
                onChange={e => setNewClient({...newClient, company: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Ex: Solaris Global"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Ponto de Contato</label>
            <input 
              required
              type="text" 
              value={newClient.name}
              onChange={e => setNewClient({...newClient, name: e.target.value})}
              className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Nome do responsável"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">E-mail</label>
              <input 
                required
                type="email" 
                value={newClient.email}
                onChange={e => setNewClient({...newClient, email: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="email@empresa.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Telefone</label>
              <input 
                required
                type="text" 
                value={newClient.phone}
                onChange={e => setNewClient({...newClient, phone: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-white text-on-primary font-bold uppercase tracking-widest signature-glow hover:scale-[0.98] transition-transform mt-4">
            Cadastrar Cliente
          </button>
        </form>
      </Modal>
    </div>
  );
}
