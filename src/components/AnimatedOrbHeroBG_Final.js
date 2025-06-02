import React, { useEffect, useRef, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { useOrbContext } from './OrbContextProvider';

// ULTRA PERFORMANCE OPTIMIZATIONS
const PERF = {
  // Quality auto-adjustment
  AUTO_QUALITY: true,
  QUALITY: {
    ultra: { points: [48, 24], particles: 150, morphLayers: 3, fps: 60 },
    high: { points: [32, 16], particles: 80, morphLayers: 3, fps: 60 },
    medium: { points: [24, 12], particles: 40, morphLayers: 2, fps: 45 },
    low: { points: [16, 8], particles: 20, morphLayers: 1, fps: 30 },
    potato: { points: [12, 6], particles: 0, morphLayers: 1, fps: 24 }
  },
  
  // Smart frame skipping
  SMART_SKIP: true,
  SKIP_THRESHOLD: 20, // ms
  
  // Aggressive caching
  CACHE_TIME: 100, // ms
  CACHE_SIZE: 200,
  
  // GPU hints
  GPU_COMPOSITE: true,
  
  // Reduced precision for paths
  PATH_PRECISION: 1,
  
  // Batch DOM updates
  BATCH_UPDATES: true,
  
  // Visibility culling
  CULL_OFFSCREEN: true,
  CULL_MARGIN: 100,
  
  // Progressive enhancement
  PROGRESSIVE_LOAD: true,
  LOAD_DELAY: 100, // ms between adding orbs
};

// Frame rate monitor with auto quality adjustment
class SmartQualityManager {
  constructor() {
    this.samples = new Float32Array(30);
    this.sampleIndex = 0;
    this.quality = 'high';
    this.lastTime = performance.now();
    this.consecutiveBadFrames = 0;
    this.consecutiveGoodFrames = 0;
  }
  
  recordFrame() {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;
    
    this.samples[this.sampleIndex] = delta;
    this.sampleIndex = (this.sampleIndex + 1) % this.samples.length;
    
    // Quick average (last 10 frames)
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += this.samples[(this.sampleIndex - i + 30) % 30];
    }
    const avg = sum / 10;
    
    // Auto adjust quality
    if (PERF.AUTO_QUALITY) {
      if (avg > 22) { // Below 45 FPS
        this.consecutiveBadFrames++;
        this.consecutiveGoodFrames = 0;
        
        if (this.consecutiveBadFrames > 5) {
          this.decreaseQuality();
          this.consecutiveBadFrames = 0;
        }
      } else if (avg < 14) { // Above 70 FPS
        this.consecutiveGoodFrames++;
        this.consecutiveBadFrames = 0;
        
        if (this.consecutiveGoodFrames > 30) {
          this.increaseQuality();
          this.consecutiveGoodFrames = 0;
        }
      } else {
        this.consecutiveBadFrames = 0;
        this.consecutiveGoodFrames = 0;
      }
    }
    
    return { quality: this.quality, shouldSkip: avg > PERF.SKIP_THRESHOLD };
  }
  
  decreaseQuality() {
    const levels = ['ultra', 'high', 'medium', 'low', 'potato'];
    const current = levels.indexOf(this.quality);
    if (current < levels.length - 1) {
      this.quality = levels[current + 1];
      console.log('Decreasing quality to:', this.quality);
    }
  }
  
  increaseQuality() {
    const levels = ['ultra', 'high', 'medium', 'low', 'potato'];
    const current = levels.indexOf(this.quality);
    if (current > 0) {
      this.quality = levels[current - 1];
      console.log('Increasing quality to:', this.quality);
    }
  }
  
  getSettings() {
    return PERF.QUALITY[this.quality];
  }
}

// Lightning-fast cache
class LightningCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }
  
  get(key) {
    const timestamp = this.timestamps.get(key);
    if (timestamp && performance.now() - timestamp < PERF.CACHE_TIME) {
      return this.cache.get(key);
    }
    return null;
  }
  
  set(key, value) {
    if (this.cache.size > PERF.CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      this.timestamps.delete(firstKey);
    }
    this.cache.set(key, value);
    this.timestamps.set(key, performance.now());
  }
}

// Pre-computed sin/cos lookup
const TRIG = {
  sin: new Float32Array(3600),
  cos: new Float32Array(3600),
  init() {
    for (let i = 0; i < 3600; i++) {
      const rad = (i / 10) * Math.PI / 180;
      this.sin[i] = Math.sin(rad);
      this.cos[i] = Math.cos(rad);
    }
  }
};
TRIG.init();

