import { useRef, useState } from "react";
import { Upload, FileCheck } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function FormUploader({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    setError(null);
    if (!files.length) {
      setError("No files selected");
      return;
    }

    setUploading(true);

    for (const file of files) {
      // Validate file type
      if (!file.type.includes('pdf')) {
        setError(`File ${file.name} must be a PDF. Skipping.`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} is too large (max 10MB). Skipping.`);
        continue;
      }

      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("form-uploads")
        .upload(fileName, file, { 
          cacheControl: '3600',
          upsert: false 
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setError(`Error uploading ${file.name}: ${uploadError.message}`);
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    setFiles([]);
    setUploading(false);
    if (onUploadComplete) onUploadComplete();
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
      <div className="flex items-center mb-4">
        <FileCheck className="mr-3 text-blue-600" size={24} />
        <h3 className="text-xl font-bold">Upload Completed Forms</h3>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Supported:</strong> LPL Financial Account Applications (Form F1BR-CTD) and similar FINRA forms
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Upload completed forms to verify signatures, dates, field completeness, and compliance requirements
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <Upload className="mx-auto mb-3 text-gray-400" size={40} />
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          ref={fileInputRef}
          className="hidden"
          id="form-upload-input"
        />
        <label 
          htmlFor="form-upload-input"
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
        >
          Click to select PDF forms
        </label>
        <p className="text-sm text-gray-500 mt-2">or drag and drop</p>
        <p className="text-xs text-gray-400 mt-1">PDF files only, up to 10MB each</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">{files.length} file(s) selected:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="flex items-center">
                <FileCheck size={14} className="mr-2 text-green-500" />
                {f.name} ({(f.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !files.length}
        className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
      >
        {uploading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          `Upload ${files.length} form(s) for verification`
        )}
      </button>
    </div>
  );
}