import { CheckCircle, AlertTriangle, XCircle, FileText, Download, RotateCcw } from 'lucide-react';
import './AnnuityReport.css';

const AnnuityReport = ({ assessment, productName, onStartNew }) => {
  const {
    score,
    customerProfile,
    investmentObjectives,
    productUnderstanding,
    finraAnalysis,
    recommendation,
    riskFactors
  } = assessment;

  const getSuitabilityLevel = (score) => {
    if (score >= 80) return { level: 'SUITABLE', color: 'green', icon: CheckCircle };
    if (score >= 60) return { level: 'NEEDS REVIEW', color: 'yellow', icon: AlertTriangle };
    return { level: 'NOT SUITABLE', color: 'red', icon: XCircle };
  };

  const suitability = getSuitabilityLevel(score);
  const SuitabilityIcon = suitability.icon;

  const renderFINRASection = (rule, details) => (
    <div className="finra-rule-section">
      <div className="rule-header">
        <h4>{rule.title}</h4>
        <span className={`rule-status status-${details.status}`}>
          {details.status === 'compliant' ? '✅' : details.status === 'review' ? '⚠️' : '❌'}
          {details.status === 'compliant' ? 'Compliant' : details.status === 'review' ? 'Needs Review' : 'Concern'}
        </span>
      </div>
      <p className="rule-description">{rule.description}</p>
      <div className="rule-analysis">
        <h5>Analysis:</h5>
        <ul>
          {details.points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="annuity-report-container">
      <div className="report-header">
        <h1>Annuity Suitability Assessment Report</h1>
        <p className="product-name">{productName}</p>
      </div>

      {/* Overall Suitability Score */}
      <div className={`suitability-score score-${suitability.color}`}>
        <div className="score-icon">
          <SuitabilityIcon size={48} />
        </div>
        <div className="score-details">
          <div className="score-value">{score}/100</div>
          <div className="score-label">{suitability.level}</div>
          <p className="score-description">
            This score reflects how well the {productName} aligns with your financial situation, goals, and risk tolerance.
          </p>
        </div>
      </div>

      {/* Customer Profile Summary */}
      <div className="report-section">
        <h2>Customer Profile</h2>
        <div className="profile-grid">
          <div className="profile-item">
            <strong>Age:</strong>
            <span>{customerProfile.age || 'Not provided'}</span>
          </div>
          <div className="profile-item">
            <strong>Employment Status:</strong>
            <span>{customerProfile.employmentStatus || 'Not provided'}</span>
          </div>
          <div className="profile-item">
            <strong>Primary Income:</strong>
            <span>{customerProfile.incomeSource || 'Not provided'}</span>
          </div>
          <div className="profile-item">
            <strong>Emergency Fund:</strong>
            <span>{customerProfile.emergencyFund || 'Not provided'}</span>
          </div>
        </div>
      </div>

      {/* Investment Objectives */}
      <div className="report-section">
        <h2>Investment Objectives</h2>
        <div className="objectives-grid">
          <div className="objective-item">
            <strong>Primary Goal:</strong>
            <span>{investmentObjectives.goal || 'Not provided'}</span>
          </div>
          <div className="objective-item">
            <strong>Time Horizon:</strong>
            <span>{investmentObjectives.timeHorizon || 'Not provided'}</span>
          </div>
          <div className="objective-item">
            <strong>Risk Tolerance:</strong>
            <span>{investmentObjectives.riskTolerance || 'Not provided'}</span>
          </div>
        </div>
      </div>

      {/* Product Understanding */}
      <div className="report-section">
        <h2>Product Understanding</h2>
        <div className="understanding-grid">
          <div className="understanding-item">
            <strong>Previous Experience:</strong>
            <span>{productUnderstanding.experience || 'None mentioned'}</span>
          </div>
          <div className="understanding-item">
            <strong>Surrender Period Awareness:</strong>
            <span>{productUnderstanding.surrenderAwareness || 'Not confirmed'}</span>
          </div>
          {productUnderstanding.marketRiskAwareness && (
            <div className="understanding-item">
              <strong>Market Risk Awareness:</strong>
              <span>{productUnderstanding.marketRiskAwareness}</span>
            </div>
          )}
        </div>
      </div>

      {/* FINRA Compliance Analysis - THE KEY EDUCATIONAL SECTION */}
      <div className="report-section finra-section">
        <h2>📋 FINRA Compliance Analysis</h2>
        <div className="finra-intro">
          <p>
            <strong>Why FINRA Rules Matter:</strong> As financial professionals, we're required to ensure any annuity 
            recommendation is suitable for your specific situation. Here's how your profile aligns with FINRA requirements:
          </p>
        </div>

        {renderFINRASection(
          {
            title: 'FINRA Rule 2111 (Suitability Obligation)',
            description: 'Requires that recommendations be suitable based on customer age, financial situation, investment objectives, and risk tolerance.'
          },
          finraAnalysis.rule2111 || {
            status: 'compliant',
            points: [
              'Customer age and time horizon appropriate for product features',
              'Investment objectives align with annuity characteristics',
              'Risk tolerance matches product risk profile'
            ]
          }
        )}

        {renderFINRASection(
          {
            title: 'FINRA Rule 2330 (Annuity Transactions)',
            description: 'Specifically addresses suitability for deferred variable annuities, including surrender period considerations and customer understanding.'
          },
          finraAnalysis.rule2330 || {
            status: 'compliant',
            points: [
              'Surrender period reasonable given customer age and timeline',
              'Liquidity needs assessed and can be met with existing resources',
              'Customer demonstrates adequate understanding of product features'
            ]
          }
        )}

        {renderFINRASection(
          {
            title: 'Regulation Best Interest (Reg BI)',
            description: 'Requires broker-dealers to act in the best interest of retail customers when making recommendations.'
          },
          finraAnalysis.regBI || {
            status: 'compliant',
            points: [
              'Product features match stated investment goals',
              'Fees and costs will be fully disclosed',
              'No less expensive alternatives appear better suited'
            ]
          }
        )}
      </div>

      {/* Risk Factors */}
      {riskFactors && riskFactors.length > 0 && (
        <div className="report-section risk-factors">
          <h2>⚠️ Considerations</h2>
          <ul>
            {riskFactors.map((risk, idx) => (
              <li key={idx}>{risk}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      <div className={`report-section recommendation recommendation-${suitability.color}`}>
        <h2>Final Recommendation</h2>
        <div className="recommendation-content">
          <p className="recommendation-text">{recommendation.summary}</p>
          
          {recommendation.nextSteps && recommendation.nextSteps.length > 0 && (
            <div className="next-steps">
              <h3>Next Steps:</h3>
              <ol>
                {recommendation.nextSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="disclaimer">
            <p>
              <strong>Note:</strong> This AI assessment supports, but does not replace, advisor suitability 
              obligations under FINRA rules. Final suitability determination must be made by a registered representative 
              with consideration of all relevant factors.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="report-actions">
        <button className="action-btn btn-secondary" onClick={() => window.print()}>
          <FileText size={18} />
          Print Report
        </button>
        <button className="action-btn btn-secondary">
          <Download size={18} />
          Download PDF
        </button>
        <button className="action-btn btn-primary" onClick={onStartNew}>
          <RotateCcw size={18} />
          Start New Assessment
        </button>
      </div>
    </div>
  );
};

export default AnnuityReport;