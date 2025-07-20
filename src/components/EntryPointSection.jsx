import React, { useState, useEffect } from 'react';
import './EntryPointSection.css';

const EntryPointSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataCount, setDataCount] = useState(0);
  const [vaultOpen, setVaultOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setVaultOpen(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('.entry-point-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setDataCount(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section className="entry-point-section">
      <div className="container">
        {/* Main Headline */}
        <div className="headline-wrapper">
          <h2 className={`main-headline ${isVisible ? 'animate-in' : ''}`}>
            Start Your Career Vault for Less Than
            <span className="netflix-comparison">
              <span className="netflix-logo">NETFLIX</span>
              <span className="price-tag">$4.99/mo</span>
            </span>
          </h2>
        </div>

        {/* The Hook */}
        <div className={`hook-message ${isVisible ? 'slide-up' : ''}`}>
          <div className="hook-icon">📱</div>
          <h3>Keep your personal line personal, keep your business line business</h3>
        </div>

        {/* Data Ownership Section */}
        <div className={`data-ownership ${isVisible ? 'fade-in' : ''}`}>
          <div className="vault-container">
            <div className={`vault ${vaultOpen ? 'open' : ''}`}>
              <div className="vault-door">
                <div className="vault-handle"></div>
                <div className="vault-lock">
                  <div className="lock-dial"></div>
                </div>
              </div>
              <div className="vault-interior">
                <div className="data-streams">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`data-stream stream-${i + 1}`}>
                      <span className="data-icon">📊</span>
                      <span className="data-label">Your Data</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3 className="ownership-text">
              Your calls, <span className="highlight">YOUR data</span>, 
              <span className="emphasis"> YOUR career vault</span>
            </h3>
          </div>
        </div>

        {/* Career Timeline */}
        <div className={`career-timeline ${isVisible ? 'expand' : ''}`}>
          <div className="timeline-header">
            <h3>Start at $4.99, discover what's possible</h3>
          </div>
          <div className="timeline-path">
            <div className="timeline-node start">
              <div className="node-content">
                <span className="node-price">$4.99</span>
                <span className="node-label">Today</span>
              </div>
            </div>
            <div className="timeline-progress" style={{ width: `${dataCount}%` }}></div>
            <div className="timeline-node milestone-1">
              <div className="node-content">
                <span className="node-icon">📈</span>
                <span className="node-label">First 100 Calls</span>
              </div>
            </div>
            <div className="timeline-node milestone-2">
              <div className="node-content">
                <span className="node-icon">🎯</span>
                <span className="node-label">Deal Patterns Emerge</span>
              </div>
            </div>
            <div className="timeline-node end">
              <div className="node-content">
                <span className="node-icon">🏆</span>
                <span className="node-label">Career Legacy</span>
              </div>
            </div>
          </div>
        </div>

        {/* CRM Comparison */}
        <div className={`crm-comparison ${isVisible ? 'slide-in' : ''}`}>
          <div className="comparison-grid">
            <div className="comparison-item employer">
              <div className="comparison-header">
                <span className="icon">🏢</span>
                <h4>Employer's CRM</h4>
              </div>
              <ul className="comparison-list">
                <li className="negative">They own your data</li>
                <li className="negative">Lose access when you leave</li>
                <li className="negative">Your insights benefit them</li>
                <li className="negative">No portable career record</li>
              </ul>
            </div>
            <div className="vs-divider">VS</div>
            <div className="comparison-item yours">
              <div className="comparison-header">
                <span className="icon">🔐</span>
                <h4>Your Career Vault</h4>
              </div>
              <ul className="comparison-list">
                <li className="positive">You own everything</li>
                <li className="positive">Lifetime access</li>
                <li className="positive">Build YOUR reputation</li>
                <li className="positive">Take it anywhere</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Accumulation Visual */}
        <div className={`data-accumulation ${isVisible ? 'active' : ''}`}>
          <div className="accumulation-container">
            <div className="data-counter">
              <span className="counter-number">{dataCount}%</span>
              <span className="counter-label">Career Data Captured</span>
            </div>
            <div className="data-particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i + 1}`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`final-cta ${isVisible ? 'bounce-in' : ''}`}>
          <h2>Own Your Professional Future</h2>
          <p className="cta-subtitle">
            Every call recorded. Every insight captured. Every opportunity tracked.
          </p>
          <button className="cta-button">
            <span className="button-text">Start Building Your Vault</span>
            <span className="button-price">Just $4.99/mo</span>
            <span className="button-arrow">→</span>
          </button>
          <p className="guarantee">
            <span className="check-icon">✓</span>
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default EntryPointSection;