import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import './ModuleSelectionFlow.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ModuleSelectionFlow = ({ onComplete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedModules, setSelectedModules] = useState(new Set());
  const [selectedTier, setSelectedTier] = useState(null);
  const [loading, setLoading] = useState(false);

  const modules = [
    {
      id: 'crm',
      name: 'CRM Command Center',
      description: 'Complete contact management with 23,000+ dental and aesthetic practices',
      icon: '🎯',
      url: 'https://crm.repspheres.com',
      features: [
        '23,000+ verified contacts',
        'Real-time pipeline tracking',
        'Email & SMS integration',
        'Territory mapping'
      ],
      demoAvailable: true
    },
    {
      id: 'canvas',
      name: 'Canvas Intelligence',
      description: 'Deep practice intelligence and market insights',
      icon: '🔍',
      url: 'https://canvas.repspheres.com',
      features: [
        'Practice website scanning',
        'Competitive intelligence',
        'Market trends analysis',
        'Outreach generation'
      ],
      demoAvailable: true
    },
    {
      id: 'repconnect',
      name: 'RepConnect Voice',
      description: 'AI-powered phone system with CRM integration',
      icon: '📞',
      url: 'https://repconnect.repspheres.com',
      features: [
        'Professional business line',
        'AI call transcription',
        'CRM auto-logging',
        'Voice coaching'
      ],
      trialAvailable: true,
      trialDuration: '10 minutes'
    },
    {
      id: 'market-data',
      name: 'Market Data Pro',
      description: 'Real-time procedure volumes and market analytics',
      icon: '📊',
      url: 'https://canvas.repspheres.com/market-insights',
      features: [
        'Procedure volume tracking',
        'Territory analytics',
        'Growth opportunities',
        'Competitor analysis'
      ],
      demoAvailable: true
    }
  ];

  const tiers = [
    {
      id: 'repx1',
      name: 'RepX1 Professional',
      price: 39,
      modules: ['repconnect'],
      description: 'Perfect for individual reps',
      features: [
        'Professional phone line for life',
        'AI transcription of every call',
        'Basic CRM features',
        'Email support'
      ]
    },
    {
      id: 'repx2',
      name: 'RepX2 Intelligence',
      price: 97,
      modules: ['repconnect', 'crm', 'canvas'],
      description: 'Complete sales intelligence suite',
      features: [
        'Everything in RepX1',
        'Full CRM access',
        '10 Canvas scans/day',
        'Basic Market Data'
      ],
      popular: true
    },
    {
      id: 'repx3',
      name: 'RepX3 Territory',
      price: 197,
      modules: ['repconnect', 'crm', 'canvas', 'market-data'],
      description: 'Dominate your territory',
      features: [
        'Everything in RepX2',
        '25 Canvas scans/day',
        'Full Market Data Pro',
        'Territory mapping'
      ]
    },
    {
      id: 'repx5',
      name: 'RepX5 Elite',
      price: 797,
      modules: ['repconnect', 'crm', 'canvas', 'market-data'],
      description: 'Unlimited everything',
      features: [
        'Unlimited everything',
        'Real-time AI coaching',
        'Custom workflows',
        'Dedicated support'
      ],
      elite: true
    }
  ];

  const toggleModule = (moduleId) => {
    const newSelected = new Set(selectedModules);
    if (newSelected.has(moduleId)) {
      newSelected.delete(moduleId);
    } else {
      newSelected.add(moduleId);
    }
    setSelectedModules(newSelected);
    
    // Auto-select appropriate tier based on modules
    const matchingTier = tiers.find(tier => 
      tier.modules.length === newSelected.size &&
      tier.modules.every(m => newSelected.has(m))
    );
    if (matchingTier) {
      setSelectedTier(matchingTier.id);
    }
  };

  const handleTierSelect = (tierId) => {
    const tier = tiers.find(t => t.id === tierId);
    if (tier) {
      setSelectedTier(tierId);
      setSelectedModules(new Set(tier.modules));
    }
  };

  const handleDemoAccess = (module) => {
    // Set demo mode flag in user metadata
    if (user) {
      // Update user metadata to enable demo mode
      localStorage.setItem('demo_mode', 'true');
      localStorage.setItem('demo_module', module.id);
    }
    
    // Redirect to module with demo flag
    window.location.href = `${module.url}?demo=true`;
  };

  const handleCheckout = async () => {
    if (!selectedTier || selectedModules.size === 0) {
      alert('Please select a subscription plan');
      return;
    }

    setLoading(true);
    try {
      const tier = tiers.find(t => t.id === selectedTier);
      
      // Create Stripe checkout session
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: selectedTier,
          modules: Array.from(selectedModules),
          userId: user?.id,
          email: user?.email,
          successUrl: `${window.location.origin}/welcome?tier=${selectedTier}`,
          cancelUrl: `${window.location.origin}/pricing`
        })
      });

      const { sessionUrl } = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-selection-flow">
      <div className="flow-header">
        <h1>Choose Your RepSpheres Modules</h1>
        <p>Select individual modules or choose a bundle for the best value</p>
      </div>

      {/* Module Selection Grid */}
      <div className="modules-grid">
        {modules.map(module => (
          <div 
            key={module.id}
            className={`module-card ${selectedModules.has(module.id) ? 'selected' : ''}`}
            onClick={() => toggleModule(module.id)}
          >
            <div className="module-icon">{module.icon}</div>
            <h3>{module.name}</h3>
            <p>{module.description}</p>
            
            <ul className="module-features">
              {module.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            <div className="module-actions">
              {module.demoAvailable && (
                <button 
                  className="demo-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoAccess(module);
                  }}
                >
                  Try Demo
                </button>
              )}
              {module.trialAvailable && (
                <span className="trial-badge">
                  {module.trialDuration} free trial
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tier Selection */}
      <div className="tier-selection">
        <h2>Recommended Plans</h2>
        <div className="tiers-grid">
          {tiers.map(tier => (
            <div 
              key={tier.id}
              className={`tier-card ${selectedTier === tier.id ? 'selected' : ''} ${tier.popular ? 'popular' : ''} ${tier.elite ? 'elite' : ''}`}
              onClick={() => handleTierSelect(tier.id)}
            >
              {tier.popular && <div className="popular-badge">Most Popular</div>}
              {tier.elite && <div className="elite-badge">Elite</div>}
              
              <h3>{tier.name}</h3>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">{tier.price}</span>
                <span className="period">/month</span>
              </div>
              
              <p className="tier-description">{tier.description}</p>
              
              <ul className="tier-features">
                {tier.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <div className="included-modules">
                <p>Includes:</p>
                <div className="module-badges">
                  {tier.modules.map(moduleId => {
                    const module = modules.find(m => m.id === moduleId);
                    return (
                      <span key={moduleId} className="module-badge">
                        {module?.icon} {module?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="checkout-section">
        <div className="selected-summary">
          <h3>Selected Modules</h3>
          <div className="selected-modules">
            {selectedModules.size === 0 ? (
              <p>No modules selected</p>
            ) : (
              Array.from(selectedModules).map(moduleId => {
                const module = modules.find(m => m.id === moduleId);
                return (
                  <div key={moduleId} className="selected-module">
                    {module?.icon} {module?.name}
                  </div>
                );
              })
            )}
          </div>
          
          {selectedTier && (
            <div className="selected-tier">
              <p>Plan: <strong>{tiers.find(t => t.id === selectedTier)?.name}</strong></p>
              <p className="total-price">
                Total: <strong>${tiers.find(t => t.id === selectedTier)?.price}/month</strong>
              </p>
            </div>
          )}
        </div>

        <div className="checkout-actions">
          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={!selectedTier || selectedModules.size === 0 || loading}
          >
            {loading ? 'Processing...' : 'Continue to Payment'}
          </button>
          
          <p className="guarantee">
            <span className="icon">🛡️</span>
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleSelectionFlow;