import { Activity, Building2, Cloud, DollarSign, Target } from 'lucide-react';

const OverviewPage = () => {
  return (
    <div className="slides-container">
      <div className="slide-navigation">
        <h2>Enterprise Chargeback Solution</h2>
        <p>Comprehensive overview and business case</p>
      </div>
      
      <div className="slides-content">
        {/* Slide 1 */}
        <section className="slide">
          <h3>The Challenge: Complex Cloud Costs & Manual Chargeback</h3>
          
          <div className="slide-two-column">
            <div className="slide-column">
              <h4>Multi-Dimensional Cost Complexity</h4>
              <div className="cost-category">
                <h5>Compute Costs</h5>
                <ul>
                  <li>On-demand instances with variable pricing</li>
                  <li>Auto-scaling groups based on workload demands</li>
                  <li>Serverless functions charged per execution</li>
                  <li>Reserved vs. spot pricing optimization</li>
                </ul>
              </div>
              
              <div className="cost-category">
                <h5>Storage Costs</h5>
                <ul>
                  <li>Multiple storage tiers (hot, warm, cold, archive)</li>
                  <li>Data transfer costs between regions</li>
                  <li>Backup and snapshot storage with retention</li>
                  <li>Cross-region replication for DR</li>
                </ul>
              </div>
              
              <div className="cost-category">
                <h5>Data Platform Services</h5>
                <ul>
                  <li><strong>Snowflake:</strong> Per-second compute billing with credit consumption</li>
                  <li><strong>AWS Services:</strong> Complex pricing across 200+ services</li>
                  <li><strong>Azure Analytics:</strong> Pay-as-you-go vs. committed capacity</li>
                  <li><strong>Databricks:</strong> DBU consumption varying by workload</li>
                </ul>
              </div>
            </div>
            
            <div className="slide-column">
              <h4>Hidden & Ancillary Charges</h4>
              <div className="cost-category">
                <h5>Network & Transfer Costs</h5>
                <ul>
                  <li><strong>Data Egress Fees:</strong> $0.09-$0.15 per GB</li>
                  <li><strong>Cross-AZ Transfers:</strong> Data movement costs</li>
                  <li><strong>API Call Charges:</strong> Per-request pricing</li>
                  <li><strong>VPN & NAT Gateways:</strong> Network infrastructure</li>
                </ul>
              </div>
              
              <div className="cost-category">
                <h5>High Availability & DR</h5>
                <ul>
                  <li>Multi-region deployments and load balancers</li>
                  <li>Backup storage and replication costs</li>
                  <li>Standby environments and failover systems</li>
                  <li>Security services and encryption</li>
                </ul>
              </div>
              
              <div className="challenge-box">
                <h5>The Manual Chargeback Nightmare</h5>
                <ul>
                  <li><strong>Spreadsheet Hell:</strong> Manual allocation across cost centers</li>
                  <li><strong>Delayed Reporting:</strong> 2-3 weeks for monthly reports</li>
                  <li><strong>Inaccurate Attribution:</strong> Arbitrary cost divisions</li>
                  <li><strong>No Real-Time Visibility:</strong> Operating blind without feedback</li>
                  <li><strong>Resource Waste:</strong> No accountability = over-provisioning</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="solution-highlight">
            <h4>The Solution: Automated Chargeback as a Data Product</h4>
            <div className="solution-grid">
              <div className="solution-item">
                <h5>Data Quality & Governance</h5>
                <p>Source validation, lineage tracking, master data management, and complete audit trails</p>
              </div>
              <div className="solution-item">
                <h5>Automated Pipeline</h5>
                <p>Real-time ingestion, intelligent attribution, business rules engine, and exception handling</p>
              </div>
              <div className="solution-item">
                <h5>Multi-Dimensional Analytics</h5>
                <p>Organizational hierarchy, technology platforms, user personas, and service types</p>
              </div>
              <div className="solution-item">
                <h5>Business Impact</h5>
                <p><strong>80% effort reduction</strong>, real-time visibility, accurate attribution, self-service capability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2 */}
        <section className="slide">
          <h3>Essential Data Sources - Foundation of the Chargeback Data Product</h3>
          
          <div className="data-sources-grid">
            <div className="data-source-card">
              <div className="data-source-header">
                <Building2 size={24} color="#3b82f6" />
                <h4>Organizational Hierarchy Data</h4>
              </div>
              <p className="data-source-purpose"><strong>Purpose:</strong> The structural foundation that defines "who owns what" across the enterprise</p>
              <div className="data-source-details">
                <h5>Key Components:</h5>
                <ul>
                  <li>Leadership Structure: CIO → Division → Department → Team</li>
                  <li>Employee Mapping: Users to org units and cost centers</li>
                  <li>Reporting Relationships: Manager chains and budget responsibility</li>
                  <li>Persona Classification: Role definitions and permissions</li>
                </ul>
                <h5>Data Sources:</h5>
                <ul>
                  <li><strong>HR Systems:</strong> Workday, SuccessFactors for org structure</li>
                  <li><strong>Active Directory:</strong> User groups and security permissions</li>
                  <li><strong>Finance Systems:</strong> Cost center assignments and budget ownership</li>
                </ul>
              </div>
            </div>

            <div className="data-source-card">
              <div className="data-source-header">
                <DollarSign size={24} color="#10b981" />
                <h4>Financial Data & Budget Information</h4>
              </div>
              <p className="data-source-purpose"><strong>Purpose:</strong> Establishes the financial framework and accountability structure</p>
              <div className="data-source-details">
                <h5>Key Components:</h5>
                <ul>
                  <li>Budget Allocations: Annual/quarterly budgets by cost center</li>
                  <li>Cost Center Mappings: GL account structures</li>
                  <li>Approval Workflows: Authorization thresholds</li>
                  <li>Historical Spending: Past patterns for forecasting</li>
                </ul>
                <h5>Data Sources:</h5>
                <ul>
                  <li><strong>ERP Systems:</strong> SAP, Oracle Financials for budget data</li>
                  <li><strong>Financial Planning:</strong> Anaplan, Hyperion for allocations</li>
                  <li><strong>Procurement:</strong> Contract terms and committed spend</li>
                </ul>
              </div>
            </div>

            <div className="data-source-card">
              <div className="data-source-header">
                <Activity size={24} color="#8b5cf6" />
                <h4>Platform Usage Logs</h4>
              </div>
              <p className="data-source-purpose"><strong>Purpose:</strong> Captures granular consumption data for accurate cost allocation</p>
              <div className="data-source-details">
                <h5>Key Components:</h5>
                <ul>
                  <li>User Activity Logs: Who accessed what, when, for how long</li>
                  <li>Query Execution Data: Compute resources per user/query/job</li>
                  <li>Storage Utilization: Data volumes and access patterns</li>
                  <li>Workspace Usage: Individual sandbox consumption</li>
                </ul>
                <h5>Data Sources:</h5>
                <ul>
                  <li><strong>Snowflake:</strong> Query history, warehouse usage by user/role</li>
                  <li><strong>AWS CloudTrail:</strong> API calls and resource usage patterns</li>
                  <li><strong>Azure Activity Logs:</strong> Resource utilization and compute time</li>
                  <li><strong>Databricks:</strong> Cluster usage, notebook execution by user</li>
                </ul>
              </div>
            </div>

            <div className="data-source-card">
              <div className="data-source-header">
                <Cloud size={24} color="#f59e0b" />
                <h4>Cloud Billing Data</h4>
              </div>
              <p className="data-source-purpose"><strong>Purpose:</strong> Authoritative source of actual costs incurred across platforms</p>
              <div className="data-source-details">
                <h5>Key Components:</h5>
                <ul>
                  <li>Service-Level Costs: Detailed charges by service and region</li>
                  <li>Resource Tagging: Cost allocation tags on cloud resources</li>
                  <li>Committed Discounts: Reserved instances and savings plans</li>
                  <li>Cross-Service Dependencies: Network and shared service costs</li>
                </ul>
                <h5>Data Sources:</h5>
                <ul>
                  <li><strong>AWS Cost and Usage Reports:</strong> Hourly billing granularity</li>
                  <li><strong>Azure Cost Management:</strong> Service costs and allocations</li>
                  <li><strong>Snowflake Usage Data:</strong> Credit consumption and storage</li>
                  <li><strong>Databricks Account APIs:</strong> DBU consumption and costs</li>
                </ul>
              </div>
            </div>

            <div className="data-source-card">
              <div className="data-source-header">
                <Target size={24} color="#ef4444" />
                <h4>Subscription Calculator & Cost Models</h4>
              </div>
              <p className="data-source-purpose"><strong>Purpose:</strong> Translates raw usage into business-relevant cost allocations</p>
              <div className="data-source-details">
                <h5>Key Components:</h5>
                <ul>
                  <li>Allocation Rules Engine: Configurable business rules</li>
                  <li>Pricing Models: Usage-based vs. subscription frameworks</li>
                  <li>Cost Pool Management: Shared service cost allocation</li>
                  <li>Rate Cards: Internal pricing for different service tiers</li>
                </ul>
                <h5>Data Sources:</h5>
                <ul>
                  <li><strong>Finance Systems:</strong> Rate cards and allocation policies</li>
                  <li><strong>Contract Management:</strong> Vendor pricing and discounts</li>
                  <li><strong>Historical Patterns:</strong> Trending data for modeling</li>
                  <li><strong>Business Rules:</strong> Documented allocation methodologies</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="integration-framework">
            <h4>Data Integration & Quality Framework</h4>
            <div className="framework-grid">
              <div className="framework-item">
                <h5>Real-Time Pipeline</h5>
                <p>Hourly synchronization, data validation, exception handling, master data management</p>
              </div>
              <div className="framework-item">
                <h5>Governance Controls</h5>
                <p>Source system authority, change management, audit trails, quality metrics</p>
              </div>
              <div className="framework-item">
                <h5>Integration Architecture</h5>
                <p>API-first design, cloud-native pipeline, event-driven updates, flexible schema</p>
              </div>
              <div className="framework-item">
                <h5>Business Value</h5>
                <p>Accuracy & trust, timeliness, flexibility, scalability, transparency</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OverviewPage;