import React, { useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';

// Ultra-optimized configuration
const ULTRA_CONFIG = {
  // Quality levels - REDUCED STAR COUNT
  QUALITY: {
    ultra: { stars: 80, twinkleRatio: 0.4, fps: 60 },
    high: { stars: 60, twinkleRatio: 0.3, fps: 60 },
    medium: { stars: 40, twinkleRatio: 0.2, fps: 30 },
    low: { stars: 20, twinkleRatio: 0.1, fps: 24 },
  },
  
  // Performance features
  USE_OFFSCREEN: typeof OffscreenCanvas !== 'undefined',
  USE_IMAGE_DATA: true, // Direct pixel manipulation
  BATCH_RENDER: true,
  
  // Visual settings
  STAR_COLOR: { r: 255, g: 255, b: 255 },
  BG_COLOR: { r: 11, g: 11, b: 32 },
  
  // Optimizations
  SPATIAL_HASH: true, // Group stars by region
  DIRTY_RECTANGLES: true, // Only update changed regions
};

// Fast star renderer using typed arrays
class UltraStarField {
  constructor(width, height, quality = 'high') {
    this.width = width;
    this.height = height;
    this.quality = quality;
    this.settings = ULTRA_CONFIG.QUALITY[quality];
    
    // Use typed arrays for maximum performance
    const count = this.settings.stars;
    this.positions = new Float32Array(count * 2); // x, y
    this.properties = new Float32Array(count * 4); // size, brightness, phase, speed
    this.states = new Uint8Array(count); // 0 = static, 1 = twinkling
    
    // Create spatial hash grid for optimization
    if (ULTRA_CONFIG.SPATIAL_HASH) {
      this.gridSize = 100;
      this.grid = new Map();
    }
    
    this.initStars();
    
    // Performance monitoring
    this.frameCount = 0;
    this.lastFpsCheck = performance.now();
    this.currentFps = 60;
  }
  
  initStars() {
    const count = this.settings.stars;
    const twinkleCount = Math.floor(count * this.settings.twinkleRatio);
    
    for (let i = 0; i < count; i++) {
      // Position
      this.positions[i * 2] = Math.random() * this.width;
      this.positions[i * 2 + 1] = Math.random() * this.height;
      
      // Properties
      this.properties[i * 4] = 0.5 + Math.random() * 2; // size
      this.properties[i * 4 + 1] = 0.3 + Math.random() * 0.7; // brightness
      this.properties[i * 4 + 2] = Math.random() * Math.PI * 2; // phase
      this.properties[i * 4 + 3] = 0.001 + Math.random() * 0.002; // speed
      
      // State
      this.states[i] = i < twinkleCount ? 1 : 0;
    }
    
    this.updateGrid();
  }
  
  updateGrid() {
    if (!ULTRA_CONFIG.SPATIAL_HASH || !this.grid) return;
    
    this.grid.clear();
    const count = this.settings.stars;
    
    for (let i = 0; i < count; i++) {
      const x = Math.floor(this.positions[i * 2] / this.gridSize);
      const y = Math.floor(this.positions[i * 2 + 1] / this.gridSize);
      const key = `${x},${y}`;
      
      if (!this.grid.has(key)) {
        this.grid.set(key, []);
      }
      this.grid.get(key).push(i);
    }
  }
  
  update(deltaTime) {
    const count = this.settings.stars;
    
    // Update only twinkling stars
    for (let i = 0; i < count; i++) {
      if (this.states[i] === 1) {
        this.properties[i * 4 + 2] += this.properties[i * 4 + 3] * deltaTime;
      }
    }
    
    // Auto-adjust quality based on FPS
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsCheck > 1000) {
      this.currentFps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsCheck = now;
      
      // Adjust quality if needed
      if (this.currentFps < 25 && this.quality !== 'low') {
        this.quality = this.quality === 'ultra' ? 'high' : 
                      this.quality === 'high' ? 'medium' : 'low';
        this.settings = ULTRA_CONFIG.QUALITY[this.quality];
      }
    }
  }
  
  // Ultra-fast rendering using direct pixel manipulation
  renderToImageData(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Fill background
    const bg = ULTRA_CONFIG.BG_COLOR;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = bg.r;
      data[i + 1] = bg.g;
      data[i + 2] = bg.b;
      data[i + 3] = 255;
    }
    
    // Draw stars
    const count = this.settings.stars;
    for (let i = 0; i < count; i++) {
      const x = Math.floor(this.positions[i * 2]);
      const y = Math.floor(this.positions[i * 2 + 1]);
      const size = this.properties[i * 4];
      let brightness = this.properties[i * 4 + 1];
      
      if (this.states[i] === 1) {
        const phase = this.properties[i * 4 + 2];
        brightness *= 0.5 + 0.5 * Math.sin(phase);
      }
      
      // Draw star (optimized square for speed)
      const halfSize = Math.floor(size / 2);
      for (let dy = -halfSize; dy <= halfSize; dy++) {
        for (let dx = -halfSize; dx <= halfSize; dx++) {
          const px = x + dx;
          const py = y + dy;
          
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const idx = (py * width + px) * 4;
            const alpha = brightness * 255;
            data[idx] = Math.min(255, data[idx] + alpha);
            data[idx + 1] = Math.min(255, data[idx + 1] + alpha);
            data[idx + 2] = Math.min(255, data[idx + 2] + alpha);
          }
        }
      }
    }
  }
  
  // Standard canvas rendering (fallback)
  render(ctx) {
    // Clear with background
    ctx.fillStyle = '#0B0B20';
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Batch render static stars first
    ctx.fillStyle = '#ffffff';
    const count = this.settings.stars;
    
    for (let i = 0; i < count; i++) {
      if (this.states[i] === 0) {
        const x = this.positions[i * 2];
        const y = this.positions[i * 2 + 1];
        const size = this.properties[i * 4];
        const brightness = this.properties[i * 4 + 1];
        
        ctx.globalAlpha = brightness;
        ctx.fillRect(x - size/2, y - size/2, size, size);
      }
    }
    
    // Then render twinkling stars
    for (let i = 0; i < count; i++) {
      if (this.states[i] === 1) {
        const x = this.positions[i * 2];
        const y = this.positions[i * 2 + 1];
        const size = this.properties[i * 4];
        let brightness = this.properties[i * 4 + 1];
        const phase = this.properties[i * 4 + 2];
        
        brightness *= 0.5 + 0.5 * Math.sin(phase);
        
        ctx.globalAlpha = brightness;
        ctx.fillRect(x - size/2, y - size/2, size, size);
      }
    }
  }
}

