import { useState } from "react";
import { Database, Sparkles } from 'lucide-react';
import DocumentTable from './DocumentTable';
import FileUploader from './FileUploader';
import DocumentAnalysis from './DocumentAnalysis';

export default function DocumentManagement() {
  const [refresh, setRefresh] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with gradient card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-4">
                    <Database size={32} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">
                      FINRA Compliance Analysis
                    </h1>
                    <p className="text-purple-100 mt-1 flex items-center">
                      <Sparkles className="mr-2" size={18} />
                      AI-Powered Document Compliance Verification
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-purple-100 mb-1">Status</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-lg font-semibold">System Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload Section */}
        <div className="mb-8">
          <FileUploader 
            onUploadComplete={() => setRefresh(prev => prev + 1)} 
          />
        </div>
        
        {/* Document Table */}
        <DocumentTable 
          refreshTrigger={refresh}
          onAnalyze={(doc) => setSelectedDoc(doc)}
        />
      </div>
    </div>
  );
}