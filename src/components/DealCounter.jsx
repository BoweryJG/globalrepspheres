import React, { useState, useEffect, useRef } from 'react';
import './DealCounter.css';

const DealCounter = ({ initialCount = 0, targetCount = 1000, duration = 30000 }) => {
  const [count, setCount] = useState(initialCount);
  const [showExplosion, setShowExplosion] = useState(false);
  const [successStories, setSuccessStories] = useState([]);
  const counterRef = useRef(null);
  const particlesRef = useRef(null);

  // Success story messages that appear as trails
  const storyMessages = [
    "Another rep just closed $50K!",
    "Sarah hit 150% quota!",
    "Team record broken!",
    "Client signed 3-year deal!",
    "Revenue milestone achieved!",
    "New partnership secured!",
    "Enterprise deal closed!",
    "Fastest close ever!"
  ];

  useEffect(() => {
    const increment = targetCount / (duration / 100);
    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + increment;
        
        // Trigger explosion effect at certain milestones
        if (Math.floor(newCount) % 100 === 0 && Math.floor(newCount) !== Math.floor(prevCount)) {
          triggerExplosion();
          addSuccessStory();
        }
        
        if (newCount >= targetCount) {
          clearInterval(interval);
          return targetCount;
        }
        return newCount;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [targetCount, duration]);

  const triggerExplosion = () => {
    setShowExplosion(true);
    
    // Create particles for browsers that don't support CSS Houdini
    if (particlesRef.current && !CSS.paintWorklet) {
      createParticles();
    }
    
    setTimeout(() => setShowExplosion(false), 500);
  };

  const createParticles = () => {
    const particleCount = 50;
    const container = particlesRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random angle and velocity
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const velocity = 50 + Math.random() * 100;
      
      particle.style.setProperty('--angle', angle);
      particle.style.setProperty('--velocity', velocity);
      particle.style.setProperty('--delay', Math.random() * 0.2 + 's');
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => particle.remove(), 1000);
    }
  };

  const addSuccessStory = () => {
    const story = {
      id: Date.now(),
      text: storyMessages[Math.floor(Math.random() * storyMessages.length)],
      x: Math.random() * 80 + 10, // 10-90% from left
      y: Math.random() * 60 + 20  // 20-80% from top
    };
    
    setSuccessStories(prev => [...prev, story]);
    
    // Remove story after animation completes
    setTimeout(() => {
      setSuccessStories(prev => prev.filter(s => s.id !== story.id));
    }, 3000);
  };

  return (
    <div className="deal-counter-container">
      <div 
        ref={counterRef}
        className={`deal-counter ${showExplosion ? 'exploding' : ''}`}
        data-count={Math.floor(count)}
        style={{
          '--particle-count': 50,
          '--explosion-force': 100,
          '--particle-color': '#FFD700'
        }}
      >
        <div className="counter-label">Deals Closed Today</div>
        <div className="counter-number">
          {Math.floor(count).toLocaleString()}
        </div>
        <div className="counter-sublabel">Crushing Traditional Sales</div>
      </div>
      
      {/* Particle container for fallback animation */}
      <div ref={particlesRef} className="particles-container" />
      
      {/* Success story trails */}
      <div className="success-trails">
        {successStories.map(story => (
          <div
            key={story.id}
            className="success-trail"
            style={{
              left: `${story.x}%`,
              top: `${story.y}%`
            }}
          >
            {story.text}
          </div>
        ))}
      </div>
      
      {/* Glow effect that intensifies with count */}
      <div 
        className="counter-glow"
        style={{
          '--glow-intensity': Math.min(count / targetCount, 1)
        }}
      />
    </div>
  );
};

export default DealCounter;