// Ultra-fast blob generation
const fastBlob = (cx, cy, r, points, t, amp, phase, morphLayers, cache) => {
  const key = `${cx|0}_${cy|0}_${r|0}_${points}_${(t/10)|0}_${amp}_${phase}`;
  const cached = cache.get(key);
  if (cached) return cached;
  
  const angleStep = 3600 / points;
  let path = `M`;
  
  for (let i = 0; i < points; i++) {
    const angleIndex = (i * angleStep) | 0;
    let noise = 0;
    
    // Reduced morph layers for performance
    if (morphLayers >= 1) {
      noise += TRIG.sin[((angleIndex * 3 + t * 40) % 3600) | 0] * 1.5 * amp;
    }
    if (morphLayers >= 2) {
      noise += TRIG.sin[((angleIndex * 5 - t * 63) % 3600) | 0] * 0.8 * amp;
    }
    if (morphLayers >= 3) {
      noise += TRIG.sin[((angleIndex * 2 + t * 97) % 3600) | 0] * 0.5 * amp;
    }
    
    const rad = r + noise;
    const x = cx + TRIG.cos[angleIndex % 3600] * rad;
    const y = cy + TRIG.sin[angleIndex % 3600] * rad;
    
    if (i === 0) {
      path += `${x.toFixed(PERF.PATH_PRECISION)},${y.toFixed(PERF.PATH_PRECISION)}`;
    } else {
      path += `L${x.toFixed(PERF.PATH_PRECISION)},${y.toFixed(PERF.PATH_PRECISION)}`;
    }
  }
  
  path += 'Z';
  cache.set(key, path);
  return path;
};

