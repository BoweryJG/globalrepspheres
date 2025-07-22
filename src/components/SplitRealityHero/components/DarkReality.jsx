import React, { useEffect, useRef } from 'react';
import './DarkReality.css';

/**
 * Dark Reality Component - The 8:17PM Scene
 * Shows parent working late, missing family time
 */
const DarkReality = ({ isActive, inView }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // CRM Rain Effect
  useEffect(() => {
    if (!inView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // CRM Field Particles
    const particles = [];
    const particleCount = 30;
    const crmFields = ['Name', 'Email', 'Phone', 'Status', 'Notes', 'Follow-up', 'Deal Size', 'Next Step'];

    class CRMParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.speed = Math.random() * 0.5 + 0.5;
        this.text = crmFields[Math.floor(Math.random() * crmFields.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.size = Math.random() * 12 + 10;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.font = `${this.size}px JetBrains Mono`;
        ctx.fillStyle = `rgba(74, 144, 226, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CRMParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, isActive]);

  return (
    <div className={`dark-reality ${isActive ? 'active' : ''}`}>
      {/* Background Canvas for CRM Rain */}
      <canvas ref={canvasRef} className="crm-rain-canvas" />
      
      {/* Main Scene */}
      <div className="dark-scene">
        {/* Clock showing 8:17 PM */}
        <div className="dark-clock">
          <span className="clock-time">8:17</span>
          <span className="clock-period">PM</span>
        </div>

        {/* Parent at Laptop */}
        <div className="parent-working">
          <div className="laptop">
            <div className="laptop-screen">
              <div className="crm-interface">
                <div className="crm-header">CRM Updates - 47 Remaining</div>
                <div className="crm-form">
                  <div className="form-field">
                    <label>Contact Name</label>
                    <div className="field-input" />
                  </div>
                  <div className="form-field">
                    <label>Call Notes</label>
                    <div className="field-input tall" />
                  </div>
                  <div className="form-field">
                    <label>Next Steps</label>
                    <div className="field-input" />
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop-keyboard" />
          </div>
          
          {/* Parent Silhouette */}
          <div className="parent-silhouette">
            <div className="head" />
            <div className="shoulders" />
            <div className="screen-glow" />
          </div>
        </div>

        {/* Bedroom Door */}
        <div className="bedroom-door">
          <div className="door-frame">
            <div className="door">
              <div className="door-handle" />
              <div className="light-under-door" />
            </div>
          </div>
          <div className="door-sign">Kids' Room</div>
        </div>

        {/* Missed Moments Counter */}
        <div className="missed-moments">
          <span className="missed-label">Tonight's Missed Moments:</span>
          <span className="missed-count">3</span>
        </div>

        {/* Coffee Cup (Cold) */}
        <div className="cold-coffee">
          <div className="coffee-cup">
            <div className="coffee-liquid" />
            <div className="coffee-steam gone" />
          </div>
        </div>

        {/* Phone with Missed Calls */}
        <div className="phone">
          <div className="phone-screen">
            <div className="missed-call">
              <span className="caller">Home</span>
              <span className="call-count">3 missed calls</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Effects */}
      <div className="dark-overlay" />
      <div className="scan-lines" />
    </div>
  );
};

export default DarkReality;