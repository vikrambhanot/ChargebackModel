import { BarChart, Bot, Calculator, Cloud, Database, Download, Send, User, Users, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AICostCalculator = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm here to help you estimate the cost of your AI chatbot project. Let's start by understanding your use case. What type of chatbot are you looking to build?",
      options: ['Knowledge Management', 'Customer Q&A', 'Internal Support', 'Document Search', 'Custom Solution']
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState('useCase');
  const [userInput, setUserInput] = useState('');
  const [projectData, setProjectData] = useState({
    useCase: '',
    users: 0,
    queries: 0,
    fileUploads: '',
    fileSize: '',
    dataSize: 0,
    queryComplexity: '',
    llmModel: '',
    availability: '',
    dataRetention: ''
  });
  
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = (type, content, options = null) => {
    setMessages(prev => [...prev, { type, content, options }]);
  };

  const handleOptionClick = (option) => {
    addMessage('user', option);
    processUserResponse(option);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      addMessage('user', userInput);
      processUserResponse(userInput);
      setUserInput('');
    }
  };

  const extractNumber = (text) => {
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const getUserCountFromRange = (range) => {
    if (range.includes('50-100')) return 75;
    if (range.includes('100-500')) return 300;
    if (range.includes('500-1000')) return 750;
    if (range.includes('1000+')) return 1500;
    return 100;
  };

  const getQueryCountFromRange = (range) => {
    if (range.includes('1-5')) return 3;
    if (range.includes('5-15')) return 10;
    if (range.includes('15-30')) return 22;
    if (range.includes('30+')) return 40;
    return 10;
  };

  const getDataSizeFromRange = (range) => {
    if (range.includes('Small')) return 0.5;
    if (range.includes('Medium')) return 5;
    if (range.includes('Large')) return 50;
    if (range.includes('Enterprise')) return 200;
    return 5;
  };

  const getFileUploadMultiplier = (uploadFrequency, fileSize) => {
    const frequencyMultipliers = {
      'Yes - Frequently (50%+ of queries)': 0.6,
      'Yes - Occasionally (10-30% of queries)': 0.2,
      'Yes - Rarely (< 10%)': 0.05,
      'No file uploads': 0
    };
    
    const sizeMultipliers = {
      'Small files (< 1MB each)': 1,
      'Medium files (1-10MB each)': 3,
      'Large files (10-50MB each)': 8,
      'Very large files (50MB+ each)': 20,
      'Not applicable': 0
    };
    
    return (frequencyMultipliers[uploadFrequency] || 0) * (sizeMultipliers[fileSize] || 0);
  };

  const getComplexityTokenMultiplier = (complexity) => {
    const multipliers = {
      'Simple Q&A (short responses)': 1,
      'Medium complexity (detailed explanations)': 2.5,
      'Complex analysis (long-form responses)': 4,
      'Multi-step reasoning': 6
    };
    return multipliers[complexity] || 2;
  };

  const processUserResponse = (response) => {
    switch (currentStep) {
      case 'useCase':
        setProjectData(prev => ({ ...prev, useCase: response }));
        setTimeout(() => {
          addMessage('bot', "Great choice! How many users do you expect to use this chatbot daily?", 
            ['50-100 users', '100-500 users', '500-1000 users', '1000+ users']);
          setCurrentStep('users');
        }, 1000);
        break;
        
      case 'users':
        const userCount = extractNumber(response) || getUserCountFromRange(response);
        setProjectData(prev => ({ ...prev, users: userCount }));
        setTimeout(() => {
          addMessage('bot', "Perfect! How many queries/conversations do you expect per user per day?", 
            ['1-5 queries', '5-15 queries', '15-30 queries', '30+ queries']);
          setCurrentStep('queries');
        }, 1000);
        break;
        
      case 'queries':
        const queryCount = extractNumber(response) || getQueryCountFromRange(response);
        setProjectData(prev => ({ ...prev, queries: queryCount }));
        setTimeout(() => {
          addMessage('bot', "Perfect! Will users be uploading files as part of their queries (PDFs, documents, images)?", 
            ['Yes - Frequently (50%+ of queries)', 'Yes - Occasionally (10-30% of queries)', 'Yes - Rarely (< 10%)', 'No file uploads']);
          setCurrentStep('fileUploads');
        }, 1000);
        break;
        
      case 'fileUploads':
        setProjectData(prev => ({ ...prev, fileUploads: response }));
        setTimeout(() => {
          addMessage('bot', "Got it! What's the typical file size users will upload?", 
            ['Small files (< 1MB each)', 'Medium files (1-10MB each)', 'Large files (10-50MB each)', 'Very large files (50MB+ each)', 'Not applicable']);
          setCurrentStep('fileSize');
        }, 1000);
        break;
        
      case 'fileSize':
        setProjectData(prev => ({ ...prev, fileSize: response }));
        setTimeout(() => {
          addMessage('bot', "Excellent! How much data will you be working with for training/knowledge base?", 
            ['Small (< 1GB)', 'Medium (1-10GB)', 'Large (10-100GB)', 'Enterprise (100GB+)']);
          setCurrentStep('dataSize');
        }, 1000);
        break;
        
      case 'dataSize':
        const dataSizeValue = getDataSizeFromRange(response);
        setProjectData(prev => ({ ...prev, dataSize: dataSizeValue }));
        setTimeout(() => {
          addMessage('bot', "What's the complexity of your typical queries?", 
            ['Simple Q&A (short responses)', 'Medium complexity (detailed explanations)', 'Complex analysis (long-form responses)', 'Multi-step reasoning']);
          setCurrentStep('queryComplexity');
        }, 1000);
        break;
        
      case 'queryComplexity':
        setProjectData(prev => ({ ...prev, queryComplexity: response }));
        setTimeout(() => {
          addMessage('bot', "Perfect! Which LLM model are you considering?", 
            ['GPT-3.5 Turbo', 'GPT-4', 'Claude-3 Sonnet', 'Claude-3 Opus', 'Custom/Open Source']);
          setCurrentStep('llmModel');
        }, 1000);
        break;
        
      case 'llmModel':
        setProjectData(prev => ({ ...prev, llmModel: response }));
        setTimeout(() => {
          addMessage('bot', "What level of availability do you need?", 
            ['Standard (99.9%)', 'High (99.95%)', 'Enterprise (99.99%)']);
          setCurrentStep('availability');
        }, 1000);
        break;
        
      case 'availability':
        setProjectData(prev => ({ ...prev, availability: response }));
        setTimeout(() => {
          addMessage('bot', "Final question! How long do you need to retain conversation data?", 
            ['30 days', '90 days', '1 year', '3+ years']);
          setCurrentStep('dataRetention');
        }, 1000);
        break;
        
      case 'dataRetention':
        setProjectData(prev => ({ ...prev, dataRetention: response }));
        setTimeout(() => {
          addMessage('bot', "Perfect! I have all the information I need. Let me calculate your estimated costs...");
          setTimeout(() => {
            setShowCostBreakdown(true);
            addMessage('bot', "Here's your personalized cost estimate! 👇");
          }, 2000);
        }, 1000);
        break;
        
      default:
        break;
    }
  };

  const calculateCosts = () => {
    const { users, queries, dataSize, llmModel, availability, dataRetention, fileUploads, fileSize, queryComplexity } = projectData;
    
    const monthlyQueries = users * queries * 30;
    
    // Calculate base tokens per query based on complexity
    const baseTokens = 500; // Base input tokens
    const complexityMultiplier = getComplexityTokenMultiplier(queryComplexity);
    const outputTokens = baseTokens * complexityMultiplier;
    
    // File upload processing adds significant token overhead
    const fileUploadMultiplier = getFileUploadMultiplier(fileUploads, fileSize);
    const fileProcessingTokens = baseTokens * fileUploadMultiplier;
    
    const totalTokensPerQuery = baseTokens + outputTokens + fileProcessingTokens;
    const monthlyTokens = monthlyQueries * totalTokensPerQuery;
    
    // LLM costs per 1K tokens (input/output average)
    const llmCosts = {
      'GPT-3.5 Turbo': 0.0015, // Average of input/output
      'GPT-4': 0.045, // Average of input/output  
      'Claude-3 Sonnet': 0.0045, // Average of input/output
      'Claude-3 Opus': 0.0225, // Average of input/output
      'Custom/Open Source': 0.001
    };
    
    const llmMonthlyCost = (monthlyTokens / 1000) * (llmCosts[llmModel] || 0.003);
    
    // API call costs (separate from LLM usage - infrastructure overhead)
    const apiCallCost = monthlyQueries * 0.001; // $0.001 per API call
    
    // File processing costs (OCR, document parsing, etc.)
    const fileProcessingCost = monthlyQueries * fileUploadMultiplier * 0.05;
    
    // Infrastructure costs
    const baseInfrastructure = Math.max(200, users * 0.5);
    const availabilityMultiplier = availability?.includes('Enterprise') ? 2.0 : availability?.includes('High') ? 1.5 : 1.0;
    const infrastructureCost = baseInfrastructure * availabilityMultiplier;
    
    // Storage costs (including file storage)
    const storageMultiplier = dataRetention?.includes('3+') ? 4 : dataRetention?.includes('1 year') ? 2 : 1;
    const baseStorageCost = (dataSize * 25 + monthlyQueries * 0.001) * storageMultiplier;
    const fileStorageCost = monthlyQueries * fileUploadMultiplier * 0.1; // Additional file storage
    const storageCost = baseStorageCost + fileStorageCost;
    
    // Data processing costs
    const dataProcessingCost = dataSize * 10 + monthlyQueries * 0.0001;
    
    // Security & compliance
    const securityCost = infrastructureCost * 0.15;
    
    const totalMonthlyCost = llmMonthlyCost + apiCallCost + fileProcessingCost + infrastructureCost + storageCost + dataProcessingCost + securityCost;
    const totalAnnualCost = totalMonthlyCost * 12;
    
    // Calculate additional metrics
    const averageResponseTime = queryComplexity?.includes('Complex') ? 8 : queryComplexity?.includes('Medium') ? 4 : 2;
    const estimatedConcurrency = Math.ceil(users * 0.1); // 10% concurrent usage
    
    return {
      monthly: totalMonthlyCost,
      annual: totalAnnualCost,
      breakdown: {
        llm: llmMonthlyCost,
        apiCalls: apiCallCost,
        fileProcessing: fileProcessingCost,
        infrastructure: infrastructureCost,
        storage: storageCost,
        dataProcessing: dataProcessingCost,
        security: securityCost
      },
      metrics: {
        monthlyQueries,
        monthlyTokens,
        costPerQuery: totalMonthlyCost / monthlyQueries,
        costPerUser: totalMonthlyCost / users,
        costPerToken: totalMonthlyCost / monthlyTokens * 1000, // Cost per 1K tokens
        tokensPerQuery: totalTokensPerQuery,
        averageResponseTime,
        estimatedConcurrency,
        dailyApiCalls: monthlyQueries / 30
      }
    };
  };

  const costs = calculateCosts();

  const CostBreakdown = () => (
    <div className="cost-breakdown">
      <div className="cost-summary">
        <div className="cost-header">
          <Calculator size={24} color="#3b82f6" />
          <h3>Your AI Project Cost Estimate</h3>
        </div>
        
        <div className="cost-totals">
          <div className="cost-total monthly">
            <span className="cost-label">Monthly Cost</span>
            <span className="cost-value">${costs.monthly.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
          </div>
          <div className="cost-total annual">
            <span className="cost-label">Annual Cost</span>
            <span className="cost-value">${costs.annual.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
          </div>
        </div>
      </div>

      <div className="cost-details">
        <h4>Cost Breakdown</h4>
        <div className="breakdown-items">
          <div className="breakdown-item">
            <div className="item-info">
              <Zap size={16} color="#f59e0b" />
              <span>LLM Usage ({projectData.llmModel})</span>
            </div>
            <span className="item-cost">${costs.breakdown.llm.toFixed(0)}/mo</span>
          </div>
          
          <div className="breakdown-item">
            <div className="item-info">
              <Send size={16} color="#06b6d4" />
              <span>API Calls & Processing</span>
            </div>
            <span className="item-cost">${costs.breakdown.apiCalls.toFixed(0)}/mo</span>
          </div>
          
          {costs.breakdown.fileProcessing > 0 && (
            <div className="breakdown-item">
              <div className="item-info">
                <Download size={16} color="#8b5cf6" />
                <span>File Upload Processing</span>
              </div>
              <span className="item-cost">${costs.breakdown.fileProcessing.toFixed(0)}/mo</span>
            </div>
          )}
          
          <div className="breakdown-item">
            <div className="item-info">
              <Cloud size={16} color="#3b82f6" />
              <span>Infrastructure & Hosting</span>
            </div>
            <span className="item-cost">${costs.breakdown.infrastructure.toFixed(0)}/mo</span>
          </div>
          
          <div className="breakdown-item">
            <div className="item-info">
              <Database size={16} color="#10b981" />
              <span>Storage & Data</span>
            </div>
            <span className="item-cost">${costs.breakdown.storage.toFixed(0)}/mo</span>
          </div>
          
          <div className="breakdown-item">
            <div className="item-info">
              <BarChart size={16} color="#8b5cf6" />
              <span>Data Processing</span>
            </div>
            <span className="item-cost">${costs.breakdown.dataProcessing.toFixed(0)}/mo</span>
          </div>
          
          <div className="breakdown-item">
            <div className="item-info">
              <Users size={16} color="#ef4444" />
              <span>Security & Compliance</span>
            </div>
            <span className="item-cost">${costs.breakdown.security.toFixed(0)}/mo</span>
          </div>
        </div>
      </div>

      <div className="cost-metrics">
        <h4>Comprehensive Usage Metrics</h4>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Monthly Queries</span>
            <span className="metric-value">{costs.metrics.monthlyQueries.toLocaleString()}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Daily API Calls</span>
            <span className="metric-value">{Math.round(costs.metrics.dailyApiCalls).toLocaleString()}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Monthly Tokens</span>
            <span className="metric-value">{(costs.metrics.monthlyTokens / 1000000).toFixed(1)}M</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Tokens per Query</span>
            <span className="metric-value">{Math.round(costs.metrics.tokensPerQuery).toLocaleString()}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Cost per Query</span>
            <span className="metric-value">${costs.metrics.costPerQuery.toFixed(3)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Cost per 1K Tokens</span>
            <span className="metric-value">${costs.metrics.costPerToken.toFixed(4)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Cost per User</span>
            <span className="metric-value">${costs.metrics.costPerUser.toFixed(0)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Response Time</span>
            <span className="metric-value">{costs.metrics.averageResponseTime}s</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Peak Concurrency</span>
            <span className="metric-value">{costs.metrics.estimatedConcurrency} users</span>
          </div>
        </div>
      </div>

      <div className="recommendations">
        <h4>💡 Advanced Cost Optimization Tips</h4>
        <ul>
          {costs.breakdown.llm > costs.breakdown.infrastructure && (
            <li><strong>LLM Optimization:</strong> Consider using GPT-3.5 Turbo for simple queries and GPT-4 only for complex analysis to reduce token costs by 60-80%</li>
          )}
          {costs.breakdown.fileProcessing > 50 && (
            <li><strong>File Processing:</strong> Implement file preprocessing and caching to reduce OCR/parsing costs by 40-60%</li>
          )}
          {projectData.users < 100 && (
            <li><strong>Infrastructure Scaling:</strong> Start with serverless architecture and scale to dedicated infrastructure as user base grows</li>
          )}
          {costs.breakdown.storage > 100 && (
            <li><strong>Data Management:</strong> Implement intelligent data tiering and archival policies to reduce storage costs by 30-50%</li>
          )}
          <li><strong>Caching Strategy:</strong> Implement semantic caching for common queries to reduce LLM API calls by 25-40%</li>
          <li><strong>Token Optimization:</strong> Use prompt engineering and response streaming to reduce token usage by 15-25%</li>
          <li><strong>Usage Controls:</strong> Implement rate limiting and usage quotas to prevent cost overruns during peak usage</li>
          {costs.metrics.monthlyTokens > 5000000 && (
            <li><strong>Volume Discounts:</strong> At your usage level, negotiate enterprise pricing with LLM providers for 20-30% savings</li>
          )}
          <li><strong>Monitoring & Alerts:</strong> Set up cost monitoring with alerts when spending exceeds 80% of budget</li>
        </ul>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary">
          <Download size={16} />
          Download Estimate
        </button>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          <Calculator size={16} />
          New Calculation
        </button>
      </div>
    </div>
  );

  return (
    <div className="ai-calculator">
      <div className="calculator-header">
        <div className="header-content">
          <Bot size={32} color="#3b82f6" />
          <div>
            <h1>AI Project Cost Calculator</h1>
            <p>Get instant estimates for your chatbot and AI initiatives</p>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">
                <p>{message.content}</p>
                {message.options && (
                  <div className="options">
                    {message.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        className="option-btn"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showCostBreakdown && <CostBreakdown />}

        {!showCostBreakdown && (
          <div className="input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(e)}
              placeholder="Type your answer or use the buttons above..."
              className="message-input"
            />
            <button onClick={handleInputSubmit} className="send-btn">
              <Send size={20} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-calculator {
          max-width: 800px;
          margin: 0 auto;
          background: #f8fafc;
          min-height: 100vh;
          padding-top: 2rem;
        }

        .calculator-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          text-align: center;
          border-radius: 1rem 1rem 0 0;
          margin: 0 2rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .header-content h1 {
          margin: 0;
          font-size: 1.8rem;
        }

        .header-content p {
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
        }

        .chat-container {
          background: white;
          margin: 0 2rem 2rem 2rem;
          border-radius: 0 0 1rem 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .messages {
          max-height: 60vh;
          overflow-y: auto;
          margin-bottom: 2rem;
        }

        .message {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }

        .message.bot {
          flex-direction: row;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.bot .message-avatar {
          background: #e0f2fe;
          color: #0284c7;
        }

        .message.user .message-avatar {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .message-content {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          max-width: 70%;
          border: 1px solid #e2e8f0;
        }

        .message.user .message-content {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .options {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .option-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .option-btn:hover {
          background: #e2e8f0;
          border-color: #3b82f6;
        }

        .input-form {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .message-input {
          flex: 1;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 1.5rem;
          outline: none;
          font-size: 1rem;
        }

        .message-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .send-btn {
          padding: 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .send-btn:hover {
          background: #2563eb;
        }

        .cost-breakdown {
          background: #f8fafc;
          border-radius: 1rem;
          padding: 2rem;
          margin-top: 2rem;
          border: 1px solid #e2e8f0;
        }

        .cost-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cost-header h3 {
          margin: 0;
          color: #1e293b;
        }

        .cost-totals {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .cost-total {
          text-align: center;
          padding: 1.5rem;
          border-radius: 0.75rem;
        }

        .cost-total.monthly {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cost-total.annual {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .cost-label {
          display: block;
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .cost-value {
          display: block;
          font-size: 2rem;
          font-weight: bold;
        }

        .cost-details h4 {
          margin: 2rem 0 1rem 0;
          color: #1e293b;
        }

        .breakdown-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .item-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .item-cost {
          font-weight: 600;
          color: #1e293b;
        }

        .cost-metrics {
          margin-top: 2rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .metric-item {
          text-align: center;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .metric-label {
          display: block;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          display: block;
          font-size: 1.25rem;
          font-weight: bold;
          color: #1e293b;
        }

        .recommendations {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 0.75rem;
          border: 1px solid #bbf7d0;
        }

        .recommendations h4 {
          margin: 0 0 1rem 0;
          color: #166534;
        }

        .recommendations ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .recommendations li {
          margin-bottom: 0.5rem;
          color: #166534;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: center;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: white;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .btn-secondary:hover {
          background: #f8fafc;
        }

        @media (max-width: 768px) {
          .ai-calculator {
            padding-top: 1rem;
          }
          
          .calculator-header,
          .chat-container {
            margin: 0 1rem;
          }
          
          .cost-totals {
            grid-template-columns: 1fr;
          }
          
          .message-content {
            max-width: 85%;
          }
          
          .header-content {
            flex-direction: column;
            text-align: center;
          }
          
          .header-content h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AICostCalculator;