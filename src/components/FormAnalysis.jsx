import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader, Download } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function FormAnalysis({ form, onBack }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // In FormAnalysis.jsx, replace the startVerification function:

const startVerification = async () => {
  setAnalyzing(true);
  setError(null);
  setResults(null);

  try {
    // 1. Get the Supabase public URL for the file
    const { data: urlData } = await supabase.storage
      .from('form-uploads')
      .getPublicUrl(form.file_url);

    if (!urlData?.publicUrl) {
      throw new Error("Could not get file URL");
    }

    // 2. Call YOUR backend instead of Claude directly
    const response = await fetch("http://localhost:8080/api/compliance/verify-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentUrl: urlData.publicUrl,
        formType: "F1BR-CTD",
        mimeType: "application/pdf"
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
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-2xl font-bold mb-2">Form Verification</h1>
            <p className="text-gray-600">File: <span className="font-medium">{form.filename}</span></p>
          </div>
        </div>

        {/* Start Verification Button */}
        {!analyzing && !results && !error && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
                <CheckCircle size={48} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Ready to Verify</h2>
              <p className="text-gray-600 mb-6">
                Click below to start AI-powered verification of this form. We'll check signatures, dates, field completeness, and FINRA compliance requirements.
              </p>
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
            <p className="text-gray-600">This may take 10-30 seconds</p>
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
            <div className={`rounded-xl shadow-lg p-6 border-2 ${getStatusColor(results.overall_status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(results.overall_status)}
                  <h2 className="text-2xl font-bold ml-3">
                    {results.overall_status === 'pass' ? 'Form Passed Verification' :
                     results.overall_status === 'fail' ? 'Form Failed Verification' :
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
  );
}

// System prompt for Claude API
const FORM_VERIFICATION_PROMPT = `You are a FINRA compliance verification AI that reviews completed financial forms for regulatory compliance.

TASK: Analyze this LPL Financial Trade Direct Account Application (Form F1BR-CTD) and verify compliance with FINRA requirements.

VERIFICATION CHECKLIST:

1. **Signature Completeness**
   - All required Account Holder signatures present (Section VI, page 9)
   - Each signature has corresponding printed name
   - Each signature has date
   - All signatures are notarized (notary signature, stamp, and date present)

2. **Date Logic & Chronology**
   - Account Holder signature dates are valid dates
   - Notary dates are on or after Account Holder dates
   - No dates are in the future
   - All date fields are complete

3. **Required Field Completeness**
   - Section I: Account Type, Registration Type, SSN/Tax ID, Account Registration, Address, Phone
   - Section II: Investment Objective selected
   - Section III: Primary Account Holder info complete (name, address, SSN, DOB, occupation, employer)
   - Section IV: Financial information (income, net worth, liquid net worth, account value)
   - Section V: Beneficiary information (if applicable)

4. **Checkbox Validation**
   - Investment Objective: Exactly ONE option selected
   - Residency Status: One option selected
   - Registration Type: One type selected
   - Required acknowledgments checked where applicable

5. **FINRA-Specific Requirements**
   - If person is associated with broker/dealer: disclosure fields completed
   - If PEP (Politically Exposed Person): disclosure completed
   - Trusted contact information (or explicit decline)
   - Arbitration acknowledgment
   - Backup withholding certification

6. **Notarization Requirements**
   - All account holders have separate notary sections
   - Each notary section has: notary signature, stamp/seal, city, state, date
   - Notary dates are reasonable (not before client signature)

OUTPUT FORMAT (MUST BE VALID JSON):
{
  "overall_status": "pass" | "fail" | "warning",
  "summary": "Brief overall assessment",
  "checks": [
    {
      "name": "Check name",
      "status": "pass" | "fail" | "warning",
      "description": "What was verified",
      "findings": ["Specific findings or issues"]
    }
  ],
  "recommendations": ["List of recommended actions if any issues found"]
}

IMPORTANT:
- Be thorough but practical
- "pass" = compliant and complete
- "fail" = missing critical requirements or signatures
- "warning" = minor issues or unclear fields
- DO NOT output anything other than the JSON object
- DO NOT use markdown code blocks in your response`;