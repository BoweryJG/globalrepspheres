import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useOrbContext } from './OrbContextProvider';

// Performance configuration
const PERFORMANCE_CONFIG = {
  // Rendering quality levels
  QUALITY_HIGH: { parentPoints: 32, childPoints: 16, particleLimit: 100, updateInterval: 16 },
  QUALITY_MEDIUM: { parentPoints: 24, childPoints: 12, particleLimit: 50, updateInterval: 20 },
  QUALITY_LOW: { parentPoints: 16, childPoints: 8, particleLimit: 25, updateInterval: 33 },
  
  // Optimization flags
  USE_WORKER: typeof Worker !== 'undefined',
  USE_OFFSCREEN_CANVAS: typeof OffscreenCanvas !== 'undefined',
  USE_REQUEST_IDLE: typeof requestIdleCallback !== 'undefined',
  
  // Performance thresholds
  FPS_TARGET: 60,
  FPS_MIN: 30,
  FRAME_BUDGET: 16, // ms
  
  // Cache settings
  BLOB_CACHE_SIZE: 100,
  BLOB_CACHE_TTL: 50, // ms
  GRADIENT_UPDATE_INTERVAL: 100, // ms
  
  // LOD distances
  LOD_NEAR: 200,
  LOD_MID: 400,
  LOD_FAR: 600,
};

// Singleton performance monitor
class PerformanceMonitor {
  constructor() {
    this.samples = [];
    this.maxSamples = 60;
    this.currentQuality = 'high';
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.avgFPS = 60;
  }
  
  recordFrame() {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;
    
    if (delta > 0) {
      const fps = 1000 / delta;
      this.samples.push(fps);
      if (this.samples.length > this.maxSamples) {
        this.samples.shift();
      }
      
      // Calculate average FPS
      this.avgFPS = this.samples.reduce((a, b) => a + b, 0) / this.samples.length;
      
      // Auto-adjust quality
      if (this.avgFPS < PERFORMANCE_CONFIG.FPS_MIN && this.currentQuality !== 'low') {
        this.currentQuality = this.currentQuality === 'high' ? 'medium' : 'low';
      } else if (this.avgFPS > PERFORMANCE_CONFIG.FPS_TARGET && this.currentQuality !== 'high') {
        this.currentQuality = this.currentQuality === 'low' ? 'medium' : 'high';
      }
    }
    
    return this.currentQuality;
  }
  
  getQualitySettings() {
    switch (this.currentQuality) {
      case 'low': return PERFORMANCE_CONFIG.QUALITY_LOW;
      case 'medium': return PERFORMANCE_CONFIG.QUALITY_MEDIUM;
      default: return PERFORMANCE_CONFIG.QUALITY_HIGH;
    }
  }
}

// Optimized cache with TTL
class OptimizedCache {
  constructor(maxSize = 100, ttl = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  
  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, { value, timestamp: performance.now() });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (performance.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  clear() {
    this.cache.clear();
  }
}

// Pre-computed trig tables for maximum performance
const trigTables = new Map();
const getTrigTable = (points) => {
  if (trigTables.has(points)) return trigTables.get(points);
  
  const table = {
    sin: new Float32Array(points),
    cos: new Float32Array(points),
    angles: new Float32Array(points)
  };
  
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points;
    table.angles[i] = angle;
    table.sin[i] = Math.sin(angle);
    table.cos[i] = Math.cos(angle);
  }
  
  trigTables.set(points, table);
  return table;
};

// Optimized HSL to Hex conversion using lookup tables
const hslCache = new Map();
const hslToHex = (h, s, l) => {
  const key = `${h}_${s}_${l}`;
  if (hslCache.has(key)) return hslCache.get(key);
  
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const hex = "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
  hslCache.set(key, hex);
  
  // Cleanup cache if too large
  if (hslCache.size > 1000) {
    const keys = Array.from(hslCache.keys());
    for (let i = 0; i < 100; i++) {
      hslCache.delete(keys[i]);
    }
  }
  
  return hex;
};

