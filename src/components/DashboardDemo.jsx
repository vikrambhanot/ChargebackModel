import { Building2, Layers, Target, UserCheck } from 'lucide-react';
import { useState } from 'react';
import DashboardLanding from './DashboardLanding';
import DashboardView from './DashboardView';

const DashboardDemo = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [viewType, setViewType] = useState('cio');

  const navigationOptions = [
    {
      id: 'cio',
      title: 'By CIO Organization',
      description: 'View costs by organizational hierarchy and leadership groups',
      icon: Building2,
      color: '#3b82f6',
      stats: { total: '$67K', orgs: '4 CIO Groups', growth: '+12%' }
    },
    {
      id: 'platform',
      title: 'By Platform',
      description: 'Analyze costs across Snowflake, AWS, Azure, and other data platforms',
      icon: Layers,
      color: '#8b5cf6',
      stats: { total: '$67K', platforms: '4 Platforms', leader: 'Snowflake' }
    },
    {
      id: 'persona',
      title: 'By User Persona',
      description: 'Break down costs by Data Scientists, Analysts, Engineers, and other roles',
      icon: UserCheck,
      color: '#22c55e',
      stats: { total: '$67K', personas: '5 Personas', topUser: 'Data Scientists' }
    },
    {
      id: 'workspace',
      title: 'By Workspace Type',
      description: 'Compare production services vs user workspace costs and usage patterns',
      icon: Target,
      color: '#f97316',
      stats: { production: '$42K', workspace: '$25K', model: 'Usage + Subscription' }
    }
  ];

  const handleNavigation = (optionId) => {
    setViewType(optionId);
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setViewType('cio');
  };

  if (currentView === 'landing') {
    return (
      <DashboardLanding 
        navigationOptions={navigationOptions}
        handleNavigation={handleNavigation}
      />
    );
  }

  return (
    <DashboardView 
      viewType={viewType}
      handleBackToLanding={handleBackToLanding}
    />
  );
};

export default DashboardDemo;