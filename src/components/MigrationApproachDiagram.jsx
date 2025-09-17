import { ArrowRight, BarChart3, Brain, Database, FileCode, GitBranch, Layers, Monitor, Search, Workflow } from 'lucide-react';

const MigrationApproachDiagram = () => {
  return (
    <div className="migration-diagram-container" style={{ 
      padding: '32px', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '12px'
        }}>
          Legacy Big Data Migration Strategy
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#64748b',
          marginBottom: '24px'
        }}>
          Hadoop Cloudera → IBM Watsonx.data
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '25px',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
        }}>
          <Brain size={20} style={{ marginRight: '8px' }} />
          AI Infused Migration Accelerators
        </div>
      </div>

      {/* Migration Flow */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px' }}>
        {/* Source System */}
        <div style={{ textAlign: 'center', flex: '0 0 200px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            marginBottom: '16px',
            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
          }}>
            <Database size={32} style={{ marginBottom: '8px' }} />
            <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '600' }}>Legacy System</h3>
            <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', opacity: '0.9' }}>Hadoop Cloudera</p>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: '1', 
          justifyContent: 'center',
          margin: '0 32px'
        }}>
          <ArrowRight size={40} style={{ color: '#3b82f6' }} />
        </div>

        {/* Target System */}
        <div style={{ textAlign: 'center', flex: '0 0 200px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            marginBottom: '16px',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
          }}>
            <Database size={32} style={{ marginBottom: '8px' }} />
            <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '600' }}>Target System</h3>
            <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', opacity: '0.9' }}>IBM Watsonx.data</p>
          </div>
        </div>
      </div>

      {/* Migration Stages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '48px' }}>
        
        {/* Stage 1: Discovery */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e2e8f0',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-16px',
            left: '24px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Stage 1
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
            <Search size={32} style={{ color: '#f59e0b', marginBottom: '12px' }} />
            <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>Discovery</h3>
          </div>

          <div style={{ space: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Database size={16} style={{ color: '#d97706', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#92400e' }}>Database Assessment</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e', fontSize: '0.9rem' }}>
                <li>Schema analysis</li>
                <li>Data quality evaluation</li>
                <li>Performance metrics</li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FileCode size={16} style={{ color: '#d97706', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#92400e' }}>Code Assessment</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e', fontSize: '0.9rem' }}>
                <li>Legacy code inventory</li>
                <li>Complexity analysis</li>
                <li>Dependency mapping</li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <GitBranch size={16} style={{ color: '#d97706', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#92400e' }}>Code Lineage</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e', fontSize: '0.9rem' }}>
                <li>Data flow mapping</li>
                <li>Impact analysis</li>
                <li>Dependency graphs</li>
              </ul>
            </div>
          </div>

          {/* Gen AI Badge */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Brain size={14} style={{ marginRight: '6px' }} />
            AI-Infused Discovery
          </div>
        </div>

        {/* Stage 2: Design */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e2e8f0',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-16px',
            left: '24px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Stage 2
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
            <Layers size={32} style={{ color: '#3b82f6', marginBottom: '12px' }} />
            <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>Design</h3>
          </div>

          <div style={{ space: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <ArrowRight size={16} style={{ color: '#1d4ed8', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#1e40af' }}>Data Mappings</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#1e40af', fontSize: '0.9rem' }}>
                <li>Schema transformation</li>
                <li>Data type mapping</li>
                <li>Business rule mapping</li>
              </ul>
            </div>
          </div>

          {/* Gen AI Badge */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Brain size={14} style={{ marginRight: '6px' }} />
            AI-Infused Design
          </div>
        </div>

        {/* Stage 3: Development */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e2e8f0',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-16px',
            left: '24px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Stage 3
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
            <Workflow size={32} style={{ color: '#10b981', marginBottom: '12px' }} />
            <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>Development</h3>
          </div>

          <div style={{ space: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Database size={16} style={{ color: '#047857', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#065f46' }}>Data Modeling</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#065f46', fontSize: '0.9rem' }}>
                <li>Logical data models</li>
                <li>Physical implementation</li>
                <li>Performance optimization</li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Workflow size={16} style={{ color: '#047857', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#065f46' }}>Data Pipeline</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#065f46', fontSize: '0.9rem' }}>
                <li>ETL/ELT processes</li>
                <li>Real-time streaming</li>
                <li>Data orchestration</li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <BarChart3 size={16} style={{ color: '#047857', marginRight: '8px' }} />
                <span style={{ fontWeight: '600', color: '#065f46' }}>Reporting</span>
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#065f46', fontSize: '0.9rem' }}>
                <li>Dashboard migration</li>
                <li>Report recreation</li>
                <li>Self-service analytics</li>
              </ul>
            </div>
          </div>

          {/* Gen AI Badge */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Brain size={14} style={{ marginRight: '6px' }} />
            AI-Infused Development
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e2e8f0'
      }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '32px'
        }}>
          AI Infused Migration Accelerators Benefits
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}>
              <Search size={24} style={{ color: 'white' }} />
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e293b' }}>80% Faster Discovery</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>Automated assessment and analysis</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <Layers size={24} style={{ color: 'white' }} />
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e293b' }}>60% Reduced Design Time</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>AI-generated mappings and schemas</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}>
              <Workflow size={24} style={{ color: 'white' }} />
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e293b' }}>70% Code Generation</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>Automated pipeline and report creation</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}>
              <Brain size={24} style={{ color: 'white' }} />
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e293b' }}>50% Risk Reduction</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>AI-powered validation and testing</p>
          </div>
        </div>
      </div>

      {/* Migration Approach Timeline */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e2e8f0',
        marginTop: '48px'
      }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '40px'
        }}>
          Migration Execution Approach
        </h3>

        {/* Phase 1: Analysis & Design */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)'
          }}>
            <h4 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700' }}>Phase 1: Analysis & Design</h4>
            <p style={{ margin: '8px 0 0 0', opacity: '0.9' }}>Assessment, Planning & Architecture Design</p>
          </div>
        </div>

        {/* Phase 2: Parallel Data Pipelines */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
          }}>
            <h4 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700' }}>Phase 2: Data Pipeline Migration</h4>
            <p style={{ margin: '8px 0 0 0', opacity: '0.9' }}>Parallel Historical & Incremental Data Processing</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            {/* Historical Data Pipeline */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #f59e0b',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                background: '#f59e0b',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Phase 2a
              </div>
              
              <h5 style={{ 
                margin: '16px 0 20px 0', 
                fontSize: '1.2rem', 
                fontWeight: '700', 
                color: '#92400e',
                textAlign: 'center'
              }}>
                Historical Data Pipeline
              </h5>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  border: '1px solid #d97706'
                }}>
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#92400e' }}>Legacy Data Migration</h6>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#78350f' }}>Bulk transfer of historical data from Hadoop to Watsonx.data</p>
                </div>

                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  border: '1px solid #d97706'
                }}>
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#92400e' }}>HDFS → Object Store</h6>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#78350f' }}>Migration from HDFS to S3/Cloud Object Storage</p>
                </div>

                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #d97706'
                }}>
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#92400e' }}>Data Validation</h6>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#78350f' }}>Quality checks and reconciliation processes</p>
                </div>
              </div>
            </div>

            {/* Incremental Data Pipeline */}
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #3b82f6',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                background: '#3b82f6',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Phase 2b
              </div>
              
              <h5 style={{ 
                margin: '16px 0 20px 0', 
                fontSize: '1.2rem', 
                fontWeight: '700', 
                color: '#1e40af',
                textAlign: 'center'
              }}>
                Incremental Data Pipeline
              </h5>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  border: '1px solid #2563eb'
                }}>
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e40af' }}>SoR Rewiring</h6>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#1e3a8a' }}>Direct connection from Sources of Record to Modern Platform</p>
                </div>

                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  border: '1px solid #2563eb'
                }}>
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e40af' }}>Code Migration</h6>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#1e3a8a' }}>Spark & MapReduce jobs to Watsonx.data native</p>
                </div>

                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #2563eb'
                }}>
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e40af' }}>Real-time Streaming</h6>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#1e3a8a' }}>CDC and streaming data integration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Consumption Migration */}
          <div style={{
            background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #8b5cf6',
            marginTop: '32px'
          }}>
            <h5 style={{ 
              margin: '0 0 20px 0', 
              fontSize: '1.2rem', 
              fontWeight: '700', 
              color: '#6b21a8',
              textAlign: 'center'
            }}>
              Consumption Layer Migration
            </h5>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #8b5cf6'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BarChart3 size={20} style={{ color: 'white' }} />
                </div>
                <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#6b21a8' }}>Dremio</h6>
                <p style={{ margin: '0', fontSize: '0.8rem', color: '#7c2d92' }}>Data Lake Engine Migration</p>
              </div>

              <div style={{
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #8b5cf6'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Database size={20} style={{ color: 'white' }} />
                </div>
                <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#6b21a8' }}>SAS</h6>
                <p style={{ margin: '0', fontSize: '0.8rem', color: '#7c2d92' }}>Analytics Platform Integration</p>
              </div>

              <div style={{
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #8b5cf6'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Monitor size={20} style={{ color: 'white' }} />
                </div>
                <h6 style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#6b21a8' }}>Tableau</h6>
                <p style={{ margin: '0', fontSize: '0.8rem', color: '#7c2d92' }}>BI & Visualization Migration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3: Production Parallel */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
          }}>
            <h4 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700' }}>Phase 3: Production Parallel</h4>
            <p style={{ margin: '8px 0 0 0', opacity: '0.9' }}>Dual System Operation & Validation</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #10b981'
            }}>
              <h6 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#065f46' }}>Shadow Mode</h6>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#064e3b' }}>Run both systems in parallel for validation</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #10b981'
            }}>
              <h6 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#065f46' }}>Performance Testing</h6>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#064e3b' }}>Load testing and optimization</p>
            </div>
          </div>
        </div>

        {/* Phase 4: Warranty & Handover */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)'
          }}>
            <h4 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700' }}>Phase 4: Warranty & Handover</h4>
            <p style={{ margin: '8px 0 0 0', opacity: '0.9' }}>Knowledge Transfer & Support</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fecaca, #fca5a5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #dc2626'
            }}>
              <h6 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#7f1d1d' }}>Documentation</h6>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#991b1b' }}>Complete system documentation</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #fecaca, #fca5a5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #dc2626'
            }}>
              <h6 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#7f1d1d' }}>Training</h6>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#991b1b' }}>Team enablement and upskilling</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #fecaca, #fca5a5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #dc2626'
            }}>
              <h6 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#7f1d1d' }}>Support</h6>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#991b1b' }}>Post-go-live warranty period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationApproachDiagram;