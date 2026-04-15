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
  Trash2,
  User as UserIcon,
  Instagram,
  FileText,
  DollarSign,
  Package,
  Scissors,
  Video as VideoIcon,
  Save,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import { Client } from '../types';

export default function Clients() {
  const { clients, addClient, deleteClient, userRole } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    instagram: '',
    industry: 'Geral',
    status: 'Ativo',
    revenue: 'R$ 0',
    location: 'N/A',
    contact: '',
    since: new Date().getFullYear().toString(),
    createdAt: new Date().toISOString(),
    logo: 'https://picsum.photos/seed/company/200/200',
    contractLink: '',
    planDetails: {
      included: '',
      totalEdits: 0,
      totalCaptures: 0,
      workScope: ''
    }
  });

  const isPrivileged = userRole === 'CEO' || userRole === 'RH';

  const parseRevenue = (revenueStr: string) => {
    // Remove "R$", ".", "/mês", and any spaces, then handle decimal comma
    const clean = revenueStr.replace(/[R$\.\/mês\s]/g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  };

  const totalRevenue = clients.reduce((acc, client) => acc + parseRevenue(client.revenue), 0);
  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(newClient);
    setIsModalOpen(false);
    setNewClient({ 
      name: '', 
      company: '', 
      email: '', 
      phone: '', 
      instagram: '',
      industry: 'Geral',
      status: 'Ativo', 
      revenue: 'R$ 0', 
      location: 'N/A',
      contact: '',
      since: new Date().getFullYear().toString(),
      createdAt: new Date().toISOString(),
      logo: 'https://picsum.photos/seed/company/200/200',
      contractLink: '',
      planDetails: {
        included: '',
        totalEdits: 0,
        totalCaptures: 0,
        workScope: ''
      }
    });
  };

  const openDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Portfolio Management</p>
          <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tight">Gestão de Clientes</h2>
          {isPrivileged && (
            <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
              <DollarSign size={14} className="text-emerald-400" />
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Faturamento Total: <span className="text-white ml-1">{formattedTotal}/mês</span>
              </p>
            </div>
          )}
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
          <div 
            key={client.id} 
            onClick={() => openDetails(client)}
            className="glass-panel p-8 rounded-2xl ghost-border space-y-8 group hover:bg-white/5 transition-all relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 flex gap-2" onClick={e => e.stopPropagation()}>
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
                <img src={client.logo} alt={client.company || client.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold text-white group-hover:text-glow transition-all">{client.company || client.name}</h3>
                <p className="text-sm text-on-surface-variant font-body">{client.contact || client.name}</p>
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
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Investimento</p>
                {isPrivileged ? (
                  <p className="text-sm font-mono text-white font-bold">{client.revenue}</p>
                ) : (
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <Lock size={12} />
                    <span className="text-[10px] font-medium">Restrito</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center" onClick={e => e.stopPropagation()}>
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
                onClick={() => alert(`Visualizando perfil completo de ${client.company || client.name}`)}
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
                value={newClient.company || ''}
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
                value={newClient.email || ''}
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
                value={newClient.phone || ''}
                onChange={e => setNewClient({...newClient, phone: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Instagram</label>
              <input 
                type="text" 
                value={newClient.instagram || ''}
                onChange={e => setNewClient({...newClient, instagram: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="@perfil"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Investimento Mensal</label>
              <input 
                required
                type="text" 
                value={newClient.revenue}
                onChange={e => setNewClient({...newClient, revenue: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="R$ 0.000/mês"
              />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-white/5">
            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Detalhes do Plano</p>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">O que está incluso</label>
              <input 
                type="text" 
                value={newClient.planDetails?.included || ''}
                onChange={e => setNewClient({...newClient, planDetails: { ...newClient.planDetails!, included: e.target.value }})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Ex: Plano Premium"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total Edições</label>
                <input 
                  type="number" 
                  value={newClient.planDetails?.totalEdits || 0}
                  onChange={e => setNewClient({...newClient, planDetails: { ...newClient.planDetails!, totalEdits: parseInt(e.target.value) }})}
                  className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total Captações</label>
                <input 
                  type="number" 
                  value={newClient.planDetails?.totalCaptures || 0}
                  onChange={e => setNewClient({...newClient, planDetails: { ...newClient.planDetails!, totalCaptures: parseInt(e.target.value) }})}
                  className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Escopo de Trabalho</label>
              <textarea 
                value={newClient.planDetails?.workScope || ''}
                onChange={e => setNewClient({...newClient, planDetails: { ...newClient.planDetails!, workScope: e.target.value }})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none h-20"
                placeholder="Descreva os trabalhos que serão feitos..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Link do Contrato</label>
              <input 
                type="text" 
                value={newClient.contractLink || ''}
                onChange={e => setNewClient({...newClient, contractLink: e.target.value})}
                className="w-full bg-surface-highest ghost-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Link do contrato assinado"
              />
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-white text-on-primary font-bold uppercase tracking-widest signature-glow hover:scale-[0.98] transition-transform mt-4">
            Cadastrar Cliente
          </button>
        </form>
      </Modal>

      {/* Modal Detalhes do Cliente */}
      <Modal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        title={`Cliente: ${selectedClient?.company || selectedClient?.name}`}
      >
        {selectedClient && (
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-20 h-20 rounded-xl bg-surface-high p-4 ghost-border">
                <img src={selectedClient.logo} alt="Logo" className="w-full h-full object-contain grayscale" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-headline font-bold text-white">{selectedClient.company || selectedClient.name}</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <MapPin size={14} />
                    <span className="text-xs">{selectedClient.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <Building2 size={14} />
                    <span className="text-xs">{selectedClient.industry}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Informações de Contato</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/2 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <UserIcon size={16} className="text-on-surface-variant" />
                        <span className="text-sm text-white">{selectedClient.contact}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/2 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-on-surface-variant" />
                        <span className="text-sm text-white">{selectedClient.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/2 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-on-surface-variant" />
                        <span className="text-sm text-white">{selectedClient.phone}</span>
                      </div>
                    </div>
                    {selectedClient.instagram && (
                      <div className="flex items-center justify-between p-3 bg-white/2 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <Instagram size={16} className="text-on-surface-variant" />
                          <span className="text-sm text-white">{selectedClient.instagram}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Financeiro & Contrato</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <DollarSign size={18} className="text-emerald-400" />
                        <div>
                          <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Investimento Mensal</p>
                          {isPrivileged ? (
                            <p className="text-lg font-mono font-bold text-white">{selectedClient.revenue}</p>
                          ) : (
                            <div className="flex items-center gap-2 text-on-surface-variant">
                              <Lock size={14} />
                              <span className="text-xs">Acesso Restrito</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {isPrivileged && selectedClient.contractLink && (
                      <a 
                        href={selectedClient.contractLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-blue-400" />
                          <div>
                            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Contrato Assinado</p>
                            <p className="text-xs text-white">Visualizar Documento</p>
                          </div>
                        </div>
                        <ExternalLink size={16} className="text-on-surface-variant group-hover:text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Plano & Escopo</h4>
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <Package size={20} className="text-purple-400" />
                      <span className="text-lg font-bold text-white">{selectedClient.planDetails?.included || 'Plano Personalizado'}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/2 rounded-xl border border-white/5 text-center">
                        <Scissors size={20} className="mx-auto mb-2 text-amber-400" />
                        <p className="text-2xl font-headline font-bold text-white">{selectedClient.planDetails?.totalEdits || 0}</p>
                        <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Edições</p>
                      </div>
                      <div className="p-4 bg-white/2 rounded-xl border border-white/5 text-center">
                        <VideoIcon size={20} className="mx-auto mb-2 text-blue-400" />
                        <p className="text-2xl font-headline font-bold text-white">{selectedClient.planDetails?.totalCaptures || 0}</p>
                        <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Captações</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Escopo de Trabalho</p>
                      <p className="text-sm text-white leading-relaxed bg-white/2 p-4 rounded-xl border border-white/5">
                        {selectedClient.planDetails?.workScope || 'Sem escopo definido.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
