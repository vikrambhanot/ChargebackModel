// src/components/PlatformStack.jsx
// 3D-feel layered stack showing the platform architecture.
// Bottom-up: Data Domains → Semantic Layer → Agent Orchestration → Agents → Personas

// Layers, top-to-bottom in render order (top of stack first)
const LAYERS = [
  {
    id: 'personas',
    title: 'Personas',
    items: ['Compliance Officer', 'Advisor', 'Auditor', 'Counsel'],
    fill: '#E31837',
    border: '#B8122C',
    textColor: '#FFFFFF',
    itemBg: 'rgba(255,255,255,0.18)',
  },
  {
    id: 'agents',
    title: 'Agents',
    items: ['FINRA Agent', 'AML Agent', 'KYC Agent', 'Reg BI Agent'],
    fill: '#B8122C',
    border: '#8E0E22',
    textColor: '#FFFFFF',
    itemBg: 'rgba(255,255,255,0.18)',
  },
  {
    id: 'orchestration',
    title: 'Agent Orchestration',
    items: ['Routing', 'Multi-step reasoning', 'Tool invocation'],
    fill: '#2A2A2A',
    border: '#141414',
    textColor: '#FFFFFF',
    itemBg: 'rgba(255,255,255,0.14)',
  },
  {
    id: 'semantic',
    title: 'Semantic Layer',
    items: ['Rule libraries', 'Retrieval', 'Citation graph'],
    fill: '#4A4A4A',
    border: '#333333',
    textColor: '#FFFFFF',
    itemBg: 'rgba(255,255,255,0.16)',
  },
  {
    id: 'data',
    title: 'Data Domains',
    items: ['Communications', 'Marketing', 'Disclosures', 'Trade Data'],
    fill: '#D6D6D6',
    border: '#B5B5B5',
    textColor: '#141414',
    itemBg: 'rgba(20,20,20,0.08)',
  },
];

// Perspective skew constants
const SKEW_X = 18;      // pixels of horizontal offset between top-back and front-bottom edges
const LAYER_HEIGHT = 80;
const LAYER_GAP = 14;
const STACK_WIDTH = 380; // width of the front face

export default function PlatformStack() {
  const totalHeight = LAYERS.length * (LAYER_HEIGHT + LAYER_GAP) - LAYER_GAP + 20;

  return (
    <div style={{ width: STACK_WIDTH + SKEW_X + 20, position: 'relative' }}>
      <div style={{ position: 'relative', height: totalHeight }}>
        {LAYERS.map((layer, i) => (
          <Layer
            key={layer.id}
            layer={layer}
            index={i}
            yOffset={i * (LAYER_HEIGHT + LAYER_GAP)}
          />
        ))}
      </div>

      <style>{`
        @keyframes layer-rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Layer({ layer, index, yOffset }) {
  const w = STACK_WIDTH;
  const h = LAYER_HEIGHT;
  const skew = SKEW_X;

  const frontPath = `M ${skew},0 L ${w + skew},0 L ${w},${h} L 0,${h} Z`;
  const sideDepth = 10;
  const sidePath = `M ${w + skew},0 L ${w + skew + sideDepth},${sideDepth} L ${w + sideDepth},${h + sideDepth} L ${w},${h} Z`;
  const topHighlightPath = `M ${skew},0 L ${w + skew},0`;

  return (
    <div
      style={{
        position: 'absolute',
        top: yOffset,
        left: 0,
        width: w + skew + sideDepth,
        height: h + sideDepth,
        animation: `layer-rise 600ms ease-out ${index * 100}ms both`,
      }}
    >
      <svg
        width={w + skew + sideDepth}
        height={h + sideDepth}
        style={{ position: 'absolute', inset: 0 }}
      >
        <path d={sidePath} fill={layer.border} opacity="0.85" />
        <path d={frontPath} fill={layer.fill} stroke={layer.border} strokeWidth="0.5" />
        <path d={topHighlightPath} stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
        <path d={`M 0,${h} L ${w},${h}`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '14px 20px 14px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: layer.textColor,
            letterSpacing: '0.02em',
            marginBottom: '6px',
          }}
        >
          {layer.title}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {layer.items.map((item) => (
            <span
              key={item}
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: layer.textColor,
                backgroundColor: layer.itemBg,
                padding: '2px 8px',
                borderRadius: '3px',
                opacity: 0.9,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}