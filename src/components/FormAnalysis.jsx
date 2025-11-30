import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader, Download, FileText, Eye, UserCheck } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { API_ENDPOINTS } from "../config/api";

export default function FormAnalysis({ form, selectedSignatures = [], onBack }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdf, setShowPdf] = useState(true);
  const [signatureData, setSignatureData] = useState([]);

  // Get PDF URL and signature data on mount
  useEffect(() => {
    const initialize = async () => {
      // Get PDF URL
      const { data: pdfData } = await supabase.storage
        .from('form-uploads')
        .getPublicUrl(form.file_url);
      
      if (pdfData?.publicUrl) {
        setPdfUrl(pdfData.publicUrl);
      }

      // Get selected signature data
      if (selectedSignatures.length > 0) {
        const sigData = await Promise.all(
          selectedSignatures.map(async (filename) => {
            const { data: urlData } = supabase.storage
              .from('signature-references')
              .getPublicUrl(filename);
            
            // Extract name from filename: "JohnSmith_123.png" -> "John Smith"
            const namePart = filename.split('_')[0];
            const displayName = namePart.replace(/([A-Z])/g, ' $1').trim();
            
            return {
              name: displayName,
              url: urlData?.publicUrl,
              filename
            };
          })
        );
        setSignatureData(sigData);
      }
    };

    initialize();
  }, [form.file_url, selectedSignatures]);

  const startVerification = async () => {
    setAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      // Get the Supabase public URL
      const { data: urlData } = await supabase.storage
        .from('form-uploads')
        .getPublicUrl(form.file_url);

      if (!urlData?.publicUrl) {
        throw new Error("Could not get file URL");
      }

      // Prepare signature references for backend
      const signatureReferences = signatureData.map(sig => ({
        name: sig.name,
        imageUrl: sig.url
      }));

      // Call backend with signatures
      const response = await fetch(API_ENDPOINTS.FORM_ANALYSIS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentUrl: urlData.publicUrl,
          formType: "F1BR-CTD",
          mimeType: "application/pdf",
          signatureReferences: signatureReferences  // NEW: Pass signatures
        })
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const verificationResults = await response.json();
      setResults(verificationResults);

    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Failed to verify form");
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'fail':
        return <XCircle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'border-green-200 bg-green-50';
      case 'fail':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Forms
          </button>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">Form Verification</h1>
                <p className="text-gray-600">File: <span className="font-medium">{form.filename}</span></p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Signature Badge */}
                {signatureData.length > 0 && (
                  <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-2 rounded-lg">
                    <UserCheck size={18} className="mr-2" />
                    <span className="text-sm font-medium">
                      {signatureData.length} signature(s) to match
                    </span>
                  </div>
                )}

                {/* Toggle PDF View Button */}
                <button
                  onClick={() => setShowPdf(!showPdf)}
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Eye size={18} className="mr-2" />
                  {showPdf ? 'Hide' : 'Show'} Document
                </button>
              </div>
            </div>

            {/* Show selected signatures preview */}
            {signatureData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Reference signatures for matching:</p>
                <div className="flex flex-wrap gap-3">
                  {signatureData.map((sig, idx) => (
                    <div key={idx} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <img 
                        src={sig.url} 
                        alt={sig.name}
                        className="h-8 w-auto mr-2"
                      />
                      <span className="text-sm font-medium">{sig.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT: PDF Viewer */}
          {showPdf && pdfUrl && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 flex items-center">
                <FileText size={20} className="mr-2" />
                <h2 className="font-semibold">Document Preview</h2>
              </div>
              <div className="h-[800px] overflow-hidden">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title="PDF Preview"
                />
              </div>
            </div>
          )}

          {/* RIGHT: Verification Results */}
          <div className={showPdf ? "" : "lg:col-span-2"}>
            
            {/* Start Verification Button */}
            {!analyzing && !results && !error && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
                    <CheckCircle size={48} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Ready to Verify</h2>
                  <p className="text-gray-600 mb-4">
                    Click below to start AI-powered verification. We'll check signatures, dates, field completeness, and FINRA compliance.
                  </p>
                  {signatureData.length > 0 && (
                    <p className="text-purple-600 font-medium mb-4">
                      ✓ Will match against {signatureData.length} reference signature(s)
                    </p>
                  )}
                  <button
                    onClick={startVerification}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                  >
                    Start Verification
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {analyzing && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                <Loader size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Analyzing Form...</h2>
                <p className="text-gray-600">Claude is reviewing the document</p>
                {signatureData.length > 0 && (
                  <p className="text-purple-600 text-sm mt-2">
                    Comparing signatures against {signatureData.length} reference(s)
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">This may take 15-45 seconds</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start">
                  <XCircle className="text-red-500 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-red-800 mb-1">Verification Failed</h3>
                    <p className="text-red-700">{error}</p>
                    <button
                      onClick={startVerification}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {results && (
              <div className="space-y-6">
                {/* Overall Status */}
                <div className={`rounded-xl shadow-lg p-6 border-2 ${getStatusColor(results.overallStatus)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(results.overallStatus)}
                      <h2 className="text-2xl font-bold ml-3">
                        {results.overallStatus === 'pass' ? 'Form Passed Verification' :
                         results.overallStatus === 'fail' ? 'Form Failed Verification' :
                         'Form Requires Attention'}
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `verification-report-${Date.now()}.json`;
                        a.click();
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Download size={20} className="mr-2" />
                      Download Report
                    </button>
                  </div>
                  {results.summary && (
                    <p className="mt-3 text-gray-700">{results.summary}</p>
                  )}
                </div>

                {/* Verification Checks */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Verification Checks</h3>
                  <div className="space-y-4">
                    {results.checks && results.checks.map((check, idx) => (
                      <div key={idx} className={`border rounded-lg p-4 ${getStatusColor(check.status)}`}>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {getStatusIcon(check.status)}
                          </div>
                          <div className="ml-3 flex-1">
                            <h4 className="font-bold text-gray-800">{check.name}</h4>
                            <p className="text-gray-700 mt-1">{check.description}</p>
                            {check.findings && check.findings.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {check.findings.map((finding, fIdx) => (
                                  <li key={fIdx} className="text-sm text-gray-600 flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{finding}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {results.recommendations && results.recommendations.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <AlertCircle className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}