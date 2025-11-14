import { Shield, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import AnnuityAgentChat from './AnnuityAgentChat';
import './AnnuitySuitabilityDemo.css';

const AnnuitySuitabilityDemo = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const products = [
    {
      id: 'fia',
      name: 'Fixed Indexed Annuity',
      icon: '🛡️',
      tagline: 'Principal protection with market-linked growth potential',
      bestFor: 'Conservative investors seeking stable income',
      features: [
        'Principal protection guarantee',
        'Market-linked growth potential',
        'Typically 5-7 year surrender periods',
        'Protection from market downturns'
      ],
      color: 'blue'
    },
    {
      id: 'va',
      name: 'Variable Annuity',
      icon: '📈',
      tagline: 'Growth-oriented with investment flexibility',
      bestFor: 'Investors with longer time horizons and higher risk tolerance',
      features: [
        'Investment sub-account flexibility',
        'Higher growth potential',
        'Optional death benefit riders',
        'Tax-deferred growth'
      ],
      color: 'green'
    }
  ];

  const handleStartAssessment = (product) => {
    setSelectedProduct(product);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedProduct(null);
  };

  if (showChat && selectedProduct) {
    return (
      <AnnuityAgentChat
        agentType={`annuity-${selectedProduct.id}`}
        productContext={{
          productType: selectedProduct.id,
          productName: selectedProduct.name
        }}
        onClose={handleCloseChat}
      />
    );
  }

  return (
    <div className="annuity-demo-container">
      {/* Hero Section */}
      <div className="annuity-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <Shield size={64} className="text-blue-600" />
          </div>
          <h1 className="hero-title">
            AI-Powered Annuity Suitability Assessment
          </h1>
          <p className="hero-subtitle">
            FINRA-compliant customer qualification in under 5 minutes
          </p>
          <div className="hero-badges">
            <span className="badge">
              <CheckCircle size={16} />
              FINRA Rule 2111 Compliant
            </span>
            <span className="badge">
              <CheckCircle size={16} />
              Regulation Best Interest
            </span>
            <span className="badge">
              <CheckCircle size={16} />
              Rule 2330 Variable Annuities
            </span>
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="product-selection">
        <h2 className="section-title">Select Product Type to Begin Assessment</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className={`product-card product-card-${product.color}`}>
              <div className="product-header">
                <div className="product-icon">{product.icon}</div>
                <h3 className="product-name">{product.name}</h3>
              </div>
              
              <p className="product-tagline">{product.tagline}</p>
              
              <div className="product-best-for">
                <strong>Best For:</strong>
                <p>{product.bestFor}</p>
              </div>

              <div className="product-features">
                <strong>Key Features:</strong>
                <ul>
                  {product.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={`start-assessment-btn btn-${product.color}`}
                onClick={() => handleStartAssessment(product)}
              >
                Start Assessment
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Answer Questions</h4>
            <p>Our AI agent asks 8-10 conversational questions about your financial situation, goals, and understanding of annuities.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>FINRA Analysis</h4>
            <p>The system evaluates your responses against FINRA Rules 2111, 2330, and Regulation Best Interest requirements.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Receive Report</h4>
            <p>Get a comprehensive suitability report with compliance scoring, risk factors, and clear recommendations.</p>
          </div>
        </div>
      </div>

      {/* Powered By */}
      <div className="powered-by">
        <p>Powered by <strong>Autonome AI</strong> - Enterprise-Grade Agentic Intelligence</p>
      </div>
    </div>
  );
};

export default AnnuitySuitabilityDemo;