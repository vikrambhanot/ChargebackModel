import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const CAP_BLUE = '#0070AD';
const CAP_BLUE_LIGHT = '#3A9DD4';

export default function FileUploader({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    setError(null);
    if (!files.length) {
      setError("No files selected");
      return;
    }

    setUploading(true);

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} is too large (max 10MB). Skipping.`);
        continue;
      }

      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("demo-uploads")
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length) setFiles(dropped);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: '8px',
        padding: '24px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: CAP_BLUE_LIGHT,
          marginBottom: '14px',
        }}
      >
        Upload Documents
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `1.5px dashed ${isDragging ? CAP_BLUE_LIGHT : 'rgba(255,255,255,0.18)'}`,
          borderRadius: '8px',
          padding: '36px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? 'rgba(0,112,173,0.08)' : 'transparent',
          transition: 'all 200ms ease',
        }}
      >
        <Upload
          size={32}
          style={{
            color: isDragging ? CAP_BLUE_LIGHT : 'rgba(255,255,255,0.4)',
            margin: '0 auto 14px',
            transition: 'color 200ms ease',
          }}
        />
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', fontWeight: 400, marginBottom: '6px' }}>
          {isDragging ? 'Drop files here' : 'Drag files here or click to browse'}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          PDF, TXT, DOC · Max 10MB per file
        </div>
        <input
          type="file"
          multiple
          accept=".pdf,.txt,.doc,.docx"
          ref={fileInputRef}
          onChange={(e) => setFiles(Array.from(e.target.files))}
          style={{ display: 'none' }}
        />
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {files.map((file, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '6px',
                marginBottom: '6px',
              }}
            >
              <FileText size={16} style={{ color: CAP_BLUE_LIGHT, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
                  {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            backgroundColor: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: '6px',
            color: '#fca5a5',
            fontSize: '12px',
          }}
        >
          {error}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !files.length}
        style={{
          marginTop: '16px',
          width: '100%',
          padding: '12px 20px',
          backgroundColor: !files.length || uploading ? 'rgba(255,255,255,0.08)' : CAP_BLUE,
          color: !files.length || uploading ? 'rgba(255,255,255,0.4)' : 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          cursor: uploading || !files.length ? 'not-allowed' : 'pointer',
          transition: 'background-color 200ms ease',
        }}
        onMouseEnter={(e) => {
          if (!uploading && files.length) e.currentTarget.style.backgroundColor = '#005A8C';
        }}
        onMouseLeave={(e) => {
          if (!uploading && files.length) e.currentTarget.style.backgroundColor = CAP_BLUE;
        }}
      >
        {uploading ? 'Uploading...' : files.length ? `Upload ${files.length} file${files.length !== 1 ? 's' : ''}` : 'Select files to upload'}
      </button>
    </div>
  );
}