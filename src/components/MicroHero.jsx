import React from 'react';
import './MicroHero.css';

const MicroHero = ({ onLogin, onSignup }) => {
  return (
    <section className="micro-hero">
      {/* Subtle Background Orb */}
      <div className="hero-orb" />
      
      {/* Main Content */}
      <div className="hero-content">
        {/* Psychological Hook - Immediate Activation */}
        <div className="shock-stat">
          <span className="stat-number">75×</span>
          <span className="stat-context">faster than you</span>
        </div>
        
        {/* Primary Hook Line */}
        <h1 className="hero-title">
          While you were reading this,<br />
          a <span className="rep-squared">Rep²</span> just closed your deal.
        </h1>
        
        {/* Secondary Hook */}
        <p className="hero-subtitle">
          Enhanced sales professionals aren't coming. They're here.<br />
          And they're systematically outperforming traditional reps across every metric.
        </p>
        
        {/* Clean CTAs */}
        <div className="hero-actions">
          <button 
            className="cta-primary"
            onClick={onSignup}
          >
            Become Rep²
          </button>
          <button 
            className="cta-secondary"
            onClick={onLogin}
          >
            Access Portal
          </button>
        </div>
        
        {/* Urgency Indicator */}
        <div className="urgency-line">
          <span className="urgency-dot" />
          <span className="urgency-text">The gap is widening every second</span>
          <span className="urgency-dot" />
        </div>
      </div>
    </section>
  );
};

export default MicroHero;