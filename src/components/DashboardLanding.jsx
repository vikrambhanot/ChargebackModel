import { Activity, ArrowRight, Database, DollarSign, TrendingUp, Users } from 'lucide-react';

const DashboardLanding = ({ navigationOptions, handleNavigation }) => {
  return (
    <div className="landing-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                <Database size={32} color="white" />
              </div>
              <div className="logo-text">
                <h1>Enterprise Chargeback</h1>
                <p>Data Platform Cost Analytics & Allocation</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="total-cost">
              <p className="cost-label">Total Monthly Costs</p>
              <p className="cost-amount">$67,000</p>
            </div>
            <div className="user-avatar">
              <span>SC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2>How would you like to explore your data costs?</h2>
          <p>Choose your preferred view to dive deep into cost analytics, usage patterns, and chargeback insights across your data platforms.</p>
        </div>

        {/* Navigation Cards */}
        <div className="navigation-grid">
          {navigationOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                onClick={() => handleNavigation(option.id)}
                className="nav-card"
                style={{ backgroundColor: option.color }}
              >
                <div className="card-header">
                  <div className="card-icon">
                    <IconComponent size={32} color="white" />
                  </div>
                  <ArrowRight size={24} color="white" className="arrow-icon" />
                </div>
                
                <h3>{option.title}</h3>
                <p className="card-description">{option.description}</p>
                
                <div className="card-stats">
                  {Object.entries(option.stats).map(([key, value], index) => (
                    <div key={index} className="stat-item">
                      <p className="stat-value">{value}</p>
                      <p className="stat-label">{key.replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats Preview */}
        <div className="quick-stats">
          <h3>At a Glance</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <DollarSign size={32} />
              </div>
              <p className="stat-number">$67K</p>
              <p className="stat-text">Total Monthly</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon green">
                <Users size={32} />
              </div>
              <p className="stat-number">247</p>
              <p className="stat-text">Active Users</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon purple">
                <Activity size={32} />
              </div>
              <p className="stat-number">$271</p>
              <p className="stat-text">Avg per User</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon orange">
                <TrendingUp size={32} />
              </div>
              <p className="stat-number">+12%</p>
              <p className="stat-text">vs Last Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLanding;