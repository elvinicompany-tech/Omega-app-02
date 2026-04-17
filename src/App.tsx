/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Sales from './components/Sales';
import Production from './components/Production';
import Results from './components/Results';
import Clients from './components/Clients';
import Strategy from './components/Strategy';
import Capture from './components/Capture';
import ManagerView from './components/ManagerView';
import Login from './components/Login';
import PendingApproval from './components/PendingApproval';
import UserManagement from './components/UserManagement';
import Toast from './components/ui/Toast';
import { DataProvider, useData } from './context/DataContext';

function AppContent() {
  const { user, userProfile, loading, toast, hideToast } = useData();
  const [activeView, setActiveView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-lowest flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        <p className="text-white/40 text-xs font-label uppercase tracking-widest animate-pulse">Carregando Sistema...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (userProfile && userProfile.status !== 'approved') {
    return (
      <>
        <PendingApproval />
        <AnimatePresence>
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={hideToast} 
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'manager':
        return <ManagerView />;
      case 'sales':
        return <Sales />;
      case 'capture':
        return <Capture />;
      case 'production':
        return <Production />;
      case 'results':
        return <Results />;
      case 'clients':
        return <Clients />;
      case 'strategy':
        return <Strategy />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout activeView={activeView} setActiveView={setActiveView}>
        {renderView()}
      </Layout>
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
