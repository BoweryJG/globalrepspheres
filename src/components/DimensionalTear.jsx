import React, { useEffect, useRef, useState } from 'react';
import MagneticButtons from './MagneticButtons';
import './DimensionalTear.css';

const DimensionalTear = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tearProgress, setTearProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [interactionHeat, setInteractionHeat] = useState(0);
  const [isHighPerformance, setIsHighPerformance] = useState(true);
  const containerRef = useRef(null);
  const timeStartRef = useRef(Date.now());

  // Performance detection
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const hasSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g' ||
         navigator.connection.effectiveType === '3g');
      
      const isLowPerformance = isMobile || hasLowMemory || hasSlowConnection;
      setIsHighPerformance(!isLowPerformance);
    };

    checkPerformance();
  }, []);

  // Mouse and Touch tracking for tear effect
  useEffect(() => {
    const getPositionFromEvent = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      return { clientX, clientY };
    };

    const handleInteraction = (e) => {
      if (containerRef.current) {
        const { clientX, clientY } = getPositionFromEvent(e);
        if (clientX !== undefined && clientY !== undefined) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = ((clientX - rect.left) / rect.width) * 100;
          const y = ((clientY - rect.top) / rect.height) * 100;
          setMousePos({ x, y });
          
          // Increase interaction heat on interaction
          setInteractionHeat(prev => Math.min(prev + 0.05, 1));
        }
      }
    };

    const handleInteractionStart = () => {
      setTearProgress(1);
    };

    const handleInteractionEnd = () => {
      setTearProgress(0);
    };

    const container = containerRef.current;
    if (container) {
      // Mouse events
      container.addEventListener('mousemove', handleInteraction);
      container.addEventListener('mouseenter', handleInteractionStart);
      container.addEventListener('mouseleave', handleInteractionEnd);
      
      // Touch events
      container.addEventListener('touchmove', handleInteraction, { passive: true });
      container.addEventListener('touchstart', handleInteractionStart, { passive: true });
      container.addEventListener('touchend', handleInteractionEnd, { passive: true });
      
      return () => {
        container.removeEventListener('mousemove', handleInteraction);
        container.removeEventListener('mouseenter', handleInteractionStart);
        container.removeEventListener('mouseleave', handleInteractionEnd);
        container.removeEventListener('touchmove', handleInteraction);
        container.removeEventListener('touchstart', handleInteractionStart);
        container.removeEventListener('touchend', handleInteractionEnd);
      };
    }
  }, []);

  // Scroll tracking for living color system
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Time on page tracking
  useEffect(() => {
    const interval = setInterval(() => {
      const timeElapsed = (Date.now() - timeStartRef.current) / 1000;
      setTimeOnPage(Math.min(timeElapsed / 60, 1)); // Normalize to 0-1 over 60 seconds
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Interaction heat decay
  useEffect(() => {
    const interval = setInterval(() => {
      setInteractionHeat(prev => Math.max(prev - 0.01, 0));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update CSS custom properties
  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      element.style.setProperty('--mouse-x', `${mousePos.x}%`);
      element.style.setProperty('--mouse-y', `${mousePos.y}%`);
      element.style.setProperty('--tear-progress', tearProgress);
      element.style.setProperty('--scroll-progress', scrollProgress);
      element.style.setProperty('--time-on-page', timeOnPage);
      element.style.setProperty('--interaction-heat', interactionHeat);
    }
  }, [mousePos, tearProgress, scrollProgress, timeOnPage, interactionHeat]);

  return (
    <div 
      className={`dimensional-tear-container ${isHighPerformance ? 'high-performance' : 'low-performance'}`} 
      ref={containerRef}
    >
      {/* Falling Side - Digital Decay */}
      <div className="tear-side falling-side">
        <div className="side-content">
          <div className="side-title">The Falling Path</div>
          <div className="side-description">
            Traditional reps grinding through endless cold calls, 
            watching opportunities slip away, trapped in digital mediocrity.
          </div>
          <div className="falling-particles">
            {isHighPerformance && [...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="falling-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
            {!isHighPerformance && [...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="falling-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dimensional Tear Effect */}
      <div className="dimensional-tear">
        <div className="tear-electricity">
          {[...Array(isHighPerformance ? 5 : 3)].map((_, i) => (
            <div 
              key={i} 
              className="electric-strand"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        <div className="tear-core">
          <div className="core-energy" />
          <div className="energy-pulse" />
        </div>
      </div>

      {/* Rising Side - Ascension */}
      <div className="tear-side rising-side">
        <div className="side-content">
          <div className="side-title">The Rising Path</div>
          <div className="side-description">
            AI-powered reps ascending to unprecedented heights, 
            converting prospects at 75x traditional rates.
          </div>
          <div className="rising-particles">
            {isHighPerformance && [...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="rising-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
            {!isHighPerformance && [...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="rising-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">The Second Electricity</span>
          <span className="title-line tear-word">MOMENT</span>
          <span className="title-line">Has Arrived</span>
        </h1>
        
        <p className="hero-subtitle">
          In your lifetime, there have been two vertically enabling technologies. 
          First was electricity. Second is artificial intelligence. Who leverages 
          its power will lead and move markets, starting today.
        </p>

        <div className="hero-supporting-copy">
          <div className="supporting-point">
            <span className="point-indicator">•</span>
            This isn't another trend. This isn't new technology. This is fundamental 
            infrastructure that's rewiring how the world operates.
          </div>
          <div className="supporting-point">
            <span className="point-indicator">•</span>
            CEOs of AI companies confirm: This transformation rivals electricity 
            in scope and inevitability.
          </div>
          <div className="supporting-point">
            <span className="point-indicator">•</span>
            The question isn't IF you'll adapt. It's whether you'll lead or follow.
          </div>
        </div>

        <div className="hero-cta">
          <MagneticButtons 
            onChoice={(choice) => {
              if (choice === 'empire') {
                // Handle ascension choice
                window.location.href = '/signup';
              } else {
                // Handle falling choice - could show educational content
                console.log('User chose digital decay');
              }
            }}
          />
        </div>
      </div>

      {/* Environmental Lighting Layer */}
      <div className="environment-layer" />
    </div>
  );
};

export default DimensionalTear;