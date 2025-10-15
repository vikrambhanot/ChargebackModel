import React, { useState } from 'react';
import { Building2, Database, Cloud, Users, Shield, LineChart, Briefcase } from 'lucide-react';
import './OperatingModelPage.css';

const OperatingModelPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = {
    cdo: {
      title: "Chief Data Officer (CDO)",
      responsibilities: [
        "Data Strategy & Vision",
        "Data Governance Framework",
        "Enterprise Data Assets",
        "Enterprise Data Platforms",
        "Data Standards & Policies",
        "Data Quality & Compliance"
      ],
      color: "#2563eb"
    },
    cto: {
      title: "Chief Technology Officer (CTO)",
      responsibilities: [
        "Cloud Infrastructure",
        "Data Center Operations",
        "Enterprise Tools & Systems",
        "Technology Standards",
        "Security Infrastructure",
        "DevOps & Platform Engineering"
      ],
      color: "#9333ea"
    }
  };

  const lobs = [
    { id: "commercial", name: "Commercial", icon: Briefcase, color: "#059669" },
    { id: "consumer", name: "Consumer", icon: Users, color: "#ea580c" },
    { id: "enterprise", name: "Enterprise Functions", icon: Building2, color: "#4f46e5" },
    { id: "wealth", name: "Wealth", icon: LineChart, color: "#d97706" },
    { id: "digital", name: "Digital", icon: Shield, color: "#e11d48" }
  ];

  return (
    <div className="operating-model-container">
      <div className="operating-model-content">
        <div className="om-header">
          <h1>Organization Operating Model</h1>
          <p>CDO, CTO & Lines of Business Structure</p>
        </div>

        {/* Executive Layer */}
        <div className="executive-layer">
          {/* CDO Box */}
          <div 
            className="executive-card"
            style={{ backgroundColor: roles.cdo.color }}
            onClick={() => setSelectedRole('cdo')}
          >
            <div className="executive-header">
              <Database size={32} color="white" />
              <h2>{roles.cdo.title}</h2>
            </div>
            <div className="executive-responsibilities">
              {roles.cdo.responsibilities.slice(0, 3).map((resp, idx) => (
                <div key={idx}>• {resp}</div>
              ))}
              <div className="click-hint">Click for more details</div>
            </div>
          </div>

          {/* CTO Box */}
          <div 
            className="executive-card"
            style={{ backgroundColor: roles.cto.color }}
            onClick={() => setSelectedRole('cto')}
          >
            <div className="executive-header">
              <Cloud size={32} color="white" />
              <h2>{roles.cto.title}</h2>
            </div>
            <div className="executive-responsibilities">
              {roles.cto.responsibilities.slice(0, 3).map((resp, idx) => (
                <div key={idx}>• {resp}</div>
              ))}
              <div className="click-hint">Click for more details</div>
            </div>
          </div>
        </div>

        {/* Connection Lines Visualization */}
        <div className="connection-lines">
          <svg width="600" height="100" className="lines-svg">
            {lobs.map((lob, idx) => {
              const startX = 150;
              const startY = 20;
              const endX = 50 + (idx * 110);
              const endY = 100;
              return (
                <line
                  key={lob.id}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
              );
            })}
            <text x="150" y="15" textAnchor="middle" className="lines-label">
              CDO Governance
            </text>
          </svg>
        </div>

        {/* Lines of Business */}
        <div className="lob-grid">
          {lobs.map((lob) => {
            const Icon = lob.icon;
            return (
              <div key={lob.id} className="lob-card" style={{ backgroundColor: lob.color }}>
                <Icon size={24} color="white" />
                <h3>{lob.name}</h3>
                <div className="lob-responsibilities">
                  <div className="lob-owns">Owns:</div>
                  <div>• Domain Data Products</div>
                  <div>• Business Capabilities</div>
                  <div>• Domain Expertise</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Governance Model */}
        <div className="governance-section">
          <h3 className="governance-title">
            <Shield size={20} color="#2563eb" />
            Operating Model
          </h3>
          <div className="governance-grid">
            <div className="governance-column">
              <h4>CDO Responsibilities</h4>
              <ul>
                <li>• Sets enterprise data strategy and standards</li>
                <li>• Defines governance policies and frameworks</li>
                <li>• Provides enterprise data platforms</li>
                <li>• Acts as gatekeeper for data quality and compliance</li>
                <li>• Enables and oversees domain data products</li>
              </ul>
            </div>
            <div className="governance-column">
              <h4>LoB Responsibilities</h4>
              <ul>
                <li>• Own and develop domain data products</li>
                <li>• Implement business-specific data solutions</li>
                <li>• Ensure compliance with CDO policies</li>
                <li>• Drive domain expertise and innovation</li>
                <li>• Collaborate with CDO on standards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedRole && (
          <div className="modal-overlay" onClick={() => setSelectedRole(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{roles[selectedRole].title}</h3>
              <h4>Key Responsibilities:</h4>
              <ul className="modal-list">
                {roles[selectedRole].responsibilities.map((resp, idx) => (
                  <li key={idx}>
                    <span className="checkmark">✓</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setSelectedRole(null)} className="modal-close">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperatingModelPage;