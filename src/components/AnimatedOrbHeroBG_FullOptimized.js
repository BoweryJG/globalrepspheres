import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useOrbContext } from './OrbContextProvider';

// Performance optimizations while keeping ALL ORBS
const OPTIMIZATION_CONFIG = {
  // KEEP ALL 5 ORBS
  CHILD_COUNT: 5,
  PARENT_RADIUS: 36,
  CHILD_RADIUS: 14,
  
  // Optimize calculations
  PARENT_POINTS: 48, // Slightly reduced but still smooth
  CHILD_POINTS: 24, // Slightly reduced but still smooth
  
  // Performance improvements
  USE_RAF_THROTTLE: true,
  TARGET_FPS: 45, // Higher than 30 for smoothness
  SKIP_FRAMES: 2, // Skip every 2nd frame for complex calculations
  
  // Smarter caching
  BLOB_CACHE_SIZE: 200, // Larger cache
  CACHE_DURATION: 50, // Cache for 50ms
  
  // Batch updates
  BATCH_DOM_UPDATES: true,
  USE_TRANSFORM3D: true, // Hardware acceleration
  
  // Particle optimizations
  MAX_PARTICLES: 100, // Keep particles but limit
  PARTICLE_BATCH_SIZE: 5,
};

// Pre-calculate all trig values
const trigCache = new Map();
const getTrigTable = (points) => {
  if (trigCache.has(points)) return trigCache.get(points);
  const angles = new Float32Array(points);
  const sin = new Float32Array(points);
  const cos = new Float32Array(points);
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points;
    angles[i] = angle;
    sin[i] = Math.sin(angle);
    cos[i] = Math.cos(angle);
  }
  const tables = { angles, sin, cos };
  trigCache.set(points, tables);
  return tables;
};

// Optimized blob generator with better caching
const blobPathCache = new Map();
const generateOptimizedBlob = (cx, cy, r, points, t, amp = 1, phase = 0, cacheKey = '') => {
  // More aggressive caching
  const roundedT = Math.floor(t / OPTIMIZATION_CONFIG.CACHE_DURATION);
  const fullCacheKey = `${cacheKey}_${Math.round(cx)}_${Math.round(cy)}_${Math.round(r)}_${roundedT}`;
  
  if (blobPathCache.has(fullCacheKey)) {
    return blobPathCache.get(fullCacheKey);
  }
  
  const { sin, cos } = getTrigTable(points);
  const pts = new Array(points);
  
  // Simplified noise calculation
  for (let i = 0; i < points; i++) {
    const angle = i * (Math.PI * 2 / points);
    const noise = Math.sin(angle * 3 + t * 0.7 + phase) * amp * 2;
    const rad = r + noise;
    pts[i] = {
      x: cx + cos[i] * rad,
      y: cy + sin[i] * rad
    };
  }
  
  // Build path
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const next = (i + 1) % points;
    const cp1x = pts[i].x + (pts[next].x - pts[i].x) * 0.3;
    const cp1y = pts[i].y + (pts[next].y - pts[i].y) * 0.3;
    const cp2x = pts[next].x - (pts[next].x - pts[i].x) * 0.3;
    const cp2y = pts[next].y - (pts[next].y - pts[i].y) * 0.3;
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${pts[next].x.toFixed(1)},${pts[next].y.toFixed(1)}`;
  }
  d += 'Z';
  
  // Cache management
  blobPathCache.set(fullCacheKey, d);
  if (blobPathCache.size > OPTIMIZATION_CONFIG.BLOB_CACHE_SIZE) {
    const firstKey = blobPathCache.keys().next().value;
    blobPathCache.delete(firstKey);
  }
  
  return d;
};

const AnimatedOrbHeroBG_FullOptimized = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const frameCountRef = useRef(0);
  const animationRef = useRef();
  const orbDataRef = useRef({
    parent: { x: 400, y: 190, drag: 0, dragV: 0 },
    children: Array(OPTIMIZATION_CONFIG.CHILD_COUNT).fill(null).map((_, i) => ({
      angle: (i * 2 * Math.PI / OPTIMIZATION_CONFIG.CHILD_COUNT),
      radius: 60 + i * 20,
      speed: 0.6 + Math.random() * 0.4,
      x: 0, y: 0
    })),
    particles: [],
    time: 0
  });
  
  const { updateGradientColors } = useOrbContext();

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;

    // Canvas setup with hardware acceleration
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Get DOM elements
    const parentOrb = svg.querySelector('#parentOrb');
    const children = svg.querySelectorAll('.childOrb');
    
    // Pre-calculate trig tables
    getTrigTable(OPTIMIZATION_CONFIG.PARENT_POINTS);
    getTrigTable(OPTIMIZATION_CONFIG.CHILD_POINTS);

    // Optimized animation loop
    let lastTime = 0;
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      
      // Frame rate limiting
      if (OPTIMIZATION_CONFIG.USE_RAF_THROTTLE && deltaTime < (1000 / OPTIMIZATION_CONFIG.TARGET_FPS)) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      frameCountRef.current++;
      
      const data = orbDataRef.current;
      data.time += 0.01;
      
      // Update gradients less frequently
      if (frameCountRef.current % 30 === 0) {
        const hue = (data.time * 20) % 360;
        updateGradientColors({
          start: `hsl(${hue}, 80%, 60%)`,
          end: `hsl(${(hue + 60) % 360}, 80%, 60%)`
        });
      }
      
      // Parent orb physics (simplified)
      const parentData = data.parent;
      parentData.drag *= 0.95;
      parentData.x = 400 + Math.sin(data.time * 0.3) * 30;
      parentData.y = 190 + Math.cos(data.time * 0.2) * 20;
      
      // Update parent with transform for performance
      if (OPTIMIZATION_CONFIG.USE_TRANSFORM3D && frameCountRef.current % OPTIMIZATION_CONFIG.SKIP_FRAMES === 0) {
        const parentPath = generateOptimizedBlob(
          0, 0, OPTIMIZATION_CONFIG.PARENT_RADIUS, 
          OPTIMIZATION_CONFIG.PARENT_POINTS, data.time, 1, 0, 'parent'
        );
        parentOrb.setAttribute('d', parentPath);
        parentOrb.style.transform = `translate3d(${parentData.x}px, ${parentData.y}px, 0) scale(1)`;
      }
      
      // Update ALL children
      data.children.forEach((child, i) => {
        child.angle += child.speed * 0.01;
        child.x = parentData.x + Math.cos(child.angle) * child.radius;
        child.y = parentData.y + Math.sin(child.angle) * child.radius;
        
        const childEl = children[i];
        if (childEl) {
          // Use transform for performance
          if (OPTIMIZATION_CONFIG.USE_TRANSFORM3D) {
            childEl.style.transform = `translate3d(${child.x}px, ${child.y}px, 0)`;
            
            // Update path less frequently
            if (frameCountRef.current % (OPTIMIZATION_CONFIG.SKIP_FRAMES * 2) === 0) {
              const childPath = generateOptimizedBlob(
                0, 0, OPTIMIZATION_CONFIG.CHILD_RADIUS,
                OPTIMIZATION_CONFIG.CHILD_POINTS, data.time + i, 0.3, i, `child${i}`
              );
              childEl.setAttribute('d', childPath);
            }
          }
        }
      });
      
      // Particle system (optimized)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles in batches
      const activeParticles = [];
      for (let i = 0; i < data.particles.length; i++) {
        const p = data.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        
        if (p.life > 0) {
          activeParticles.push(p);
          
          // Batch render
          ctx.globalAlpha = p.life * 0.6;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - p.r/2, p.y - p.r/2, p.r, p.r); // Squares are faster
        }
      }
      data.particles = activeParticles;
      
      // Add new particles (limited)
      if (data.particles.length < OPTIMIZATION_CONFIG.MAX_PARTICLES && Math.random() < 0.3) {
        const target = Math.random() < 0.5 ? parentData : data.children[Math.floor(Math.random() * data.children.length)];
        for (let i = 0; i < OPTIMIZATION_CONFIG.PARTICLE_BATCH_SIZE; i++) {
          data.particles.push({
            x: target.x + (Math.random() - 0.5) * 20,
            y: target.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r: 1.5 + Math.random(),
            life: 1,
            color: `hsl(${Math.random() * 360}, 80%, 70%)`
          });
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateGradientColors]);

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
          opacity: 0.8,
        }}
      />
      <svg 
        ref={svgRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          willChange: 'transform',
        }}
      >
        <defs>
          <radialGradient id="parentGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#00E5FF"/>
            <stop offset="100%" stopColor="#5B3CFF"/>
          </radialGradient>
          {[...Array(OPTIMIZATION_CONFIG.CHILD_COUNT)].map((_, i) => (
            <radialGradient key={i} id={`childGrad${i}`} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={`hsl(${i * 72}, 80%, 70%)`}/>
              <stop offset="100%" stopColor={`hsl(${i * 72}, 80%, 30%)`}/>
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
        <path 
          id="parentOrb" 
          fill="url(#parentGrad)" 
          opacity="0.95" 
          filter="url(#glow)"
          style={{ transformOrigin: 'center' }}
        />
        <g id="children">
          {[...Array(OPTIMIZATION_CONFIG.CHILD_COUNT)].map((_, i) => (
            <path
              key={i}
              className="childOrb"
              fill={`url(#childGrad${i})`}
              opacity="0.9"
              filter="url(#glow)"
              style={{ transformOrigin: 'center' }}
            />
          ))}
        </g>
      </svg>
    </Box>
  );
};

export default AnimatedOrbHeroBG_FullOptimized;