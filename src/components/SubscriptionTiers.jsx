import React, { useState, useEffect } from 'react';
import './SubscriptionTiers.css';
import { API_ENDPOINTS } from '../config/api';
import CartierRepXTitle from './CartierRepXTitle';

const SubscriptionTiers = () => {
  console.log('💰 SubscriptionTiers rendering...');
  const [hoveredTier, setHoveredTier] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const [currentIncome, setCurrentIncome] = useState(200000);
  const [isAnnual, setIsAnnual] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // RepX tier color mapping
  const tierColorMap = {
    'repx1': 'archive',
    'repx2': 'intelligence', 
    'repx3': 'professional',
    'repx4': 'elite',
    'repx5': 'empire'
  };

  // Fetch tiers from backend API
  useEffect(() => {
    const fetchTiers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.REPX_PLANS);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('Raw API Response:', responseData);
        
        // Extract the actual plans data from the API response
        const backendTiers = responseData.message || responseData.data || responseData;
        
        // Transform backend data from object format to array format
        const transformedTiers = Object.entries(backendTiers).map(([tierId, tierData], index) => {
          const monthlyPrice = tierData.monthly.amount / 100; // Convert from cents
          const annualPrice = tierData.annual.amount / 100; // Convert from cents
          
          return {
            id: tierId.toLowerCase(),
            name: tierData.name,
            price: isAnnual ? annualPrice / 12 : monthlyPrice,
            monthlyPrice: monthlyPrice,
            annualPrice: annualPrice,
            tagline: getTierTagline(tierId),
            roi: {
              gain: monthlyPrice * 12 * (10 + index * 5), // Simple ROI calculation
              cost: monthlyPrice * 12,
              multiplier: 10 + index * 5,
              description: `${10 + index * 5}x ROI potential`
            },
            features: tierData.features ? [...tierData.features.basic, ...(tierData.features.premium || [])] : getDefaultFeatures(tierId),
            cta: getCTA(tierId),
            color: tierColorMap[tierId.toLowerCase()] || 'professional',
            popular: tierId.toLowerCase() === 'repx3' // Mark RepX3 as popular
          };
        });
        
        setTiers(transformedTiers);
        setError(null);
      } catch (err) {
        console.error('Error fetching RepX plans:', err);
        console.error('Error details:', {
          message: err.message,
          stack: err.stack
        });
        setError(`Failed to load subscription plans: ${err.message}`);
        // Fallback to default tiers if API fails
        setTiers(getDefaultTiers());
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, [isAnnual]);

  // Helper functions for tier data
  const getTierTagline = (tierId) => {
    const taglines = {
      'repx1': 'Professional Foundation',
      'repx2': 'Market Intelligence Edge', 
      'repx3': 'Territory Command Center',
      'repx4': 'Executive Operations Hub',
      'repx5': 'Elite Global Dominance'
    };
    return taglines[tierId.toLowerCase()] || 'RepX Enhancement';
  };


  const getDefaultFeatures = (tierId) => {
    const defaultFeatures = {
      'repx1': ['100 calls/month', 'Basic professional features', 'Email support'],
      'repx2': ['200 calls/month', '50 emails/day', '10 Canvas scans/day', 'Market intelligence'],
      'repx3': ['400 calls/month', '100 emails/day', '25 Canvas scans/day', 'Advanced analytics'],
      'repx4': ['800 calls/month', '200 emails/day', '50 Canvas scans/day', 'Workflow automation'],
      'repx5': ['Unlimited calls', 'Unlimited emails', 'Unlimited Canvas scans', 'Dedicated success manager']
    };
    return defaultFeatures[tierId.toLowerCase()] || ['Professional features'];
  };

  const getCTA = (tierId) => {
    const ctas = {
      'repx1': 'Start Professional',
      'repx2': 'Get Intelligence',
      'repx3': 'Command Territory', 
      'repx4': 'Go Executive',
      'repx5': 'Join Elite'
    };
    return ctas[tierId.toLowerCase()] || 'Get Started';
  };

  const getDefaultTiers = () => [
    {
      id: 'repx1',
      name: 'RepX1 Professional',
      price: 39,
      monthlyPrice: 39,
      annualPrice: 390,
      tagline: 'Professional Foundation',
      roi: { gain: 4680, cost: 468, multiplier: 10, description: '10x ROI potential' },
      features: ['100 calls/month', 'Basic professional features', 'AI transcription of every sales call'],
      cta: 'Start Professional',
      color: 'archive'
    },
    {
      id: 'repx2',
      name: 'RepX2 Market Intelligence',
      price: 97,
      monthlyPrice: 97,
      annualPrice: 970,
      tagline: 'Market Intelligence Edge',
      roi: { gain: 11640, cost: 1164, multiplier: 10, description: '10x ROI potential' },
      features: ['200 calls/month', '50 emails/day', '10 Canvas scans/day', 'Market intelligence'],
      cta: 'Get Intelligence',
      color: 'intelligence'
    },
    {
      id: 'repx3',
      name: 'RepX3 Territory Command',
      price: 197,
      monthlyPrice: 197,
      annualPrice: 1970,
      tagline: 'Territory Command Center',
      roi: { gain: 23640, cost: 2364, multiplier: 10, description: '10x ROI potential' },
      features: ['400 calls/month', '100 emails/day', '25 Canvas scans/day', 'Advanced analytics'],
      cta: 'Command Territory',
      color: 'professional',
      popular: true
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

  // Loading state
  if (loading) {
    return (
      <section className="section-container subscription-tiers">
        <div className="tiers-header">
          <h2 className="section-title">Loading RepX Plans...</h2>
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section-container subscription-tiers">
        <div className="tiers-header">
          <h2 className="section-title">RepX Plans</h2>
          <p className="error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

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
              <h3 className="tier-name">
                <CartierRepXTitle 
                  tierName={tier.name}
                  size="medium"
                  variant={tier.popular ? "gold" : "default"}
                  premium={tier.popular}
                  animated={tier.popular}
                />
              </h3>
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