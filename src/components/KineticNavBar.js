import React from 'react';
import { navigationStyles } from './KineticStyles';

const KineticNavBar = () => {
  return (
    <>
      <style>{navigationStyles}</style>
      
      <nav className="nav-container">
        {/* Edge Mount Indicators */}
        <div className="nav-edge left-edge"></div>
        <div className="nav-edge right-edge"></div>
        
        {/* 4-Point Luxury Screws */}
        <div className="nav-screw screw-tl"></div>
        <div className="nav-screw screw-tr"></div>
        <div className="nav-screw screw-bl"></div>
        <div className="nav-screw screw-br"></div>
        
        {/* Dynamic Nav Rail */}
        <div className="nav-rail">
          <div className="power-node"></div>
          <div className="power-node"></div>
          <div className="power-node"></div>
          <div className="power-node"></div>
        </div>
        
        <div className="nav-inner">
          {/* Logo with Animated Jewel Core */}
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <defs>
                  <linearGradient id="navSphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#9f58fa', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#4B96DC', stopOpacity: 1 }} />
                  </linearGradient>
                  <radialGradient id="navCenterGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                    <stop offset="50%" style={{ stopColor: '#9f58fa', stopOpacity: 0.5 }} />
                    <stop offset="100%" style={{ stopColor: '#4B96DC', stopOpacity: 0 }} />
                  </radialGradient>
                  <radialGradient id="navJewelGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="30%" stopColor="#ff00ff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#00ffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.9" />
                  </radialGradient>
                </defs>
                
                {/* Outer sphere ring */}
                <circle cx="16" cy="16" r="12" fill="none" stroke="url(#navSphereGradient)" strokeWidth="2" opacity="0.8"/>
                
                {/* Inner sphere ring */}
                <circle cx="16" cy="16" r="8" fill="none" stroke="url(#navSphereGradient)" strokeWidth="1.5" opacity="0.6"/>
                
                {/* Animated Jewel Core */}
                <circle cx="16" cy="16" r="3" fill="url(#navJewelGradient)" className="logo-jewel">
                  <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                {/* Orbital dots */}
                <circle cx="16" cy="4" r="1.5" fill="#9f58fa"/>
                <circle cx="28" cy="16" r="1.5" fill="#4B96DC"/>
                <circle cx="16" cy="28" r="1.5" fill="#4bd48e"/>
                <circle cx="4" cy="16" r="1.5" fill="#00d4ff"/>
              </svg>
            </div>
            <span className="nav-logo-text">RepSpheres</span>
          </a>

          {/* Navigation Links */}
          <nav className="nav-links">
            <a href="#market-data" className="nav-link">
              <span className="nav-link-icon icon-market"></span>
              <span>Market Data</span>
            </a>
            <a href="#canvas" className="nav-link">
              <span className="nav-link-icon icon-canvas"></span>
              <span>Canvas</span>
            </a>
            <a href="#sphere-os" className="nav-link">
              <span className="nav-link-icon icon-sphere"></span>
              <span>Sphere oS</span>
            </a>
            <a href="#podcasts" className="nav-link">
              <span className="nav-link-icon icon-podcasts"></span>
              <span>Podcasts</span>
            </a>
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            <button className="primary-button" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <use href="#regulatory-window"/>
              </svg>
              SECURE MY TERRITORY
            </button>
            <button className="nav-more" aria-label="More options">
              <div className="nav-more-icon">
                <span className="nav-more-dot"></span>
                <span className="nav-more-dot"></span>
                <span className="nav-more-dot"></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* System Status Display */}
        <div className="system-status">SYSTEM OPERATIONAL</div>
      </nav>
    </>
  );
};

export default KineticNavBar;