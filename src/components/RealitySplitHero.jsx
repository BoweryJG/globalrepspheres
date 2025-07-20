import React, { useEffect, useRef, useState } from 'react';
import './RealitySplitHero.css';

const RealitySplitHero = ({ onLogin, onSignup }) => {
  const containerRef = useRef(null);
  const crackRef = useRef(null);
  const [dealCounts, setDealCounts] = useState({ traditional: 0, repx: 0 });
  const [crackIntensity, setCrackIntensity] = useState(0);

  useEffect(() => {
    // Real-time deal counter simulation
    const dealInterval = setInterval(() => {
      setDealCounts(prev => ({
        traditional: Math.min(prev.traditional + (Math.random() < 0.1 ? 0.1 : 0), 1.5),
        repx: prev.repx + (Math.random() * 2 + 1)
      }));
    }, 100);

    // Crack intensity pulse
    const crackInterval = setInterval(() => {
      setCrackIntensity(prev => (prev + 0.1) % 1);
    }, 50);

    return () => {
      clearInterval(dealInterval);
      clearInterval(crackInterval);
    };
  }, []);

  useEffect(() => {
    if (crackRef.current) {
      crackRef.current.style.setProperty('--crack-intensity', crackIntensity);
    }
  }, [crackIntensity]);

  const handleCrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = ((e.clientY - rect.top) / rect.height);
    
    // Different actions based on where they click on the crack
    if (clickY < 0.3) {
      onSignup(); // Top section - "Shatter Your Limits"
    } else if (clickY < 0.7) {
      onLogin(); // Middle section - "Cross Over Now"
    } else {
      onSignup(); // Bottom section - "Join the Revolution"
    }
  };

  return (
    <section className="reality-split-hero" ref={containerRef}>
      {/* Unified Background */}
      <div className="reality-background" />
      
      {/* Traditional Reality (Left/Slow) */}
      <div className="reality-side reality-traditional">
        <div className="reality-content">
          <div className="reality-header">
            <h3>Traditional Sales Rep</h3>
            <div className="deal-counter slow">
              <span className="counter-label">Deals Closed Today:</span>
              <span className="counter-value">{dealCounts.traditional.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="sales-simulation traditional-sim">
            <div className="sim-task">
              <div className="task-label">Sending follow-up email...</div>
              <div className="progress-bar traditional">
                <div className="progress-fill" style={{ width: `${(dealCounts.traditional * 20) % 100}%` }} />
              </div>
            </div>
            
            <div className="sim-task">
              <div className="task-label">Waiting for response...</div>
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
            
            <div className="sim-task">
              <div className="task-label">Manual data entry...</div>
              <div className="typing-indicator">|</div>
            </div>
          </div>
          
          <div className="reality-stats">
            <div className="stat-item">
              <span className="stat-value">23min</span>
              <span className="stat-label">Per Email</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2.3h</span>
              <span className="stat-label">Per Deal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Reality (Right/Fast) */}
      <div className="reality-side reality-enhanced">
        <div className="reality-content">
          <div className="reality-header">
            <h3>Rep<span className="superscript">×</span> Enhanced</h3>
            <div className="deal-counter fast">
              <span className="counter-label">Deals Closed Today:</span>
              <span className="counter-value">{Math.floor(dealCounts.repx)}</span>
            </div>
          </div>
          
          <div className="sales-simulation enhanced-sim">
            <div className="sim-task completed">
              <div className="task-label">AI-crafted personalized outreach ✓</div>
              <div className="instant-complete">COMPLETE</div>
            </div>
            
            <div className="sim-task completed">
              <div className="task-label">Predictive response analysis ✓</div>
              <div className="instant-complete">COMPLETE</div>
            </div>
            
            <div className="sim-task completing">
              <div className="task-label">Auto-closing next 3 deals...</div>
              <div className="rapid-progress">
                <div className="progress-fill enhanced" />
              </div>
            </div>
          </div>
          
          <div className="reality-stats">
            <div className="stat-item">
              <span className="stat-value">0.3s</span>
              <span className="stat-label">Per Email</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1.8min</span>
              <span className="stat-label">Per Deal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reality Crack - The Interactive Portal */}
      <div className="reality-crack" ref={crackRef} onClick={handleCrackClick}>
        {/* Multiple layers for seamless blending */}
        <div className="crack-shadow" />
        <div className="crack-base" />
        <div className="crack-lightning">
          <svg className="lightning-path" viewBox="0 0 20 400" preserveAspectRatio="none">
            <path
              d="M10,0 L8,50 L12,100 L7,150 L13,200 L9,250 L11,300 L6,350 L10,400"
              stroke="url(#lightningGradient)"
              strokeWidth="2"
              fill="none"
              className="lightning-bolt"
            />
            <defs>
              <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ffc6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#7B42F6" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff4444" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Interactive Hotspots */}
        <div className="crack-hotspot crack-top" data-tooltip="Shatter Your Limits">
          <div className="hotspot-glow" />
        </div>
        <div className="crack-hotspot crack-middle" data-tooltip="Cross Over Now">
          <div className="hotspot-glow" />
        </div>
        <div className="crack-hotspot crack-bottom" data-tooltip="Join the Revolution">
          <div className="hotspot-glow" />
        </div>
        
        {/* Particle Effects */}
        <div className="crack-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{ 
                '--particle-delay': `${i * 0.1}s`,
                '--particle-duration': `${2 + Math.random() * 2}s`
              }} 
            />
          ))}
        </div>
      </div>

      {/* Main Message */}
      <div className="reality-message">
        <h1 className="reality-title">
          Don't Just Read About The Future
          <br />
          <span className="title-highlight">Step Into It</span>
        </h1>
        <p className="reality-subtitle">
          Click the crack to tear through to your new reality
        </p>
      </div>

      {/* Reality Status Indicator */}
      <div className="reality-status">
        <div className="status-indicator">
          <span className="status-dot pulsing" />
          <span className="status-text">Realities diverging in real-time</span>
        </div>
      </div>
    </section>
  );
};

export default RealitySplitHero;