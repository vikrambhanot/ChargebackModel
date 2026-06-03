// src/components/ComplianceAgentIntro.jsx
// Cinematic intro screen for the FINRA Compliance module.
// Single agent, abstract mark, typewriter monologue, click-to-continue.

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';

// Capgemini palette
const DEEP_NAVY = '#0B1426';
const NAVY = '#14213D';
const CAP_BLUE = '#0070AD';
const CAP_BLUE_LIGHT = '#3A9DD4';

const MONOLOGUE = [
  "Hello. I'm your Compliance Review Agent.",
  "I conduct granular reviews of financial communications against FINRA and SEC regulatory frameworks — Rule 2210, Regulation Best Interest, Rule 2090, Rule 2111, and others your firm configures.",
  "I cite specific rule subsections. I quote source text verbatim. I flag concerns with evidence, not assumptions.",
  "I do not generate false positives.",
  "Show me what you need reviewed.",
];

const LINE_REVEAL_DELAY = 1400;  // ms between each line appearing
const INITIAL_DELAY = 400;       // ms before first line appears

export default function ComplianceAgentIntro({ onContinue }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const [fading, setFading] = useState(false);

  // Reveal lines one at a time
  useEffect(() => {
    let timeouts = [];

    // Schedule each line to appear
    MONOLOGUE.forEach((_, index) => {
      const t = setTimeout(() => {
        setVisibleCount(index + 1);
        if (index === MONOLOGUE.length - 1) {
          setTimeout(() => setComplete(true), 600);
        }
      }, INITIAL_DELAY + index * LINE_REVEAL_DELAY);
      timeouts.push(t);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const handleClick = () => {
    if (!complete) {
      // Skip — reveal all lines immediately
      setVisibleCount(MONOLOGUE.length);
      setComplete(true);
      return;
    }
    // Click after complete: transition out
    setFading(true);
    setTimeout(() => onContinue(), 600);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        backgroundColor: DEEP_NAVY,
        cursor: 'pointer',
        overflow: 'hidden',
        opacity: fading ? 0 : 1,
        transition: 'opacity 600ms ease-out',
      }}
    >
      {/* Ambient background — subtle radial gradients evoking depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(0,112,173,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0,112,173,0.10) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Two-column content: monologue left, architecture diagram right */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          maxWidth: '1280px',
          margin: '0 auto',
          zIndex: 10,
          gap: '64px',
        }}
      >
        {/* Left column: agent identity + monologue */}
        <div
          style={{
            flex: '1 1 0',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Agent identity mark */}
          <AgentMark />

          {/* Agent label */}
          <div
            style={{
              marginTop: '28px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: CAP_BLUE_LIGHT,
              opacity: 0.85,
            }}
          >
            Compliance Review Agent
          </div>

          {/* Divider */}
          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              margin: '20px 0 28px',
            }}
          />

          {/* Monologue */}
          <div
            style={{
              minHeight: '280px',
              color: 'rgba(255,255,255,0.92)',
              fontWeight: 300,
              fontSize: '19px',
              lineHeight: '1.6',
              letterSpacing: '0.005em',
              textAlign: 'left',
            }}
          >
            {MONOLOGUE.map((para, i) => (
              <p
                key={i}
                style={{
                  marginBottom: '16px',
                  opacity: i < visibleCount ? 0.95 : 0,
                  transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Click-to-continue prompt */}
          <div
            style={{
              marginTop: '32px',
              height: '32px',
              opacity: complete ? 1 : 0,
              transition: 'opacity 800ms ease-in',
            }}
          >
            {complete && (
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  animation: 'fade-pulse 2.4s ease-in-out infinite',
                }}
              >
                Click anywhere to continue
              </div>
            )}
          </div>
        </div>

        {/* Right column: architecture diagram — fades in once monologue is mostly revealed */}
        <div
          style={{
            flex: '1 1 0',
            maxWidth: '460px',
            opacity: visibleCount >= 2 ? 1 : 0,
            transform: visibleCount >= 2 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 900ms ease-out, transform 900ms ease-out',
          }}
          className="hidden lg:block"
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: CAP_BLUE_LIGHT,
              opacity: 0.7,
              marginBottom: '20px',
            }}
          >
            Review Architecture
          </div>
          <ArchitectureDiagram />
        </div>

        {/* Skip hint (only visible while revealing) */}
        {!complete && (
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            Click to skip
          </div>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes mark-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ring-rotate-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

// The agent's visual identity — abstract shield mark with rotating rings
function AgentMark() {
  return (
    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
      {/* Outer rotating ring */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'ring-rotate 24s linear infinite',
        }}
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke={CAP_BLUE}
          strokeWidth="0.5"
          strokeDasharray="2 8"
          opacity="0.5"
        />
      </svg>

      {/* Inner counter-rotating ring */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'ring-rotate-reverse 18s linear infinite',
        }}
      >
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke={CAP_BLUE_LIGHT}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity="0.35"
        />
      </svg>

      {/* Static inner glow */}
      <div
        style={{
          position: 'absolute',
          inset: '24px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${CAP_BLUE}33 0%, transparent 70%)`,
        }}
      />

      {/* Central shield */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'mark-pulse 4s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: CAP_BLUE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 32px ${CAP_BLUE}80`,
          }}
        >
          <ShieldCheck size={32} color="white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}