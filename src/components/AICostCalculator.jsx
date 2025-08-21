import { BarChart, Bot, Briefcase, Building, Calculator, Cloud, Database, DollarSign, Download, FileText, Globe, Send, Target, TrendingUp, User, Users, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const AIBuildBuyCalculator = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'll help you build a comprehensive business case for your AI project. We'll analyze Build vs Buy options with full P&L projections. Let's start with your project scope - what type of AI solution are you considering?",
      options: ['Chatbot/Virtual Assistant', 'Document Analysis', 'Customer Support AI', 'Internal Knowledge System', 'Custom AI Solution']
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState('projectType');
  const [currentCategory, setCurrentCategory] = useState('project');
  const [userInput, setUserInput] = useState('');
  const [projectData, setProjectData] = useState({
    // Project basics
    projectType: '',
    users: 0,
    queries: 0,
    
    // OpEx details (expanded)
    dataSize: 0,
    queryComplexity: '',
    llmModel: '',
    fileUploads: '',
    integrations: '',
    
    // Build costs
    buildTeams: 1,
    buildMonths: 6,
    
    // Buy option
    buyOption: '',
    subscriptionCost: 0,
    
    // Business value & growth
    businessValue: 0,
    userGrowth: 0,
    valueGrowth: 0,
    
    // Current baseline costs
    currentCosts: 0
  });
  
  const [showBusinessCase, setShowBusinessCase] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const categoryConfig = {
    project: { color: '#3b82f6', icon: FileText, label: 'Project Scope' },
    opex: { color: '#10b981', icon: Cloud, label: 'Operating Costs' },
    build: { color: '#f59e0b', icon: Building, label: 'Build Analysis' },
    buy: { color: '#8b5cf6', icon: Globe, label: 'Buy Options' },
    growth: { color: '#06b6d4', icon: TrendingUp, label: 'Growth & Value' },
    baseline: { color: '#ef4444', icon: Target, label: 'Current State' }
  };

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
    if (range.includes('50-200')) return 125;
    if (range.includes('200-500')) return 350;
    if (range.includes('500-1000')) return 750;
    if (range.includes('1000+')) return 1500;
    return 100;
  };

  const processUserResponse = (response) => {
    switch (currentStep) {
      case 'projectType':
        setProjectData(prev => ({ ...prev, projectType: response }));
        setTimeout(() => {
          addMessage('bot', "Great! How many users will use this AI system?", 
            ['50-200 users', '200-500 users', '500-1000 users', '1000+ users']);
          setCurrentStep('users');
        }, 1000);
        break;
        
      case 'users':
        const userCount = extractNumber(response) || getUserCountFromRange(response);
        setProjectData(prev => ({ ...prev, users: userCount }));
        setTimeout(() => {
          setCurrentCategory('opex');
          addMessage('bot', "Now let's dive into operational costs. What's the expected query complexity?", 
            ['Simple Q&A (basic responses)', 'Medium complexity (detailed answers)', 'Complex analysis (multi-step reasoning)', 'Advanced AI (document processing)']);
          setCurrentStep('complexity');
        }, 1000);
        break;
        
      case 'complexity':
        setProjectData(prev => ({ ...prev, queryComplexity: response }));
        setTimeout(() => {
          addMessage('bot', "What's your preferred LLM model for this workload?", 
            ['GPT-3.5 Turbo (cost-effective)', 'GPT-4 (balanced performance)', 'Claude-3 Sonnet (enterprise)', 'Claude-3 Opus (premium)', 'Custom/Open Source']);
          setCurrentStep('llmModel');
        }, 1000);
        break;

      case 'llmModel':
        setProjectData(prev => ({ ...prev, llmModel: response }));
        setTimeout(() => {
          addMessage('bot', "How much data will users be working with?", 
            ['Small dataset (< 1GB)', 'Medium dataset (1-10GB)', 'Large dataset (10-100GB)', 'Enterprise dataset (100GB+)']);
          setCurrentStep('dataSize');
        }, 1000);
        break;

      case 'dataSize':
        const dataSizeValue = response.includes('Small') ? 0.5 : response.includes('Medium') ? 5 : response.includes('Large') ? 50 : 200;
        setProjectData(prev => ({ ...prev, dataSize: dataSizeValue }));
        // Set default values for removed questions
        setProjectData(prev => ({ 
          ...prev, 
          dataSize: dataSizeValue,
          fileUploads: 'Regular uploads (20-50%)', // Default assumption
          integrations: 'Standard (CRM, Email)' // Default assumption
        }));
        setTimeout(() => {
          setCurrentCategory('build');
          addMessage('bot', "Now for the BUILD option - How many development teams do you need?", 
            ['1 team (7 people)', '2 teams (14 people)', '3 teams (21 people)', '4+ teams (28+ people)']);
          setCurrentStep('buildTeams');
        }, 1000);
        break;
        

        
      case 'buildTeams':
        const teamCount = extractNumber(response) || 1;
        setProjectData(prev => ({ ...prev, buildTeams: teamCount }));
        setTimeout(() => {
          addMessage('bot', "How many months to build and deploy?", 
            ['3 months (MVP)', '6 months (Standard)', '9 months (Complex)', '12+ months (Enterprise)']);
          setCurrentStep('buildMonths');
        }, 1000);
        break;
        
      case 'buildMonths':
        const monthCount = extractNumber(response) || 6;
        setProjectData(prev => ({ ...prev, buildMonths: monthCount }));
        setTimeout(() => {
          setCurrentCategory('buy');
          addMessage('bot', "For the BUY option - what's your preferred vendor type?", 
            ['Enterprise SaaS ($50-200/user/month)', 'Mid-market Solution ($20-80/user/month)', 'Startup/Niche ($10-40/user/month)']);
          setCurrentStep('buyOption');
        }, 1000);
        break;
        
      case 'buyOption':
        setProjectData(prev => ({ ...prev, buyOption: response }));
        const avgCost = response.includes('Enterprise') ? 125 : response.includes('Mid-market') ? 50 : 25;
        setProjectData(prev => ({ ...prev, subscriptionCost: avgCost }));
        setTimeout(() => {
          setCurrentCategory('growth');
          addMessage('bot', "What's the annual business value you expect? (cost savings, revenue increase, efficiency gains)", 
            ['$100K - $500K', '$500K - $1M', '$1M - $2M', '$2M - $5M', '$5M+']);
          setCurrentStep('businessValue');
        }, 1000);
        break;
        
      case 'businessValue':
        let valueAmount = 250000; // default
        if (response.includes('$500K - $1M')) valueAmount = 750000;
        else if (response.includes('$1M - $2M')) valueAmount = 1500000;
        else if (response.includes('$2M - $5M')) valueAmount = 3000000;
        else if (response.includes('$5M+')) valueAmount = 7500000;
        
        setProjectData(prev => ({ ...prev, businessValue: valueAmount }));
        setTimeout(() => {
          addMessage('bot', "Expected annual user growth rate?", 
            ['0-10% (Stable)', '10-25% (Moderate growth)', '25-50% (High growth)', '50%+ (Rapid expansion)']);
          setCurrentStep('userGrowth');
        }, 1000);
        break;

      case 'userGrowth':
        let growthRate = 5; // default 5%
        if (response.includes('10-25%')) growthRate = 17;
        else if (response.includes('25-50%')) growthRate = 37;
        else if (response.includes('50%+')) growthRate = 75;
        
        setProjectData(prev => ({ ...prev, userGrowth: growthRate }));
        setTimeout(() => {
          addMessage('bot', "Expected annual business value growth?", 
            ['5-10% (Conservative)', '10-20% (Market growth)', '20-30% (Value optimization)', '30%+ (Aggressive expansion)']);
          setCurrentStep('valueGrowth');
        }, 1000);
        break;

      case 'valueGrowth':
        let valueGrowthRate = 7; // default 7%
        if (response.includes('10-20%')) valueGrowthRate = 15;
        else if (response.includes('20-30%')) valueGrowthRate = 25;
        else if (response.includes('30%+')) valueGrowthRate = 40;
        
        setProjectData(prev => ({ ...prev, valueGrowth: valueGrowthRate }));
        setTimeout(() => {
          setCurrentCategory('baseline');
          addMessage('bot', "Final question - what do you currently spend annually on this process? (baseline for comparison)", 
            ['$0 - $50K', '$50K - $200K', '$200K - $500K', '$500K - $1M', '$1M+']);
          setCurrentStep('currentCosts');
        }, 1000);
        break;
        
      case 'currentCosts':
        let currentAmount = 25000; // default
        if (response.includes('$50K - $200K')) currentAmount = 125000;
        else if (response.includes('$200K - $500K')) currentAmount = 350000;
        else if (response.includes('$500K - $1M')) currentAmount = 750000;
        else if (response.includes('$1M+')) currentAmount = 1500000;
        
        setProjectData(prev => ({ ...prev, currentCosts: currentAmount }));
        setTimeout(() => {
          addMessage('bot', "Perfect! I have all the information needed. Calculating your comprehensive Build vs Buy business case with growth projections...");
          setTimeout(() => {
            setShowBusinessCase(true);
            addMessage('bot', "Here's your complete 4-year business case analysis with growth modeling! 📊");
          }, 2000);
        }, 1000);
        break;
        
      default:
        break;
    }
  };

  const calculateBusinessCase = () => {
    const { users, buildTeams, buildMonths, subscriptionCost, businessValue, currentCosts, queryComplexity, llmModel, dataSize, fileUploads, integrations, userGrowth, valueGrowth } = projectData;
    
    // Build costs calculation
    const leadRate = 132; // per hour
    const developerRate = 25; // per hour
    const hoursPerMonth = 20 * 8 * 4; // 20 days * 8 hours * 4 weeks
    
    const monthlyTeamCost = (leadRate + (developerRate * 6)) * hoursPerMonth; // 1 lead + 6 devs
    const totalBuildCost = monthlyTeamCost * buildTeams * buildMonths;
    
    // Enhanced OpEx calculation
    const baseMonthlyOpEx = Math.max(800, users * 3); // Increased base infrastructure
    
    // Complexity multipliers
    const complexityMultiplier = queryComplexity?.includes('Advanced') ? 4.5 : 
                                queryComplexity?.includes('Complex') ? 3.5 : 
                                queryComplexity?.includes('Medium') ? 2.2 : 1.5;
    
    // LLM cost multipliers
    const llmMultiplier = llmModel?.includes('Opus') ? 3.5 : 
                         llmModel?.includes('GPT-4') ? 2.8 : 
                         llmModel?.includes('Sonnet') ? 2.2 : 
                         llmModel?.includes('GPT-3.5') ? 1.0 : 0.8;
    
    // Data size multiplier
    const dataMultiplier = dataSize > 100 ? 2.5 : dataSize > 10 ? 1.8 : dataSize > 1 ? 1.3 : 1.0;
    
    // File processing multiplier
    const fileMultiplier = fileUploads?.includes('Heavy') ? 2.2 : 
                          fileUploads?.includes('Regular') ? 1.6 : 
                          fileUploads?.includes('Occasional') ? 1.2 : 1.0;
    
    // Integration complexity multiplier
    const integrationMultiplier = integrations?.includes('Enterprise') ? 1.8 : 
                                 integrations?.includes('Advanced') ? 1.5 : 
                                 integrations?.includes('Standard') ? 1.2 : 1.0;
    
    const monthlyOpEx = baseMonthlyOpEx * complexityMultiplier * llmMultiplier * dataMultiplier * fileMultiplier * integrationMultiplier;
    const annualOpEx = monthlyOpEx * 12;
    
    // Buy option calculation with growth
    const annualBuyOption = subscriptionCost * users * 12;
    
    // 4-year projections with growth
    const years = [1, 2, 3, 4];
    const buildScenario = years.map(year => {
      const yearlyUserGrowth = Math.pow(1 + userGrowth/100, year - 1);
      const yearlyValueGrowth = Math.pow(1 + valueGrowth/100, year - 1);
      const adjustedUsers = Math.round(users * yearlyUserGrowth);
      const adjustedOpEx = annualOpEx * yearlyUserGrowth * Math.pow(1.05, year - 1); // 5% annual cost inflation
      
      return {
        year,
        users: adjustedUsers,
        buildCosts: year === 1 ? totalBuildCost : 0,
        opexCosts: adjustedOpEx,
        totalCosts: (year === 1 ? totalBuildCost : 0) + adjustedOpEx,
        businessValue: businessValue * yearlyValueGrowth,
        netValue: (businessValue * yearlyValueGrowth) - ((year === 1 ? totalBuildCost : 0) + adjustedOpEx),
        savings: (businessValue * yearlyValueGrowth) - currentCosts
      };
    });
    
    const buyScenario = years.map(year => {
      const yearlyUserGrowth = Math.pow(1 + userGrowth/100, year - 1);
      const yearlyValueGrowth = Math.pow(1 + valueGrowth/100, year - 1);
      const adjustedUsers = Math.round(users * yearlyUserGrowth);
      const adjustedSubscription = annualBuyOption * yearlyUserGrowth * Math.pow(1.08, year - 1); // 8% annual price increase
      
      return {
        year,
        users: adjustedUsers,
        subscriptionCosts: adjustedSubscription,
        businessValue: businessValue * yearlyValueGrowth * 0.85, // 15% less value due to less customization
        netValue: (businessValue * yearlyValueGrowth * 0.85) - adjustedSubscription,
        savings: (businessValue * yearlyValueGrowth * 0.85) - currentCosts
      };
    });
    
    // Break-even analysis
    const buildCumulative = buildScenario.reduce((acc, year) => {
      const prevTotal = acc.length > 0 ? acc[acc.length - 1].cumulative : 0;
      acc.push({
        year: year.year,
        cumulative: prevTotal + year.netValue
      });
      return acc;
    }, []);
    
    const buyCumulative = buyScenario.reduce((acc, year) => {
      const prevTotal = acc.length > 0 ? acc[acc.length - 1].cumulative : 0;
      acc.push({
        year: year.year,
        cumulative: prevTotal + year.netValue
      });
      return acc;
    }, []);
    
    const buildBreakEven = buildCumulative.find(y => y.cumulative > 0)?.year || 'N/A';
    const buyBreakEven = buyCumulative.find(y => y.cumulative > 0)?.year || 'N/A';
    
    const totalBuild4Year = buildScenario.reduce((sum, year) => sum + year.totalCosts, 0);
    const totalBuy4Year = buyScenario.reduce((sum, year) => sum + year.subscriptionCosts, 0);
    const savings4Year = totalBuy4Year - totalBuild4Year;
    
    return {
      buildCosts: {
        totalBuildCost,
        monthlyTeamCost,
        annualOpEx,
        monthlyOpEx
      },
      buyCosts: {
        annualBuyOption
      },
      scenarios: {
        build: buildScenario,
        buy: buyScenario
      },
      summary: {
        totalBuild4Year,
        totalBuy4Year,
        savings4Year,
        buildBreakEven,
        buyBreakEven,
        recommendedOption: savings4Year > 0 ? 'Build' : 'Buy'
      },
      growth: {
        userGrowth: userGrowth,
        valueGrowth: valueGrowth,
        finalUsers: buildScenario[3].users,
        finalValue: buildScenario[3].businessValue
      }
    };
  };

  const businessCase = showBusinessCase ? calculateBusinessCase() : null;

  const BusinessCaseView = () => (
    <div className="business-case">
      {/* Executive Summary */}
      <div className="executive-summary">
        <div className="summary-header">
          <Briefcase size={24} color="#3b82f6" />
          <h3>Executive Summary</h3>
        </div>
        
        <div className="recommendation-card">
          <div className="recommendation">
            <Target size={20} />
            <span className="rec-label">Recommended Option:</span>
            <span className={`rec-value ${businessCase.summary.recommendedOption.toLowerCase()}`}>
              {businessCase.summary.recommendedOption}
            </span>
          </div>
          <div className="savings">
            <DollarSign size={20} />
            <span>4-Year Net Savings: </span>
            <span className={businessCase.summary.savings4Year > 0 ? 'positive' : 'negative'}>
              ${Math.abs(businessCase.summary.savings4Year).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="growth-summary">
          <div className="growth-metric">
            <TrendingUp size={16} />
            <span>User Growth: {businessCase.growth.userGrowth}% annually</span>
          </div>
          <div className="growth-metric">
            <BarChart size={16} />
            <span>Value Growth: {businessCase.growth.valueGrowth}% annually</span>
          </div>
          <div className="growth-metric">
            <Users size={16} />
            <span>Year 4 Users: {businessCase.growth.finalUsers.toLocaleString()}</span>
          </div>
          <div className="growth-metric">
            <DollarSign size={16} />
            <span>Year 4 Value: ${(businessCase.growth.finalValue/1000000).toFixed(1)}M</span>
          </div>
        </div>
      </div>

      {/* OpEx Costs Breakdown */}
      <div className="cost-section">
        <h4><Cloud size={18} /> OpEx Breakdown (Annual)</h4>
        <div className="opex-breakdown">
          <div className="opex-item">
            <div className="item-info">
              <Zap size={16} color="#f59e0b" />
              <span>LLM Usage ({projectData.llmModel})</span>
            </div>
            <span className="item-cost">${(businessCase.buildCosts.annualOpEx * 0.4).toFixed(0)}/year</span>
          </div>
          
          <div className="opex-item">
            <div className="item-info">
              <Send size={16} color="#06b6d4" />
              <span>API Calls & Processing</span>
            </div>
            <span className="item-cost">${(businessCase.buildCosts.annualOpEx * 0.15).toFixed(0)}/year</span>
          </div>
          
          <div className="opex-item">
            <div className="item-info">
              <Download size={16} color="#8b5cf6" />
              <span>File Processing & Storage</span>
            </div>
            <span className="item-cost">${(businessCase.buildCosts.annualOpEx * 0.12).toFixed(0)}/year</span>
          </div>
          
          <div className="opex-item">
            <div className="item-info">
              <Cloud size={16} color="#3b82f6" />
              <span>Infrastructure & Hosting</span>
            </div>
            <span className="item-cost">${(businessCase.buildCosts.annualOpEx * 0.2).toFixed(0)}/year</span>
          </div>
          
          <div className="opex-item">
            <div className="item-info">
              <Database size={16} color="#10b981" />
              <span>Storage & Data Management</span>
            </div>
            <span className="item-cost">${(businessCase.buildCosts.annualOpEx * 0.08).toFixed(0)}/year</span>
          </div>
          
          <div className="opex-item">
            <div className="item-info">
              <Users size={16} color="#ef4444" />
              <span>Security & Compliance</span>
            </div>
            <span className="item-cost">${(businessCase.buildCosts.annualOpEx * 0.05).toFixed(0)}/year</span>
          </div>
        </div>
        
        <div className="opex-metrics">
          <h5>📊 Usage Metrics</h5>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">Monthly Queries</span>
              <span className="metric-value">{(projectData.users * 10 * 30).toLocaleString()}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Daily API Calls</span>
              <span className="metric-value">{(projectData.users * 10).toLocaleString()}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Est. Monthly Tokens</span>
              <span className="metric-value">{((projectData.users * 10 * 30 * 2000) / 1000000).toFixed(1)}M</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Data Storage</span>
              <span className="metric-value">{projectData.dataSize}GB</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Cost per Query</span>
              <span className="metric-value">${(businessCase.buildCosts.annualOpEx / (projectData.users * 10 * 365)).toFixed(3)}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Cost per User/Month</span>
              <span className="metric-value">${(businessCase.buildCosts.annualOpEx / projectData.users / 12).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Build Costs Breakdown */}
      <div className="cost-section">
        <h4><Building size={18} /> Build Option Breakdown</h4>
        <div className="build-breakdown">
          <div className="build-item">
            <span>Development Team Cost ({projectData.buildTeams} team{projectData.buildTeams > 1 ? 's' : ''})</span>
            <span>${businessCase.buildCosts.monthlyTeamCost.toLocaleString()}/month</span>
          </div>
          <div className="build-item">
            <span>Total Build Investment</span>
            <span>${businessCase.buildCosts.totalBuildCost.toLocaleString()}</span>
          </div>
          <div className="build-item">
            <span>Year 1 Operating Costs</span>
            <span>${businessCase.buildCosts.annualOpEx.toLocaleString()}/year</span>
          </div>
          <div className="build-item">
            <span>Monthly OpEx (Year 1)</span>
            <span>${businessCase.buildCosts.monthlyOpEx.toLocaleString()}/month</span>
          </div>
        </div>
      </div>

      {/* 4-Year P&L Comparison with Growth */}
      <div className="pnl-section">
        <h4><BarChart size={18} /> 4-Year P&L Comparison (with Growth Projections)</h4>
        <div className="pnl-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Users</th>
                <th>Build Costs</th>
                <th>Build OpEx</th>
                <th>Build Value</th>
                <th>Build Net</th>
                <th>Buy Costs</th>
                <th>Buy Value</th>
                <th>Buy Net</th>
              </tr>
            </thead>
            <tbody>
              {businessCase.scenarios.build.map((buildYear, index) => {
                const buyYear = businessCase.scenarios.buy[index];
                return (
                  <tr key={buildYear.year}>
                    <td>Year {buildYear.year}</td>
                    <td>{buildYear.users.toLocaleString()}</td>
                    <td>${buildYear.buildCosts.toLocaleString()}</td>
                    <td>${buildYear.opexCosts.toLocaleString()}</td>
                    <td>${(buildYear.businessValue/1000).toFixed(0)}K</td>
                    <td className={buildYear.netValue > 0 ? 'positive' : 'negative'}>
                      ${(buildYear.netValue/1000).toFixed(0)}K
                    </td>
                    <td>${buyYear.subscriptionCosts.toLocaleString()}</td>
                    <td>${(buyYear.businessValue/1000).toFixed(0)}K</td>
                    <td className={buyYear.netValue > 0 ? 'positive' : 'negative'}>
                      ${(buyYear.netValue/1000).toFixed(0)}K
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td><strong>4-Year Total</strong></td>
                <td><strong>{businessCase.growth.finalUsers.toLocaleString()}</strong></td>
                <td><strong>${businessCase.buildCosts.totalBuildCost.toLocaleString()}</strong></td>
                <td><strong>${businessCase.scenarios.build.reduce((sum, y) => sum + y.opexCosts, 0).toLocaleString()}</strong></td>
                <td><strong>${(businessCase.scenarios.build.reduce((sum, y) => sum + y.businessValue, 0)/1000).toFixed(0)}K</strong></td>
                <td><strong>${(businessCase.scenarios.build.reduce((sum, y) => sum + y.netValue, 0)/1000).toFixed(0)}K</strong></td>
                <td><strong>${businessCase.summary.totalBuy4Year.toLocaleString()}</strong></td>
                <td><strong>${(businessCase.scenarios.buy.reduce((sum, y) => sum + y.businessValue, 0)/1000).toFixed(0)}K</strong></td>
                <td><strong>${(businessCase.scenarios.buy.reduce((sum, y) => sum + y.netValue, 0)/1000).toFixed(0)}K</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Break-even Analysis */}
      <div className="breakeven-section">
        <h4><TrendingUp size={18} /> Break-even Analysis</h4>
        <div className="breakeven-grid">
          <div className="breakeven-card build">
            <h5>Build Option</h5>
            <div className="breakeven-metric">
              <span>Break-even:</span>
              <span>Year {businessCase.summary.buildBreakEven}</span>
            </div>
            <div className="breakeven-metric">
              <span>4-Year ROI:</span>
              <span>{((businessCase.scenarios.build.reduce((sum, y) => sum + y.netValue, 0) / businessCase.buildCosts.totalBuildCost) * 100).toFixed(0)}%</span>
            </div>
          </div>
          
          <div className="breakeven-card buy">
            <h5>Buy Option</h5>
            <div className="breakeven-metric">
              <span>Break-even:</span>
              <span>Year {businessCase.summary.buyBreakEven}</span>
            </div>
            <div className="breakeven-metric">
              <span>4-Year ROI:</span>
              <span>{((businessCase.scenarios.buy.reduce((sum, y) => sum + y.netValue, 0) / businessCase.buyCosts.annualBuyOption) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Considerations */}
      <div className="strategic-section">
        <h4>💡 Strategic Considerations</h4>
        <div className="considerations-grid">
          <div className="consideration-card">
            <h5>Build Advantages</h5>
            <ul>
              <li>Full customization and control</li>
              <li>Intellectual property ownership</li>
              <li>Better long-term cost efficiency</li>
              <li>Unlimited scalability</li>
              <li>Custom integrations</li>
            </ul>
          </div>
          <div className="consideration-card">
            <h5>Buy Advantages</h5>
            <ul>
              <li>Faster time to market</li>
              <li>Lower initial investment</li>
              <li>Vendor support and maintenance</li>
              <li>Reduced technical risk</li>
              <li>Regular feature updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-primary">
          <Download size={16} />
          Export Business Case
        </button>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          <Calculator size={16} />
          New Analysis
        </button>
      </div>
    </div>
  );

  const ProgressBar = () => {
    const categories = ['project', 'opex', 'build', 'buy', 'growth', 'baseline'];
    const currentIndex = categories.indexOf(currentCategory);
    const progress = ((currentIndex + 1) / categories.length) * 100;

    return (
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: categoryConfig[currentCategory].color }}>
          </div>
        </div>
        <div className="category-indicator">
          <div className="category-icon" style={{ color: categoryConfig[currentCategory].color }}>
            {React.createElement(categoryConfig[currentCategory].icon, { size: 20 })}
          </div>
          <span className="category-label" style={{ color: categoryConfig[currentCategory].color }}>
            {categoryConfig[currentCategory].label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="ai-calculator">
      <div className="calculator-header">
        <div className="header-content">
          <Bot size={32} color="#3b82f6" />
          <div>
            <h1>AI Build vs Buy Calculator</h1>
            <p>Complete business case analysis with 4-year P&L projections</p>
          </div>
        </div>
      </div>

      <div className="chat-container">
        {!showBusinessCase && <ProgressBar />}
        
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
                        style={{ borderColor: categoryConfig[currentCategory].color + '20' }}
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

        {showBusinessCase && <BusinessCaseView />}

        {!showBusinessCase && (
          <div className="input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit(e)}
              placeholder="Type your answer or use the buttons above..."
              className="message-input"
              style={{ borderColor: categoryConfig[currentCategory].color + '40' }}
            />
            <button 
              onClick={handleInputSubmit} 
              className="send-btn"
              style={{ backgroundColor: categoryConfig[currentCategory].color }}
            >
              <Send size={20} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-calculator {
          max-width: 1000px;
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

        .progress-container {
          margin-bottom: 2rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: all 0.5s ease;
          animation: progressPulse 2s ease-in-out infinite;
        }

        @keyframes progressPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .category-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }

        .category-icon {
          transition: color 0.3s ease;
        }

        .category-label {
          font-weight: 600;
          transition: color 0.3s ease;
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
          transition: all 0.3s ease;
          text-align: left;
        }

        .option-btn:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .input-form {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .message-input {
          flex: 1;
          padding: 1rem;
          border: 2px solid #d1d5db;
          border-radius: 1.5rem;
          outline: none;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .message-input:focus {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .send-btn {
          padding: 1rem;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .send-btn:hover {
          transform: scale(1.05);
        }

        .business-case {
          background: #f8fafc;
          border-radius: 1rem;
          padding: 2rem;
          margin-top: 2rem;
          border: 1px solid #e2e8f0;
        }

        .executive-summary {
          margin-bottom: 2rem;
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .summary-header h3 {
          margin: 0;
          color: #1e293b;
        }

        .recommendation-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 1rem;
        }

        .recommendation, .savings {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rec-value.build {
          color: #059669;
          font-weight: bold;
        }

        .rec-value.buy {
          color: #dc2626;
          font-weight: bold;
        }

        .positive {
          color: #059669;
          font-weight: bold;
        }

        .negative {
          color: #dc2626;
          font-weight: bold;
        }

        .growth-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          background: white;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .growth-metric {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #1e293b;
        }

        .cost-section h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 2rem 0 1rem 0;
          color: #1e293b;
        }

        .opex-breakdown {
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          margin-bottom: 1.5rem;
        }

        .opex-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .opex-item:last-child {
          border-bottom: none;
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

        .opex-metrics {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .opex-metrics h5 {
          margin: 0 0 1rem 0;
          color: #1e293b;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }

        .metric-item {
          text-align: center;
          padding: 1rem;
          background: #f8fafc;
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

        .build-breakdown {
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .build-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .build-item:last-child {
          border-bottom: none;
        }

        .pnl-section {
          margin: 2rem 0;
        }

        .pnl-table {
          overflow-x: auto;
        }

        .pnl-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          font-size: 0.875rem;
        }

        .pnl-table th,
        .pnl-table td {
          padding: 0.75rem 0.5rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .pnl-table th {
          background: #f8fafc;
          font-weight: 600;
          color: #1e293b;
        }

        .total-row {
          background: #f8fafc;
        }

        .breakeven-section {
          margin: 2rem 0;
        }

        .breakeven-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .breakeven-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .breakeven-card h5 {
          margin: 0 0 1rem 0;
          color: #1e293b;
        }

        .breakeven-metric {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .strategic-section {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 0.75rem;
          border: 1px solid #bbf7d0;
        }

        .strategic-section h4 {
          margin: 0 0 1rem 0;
          color: #166534;
        }

        .considerations-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .consideration-card {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #bbf7d0;
        }

        .consideration-card h5 {
          margin: 0 0 0.5rem 0;
          color: #166534;
        }

        .consideration-card ul {
          margin: 0;
          padding-left: 1.25rem;
        }

        .consideration-card li {
          margin-bottom: 0.25rem;
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
          
          .recommendation-card,
          .breakeven-grid,
          .considerations-grid,
          .growth-summary {
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

          .pnl-table {
            font-size: 0.75rem;
          }

          .pnl-table th,
          .pnl-table td {
            padding: 0.5rem 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AIBuildBuyCalculator;