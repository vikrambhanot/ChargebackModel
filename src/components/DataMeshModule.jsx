import { BarChart3, ChevronRight, Code, Database, GitBranch, Layers, Network, Shield, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const DataMeshModule = () => {
  const [activeSection, setActiveSection] = useState('strategy');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);

  // Animation for data architecture flow
  useEffect(() => {
    if (activeSection === 'architecture') {
      const timer = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [activeSection]);

  // Data definitions
  const domains = {
    wealth: {
      name: 'Wealth Management',
      color: 'bg-blue-500',
      subDomains: ['Portfolio Management', 'Client Services', 'Advisory'],
      dataProducts: ['Client 360 Analytics', 'Performance Attribution', 'Risk Metrics'],
      sources: ['Trading Systems', 'CRM', 'Market Data']
    },
    finance: {
      name: 'Finance',
      color: 'bg-green-500',
      subDomains: ['Accounting', 'Reporting', 'Budgeting'],
      dataProducts: ['Financial Reporting', 'Cost Analytics', 'Revenue Recognition'],
      sources: ['ERP Systems', 'GL Systems', 'Billing']
    },
    risk: {
      name: 'Risk Management',
      color: 'bg-red-500',
      subDomains: ['Credit Risk', 'Market Risk', 'Operational Risk'],
      dataProducts: ['Risk Dashboards', 'Stress Testing', 'Compliance Reports'],
      sources: ['Risk Systems', 'Trading Data', 'External Feeds']
    },
    master: {
      name: 'Master & Reference',
      color: 'bg-purple-500',
      subDomains: ['Customer Master', 'Product Master', 'Reference Data'],
      dataProducts: ['Golden Records', 'Data Dictionary', 'Hierarchies'],
      sources: ['MDM Systems', 'External Providers', 'Data Governance']
    }
  };

  const productHierarchy = [
    {
      area: 'Digital Wealth',
      lines: [
        {
          name: 'Advisory Platform',
          products: ['Portfolio Analytics', 'Client Insights', 'Risk Assessment']
        },
        {
          name: 'Trading Solutions',
          products: ['Execution Analytics', 'Market Data', 'Settlement Reporting']
        }
      ]
    },
    {
      area: 'Enterprise Operations',
      lines: [
        {
          name: 'Financial Management',
          products: ['P&L Analytics', 'Cost Management', 'Regulatory Reporting']
        },
        {
          name: 'Risk & Compliance',
          products: ['Risk Dashboards', 'Compliance Monitoring', 'Audit Trails']
        }
      ]
    }
  ];

  // Component for Strategy content
  const renderStrategy = () => (
    <div className="slides-container">
      <div className="slide-navigation">
        <h2>Data Mesh Strategy</h2>
        <p>Transforming Enterprise Data Architecture for Azure</p>
      </div>
      
      <div className="slides-content">
        <section className="slide">
          <h3>The Strategic Shift: From Data Lake to Data Mesh</h3>
          
          <div className="slide-two-column">
            <div className="slide-column">
              <div className="cost-category" style={{borderLeftColor: '#ef4444'}}>
                <h4>Current Challenge</h4>
                <ul>
                  <li>Monolithic data lake creates bottlenecks</li>
                  <li>Centralized governance slows innovation</li>
                  <li>Teams wait for central IT resources</li>
                  <li>Single points of failure risk entire system</li>
                  <li>Data quality issues cascade across domains</li>
                </ul>
              </div>
            </div>
            
            <div className="slide-column">
              <div className="cost-category" style={{borderLeftColor: '#10b981'}}>
                <h4>Target Vision</h4>
                <ul>
                  <li>Distributed data products by domain</li>
                  <li>Self-serve infrastructure with governance</li>
                  <li>Federated accountability, centralized standards</li>
                  <li>Domain teams own end-to-end data lifecycle</li>
                  <li>Built-in quality and observability</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="solution-highlight">
            <h4>Key Benefits for Azure Migration</h4>
            <div className="solution-grid">
              <div className="solution-item">
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <Shield size={20} style={{color: '#3b82f6', marginRight: '8px'}} />
                  <h5>Built-in Governance</h5>
                </div>
                <p>Azure Purview & Policy for automated compliance</p>
              </div>
              <div className="solution-item">
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <TrendingUp size={20} style={{color: '#10b981', marginRight: '8px'}} />
                  <h5>Faster Innovation</h5>
                </div>
                <p>Self-service analytics reduce time-to-insight by 60%</p>
              </div>
              <div className="solution-item">
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <Network size={20} style={{color: '#8b5cf6', marginRight: '8px'}} />
                  <h5>Scalable Architecture</h5>
                </div>
                <p>Distributed design eliminates single points of failure</p>
              </div>
              <div className="solution-item">
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <Target size={20} style={{color: '#f59e0b', marginRight: '8px'}} />
                  <h5>Business Impact</h5>
                </div>
                <p><strong>95% data quality</strong>, 99.9% API uptime, 100% lineage coverage</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Component for Architecture content
  const renderArchitecture = () => (
    <div className="slides-container">
      <div className="slide-navigation">
        <h2>Data Architecture Flow</h2>
        <p>From Application Sources to Consumption</p>
      </div>

      <div className="slides-content">
        <section className="slide">
          <div style={{marginBottom: '2rem'}}>
            {/* Application World */}
            <div style={{
              opacity: animationStep >= 0 ? 1 : 0.5,
              transition: 'all 1s ease',
              marginBottom: '2rem'
            }}>
              <h4 style={{textAlign: 'center', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Code size={20} style={{marginRight: '8px', color: '#3b82f6'}} />
                Application World (Source Systems)
              </h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                {Object.entries(domains).map(([key, domain]) => (
                  <div key={key} style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderLeft: '4px solid #3b82f6',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <h5 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>{domain.name}</h5>
                    <div>
                      {domain.sources.map((source, idx) => (
                        <div key={idx} style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#f3f4f6',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          marginBottom: '0.25rem'
                        }}>
                          {source}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow Arrow */}
            <div style={{
              textAlign: 'center',
              opacity: animationStep >= 1 ? 1 : 0.3,
              transition: 'all 1s ease',
              marginBottom: '2rem'
            }}>
              <ChevronRight size={32} style={{color: '#10b981', transform: 'rotate(90deg)'}} />
            </div>

            {/* Parallel Layer: Domain + Master/Reference */}
            <div style={{
              opacity: animationStep >= 1 ? 1 : 0.5,
              transition: 'all 1s ease',
              marginBottom: '2rem'
            }}>
              <h4 style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold'}}>
                Data Product Layer
              </h4>
              
              <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start'}}>
                {/* Domain & Sub-Domain Box */}
                <div style={{
                  border: '3px solid #10b981',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdf4',
                  padding: '2rem'
                }}>
                  <h5 style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#15803d'
                  }}>
                    <Layers size={24} style={{marginRight: '8px'}} />
                    Business Domains & Sub-Domains
                  </h5>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                    {Object.entries(domains).filter(([key]) => key !== 'master').map(([key, domain]) => (
                      <div key={key}>
                        <div
                          style={{
                            backgroundColor: key === 'wealth' ? '#3b82f6' : 
                                           key === 'finance' ? '#10b981' : '#ef4444',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: 'white',
                            cursor: 'pointer',
                            transform: selectedDomain === key ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.3s ease',
                            border: selectedDomain === key ? '3px solid #60a5fa' : 'none'
                          }}
                          onClick={() => setSelectedDomain(selectedDomain === key ? null : key)}
                        >
                          <h6 style={{fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem'}}>{domain.name}</h6>
                          <div>
                            {domain.subDomains.map((sub, idx) => (
                              <div key={idx} style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                borderRadius: '4px',
                                padding: '0.375rem',
                                marginBottom: '0.375rem',
                                fontSize: '0.75rem'
                              }}>
                                {sub}
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedDomain === key && (
                          <div style={{
                            marginTop: '0.75rem',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                            borderLeft: '4px solid #3b82f6',
                            padding: '0.75rem'
                          }}>
                            <h6 style={{fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem'}}>Data Products:</h6>
                            <div>
                              {domain.dataProducts.map((product, idx) => (
                                <div key={idx} style={{
                                  fontSize: '0.75rem',
                                  backgroundColor: '#dbeafe',
                                  color: '#1e40af',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  marginBottom: '0.25rem'
                                }}>
                                  {product}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Master & Reference Data Box */}
                <div style={{
                  border: '3px solid #8b5cf6',
                  borderRadius: '12px',
                  backgroundColor: '#faf5ff',
                  padding: '2rem',
                  height: 'fit-content'
                }}>
                  <h5 style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#7c3aed'
                  }}>
                    <Database size={24} style={{marginRight: '8px'}} />
                    Master & Reference
                  </h5>
                  
                  <div
                    style={{
                      backgroundColor: '#8b5cf6',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: 'white',
                      cursor: 'pointer',
                      transform: selectedDomain === 'master' ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      border: selectedDomain === 'master' ? '3px solid #a855f7' : 'none'
                    }}
                    onClick={() => setSelectedDomain(selectedDomain === 'master' ? null : 'master')}
                  >
                    <h6 style={{fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem'}}>Enterprise Data</h6>
                    <div>
                      {domains.master.subDomains.map((sub, idx) => (
                        <div key={idx} style={{
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          borderRadius: '4px',
                          padding: '0.375rem',
                          marginBottom: '0.375rem',
                          fontSize: '0.75rem'
                        }}>
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDomain === 'master' && (
                    <div style={{
                      marginTop: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb',
                      borderLeft: '4px solid #8b5cf6',
                      padding: '0.75rem'
                    }}>
                      <h6 style={{fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem'}}>Data Products:</h6>
                      <div>
                        {domains.master.dataProducts.map((product, idx) => (
                          <div key={idx} style={{
                            fontSize: '0.75rem',
                            backgroundColor: '#f3e8ff',
                            color: '#6b21a8',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            marginBottom: '0.25rem'
                          }}>
                            {product}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Connection indicator */}
                  <div style={{
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontStyle: 'italic'
                  }}>
                    ↔ Feeds all business domains
                  </div>
                </div>
              </div>
            </div>

            {/* Cross-Domain Integration - Fed by both sides */}
            <div style={{
              opacity: animationStep >= 2 ? 1 : 0.5,
              transition: 'all 1s ease',
              marginBottom: '2rem'
            }}>
              {/* Flow arrows from both sides */}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <div style={{flex: 1, textAlign: 'center'}}>
                  <ChevronRight size={32} style={{color: '#10b981', transform: 'rotate(135deg)'}} />
                  <div style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem'}}>Domain Data</div>
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                  <ChevronRight size={32} style={{color: '#8b5cf6', transform: 'rotate(225deg)'}} />
                  <div style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem'}}>Master Data</div>
                </div>
              </div>
              
              <h4 style={{textAlign: 'center', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <GitBranch size={20} style={{marginRight: '8px', color: '#f97316'}} />
                Cross-Domain Integration Layer
              </h4>
              
              <div style={{
                background: 'linear-gradient(to right, #fff7ed, #fed7aa)',
                borderRadius: '12px',
                padding: '2rem',
                border: '2px solid #f97316'
              }}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{
                      backgroundColor: '#f97316',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <Network size={32} style={{color: 'white'}} />
                    </div>
                    <h5 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Cross-Domain APIs</h5>
                    <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Unified contracts across all domains</p>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{
                      backgroundColor: '#ea580c',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <GitBranch size={32} style={{color: 'white'}} />
                    </div>
                    <h5 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Data Mesh Fabric</h5>
                    <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Federated governance and discovery</p>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{
                      backgroundColor: '#dc2626',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <Shield size={32} style={{color: 'white'}} />
                    </div>
                    <h5 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Shared Services</h5>
                    <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Common platform capabilities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumption Layer */}
            <div style={{
              opacity: animationStep >= 3 ? 1 : 0.5,
              transition: 'all 1s ease'
            }}>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <ChevronRight size={32} style={{color: '#f97316', transform: 'rotate(90deg)'}} />
              </div>
              
              <h4 style={{textAlign: 'center', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <BarChart3 size={20} style={{marginRight: '8px', color: '#f97316'}} />
                Consumption Layer
              </h4>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fecaca)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <BarChart3 size={48} style={{color: '#f97316', marginBottom: '1rem'}} />
                  <h5 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.75rem'}}>Analytics & BI</h5>
                  <ul style={{fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5'}}>
                    <li>• Executive Dashboards</li>
                    <li>• Operational Reports</li>
                    <li>• Self-Service Analytics</li>
                  </ul>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #dbeafe, #c7d2fe)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <Zap size={48} style={{color: '#3b82f6', marginBottom: '1rem'}} />
                  <h5 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.75rem'}}>ML/AI Applications</h5>
                  <ul style={{fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5'}}>
                    <li>• Predictive Models</li>
                    <li>• Risk Algorithms</li>
                    <li>• Recommendation Engines</li>
                  </ul>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <Network size={48} style={{color: '#10b981', marginBottom: '1rem'}} />
                  <h5 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.75rem'}}>External APIs</h5>
                  <ul style={{fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5'}}>
                    <li>• Partner Integrations</li>
                    <li>• Mobile Applications</li>
                    <li>• Third-party Services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Component for Technical Implementation content
  const renderTechnical = () => (
    <div className="slides-container">
      <div className="slide-navigation">
        <h2>Technical Implementation on Azure</h2>
        <p>ADLS architecture, access control, and governance framework</p>
      </div>

      <div className="slides-content">
        <section className="slide">
          <h3>Azure Data Lake Storage (ADLS) Zone Architecture</h3>
          
          <div style={{marginBottom: '3rem'}}>
            <div style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '2rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem'
            }}>
              <div style={{marginBottom: '1rem', fontWeight: 'bold', color: '#1e40af'}}>
                📁 adls://enterprise-data-mesh/
              </div>
              <div style={{marginLeft: '1rem'}}>
                <div style={{marginBottom: '0.5rem', color: '#059669', fontWeight: 'bold'}}>
                  📂 domains/ <span style={{color: '#6b7280', fontSize: '0.75rem'}}>(Domain-owned data products)</span>
                </div>
                <div style={{marginLeft: '2rem'}}>
                  <div style={{marginBottom: '0.25rem'}}>📁 wealth-management/</div>
                  <div style={{marginLeft: '2rem', color: '#6b7280'}}>
                    <div>📁 raw/ → landing-zone/</div>
                    <div>📁 curated/ → processed-data/</div>
                    <div>📁 products/ → api-ready-datasets/</div>
                  </div>
                  <div style={{marginBottom: '0.25rem'}}>📁 finance/</div>
                  <div style={{marginBottom: '0.25rem'}}>📁 risk-management/</div>
                </div>
                
                <div style={{marginBottom: '0.5rem', color: '#7c3aed', fontWeight: 'bold', marginTop: '1rem'}}>
                  📂 master-reference/ <span style={{color: '#6b7280', fontSize: '0.75rem'}}>(Enterprise shared data)</span>
                </div>
                <div style={{marginLeft: '2rem', color: '#6b7280'}}>
                  <div>📁 customer-master/ → golden-records/</div>
                  <div>📁 product-master/ → hierarchies/</div>
                  <div>📁 reference-data/ → lookups-taxonomies/</div>
                </div>

                <div style={{marginBottom: '0.5rem', color: '#f97316', fontWeight: 'bold', marginTop: '1rem'}}>
                  📂 cross-domain/ <span style={{color: '#6b7280', fontSize: '0.75rem'}}>(Integration layer)</span>
                </div>
                <div style={{marginLeft: '2rem', color: '#6b7280'}}>
                  <div>📁 shared-services/ → common-apis/</div>
                  <div>📁 integration-contracts/ → schema-registry/</div>
                </div>

                <div style={{marginBottom: '0.5rem', color: '#dc2626', fontWeight: 'bold', marginTop: '1rem'}}>
                  📂 consumption/ <span style={{color: '#6b7280', fontSize: '0.75rem'}}>(Analytics ready)</span>
                </div>
                <div style={{marginLeft: '2rem', color: '#6b7280'}}>
                  <div>📁 analytics/ → dashboards-reports/</div>
                  <div>📁 ml-models/ → feature-stores/</div>
                </div>
              </div>
            </div>
          </div>

          <h3>Cross-Domain Access Control Framework</h3>
          
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start'}}>
              {/* User Personas */}
              <div>
                <h4 style={{marginBottom: '1rem', color: '#1f2937'}}>User Personas & Access Patterns</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem'}}>
                      Data Scientists
                    </div>
                    <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                      Cross-domain ML models, feature engineering
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem'}}>
                      Business Analysts
                    </div>
                    <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                      Cross-domain reporting, executive dashboards
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem'}}>
                      Data Engineers
                    </div>
                    <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                      Integration pipelines, data movement
                    </div>
                  </div>
                </div>
              </div>

              {/* Access Methods */}
              <div>
                <h4 style={{marginBottom: '1rem', color: '#1f2937'}}>Access Methods & Controls</h4>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <h5 style={{color: '#059669', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                    1. API-First Access (Recommended)
                  </h5>
                  <ul style={{fontSize: '0.875rem', color: '#374151', lineHeight: '1.5'}}>
                    <li>✅ <strong>Service Catalog:</strong> Discoverable APIs in Azure API Management</li>
                    <li>✅ <strong>OAuth 2.0:</strong> Standardized authentication with Azure AD</li>
                    <li>✅ <strong>Rate Limiting:</strong> Built-in throttling and SLA management</li>
                    <li>✅ <strong>Contract-First:</strong> OpenAPI specs with versioning</li>
                  </ul>
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <h5 style={{color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                    2. Direct Data Access (Controlled)
                  </h5>
                  <ul style={{fontSize: '0.875rem', color: '#374151', lineHeight: '1.5'}}>
                    <li>⚠️ <strong>Azure RBAC:</strong> Container/folder level permissions</li>
                    <li>⚠️ <strong>Conditional Access:</strong> Business justification required</li>
                    <li>⚠️ <strong>Data Classification:</strong> Automatic sensitivity labeling</li>
                    <li>⚠️ <strong>Audit Trails:</strong> Complete access logging</li>
                  </ul>
                </div>

                <div>
                  <h5 style={{color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                    3. Emergency Access (Break Glass)
                  </h5>
                  <ul style={{fontSize: '0.875rem', color: '#374151', lineHeight: '1.5'}}>
                    <li>🚨 <strong>Privileged Access:</strong> Emergency procedures only</li>
                    <li>🚨 <strong>Multi-Approval:</strong> Domain owner + security approval</li>
                    <li>🚨 <strong>Time-Limited:</strong> Automatic expiry and review</li>
                    <li>🚨 <strong>Full Audit:</strong> Complete activity monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '2px solid #f59e0b',
            marginTop: '2rem'
          }}>
            <h4 style={{color: '#92400e', marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
              <Target size={20} style={{marginRight: '8px'}} />
              Implementation Roadmap
            </h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <div>
                <h5 style={{color: '#92400e', fontSize: '0.875rem', fontWeight: 'bold'}}>Phase 1 (Months 1-3)</h5>
                <ul style={{fontSize: '0.75rem', color: '#374151'}}>
                  <li>• ADLS zone setup</li>
                  <li>• Azure Purview deployment</li>
                  <li>• Basic RBAC framework</li>
                </ul>
              </div>
              <div>
                <h5 style={{color: '#92400e', fontSize: '0.875rem', fontWeight: 'bold'}}>Phase 2 (Months 4-6)</h5>
                <ul style={{fontSize: '0.75rem', color: '#374151'}}>
                  <li>• API Management setup</li>
                  <li>• Schema registry</li>
                  <li>• Domain workspaces</li>
                </ul>
              </div>
              <div>
                <h5 style={{color: '#92400e', fontSize: '0.875rem', fontWeight: 'bold'}}>Phase 3 (Months 7-12)</h5>
                <ul style={{fontSize: '0.75rem', color: '#374151'}}>
                  <li>• Cross-domain integration</li>
                  <li>• Advanced monitoring</li>
                  <li>• Self-service capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Component for Operating Model content
  const renderOperating = () => (
    <div className="slides-container">
      <div className="slide-navigation">
        <h2>Operating Model</h2>
        <p>Product Areas → Product Lines → Products</p>
      </div>

      <div className="slides-content">
        <section className="slide">
          <div style={{marginBottom: '2rem'}}>
            {productHierarchy.map((area, areaIdx) => (
              <div key={areaIdx} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: 'linear-gradient(to right, #1f2937, #4b5563)',
                  padding: '1.5rem',
                  color: 'white'
                }}>
                  <h4 style={{fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>
                    <Users size={24} style={{marginRight: '12px'}} />
                    Product Area: {area.area}
                  </h4>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    {area.lines.map((line, lineIdx) => (
                      <div key={lineIdx} style={{borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem'}}>
                        <h5 style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <GitBranch size={20} style={{marginRight: '8px', color: '#3b82f6'}} />
                          Product Line: {line.name}
                        </h5>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                          {line.products.map((product, productIdx) => (
                            <div key={productIdx} style={{
                              background: 'linear-gradient(135deg, #dbeafe, #c7d2fe)',
                              borderRadius: '8px',
                              padding: '1rem'
                            }}>
                              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.75rem'}}>
                                <Target size={16} style={{color: '#3b82f6', marginRight: '8px'}} />
                                <h6 style={{fontWeight: '600'}}>{product}</h6>
                              </div>
                              <div style={{fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <div style={{display: 'flex', alignItems: 'center', color: '#6b7280'}}>
                                  <Users size={12} style={{marginRight: '8px'}} />
                                  Product Manager
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', color: '#6b7280'}}>
                                  <Code size={12} style={{marginRight: '8px'}} />
                                  Scrum Team (5-7 people)
                                </div>
                                <div style={{
                                  backgroundColor: 'rgba(255,255,255,0.6)',
                                  borderRadius: '4px',
                                  padding: '0.25rem 0.5rem',
                                  fontSize: '0.75rem'
                                }}>
                                  Owns end-to-end delivery
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(to right, #ecfdf5, #d1fae5)',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h4 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <TrendingUp size={24} style={{marginRight: '12px', color: '#059669'}} />
              Key Operating Principles
            </h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
              <div>
                <h5 style={{fontWeight: '600', marginBottom: '0.75rem'}}>Product Manager Responsibilities</h5>
                <ul style={{fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6'}}>
                  <li style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#059669',
                      borderRadius: '50%',
                      marginTop: '8px',
                      marginRight: '12px',
                      flexShrink: 0
                    }}></div>
                    Define data product vision and roadmap
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#059669',
                      borderRadius: '50%',
                      marginTop: '8px',
                      marginRight: '12px',
                      flexShrink: 0
                    }}></div>
                    Manage stakeholder requirements
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start'}}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#059669',
                      borderRadius: '50%',
                      marginTop: '8px',
                      marginRight: '12px',
                      flexShrink: 0
                    }}></div>
                    Own business value and KPIs
                  </li>
                </ul>
              </div>
              <div>
                <h5 style={{fontWeight: '600', marginBottom: '0.75rem'}}>Scrum Team Responsibilities</h5>
                <ul style={{fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6'}}>
                  <li style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#0d9488',
                      borderRadius: '50%',
                      marginTop: '8px',
                      marginRight: '12px',
                      flexShrink: 0
                    }}></div>
                    Build, deploy, and maintain data products
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#0d9488',
                      borderRadius: '50%',
                      marginTop: '8px',
                      marginRight: '12px',
                      flexShrink: 0
                    }}></div>
                    Ensure data quality and reliability
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start'}}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#0d9488',
                      borderRadius: '50%',
                      marginTop: '8px',
                      marginRight: '12px',
                      flexShrink: 0
                    }}></div>
                    Implement governance and security
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
      {/* Sub-navigation for Data Mesh */}
      <div style={{backgroundColor: '#dbeafe', borderBottom: '1px solid #e5e7eb'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{display: 'flex', gap: '0.25rem', paddingTop: '0.75rem', paddingBottom: '0.75rem'}}>
            {[
              { key: 'strategy', label: 'Strategy', icon: Target },
              { key: 'architecture', label: 'Architecture', icon: Layers },
              { key: 'technical', label: 'Technical Implementation', icon: Code },
              { key: 'operating', label: 'Operating Model', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activeSection === key ? '#2563eb' : 'transparent',
                  color: activeSection === key ? 'white' : '#1d4ed8',
                  boxShadow: activeSection === key ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== key) {
                    e.target.style.backgroundColor = '#bfdbfe';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== key) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={12} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main style={{transition: 'all 0.5s ease'}}>
        {activeSection === 'strategy' && renderStrategy()}
        {activeSection === 'architecture' && renderArchitecture()}
        {activeSection === 'technical' && renderTechnical()}
        {activeSection === 'operating' && renderOperating()}
      </main>
    </div>
  );
};

export default DataMeshModule;