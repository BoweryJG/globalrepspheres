import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import DarkReality from './components/DarkReality';
import LightReality from './components/LightReality';
import RealityTear from './components/RealityTear';
import AutomationFlow from './components/AutomationFlow';
import CTAButton from './components/CTAButton';
import './SplitRealityHero.css';

/**
 * Split Reality Hero Section
 * Mobile-first design showing the transformation from admin burden to family time
 */
const SplitRealityHero = ({ onGetStarted, onLearnMore }) => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const heroRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle touch gestures for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;
    
    // Swipe up to transform
    if (diff > 50 && !isTransformed) {
      setIsTransformed(true);
    }
    // Swipe down to reset
    else if (diff < -50 && isTransformed) {
      setIsTransformed(false);
    }
  };

  // Handle mouse hover for desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsTransformed(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsTransformed(false);
    }
  };

  return (
    <section 
      ref={heroRef}
      className={`split-reality-hero ${isTransformed ? 'transformed' : ''} ${isMobile ? 'mobile' : 'desktop'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div ref={inViewRef} className="hero-container">
        {/* Headline */}
        <div className="headline-section">
          <h1 className="main-headline">
            <span className="headline-line1">Your 6-Year-Old Asked for</span>
            <span className="headline-emphasis">One More Story.</span>
            <span className="headline-line2">You Said No.</span>
            <span className="headline-reason">For CRM Updates.</span>
          </h1>
        </div>

        {/* Split Reality Visual */}
        <div className="reality-container">
          <div className="dark-reality-wrapper">
            <DarkReality isActive={!isTransformed} inView={inView} />
          </div>
          
          <RealityTear 
            isTransformed={isTransformed} 
            isMobile={isMobile}
          />
          
          <div className="light-reality-wrapper">
            <LightReality isActive={isTransformed} inView={inView} />
          </div>
          
          {isTransformed && (
            <AutomationFlow 
              isActive={isTransformed} 
              isMobile={isMobile}
            />
          )}
        </div>

        {/* Subtitle */}
        <div className="subtitle-section">
          <p className="main-subtitle">
            <span className="subtitle-automation">
              RepSpheres automates everything the second your last call ends.
            </span>
            <span className="subtitle-features">
              Every word transcribed instantly. Every insight captured automatically. 
              Every follow-up generated seamlessly.
            </span>
            <span className="subtitle-freedom">
              No logging. No updates. No guilt.
            </span>
            <span className="subtitle-promise">
              Walk out at 5:01pm and mean it.
            </span>
            <span className="subtitle-redemption">
              Tonight, you read that extra story.
            </span>
          </p>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <CTAButton 
            primary
            onClick={onGetStarted}
            text="Read That Story Tonight"
            icon="book"
          />
          <CTAButton 
            secondary
            onClick={onLearnMore}
            text="See How Automation Works"
            icon="play"
          />
        </div>

        {/* Mobile Swipe Indicator */}
        {isMobile && !isTransformed && (
          <div className="swipe-indicator">
            <span className="swipe-text">Swipe up to transform your reality</span>
            <div className="swipe-arrow" />
          </div>
        )}

        {/* Trust Indicators */}
        <div className="trust-section">
          <div className="trust-item">
            <span className="trust-number">2,847</span>
            <span className="trust-label">Reps home by 5:01pm</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">146,329</span>
            <span className="trust-label">Bedtime stories read</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">3.2M</span>
            <span className="trust-label">Hours reclaimed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export both standard and optimized versions
export default SplitRealityHero;
export { default as SplitRealityHeroOptimized } from './SplitRealityHeroOptimized';

// Auto-select based on environment
export const SplitRealityHeroAuto = (props) => {
  // Use optimized version in production or if performance mode is enabled
  const useOptimized = process.env.NODE_ENV === 'production' || 
                      localStorage.getItem('performanceMode') === 'true';
  
  if (useOptimized) {
    const Optimized = require('./SplitRealityHeroOptimized').default;
    return <Optimized {...props} />;
  }
  
  return <SplitRealityHero {...props} />;
};