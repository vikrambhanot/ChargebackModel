// src/components/analysis/FINRAComplianceRules.jsx
import { CheckSquare, Square, Edit2, Save } from "lucide-react";
import { useState } from "react";

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select FINRA Compliance Rules
        </h2>
        <p className="text-gray-600">
          Choose which rules to check against. You can customize the guidelines for each rule.
        </p>
      </div>

      <div className="mb-4 flex justify-between items-center p-4 bg-blue-50 rounded-lg">
        <div>
          <span className="font-semibold text-blue-900">
            {selectedCount} of {rules.length} rules selected
          </span>
        </div>
        <button
          onClick={toggleAll}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          {rules.every(r => r.enabled) ? (
            <>
              <Square className="mr-2" size={20} />
              Deselect All
            </>
          ) : (
            <>
              <CheckSquare className="mr-2" size={20} />
              Select All
            </>
          )}
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`border-2 rounded-lg p-4 transition-all ${
              rule.enabled
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start flex-1">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className="mr-3 mt-1"
                >
                  {rule.enabled ? (
                    <CheckSquare className="text-blue-600" size={24} />
                  ) : (
                    <Square className="text-gray-400" size={24} />
                  )}
                </button>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{rule.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                      {rule.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        rule.severity === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {rule.severity === 'critical' ? 'Critical' : 'Warning'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => editingRule === rule.id ? saveEdit() : startEditing(rule)}
                className="ml-4 p-2 hover:bg-white rounded-lg transition-colors"
                title={editingRule === rule.id ? "Save" : "Edit guidelines"}
              >
                {editingRule === rule.id ? (
                  <Save className="text-green-600" size={20} />
                ) : (
                  <Edit2 className="text-gray-600" size={20} />
                )}
              </button>
            </div>

            <div className="ml-9">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Guidelines:</h4>
              {editingRule === rule.id ? (
                <textarea
                  value={editedGuidelines}
                  onChange={(e) => setEditedGuidelines(e.target.value)}
                  className="w-full p-3 border border-blue-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={6}
                />
              ) : (
                <div className="text-sm text-gray-600 whitespace-pre-line bg-white p-3 rounded border border-gray-200">
                  {rule.guidelines}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
        >
          Back to Preview
        </button>
        <button
          onClick={() => onProceed(rules.filter(r => r.enabled))}
          disabled={selectedCount === 0}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <CheckSquare className="mr-2" size={20} />
          Analyze Document ({selectedCount} rules)
        </button>
      </div>
    </div>
  );
}