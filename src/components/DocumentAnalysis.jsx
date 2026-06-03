import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, FileText, CheckCircle, Shield, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import FINRAComplianceRules from "./analysis/FINRAComplianceRules";
import EnhancedAnalysisResults from "./analysis/EnhancedAnalysisResults";
import { API_ENDPOINTS } from "../config/api";

// Capgemini palette
const NAVY = '#14213D';
const TEXT_MUTED = '#5C6B82';
const CAP_BLUE = '#0070AD';
const CAP_BLUE_DARK = '#005A8C';
const PAGE_BG = '#F0F4F8';
const SURFACE = '#FFFFFF';
const BORDER = '#D8E1EA';

const ANALYSIS_STEPS = [
  { id: "preview", label: "Document Preview", icon: FileText },
  { id: "rules-selection", label: "Select Rules", icon: Shield },
  { id: "analysis", label: "AI Analysis", icon: Loader2 },
  { id: "results", label: "Results", icon: CheckCircle },
];

export default function DocumentAnalysis({ doc, onBack }) {
  const [currentStep, setCurrentStep] = useState("preview");
  const [status, setStatus] = useState("Ready");
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);
  const [selectedRules, setSelectedRules] = useState([]);
  const [enhancedResults, setEnhancedResults] = useState(null);

  const loadDocumentContent = useCallback(async () => {
    try {
      setStatus("Loading document...");
      const { data } = supabase.storage
        .from('demo-uploads')
        .getPublicUrl(doc.file_url);

      if (data?.publicUrl) {
        if (doc.mime_type?.includes('pdf') || doc.filename?.toLowerCase().endsWith('.pdf')) {
          setStatus("Extracting text from PDF...");
          try {
            const response = await fetch(API_ENDPOINTS.COMPLIANCE_READ_DOCUMENT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ documentUrl: data.publicUrl, mimeType: doc.mime_type })
            });
            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.error || 'Failed to extract PDF text');
            }
            const result = await response.json();
            setDocumentContent(result.content);
            setStatus(`Document loaded · ${result.length} characters`);
          } catch (pdfError) {
            console.error("PDF extraction error:", pdfError);
            setStatus("Error extracting PDF: " + pdfError.message);
            setDocumentContent(null);
          }
        } else if (doc.mime_type?.includes('text')) {
          const response = await fetch(data.publicUrl);
          const text = await response.text();
          setDocumentContent(text);
          setStatus("Document loaded");
        } else {
          setDocumentContent("Preview not available for this file type");
          setStatus("Unsupported file type");
        }
      }
    } catch (error) {
      console.error("Error loading document:", error);
      setStatus("Error loading document: " + error.message);
      setDocumentContent(null);
    }
  }, [doc.file_url, doc.mime_type, doc.filename]);

  useEffect(() => {
    if (doc) loadDocumentContent();
  }, [doc, loadDocumentContent]);

  const handleStartReview = () => {
    setCurrentStep("rules-selection");
    setStatus("Select compliance rules to apply");
  };

  const handleRulesSelected = (rules) => {
    setSelectedRules(rules);
    setCurrentStep("analysis");
    handleEnhancedAnalyze(rules);
  };

  const handleEnhancedAnalyze = async (rules) => {
    setIsProcessing(true);
    setStatus("Classifying document sections...");

    try {
      const response = await fetch(API_ENDPOINTS.COMPLIANCE_ANALYZE_ENHANCED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentContent,
          autoClassify: true,
          rules: rules.map(r => ({
            id: r.id,
            name: r.name,
            guidelines: r.guidelines,
            category: r.category,
            severity: r.severity
          }))
        })
      });

      setStatus("Analyzing each section...");

      if (!response.ok) {
        let errorMessage = 'Enhanced analysis failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.summary || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const results = await response.json();

      if (results.overallStatus === 'ERROR') {
        setStatus('Error: ' + results.summary);
        alert('Analysis error: ' + results.summary);
        setIsProcessing(false);
        return;
      }

      setEnhancedResults(results);
      setCurrentStep("results");
      setStatus(`Analysis complete · ${results.totalSections} sections reviewed`);
      setIsProcessing(false);
    } catch (error) {
      console.error("Enhanced analysis error:", error);
      setStatus("Error during analysis");
      setIsProcessing(false);
      alert('Analysis failed: ' + error.message);
    }
  };

  const canNavigateToStep = (stepId) => {
    switch (stepId) {
      case "preview": return true;
      case "rules-selection": return !!documentContent;
      case "analysis": return selectedRules.length > 0;
      case "results": return !!enhancedResults;
      default: return false;
    }
  };

  const handleResetAnalysis = () => {
    setCurrentStep("preview");
    setEnhancedResults(null);
    setSelectedRules([]);
    setStatus("Ready for new analysis");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "preview":
        return renderPreview();
      case "rules-selection":
        return (
          <FINRAComplianceRules
            onProceed={handleRulesSelected}
            onBack={() => setCurrentStep("preview")}
          />
        );
      case "analysis":
        return renderAnalysisProgress();
      case "results":
        return (
          <EnhancedAnalysisResults
            results={enhancedResults}
            selectedRules={selectedRules}
            onBack={handleResetAnalysis}
          />
        );
      default:
        return null;
    }
  };

  const renderPreview = () => (
    <div style={{
      backgroundColor: SURFACE,
      borderRadius: '10px',
      border: `1px solid ${BORDER}`,
      padding: '32px',
      boxShadow: '0 1px 3px rgba(20, 33, 61, 0.04)',
    }}>
      <h2 style={{ color: NAVY, fontSize: '22px', fontWeight: 500, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
        Document Preview
      </h2>

      <div style={{
        backgroundColor: PAGE_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div>
            <div style={{ color: TEXT_MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Filename</div>
            <div style={{ color: NAVY }}>{doc.filename}</div>
          </div>
          <div>
            <div style={{ color: TEXT_MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Type</div>
            <div style={{ color: NAVY }}>{doc.mime_type || 'Unknown'}</div>
          </div>
          <div>
            <div style={{ color: TEXT_MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Size</div>
            <div style={{ color: NAVY }}>{(doc.file_size_bytes / 1024).toFixed(2)} KB</div>
          </div>
          <div>
            <div style={{ color: TEXT_MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Uploaded</div>
            <div style={{ color: NAVY }}>{new Date(doc.created_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {documentContent && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: TEXT_MUTED, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Content Preview
          </div>
          <div style={{
            backgroundColor: PAGE_BG,
            border: `1px solid ${BORDER}`,
            borderRadius: '8px',
            padding: '16px',
            maxHeight: '320px',
            overflowY: 'auto',
          }}>
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontSize: '13px',
              color: NAVY,
              fontFamily: 'inherit',
              margin: 0,
              lineHeight: 1.6,
            }}>{documentContent}</pre>
          </div>
        </div>
      )}

      <button
        onClick={handleStartReview}
        disabled={!documentContent}
        style={{
          width: '100%',
          padding: '14px 20px',
          backgroundColor: documentContent ? CAP_BLUE : '#C5CFDB',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          cursor: documentContent ? 'pointer' : 'not-allowed',
          transition: 'background-color 150ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
        onMouseEnter={(e) => { if (documentContent) e.currentTarget.style.backgroundColor = CAP_BLUE_DARK; }}
        onMouseLeave={(e) => { if (documentContent) e.currentTarget.style.backgroundColor = CAP_BLUE; }}
      >
        <Shield size={16} />
        Start FINRA Compliance Review
      </button>
    </div>
  );

  const renderAnalysisProgress = () => (
    <div style={{
      backgroundColor: SURFACE,
      borderRadius: '10px',
      border: `1px solid ${BORDER}`,
      padding: '64px 32px',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(20, 33, 61, 0.04)',
    }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#E8F2F8', marginBottom: '20px' }}>
        <Loader2 size={28} color={CAP_BLUE} className="animate-spin" />
      </div>
      <h2 style={{ color: NAVY, fontSize: '22px', fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
        Analyzing document
      </h2>
      <p style={{ color: TEXT_MUTED, fontSize: '14px', margin: '0 0 4px' }}>
        Classifying sections and applying {selectedRules.length} compliance rule{selectedRules.length !== 1 ? 's' : ''} per section.
      </p>
      <p style={{ color: TEXT_MUTED, fontSize: '12px', margin: '20px 0 0', fontStyle: 'italic' }}>
        {status}
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: PAGE_BG }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
          <button
            onClick={onBack}
            style={{
              marginRight: '16px',
              padding: '8px',
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = CAP_BLUE; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}
          >
            <ArrowLeft size={18} color={NAVY} />
          </button>
          <div>
            <h1 style={{ color: NAVY, fontSize: '24px', fontWeight: 500, margin: 0, letterSpacing: '-0.01em' }}>
              FINRA Compliance Analysis
            </h1>
            <p style={{ color: TEXT_MUTED, fontSize: '13px', margin: '2px 0 0' }}>{status}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>

          {/* Sidebar */}
          <div style={{
            width: '240px',
            backgroundColor: SURFACE,
            borderRadius: '10px',
            border: `1px solid ${BORDER}`,
            padding: '20px',
            height: 'fit-content',
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: TEXT_MUTED,
              marginBottom: '14px',
            }}>
              Analysis Steps
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {ANALYSIS_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = ANALYSIS_STEPS.findIndex(s => s.id === currentStep) > index;
                const canNavigate = canNavigateToStep(step.id);

                return (
                  <button
                    key={step.id}
                    onClick={() => canNavigate && setCurrentStep(step.id)}
                    disabled={!canNavigate || isProcessing}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isActive ? '#E8F2F8' : 'transparent',
                      borderLeft: isActive ? `3px solid ${CAP_BLUE}` : `3px solid transparent`,
                      cursor: canNavigate && !isProcessing ? 'pointer' : 'not-allowed',
                      opacity: canNavigate || isActive ? 1 : 0.45,
                      transition: 'all 150ms ease',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ marginRight: '10px', color: isActive ? CAP_BLUE : isCompleted ? '#5C8E5C' : TEXT_MUTED, display: 'flex' }}>
                      <Icon size={16} />
                    </div>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? NAVY : isCompleted ? NAVY : TEXT_MUTED,
                    }}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}