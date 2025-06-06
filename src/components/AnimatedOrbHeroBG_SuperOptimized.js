import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useOrbContext } from './OrbContextProvider';

// Aggressive performance optimizations
const PERFORMANCE_CONFIG = {
  // Reduced complexity
  PARENT_POINTS: 32, // Reduced from 64
  CHILD_POINTS: 16, // Reduced from 32
  CHILD_COUNT: 3, // Reduced from 5
  MAX_PARTICLES: 30, // Reduced from unlimited
  
  // Frame limiting
  TARGET_FPS: 30, // Lower target for stability
  FRAME_TIME: 1000 / 30, // 33.33ms per frame
  
  // Update intervals
  GRADIENT_UPDATE_INTERVAL: 500, // Less frequent gradient updates
  BLOB_CACHE_INTERVAL: 100, // Longer cache time
  TRANSMISSION_INTERVAL: 15000, // Much less frequent
  
  // Quality settings
  USE_SIMPLE_SHAPES: true, // Use circles instead of complex blobs
  DISABLE_PARTICLES: false, // Option to disable particles
  DISABLE_TRANSMISSIONS: true, // Disable data transmissions
  USE_TRANSFORM: true, // Use CSS transforms instead of path updates
};

// Pre-calculated values
const trigCache = new Map();
const getTrigTable = (points) => {
  if (trigCache.has(points)) return trigCache.get(points);
  const sin = new Float32Array(points);
  const cos = new Float32Array(points);
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points;
    sin[i] = Math.sin(angle);
    cos[i] = Math.cos(angle);
  }
  trigCache.set(points, { sin, cos });
  return { sin, cos };
};

// Simple blob generator for better performance
const generateSimpleBlob = (cx, cy, r, points, t, amp = 1) => {
  if (PERFORMANCE_CONFIG.USE_SIMPLE_SHAPES) {
    return `M ${cx - r},${cy} A ${r},${r} 0 1,0 ${cx + r},${cy} A ${r},${r} 0 1,0 ${cx - r},${cy}`;
  }
  
  const { sin, cos } = getTrigTable(points);
  let path = '';
  
  for (let i = 0; i < points; i++) {
    const noise = Math.sin(i * 3 + t) * amp * 2;
    const radius = r + noise;
    const x = cx + cos[i] * radius;
    const y = cy + sin[i] * radius;
    
    if (i === 0) {
      path = `M ${x},${y}`;
    } else {
      path += ` L ${x},${y}`;
    }
  }
  
  return path + ' Z';
};

const AnimatedOrbHeroBG_SuperOptimized = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const lastFrameTimeRef = useRef(0);
  const particlesRef = useRef([]);
  const orbElementsRef = useRef({});
  const orbTransformsRef = useRef({});
  const lastGradientUpdateRef = useRef(0);
  
  const { updateGradientColors } = useOrbContext();

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });

    // Initialize orb elements
    const parentOrb = svg.querySelector('#parentOrb');
    const childrenGroup = svg.querySelector('#children');
    
    if (!parentOrb || !childrenGroup) return;

    // Create child orbs using circles for performance
    childrenGroup.innerHTML = '';
    const childOrbs = [];
    
    for (let i = 0; i < PERFORMANCE_CONFIG.CHILD_COUNT; i++) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", "14");
      circle.setAttribute("fill", `url(#childGrad${i})`);
      circle.setAttribute("opacity", "0.9");
      childrenGroup.appendChild(circle);
      childOrbs.push(circle);
      
      // Initialize transform
      orbTransformsRef.current[`child${i}`] = { x: 0, y: 0, scale: 1 };
    }
    
    orbElementsRef.current = {
      parent: parentOrb,
      children: childOrbs,
    };
    
    // Initialize parent transform
    orbTransformsRef.current.parent = { x: 400, y: 190, scale: 1 };

    // Optimized animation loop with frame limiting
    let t = 0;
    const animate = (currentTime) => {
      // Frame limiting
      const deltaTime = currentTime - lastFrameTimeRef.current;
      if (deltaTime < PERFORMANCE_CONFIG.FRAME_TIME) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTimeRef.current = currentTime;
      t += 0.01;

      // Update gradients less frequently
      if (currentTime - lastGradientUpdateRef.current > PERFORMANCE_CONFIG.GRADIENT_UPDATE_INTERVAL) {
        const hue = (t * 10) % 360;
        updateGradientColors({
          start: `hsl(${hue}, 80%, 60%)`,
          end: `hsl(${(hue + 60) % 360}, 80%, 60%)`,
        });
        lastGradientUpdateRef.current = currentTime;
      }

      // Update parent orb
      const parentX = 400 + Math.sin(t * 0.5) * 20;
      const parentY = 190 + Math.cos(t * 0.3) * 15;
      
      if (PERFORMANCE_CONFIG.USE_TRANSFORM) {
        // Use transform for better performance
        parentOrb.setAttribute('transform', `translate(${parentX - 400}, ${parentY - 190})`);
      } else {
        const parentPath = generateSimpleBlob(parentX, parentY, 36, PERFORMANCE_CONFIG.PARENT_POINTS, t, 0.8);
        parentOrb.setAttribute('d', parentPath);
      }

      // Update child orbs with simple circular motion
      for (let i = 0; i < PERFORMANCE_CONFIG.CHILD_COUNT; i++) {
        const angle = (i * 2 * Math.PI / PERFORMANCE_CONFIG.CHILD_COUNT) + t * 0.8;
        const radius = 60 + i * 25;
        const childX = parentX + Math.cos(angle) * radius;
        const childY = parentY + Math.sin(angle) * radius;
        
        const circle = childOrbs[i];
        if (circle) {
          circle.setAttribute('cx', childX);
          circle.setAttribute('cy', childY);
          
          // Simple size variation
          const scale = 1 + Math.sin(t * 2 + i) * 0.1;
          circle.setAttribute('r', 14 * scale);
        }
      }

      // Update particles (limited)
      if (!PERFORMANCE_CONFIG.DISABLE_PARTICLES) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particlesRef.current = particlesRef.current.filter(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          
          if (p.life > 0) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            return true;
          }
          return false;
        });
        
        // Add new particles occasionally (limited)
        if (particlesRef.current.length < PERFORMANCE_CONFIG.MAX_PARTICLES && Math.random() < 0.1) {
          particlesRef.current.push({
            x: parentX + (Math.random() - 0.5) * 40,
            y: parentY + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r: 1 + Math.random(),
            life: 1,
          });
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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
        }}
      />
      <svg 
        ref={svgRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
        }}
      >
        <defs>
          <radialGradient id="parentGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#00E5FF"/>
            <stop offset="100%" stopColor="#5B3CFF"/>
          </radialGradient>
          {[...Array(PERFORMANCE_CONFIG.CHILD_COUNT)].map((_, i) => (
            <radialGradient key={i} id={`childGrad${i}`} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={`hsl(${i * 120}, 80%, 70%)`}/>
              <stop offset="100%" stopColor={`hsl(${i * 120}, 80%, 30%)`}/>
            </radialGradient>
          ))}
        </defs>
        <circle id="parentOrb" cx="400" cy="190" r="36" fill="url(#parentGrad)" opacity="0.95"/>
        <g id="children"></g>
      </svg>
    </Box>
  );
};

export default AnimatedOrbHeroBG_SuperOptimized;