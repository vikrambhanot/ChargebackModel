import { useState, useEffect } from "react";
import DocumentTable from './DocumentTable';
import FileUploader from './FileUploader';
import DocumentAnalysis from './DocumentAnalysis';
import ComplianceAgentIntro from './ComplianceAgentIntro';

// Capgemini palette
const DEEP_NAVY = '#0B1426';
const CAP_BLUE_LIGHT = '#3A9DD4';

const ROLLING_MESSAGES = [
  'Select a document to begin compliance review.',
  'Upload financial communications, marketing materials, or disclosure documents.',
  'I will analyze against FINRA and SEC frameworks with full citation trail.',
];

export default function DocumentManagement() {
  const [refresh, setRefresh] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [introShown, setIntroShown] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate rolling message every 5 seconds while on the landing view
  useEffect(() => {
    if (!introShown || selectedDoc) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ROLLING_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [introShown, selectedDoc]);

  if (!introShown) {
    return <ComplianceAgentIntro onContinue={() => setIntroShown(true)} />;
  }

  if (selectedDoc) {
    return (
      <DocumentAnalysis
        doc={selectedDoc}
        onBack={() => {
          setSelectedDoc(null);
          setRefresh(prev => prev + 1);
        }}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: DEEP_NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradients — same as intro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(0,112,173,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0,112,173,0.10) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 relative" style={{ zIndex: 10 }}>

        {/* Agent-voice header with rolling message */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: CAP_BLUE_LIGHT,
              marginBottom: '18px',
            }}
          >
            Compliance Review Agent · Active
          </div>
          <div
            key={messageIndex}
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontWeight: 300,
              fontSize: '24px',
              lineHeight: '1.5',
              maxWidth: '640px',
              margin: '0 auto',
              minHeight: '72px',
              animation: 'message-fade 600ms ease-out',
            }}
          >
            {ROLLING_MESSAGES[messageIndex]}
          </div>
        </div>

        {/* Upload */}
        <div style={{ marginBottom: '32px' }}>
          <FileUploader onUploadComplete={() => setRefresh(prev => prev + 1)} />
        </div>

        {/* Document Table */}
        <DocumentTable
          refreshTrigger={refresh}
          onAnalyze={(doc) => setSelectedDoc(doc)}
        />
      </div>

      <style>{`
        @keyframes message-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}