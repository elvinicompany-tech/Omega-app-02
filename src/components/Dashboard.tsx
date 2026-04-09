import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ClipboardList, 
  ArrowUpRight, 
  MoreVertical, 
  Bot,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Dashboard() {
  const { clients, leads, projects } = useData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'success'>('idle');

  const stats = [
    { label: 'Faturamento Mensal', value: 'R$ 142.800', change: '+12.4%', icon: TrendingUp, trend: 'up' },
    { label: 'Novos Leads', value: leads.length.toString(), change: 'Este Mês', icon: Users, trend: 'neutral' },
    { label: 'Projetos Ativos', value: projects.filter(p => p.status !== 'Concluído').length.toString(), change: 'Em Produção', icon: ClipboardList, trend: 'neutral' },
    { label: 'Clientes Ativos', value: clients.filter(c => c.status === 'Ativo').length.toString(), change: 'Total', icon: Users, trend: 'neutral' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportStatus('success');
      setTimeout(() => setReportStatus('idle'), 3000);
    }, 2000);
  };

  const activities = [
    { 
      user: 'Ricardo M.', 
      action: 'aprovou novo criativo para', 
      target: 'Nexus Tech', 
      time: 'Há 12 minutos', 
      img: 'https://picsum.photos/seed/user1/200/200',
      online: true
    },
    { 
      user: 'Julia S.', 
      action: 'atualizou status da tarefa', 
      target: '#249 - Q3 Strategy', 
      time: 'Há 45 minutos', 
      img: 'https://picsum.photos/seed/user2/200/200',
      online: false
    },
    { 
      user: 'Marcos P.', 
      action: 'gerou relatório de ROI', 
      target: 'quinzenal', 
      time: 'Há 2 horas', 
      img: 'https://picsum.photos/seed/user3/200/200',
      online: false
    },
    { 
      user: 'OMEGA Bot', 
      action: 'otimizou lances em', 
      target: '14 campanhas', 
      time: 'Ontem, 23:40', 
      isBot: true 
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Visão Geral do Sistema</p>
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-white">Olá, Administrador</h2>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-full bg-white text-on-primary font-label text-xs font-bold uppercase tracking-wider signature-glow hover:scale-95 transition-transform flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : reportStatus === 'success' ? <CheckCircle2 size={16} /> : null}
            {isGenerating ? 'Gerando...' : reportStatus === 'success' ? 'Relatório Gerado' : 'Gerar Relatório'}
          </button>
          <button 
            onClick={() => alert('Abrindo painel de configurações do sistema...')}
            className="px-6 py-2.5 rounded-full bg-surface-highest ghost-border text-white font-label text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Configurações
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-lg ghost-border space-y-4">
            <div className="flex justify-between items-start">
              <stat.icon size={20} className="text-white/40" />
              <span className={`text-[10px] font-label font-bold px-2 py-0.5 rounded-full ${
                stat.trend === 'up' ? 'text-green-400 bg-green-400/10' : 
                stat.trend === 'down' ? 'text-error bg-error/10' : 
                'text-white/60 bg-white/5'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              <h3 className="text-3xl font-headline font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-lg ghost-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h4 className="text-xl font-headline font-bold text-white">Desempenho Google Ads</h4>
              <p className="text-xs text-on-surface-variant font-body">Análise de conversão vs. investimento</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full ghost-border">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span className="text-[10px] font-label text-white">CTR</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full ghost-border">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <span className="text-[10px] font-label text-white/40">CPC</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 group">
            {[40, 65, 55, 90, 75, 45, 60, 80, 35, 95, 70, 50].map((h, i) => (
              <div 
                key={i} 
                className={`flex-1 transition-colors rounded-t-lg relative ${i === 3 || i === 9 ? 'bg-white/20 hover:bg-white/40' : 'bg-white/5 hover:bg-white/20'}`}
                style={{ height: `${h}%` }}
              >
                {i === 3 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold">Pico</div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">
            <span>Jan</span>
            <span>Mar</span>
            <span>Mai</span>
            <span>Jul</span>
            <span>Set</span>
            <span>Dez</span>
          </div>
        </div>

        {/* Activity Card */}
        <div className="glass-panel p-8 rounded-lg ghost-border flex flex-col">
          <div className="mb-8">
            <h4 className="text-xl font-headline font-bold text-white">Atividades Recentes</h4>
            <p className="text-xs text-on-surface-variant font-body">Logs em tempo real da equipe</p>
          </div>
          <div className="space-y-8 flex-1">
            {activities.map((act, i) => (
              <div key={i} className={`flex gap-4 items-start ${act.isBot ? 'opacity-50' : ''}`}>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ghost-border overflow-hidden">
                    {act.isBot ? (
                      <Bot size={16} className="text-white" />
                    ) : (
                      <img className="w-full h-full object-cover" src={act.img} alt={act.user} />
                    )}
                  </div>
                  {act.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-surface rounded-full"></div>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-white">
                    <span className="font-bold">{act.user}</span> {act.action} <span className="text-secondary">{act.target}</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-tight">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => alert('Carregando histórico completo de atividades...')}
            className="mt-8 w-full py-3 text-[10px] font-label font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors border-t border-white/5 pt-6"
          >
            Ver todo o histórico
          </button>
        </div>
      </section>
    </div>
  );
}
