import { Trash2, ArrowRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const CAP_BLUE = '#0070AD';
const CAP_BLUE_LIGHT = '#3A9DD4';

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

  const cellStyle = {
    padding: '14px 16px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '13px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
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
        Your Documents
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', padding: '20px 0' }}>
          Loading documents...
        </div>
      ) : documents.length === 0 ? (
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13px',
            padding: '32px 0',
            textAlign: 'center',
          }}
        >
          No documents uploaded yet.
        </div>
      ) : (
        <>
          {/* Selection bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '4px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelectedIds(allSelected ? [] : documents.map((d) => d.id))}
                style={{ accentColor: CAP_BLUE }}
              />
              <span>Select all ({selectedIds.length} selected)</span>
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(220,38,38,0.15)',
                  border: '1px solid rgba(220,38,38,0.3)',
                  borderRadius: '4px',
                  color: '#fca5a5',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={12} />
                Delete selected
              </button>
            )}
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...cellStyle, color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left' }}></th>
                <th style={{ ...cellStyle, color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left' }}>Filename</th>
                <th style={{ ...cellStyle, color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left' }}>Size</th>
                <th style={{ ...cellStyle, color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left' }}>Type</th>
                <th style={{ ...cellStyle, color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left' }}>Uploaded</th>
                <th style={{ ...cellStyle, color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  style={{ transition: 'background-color 150ms ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={cellStyle}>
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
                      style={{ accentColor: CAP_BLUE }}
                    />
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={14} style={{ color: CAP_BLUE_LIGHT, flexShrink: 0 }} />
                      <span>{doc.filename}</span>
                    </div>
                  </td>
                  <td style={{ ...cellStyle, color: 'rgba(255,255,255,0.6)' }}>{formatFileSize(doc.file_size_bytes)}</td>
                  <td style={{ ...cellStyle, color: 'rgba(255,255,255,0.6)' }}>{doc.mime_type || "-"}</td>
                  <td style={{ ...cellStyle, color: 'rgba(255,255,255,0.6)' }}>{new Date(doc.created_at).toLocaleString()}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => onAnalyze && onAnalyze(doc)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          backgroundColor: CAP_BLUE,
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'background-color 150ms ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005A8C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = CAP_BLUE}
                      >
                        Analyze
                        <ArrowRight size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc)}
                        style={{
                          padding: '6px',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: 'rgba(255,255,255,0.5)',
                          cursor: 'pointer',
                          transition: 'all 150ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)';
                          e.currentTarget.style.color = '#fca5a5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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