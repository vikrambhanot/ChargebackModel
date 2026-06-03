// src/components/analysis/EnhancedAnalysisResults.jsx
import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, ArrowLeft, Download, FileText, Mail, Megaphone, Gift, Scale, BarChart3, Receipt, BookOpen, MessageSquare, AlertCircle } from 'lucide-react';

// Capgemini palette
const NAVY = '#14213D';
const TEXT_MUTED = '#5C6B82';
const CAP_BLUE = '#0070AD';
const CAP_BLUE_DARK = '#005A8C';
const PAGE_BG_TINT = '#F0F4F8';
const SURFACE = '#FFFFFF';
const BORDER = '#D8E1EA';

// Muted severity (matches FINRAComplianceRules)
const SEV = {
  critical: { fg: '#B85450', bg: '#FDF1F0', border: '#E8B5B2' },
  warning:  { fg: '#C68A4F', bg: '#FDF6EE', border: '#E8C9A8' },
  info:     { fg: '#0070AD', bg: '#E8F2F8', border: '#A8C9DF' },
};

// Status colors (muted)
const STATUS = {
  PASS:          { fg: '#5C8E5C', bg: '#EEF5EE', border: '#B5D1B5', label: 'Pass' },
  FAIL:          { fg: '#B85450', bg: '#FDF1F0', border: '#E8B5B2', label: 'Fail' },
  NEEDS_REVIEW:  { fg: '#C68A4F', bg: '#FDF6EE', border: '#E8C9A8', label: 'Needs Review' },
  ERROR:         { fg: TEXT_MUTED, bg: PAGE_BG_TINT, border: BORDER, label: 'Error' },
};

const CLASSIFICATION_ICON = {
  EMAIL: Mail,
  MARKETING: Megaphone,
  GIFT_CARD: Gift,
  DISCLOSURE: Scale,
  RESEARCH: BarChart3,
  ACCOUNT_STATEMENT: Receipt,
  EDUCATIONAL: BookOpen,
  CORRESPONDENCE: MessageSquare,
  OTHER: FileText,
};

