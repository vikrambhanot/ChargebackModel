import { useState, useEffect, useRef } from "react";
import { UserCircle, Upload, Trash2, Plus, X, Check } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function SignaturePanel({ selectedSignatures, onSelectionChange }) {
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSignatures();
  }, []);

  async function fetchSignatures() {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('signature-references')
        .list('', {
          limit: 50,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error fetching signatures:', error);
        setSignatures([]);
      } else {
        // Parse filename to extract name: "JohnSmith_1699999999.png" -> "John Smith"
        const parsed = data
          .filter(file => file.name !== '.emptyFolderPlaceholder')
          .map(file => {
            const namePart = file.name.split('_')[0];
            // Convert camelCase to spaces: "JohnSmith" -> "John Smith"
            const displayName = namePart.replace(/([A-Z])/g, ' $1').trim();
            
            // Get public URL
            const { data: urlData } = supabase.storage
              .from('signature-references')
              .getPublicUrl(file.name);

            return {
              id: file.id,
              filename: file.name,
              name: displayName,
              url: urlData?.publicUrl,
              created_at: file.created_at
            };
          });
        setSignatures(parsed);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setSignatures([]);
    }
    setLoading(false);
  }

  const handleUpload = async () => {
    if (!newName.trim() || !newFile) {
      setError("Please provide both name and signature image");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Convert name to filename format: "John Smith" -> "JohnSmith"
      const safeName = newName.trim().replace(/\s+/g, '');
      const timestamp = Date.now();
      const extension = newFile.name.split('.').pop();
      const fileName = `${safeName}_${timestamp}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('signature-references')
        .upload(fileName, newFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Reset and refresh
      setNewName("");
      setNewFile(null);
      setShowAddModal(false);
      fetchSignatures();

    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload signature");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (signature) => {
    if (!window.confirm(`Delete signature for "${signature.name}"?`)) return;

    try {
      const { error } = await supabase.storage
        .from('signature-references')
        .remove([signature.filename]);

      if (error) {
        console.error('Delete error:', error);
      } else {
        // Remove from selection if selected
        if (selectedSignatures.includes(signature.filename)) {
          onSelectionChange(selectedSignatures.filter(f => f !== signature.filename));
        }
        fetchSignatures();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const toggleSelection = (filename) => {
    if (selectedSignatures.includes(filename)) {
      onSelectionChange(selectedSignatures.filter(f => f !== filename));
    } else {
      onSelectionChange([...selectedSignatures, filename]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-fit">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle size={20} className="mr-2" />
            <h2 className="font-semibold">Signature References</h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            title="Add signature reference"
          >
            <Plus size={18} />
          </button>
        </div>
        <p className="text-purple-100 text-xs mt-1">
          Select signatures to verify against
        </p>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <p className="text-gray-500 text-sm mt-2">Loading...</p>
          </div>
        ) : signatures.length === 0 ? (
          <div className="text-center py-8">
            <UserCircle className="mx-auto text-gray-300 mb-2" size={40} />
            <p className="text-gray-500 text-sm">No signatures yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add first signature
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {signatures.map((sig) => (
              <div
                key={sig.id}
                className={`border rounded-lg p-3 transition-all cursor-pointer ${
                  selectedSignatures.includes(sig.filename)
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
                onClick={() => toggleSelection(sig.filename)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded border-2 mr-2 flex items-center justify-center ${
                      selectedSignatures.includes(sig.filename)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedSignatures.includes(sig.filename) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{sig.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(sig);
                    }}
                    className="text-red-400 hover:text-red-600 p-1"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {sig.url && (
                  <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img
                      src={sig.url}
                      alt={`${sig.name} signature`}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Selection summary */}
        {selectedSignatures.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-purple-600 font-medium">
              {selectedSignatures.length} signature(s) selected for verification
            </p>
          </div>
        )}
      </div>

      {/* Add Signature Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Add Signature Reference</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewName("");
                  setNewFile(null);
                  setError(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signer's Full Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signature Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => setNewFile(e.target.files[0])}
                    ref={fileInputRef}
                    className="hidden"
                    id="signature-upload"
                  />
                  {newFile ? (
                    <div>
                      <img
                        src={URL.createObjectURL(newFile)}
                        alt="Preview"
                        className="max-h-24 mx-auto mb-2"
                      />
                      <p className="text-sm text-gray-600">{newFile.name}</p>
                      <button
                        onClick={() => setNewFile(null)}
                        className="text-red-500 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="signature-upload" className="cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-purple-600 font-medium">
                        Click to upload signature
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG or JPG (photo on white paper)
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewName("");
                  setNewFile(null);
                  setError(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || !newName.trim() || !newFile}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Add Signature'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}