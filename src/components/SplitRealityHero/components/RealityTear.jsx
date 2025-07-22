import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './RealityTear.css';

/**
 * Reality Tear Component - The animated split between realities
 * Shows the dramatic transformation from dark to light
 */
const RealityTear = ({ isTransformed, isMobile }) => {
  const tearRef = useRef(null);
  const particlesRef = useRef(null);
  const lightningRef = useRef(null);

  // Tear animation with GSAP
  useEffect(() => {
    if (!tearRef.current) return;

    const tl = gsap.timeline();

    if (isTransformed) {
      // Open the tear
      tl.to(tearRef.current, {
        clipPath: isMobile 
          ? 'polygon(0% 45%, 100% 40%, 100% 60%, 0% 55%)'
          : 'polygon(45% 0%, 55% 0%, 60% 100%, 40% 100%)',
        duration: 0.8,
        ease: 'power2.inOut'
      });

      // Add lightning effect
      if (lightningRef.current) {
        tl.to(lightningRef.current, {
          opacity: 1,
          duration: 0.1,
          repeat: 3,
          yoyo: true
        }, '-=0.4');
      }
    } else {
      // Close the tear
      tl.to(tearRef.current, {
        clipPath: isMobile
          ? 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)'
          : 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  }, [isTransformed, isMobile]);

  // Particle generation
  useEffect(() => {
    if (!particlesRef.current || !isTransformed) return;

    const container = particlesRef.current;
    const particleCount = isMobile ? 15 : 25;
    
    // Clear existing particles
    container.innerHTML = '';

    // Create transformation particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'tear-particle';
      
      // Random starting position along the tear
      if (isMobile) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '50%';
      } else {
        particle.style.left = '50%';
        particle.style.top = Math.random() * 100 + '%';
      }

      // Random particle properties
      particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [isTransformed, isMobile]);

  return (
    <div className={`reality-tear ${isTransformed ? 'active' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Main tear effect */}
      <div ref={tearRef} className="tear-path">
        <div className="tear-edge" />
        <div className="tear-glow" />
      </div>

      {/* Lightning effect */}
      <div ref={lightningRef} className="lightning-effect" />

      {/* Transformation particles */}
      <div ref={particlesRef} className="tear-particles" />

      {/* Energy waves */}
      {isTransformed && (
        <>
          <div className="energy-wave wave-1" />
          <div className="energy-wave wave-2" />
          <div className="energy-wave wave-3" />
        </>
      )}

      {/* RepSpheres Prism at center */}
      <div className="repspheres-prism">
        <div className="prism-core">
          <div className="prism-face front" />
          <div className="prism-face back" />
          <div className="prism-face left" />
          <div className="prism-face right" />
        </div>
        <div className="prism-glow" />
      </div>

      {/* Tear Labels */}
      <div className="tear-labels">
        <span className="label dark-label">Admin Prison</span>
        <span className="label light-label">Family Freedom</span>
      </div>
    </div>
  );
};

export default RealityTear;