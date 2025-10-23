import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, FileText, Sparkles, CheckCircle, Clock, Shield, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import FINRAComplianceRules from "./analysis/FINRAComplianceRules";
import { API_ENDPOINTS } from "../config/api";

const ANALYSIS_STEPS = [
  { id: "preview", label: "Document Preview", icon: FileText },
  { id: "rules-selection", label: "Select Rules", icon: Shield },
  { id: "analysis", label: "AI Analysis", icon: Sparkles },
  { id: "results", label: "Results", icon: CheckCircle },
];

export default function DocumentAnalysis({ doc, onBack }) {
  const [currentStep, setCurrentStep] = useState("preview");
  const [status, setStatus] = useState("Ready");
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);
  const [selectedRules, setSelectedRules] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Load document content with useCallback
  const loadDocumentContent = useCallback(async () => {
    try {
      setStatus("Loading document...");
      
      const { data } = supabase.storage
        .from('demo-uploads')
        .getPublicUrl(doc.file_url);
      
      if (data?.publicUrl) {
        if (doc.mime_type?.includes('text')) {
          const response = await fetch(data.publicUrl);
          const text = await response.text();
          setDocumentContent(text);
        } else {
          setDocumentContent("Preview not available for this file type");
        }
      }
      
      setStatus("Document loaded");
    } catch (error) {
      console.error("Error loading document:", error);
      setStatus("Error loading document");
    }
  }, [doc.file_url, doc.mime_type]);

  useEffect(() => {
    if (doc) {
      loadDocumentContent();
    }
  }, [doc, loadDocumentContent]);

  const handleStartReview = () => {
    setCurrentStep("rules-selection");
    setStatus("Select compliance rules to check");
  };

  const handleRulesSelected = (rules) => {
    setSelectedRules(rules);
    setCurrentStep("analysis");
    handleAnalyze(rules);
  };

  const handleAnalyze = async (rules) => {
    setIsProcessing(true);
    setStatus("Connecting to analysis service...");

    try {
      setStatus("Sending document to Claude AI for analysis...");
      
      const response = await fetch(API_ENDPOINTS.COMPLIANCE_ANALYZE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentContent,
          rules: rules.map(r => ({
            id: r.id,
            name: r.name,
            guidelines: r.guidelines,
            category: r.category,
            severity: r.severity
          }))
        })
      });

      setStatus("Processing response from AI...");

      if (!response.ok) {
        let errorMessage = 'Analysis request failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.summary || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const results = await response.json();
      
      // Check if it's an error response from backend
      if (results.overallStatus === 'ERROR') {
        setStatus('Error: ' + results.summary);
        
        // Show user-friendly error message
        if (results.summary.includes('API key')) {
          alert('⚠️ Claude API configuration error. Please contact support.');
        } else if (results.summary.includes('rate limit')) {
          alert('⚠️ Service is busy. Please try again in a few moments.');
        } else {
          alert('Analysis error: ' + results.summary);
        }
        
        setIsProcessing(false);
        return;
      }
      
      setAnalysisResults(results);
      setCurrentStep("results");
      setStatus(`Analysis complete - Found ${results.violations?.length || 0} issues`);
      setIsProcessing(false);
      
    } catch (error) {
      console.error("Analysis error:", error);
      setStatus("Error during analysis");
      setIsProcessing(false);
      
      // User-friendly error messages
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        alert('⚠️ Cannot connect to analysis service. Please ensure the backend is running ');
      } else {
        alert('Analysis failed: ' + error.message);
      }
    }
  };

  const canNavigateToStep = (stepId) => {
    switch (stepId) {
      case "preview":
        return true;
      case "rules-selection":
        return !!documentContent;
      case "analysis":
        return selectedRules.length > 0;
      case "results":
        return !!analysisResults;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "preview":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Preview</h2>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Filename:</span>
                  <p className="text-gray-600">{doc.filename}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>
                  <p className="text-gray-600">{doc.mime_type || 'Unknown'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Size:</span>
                  <p className="text-gray-600">{(doc.file_size_bytes / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Uploaded:</span>
                  <p className="text-gray-600">{new Date(doc.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {documentContent && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Content Preview:</h3>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{documentContent}</pre>
                </div>
              </div>
            )}

            <button
              onClick={handleStartReview}
              disabled={!documentContent}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50"
            >
              <Shield className="mr-2" size={20} />
              Start FINRA Compliance Review
            </button>
          </div>
        );

      case "rules-selection":
        return (
          <FINRAComplianceRules
            onProceed={handleRulesSelected}
            onBack={() => setCurrentStep("preview")}
          />
        );

      case "analysis":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing for FINRA Compliance</h2>
            <p className="text-gray-600">Claude AI is reviewing your document against {selectedRules.length} compliance rules...</p>
            <p className="text-sm text-gray-500 mt-4">{status}</p>
          </div>
        );

      case "results":
        return renderResults();

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!analysisResults) return null;

    const getStatusClasses = () => {
      switch (analysisResults.overallStatus) {
        case 'PASS': 
          return {
            icon: 'text-green-500',
            badge: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            heading: 'text-green-900'
          };
        case 'FAIL': 
          return {
            icon: 'text-red-500',
            badge: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            heading: 'text-red-900'
          };
        case 'NEEDS_REVIEW': 
          return {
            icon: 'text-yellow-500',
            badge: 'text-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
            heading: 'text-yellow-900'
          };
        default: 
          return {
            icon: 'text-gray-500',
            badge: 'text-gray-600',
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-800',
            heading: 'text-gray-900'
          };
      }
    };

    const statusClasses = getStatusClasses();

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CheckCircle className={`${statusClasses.icon} mr-3`} size={32} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Compliance Analysis Complete</h2>
              <p className="text-gray-600">Document reviewed against {selectedRules.length} FINRA rules</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{analysisResults.complianceScore}%</div>
            <div className={`text-sm font-semibold ${statusClasses.badge}`}>
              {analysisResults.overallStatus.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* How to Interpret Results Section */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-4">
              <Sparkles className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                📊 How to Interpret Your Score
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-semibold text-green-800">90-100%</span>
                  </div>
                  <p className="text-gray-700 text-xs">
                    <strong>Excellent</strong> - Document is compliant or has only minor issues
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="font-semibold text-yellow-800">70-89%</span>
                  </div>
                  <p className="text-gray-700 text-xs">
                    <strong>Needs Review</strong> - Some violations require attention
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-200">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="font-semibold text-red-800">Below 70%</span>
                  </div>
                  <p className="text-gray-700 text-xs">
                    <strong>Critical Issues</strong> - Immediate action required
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-600">
                  <strong>Scoring:</strong> Each violation deducts points based on severity:
                  <span className="ml-2 text-red-600 font-semibold">Critical (-25 pts)</span>
                  <span className="mx-2">•</span>
                  <span className="text-yellow-600 font-semibold">Warning (-10 pts)</span>
                  <span className="mx-2">•</span>
                  <span className="text-blue-600 font-semibold">Info (-5 pts)</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className={`p-4 ${statusClasses.bg} ${statusClasses.border} border rounded-lg mb-6`}>
          <h3 className={`font-semibold ${statusClasses.heading} mb-2`}>Summary</h3>
          <p className={statusClasses.text}>{analysisResults.summary}</p>
        </div>

        {/* Violations */}
        {analysisResults.violations && analysisResults.violations.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg mb-3">
              Violations Found ({analysisResults.violations.length})
            </h3>
            {analysisResults.violations.map((violation, index) => {
              const getSeverityClasses = (severity) => {
                switch (severity) {
                  case 'critical':
                    return {
                      border: 'border-red-500',
                      bg: 'bg-red-50',
                      badge: 'bg-red-200 text-red-800'
                    };
                  case 'warning':
                    return {
                      border: 'border-yellow-500',
                      bg: 'bg-yellow-50',
                      badge: 'bg-yellow-200 text-yellow-800'
                    };
                  case 'info':
                    return {
                      border: 'border-blue-500',
                      bg: 'bg-blue-50',
                      badge: 'bg-blue-200 text-blue-800'
                    };
                  default:
                    return {
                      border: 'border-gray-500',
                      bg: 'bg-gray-50',
                      badge: 'bg-gray-200 text-gray-800'
                    };
                }
              };

              const severityClasses = getSeverityClasses(violation.severity);

              return (
                <div key={index} className={`border-l-4 ${severityClasses.border} ${severityClasses.bg} p-4 rounded-r-lg`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{violation.ruleName}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityClasses.badge}`}>
                      {violation.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{violation.description}</p>
                  {violation.excerpt && (
                    <div className="bg-white p-3 rounded border border-gray-200 mb-2">
                      <p className="text-sm font-mono text-gray-600">"{violation.excerpt}"</p>
                    </div>
                  )}
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-sm font-semibold text-green-800 mb-1">Recommendation:</p>
                    <p className="text-sm text-green-700">{violation.recommendation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(!analysisResults.violations || analysisResults.violations.length === 0) && (
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
            <h3 className="font-bold text-green-900 text-lg mb-2">No Violations Found</h3>
            <p className="text-green-700">This document appears to be compliant with all selected FINRA rules.</p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => {
              setCurrentStep("preview");
              setAnalysisResults(null);
              setSelectedRules([]);
              setStatus("Ready for new analysis");
            }}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            Analyze Another Document
          </button>
          <button
            onClick={() => {
              alert('Export functionality coming soon!');
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Export Report
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FINRA Compliance Analysis</h1>
            <p className="text-gray-600 mt-1">{status}</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Steps */}
          <div className="w-64 bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold text-gray-900 mb-4">Analysis Steps</h3>
            <div className="space-y-2">
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
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : isCompleted
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    } ${canNavigate && !isProcessing ? 'hover:bg-blue-50 cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                  >
                    <div className={`mr-3 ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-600'
                    }`}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}