// Optimized blob generation with more spherical shapes
const generateOptimizedBlob = (cx, cy, r, points, t, amp = 1, phase = 0, cache, uniqueShape = 1) => {
  const cacheKey = `${Math.round(cx)}_${Math.round(cy)}_${Math.round(r)}_${points}_${Math.floor(t/8)}_${amp.toFixed(1)}_${phase.toFixed(1)}_${uniqueShape}`;
  
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  
  const { sin, cos } = getTrigTable(points);
  const pts = new Float32Array(points * 2); // x,y pairs
  
  // More spherical with subtle morphing - matching header_orb copy.html
  // Reduced amplitude for more perfect spheres
  const sphericalAmp = amp * 0.3; // Make shapes more spherical
  
  for (let i = 0; i < points; i++) {
    const angle = i * Math.PI * 2 / points;
    // Three sine waves with unique shape multiplier for each orb
    const noise = 
      Math.sin(angle * 3 + t * 0.7 + phase) * 4 * sphericalAmp * uniqueShape +
      Math.sin(angle * 5 - t * 1.1 + phase) * 2 * sphericalAmp * uniqueShape +
      Math.sin(angle * 2 + t * 1.7 + phase) * 1.2 * sphericalAmp * uniqueShape;
    const rad = r + noise;
    pts[i * 2] = cx + cos[i] * rad;
    pts[i * 2 + 1] = cy + sin[i] * rad;
  }
  
  // Build path with reduced precision
  let d = `M${pts[0].toFixed(1)},${pts[1].toFixed(1)}`;
  
  for (let i = 0; i < points; i++) {
    const i2 = (i + 1) % points;
    const i0 = (i - 1 + points) % points;
    const i3 = (i + 2) % points;
    
    const x1 = pts[i * 2], y1 = pts[i * 2 + 1];
    const x2 = pts[i2 * 2], y2 = pts[i2 * 2 + 1];
    const x0 = pts[i0 * 2], y0 = pts[i0 * 2 + 1];
    const x3 = pts[i3 * 2], y3 = pts[i3 * 2 + 1];
    
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  
  d += "Z";
  cache.set(cacheKey, d);
  return d;
};

// Web Worker for heavy calculations (if supported)
const createBlobWorker = () => {
  if (!PERFORMANCE_CONFIG.USE_WORKER) return null;
  
  const workerCode = `
    self.onmessage = function(e) {
      const { cx, cy, r, points, t, amp, phase } = e.data;
      // Blob calculation logic here (simplified for brevity)
      self.postMessage({ path: 'calculated path' });
    };
  `;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

const AnimatedOrbHeroBG = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const performanceMonitor = useRef(new PerformanceMonitor());
  const blobCache = useRef(new OptimizedCache(PERFORMANCE_CONFIG.BLOB_CACHE_SIZE, PERFORMANCE_CONFIG.BLOB_CACHE_TTL));
  
  // Refs for animation state
  const orbStatesRef = useRef([]);
  const particlesRef = useRef([]);
  const lastUpdateRef = useRef(0);
  const viewportRef = useRef({ width: 800, height: 800 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ y: 0, velocity: 0 });
  
  // Component-specific constants
  const childCount = 5;
  const parentRadius = 36;  // Original size
  const childRadius = 14;   // Original size
  
  const { updateGradientColors } = useOrbContext();
  
  // Enhanced particle system with unique effects per orb
  const particlePool = useRef([]);
  const activeParticles = useRef([]);
  
  const getParticle = useCallback(() => {
    if (particlePool.current.length > 0) {
      return particlePool.current.pop();
    }
    return {
      x: 0, y: 0, vx: 0, vy: 0, vr: 0, r: 1, life: 1, decay: 0.02, color: '#fff', opacity: 1, rotation: 0
    };
  }, []);
  
  const releaseParticle = useCallback((particle) => {
    particlePool.current.push(particle);
  }, []);
  
  const emitParticles = useCallback((x, y, color, count = 2, effectType = 'evaporate', intensity = 1) => {
    const quality = performanceMonitor.current.getQualitySettings();
    if (activeParticles.current.length >= quality.particleLimit) return;
    
    for (let i = 0; i < Math.min(count, quality.particleLimit - activeParticles.current.length); i++) {
      const particle = getParticle();
      
      // Different particle behaviors based on effect type
      switch(effectType) {
        case 'evaporate':
          // Particles float upward and fade
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = -Math.random() * 1.5 - 0.5;
          particle.decay = 0.015;
          particle.r = 0.8 + Math.random() * 0.4;
          break;
          
        case 'spiral':
          // Particles spiral outward
          const spiralAngle = (i / count) * Math.PI * 2 + Math.random();
          particle.vx = Math.cos(spiralAngle) * (1 + Math.random());
          particle.vy = Math.sin(spiralAngle) * (1 + Math.random());
          particle.vr = 0.1; // Rotation velocity
          particle.decay = 0.02;
          break;
          
        case 'shatter':
          // Particles explode in sharp directions
          const shatterAngle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 2;
          particle.vx = Math.cos(shatterAngle) * speed;
          particle.vy = Math.sin(shatterAngle) * speed;
          particle.r = 0.5 + Math.random() * 1.5;
          particle.decay = 0.04;
          break;
          
        case 'fade':
          // Particles barely move, just fade
          particle.vx = (Math.random() - 0.5) * 0.1;
          particle.vy = (Math.random() - 0.5) * 0.1;
          particle.decay = 0.05;
          particle.r = 1.5 + Math.random() * 0.5;
          break;
          
        case 'implode':
          // Particles move inward then explode
          const implodeAngle = Math.random() * Math.PI * 2;
          particle.vx = -Math.cos(implodeAngle) * 0.5;
          particle.vy = -Math.sin(implodeAngle) * 0.5;
          particle.life = 1.2; // Longer life for implosion effect
          particle.decay = 0.03;
          break;
      }
      
      particle.x = x;
      particle.y = y;
      particle.life *= intensity;
      particle.color = color;
      particle.opacity = 0.6 * intensity;
      particle.rotation = Math.random() * Math.PI * 2;
      
      activeParticles.current.push(particle);
    }
  }, [getParticle]);
  
  // Optimized render function with culling
  const renderFrame = useCallback((now) => {
    const quality = performanceMonitor.current.recordFrame();
    const qualitySettings = performanceMonitor.current.getQualitySettings();
    
    // Skip frame if behind schedule
    if (now - lastUpdateRef.current < qualitySettings.updateInterval) {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      return;
    }
    
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!svg || !canvas || !ctx) {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update gradient colors (throttled)
    if (now - lastUpdateRef.current > PERFORMANCE_CONFIG.GRADIENT_UPDATE_INTERVAL) {
      const baseHue = (now * 0.01) % 360;
      
      // Update parent orb gradient stops with dynamic color animation
      const gradientStops = [
        { id: 'p0', phase: 0 },
        { id: 'p1', phase: Math.PI * 0.5 },
        { id: 'p2', phase: Math.PI },
        { id: 'p3', phase: Math.PI * 1.5 },
        { id: 'p4', phase: Math.PI * 2 }
      ];
      
      gradientStops.forEach((stop, index) => {
        const element = svg.querySelector(`#${stop.id}`);
        if (element) {
          // Calculate hue with phase offset for each stop
          const hueOffset = 60 * Math.sin(now * 0.00015 + stop.phase);
          let hue = (baseHue + hueOffset) % 360;
          if (hue < 0) hue += 360; // Ensure positive hue values
          
          // Animate saturation and lightness with different phases
          const sat = 75 + 25 * Math.sin(now * 0.0002 + stop.phase);
          const light = 50 + 15 * Math.sin(now * 0.00025 + stop.phase * 0.5);
          
          element.setAttribute('stop-color', hslToHex(hue, sat, light));
        }
      });
      
      // Update context gradient colors for other uses
      const startColor = hslToHex(baseHue, 80, 60);
      const endColor = hslToHex((baseHue + 60) % 360, 80, 60);
      updateGradientColors({ start: startColor, end: endColor });
    }
    
    // Viewport culling bounds
    const cullBounds = {
      left: -100,
      right: viewportRef.current.width + 100,
      top: -100,
      bottom: viewportRef.current.height + 100
    };
    
    // Update parent orb with drag physics
    const parentState = orbStatesRef.current[0];
    if (parentState) {
      // Update drag physics
      [parentState.drag, parentState.dragV] = dampedSpring(
        parentState.drag, parentState.dragTarget, parentState.dragV, 0.045, 0.9
      );
      
      // Wobble on release
      if (Math.abs(parentState.dragTarget) < 0.1 && Math.abs(parentState.drag) > 0.1) {
        parentState.wobble += 0.04;
        parentState.drag += Math.sin(parentState.wobble) * Math.abs(parentState.drag) * 0.13;
      } else if (Math.abs(parentState.dragTarget) < 0.1) {
        parentState.wobble = 0;
      }
      
      // Decay drag slowly
      parentState.dragTarget *= 0.95;
      
      const parentPath = svg.querySelector('#parentOrb');
      if (parentPath) {
        // Parent drift within 20% of screen center
        const driftX = Math.sin(now * 0.00011) * viewportRef.current.width * 0.09;
        const driftY = Math.cos(now * 0.00009) * viewportRef.current.height * 0.08;
        const px = viewportRef.current.width * 0.5 + driftX;
        const py = viewportRef.current.height * 0.5 + driftY + parentState.drag * 0.3;
        
        // Parent starts to fade when drag is extreme
        const parentFade = Math.max(0.3, Math.min(1, 1 - Math.abs(parentState.drag) / 500));
        parentPath.setAttribute('opacity', parentFade);
        
        // Only update if in viewport
        if (px > cullBounds.left && px < cullBounds.right && 
            py > cullBounds.top && py < cullBounds.bottom) {
          const morphT = now * 0.0002;
          const dragAmp = 1 + Math.abs(parentState.drag) * 0.008;
          const path = generateOptimizedBlob(px, py, parentRadius + parentState.drag * 0.15, 
            qualitySettings.parentPoints, morphT, dragAmp, 0, blobCache.current, 1);
          parentPath.setAttribute('d', path);
        }
      }
    }
    
    // Update child orbs with LOD
    const children = svg.querySelector('#children');
    if (children) {
      for (let i = 0; i < childCount; i++) {
        const childPath = children.children[i];
        if (!childPath) continue;
        
        const state = orbStatesRef.current[i + 1];
        if (!state) continue;
        
        // Calculate orbital position with safe distance from parent
        state.orbitalAngle = (state.orbitalAngle || 0) + 0.00022 * (state.orbitalSpeed || 1);
        const angle = state.orbitalAngle;
        // Ensure children never overlap with parent (parent radius + child radius + buffer)
        const safeDistance = parentRadius + childRadius + 30; // 30px buffer
        const radius = safeDistance + i * 20; // Original spacing
        
        const parentX = viewportRef.current.width * 0.7;
        const parentY = 190;
        const x = parentX + Math.cos(angle) * radius;
        const y = parentY + Math.sin(angle) * radius;
        
        // Distance-based LOD
        const mouseDistance = Math.sqrt((x - mouseRef.current.x) ** 2 + (y - mouseRef.current.y) ** 2);
        let points = qualitySettings.childPoints;
        if (mouseDistance > PERFORMANCE_CONFIG.LOD_FAR) {
          points = Math.floor(points * 0.5);
        } else if (mouseDistance > PERFORMANCE_CONFIG.LOD_MID) {
          points = Math.floor(points * 0.75);
        }
        
        // Viewport culling
        if (x > cullBounds.left && x < cullBounds.right && 
            y > cullBounds.top && y < cullBounds.bottom) {
          const morphT = now * 0.0002 + i * 10;
          const path = generateOptimizedBlob(x, y, childRadius, points, morphT, 0.5, i, blobCache.current, state.uniqueShape || 1);
          childPath.setAttribute('d', path);
          
          // Update color gradient
          const hue = (i * 67 + now * 0.018) % 360;
          const color = hslToHex(hue, 80, 60);
          const gradStop = svg.querySelector(`#c${i}s0`);
          if (gradStop) gradStop.setAttribute('stop-color', color);
        } else {
          // Hide off-screen orbs
          childPath.setAttribute('opacity', '0');
        }
      }
    }
    
    // Update particles with batch rendering
    activeParticles.current = activeParticles.current.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.life -= p.decay;
      
      if (p.life <= 0) {
        releaseParticle(p);
        return false;
      }
      
      // Only render visible particles
      if (p.x > cullBounds.left && p.x < cullBounds.right && 
          p.y > cullBounds.top && p.y < cullBounds.bottom) {
        ctx.globalAlpha = p.opacity * p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      
      return true;
    });
    
    lastUpdateRef.current = now;
    animationFrameRef.current = requestAnimationFrame(renderFrame);
  }, [updateGradientColors, childCount, emitParticles, releaseParticle]);
  
  // Optimized event handlers
  const handleResize = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    viewportRef.current = { width: vw, height: vh };
    
    if (canvasRef.current) {
      canvasRef.current.width = vw;
      canvasRef.current.height = vh;
    }
    
    if (svgRef.current) {
      svgRef.current.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    }
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);
  
  const handleScroll = useCallback((e) => {
    const deltaY = e.deltaY || (window.scrollY - scrollRef.current.y);
    const velocity = Math.max(-80, Math.min(80, deltaY * 0.5));
    
    // Apply drag to parent orb
    orbStatesRef.current[0].dragTarget += velocity * 1.8;
    
    // Apply drag to each child with different sensitivities
    orbStatesRef.current.slice(1).forEach((state, i) => {
      state.dragTarget += velocity * (0.5 + i * 0.2);
    });
    
    scrollRef.current = {
      y: window.scrollY,
      velocity: deltaY
    };
  }, []);
  
  // Initialize orb states
  useEffect(() => {
    // Initialize parent orb with drag physics
    orbStatesRef.current = [{
      drag: 0, dragTarget: 0, dragV: 0,
      wobble: 0,
      orbitalAngle: 0,
      position: { x: 0, y: 0, z: 0 },
      dissolveType: 'parent' // Parent has unique effect
    }];
    
    // Initialize child orbs with unique characteristics
    for (let i = 0; i < childCount; i++) {
      orbStatesRef.current.push({
        orbitalAngle: (i * Math.PI * 2) / childCount,
        orbitalSpeed: 0.22 + i * 0.1, // Unique speed per child
        uniqueShape: 0.7 + i * 0.06, // Each orb has slightly different morphing
        position: { x: 0, y: 0, z: 0 },
        // Unique disappearance effects
        dissolveType: ['evaporate', 'spiral', 'shatter', 'fade', 'implode'][i],
        drag: 0,
        dragTarget: 0,
        dragV: 0,
        wobble: 0,
        wasVisible: true
      });
    }
  }, [childCount]);
  
  // Main setup effect
  useEffect(() => {
    handleResize();
    
    // Setup SVG structure
    const svg = svgRef.current;
    if (svg) {
      // Ensure children group exists
      let children = svg.querySelector('#children');
      if (!children) {
        children = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        children.id = 'children';
        svg.appendChild(children);
      }
      
      // Create child paths
      children.innerHTML = '';
      for (let i = 0; i < childCount; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', `url(#childGrad${i})`);
        path.setAttribute('opacity', '0.95');
        children.appendChild(path);
      }
    }
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleScroll, { passive: false });
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(renderFrame);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup caches
      blobCache.current.clear();
    };
  }, [childCount, handleResize, handleMouseMove, handleScroll, renderFrame]);
  
  // Helper function for spring physics
  const dampedSpring = useCallback((current, target, velocity, stiffness, damping) => {
    const force = (target - current) * stiffness;
    velocity += force;
    velocity *= damping;
    current += velocity;
    return [current, velocity];
  }, []);
  
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
        }}
      />
      <svg 
        ref={svgRef} 
        id="orbSVG"
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          shapeRendering: 'optimizeSpeed' // Performance hint
        }}
      >
        <defs>
          <radialGradient id="parentGrad" cx="50%" cy="50%" r="70%">
            <stop id="p0" offset="0%" stopColor="#00E5FF"/>
            <stop id="p1" offset="25%" stopColor="#00E5FF"/>
            <stop id="p2" offset="50%" stopColor="#5B3CFF"/>
            <stop id="p3" offset="75%" stopColor="#5B3CFF"/>
            <stop id="p4" offset="100%" stopColor="#00E5FF"/>
          </radialGradient>
          {Array.from({ length: childCount }, (_, i) => (
            <radialGradient key={i} id={`childGrad${i}`} cx="50%" cy="50%" r="70%">
              <stop id={`c${i}s0`} offset="0%" stopColor={hslToHex((i * 67) % 360, 85, 65)}/>
              <stop id={`c${i}s1`} offset="100%" stopColor={hslToHex((i * 67 + 180) % 360, 70, 25)}/>
            </radialGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path id="parentOrb" fill="url(#parentGrad)" opacity="0.95" filter="url(#glow)"/>
        <g id="children" />
      </svg>
    </Box>
  );
};

export default AnimatedOrbHeroBG;