// Main component
const AnimatedOrbHeroBG = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const qualityManager = useRef(new SmartQualityManager());
  const cache = useRef(new LightningCache());
  
  // State management
  const [orbsLoaded, setOrbsLoaded] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const orbStates = useRef([]);
  const particles = useRef([]);
  const viewport = useRef({ w: 800, h: 800 });
  const parentCenter = useRef({ x: 400, y: 190 });
  
  const childCount = 5;
  const parentRadius = 36;
  const childRadius = 14;
  
  const { updateGradientColors } = useOrbContext();
  
  // Initialize orb states
  useEffect(() => {
    orbStates.current = [
      { angle: 0, x: 0, y: 0 } // Parent
    ];
    
    for (let i = 0; i < childCount; i++) {
      orbStates.current.push({
        angle: (i * Math.PI * 2) / childCount,
        radius: 60 + i * 15,
        speed: 0.5 + Math.random() * 0.5,
        x: 0,
        y: 0
      });
    }
  }, []);
  
  // Progressive loading
  useEffect(() => {
    if (PERF.PROGRESSIVE_LOAD && orbsLoaded < childCount + 1) {
      const timer = setTimeout(() => {
        setOrbsLoaded(prev => prev + 1);
      }, PERF.LOAD_DELAY);
      return () => clearTimeout(timer);
    }
  }, [orbsLoaded]);
  
  // Main render loop
  const render = useCallback(() => {
    const { shouldSkip } = qualityManager.current.recordFrame();
    const settings = qualityManager.current.getSettings();
    
    // Skip frame if running behind
    if (PERF.SMART_SKIP && shouldSkip) {
      rafRef.current = requestAnimationFrame(render);
      return;
    }
    
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) {
      rafRef.current = requestAnimationFrame(render);
      return;
    }
    
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const now = performance.now();
    
    // Clear canvas for particles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update colors (throttled)
    if ((now / 100) | 0 !== (qualityManager.current.lastColorUpdate / 100) | 0) {
      const hue = (now * 0.01) % 360;
      updateGradientColors({
        start: `hsl(${hue}, 80%, 60%)`,
        end: `hsl(${(hue + 60) % 360}, 80%, 60%)`
      });
      qualityManager.current.lastColorUpdate = now;
    }
    
    // Viewport culling bounds
    const bounds = {
      left: -PERF.CULL_MARGIN,
      right: viewport.current.w + PERF.CULL_MARGIN,
      top: -PERF.CULL_MARGIN,
      bottom: viewport.current.h + PERF.CULL_MARGIN
    };
    
    // Batch DOM updates
    const updates = [];
    
    // Parent orb
    if (orbsLoaded > 0) {
      const px = viewport.current.w * 0.7 + Math.sin(now * 0.0001) * 25;
      const py = 190 + Math.cos(now * 0.00012) * 20;
      parentCenter.current = { x: px, y: py };
      
      if (px > bounds.left && px < bounds.right && py > bounds.top && py < bounds.bottom) {
        const path = fastBlob(
          px, py, parentRadius,
          settings.points[0],
          now * 0.015,
          1, 0,
          settings.morphLayers,
          cache.current
        );
        
        updates.push({
          element: svg.querySelector('#parentOrb'),
          attrs: { d: path }
        });
      }
    }
    
    // Child orbs
    const maxChildrenToRender = Math.min(orbsLoaded - 1, childCount);
    for (let i = 0; i < maxChildrenToRender; i++) {
      const state = orbStates.current[i + 1];
      state.angle += 0.008 * state.speed;
      
      const x = parentCenter.current.x + Math.cos(state.angle) * state.radius;
      const y = parentCenter.current.y + Math.sin(state.angle) * state.radius;
      
      state.x = x;
      state.y = y;
      
      if (PERF.CULL_OFFSCREEN && (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom)) {
        updates.push({
          element: svg.querySelector(`#child${i}`),
          attrs: { opacity: '0' }
        });
      } else {
        const path = fastBlob(
          x, y, childRadius,
          settings.points[1],
          now * 0.02 + i * 10,
          0.3, i,
          settings.morphLayers,
          cache.current
        );
        
        updates.push({
          element: svg.querySelector(`#child${i}`),
          attrs: { d: path, opacity: '0.95' }
        });
      }
    }
    
    // Batch apply DOM updates
    if (PERF.BATCH_UPDATES) {
      requestIdleCallback(() => {
        updates.forEach(({ element, attrs }) => {
          if (element) {
            Object.entries(attrs).forEach(([key, value]) => {
              element.setAttribute(key, value);
            });
          }
        });
      }, { timeout: 16 });
    } else {
      updates.forEach(({ element, attrs }) => {
        if (element) {
          Object.entries(attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
          });
        }
      });
    }
    
    // Render particles (if enabled)
    if (settings.particles > 0) {
      particles.current = particles.current.filter(p => {
        p.life -= 0.02;
        if (p.life <= 0) return false;
        
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        ctx.globalAlpha = p.life * 0.7;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        
        return true;
      }).slice(0, settings.particles);
    }
    
    rafRef.current = requestAnimationFrame(render);
  }, [updateGradientColors, orbsLoaded]);
  
  // Setup and teardown
  useEffect(() => {
    const updateViewport = () => {
      viewport.current = { w: window.innerWidth, h: window.innerHeight };
      
      if (canvasRef.current) {
        canvasRef.current.width = viewport.current.w;
        canvasRef.current.height = viewport.current.h;
      }
      
      if (svgRef.current) {
        svgRef.current.setAttribute('viewBox', `0 0 ${viewport.current.w} ${viewport.current.h}`);
      }
    };
    
    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    // Start render loop
    rafRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [render]);
  
  // Listen for performance changes
  useEffect(() => {
    const handlePerformanceChange = (event) => {
      if (event.detail.orbs !== undefined) {
        setIsEnabled(event.detail.orbs);
      }
    };
    
    window.addEventListener('performanceSettingsChanged', handlePerformanceChange);
    
    // Check initial settings
    const savedSettings = localStorage.getItem('performanceSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setIsEnabled(settings.orbs ?? true);
      } catch (e) {
        console.error('Failed to parse performance settings');
      }
    }
    
    return () => {
      window.removeEventListener('performanceSettingsChanged', handlePerformanceChange);
    };
  }, []);
  
  if (!isEnabled) {
    return null;
  }
  
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex,
        pointerEvents: "none",
        touchAction: 'none',
        background: 'transparent',
        ...(PERF.GPU_COMPOSITE && {
          transform: 'translateZ(0)',
          willChange: 'transform'
        }),
        ...sx,
      }}
      style={style}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...(PERF.GPU_COMPOSITE && {
            transform: 'translateZ(0)',
            willChange: 'contents'
          })
        }}
      />
      <svg 
        ref={svgRef} 
        id="orbSVG"
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          shapeRendering: 'optimizeSpeed',
          ...(PERF.GPU_COMPOSITE && {
            transform: 'translateZ(0)',
            willChange: 'transform'
          })
        }}
      >
        <defs>
          <radialGradient id="parentGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#00E5FF"/>
            <stop offset="100%" stopColor="#5B3CFF"/>
          </radialGradient>
          {Array.from({ length: childCount }, (_, i) => (
            <radialGradient key={i} id={`childGrad${i}`} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={`hsl(${(i * 67) % 360}, 85%, 65%)`}/>
              <stop offset="100%" stopColor={`hsl(${(i * 67 + 180) % 360}, 70%, 25%)`}/>
            </radialGradient>
          ))}
        </defs>
        <path 
          id="parentOrb" 
          fill="url(#parentGrad)" 
          opacity={orbsLoaded > 0 ? "0.95" : "0"}
          style={{ transition: 'opacity 0.5s ease-in' }}
        />
        <g id="children">
          {Array.from({ length: childCount }, (_, i) => (
            <path 
              key={i} 
              id={`child${i}`}
              fill={`url(#childGrad${i})`} 
              opacity={orbsLoaded > i + 1 ? "0.95" : "0"}
              style={{ transition: 'opacity 0.5s ease-in' }}
            />
          ))}
        </g>
      </svg>
    </Box>
  );
};

export default AnimatedOrbHeroBG;