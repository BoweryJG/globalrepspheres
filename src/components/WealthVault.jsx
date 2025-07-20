import React, { useEffect, useRef, useState } from 'react';
import './WealthVault.css';

const WealthVault = () => {
  const cubeRef = useRef(null);
  const [vaultFill, setVaultFill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Gradually fill the vault
    const fillInterval = setInterval(() => {
      setVaultFill(prev => {
        if (prev >= 1) return 1;
        return prev + 0.01;
      });
    }, 100);

    return () => clearInterval(fillInterval);
  }, []);

  // Mouse tracking for 3D rotation effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cubeRef.current || !isHovering) return;
      
      const rect = cubeRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  // Generate gold particles
  const goldParticles = [];
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 2;
    goldParticles.push(
      <div
        key={i}
        className="gold-particle"
        style={{
          '--angle': angle,
          '--particle-index': i,
          '--particle-delay': `${Math.random() * 5}s`,
          '--particle-duration': `${5 + Math.random() * 3}s`,
          '--particle-scale': 0.5 + Math.random() * 0.5
        }}
      />
    );
  }

  // Calculate rotation based on mouse position
  const rotateY = isHovering ? (mousePosition.x - 50) * 0.5 : 0;
  const rotateX = isHovering ? (mousePosition.y - 50) * -0.5 : 0;

  return (
    <div className="wealth-vault-container">
      <div className="vault-scene">
        <div 
          ref={cubeRef}
          className="wealth-cube"
          style={{
            '--vault-fill': vaultFill,
            '--rotate-y': `${rotateY}deg`,
            '--rotate-x': `${rotateX}deg`
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Cube faces */}
          <div className="cube-face cube-front">
            <div className="face-content">
              <div className="face-grid"></div>
              <div className="face-label">FRONT</div>
            </div>
          </div>
          <div className="cube-face cube-back">
            <div className="face-content">
              <div className="face-grid"></div>
              <div className="face-label">BACK</div>
            </div>
          </div>
          <div className="cube-face cube-right">
            <div className="face-content">
              <div className="face-grid"></div>
              <div className="face-label">RIGHT</div>
            </div>
          </div>
          <div className="cube-face cube-left">
            <div className="face-content">
              <div className="face-grid"></div>
              <div className="face-label">LEFT</div>
            </div>
          </div>
          <div className="cube-face cube-top">
            <div className="face-content">
              <div className="face-grid"></div>
              <div className="face-label">TOP</div>
            </div>
          </div>
          <div className="cube-face cube-bottom">
            <div className="face-content">
              <div className="face-grid"></div>
              <div className="face-label">BOTTOM</div>
            </div>
          </div>

          {/* Inner particle swirl */}
          <div className="wealth-particles">
            {goldParticles}
          </div>

          {/* Central core */}
          <div className="vault-core">
            <div className="core-glow"></div>
            <div className="core-pulse"></div>
          </div>
        </div>

        {/* Environmental reflections */}
        <div className="vault-reflections">
          <div className="reflection reflection-floor"></div>
          <div className="reflection reflection-left"></div>
          <div className="reflection reflection-right"></div>
        </div>
      </div>

      {/* Vault metrics */}
      <div className="vault-metrics">
        <div className="metric-item">
          <div className="metric-label">Vault Status</div>
          <div className="metric-value">{Math.round(vaultFill * 100)}% Full</div>
          <div className="metric-bar">
            <div 
              className="metric-fill"
              style={{ width: `${vaultFill * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Daily Accumulation</div>
          <div className="metric-value">+$47,293</div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Compound Rate</div>
          <div className="metric-value">∞</div>
        </div>
      </div>

      {/* Floating wealth indicators */}
      <div className="wealth-indicators">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="wealth-indicator"
            style={{
              '--indicator-index': i,
              '--indicator-delay': `${i * 0.5}s`
            }}
          >
            +${Math.round(Math.random() * 10000 + 5000)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WealthVault;