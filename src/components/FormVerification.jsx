import { useState } from "react";
import { ClipboardCheck, Sparkles, Shield, UserCheck } from 'lucide-react';
import FormTable from './FormTable';
import FormUploader from './FormUploader';
import FormAnalysis from './FormAnalysis';
import SignaturePanel from './SignaturePanel';

export default function FormVerification() {
  const [refresh, setRefresh] = useState(0);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedSignatures, setSelectedSignatures] = useState([]);

  // ✅ FIXED: Pass both form AND selectedSignatures
  if (selectedForm) {
    return (
      <FormAnalysis 
        form={selectedForm}
        selectedSignatures={selectedSignatures}
        onBack={() => {
          setSelectedForm(null);
          setRefresh(prev => prev + 1);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-4">
                    <ClipboardCheck size={32} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">
                      FINRA Form Verification
                    </h1>
                    <p className="text-blue-100 mt-1 flex items-center">
                      <Shield className="mr-2" size={18} />
                      Automated Compliance Checking for Financial Forms
                    </p>
                  </div>
                </div>
                <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <p className="text-sm mb-2">This demo verifies:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="flex items-center">
                      <Sparkles className="mr-2" size={16} />
                      <span className="text-sm">Signature Presence</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="mr-2" size={16} />
                      <span className="text-sm">Date Logic</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="mr-2" size={16} />
                      <span className="text-sm">Field Completeness</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="mr-2" size={16} />
                      <span className="text-sm">Checkbox Validation</span>
                    </div>
                    <div className="flex items-center">
                      <UserCheck className="mr-2" size={16} />
                      <span className="text-sm font-semibold">Signature Match</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-blue-100 mb-1">Status</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-lg font-semibold">Ready to Verify</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Signature Panel */}
          <div className="lg:col-span-1">
            <SignaturePanel 
              selectedSignatures={selectedSignatures}
              onSelectionChange={setSelectedSignatures}
            />
          </div>

          {/* Right: Upload & Forms Table */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upload Section */}
            <FormUploader 
              onUploadComplete={() => setRefresh(prev => prev + 1)} 
            />
            
            {/* Forms Table */}
            <FormTable 
              refreshTrigger={refresh}
              onVerify={(form) => setSelectedForm(form)}
              selectedSignatureCount={selectedSignatures.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}