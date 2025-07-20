import React, { useState, useEffect } from 'react';
import './SubscriptionTiers.css';

const SubscriptionTiers = () => {
  console.log('💰 SubscriptionTiers rendering...');
  const [hoveredTier, setHoveredTier] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const [currentIncome, setCurrentIncome] = useState(200000);
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      id: 'archive',
      name: 'Archive',
      price: 19,
      tagline: 'Your Professional Black Box',
      roi: null,
      features: [
        'RepSpheres phone line',
        'Full call transcription',
        'Unlimited storage',
        'Build your data empire',
        'Own your career intelligence',
        'Netflix-price entry point'
      ],
      cta: 'Start Your Empire',
      color: 'archive'
    },
    {
      id: 'intelligence',
      name: 'Intelligence',
      price: 149,
      tagline: '20% More Closes, Guaranteed',
      roi: {
        gain: 40000,
        cost: 1800,
        multiplier: 22,
        description: 'Turn $200K into $240K'
      },
      features: [
        'Basic Harvey whispers',
        'Canvas scans',
        'Call analytics',
        'Performance insights',
        'CRM integration'
      ],
      cta: 'Boost Performance',
      color: 'intelligence'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 399,
      tagline: 'The $100K Multiplier',
      roi: {
        gain: 100000,
        cost: 4800,
        multiplier: 21,
        description: 'Add $100K to your W2'
      },
      features: [
        'Full Harvey AI coaching',
        'Territory intelligence',
        'Real-time whisper coaching',
        'Advanced analytics',
        'Priority support'
      ],
      cta: 'Go Professional',
      color: 'professional',
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 799,
      tagline: 'Join The $400K Club',
      roi: {
        gain: 150000,
        cost: 9600,
        multiplier: 16,
        description: 'Transform from rep to rainmaker'
      },
      features: [
        'All 4 Harvey personalities',
        'Unlimited scans',
        'Custom AI training',
        'White-glove onboarding',
        'Executive insights'
      ],
      cta: 'Become Elite',
      color: 'elite'
    },
    {
      id: 'syndicate',
      name: 'Syndicate',
      price: 1499,
      tagline: '5X Force Multiplier',
      roi: {
        gain: 400000,
        cost: 18000,
        multiplier: 22,
        description: '5 reps × $80K gain'
      },
      features: [
        '5 user seats',
        'Shared intelligence',
        'Team analytics',
        'Collaborative workspace',
        'Admin dashboard'
      ],
      cta: 'Build Your Team',
      color: 'syndicate'
    },
    {
      id: 'empire',
      name: 'Empire',
      price: 2999,
      tagline: 'Market Domination Mode',
      roi: {
        gain: null,
        cost: null,
        multiplier: null,
        description: 'Own your market, crush competition'
      },
      features: [
        'Unlimited seats',
        'White-label options',
        'Custom integrations',
        'Dedicated success manager',
        'Market intelligence suite'
      ],
      cta: 'Dominate Markets',
      color: 'empire'
    }
  ];

  // Animate ROI counters
  useEffect(() => {
    tiers.forEach(tier => {
      if (tier.roi && tier.roi.gain) {
        const interval = setInterval(() => {
          setAnimatedValues(prev => {
            const currentValue = prev[tier.id] || 0;
            const targetValue = tier.roi.gain;
            const increment = Math.ceil(targetValue / 50);
            
            if (currentValue < targetValue) {
              return {
                ...prev,
                [tier.id]: Math.min(currentValue + increment, targetValue)
              };
            }
            return prev;
          });
        }, 30);

        return () => clearInterval(interval);
      }
    });
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateROI = (tier) => {
    if (!tier.roi) return null;
    
    const baseGain = tier.roi.gain;
    const incomeMultiplier = currentIncome / 200000; // Scale based on income
    const adjustedGain = baseGain * incomeMultiplier;
    const annualCost = tier.price * 12 * (isAnnual ? 0.8 : 1); // 20% discount for annual
    
    return {
      gain: adjustedGain,
      cost: annualCost,
      multiplier: Math.round(adjustedGain / annualCost),
      newIncome: currentIncome + adjustedGain
    };
  };

  return (
    <section className="section-container subscription-tiers">
      <div className="tiers-header">
        <h2>From $19 Career Insurance to $2,999 Market Domination</h2>
        <p className="tiers-subheading">Choose your path to exponential growth</p>
        
        {/* Interactive ROI Calculator */}
        <div className="roi-calculator">
          <h3>Calculate Your Income Potential</h3>
          <div className="income-slider">
            <label>Your Current Annual Income: {formatCurrency(currentIncome)}</label>
            <input 
              type="range" 
              min="100000" 
              max="500000" 
              step="10000"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(parseInt(e.target.value))}
              className="income-range"
            />
            <div className="income-markers">
              <span>$100K</span>
              <span>$300K</span>
              <span>$500K</span>
            </div>
          </div>
          
          {/* Annual Billing Toggle */}
          <div className="billing-toggle">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
              />
              <span className="toggle-switch"></span>
              Annual Billing (Save 20%)
            </label>
          </div>
        </div>
      </div>

      <div className="tiers-grid">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`tier-card ${tier.color} ${tier.popular ? 'popular' : ''} ${hoveredTier === tier.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredTier(tier.id)}
            onMouseLeave={() => setHoveredTier(null)}
          >
            {tier.popular && (
              <div className="popular-badge">
                <span>MOST POPULAR</span>
              </div>
            )}

            <div className="tier-header">
              <h3 className="tier-name">{tier.name}</h3>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">{tier.price}</span>
                <span className="period">/month</span>
              </div>
              <p className="tier-tagline">{tier.tagline}</p>
            </div>

            {tier.roi && tier.roi.gain && (
              <div className="roi-section">
                <div className="roi-counter">
                  {(() => {
                    const roi = calculateROI(tier);
                    return (
                      <>
                        <div className="roi-income">
                          <span className="roi-label">Your New Income: </span>
                          <span className="roi-gain">
                            {formatCurrency(roi.newIncome)}
                          </span>
                        </div>
                        <div className="roi-multiplier">
                          <span className="roi-label">ROI: </span>
                          <span className="roi-value">{roi.multiplier}X</span>
                        </div>
                        <div className="roi-investment">
                          <span className="roi-label">Investment: </span>
                          <span className="roi-cost">
                            {formatCurrency(roi.cost)}/year
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {tier.roi && tier.roi.gain && (
              <div className="roi-section-old" style={{ display: 'none' }}>
                <div className="roi-counter">
                  <span className="roi-label">ROI: </span>
                  <span className="roi-gain">
                    {formatCurrency(animatedValues[tier.id] || 0)}
                  </span>
                  <span className="roi-calculation">
                    gain for {formatCurrency(tier.roi.cost)}/year = 
                    <span className="roi-multiplier"> {tier.roi.multiplier}X</span> return
                  </span>
                </div>
                <p className="roi-description">{tier.roi.description}</p>
              </div>
            )}

            {tier.roi && !tier.roi.gain && (
              <div className="roi-section">
                <p className="roi-description">{tier.roi.description}</p>
              </div>
            )}

            <ul className="features-list">
              {tier.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <svg className="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="tier-cta">
              {tier.cta}
              <svg className="cta-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="value-anchoring">
        <h3>For medical device reps earning $150K-400K annually</h3>
        <div className="value-points">
          <div className="value-point">
            <p>Even Elite tier at $799/month is less than <strong>3% of base salary</strong></p>
          </div>
          <div className="value-point">
            <p>If it increases income by 40%, that's <strong>20X ROI minimum</strong></p>
          </div>
          <div className="value-point">
            <p>RepSpheres isn't a cost. It's an <strong>investment that pays for itself</strong> in your first closed deal.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTiers;