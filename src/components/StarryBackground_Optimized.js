import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

// Configuration
const CONFIG = {
  STAR_COUNT: 150, // Can handle more stars with canvas
  MIN_SIZE: 0.5,
  MAX_SIZE: 2.5,
  MIN_BRIGHTNESS: 0.3,
  MAX_BRIGHTNESS: 1,
  TWINKLE_SPEED: 0.001,
  USE_WEBGL: false, // Set to true for even better performance
  STATIC_STARS_RATIO: 0.7, // 70% of stars don't twinkle for performance
};

// Star class for efficient management
class Star {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = CONFIG.MIN_SIZE + Math.random() * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE);
    this.baseBrightness = CONFIG.MIN_BRIGHTNESS + Math.random() * (CONFIG.MAX_BRIGHTNESS - CONFIG.MIN_BRIGHTNESS);
    this.brightness = this.baseBrightness;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = CONFIG.TWINKLE_SPEED * (0.5 + Math.random());
    this.isTwinkling = Math.random() > CONFIG.STATIC_STARS_RATIO;
  }
  
  update(time) {
    if (this.isTwinkling) {
      this.twinklePhase += this.twinkleSpeed * time;
      this.brightness = this.baseBrightness * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    }
  }
  
  draw(ctx) {
    ctx.globalAlpha = this.brightness;
    ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
  }
}

export default function StarryBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: false, // We don't need transparency
      desynchronized: true // Better performance
    });
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate stars on resize
      starsRef.current = Array.from(
        { length: CONFIG.STAR_COUNT }, 
        () => new Star(canvas.width, canvas.height)
      );
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      // Clear canvas with dark background
      ctx.fillStyle = '#0B0B20';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      ctx.fillStyle = '#ffffff';
      for (const star of starsRef.current) {
        star.update(deltaTime);
        star.draw(ctx);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}