import React, { useEffect, useRef } from 'react';
import './LightReality.css';

/**
 * Light Reality Component - The 5:01PM Scene
 * Shows parent reading bedtime story, family time reclaimed
 */
const LightReality = ({ isActive, inView }) => {
  const storyRef = useRef(null);
  const particlesRef = useRef(null);

  // Story Elements Animation
  useEffect(() => {
    if (!inView || !isActive || !storyRef.current) return;

    const storyElements = ['🌟', '🦄', '🏰', '🌙', '✨', '🧚', '🎈', '🌈'];
    const container = storyRef.current;
    
    const createStoryParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'story-particle';
      particle.textContent = storyElements[Math.floor(Math.random() * storyElements.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.fontSize = (Math.random() * 20 + 20) + 'px';
      
      container.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createStoryParticle, 800);

    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [inView, isActive]);

  return (
    <div className={`light-reality ${isActive ? 'active' : ''}`}>
      {/* Story Particles Container */}
      <div ref={storyRef} className="story-particles-container" />
      
      {/* Main Scene */}
      <div className="light-scene">
        {/* Clock showing 5:01 PM */}
        <div className="light-clock">
          <span className="clock-time">5:01</span>
          <span className="clock-period">PM</span>
          <span className="clock-label">Freedom</span>
        </div>

        {/* Parent and Child Reading */}
        <div className="reading-scene">
          {/* Storybook */}
          <div className="storybook">
            <div className="book-cover">
              <div className="book-title">One More Story</div>
              <div className="book-illustration">
                <div className="castle">🏰</div>
                <div className="dragon">🐉</div>
                <div className="stars">✨</div>
              </div>
            </div>
            <div className="book-pages">
              <div className="page left-page">
                <div className="page-text">Once upon a time...</div>
              </div>
              <div className="page right-page">
                <div className="page-text">in a magical kingdom...</div>
              </div>
            </div>
          </div>

          {/* Parent Silhouette (Happy) */}
          <div className="parent-silhouette happy">
            <div className="head">
              <div className="smile" />
            </div>
            <div className="body" />
            <div className="arm holding-book" />
          </div>

          {/* Child Silhouette */}
          <div className="child-silhouette">
            <div className="head">
              <div className="eyes wide" />
            </div>
            <div className="body" />
          </div>

          {/* Bedside Lamp Glow */}
          <div className="lamp-glow" />
        </div>

        {/* Cozy Bedroom Elements */}
        <div className="bedroom-elements">
          {/* Window showing sunset */}
          <div className="window">
            <div className="window-frame">
              <div className="window-pane">
                <div className="sunset-sky">
                  <div className="sun" />
                  <div className="clouds" />
                </div>
              </div>
            </div>
            <div className="window-sill" />
          </div>

          {/* Toy Shelf */}
          <div className="toy-shelf">
            <span className="toy">🧸</span>
            <span className="toy">🚂</span>
            <span className="toy">🎨</span>
          </div>
        </div>

        {/* Happiness Indicators */}
        <div className="happiness-meter">
          <span className="happiness-label">Family Joy Level</span>
          <div className="happiness-bar">
            <div className="happiness-fill" />
          </div>
          <span className="happiness-value">100%</span>
        </div>

        {/* RepSpheres Badge */}
        <div className="repspheres-badge">
          <div className="badge-icon">✓</div>
          <span className="badge-text">Automated & Free</span>
        </div>

        {/* Floating Hearts */}
        <div className="floating-hearts">
          <span className="heart">💛</span>
          <span className="heart delayed">💛</span>
          <span className="heart more-delayed">💛</span>
        </div>
      </div>

      {/* Warm Overlay */}
      <div className="warm-overlay" />
    </div>
  );
};

export default LightReality;