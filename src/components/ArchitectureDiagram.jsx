// src/components/ArchitectureDiagram.jsx
// Subtle animated architecture diagram for the home page hero.
// 4 layers with pulsing data-flow dots between them.

const NAVY = '#14213D';
const CAP_BLUE = '#0070AD';
const CAP_BLUE_LIGHT = '#3A9DD4';
const SURFACE = '#FFFFFF';
const SURFACE_BORDER = '#D8D8D0';

const LAYERS = [
  {
    id: 'intake',
    title: 'Document Intake',
    subtitle: 'PDF · Email · Marketing · Communications',
    icon: 'file',
  },
  {
    id: 'library',
    title: 'Rule Library',
    subtitle: 'FINRA · Reg BI · Firm-configurable overlays',
    icon: 'book',
  },
  {
    id: 'engine',
    title: 'Analysis Engine',
    subtitle: 'Classification · Section review · Citation',
    icon: 'cpu',
  },
  {
    id: 'audit',
    title: 'Audit & Reporting',
    subtitle: 'Findings · Memos · Annotated exports',
    icon: 'shield',
  },
];

// Inline SVG icons (small, consistent)
const Icon = ({ name, size = 18, color = 'white' }) => {
  const paths = {
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

export default function ArchitectureDiagram() {
  return (
    <div style={{ width: '100%', maxWidth: '440px', position: 'relative' }}>
      {LAYERS.map((layer, i) => (
        <div key={layer.id}>
          {/* Layer card */}
          <div
            style={{
              position: 'relative',
              backgroundColor: SURFACE,
              border: `1px solid ${SURFACE_BORDER}`,
              borderRadius: '8px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 2px 8px rgba(20, 33, 61, 0.06)',
              animation: `layer-fade-in 600ms ease-out ${i * 150}ms both`,
            }}
          >
            {/* Layer number badge */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: CAP_BLUE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 600,
                color: 'white',
                border: `2px solid #FFFFFF`,
              }}
            >
              {i + 1}
            </div>

            {/* Icon */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                backgroundColor: 'rgba(0,112,173,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name={layer.icon} size={18} color={CAP_BLUE} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: NAVY,
                  marginBottom: '2px',
                  letterSpacing: '0.01em',
                }}
              >
                {layer.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(20, 33, 61, 0.55)',
                  letterSpacing: '0.02em',
                }}
              >
                {layer.subtitle}
              </div>
            </div>
          </div>

          {/* Connector with flowing dot — between layers, not after last */}
          {i < LAYERS.length - 1 && (
            <div
              style={{
                position: 'relative',
                height: '32px',
                marginLeft: '38px',
                width: '2px',
                backgroundColor: 'rgba(0,112,173,0.20)',
                overflow: 'hidden',
              }}
            >
              {/* Flowing dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-3px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: CAP_BLUE,
                  boxShadow: `0 0 12px ${CAP_BLUE_LIGHT}`,
                  animation: `flow-dot 3s ease-in-out ${i * 0.75}s infinite`,
                }}
              />
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes layer-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flow-dot {
          0% { top: -8px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}