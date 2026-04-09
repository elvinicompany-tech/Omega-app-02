/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CRM from './components/CRM';
import Production from './components/Production';
import Results from './components/Results';
import Clients from './components/Clients';
import Strategy from './components/Strategy';
import { DataProvider } from './context/DataContext';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'crm':
        return <CRM />;
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
    <DataProvider>
      <Layout activeView={activeView} setActiveView={setActiveView}>
        {renderView()}
      </Layout>
    </DataProvider>
  );
}
