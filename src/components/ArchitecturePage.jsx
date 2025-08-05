const ArchitecturePage = () => {
  return (
    <div className="architecture-container">
      <div className="architecture-header">
        <h2>Data Pipeline Architecture</h2>
        <p>End-to-end data flow from sources to business insights</p>
      </div>
      
      <div className="architecture-diagram">
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" style={{width: '100%', height: 'auto', maxWidth: '1200px'}}>
          {/* Background */}
          <rect width="1200" height="800" fill="#f8fafc"/>
          
          {/* Data Sources Layer */}
          <g id="data-sources">
            <rect x="50" y="80" width="200" height="520" fill="#e0f2fe" stroke="#0891b2" strokeWidth="2" rx="8"/>
            <text x="150" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#0891b2">
              DATA SOURCES
            </text>
            
            {/* Org Hierarchy */}
            <rect x="70" y="125" width="160" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="150" y="145" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Organizational Hierarchy
            </text>
            <text x="150" y="160" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              HR Systems, Active Directory
            </text>
            <text x="150" y="175" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Cost Centers, User Groups
            </text>
            
            {/* Financial Data */}
            <rect x="70" y="210" width="160" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="150" y="230" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Financial Data
            </text>
            <text x="150" y="245" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              ERP Systems, Budgets
            </text>
            <text x="150" y="260" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              GL Accounts, Approvals
            </text>
            
            {/* Usage Logs */}
            <rect x="70" y="295" width="160" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="150" y="315" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Platform Usage Logs
            </text>
            <text x="150" y="330" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Snowflake, AWS, Azure
            </text>
            <text x="150" y="345" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Query Logs, Resource Usage
            </text>
            
            {/* Billing Data */}
            <rect x="70" y="380" width="160" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="150" y="400" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Cloud Billing Data
            </text>
            <text x="150" y="415" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              AWS CUR, Azure Cost Mgmt
            </text>
            <text x="150" y="430" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Service Costs, Tagging
            </text>
            
            {/* Subscription Calculator */}
            <rect x="70" y="465" width="160" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="150" y="485" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Subscription Calculator
            </text>
            <text x="150" y="500" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Rate Cards, Allocation Rules
            </text>
            <text x="150" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Pricing Models, Cost Pools
            </text>
          </g>
          
          {/* Raw Layer */}
          <g id="raw-layer">
            <rect x="320" y="80" width="180" height="520" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8"/>
            <text x="410" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#f59e0b">
              RAW LAYER
            </text>
            
            {/* Data Lake */}
            <rect x="340" y="130" width="140" height="60" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="410" y="150" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Data Lake Storage
            </text>
            <text x="410" y="165" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              S3/ADLS/GCS
            </text>
            <text x="410" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Raw JSON/CSV/Parquet
            </text>
            
            {/* Streaming */}
            <rect x="340" y="210" width="140" height="60" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="410" y="230" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Real-time Streams
            </text>
            <text x="410" y="245" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Kafka/EventHub/Kinesis
            </text>
            <text x="410" y="260" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Usage Events
            </text>
            
            {/* APIs */}
            <rect x="340" y="290" width="140" height="60" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="410" y="310" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              API Connectors
            </text>
            <text x="410" y="325" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              REST/GraphQL APIs
            </text>
            <text x="410" y="340" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              Hourly Sync
            </text>
            
            {/* Quality Checks */}
            <rect x="340" y="370" width="140" height="100" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" rx="4"/>
            <text x="410" y="390" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#dc2626">
              Initial Quality Checks
            </text>
            <text x="410" y="405" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Schema validation
            </text>
            <text x="410" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Completeness checks
            </text>
            <text x="410" y="435" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Duplicate detection
            </text>
            <text x="410" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Data freshness alerts
            </text>
          </g>
          
          {/* Sanitized Layer */}
          <g id="sanitized-layer">
            <rect x="570" y="80" width="180" height="520" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" rx="8"/>
            <text x="660" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#10b981">
              SANITIZED LAYER
            </text>
            
            {/* Cleansing */}
            <rect x="590" y="130" width="140" height="80" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="660" y="150" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Data Cleansing
            </text>
            <text x="660" y="165" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Remove duplicates
            </text>
            <text x="660" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Standardize formats
            </text>
            <text x="660" y="195" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Fix data types
            </text>
            
            {/* Enrichment */}
            <rect x="590" y="230" width="140" height="80" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="660" y="250" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Data Enrichment
            </text>
            <text x="660" y="265" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Add metadata
            </text>
            <text x="660" y="280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Lookup references
            </text>
            <text x="660" y="295" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Calculate derived fields
            </text>
            
            {/* Validation */}
            <rect x="590" y="330" width="140" height="80" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="660" y="350" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Business Validation
            </text>
            <text x="660" y="365" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Org hierarchy checks
            </text>
            <text x="660" y="380" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Cost center validation
            </text>
            <text x="660" y="395" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Budget reconciliation
            </text>
            
            {/* Lineage */}
            <rect x="590" y="430" width="140" height="80" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="1" rx="4"/>
            <text x="660" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#1e40af">
              Data Lineage
            </text>
            <text x="660" y="465" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Source tracking
            </text>
            <text x="660" y="480" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Transformation history
            </text>
            <text x="660" y="495" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Audit trail
            </text>
          </g>
          
          {/* Conformed Layer */}
          <g id="conformed-layer">
            <rect x="820" y="80" width="180" height="520" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="2" rx="8"/>
            <text x="910" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#8b5cf6">
              CONFORMED LAYER
            </text>
            
            {/* Dimensional Model */}
            <rect x="840" y="130" width="140" height="100" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="910" y="150" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Dimensional Model
            </text>
            <text x="910" y="165" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Organization Dimension
            </text>
            <text x="910" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Platform Dimension
            </text>
            <text x="910" y="195" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • User Persona Dimension
            </text>
            <text x="910" y="210" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Cost Facts
            </text>
            
            {/* Allocation Engine */}
            <rect x="840" y="250" width="140" height="100" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="910" y="270" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Cost Allocation Engine
            </text>
            <text x="910" y="285" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Usage-based allocation
            </text>
            <text x="910" y="300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Subscription modeling
            </text>
            <text x="910" y="315" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Shared cost distribution
            </text>
            <text x="910" y="330" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Business rules engine
            </text>
            
            {/* Aggregations */}
            <rect x="840" y="370" width="140" height="100" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="910" y="390" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#334155">
              Pre-Aggregated Views
            </text>
            <text x="910" y="405" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Daily/Monthly rollups
            </text>
            <text x="910" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Org hierarchy summaries
            </text>
            <text x="910" y="435" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Platform comparisons
            </text>
            <text x="910" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">
              • Persona analytics
            </text>
          </g>
          
          {/* Reporting Layer */}
          <g id="reporting-layer">
            <rect x="1070" y="80" width="120" height="520" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" rx="8"/>
            <text x="1130" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#ef4444">
              REPORTING
            </text>
            
            {/* Dashboard */}
            <rect x="1085" y="130" width="90" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="1130" y="150" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              Interactive
            </text>
            <text x="1130" y="165" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              Dashboard
            </text>
            <text x="1130" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#64748b">
              React UI
            </text>
            
            {/* APIs */}
            <rect x="1085" y="220" width="90" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="1130" y="240" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              Self-Service
            </text>
            <text x="1130" y="255" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              APIs
            </text>
            <text x="1130" y="270" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#64748b">
              REST/GraphQL
            </text>
            
            {/* Reports */}
            <rect x="1085" y="310" width="90" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="1130" y="330" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              Scheduled
            </text>
            <text x="1130" y="345" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              Reports
            </text>
            <text x="1130" y="360" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#64748b">
              PDF/Excel
            </text>
            
            {/* Alerts */}
            <rect x="1085" y="400" width="90" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4"/>
            <text x="1130" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              Smart Alerts
            </text>
            <text x="1130" y="435" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#334155">
              & Insights
            </text>
            <text x="1130" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#64748b">
              AI-Powered
            </text>
          </g>
          
          {/* Data Flow Arrows */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
            </marker>
          </defs>
          
          {/* Source to Raw */}
          <line x1="250" y1="160" x2="320" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="250" y1="245" x2="320" y2="240" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="250" y1="330" x2="320" y2="320" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="250" y1="415" x2="320" y2="400" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="250" y1="500" x2="320" y2="480" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          
          {/* Raw to Sanitized */}
          <line x1="500" y1="340" x2="570" y2="340" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          {/* Sanitized to Conformed */}
          <line x1="750" y1="340" x2="820" y2="340" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          {/* Conformed to Reporting */}
          <line x1="1000" y1="340" x2="1070" y2="340" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          {/* Process Labels */}
          <text x="285" y="635" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#64748b">
            INGEST
          </text>
          <text x="535" y="635" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#64748b">
            CLEANSE
          </text>
          <text x="785" y="635" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#64748b">
            TRANSFORM
          </text>
          <text x="1035" y="635" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#64748b">
            SERVE
          </text>
          
          {/* Processing Frequency */}
          <rect x="50" y="720" width="1140" height="60" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" rx="4"/>
          <text x="600" y="740" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#334155">
            Processing Frequency & SLAs
          </text>
          <text x="150" y="760" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#64748b">
            Real-time APIs: &lt;1min
          </text>
          <text x="410" y="760" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#64748b">
            Quality Checks: 5min
          </text>
          <text x="660" y="760" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#64748b">
            Business Rules: 15min
          </text>
          <text x="910" y="760" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#64748b">
            Cost Allocation: 30min
          </text>
          <text x="1130" y="760" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#64748b">
            Dashboard: Real-time
          </text>
        </svg>
      </div>
      
      <div className="architecture-details">
        <div className="architecture-grid">
          <div className="architecture-item">
            <h4>Data Sources Layer</h4>
            <p>Five critical data pillars feeding the chargeback system with organizational hierarchy, financial data, usage logs, billing data, and cost allocation rules.</p>
          </div>
          <div className="architecture-item">
            <h4>Raw Layer (INGEST)</h4>
            <p>Cloud-native data lake with real-time streaming, API connectors, and initial quality checks for schema validation and data freshness.</p>
          </div>
          <div className="architecture-item">
            <h4>Sanitized Layer (CLEANSE)</h4>
            <p>Data cleansing, enrichment, business validation, and complete data lineage tracking with audit trails for governance.</p>
          </div>
          <div className="architecture-item">
            <h4>Conformed Layer (TRANSFORM)</h4>
            <p>Dimensional modeling, cost allocation engine, and pre-aggregated views optimized for multi-dimensional analytics and reporting.</p>
          </div>
          <div className="architecture-item">
            <h4>Reporting Layer (SERVE)</h4>
            <p>Interactive dashboards, self-service APIs, scheduled reports, and AI-powered insights delivered through multiple channels.</p>
          </div>
          <div className="architecture-item">
            <h4>Processing SLAs</h4>
            <p>Real-time APIs (&lt;1min), quality checks (5min), business rules (15min), cost allocation (30min), dashboard updates (real-time).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;