export default function EnhancedAnalysisResults({ results, selectedRules, onBack }) {
  const [expandedSections, setExpandedSections] = useState(new Set());

  const toggleSection = (sectionNumber) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionNumber)) newExpanded.delete(sectionNumber);
    else newExpanded.add(sectionNumber);
    setExpandedSections(newExpanded);
  };

  const overall = STATUS[results.overallStatus] || STATUS.ERROR;

  return (
    <div style={{
      backgroundColor: SURFACE,
      borderRadius: '10px',
      border: `1px solid ${BORDER}`,
      padding: '32px',
      boxShadow: '0 1px 3px rgba(20, 33, 61, 0.04)',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ color: NAVY, fontSize: '22px', fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
            Analysis Complete
          </h2>
          <p style={{ color: TEXT_MUTED, fontSize: '13px', margin: 0 }}>
            {results.totalSections} section{results.totalSections !== 1 ? 's' : ''} reviewed across {selectedRules.length} compliance rule{selectedRules.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: NAVY, fontSize: '36px', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}>
            {results.complianceScore}<span style={{ fontSize: '22px', color: TEXT_MUTED }}>%</span>
          </div>
          <div style={{
            display: 'inline-block',
            marginTop: '8px',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backgroundColor: overall.bg,
            color: overall.fg,
            borderRadius: '4px',
          }}>
            {overall.label}
          </div>
        </div>
      </div>

      {/* Score interpretation strip */}
      <div style={{
        backgroundColor: PAGE_BG_TINT,
        border: `1px solid ${BORDER}`,
        borderRadius: '8px',
        padding: '14px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <ScoreLegendItem color="#5C8E5C" range="90–100%" label="Excellent" />
          <ScoreLegendItem color="#C68A4F" range="70–89%" label="Needs review" />
          <ScoreLegendItem color="#B85450" range="<70%" label="Critical issues" />
        </div>
        <div style={{ fontSize: '11px', color: TEXT_MUTED }}>
          <span style={{ fontWeight: 600 }}>Deductions:</span>{' '}
          <span style={{ color: SEV.critical.fg }}>−25 critical</span>{' '}·{' '}
          <span style={{ color: SEV.warning.fg }}>−10 warning</span>{' '}·{' '}
          <span style={{ color: SEV.info.fg }}>−5 info</span>
        </div>
      </div>

      {/* Overall Summary */}
      <div style={{
        backgroundColor: overall.bg,
        border: `1px solid ${overall.border}`,
        borderRadius: '8px',
        padding: '16px 20px',
        marginBottom: '24px',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: overall.fg,
          marginBottom: '6px',
        }}>
          Overall Summary
        </div>
        <p style={{ color: NAVY, fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
          {results.summary}
        </p>
      </div>

      {/* Classification Breakdown */}
      {results.classificationBreakdown && Object.keys(results.classificationBreakdown).length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: TEXT_MUTED,
            marginBottom: '12px',
          }}>
            Document Classification
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            {Object.entries(results.classificationBreakdown).map(([type, count]) => {
              const Icon = CLASSIFICATION_ICON[type] || FileText;
              return (
                <div
                  key={type}
                  style={{
                    backgroundColor: PAGE_BG_TINT,
                    border: `1px solid ${BORDER}`,
                    borderRadius: '8px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    backgroundColor: '#E8F2F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color={CAP_BLUE} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', color: TEXT_MUTED, textTransform: 'capitalize', marginBottom: '2px' }}>
                      {type.toLowerCase().replace(/_/g, ' ')}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 500, color: NAVY, lineHeight: 1 }}>
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sections Analysis */}
      <div>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: TEXT_MUTED,
          marginBottom: '12px',
        }}>
          Section-by-Section Analysis
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {results.classifiedSections?.map((section) => {
            const analysis = results.sectionAnalyses?.[section.sectionNumber];
            if (!analysis) return null;

            const sectionStatus = STATUS[analysis.status] || STATUS.ERROR;
            const isExpanded = expandedSections.has(section.sectionNumber);
            const Icon = CLASSIFICATION_ICON[section.classification] || FileText;

            return (
              <div
                key={section.sectionNumber}
                style={{
                  backgroundColor: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderLeft: `3px solid ${sectionStatus.fg}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 150ms ease',
                }}
              >
                {/* Section header */}
                <div
                  style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'background-color 150ms ease',
                  }}
                  onClick={() => toggleSection(section.sectionNumber)}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = PAGE_BG_TINT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: '#E8F2F8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={15} color={CAP_BLUE} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>
                          Section {section.sectionNumber}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          backgroundColor: PAGE_BG_TINT,
                          color: TEXT_MUTED,
                        }}>
                          {section.classification.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: TEXT_MUTED }}>
                        Score: <span style={{ color: NAVY, fontWeight: 500 }}>{analysis.score}%</span>
                        {analysis.violations?.length > 0 && (
                          <> · <span style={{ color: sectionStatus.fg, fontWeight: 500 }}>{analysis.violations.length} violation{analysis.violations.length !== 1 ? 's' : ''}</span></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      backgroundColor: sectionStatus.bg,
                      color: sectionStatus.fg,
                    }}>
                      {sectionStatus.label}
                    </span>
                    {isExpanded ? <ChevronUp size={16} color={TEXT_MUTED} /> : <ChevronDown size={16} color={TEXT_MUTED} />}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${BORDER}`, padding: '18px', backgroundColor: PAGE_BG_TINT }}>

                    {/* Content preview */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_MUTED, marginBottom: '6px' }}>
                        Content Preview
                      </div>
                      <div style={{
                        backgroundColor: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: '6px',
                        padding: '12px 14px',
                        maxHeight: '160px',
                        overflowY: 'auto',
                      }}>
                        <p style={{ fontSize: '12.5px', color: TEXT_MUTED, margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                          {section.content.substring(0, 500)}{section.content.length > 500 && '…'}
                        </p>
                      </div>
                    </div>

                    {/* Analysis summary */}
                    {analysis.summary && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_MUTED, marginBottom: '6px' }}>
                          Analysis
                        </div>
                        <p style={{
                          fontSize: '13px',
                          color: NAVY,
                          margin: 0,
                          backgroundColor: SURFACE,
                          border: `1px solid ${BORDER}`,
                          borderRadius: '6px',
                          padding: '12px 14px',
                          lineHeight: 1.6,
                        }}>
                          {analysis.summary}
                        </p>
                      </div>
                    )}

                    {/* Violations */}
                    {analysis.violations && analysis.violations.length > 0 ? (
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_MUTED, marginBottom: '8px' }}>
                          Violations ({analysis.violations.length})
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {analysis.violations.map((violation, idx) => {
                            const sev = SEV[violation.severity] || SEV.info;
                            return (
                              <div
                                key={idx}
                                style={{
                                  backgroundColor: SURFACE,
                                  border: `1px solid ${BORDER}`,
                                  borderLeft: `3px solid ${sev.fg}`,
                                  borderRadius: '6px',
                                  padding: '12px 14px',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px', gap: '12px' }}>
                                  <span style={{ fontSize: '13px', fontWeight: 600, color: NAVY }}>
                                    {violation.ruleName}
                                  </span>
                                  <span style={{
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    padding: '2px 8px',
                                    borderRadius: '3px',
                                    backgroundColor: sev.bg,
                                    color: sev.fg,
                                    flexShrink: 0,
                                  }}>
                                    {violation.severity}
                                  </span>
                                </div>
                                <p style={{ fontSize: '13px', color: NAVY, margin: '0 0 8px', lineHeight: 1.5 }}>
                                  {violation.description}
                                </p>
                                {violation.excerpt && (
                                  <div style={{
                                    backgroundColor: PAGE_BG_TINT,
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: '4px',
                                    padding: '8px 10px',
                                    marginBottom: '8px',
                                  }}>
                                    <p style={{ fontSize: '12px', color: TEXT_MUTED, margin: 0, fontFamily: 'monospace', fontStyle: 'italic' }}>
                                      "{violation.excerpt}"
                                    </p>
                                  </div>
                                )}
                                <div style={{
                                  backgroundColor: '#EEF5EE',
                                  border: `1px solid #B5D1B5`,
                                  borderRadius: '4px',
                                  padding: '8px 10px',
                                }}>
                                  <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#5C8E5C', marginBottom: '2px' }}>
                                    Recommendation
                                  </div>
                                  <p style={{ fontSize: '12.5px', color: NAVY, margin: 0, lineHeight: 1.5 }}>
                                    {violation.recommendation}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        backgroundColor: '#EEF5EE',
                        border: `1px solid #B5D1B5`,
                        borderRadius: '6px',
                        padding: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}>
                        <CheckCircle size={18} color="#5C8E5C" />
                        <span style={{ fontSize: '13px', color: '#3D5F3D', fontWeight: 500 }}>
                          No violations in this section
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '28px', paddingTop: '24px', borderTop: `1px solid ${BORDER}` }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: 'transparent',
            color: NAVY,
            border: `1px solid ${BORDER}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 150ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = PAGE_BG_TINT; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <ArrowLeft size={14} />
          Analyze another document
        </button>
        <button
          onClick={() => alert('Export functionality coming soon')}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: CAP_BLUE,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 150ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = CAP_BLUE_DARK; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = CAP_BLUE; }}
        >
          <Download size={14} />
          Export detailed report
        </button>
      </div>
    </div>
  );
}

// Helper component
function ScoreLegendItem({ color, range, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color }} />
      <span style={{ fontSize: '11px', color: NAVY }}>
        <span style={{ fontWeight: 600 }}>{range}</span> <span style={{ color: TEXT_MUTED }}>{label}</span>
      </span>
    </div>
  );
}