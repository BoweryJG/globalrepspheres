import React, { useEffect, useRef } from 'react';
import '../styles/CategoryDefiningTypography.css';
import './MassSyncHero.css';

const MassSyncHero = () => {
  const canvasRef = useRef(null);
  const statsRef = useRef({ synced: 0, time: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 600;
    
    // Sync visualization
    const particles = [];
    const connections = [];
    
    // Create CRM nodes
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 2,
        type: 'data',
        synced: false
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.synced ? '#00ff88' : '#ff0088';
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 0, 255, ${1 - dist / 100})`;
              ctx.stroke();
            }
          }
        });
      });
      
      // Sync random particles
      if (Math.random() < 0.1) {
        const unsynced = particles.filter(p => !p.synced);
        if (unsynced.length > 0) {
          const p = unsynced[Math.floor(Math.random() * unsynced.length)];
          p.synced = true;
          statsRef.current.synced++;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Update time saved
    const interval = setInterval(() => {
      statsRef.current.time += 75;
      const timeElement = document.getElementById('time-saved');
      if (timeElement) {
        timeElement.textContent = `${statsRef.current.time} HOURS`;
      }
    }, 100);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <section className="mass-sync-hero">
      <canvas ref={canvasRef} className="sync-canvas" />
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="type-hero">
            Never Spend Time in Your CRM
            <span className="type-glitch" data-text="AGAIN">AGAIN</span>
          </h1>
          
          <p className="type-h2 hero-subtitle">
            Mass synchronization at the speed of thought.
            <br />
            <span className="highlight">75x faster</span> than manual entry.
          </p>
          
          <div className="sync-stats">
            <div className="stat-box">
              <span className="stat-label">Time Saved</span>
              <span className="stat-value" id="time-saved">0 HOURS</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Records Synced</span>
              <span className="stat-value">∞</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Efficiency Gain</span>
              <span className="stat-value">75x</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="action-primary type-button">
              <span className="button-icon">⚡</span>
              Start Mass Sync
            </button>
            <button className="action-secondary type-button">
              <span className="button-icon">👁️</span>
              Watch Demo
            </button>
          </div>
          
          <div className="trust-indicators">
            <span className="trust-item">
              <span className="trust-icon">🏆</span>
              10,000+ Reps Automated
            </span>
            <span className="trust-item">
              <span className="trust-icon">⏱️</span>
              2M Hours Saved
            </span>
            <span className="trust-item">
              <span className="trust-icon">🚀</span>
              0.3s Sync Time
            </span>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="sync-demo">
            <div className="crm-window">
              <div className="window-header">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
                <span className="window-title">Legacy CRM</span>
              </div>
              <div className="window-content">
                <div className="data-row loading">Loading...</div>
                <div className="data-row loading">Loading...</div>
                <div className="data-row loading">Loading...</div>
                <div className="data-row loading">Loading...</div>
              </div>
            </div>
            
            <div className="sync-lightning">
              <svg viewBox="0 0 100 200" className="lightning-bolt">
                <path d="M20,0 L40,80 L25,80 L50,200 L30,120 L45,120 Z" 
                      fill="url(#lightning-gradient)" 
                      className="bolt-path"/>
                <defs>
                  <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff00ff" />
                    <stop offset="50%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#ff00ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="repspheres-window">
              <div className="window-header">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
                <span className="window-title">RepSpheres AI</span>
              </div>
              <div className="window-content">
                <div className="data-row synced">✓ 1,247 Contacts Synced</div>
                <div className="data-row synced">✓ 523 Opportunities Updated</div>
                <div className="data-row synced">✓ 89 Deals Closed</div>
                <div className="data-row syncing">⚡ Real-time Sync Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassSyncHero;