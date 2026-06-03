import { useState } from 'react';
import './App.css';
import DocumentManagement from './components/DocumentManagement';
import ComplianceHome from './components/ComplianceHome';

// Capgemini palette
const NAVY = '#14213D';
const DEEP_NAVY = '#0B1426';
const CAP_BLUE = '#0070AD';
const OFF_WHITE = '#F5F5F0';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => setCurrentPage(page);

  const renderNavBar = () => (
    <nav style={{ backgroundColor: DEEP_NAVY }}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <div className="bg-white px-3 py-2 rounded">
            <img
              src="/capgemini-logo.png"
              alt="Capgemini"
              style={{ width: '140px', height: '32px', objectFit: 'contain' }}
            />
          </div>
        </button>

        <div className="flex items-center gap-10 text-sm text-white">
          <button
            onClick={() => navigateTo('home')}
            className="font-medium hover:opacity-70 transition-opacity"
            style={currentPage === 'home' ? { color: CAP_BLUE } : {}}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('finra')}
            className="font-medium hover:opacity-70 transition-opacity"
            style={currentPage === 'finra' ? { color: CAP_BLUE } : {}}
          >
            Platform
          </button>
          <a href="#about" className="font-medium hover:opacity-70 transition-opacity">About</a>
        </div>

        <div className="flex items-center gap-6 text-xs text-white">
          <a href="#contact" className="hover:opacity-70 transition-opacity">Contact us</a>
          <span className="opacity-30">|</span>
          <a href="#locale" className="hover:opacity-70 transition-opacity">United States | EN</a>
        </div>
      </div>
    </nav>
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 'finra':
        return <DocumentManagement />;
      case 'home':
      default:
        return <ComplianceHome onLaunch={(domain) => navigateTo(domain)} />;
    }
  };

  const renderFooter = () => (
    <footer style={{ backgroundColor: DEEP_NAVY }} className="text-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div className="bg-white px-3 py-2 rounded inline-block">
            <img
              src="/capgemini-logo.png"
              alt="Capgemini"
              style={{ width: '140px', height: '32px', objectFit: 'contain' }}
            />
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
             style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Capgemini. All rights reserved.
          </div>
          <div className="text-xs text-slate-500 italic max-w-2xl md:text-right">
            Demonstration environment. Analysis outputs are illustrative and do not constitute
            regulatory or legal advice.
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: OFF_WHITE }}>
      {renderNavBar()}
      <main className="flex-1">
        {renderPageContent()}
      </main>
      {renderFooter()}
    </div>
  );
};

export default App;