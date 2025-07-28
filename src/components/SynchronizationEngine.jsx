import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './SynchronizationEngine.css';

const SynchronizationEngine = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [syncCount, setSyncCount] = useState(12847);
  const [hoveredThread, setHoveredThread] = useState(null);
  const [isEngineActive, setIsEngineActive] = useState(false);
  const animationRef = useRef(null);
  const threadsRef = useRef([]);
  const particlesRef = useRef([]);

  // Mobile detection
  const isMobile = window.innerWidth <= 768;
  const threadCount = isMobile ? 50 : 200;
  const particleCount = isMobile ? 100 : 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = containerRef.current;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize threads
    threadsRef.current = Array.from({ length: threadCount }, (_, i) => ({
      id: i,
      angle: (i / threadCount) * Math.PI * 2,
      length: Math.random() * 150 + 100,
      speed: Math.random() * 0.5 + 0.5,
      color: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#ffaa00',
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      pulsePhase: Math.random() * Math.PI * 2,
      dataPackets: []
    }));

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5
    }));

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;

      // Draw background particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.1})`;
        ctx.fill();
      });

      // Draw central orb
      const orbGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
      orbGradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
      orbGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.5)');
      orbGradient.addColorStop(1, 'rgba(255, 170, 0, 0.3)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 + Math.sin(time) * 5, 0, Math.PI * 2);
      ctx.fillStyle = orbGradient;
      ctx.fill();

      // Draw neural network inside orb
      for (let i = 0; i < 20; i++) {
        const angle1 = (i / 20) * Math.PI * 2 + time * 0.5;
        const angle2 = ((i + 1) / 20) * Math.PI * 2 + time * 0.5;
        const radius = 30;
        
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle1) * radius,
          centerY + Math.sin(angle1) * radius
        );
        ctx.lineTo(
          centerX + Math.cos(angle2) * radius,
          centerY + Math.sin(angle2) * radius
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw threads
      threadsRef.current.forEach((thread, i) => {
        // Update thread animation
        thread.angle += thread.speed * 0.001;
        thread.pulsePhase += 0.05;
        
        const baseLength = thread.length * (1 + Math.sin(thread.pulsePhase) * 0.2);
        thread.targetX = centerX + Math.cos(thread.angle) * baseLength;
        thread.targetY = centerY + Math.sin(thread.angle) * baseLength;
        
        // Smooth movement
        thread.currentX += (thread.targetX - thread.currentX) * 0.1;
        thread.currentY += (thread.targetY - thread.currentY) * 0.1;

        // Draw thread
        const gradient = ctx.createLinearGradient(centerX, centerY, thread.currentX, thread.currentY);
        gradient.addColorStop(0, thread.color);
        gradient.addColorStop(1, `${thread.color}33`);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(thread.currentX, thread.currentY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = hoveredThread === i ? 3 : 1;
        ctx.stroke();

        // Draw data packets
        if (isEngineActive && Math.random() < 0.02) {
          thread.dataPackets.push({
            position: 0,
            speed: Math.random() * 2 + 1
          });
        }

        thread.dataPackets = thread.dataPackets.filter(packet => {
          packet.position += packet.speed * 0.01;
          
          if (packet.position > 1) {
            // Create burst effect at completion
            for (let j = 0; j < 5; j++) {
              particlesRef.current.push({
                x: thread.currentX,
                y: thread.currentY,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: 1
              });
            }
            return false;
          }

          const packetX = centerX + (thread.currentX - centerX) * packet.position;
          const packetY = centerY + (thread.currentY - centerY) * packet.position;
          
          ctx.beginPath();
          ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
          ctx.fillStyle = thread.color;
          ctx.fill();
          
          return true;
        });
      });

      // Limit particles
      if (particlesRef.current.length > particleCount) {
        particlesRef.current = particlesRef.current.slice(-particleCount);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Sync counter animation
    const counterInterval = setInterval(() => {
      setSyncCount(prev => {
        const increment = isEngineActive ? Math.floor(Math.random() * 50 + 10) : Math.floor(Math.random() * 5);
        return prev + increment;
      });
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
      clearInterval(counterInterval);
    };
  }, [isEngineActive, hoveredThread, isMobile]);

  const handleStartEngine = () => {
    setIsEngineActive(true);
    
    // Burst animation
    gsap.to(containerRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Check which thread was clicked
    threadsRef.current.forEach((thread, i) => {
      const distance = Math.sqrt(
        Math.pow(thread.currentX - x, 2) + 
        Math.pow(thread.currentY - y, 2)
      );
      
      if (distance < 20) {
        setHoveredThread(i);
        setTimeout(() => setHoveredThread(null), 2000);
      }
    });
  };

  return (
    <section className="synchronization-engine" ref={containerRef}>
      <div className="sync-header">
        <h2 className="type-display type-glitch" data-text="The Synchronization Engine">
          The Synchronization Engine
        </h2>
        <p className="type-body sync-subtitle">
          {isMobile ? "Tap to explore connections" : "While others send one email at a time, you're orchestrating thousands"}
        </p>
      </div>

      <div className="sync-visualization">
        <canvas 
          ref={canvasRef} 
          className="sync-canvas"
          onClick={handleCanvasClick}
        />
        
        <div className="sync-stats">
          <div className="stat-box">
            <span className="stat-label">Active Synchronizations</span>
            <span className="stat-value type-number">{syncCount.toLocaleString()}</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-label">Efficiency Multiplier</span>
            <span className="stat-value type-number">75x</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-label">Time Saved Today</span>
            <span className="stat-value type-number">18.4h</span>
          </div>
        </div>

        {!isEngineActive && (
          <button 
            className="start-engine-btn"
            onClick={handleStartEngine}
          >
            <span className="btn-text">Start Your Engine</span>
            <span className="btn-icon">⚡</span>
          </button>
        )}

        {hoveredThread !== null && (
          <div className="thread-tooltip">
            <p>Email Campaign #47</p>
            <p>Status: Synchronizing</p>
            <p>Targets: 1,247 prospects</p>
          </div>
        )}
      </div>

      <div className="sync-features">
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3 className="type-h4">Parallel Processing</h3>
          <p className="type-body">Execute thousands of actions simultaneously</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3 className="type-h4">AI Orchestration</h3>
          <p className="type-body">Intelligent routing and prioritization</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3 className="type-h4">Real-Time Sync</h3>
          <p className="type-body">Instant updates across all channels</p>
        </div>
      </div>
    </section>
  );
};

export default SynchronizationEngine;