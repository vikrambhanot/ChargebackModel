import { Trash2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FormTable({ onVerify, refreshTrigger }) {
  const [forms, setForms] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const allSelected = forms.length > 0 && selectedIds.length === forms.length;

  useEffect(() => {
    fetchForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  async function fetchForms() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .from('form-uploads')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error fetching forms:', error);
        setForms([]);
      } else {
        const transformedData = data.map(file => ({
          id: file.id,
          filename: file.name,
          file_url: file.name,
          created_at: file.created_at,
          file_size_bytes: file.metadata?.size || 0,
          mime_type: file.metadata?.mimetype || '-',
        }));
        setForms(transformedData);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setForms([]);
    }
    setLoading(false);
  }

  const handleDelete = async (form) => {
    if (window.confirm(`Delete ${form.filename}?`)) {
      const { error } = await supabase.storage
        .from("form-uploads")
        .remove([form.file_url]);
      
      if (error) {
        console.error('Delete error:', error);
      } else {
        fetchForms();
      }
    }
  };

  const formatFileSize = (bytes) => (bytes ? `${(bytes / 1024).toFixed(1)} KB` : "0 KB");

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Uploaded Forms</h2>
        {forms.length > 0 && (
          <span className="text-sm text-gray-500">{forms.length} form(s) available</span>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-2">Loading forms...</p>
        </div>
      ) : forms.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <ShieldCheck className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500 text-lg font-medium">No forms uploaded yet</p>
          <p className="text-gray-400 text-sm mt-1">Upload completed forms above to verify compliance</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3 pb-3 border-b">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  setSelectedIds(allSelected ? [] : forms.map((f) => f.id))
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium">
                Select All {selectedIds.length > 0 && `(${selectedIds.length} selected)`}
              </span>
            </label>
            {selectedIds.length > 0 && (
              <button
                onClick={async () => {
                  if (window.confirm(`Delete ${selectedIds.length} form(s)?`)) {
                    const filePaths = forms
                      .filter((f) => selectedIds.includes(f.id))
                      .map((f) => f.file_url);
                    
                    const { error } = await supabase.storage
                      .from("form-uploads")
                      .remove(filePaths);
                    
                    if (error) {
                      console.error('Bulk delete error:', error);
                    } else {
                      setSelectedIds([]);
                      fetchForms();
                    }
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="p-3 text-left">
                    <div className="w-4"></div>
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">Filename</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Size</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Uploaded</th>
                  <th className="p-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(form.id)}
                        onChange={() =>
                          setSelectedIds((prev) =>
                            prev.includes(form.id)
                              ? prev.filter((id) => id !== form.id)
                              : [...prev, form.id]
                          )
                        }
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-800">{form.filename}</td>
                    <td className="p-3 text-gray-600">{formatFileSize(form.file_size_bytes)}</td>
                    <td className="p-3 text-gray-600 text-sm">
                      {new Date(form.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onVerify && onVerify(form)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center text-sm font-medium"
                          title="Verify Form"
                        >
                          <ShieldCheck className="w-4 h-4 mr-1" />
                          Verify
                        </button>
                        <button
                          onClick={() => handleDelete(form)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}