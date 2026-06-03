// src/components/analysis/FINRAComplianceRules.jsx
import { CheckSquare, Square, Edit2, Save, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

// Capgemini palette
const NAVY = '#14213D';
const TEXT_MUTED = '#5C6B82';
const CAP_BLUE = '#0070AD';
const CAP_BLUE_DARK = '#005A8C';
const PAGE_BG_TINT = '#F0F4F8';
const SURFACE = '#FFFFFF';
const BORDER = '#D8E1EA';
const BORDER_ACTIVE = '#0070AD';

// Muted severity
const SEV_CRITICAL = { fg: '#B85450', bg: '#FDF1F0' };
const SEV_WARNING = { fg: '#C68A4F', bg: '#FDF6EE' };

const DEFAULT_FINRA_RULES = [
  {
    id: "rule-2210",
    name: "Communications with Public (Rule 2210)",
    category: "Advertising",
    enabled: true,
    severity: "critical",
    guidelines: `• No false, exaggerated, or unwarranted claims
- Fair and balanced presentation of risks and benefits
- Include all required disclosures
- No predictions or projections of performance
- Must include member firm name
- Prohibition on misleading communications`
  },
  {
    id: "rule-2090",
    name: "Know Your Customer (Rule 2090)",
    category: "Suitability",
    enabled: true,
    severity: "critical",
    guidelines: `• Reasonable basis for recommendations
- Customer-specific suitability analysis
- Quantitative suitability assessment
- Documentation of customer investment profile`
  },
  {
    id: "rule-3110",
    name: "Supervision Requirements (Rule 3110)",
    category: "Supervision",
    enabled: true,
    severity: "warning",
    guidelines: `• Adequate supervisory procedures in place
- Review and approval of correspondence
- Internal compliance reviews
- Documentation of supervisory activities`
  },
  {
    id: "rule-4511",
    name: "Books and Records (Rule 4511)",
    category: "Records",
    enabled: true,
    severity: "warning",
    guidelines: `• Maintain all required records
- Comply with retention period requirements
- Ensure records are readily accessible
- Proper format and organization`
  },
  {
    id: "rule-2111",
    name: "Suitability (Rule 2111)",
    category: "Investment Recommendations",
    enabled: true,
    severity: "critical",
    guidelines: `• Reasonable basis suitability
- Customer-specific suitability
- Quantitative suitability
- Documentation requirements for recommendations`
  }
];

export default function FINRAComplianceRules({ onProceed, onBack }) {
  const [rules, setRules] = useState(DEFAULT_FINRA_RULES);
  const [editingRule, setEditingRule] = useState(null);
  const [editedGuidelines, setEditedGuidelines] = useState("");

  const toggleRule = (ruleId) => {
    setRules(rules.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const toggleAll = () => {
    const allEnabled = rules.every(r => r.enabled);
    setRules(rules.map(rule => ({ ...rule, enabled: !allEnabled })));
  };

  const startEditing = (rule) => {
    setEditingRule(rule.id);
    setEditedGuidelines(rule.guidelines);
  };

  const saveEdit = () => {
    setRules(rules.map(rule =>
      rule.id === editingRule ? { ...rule, guidelines: editedGuidelines } : rule
    ));
    setEditingRule(null);
  };

  const selectedCount = rules.filter(r => r.enabled).length;

  return (
    <div style={{
      backgroundColor: SURFACE,
      borderRadius: '10px',
      border: `1px solid ${BORDER}`,
      padding: '32px',
      boxShadow: '0 1px 3px rgba(20, 33, 61, 0.04)',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: NAVY, fontSize: '22px', fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
          Select Compliance Rules
        </h2>
        <p style={{ color: TEXT_MUTED, fontSize: '14px', margin: 0 }}>
          Choose which rules to apply. You can customize the guidelines for each rule.
        </p>
      </div>

      {/* Selection bar */}
      <div style={{
        backgroundColor: PAGE_BG_TINT,
        border: `1px solid ${BORDER}`,
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: '13px', color: NAVY, fontWeight: 500 }}>
          <span style={{ color: CAP_BLUE, fontWeight: 600 }}>{selectedCount}</span> of {rules.length} rules selected
        </div>
        <button
          onClick={toggleAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: CAP_BLUE,
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {rules.every(r => r.enabled) ? <Square size={14} /> : <CheckSquare size={14} />}
          {rules.every(r => r.enabled) ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      {/* Rules list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {rules.map((rule) => (
          <div
            key={rule.id}
            style={{
              border: `1px solid ${rule.enabled ? BORDER_ACTIVE : BORDER}`,
              backgroundColor: rule.enabled ? '#F8FBFD' : SURFACE,
              borderRadius: '8px',
              padding: '16px',
              transition: 'all 150ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                <button
                  onClick={() => toggleRule(rule.id)}
                  style={{ marginRight: '12px', marginTop: '2px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  {rule.enabled ? (
                    <CheckSquare size={20} color={CAP_BLUE} />
                  ) : (
                    <Square size={20} color="#A3B0C2" />
                  )}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ color: NAVY, fontSize: '14px', fontWeight: 600, margin: '0 0 6px' }}>
                    {rule.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                      {rule.category}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      backgroundColor: rule.severity === 'critical' ? SEV_CRITICAL.bg : SEV_WARNING.bg,
                      color: rule.severity === 'critical' ? SEV_CRITICAL.fg : SEV_WARNING.fg,
                    }}>
                      {rule.severity === 'critical' ? 'Critical' : 'Warning'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => editingRule === rule.id ? saveEdit() : startEditing(rule)}
                style={{
                  marginLeft: '12px',
                  padding: '6px',
                  background: 'none',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  color: editingRule === rule.id ? '#5C8E5C' : TEXT_MUTED,
                }}
                title={editingRule === rule.id ? "Save" : "Edit guidelines"}
              >
                {editingRule === rule.id ? <Save size={14} /> : <Edit2 size={14} />}
              </button>
            </div>

            <div style={{ marginLeft: '32px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: TEXT_MUTED,
                marginBottom: '6px',
              }}>
                Guidelines
              </div>
              {editingRule === rule.id ? (
                <textarea
                  value={editedGuidelines}
                  onChange={(e) => setEditedGuidelines(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${BORDER_ACTIVE}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    color: NAVY,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  rows={6}
                />
              ) : (
                <div style={{
                  fontSize: '12.5px',
                  color: TEXT_MUTED,
                  whiteSpace: 'pre-line',
                  backgroundColor: PAGE_BG_TINT,
                  padding: '12px 14px',
                  borderRadius: '6px',
                  lineHeight: 1.6,
                }}>
                  {rule.guidelines}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px' }}>
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
          Back to Preview
        </button>
        <button
          onClick={() => onProceed(rules.filter(r => r.enabled))}
          disabled={selectedCount === 0}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: selectedCount === 0 ? '#C5CFDB' : CAP_BLUE,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'background-color 150ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => { if (selectedCount > 0) e.currentTarget.style.backgroundColor = CAP_BLUE_DARK; }}
          onMouseLeave={(e) => { if (selectedCount > 0) e.currentTarget.style.backgroundColor = CAP_BLUE; }}
        >
          <Shield size={14} />
          Analyze ({selectedCount} rules)
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}