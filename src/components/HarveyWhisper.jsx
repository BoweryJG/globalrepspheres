import React, { useEffect, useRef, useState } from 'react';
import './HarveyWhisper.css';

const HarveyWhisper = () => {
  const helixRef = useRef(null);
  const [whisperTexts] = useState([
    "Your empire awaits...",
    "Unlock infinite potential...",
    "Transform your reality...",
    "Ascend beyond limits..."
  ]);
  const [currentWhisper, setCurrentWhisper] = useState(0);

  useEffect(() => {
    // Cycle through whisper texts
    const textInterval = setInterval(() => {
      setCurrentWhisper((prev) => (prev + 1) % whisperTexts.length);
    }, 4000);

    // Generate particles
    const particleContainer = helixRef.current?.querySelector('.particle-container');
    if (particleContainer) {
      // Create initial particles
      for (let i = 0; i < 20; i++) {
        createParticle(particleContainer, i);
      }

      // Continuously generate new particles
      const particleInterval = setInterval(() => {
        const existingParticles = particleContainer.querySelectorAll('.whisper-particle');
        if (existingParticles.length < 30) {
          createParticle(particleContainer, existingParticles.length);
        }
      }, 300);

      return () => {
        clearInterval(textInterval);
        clearInterval(particleInterval);
      };
    }

    return () => clearInterval(textInterval);
  }, [whisperTexts.length]);

  const createParticle = (container, index) => {
    const particle = document.createElement('div');
    particle.className = 'whisper-particle';
    particle.style.setProperty('--particle-delay', `${Math.random() * 3}s`);
    particle.style.setProperty('--particle-duration', `${3 + Math.random() * 2}s`);
    particle.style.setProperty('--particle-rotation', `${Math.random() * 360}deg`);
    particle.style.setProperty('--particle-offset', `${(Math.random() - 0.5) * 40}px`);
    
    container.appendChild(particle);

    // Remove particle after animation
    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  };

  // Generate helix strands
  const helixStrands = [];
  for (let i = 0; i < 36; i++) {
    helixStrands.push(
      <div
        key={i}
        className="helix-strand"
        style={{ '--n': i }}
      />
    );
  }

  return (
    <div className="harvey-whisper-container">
      <div className="binaural-helix" ref={helixRef}>
        <div className="helix-wrapper">
          {helixStrands}
        </div>
        <div className="particle-container"></div>
        <div className="whisper-text-container">
          {whisperTexts.map((text, index) => (
            <div
              key={index}
              className={`whisper-text ${index === currentWhisper ? 'active' : ''}`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="helix-glow"></div>
    </div>
  );
};

export default HarveyWhisper;