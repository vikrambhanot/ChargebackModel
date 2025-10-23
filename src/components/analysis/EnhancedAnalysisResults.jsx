// src/components/analysis/EnhancedAnalysisResults.jsx
import { useState } from 'react';
import { CheckCircle,  ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function EnhancedAnalysisResults({ results, selectedRules, onBack }) {
  const [expandedSections, setExpandedSections] = useState(new Set());

  const toggleSection = (sectionNumber) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionNumber)) {
      newExpanded.delete(sectionNumber);
    } else {
      newExpanded.add(sectionNumber);
    }
    setExpandedSections(newExpanded);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'PASS':
        return {
          icon: 'text-green-500',
          badge: 'bg-green-100 text-green-800 border-green-300',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'FAIL':
        return {
          icon: 'text-red-500',
          badge: 'bg-red-100 text-red-800 border-red-300',
          bg: 'bg-red-50',
          border: 'border-red-200',
        };
      case 'NEEDS_REVIEW':
        return {
          icon: 'text-yellow-500',
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
        };
      default:
        return {
          icon: 'text-gray-500',
          badge: 'bg-gray-100 text-gray-800 border-gray-300',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
        };
    }
  };

  const getClassificationIcon = (classification) => {
    const icons = {
      EMAIL: '📧',
      MARKETING: '📢',
      GIFT_CARD: '🎁',
      DISCLOSURE: '⚖️',
      RESEARCH: '📊',
      ACCOUNT_STATEMENT: '📋',
      EDUCATIONAL: '📚',
      CORRESPONDENCE: '✉️',
      OTHER: '📄',
    };
    return icons[classification] || '📄';
  };

  const overallClasses = getStatusClasses(results.overallStatus);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CheckCircle className={`${overallClasses.icon} mr-3`} size={32} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Enhanced Compliance Analysis</h2>
            <p className="text-gray-600">
              {results.totalSections} sections analyzed across {selectedRules.length} FINRA rules
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{results.complianceScore}%</div>
          <div className={`text-sm font-semibold px-3 py-1 rounded-full border ${overallClasses.badge}`}>
            {results.overallStatus.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* NEW: How to Interpret Results Section - Same as Simple Mode */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-4">
            <Sparkles className="text-blue-600" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              📊 How to Interpret Your Score
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-semibold text-green-800">90-100%</span>
                </div>
                <p className="text-gray-700 text-xs">
                  <strong>Excellent</strong> - Document is compliant or has only minor issues
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="font-semibold text-yellow-800">70-89%</span>
                </div>
                <p className="text-gray-700 text-xs">
                  <strong>Needs Review</strong> - Some violations require attention
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-red-200">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-semibold text-red-800">Below 70%</span>
                </div>
                <p className="text-gray-700 text-xs">
                  <strong>Critical Issues</strong> - Immediate action required
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-gray-600">
                <strong>Scoring:</strong> Each violation deducts points based on severity:
                <span className="ml-2 text-red-600 font-semibold">Critical (-25 pts)</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-600 font-semibold">Warning (-10 pts)</span>
                <span className="mx-2">•</span>
                <span className="text-blue-600 font-semibold">Info (-5 pts)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={`p-4 ${overallClasses.bg} ${overallClasses.border} border rounded-lg mb-6`}>
        <h3 className="font-semibold text-gray-900 mb-2">Overall Summary</h3>
        <p className="text-gray-800">{results.summary}</p>
      </div>

      {/* Classification Breakdown */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Document Classification</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(results.classificationBreakdown || {}).map(([type, count]) => (
            <div key={type} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-1">{getClassificationIcon(type)}</div>
                  <div className="text-xs text-gray-600 capitalize">
                    {type.toLowerCase().replace('_', ' ')}
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections Analysis */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-lg mb-3">Section-by-Section Analysis</h3>
        
        {results.classifiedSections?.map((section) => {
          const analysis = results.sectionAnalyses?.[section.sectionNumber];
          if (!analysis) return null;

          const sectionClasses = getStatusClasses(analysis.status);
          const isExpanded = expandedSections.has(section.sectionNumber);

          return (
            <div
              key={section.sectionNumber}
              className={`border-l-4 ${sectionClasses.border} bg-white rounded-r-lg shadow-md overflow-hidden`}
            >
              {/* Section Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.sectionNumber)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="text-2xl mr-3">
                      {getClassificationIcon(section.classification)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">Section {section.sectionNumber}</span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${sectionClasses.badge}`}>
                          {section.classification.replace('_', ' ')}
                        </span>
                        {section.confidenceScore && (
                          <span className="text-xs text-gray-500">
                            {Math.round(section.confidenceScore * 100)}% confidence
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        Score: {analysis.score}% • {analysis.violations?.length || 0} violations
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${sectionClasses.badge}`}>
                      {analysis.status}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  {/* Section Content Preview */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 text-sm mb-2">Content Preview:</h4>
                    <div className="bg-white p-3 rounded border border-gray-200 max-h-40 overflow-y-auto">
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {section.content.substring(0, 500)}
                        {section.content.length > 500 && '...'}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  {analysis.summary && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">Analysis Summary:</h4>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                        {analysis.summary}
                      </p>
                    </div>
                  )}

                  {/* Violations */}
                  {analysis.violations && analysis.violations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">
                        Violations ({analysis.violations.length}):
                      </h4>
                      <div className="space-y-3">
                        {analysis.violations.map((violation, idx) => {
                          const severityColors = {
                            critical: 'border-red-500 bg-red-50',
                            warning: 'border-yellow-500 bg-yellow-50',
                            info: 'border-blue-500 bg-blue-50',
                          };
                          const severityBadge = {
                            critical: 'bg-red-200 text-red-800',
                            warning: 'bg-yellow-200 text-yellow-800',
                            info: 'bg-blue-200 text-blue-800',
                          };

                          return (
                            <div
                              key={idx}
                              className={`border-l-4 ${severityColors[violation.severity]} p-3 rounded-r`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-semibold text-gray-900 text-sm">
                                  {violation.ruleName}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${severityBadge[violation.severity]}`}
                                >
                                  {violation.severity.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{violation.description}</p>
                              {violation.excerpt && (
                                <div className="bg-white p-2 rounded border border-gray-200 mb-2">
                                  <p className="text-xs font-mono text-gray-600">"{violation.excerpt}"</p>
                                </div>
                              )}
                              <div className="bg-white p-2 rounded border border-green-200">
                                <p className="text-xs font-semibold text-green-800">Recommendation:</p>
                                <p className="text-xs text-green-700">{violation.recommendation}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {analysis.violations?.length === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
                      <CheckCircle className="text-green-500 mx-auto mb-2" size={24} />
                      <p className="text-sm text-green-800 font-semibold">No violations in this section</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
        >
          Analyze Another Document
        </button>
        <button
          onClick={() => alert('Export functionality coming soon!')}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Export Detailed Report
        </button>
      </div>
    </div>
  );
}