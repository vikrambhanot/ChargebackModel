import { BarChart3, FileText, Monitor } from 'lucide-react';
import { useState } from 'react';
import './App.css';
import ArchitecturePage from './components/ArchitecturePage';
import DashboardDemo from './components/DashboardDemo';
import OverviewPage from './components/OverviewPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderNavBar = () => (
    <nav className="main-navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img 
            src="/capgemini-logo.png" 
            alt="Capgemini" 
            style={{ width: '200px', height: '50px' }}
          />
          <span>Enterprise Chargeback</span>
        </div>
        <div className="navbar-links">
          <button 
            className={`nav-link ${currentPage === 'overview' ? 'active' : ''}`}
            onClick={() => setCurrentPage('overview')}
          >
            <FileText size={18} />
            Overview & Slides
          </button>
          <button 
            className={`nav-link ${currentPage === 'architecture' ? 'active' : ''}`}
            onClick={() => setCurrentPage('architecture')}
          >
            <BarChart3 size={18} />
            Data Architecture
          </button>
          <button 
            className={`nav-link ${currentPage === 'demo' ? 'active' : ''}`}
            onClick={() => setCurrentPage('demo')}
          >
            <Monitor size={18} />
            Live Demo
          </button>
        </div>
      </div>
    </nav>
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'demo':
        return <DashboardDemo />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="app-container">
      {renderNavBar()}
      <main className="main-content">
        {renderPageContent()}
      </main>
    </div>
  );
};

export default App;