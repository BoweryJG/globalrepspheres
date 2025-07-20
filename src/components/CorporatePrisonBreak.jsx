import React from 'react';
import './CorporatePrisonBreak.css';

const CorporatePrisonBreak = () => {
  // Generate prison bars
  const bars = [];
  for (let i = 0; i < 20; i++) {
    bars.push(
      <div 
        key={i} 
        className="prison-bar" 
        style={{ '--bar-index': i }}
      />
    );
  }

  // Corporate logos that will shatter
  const logos = [
    { name: 'CORP', delay: 0 },
    { name: 'LIMIT', delay: 0.3 },
    { name: 'GRIND', delay: 0.6 },
    { name: 'CHAIN', delay: 0.9 },
    { name: 'TRAP', delay: 1.2 }
  ];

  return (
    <div className="corporate-prison-container">
      {/* Prison bars grid */}
      <div className="prison-bars">
        {bars}
      </div>

      {/* Shattering corporate logos */}
      <div className="corporate-logos">
        {logos.map((logo, index) => (
          <div 
            key={index}
            className="corporate-logo"
            style={{ '--shatter-delay': `${logo.delay}s` }}
          >
            <span className="logo-text">{logo.name}</span>
            <div className="shatter-pieces">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="shatter-piece"
                  style={{ '--piece-index': i }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Liberation message */}
      <div className="liberation-message">
        <h2 className="liberation-title">
          <span className="break-word">BREAK</span>
          <span className="free-word">FREE</span>
        </h2>
        <p className="liberation-subtitle">
          Shatter the corporate chains. Ascend to unlimited potential.
        </p>
      </div>

      {/* Particle effects */}
      <div className="liberation-particles">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="liberation-particle"
            style={{ 
              '--particle-index': i,
              '--particle-delay': `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Electric surge effect */}
      <div className="electric-surge">
        <div className="surge-wave surge-wave-1"></div>
        <div className="surge-wave surge-wave-2"></div>
        <div className="surge-wave surge-wave-3"></div>
      </div>
    </div>
  );
};

export default CorporatePrisonBreak;