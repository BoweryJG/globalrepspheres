import React from 'react';
import './FeatureComparisonTable.css';

const FeatureComparisonTable = ({ onSelectPlan }) => {
  const features = [
    {
      category: 'Phone System',
      items: [
        { name: 'Professional Business Line', free: false, repx1: true, repx2: true, repx3: true, repx5: true },
        { name: 'AI Call Transcription', free: false, repx1: true, repx2: true, repx3: true, repx5: true },
        { name: 'CRM Auto-logging', free: false, repx1: true, repx2: true, repx3: true, repx5: true },
        { name: 'Real-time AI Coaching', free: false, repx1: false, repx2: false, repx3: false, repx5: true },
        { name: 'Voice Analytics', free: false, repx1: 'Basic', repx2: 'Enhanced', repx3: 'Advanced', repx5: 'Unlimited' }
      ]
    },
    {
      category: 'CRM Features',
      items: [
        { name: 'Contact Management', free: '40 demo', repx1: '1,000', repx2: '5,000', repx3: '10,000', repx5: 'Unlimited' },
        { name: 'Pipeline Tracking', free: 'View only', repx1: true, repx2: true, repx3: true, repx5: true },
        { name: 'Email Integration', free: false, repx1: false, repx2: true, repx3: true, repx5: true },
        { name: 'Territory Mapping', free: false, repx1: false, repx2: false, repx3: true, repx5: true },
        { name: 'Custom Workflows', free: false, repx1: false, repx2: '3', repx3: '5', repx5: 'Unlimited' }
      ]
    },
    {
      category: 'Canvas Intelligence',
      items: [
        { name: 'Practice Scans/Day', free: '5', repx1: '0', repx2: '10', repx3: '25', repx5: 'Unlimited' },
        { name: 'Competitive Intel', free: false, repx1: false, repx2: true, repx3: true, repx5: true },
        { name: 'AI Outreach Generation', free: 'Basic', repx1: false, repx2: true, repx3: true, repx5: true },
        { name: 'Deep Psychology Analysis', free: false, repx1: false, repx2: false, repx3: true, repx5: true },
        { name: 'Instant Results', free: false, repx1: false, repx2: false, repx3: false, repx5: true }
      ]
    },
    {
      category: 'Market Data',
      items: [
        { name: 'Procedure Volumes', free: 'Sample', repx1: false, repx2: 'Basic', repx3: 'Full', repx5: 'Real-time' },
        { name: 'Territory Analytics', free: false, repx1: false, repx2: false, repx3: true, repx5: true },
        { name: 'Competitor Tracking', free: false, repx1: false, repx2: false, repx3: true, repx5: true },
        { name: 'Growth Opportunities', free: false, repx1: false, repx2: true, repx3: true, repx5: true },
        { name: 'Custom Reports', free: false, repx1: false, repx2: false, repx3: '5/mo', repx5: 'Unlimited' }
      ]
    },
    {
      category: 'Support & Training',
      items: [
        { name: 'Email Support', free: false, repx1: true, repx2: true, repx3: true, repx5: true },
        { name: 'Priority Support', free: false, repx1: false, repx2: false, repx3: true, repx5: true },
        { name: 'Live Training Sessions', free: false, repx1: false, repx2: 'Monthly', repx3: 'Weekly', repx5: 'On-demand' },
        { name: 'Dedicated Success Manager', free: false, repx1: false, repx2: false, repx3: false, repx5: true },
        { name: 'Custom Onboarding', free: false, repx1: false, repx2: false, repx3: false, repx5: true }
      ]
    }
  ];

  const plans = [
    { id: 'free', name: 'Free Trial', price: 0, color: '#666' },
    { id: 'repx1', name: 'RepX1', price: 39, color: '#00ffc6' },
    { id: 'repx2', name: 'RepX2', price: 97, color: '#4B96DC', popular: true },
    { id: 'repx3', name: 'RepX3', price: 197, color: '#9f58fa' },
    { id: 'repx5', name: 'RepX5', price: 797, color: '#FFD700', elite: true }
  ];

  const renderFeatureValue = (value) => {
    if (value === true) {
      return <span className="feature-check">✓</span>;
    } else if (value === false) {
      return <span className="feature-x">✗</span>;
    } else {
      return <span className="feature-text">{value}</span>;
    }
  };

  return (
    <div className="feature-comparison-table">
      <h2>Complete Feature Comparison</h2>
      <p className="table-subtitle">See exactly what you get with each plan</p>

      <div className="comparison-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-header">Features</th>
              {plans.map(plan => (
                <th key={plan.id} className={`plan-header ${plan.popular ? 'popular' : ''} ${plan.elite ? 'elite' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  {plan.elite && <div className="elite-badge">Elite</div>}
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">
                    {plan.price === 0 ? (
                      'Free'
                    ) : (
                      <>
                        <span className="currency">$</span>
                        <span className="amount">{plan.price}</span>
                        <span className="period">/mo</span>
                      </>
                    )}
                  </div>
                  <button 
                    className="select-plan-btn"
                    style={{ backgroundColor: plan.color }}
                    onClick={() => onSelectPlan(plan.id)}
                  >
                    {plan.price === 0 ? 'Try Free' : 'Select Plan'}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((category, catIdx) => (
              <React.Fragment key={catIdx}>
                <tr className="category-row">
                  <td colSpan={6}>{category.category}</td>
                </tr>
                {category.items.map((feature, featIdx) => (
                  <tr key={`${catIdx}-${featIdx}`} className="feature-row">
                    <td className="feature-name">{feature.name}</td>
                    <td className="feature-value free">{renderFeatureValue(feature.free)}</td>
                    <td className="feature-value">{renderFeatureValue(feature.repx1)}</td>
                    <td className="feature-value popular">{renderFeatureValue(feature.repx2)}</td>
                    <td className="feature-value">{renderFeatureValue(feature.repx3)}</td>
                    <td className="feature-value elite">{renderFeatureValue(feature.repx5)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comparison-footer">
        <div className="footer-notes">
          <h3>Why RepSpheres?</h3>
          <div className="value-props">
            <div className="value-prop">
              <span className="icon">🚀</span>
              <div>
                <h4>10x Revenue Growth</h4>
                <p>Average rep increases revenue by 10x within 6 months</p>
              </div>
            </div>
            <div className="value-prop">
              <span className="icon">⏱️</span>
              <div>
                <h4>Save 20 Hours/Week</h4>
                <p>Automation and AI eliminate manual tasks</p>
              </div>
            </div>
            <div className="value-prop">
              <span className="icon">🎯</span>
              <div>
                <h4>87% Win Rate</h4>
                <p>Data-driven insights lead to higher close rates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="guarantee-section">
          <h3>30-Day Money-Back Guarantee</h3>
          <p>Try RepSpheres risk-free. If you're not completely satisfied within 30 days, we'll refund your purchase—no questions asked.</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparisonTable;