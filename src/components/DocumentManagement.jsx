import { useState } from "react";
import { Upload, FileText, Database, Sparkles } from 'lucide-react';
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
        onBack={() => setSelectedDoc(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Database className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Document Management System
            </h1>
          </div>
          <p className="text-lg text-gray-600 flex items-center justify-center">
            <Sparkles className="mr-2 text-purple-600" size={20} />
            Upload, manage, and analyze your documents with AI-powered insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center">
              <Upload className="text-blue-500 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Uploads</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <FileText className="text-green-500 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <div className="flex items-center">
              <Sparkles className="text-purple-500 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">AI Analysis</p>
                <p className="text-2xl font-bold text-gray-900">Ready</p>
              </div>
            </div>
          </div>
        </div>
        
        <FileUploader 
          onUploadComplete={() => setRefresh(prev => prev + 1)} 
        />
        
        <DocumentTable 
          refreshTrigger={refresh}
          onAnalyze={(doc) => setSelectedDoc(doc)}
        />
      </div>
    </div>
  );
}