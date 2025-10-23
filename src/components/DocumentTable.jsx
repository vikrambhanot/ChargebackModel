import { Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DocumentTable({ onAnalyze, refreshTrigger }) {
  const [documents, setDocuments] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const allSelected = documents.length > 0 && selectedIds.length === documents.length;

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  async function fetchDocuments() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .from('demo-uploads')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error fetching documents:', error);
        setDocuments([]);
      } else {
        // Transform storage list data to match our table format
        const transformedData = data.map(file => ({
          id: file.id,
          filename: file.name,
          file_url: file.name,
          created_at: file.created_at,
          file_size_bytes: file.metadata?.size || 0,
          mime_type: file.metadata?.mimetype || '-',
          estimated_tokens: file.metadata?.size ? Math.ceil(file.metadata.size / 4) : 0
        }));
        setDocuments(transformedData);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setDocuments([]);
    }
    setLoading(false);
  }

  const handleDelete = async (doc) => {
    if (window.confirm(`Delete ${doc.filename}?`)) {
      const { error } = await supabase.storage
        .from("demo-uploads")
        .remove([doc.file_url]);
      
      if (error) {
        console.error('Delete error:', error);
      } else {
        fetchDocuments();
      }
    }
  };

  const formatFileSize = (bytes) => (bytes ? `${(bytes / 1024).toFixed(1)} KB` : "0 KB");

  return (
    <div className="bg-white shadow p-4 rounded border">
      <h2 className="text-xl font-bold mb-4">Your Documents</h2>

      {loading ? (
        <p>Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  setSelectedIds(allSelected ? [] : documents.map((d) => d.id))
                }
              />
              <span className="text-sm">Select All ({selectedIds.length} selected)</span>
            </label>
            {selectedIds.length > 0 && (
              <button
                onClick={async () => {
                  if (window.confirm(`Delete ${selectedIds.length} documents?`)) {
                    const filePaths = documents
                      .filter((d) => selectedIds.includes(d.id))
                      .map((d) => d.file_url);
                    
                    const { error } = await supabase.storage
                      .from("demo-uploads")
                      .remove(filePaths);
                    
                    if (error) {
                      console.error('Bulk delete error:', error);
                    } else {
                      setSelectedIds([]);
                      fetchDocuments();
                    }
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                <Trash2 className="inline-block w-4 h-4 mr-1" />
                Delete Selected
              </button>
            )}
          </div>

          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100 border-b text-left">
                <th className="p-2"></th>
                <th className="p-2">Filename</th>
                <th className="p-2">Size</th>
                <th className="p-2">Type</th>
                <th className="p-2">Tokens (est.)</th>
                <th className="p-2">Uploaded</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(doc.id)}
                      onChange={() =>
                        setSelectedIds((prev) =>
                          prev.includes(doc.id)
                            ? prev.filter((id) => id !== doc.id)
                            : [...prev, doc.id]
                        )
                      }
                    />
                  </td>
                  <td className="p-2">{doc.filename}</td>
                  <td className="p-2">{formatFileSize(doc.file_size_bytes)}</td>
                  <td className="p-2">{doc.mime_type || "-"}</td>
                  <td className="p-2">{doc.estimated_tokens ?? "-"}</td>
                  <td className="p-2">{new Date(doc.created_at).toLocaleString()}</td>
                  <td className="p-2 space-x-2">
                    
                    <button
                      onClick={() => onAnalyze && onAnalyze(doc)}
                      className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded transition-colors"
                      title="Analyze"
                    >
                      Analyze
                    </button>
                    <button
                      onClick={() => handleDelete(doc)}
                      className="text-red-600 hover:text-red-800 ml-2"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}