import React, { useState } from 'react';
import { Building2, Database, Cloud, Users, Shield, LineChart, Briefcase } from 'lucide-react';

export default function OrgOperatingModel() {
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
      color: "bg-blue-600"
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
      color: "bg-purple-600"
    }
  };

  const lobs = [
    { id: "commercial", name: "Commercial", icon: Briefcase, color: "bg-emerald-600" },
    { id: "consumer", name: "Consumer", icon: Users, color: "bg-orange-600" },
    { id: "enterprise", name: "Enterprise Functions", icon: Building2, color: "bg-indigo-600" },
    { id: "wealth", name: "Wealth", icon: LineChart, color: "bg-amber-600" },
    { id: "digital", name: "Digital", icon: Shield, color: "bg-rose-600" }
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Organization Operating Model</h1>
        <p className="text-slate-600 mb-8">CDO, CTO & Lines of Business Structure</p>

        {/* Executive Layer */}
        <div className="flex gap-6 mb-12 justify-center">
          {/* CDO Box */}
          <div 
            className={`${roles.cdo.color} text-white rounded-lg shadow-lg p-6 w-80 cursor-pointer transform transition hover:scale-105`}
            onClick={() => setSelectedRole('cdo')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8" />
              <h2 className="text-xl font-bold">{roles.cdo.title}</h2>
            </div>
            <div className="text-sm space-y-1 opacity-90">
              {roles.cdo.responsibilities.slice(0, 3).map((resp, idx) => (
                <div key={idx}>• {resp}</div>
              ))}
              <div className="text-xs mt-2 opacity-75">Click for more details</div>
            </div>
          </div>

          {/* CTO Box */}
          <div 
            className={`${roles.cto.color} text-white rounded-lg shadow-lg p-6 w-80 cursor-pointer transform transition hover:scale-105`}
            onClick={() => setSelectedRole('cto')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-8 h-8" />
              <h2 className="text-xl font-bold">{roles.cto.title}</h2>
            </div>
            <div className="text-sm space-y-1 opacity-90">
              {roles.cto.responsibilities.slice(0, 3).map((resp, idx) => (
                <div key={idx}>• {resp}</div>
              ))}
              <div className="text-xs mt-2 opacity-75">Click for more details</div>
            </div>
          </div>
        </div>

        {/* Connection Lines Visualization */}
        <div className="flex justify-center mb-8">
          <svg width="600" height="100" className="overflow-visible">
            {/* Dotted lines from CDO to each LoB */}
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
            <text x="150" y="15" textAnchor="middle" className="text-xs fill-slate-600 font-semibold">
              CDO Governance
            </text>
          </svg>
        </div>

        {/* Lines of Business */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {lobs.map((lob) => {
            const Icon = lob.icon;
            return (
              <div key={lob.id} className={`${lob.color} text-white rounded-lg shadow-md p-4`}>
                <Icon className="w-6 h-6 mb-2" />
                <h3 className="font-bold text-sm mb-3">{lob.name}</h3>
                <div className="text-xs space-y-1 opacity-90">
                  <div className="font-semibold mb-1">Owns:</div>
                  <div>• Domain Data Products</div>
                  <div>• Business Capabilities</div>
                  <div>• Domain Expertise</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Governance Model */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Operating Model
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">CDO Responsibilities</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Sets enterprise data strategy and standards</li>
                <li>• Defines governance policies and frameworks</li>
                <li>• Provides enterprise data platforms</li>
                <li>• Acts as gatekeeper for data quality and compliance</li>
                <li>• Enables and oversees domain data products</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">LoB Responsibilities</h4>
              <ul className="text-sm text-slate-600 space-y-1">
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
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedRole(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl p-8 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {roles[selectedRole].title}
              </h3>
              <h4 className="font-semibold text-slate-700 mb-3">Key Responsibilities:</h4>
              <ul className="space-y-2 text-slate-600">
                {roles[selectedRole].responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedRole(null)}
                className="mt-6 w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 px-4 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}