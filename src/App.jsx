import { BarChart3, Bot, Database, FileText, Layers, Monitor, Network } from 'lucide-react';
import { useState } from 'react';
import './App.css';
import AICostCalculator from './components/AICostCalculator';
import ArchitecturePage from './components/ArchitecturePage';
import DashboardDemo from './components/DashboardDemo';
import DataMeshModule from './components/DataMeshModule';
import OverviewPage from './components/OverviewPage';
import RDLArchitectureExplorer from './components/RDLArchitectureExplorer';

const App = () => {
  const [currentPage, setCurrentPage] = useState('data-mesh');
  const [currentSubPage, setCurrentSubPage] = useState('overview');

  const handleMainNavigation = (page) => {
    setCurrentPage(page);
    // Set default sub-page when switching main sections
    if (page === 'data-platform') {
      setCurrentSubPage('overview');
    }
  };

  const handleSubNavigation = (subPage) => {
    setCurrentSubPage(subPage);
  };

  const renderNavBar = () => (
    <nav className="main-navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img 
            src="/capgemini-logo.png"
            alt="Capgemini"
            style={{ width: '200px', height: '50px' }}
          />
          <span>Enterprise Data Management</span>
        </div>
        <div className="navbar-links">
          <button 
            className={`nav-link ${currentPage === 'data-mesh' ? 'active' : ''}`}
            onClick={() => handleMainNavigation('data-mesh')}
          >
            <Network size={18} />
            Data Mesh Strategy
          </button>
          <button 
            className={`nav-link ${currentPage === 'data-platform' ? 'active' : ''}`}
            onClick={() => handleMainNavigation('data-platform')}
          >
            <Database size={18} />
            Data Platform Management
          </button>
          <button 
            className={`nav-link ${currentPage === 'rdl-architecture' ? 'active' : ''}`}
            onClick={() => handleMainNavigation('rdl-architecture')}
          >
            <Layers size={18} />
            RDL Architecture
          </button>
          <button 
            className={`nav-link ${currentPage === 'ai-calculator' ? 'active' : ''}`}
            onClick={() => handleMainNavigation('ai-calculator')}
          >
            <Bot size={18} />
            AI Cost Calculator
          </button>
        </div>
      </div>
    </nav>
  );

  const renderSubNavBar = () => {
    if (currentPage === 'data-platform') {
      return (
        <div className="sub-navbar">
          <div className="navbar-content">
            <div className="navbar-links">
              <button 
                className={`nav-link ${currentSubPage === 'overview' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('overview')}
              >
                <FileText size={16} />
                Overview & Slides
              </button>
              <button 
                className={`nav-link ${currentSubPage === 'architecture' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('architecture')}
              >
                <BarChart3 size={16} />
                Data Architecture
              </button>
              <button 
                className={`nav-link ${currentSubPage === 'demo' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('demo')}
              >
                <Monitor size={16} />
                Live Demo
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderPageContent = () => {
    if (currentPage === 'data-mesh') {
      return <DataMeshModule />;
    }
    
    if (currentPage === 'data-platform') {
      switch (currentSubPage) {
        case 'overview':
          return <OverviewPage />;
        case 'architecture':
          return <ArchitecturePage />;
        case 'demo':
          return <DashboardDemo />;
        default:
          return <OverviewPage />;
      }
    }

    if (currentPage === 'rdl-architecture') {
      return <RDLArchitectureExplorer />;
    }

    if (currentPage === 'ai-calculator') {
      return <AICostCalculator />;
    }
    
    return <DataMeshModule />; // Default fallback
  };

  return (
    <div className="app-container">
      {renderNavBar()}
      {renderSubNavBar()}
      <main className="main-content">
        {renderPageContent()}
      </main>
    </div>
  );
};

export default App;