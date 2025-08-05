import {
    Activity,
    Bell,
    Building2,
    ChevronDown,
    Cloud,
    Database,
    DollarSign,
    Download, Filter,
    Layers,
    Search,
    Target,
    TrendingUp,
    UserCheck,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashboardView = ({ viewType, handleBackToLanding }) => {
  const [selectedCIO, setSelectedCIO] = useState('Sarah Chen - Technology');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q3 2025');
  const [selectedPersona, setSelectedPersona] = useState('All Personas');
  const [selectedWorkspace, setSelectedWorkspace] = useState('All Types');

  // Mock data
  const cioGroups = [
    'Sarah Chen - Technology',
    'Michael Rodriguez - Operations', 
    'Jennifer Kim - Digital Banking',
    'David Thompson - Risk & Compliance'
  ];

  const platforms = [
    'All Platforms',
    'Snowflake',
    'AWS Services',
    'Azure Analytics',
    'Databricks'
  ];

  const personas = [
    'All Personas',
    'Data Scientists',
    'Data Analysts', 
    'Business Analysts',
    'Data Engineers',
    'ML Engineers',
    'Report Developers'
  ];

  const workspaceTypes = [
    'All Types',
    'Production Services',
    'User Workspaces'
  ];

  const monthlyTrends = [
    { month: 'Jan', total: 45000, production: 28000, workspace: 17000 },
    { month: 'Feb', total: 52000, production: 32000, workspace: 20000 },
    { month: 'Mar', total: 48000, production: 30000, workspace: 18000 },
    { month: 'Apr', total: 58000, production: 36000, workspace: 22000 },
    { month: 'May', total: 61000, production: 38000, workspace: 23000 },
    { month: 'Jun', total: 67000, production: 42000, workspace: 25000 }
  ];

  const orgBreakdown = [
    { name: 'Trading Systems', value: 28000, color: '#3b82f6' },
    { name: 'Risk Analytics', value: 18500, color: '#8b5cf6' },
    { name: 'Customer Data', value: 12000, color: '#06b6d4' },
    { name: 'Regulatory Reporting', value: 8500, color: '#10b981' }
  ];

  const personaBreakdown = [
    { name: 'Data Scientists', value: 24000, users: 45, avgCost: 533, color: '#3b82f6' },
    { name: 'Data Analysts', value: 18000, users: 78, avgCost: 231, color: '#8b5cf6' },
    { name: 'Business Analysts', value: 12000, users: 92, avgCost: 130, color: '#06b6d4' },
    { name: 'Data Engineers', value: 8500, users: 22, avgCost: 386, color: '#10b981' },
    { name: 'ML Engineers', value: 4500, users: 10, avgCost: 450, color: '#f59e0b' }
  ];

  const platformData = {
    trends: [
      { month: 'Jan', snowflake: 28000, aws: 15000, azure: 8000, databricks: 4000 },
      { month: 'Feb', snowflake: 32000, aws: 17000, azure: 9000, databricks: 5000 },
      { month: 'Mar', snowflake: 30000, aws: 16000, azure: 8500, databricks: 4500 },
      { month: 'Apr', snowflake: 36000, aws: 19000, azure: 10000, databricks: 6000 },
      { month: 'May', snowflake: 38000, aws: 20000, azure: 10500, databricks: 5500 },
      { month: 'Jun', snowflake: 42000, aws: 22000, azure: 11000, databricks: 6000 }
    ],
    breakdown: [
      { name: 'Snowflake', value: 42000, color: '#3b82f6' },
      { name: 'AWS Services', value: 22000, color: '#f59e0b' },
      { name: 'Azure Analytics', value: 11000, color: '#06b6d4' },
      { name: 'Databricks', value: 6000, color: '#8b5cf6' }
    ]
  };

  const workspaceData = {
    trends: [
      { month: 'Jan', production: 28000, userWorkspace: 17000, subscriptions: 12000 },
      { month: 'Feb', production: 32000, userWorkspace: 20000, subscriptions: 14000 },
      { month: 'Mar', production: 30000, userWorkspace: 18000, subscriptions: 13000 },
      { month: 'Apr', production: 36000, userWorkspace: 22000, subscriptions: 16000 },
      { month: 'May', production: 38000, userWorkspace: 23000, subscriptions: 17000 },
      { month: 'Jun', production: 42000, userWorkspace: 25000, subscriptions: 18500 }
    ],
    breakdown: [
      { name: 'Shared Production', value: 42000, color: '#10b981' },
      { name: 'Team Workspaces', value: 15000, color: '#3b82f6' },
      { name: 'Personal Sandboxes', value: 10000, color: '#8b5cf6' }
    ]
  };

  const topUsers = [
    { name: 'Analytics Team Lead', org: 'Trading Systems', persona: 'Data Scientist', cost: 4200, usage: '850 hrs', type: 'Production + Workspace' },
    { name: 'Risk Modeler', org: 'Risk Analytics', persona: 'Data Scientist', cost: 3800, usage: '720 hrs', type: 'Workspace' },
    { name: 'Senior Analyst', org: 'Customer Data', persona: 'Data Analyst', cost: 3200, usage: '640 hrs', type: 'Production' },
    { name: 'Compliance Lead', org: 'Regulatory Reporting', persona: 'Business Analyst', cost: 2900, usage: '580 hrs', type: 'Production' }
  ];

  const renderMetrics = () => {
    switch (viewType) {
      case 'cio':
        return (
          <>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Total Org Costs</p>
                  <p className="metric-value">$67,000</p>
                  <p className="metric-change positive">+12% vs last month</p>
                </div>
                <div className="metric-icon blue">
                  <Building2 size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Reporting Units</p>
                  <p className="metric-value">12</p>
                  <p className="metric-change">Under Sarah Chen</p>
                </div>
                <div className="metric-icon green">
                  <Users size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Cost per Employee</p>
                  <p className="metric-value">$271</p>
                  <p className="metric-change">247 total users</p>
                </div>
                <div className="metric-icon purple">
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Budget Utilization</p>
                  <p className="metric-value">89%</p>
                  <p className="metric-change">$75K allocated</p>
                </div>
                <div className="metric-icon cyan">
                  <Target size={24} />
                </div>
              </div>
            </div>
          </>
        );
      case 'platform':
        return (
          <>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Total Platform Costs</p>
                  <p className="metric-value">$81,000</p>
                  <p className="metric-change positive">+8% vs last month</p>
                </div>
                <div className="metric-icon blue">
                  <Cloud size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Active Platforms</p>
                  <p className="metric-value">4</p>
                  <p className="metric-change">Snowflake leads at 52%</p>
                </div>
                <div className="metric-icon green">
                  <Layers size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Avg Cost/Platform</p>
                  <p className="metric-value">$20.25K</p>
                  <p className="metric-change">Varies by usage</p>
                </div>
                <div className="metric-icon purple">
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Efficiency Score</p>
                  <p className="metric-value">87%</p>
                  <p className="metric-change positive">+3% improvement</p>
                </div>
                <div className="metric-icon cyan">
                  <Activity size={24} />
                </div>
              </div>
            </div>
          </>
        );
      case 'persona':
        return (
          <>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Total User Costs</p>
                  <p className="metric-value">$67,000</p>
                  <p className="metric-change positive">247 active users</p>
                </div>
                <div className="metric-icon blue">
                  <UserCheck size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Top Persona</p>
                  <p className="metric-value">Data Scientists</p>
                  <p className="metric-change">$533 avg cost</p>
                </div>
                <div className="metric-icon green">
                  <Users size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Most Efficient</p>
                  <p className="metric-value">Business Analysts</p>
                  <p className="metric-change">$130 avg cost</p>
                </div>
                <div className="metric-icon purple">
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">User Growth</p>
                  <p className="metric-value">+15%</p>
                  <p className="metric-change positive">QoQ increase</p>
                </div>
                <div className="metric-icon cyan">
                  <Activity size={24} />
                </div>
              </div>
            </div>
          </>
        );
      case 'workspace':
        return (
          <>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Production Costs</p>
                  <p className="metric-value">$42,000</p>
                  <p className="metric-change">Usage-based billing</p>
                </div>
                <div className="metric-icon blue">
                  <Database size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Workspace Costs</p>
                  <p className="metric-value">$25,000</p>
                  <p className="metric-change">Subscription-based</p>
                </div>
                <div className="metric-icon green">
                  <Users size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Workspace Efficiency</p>
                  <p className="metric-value">73%</p>
                  <p className="metric-change">Utilization rate</p>
                </div>
                <div className="metric-icon purple">
                  <Target size={24} />
                </div>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-text">
                  <p className="metric-label">Cost Savings</p>
                  <p className="metric-value">$8,500</p>
                  <p className="metric-change positive">vs separate instances</p>
                </div>
                <div className="metric-icon cyan">
                  <DollarSign size={24} />
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderCharts = () => {
    switch (viewType) {
      case 'cio':
        return (
          <>
            <div className="chart-card">
              <div className="chart-header">
                <h3>Cost Trends by Organization</h3>
                <button className="icon-button">
                  <Download size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="Total Org Cost" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Cost by Organizational Unit</h3>
                <button className="icon-button">
                  <Filter size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orgBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: $${value.toLocaleString()}`}
                  >
                    {orgBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 'platform':
        return (
          <>
            <div className="chart-card">
              <div className="chart-header">
                <h3>Platform Cost Comparison</h3>
                <button className="icon-button">
                  <Download size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={platformData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Line type="monotone" dataKey="snowflake" stroke="#3b82f6" strokeWidth={2} name="Snowflake" />
                  <Line type="monotone" dataKey="aws" stroke="#f59e0b" strokeWidth={2} name="AWS" />
                  <Line type="monotone" dataKey="azure" stroke="#06b6d4" strokeWidth={2} name="Azure" />
                  <Line type="monotone" dataKey="databricks" stroke="#8b5cf6" strokeWidth={2} name="Databricks" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Platform Usage & Efficiency</h3>
                <button className="icon-button">
                  <Filter size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData.breakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: $${value.toLocaleString()}`}
                  >
                    {platformData.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 'persona':
        return (
          <>
            <div className="chart-card">
              <div className="chart-header">
                <h3>Cost by User Persona Over Time</h3>
                <button className="icon-button">
                  <Download size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Bar dataKey="total" fill="#3b82f6" name="Total Usage" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Persona Cost Distribution</h3>
                <button className="icon-button">
                  <Filter size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={personaBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: $${value.toLocaleString()}`}
                  >
                    {personaBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 'workspace':
        return (
          <>
            <div className="chart-card">
              <div className="chart-header">
                <h3>Production vs Workspace Costs</h3>
                <button className="icon-button">
                  <Download size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={workspaceData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={3} name="Production" />
                  <Line type="monotone" dataKey="userWorkspace" stroke="#3b82f6" strokeWidth={3} name="User Workspaces" />
                  <Line type="monotone" dataKey="subscriptions" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Subscriptions" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Workspace Efficiency Analysis</h3>
                <button className="icon-button">
                  <Filter size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={workspaceData.breakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: $${value.toLocaleString()}`}
                  >
                    {workspaceData.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (viewType) {
      case 'cio':
        return (
          <>
            <div className="control-group">
              <label>CIO Organization</label>
              <div className="select-wrapper">
                <select value={selectedCIO} onChange={(e) => setSelectedCIO(e.target.value)}>
                  {cioGroups.map(cio => (
                    <option key={cio} value={cio}>{cio}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
            <div className="control-group">
              <label>Org Level</label>
              <div className="select-wrapper">
                <select>
                  <option>All Levels</option>
                  <option>Division Level</option>
                  <option>Department Level</option>
                  <option>Team Level</option>
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
          </>
        );
      case 'platform':
        return (
          <>
            <div className="control-group">
              <label>Platform</label>
              <div className="select-wrapper">
                <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
            <div className="control-group">
              <label>Service Type</label>
              <div className="select-wrapper">
                <select>
                  <option>All Services</option>
                  <option>Compute</option>
                  <option>Storage</option>
                  <option>Analytics</option>
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
          </>
        );
      case 'persona':
        return (
          <>
            <div className="control-group">
              <label>User Persona</label>
              <div className="select-wrapper">
                <select value={selectedPersona} onChange={(e) => setSelectedPersona(e.target.value)}>
                  {personas.map(persona => (
                    <option key={persona} value={persona}>{persona}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
            <div className="control-group">
              <label>Experience Level</label>
              <div className="select-wrapper">
                <select>
                  <option>All Levels</option>
                  <option>Junior (0-2 years)</option>
                  <option>Mid (3-5 years)</option>
                  <option>Senior (6+ years)</option>
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
          </>
        );
      case 'workspace':
        return (
          <>
            <div className="control-group">
              <label>Workspace Type</label>
              <div className="select-wrapper">
                <select value={selectedWorkspace} onChange={(e) => setSelectedWorkspace(e.target.value)}>
                  {workspaceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
            <div className="control-group">
              <label>Billing Model</label>
              <div className="select-wrapper">
                <select>
                  <option>All Models</option>
                  <option>Usage-based</option>
                  <option>Subscription</option>
                  <option>Hybrid</option>
                </select>
                <ChevronDown size={20} className="select-icon" />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getTableTitle = () => {
    switch (viewType) {
      case 'cio':
        return 'Top Cost Contributors by Organization';
      case 'platform':
        return 'Top Platform Users';
      case 'persona':
        return 'Top Users by Persona';
      case 'workspace':
        return 'Top Workspace Users';
      default:
        return 'Top Cost Contributors';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="header-left">
            <button onClick={handleBackToLanding} className="back-button">
              ← Back to Navigation
            </button>
            <div className="logo-section">
              <Database size={32} color="#3b82f6" />
              <h1>Enterprise Chargeback</h1>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <button className="icon-button">
              <Search size={20} />
            </button>
            <div className="user-avatar">
              <span>SC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="controls-grid">
          {renderControls()}
          
          {/* Common controls */}
          <div className="control-group">
            <label>Timeframe</label>
            <div className="select-wrapper">
              <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)}>
                <option value="Q3 2025">Q3 2025</option>
                <option value="Q2 2025">Q2 2025</option>
                <option value="Q1 2025">Q1 2025</option>
                <option value="YTD 2025">YTD 2025</option>
              </select>
              <ChevronDown size={20} className="select-icon" />
            </div>
          </div>

          <div className="control-group">
            <label>View</label>
            <div className="select-wrapper">
              <select>
                <option>Summary</option>
                <option>Detailed</option>
                <option>Trend Analysis</option>
              </select>
              <ChevronDown size={20} className="select-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {renderMetrics()}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {renderCharts()}
      </div>

      {/* Top Users Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>{getTableTitle()}</h3>
          <button className="primary-button">
            View All Users
          </button>
        </div>
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Organization</th>
                <th>Persona</th>
                <th>Type</th>
                <th>Usage</th>
                <th>Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        <span>{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td>{user.org}</td>
                  <td>
                    <span className="badge blue">{user.persona}</span>
                  </td>
                  <td>
                    <span className={`badge ${user.type.includes('Workspace') ? 'purple' : 'green'}`}>
                      {user.type}
                    </span>
                  </td>
                  <td>{user.usage}</td>
                  <td className="cost-cell">${user.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;