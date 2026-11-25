import { useState } from 'react';
import './App.css';
import DocumentManagement from './components/DocumentManagement';
import ComplianceHome from './components/ComplianceHome';

// Onix-aligned palette (replace with exact values from the Onix brand kit)
const ONIX_RED = '#E31837';
const INK = '#141414';
const CHARCOAL = '#1F1F1F';
const OFF_WHITE = '#F7F7F7';

const BrandMark = ({ size = 'text-lg' }) => (
  <span className="flex items-center gap-3">
    <span
      aria-hidden="true"
      style={{
        width: 0,
        height: 0,
        borderLeft: '9px solid transparent',
        borderRight: '9px solid transparent',
        borderBottom: `16px solid ${ONIX_RED}`,
      }}
    />
    <span className={`${size} font-semibold tracking-tight text-white`}>
      AI Compliance <span style={{ color: ONIX_RED }}>Workbench</span>
    </span>
  </span>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => setCurrentPage(page);

  const navLinkStyle = (page) =>
    currentPage === page
      ? { color: ONIX_RED, borderBottom: `2px solid ${ONIX_RED}` }
      : { borderBottom: '2px solid transparent' };

  const renderNavBar = () => (
    <nav style={{ backgroundColor: INK, borderBottom: `3px solid ${ONIX_RED}` }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="hover:opacity-90 transition-opacity"
        >
          <BrandMark />
        </button>

        <div className="flex items-center gap-10 text-sm text-white">
          <button
            onClick={() => navigateTo('home')}
            className="font-medium pb-1 hover:opacity-80 transition-opacity"
            style={navLinkStyle('home')}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('finra')}
            className="font-medium pb-1 hover:opacity-80 transition-opacity"
            style={navLinkStyle('finra')}
          >
            Platform
          </button>
          <a href="#about" className="font-medium pb-1 hover:opacity-80 transition-opacity">
            About
          </a>
        </div>

        <button
          onClick={() => navigateTo('finra')}
          className="text-xs font-semibold uppercase tracking-wider text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ONIX_RED }}
        >
          Launch Review
        </button>
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
    <footer style={{ backgroundColor: CHARCOAL }} className="text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <BrandMark size="text-base" />
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} AI Compliance Workbench. All rights reserved.
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
      <main className="flex-1">{renderPageContent()}</main>
      {renderFooter()}
    </div>
  );
};

export default App;