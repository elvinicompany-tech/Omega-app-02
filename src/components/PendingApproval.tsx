import React from 'react';
import { useData } from '../context/DataContext';
import { Clock, LogOut, ShieldAlert } from 'lucide-react';
import { auth, signOut } from '../lib/firebase';

export default function PendingApproval() {
  const { userProfile } = useData();

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-surface-lowest flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface-low rounded-3xl p-10 ghost-border text-center space-y-8">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500">
          <Clock size={40} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-headline font-bold text-white uppercase tracking-tight">Solicitação Pendente</h1>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Olá, <span className="text-white font-bold">{userProfile.name}</span>. Sua solicitação de acesso foi enviada com sucesso.
          </p>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left space-y-3">
            <div className="flex items-start gap-4 text-xs text-on-surface-variant">
              <ShieldAlert size={16} className="text-amber-500 shrink-0" />
              <p>Nesse momento, seu acesso está restrito. O CEO da OMEGA analisará seu perfil em breve.</p>
            </div>
            <div className="flex items-start gap-4 text-xs text-on-surface-variant opacity-60">
              <Clock size={16} className="shrink-0" />
              <p>Status atual: <span className="text-amber-400 font-bold uppercase tracking-widest">{userProfile.status === 'pending' ? 'Aguardando Aprovação' : 'Acesso Negado'}</span></p>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-white text-on-primary py-4 rounded-xl font-label text-xs font-bold uppercase tracking-widest signature-glow hover:scale-[0.98] transition-transform"
          >
            Verificar Novamente
          </button>
          
          <button 
            onClick={() => signOut(auth)}
            className="w-full bg-white/5 text-white py-4 rounded-xl font-label text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <LogOut size={16} /> Sair da Conta
          </button>
        </div>

        <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold opacity-40">
          OMEGA Operations Management
        </p>
      </div>
    </div>
  );
}
