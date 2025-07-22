import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePerformance, useLazyLoad, useThrottle } from './hooks/usePerformance';
import {
  DarkRealityLazy,
  LightRealityLazy,
  RealityTearLazy,
  AutomationFlowLazy
} from './components/LazyComponents';
import CTAButton from './components/CTAButton';
import './SplitRealityHero.css';
import './SplitRealityHeroPerformance.css';

/**
 * Optimized Split Reality Hero Section
 * Features performance monitoring, lazy loading, and reduced motion support
 */
const SplitRealityHeroOptimized = memo(({ onGetStarted, onLearnMore }) => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const heroRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  });

  // Performance optimization hooks
  const { performanceMode, reducedMotion, fps } = usePerformance();
  const { ref: lazyRef, hasLoaded } = useLazyLoad(0.1);

  // Combine refs
  useEffect(() => {
    if (inViewRef && lazyRef) {
      lazyRef(inViewRef);
    }
  }, [inViewRef, lazyRef]);

  // Detect mobile device with debounce
  useEffect(() => {
    let timeoutId;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 150);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Throttled touch handlers
  const handleTouchStart = useCallback((e) => {
    if (performanceMode || reducedMotion) return;
    setTouchStart(e.touches[0].clientY);
    setHasInteracted(true);
  }, [performanceMode, reducedMotion]);

  const handleTouchMove = useThrottle((e) => {
    if (!touchStart || performanceMode || reducedMotion) return;
    
    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;
    
    // Swipe up to transform
    if (diff > 50 && !isTransformed) {
      setIsTransformed(true);
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
    // Swipe down to reset
    else if (diff < -50 && isTransformed) {
      setIsTransformed(false);
    }
  }, 100);

  // Optimized mouse handlers
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && !performanceMode && !reducedMotion) {
      setIsTransformed(true);
      setHasInteracted(true);
    }
  }, [isMobile, performanceMode, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && !performanceMode && !reducedMotion) {
      setIsTransformed(false);
    }
  }, [isMobile, performanceMode, reducedMotion]);

  // Memoized CTA handlers
  const handleGetStarted = useCallback(() => {
    onGetStarted?.();
  }, [onGetStarted]);

  const handleLearnMore = useCallback(() => {
    onLearnMore?.();
  }, [onLearnMore]);

  // Render performance mode version
  if (performanceMode || !hasLoaded) {
    return (
      <section className="split-reality-hero performance-mode">
        <div className="hero-container">
          <div className="headline-section">
            <h1 className="main-headline">
              <span className="headline-line1">Your 6-Year-Old Asked for</span>
              <span className="headline-emphasis">One More Story.</span>
              <span className="headline-line2">You Said No.</span>
              <span className="headline-reason">For CRM Updates.</span>
            </h1>
          </div>
          
          <div className="subtitle-section">
            <p className="main-subtitle">
              <span className="subtitle-automation">
                RepSpheres automates everything the second your last call ends.
              </span>
              <span className="subtitle-promise">
                Walk out at 5:01pm and mean it.
              </span>
            </p>
          </div>

          <div className="cta-section">
            <CTAButton 
              primary
              onClick={handleGetStarted}
              text="Read That Story Tonight"
              icon="book"
            />
            <CTAButton 
              secondary
              onClick={handleLearnMore}
              text="See How It Works"
              icon="play"
            />
          </div>

          {performanceMode && (
            <div className="performance-notice">
              Performance mode enabled (FPS: {fps})
            </div>
          )}
        </div>
      </section>
    );
  }

  // Full experience
  return (
    <section 
      ref={heroRef}
      className={`split-reality-hero ${isTransformed ? 'transformed' : ''} ${isMobile ? 'mobile' : 'desktop'} ${reducedMotion ? 'reduced-motion' : ''}`}
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

        {/* Split Reality Visual - Lazy Loaded */}
        <div className="reality-container">
          {inView && (
            <>
              <div className="dark-reality-wrapper">
                <DarkRealityLazy isActive={!isTransformed} inView={inView} />
              </div>
              
              <RealityTearLazy 
                isTransformed={isTransformed} 
                isMobile={isMobile}
              />
              
              <div className="light-reality-wrapper">
                <LightRealityLazy isActive={isTransformed} inView={inView} />
              </div>
              
              {isTransformed && hasInteracted && (
                <AutomationFlowLazy 
                  isActive={isTransformed} 
                  isMobile={isMobile}
                />
              )}
            </>
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
            onClick={handleGetStarted}
            text="Read That Story Tonight"
            icon="book"
          />
          <CTAButton 
            secondary
            onClick={handleLearnMore}
            text="See How Automation Works"
            icon="play"
          />
        </div>

        {/* Mobile Swipe Indicator */}
        {isMobile && !isTransformed && !hasInteracted && (
          <div className="swipe-indicator">
            <span className="swipe-text">Swipe up to transform your reality</span>
            <div className="swipe-arrow" />
          </div>
        )}

        {/* Trust Indicators - Lazy loaded when in view */}
        {inView && (
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
        )}
      </div>
    </section>
  );
});

SplitRealityHeroOptimized.displayName = 'SplitRealityHeroOptimized';

export default SplitRealityHeroOptimized;