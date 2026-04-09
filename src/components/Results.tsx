import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  TrendingUp, 
  Target, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  Loader2,
  Calendar,
  Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useData } from '../context/DataContext';

export default function Results() {
  const { leads, clients, strategies } = useData();
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const metrics = [
    { label: 'Taxa de Conversão', value: '18.4%', change: '+2.1%', trend: 'up', desc: 'Leads para Clientes' },
    { label: 'Custo por Aquisição', value: 'R$ 420', change: '-15%', trend: 'up', desc: 'Média de Campanha' },
    { label: 'ROI Médio', value: '4.2x', change: '+0.8x', trend: 'up', desc: 'Retorno sobre Investimento' },
    { label: 'LTV Estimado', value: 'R$ 12.500', change: '+5%', trend: 'up', desc: 'Lifetime Value' },
  ];

  const campaigns = [
    { name: 'Google Ads - B2B Tech', spend: 'R$ 12.000', leads: 145, cpa: 'R$ 82,75', roas: '4.5x' },
    { name: 'LinkedIn - Decisores SaaS', spend: 'R$ 8.500', leads: 42, cpa: 'R$ 202,38', roas: '3.2x' },
    { name: 'Meta Ads - Retargeting', spend: 'R$ 4.200', leads: 89, cpa: 'R$ 47,19', roas: '5.8x' },
  ];

  const generateAIInsight = async () => {
    setIsLoadingInsight(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Analise os seguintes dados de um dashboard de agência e forneça um insight estratégico curto e impactante (máximo 3 frases):
      - Leads atuais: ${leads.length}
      - Clientes ativos: ${clients.filter(c => c.status === 'Ativo').length}
      - Estratégias em execução: ${strategies.filter(s => s.status === 'Em Execução').length}
      - Taxa de conversão: 18.4%
      - ROI Médio: 4.2x
      
      O tom deve ser profissional, luxuoso e focado em alta performance.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiInsight(response.text || 'Otimize o funil de conversão para leads de alto valor no setor de tecnologia.');
    } catch (error) {
      console.error('Error generating AI insight:', error);
      setAiInsight('Foco em leads de tecnologia e otimização de ROAS em campanhas de retargeting para maximizar o LTV.');
    } finally {
      setIsLoadingInsight(false);
    }
  };

  useEffect(() => {
    generateAIInsight();
  }, []);

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Performance & Analytics</p>
          <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tight">Resultados Estratégicos</h2>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Seletor de período em desenvolvimento.')}
            className="flex items-center gap-2 bg-surface-high border border-white/10 px-5 py-2.5 rounded-full hover:bg-surface-highest transition-colors"
          >
            <Calendar size={16} />
            <span className="font-label text-[11px] uppercase tracking-wider">Últimos 30 Dias</span>
          </button>
          <button 
            onClick={() => alert('Gerando relatório PDF para download...')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-on-primary font-label text-xs font-bold uppercase tracking-wider signature-glow hover:scale-95 transition-transform"
          >
            <Download size={16} />
            <span>Exportar PDF</span>
          </button>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl ghost-border space-y-4 group hover:bg-white/5 transition-all">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">{metric.label}</p>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {metric.change}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-headline font-bold text-white group-hover:text-glow transition-all">{metric.value}</h3>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{metric.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl ghost-border space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 text-white">
                <BarChart size={20} />
              </div>
              <h3 className="font-headline font-bold text-white uppercase tracking-tight">Crescimento de Conversão</h3>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">Atual</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Anterior</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-4 px-4">
            {[45, 62, 58, 75, 90, 82, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative">
                  <div className="absolute bottom-0 w-full bg-white/10 rounded-t-lg h-32" />
                  <div 
                    className="absolute bottom-0 w-full bg-white rounded-t-lg transition-all duration-1000 group-hover:signature-glow" 
                    style={{ height: `${h}%` }} 
                  />
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl ghost-border bg-gradient-to-br from-surface to-surface-low space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/5 text-white">
              <Sparkles size={20} />
            </div>
            <h3 className="font-headline font-bold text-white uppercase tracking-tight">Insights de IA</h3>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Zap size={16} className="text-white" />
              </div>
              <div className="text-sm text-white leading-relaxed italic min-h-[80px]">
                {isLoadingInsight ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Analisando dados...
                  </span>
                ) : aiInsight}
              </div>
              <button 
                onClick={generateAIInsight}
                disabled={isLoadingInsight}
                className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors"
              >
                Atualizar Insight
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target size={18} className="text-white" />
                <p className="text-xs font-bold text-white uppercase tracking-widest">Próximos Alvos</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  Escalar orçamento em Google Ads (+20%)
                </li>
                <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  Otimizar landing page de SaaS
                </li>
                <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  Implementar Lead Scoring preditivo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Table */}
      <section className="glass-panel rounded-2xl ghost-border overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="font-headline font-bold text-white uppercase tracking-tight">Performance por Campanha</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Campanha</th>
                <th className="px-6 py-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Investimento</th>
                <th className="px-6 py-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Leads</th>
                <th className="px-6 py-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant">CPA</th>
                <th className="px-6 py-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {campaigns.map((camp, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white">{camp.name}</td>
                  <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">{camp.spend}</td>
                  <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">{camp.leads}</td>
                  <td className="px-6 py-4 text-xs font-mono text-emerald-400 font-bold">{camp.cpa}</td>
                  <td className="px-6 py-4 text-xs font-mono text-white font-bold">{camp.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
