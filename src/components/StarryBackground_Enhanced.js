import React, { useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';

// ENHANCED configuration with MORE STARS
const STAR_CONFIG = {
  // INCREASED STAR COUNTS
  QUALITY: {
    ultra: { stars: 200, twinkleRatio: 0.3, fps: 60 }, // MORE STARS
    high: { stars: 150, twinkleRatio: 0.25, fps: 60 },
    medium: { stars: 100, twinkleRatio: 0.2, fps: 45 },
    low: { stars: 60, twinkleRatio: 0.15, fps: 30 },
  },
  
  // Performance optimizations
  USE_WEBGL: false, // Would need WebGL implementation
  USE_LAYERS: true, // Multiple layers for depth
  BATCH_SIZE: 50, // Render stars in batches
  
  // Visual settings
  STAR_SIZES: [0.5, 1, 1.5, 2, 2.5, 3], // Variety of sizes
  DEPTH_LAYERS: 3, // 3 layers for parallax effect
  GLOW_EFFECT: true,
};

class EnhancedStarField {
  constructor(width, height, quality = 'high') {
    this.width = width;
    this.height = height;
    this.quality = quality;
    this.settings = STAR_CONFIG.QUALITY[quality];
    
    // Layers for depth
    this.layers = [];
    this.initLayers();
    
    // Performance tracking
    this.frameCount = 0;
    this.lastTime = performance.now();
  }
  
  initLayers() {
    const totalStars = this.settings.stars;
    const starsPerLayer = Math.floor(totalStars / STAR_CONFIG.DEPTH_LAYERS);
    
    for (let layer = 0; layer < STAR_CONFIG.DEPTH_LAYERS; layer++) {
      const starCount = layer === STAR_CONFIG.DEPTH_LAYERS - 1 
        ? totalStars - (starsPerLayer * (STAR_CONFIG.DEPTH_LAYERS - 1))
        : starsPerLayer;
        
      const stars = new Float32Array(starCount * 6); // x, y, size, brightness, phase, speed
      const layerSpeed = 1 - (layer * 0.3); // Back layers move slower
      
      for (let i = 0; i < starCount; i++) {
        const idx = i * 6;
        stars[idx] = Math.random() * this.width; // x
        stars[idx + 1] = Math.random() * this.height; // y
        stars[idx + 2] = STAR_CONFIG.STAR_SIZES[Math.floor(Math.random() * STAR_CONFIG.STAR_SIZES.length)] * (1 - layer * 0.2); // size
        stars[idx + 3] = 0.4 + Math.random() * 0.6; // brightness
        stars[idx + 4] = Math.random() * Math.PI * 2; // phase
        stars[idx + 5] = (0.0005 + Math.random() * 0.002) * layerSpeed; // speed
      }
      
      this.layers.push({
        stars,
        twinkleCount: Math.floor(starCount * this.settings.twinkleRatio),
        opacity: 1 - layer * 0.2, // Back layers dimmer
        speed: layerSpeed
      });
    }
  }
  
  update(deltaTime) {
    // Update each layer
    for (let layerIdx = 0; layerIdx < this.layers.length; layerIdx++) {
      const layer = this.layers[layerIdx];
      const starCount = layer.stars.length / 6;
      
      // Update only twinkling stars
      for (let i = 0; i < layer.twinkleCount; i++) {
        const idx = i * 6;
        layer.stars[idx + 4] += layer.stars[idx + 5] * deltaTime;
      }
    }
  }
  
  render(ctx) {
    // Clear canvas
    ctx.fillStyle = '#0B0B20';
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Render each layer
    for (let layerIdx = 0; layerIdx < this.layers.length; layerIdx++) {
      const layer = this.layers[layerIdx];
      const starCount = layer.stars.length / 6;
      
      ctx.globalAlpha = layer.opacity;
      
      // Batch rendering
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      
      // Static stars
      for (let i = layer.twinkleCount; i < starCount; i++) {
        const idx = i * 6;
        const x = layer.stars[idx];
        const y = layer.stars[idx + 1];
        const size = layer.stars[idx + 2];
        const brightness = layer.stars[idx + 3];
        
        if (STAR_CONFIG.GLOW_EFFECT && size > 1.5) {
          // Glow for larger stars
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(x - size * 2, y - size * 2, size * 4, size * 4);
          ctx.fillStyle = '#ffffff';
        }
        
        ctx.moveTo(x + size, y);
        ctx.arc(x, y, size, 0, Math.PI * 2);
      }
      
      ctx.fill();
      
      // Twinkling stars (separate pass for performance)
      for (let i = 0; i < layer.twinkleCount; i++) {
        const idx = i * 6;
        const x = layer.stars[idx];
        const y = layer.stars[idx + 1];
        const size = layer.stars[idx + 2];
        const brightness = layer.stars[idx + 3];
        const phase = layer.stars[idx + 4];
        
        const twinkle = 0.5 + 0.5 * Math.sin(phase);
        ctx.globalAlpha = brightness * twinkle * layer.opacity;
        
        ctx.beginPath();
        ctx.arc(x, y, size * (0.8 + twinkle * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1;
  }
  
  setQuality(newQuality) {
    if (this.quality !== newQuality && STAR_CONFIG.QUALITY[newQuality]) {
      this.quality = newQuality;
      this.settings = STAR_CONFIG.QUALITY[newQuality];
      this.initLayers(); // Reinitialize with new star count
    }
  }
}

export default function StarryBackground() {
  const canvasRef = useRef(null);
  const starFieldRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const qualityRef = useRef('high'); // Start with high quality
  
  const render = useCallback((currentTime) => {
    const canvas = canvasRef.current;
    if (!canvas || !starFieldRef.current) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }
    
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;
    
    const ctx = canvas.getContext('2d');
    starFieldRef.current.update(deltaTime);
    starFieldRef.current.render(ctx);
    
    animationRef.current = requestAnimationFrame(render);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create enhanced star field
      starFieldRef.current = new EnhancedStarField(
        canvas.width, 
        canvas.height, 
        qualityRef.current
      );
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Listen for performance mode changes
    const handlePerformanceChange = (event) => {
      const settings = event.detail;
      if (settings.quality && starFieldRef.current) {
        qualityRef.current = settings.quality;
        starFieldRef.current.setQuality(settings.quality);
      }
    };
    
    window.addEventListener('performanceSettingsChanged', handlePerformanceChange);
    
    // Start animation
    animationRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('performanceSettingsChanged', handlePerformanceChange);
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
        transform: 'translateZ(0)', // Force GPU acceleration
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