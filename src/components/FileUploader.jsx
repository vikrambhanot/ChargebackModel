import { useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FileUploader({ onUploadComplete }) {
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

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h3 className="text-lg font-bold mb-2">Upload Documents</h3>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
        ref={fileInputRef}
        className="mb-2 block"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={uploading || !files.length}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : `Upload ${files.length} file(s)`}
      </button>
    </div>
  );
}