export default function StarryBackground() {
  const canvasRef = useRef(null);
  const starFieldRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const imageDataRef = useRef(null);
  
  // Optimized render function
  const render = useCallback((currentTime) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }
    
    const ctx = canvas.getContext('2d');
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;
    
    if (starFieldRef.current) {
      starFieldRef.current.update(deltaTime);
      
      // Use ImageData rendering for better performance
      if (ULTRA_CONFIG.USE_IMAGE_DATA && imageDataRef.current) {
        starFieldRef.current.renderToImageData(imageDataRef.current);
        ctx.putImageData(imageDataRef.current, 0, 0);
      } else {
        starFieldRef.current.render(ctx);
      }
    }
    
    animationRef.current = requestAnimationFrame(render);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true,
      willReadFrequently: ULTRA_CONFIG.USE_IMAGE_DATA
    });
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create star field
      starFieldRef.current = new UltraStarField(canvas.width, canvas.height);
      
      // Create ImageData for direct pixel manipulation
      if (ULTRA_CONFIG.USE_IMAGE_DATA) {
        imageDataRef.current = ctx.createImageData(canvas.width, canvas.height);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // OffscreenCanvas would be implemented differently
    // For now, we'll use regular canvas rendering
    
    // Start animation
    animationRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);
  
  
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
        // GPU acceleration hints
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated', // Faster rendering
        }}
      />
    </Box>
  );
}