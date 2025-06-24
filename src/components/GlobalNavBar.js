import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './GlobalNavBar.css';

// Color themes for different sections
const themes = [
  { impossible: '255, 0, 255', shift: '0, 255, 255', deep: '255, 0, 170' }, // Hero - Magenta/Cyan
  { impossible: '77, 212, 142', shift: '255, 170, 0', deep: '0, 255, 136' }, // Market - Green/Orange
  { impossible: '255, 107, 53', shift: '255, 204, 224', deep: '245, 57, 105' }, // Canvas - Orange/Pink
  { impossible: '75, 150, 220', shift: '159, 88, 250', deep: '0, 212, 255' }, // Sphere OS - Blue/Purple
  { impossible: '245, 57, 105', shift: '255, 0, 255', deep: '159, 88, 250' }  // Podcasts - Pink/Magenta
];

const GlobalNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.05;
      document.documentElement.style.setProperty('--scroll-offset', `${offset}px`);
      
      setIsScrolled(window.scrollY > 50);
      
      // Update theme colors based on scroll position
      const windowHeight = window.innerHeight;
      const section = Math.floor(window.scrollY / windowHeight);
      const themeIndex = Math.min(section, themes.length - 1);
      
      const theme = themes[themeIndex];
      document.documentElement.style.setProperty('--gem-impossible', `rgb(${theme.impossible})`);
      document.documentElement.style.setProperty('--gem-shift', `rgb(${theme.shift})`);
      document.documentElement.style.setProperty('--gem-deep', `rgb(${theme.deep})`);
      document.body.style.setProperty('--gem-impossible', theme.impossible);
      document.body.style.setProperty('--gem-shift', theme.shift);
      document.body.style.setProperty('--gem-deep', theme.deep);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Tilt Effect on Logo
  const handleLogoMouseMove = (e) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * 10;
    const rotateY = -(x / rect.width) * 10;
    logoRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleLogoMouseLeave = () => {
    if (!logoRef.current) return;
    logoRef.current.style.transform = '';
  };

  const handleLogoMouseEnter = () => {
    const jewel = logoRef.current?.querySelector('circle[fill="url(#jewelGradient)"]');
    if (jewel) {
      jewel.style.filter = 'brightness(1.5)';
      setTimeout(() => {
        jewel.style.filter = '';
      }, 150);
    }
  };

  const handleNavLinkClick = (e) => {
    const link = e.currentTarget;
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
      link.style.transform = '';
    }, 100);
  };

  return (
    <div className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        {/* Edge Mount Indicators */}
        <div className="nav-edge left-edge"></div>
        <div className="nav-edge right-edge"></div>

        {/* Advanced Metallic Screws with Wrappers */}
        <div className="nav-screws">
          <div className="screw-wrapper screw-wrapper-top-left">
            <div className="screw">
              <div className="screw-jewel"></div>
            </div>
          </div>
          <div className="screw-wrapper screw-wrapper-top-right">
            <div className="screw">
              <div className="screw-jewel"></div>
            </div>
          </div>
          <div className="screw-wrapper screw-wrapper-bot-left">
            <div className="screw">
              <div className="screw-jewel"></div>
            </div>
          </div>
          <div className="screw-wrapper screw-wrapper-bot-right">
            <div className="screw">
              <div className="screw-jewel"></div>
            </div>
          </div>
        </div>

        <div className="nav-inner">
          {/* Identity */}
          <Link 
            to="/" 
            className="nav-logo" 
            ref={logoRef}
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            onMouseEnter={handleLogoMouseEnter}
          >
            <div className="nav-logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <defs>
                  <linearGradient id="sphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9f58fa" />
                    <stop offset="100%" stopColor="#4B96DC" />
                  </linearGradient>
                  <radialGradient id="jewelGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="30%" stopColor="#ff00ff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#00ffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.9" />
                  </radialGradient>
                  <filter id="glowTrail">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="16" cy="16" r="12" fill="none" stroke="url(#sphereGradient)" strokeWidth="2" opacity="0.8" />
                <circle cx="16" cy="16" r="8" fill="none" stroke="url(#sphereGradient)" strokeWidth="1.5" opacity="0.5" />
                <circle cx="16" cy="16" r="3" fill="url(#jewelGradient)">
                  <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="16" cy="4" r="1.5" fill="#9f58fa" filter="url(#glowTrail)">
                  <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="6s" repeatCount="indefinite"/>
                </circle>
                <circle cx="28" cy="16" r="1.5" fill="#4B96DC" filter="url(#glowTrail)">
                  <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="16" cy="28" r="1.5" fill="#4bd48e" filter="url(#glowTrail)">
                  <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="10s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <span className="nav-logo-text">RepSpheres</span>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links">
            <a 
              href="https://marketdata.repspheres.com/" 
              className="nav-link"
              onClick={handleNavLinkClick}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav-link-icon icon-market"></span>
              <span>Market Data</span>
            </a>
            <a 
              href="https://canvas.repspheres.com/" 
              className="nav-link"
              onClick={handleNavLinkClick}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav-link-icon icon-canvas"></span>
              <span>Canvas</span>
            </a>
            <a 
              href="https://crm.repspheres.com/" 
              className="nav-link"
              onClick={handleNavLinkClick}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav-link-icon icon-sphere"></span>
              <span>Sphere oS</span>
            </a>
            <a 
              href="https://podcast.repspheres.com/" 
              className="nav-link"
              onClick={handleNavLinkClick}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav-link-icon icon-podcasts"></span>
              <span>Podcasts</span>
            </a>
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            <Link to="/signup" className="nav-cta">Get Started</Link>
            <button className="nav-more" aria-label="More options">
              <div className="nav-more-icon">
                <span className="nav-more-dot"></span>
                <span className="nav-more-dot"></span>
                <span className="nav-more-dot"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default GlobalNavBar;