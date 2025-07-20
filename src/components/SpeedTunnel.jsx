import React, { useEffect, useRef, useState } from 'react';
import './SpeedTunnel.css';

const SpeedTunnel = () => {
  const tunnelRef = useRef(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const velocityTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
      
      setScrollVelocity(Math.min(velocity / 10, 1)); // Normalize to 0-1
      
      // Clear existing timeout
      if (velocityTimeout.current) {
        clearTimeout(velocityTimeout.current);
      }
      
      // Reset velocity after scrolling stops
      velocityTimeout.current = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimeout.current) {
        clearTimeout(velocityTimeout.current);
      }
    };
  }, []);

  // Generate tunnel segments
  const tunnelSegments = [];
  for (let i = 0; i < 20; i++) {
    tunnelSegments.push(
      <div
        key={i}
        className="tunnel-segment"
        style={{ '--z': i }}
      />
    );
  }

  // Generate traditional reps (ground crawlers)
  const traditionalReps = [];
  for (let i = 0; i < 5; i++) {
    traditionalReps.push(
      <div
        key={i}
        className="traditional-rep"
        style={{
          left: `${20 + i * 15}%`,
          animationDelay: `${i * 2}s`
        }}
      />
    );
  }

  // Generate AI reps (light streaks)
  const aiReps = [];
  for (let i = 0; i < 10; i++) {
    aiReps.push(
      <div
        key={i}
        className="ai-rep"
        style={{
          top: `${30 + Math.random() * 40}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${0.3 + Math.random() * 0.4}s`
        }}
      />
    );
  }

  return (
    <div className="speed-tunnel-container">
      <div 
        ref={tunnelRef}
        className="speed-tunnel"
        style={{
          '--scroll-velocity': scrollVelocity,
          '--turbulence': scrollVelocity * 0.5
        }}
      >
        {/* Tunnel structure */}
        <div className="tunnel-structure">
          {tunnelSegments}
        </div>

        {/* Traditional reps crawling */}
        <div className="traditional-reps-container">
          {traditionalReps}
        </div>

        {/* AI reps zooming */}
        <div className="ai-reps-container">
          {aiReps}
        </div>

        {/* Speed lines */}
        <div className="speed-lines">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="speed-line"
              style={{
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Info overlay */}
      <div className="speed-info">
        <div className="speed-comparison">
          <div className="comparison-item traditional">
            <div className="item-label">Traditional Reps</div>
            <div className="item-speed">1x Speed</div>
            <div className="item-description">Still making cold calls</div>
          </div>
          <div className="comparison-divider">VS</div>
          <div className="comparison-item ai">
            <div className="item-label">AI-Powered Reps</div>
            <div className="item-speed">75x Speed</div>
            <div className="item-description">Quantum leap ahead</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTunnel;