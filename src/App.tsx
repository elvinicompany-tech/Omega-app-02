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
import Toast from './components/ui/Toast';
import { DataProvider, useData } from './context/DataContext';

function AppContent() {
  const { user, loading, toast, hideToast } = useData();
  const [activeView, setActiveView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-lowest flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
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
