import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail, 
  Clock, 
  Search,
  MoreVertical,
  Check,
  X,
  UserCog,
  Trash2
} from 'lucide-react';
import { Profile, UserRole } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function UserManagement() {
  const { allUsers, updateUserProfile, deleteUserProfile, showToast } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = (user: Profile) => {
    if (confirm(`Excluir permanentemente o perfil de ${user.name}?`)) {
      deleteUserProfile(user.uid);
      showToast(`Perfil excluído.`, 'error');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Administração de Acessos</p>
          <h2 className="text-4xl font-headline md:text-6xl font-bold tracking-tighter text-white uppercase">Gestão de Equipe</h2>
        </div>
        
        <div className="bg-white/5 rounded-2xl px-6 py-4 border border-white/10 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Equipe Total</p>
              <p className="text-xl font-headline font-bold text-white">{allUsers.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-surface-low rounded-3xl p-8 ghost-border space-y-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-lowest border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 pb-4">
                <th className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold pb-4 px-4">Usuário</th>
                <th className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold pb-4 px-4">Cargo</th>
                <th className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold pb-4 px-4">Entrada</th>
                <th className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold pb-4 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="group hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      {user.avatar ? (
                        <img src={user.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center text-white border border-white/10">
                          <Users size={16} />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-glow transition-all">{user.name}</p>
                        <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                          <Mail size={10} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                      user.role === 'CEO' 
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                      : user.role === 'RH'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-white/5 text-on-surface-variant border-white/10'
                    }`}>
                      <Shield size={10} />
                      {user.role}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-[10px] text-on-surface-variant">
                      {user.createdAt ? format(new Date(user.createdAt), "dd 'de' MMM", { locale: ptBR }) : 'N/A'}
                    </p>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.role !== 'CEO' && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <select 
                            value={user.role}
                            onChange={(e) => updateUserProfile(user.uid, { role: e.target.value as UserRole })}
                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[9px] font-bold text-white focus:outline-none"
                          >
                            <option value="Colaborador">Colaborador</option>
                            <option value="Vendedor">Vendedor</option>
                            <option value="RH">RH</option>
                            <option value="CEO">CEO</option>
                          </select>
                          <button 
                            onClick={() => handleDelete(user)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-100 hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-on-surface-variant">
                <Search size={32} />
              </div>
              <p className="text-on-surface-variant text-sm">Nenhum usuário encontrado com esses critérios.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
