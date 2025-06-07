import React, { useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';

const AnimatedOrbCanvas = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const viewportRef = useRef({ width: 800, height: 800 });
  const scrollYRef = useRef(0);
  
  // Orb states
  const orbStatesRef = useRef([]);
  const particlesRef = useRef([]);
  const parentCenterRef = useRef({ x: 400, y: 400 });
  
  // Constants from header_orb copy.html
  const childCount = 5;
  const parentRadius = 100;
  const childRadius = 36;
  const childPoints = 48;
  const childAmp = 0.5;
  
  // Color conversion utilities
  const hslToHex = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
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
    return "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
  };

  const lerpColor = (a, b, t) => {
    const ah = parseInt(a.replace('#', ''), 16), bh = parseInt(b.replace('#', ''), 16);
    const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1);
  };

  // Exact blob generation from header_orb copy.html
  const generateSuperSmoothBlob = (cx, cy, r, points, t, amp = 1, phase = 0) => {
    const pts = [];
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI * 2 * i) / points;
      const noise =
        Math.sin(angle * 3 + t * 0.7 + phase) * 4 * amp +
        Math.sin(angle * 5 - t * 1.1 + phase) * 2 * amp +
        Math.sin(angle * 2 + t * 1.7 + phase) * 1.2 * amp;
      const rad = r + noise;
      pts.push({
        x: cx + Math.cos(angle) * rad,
        y: cy + Math.sin(angle) * rad
      });
    }

    // Build path
    const path = new Path2D();
    for (let i = 0; i < points; i++) {
      const p0 = pts[(i - 1 + points) % points];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % points];
      const p3 = pts[(i + 2) % points];
      
      if (i === 0) {
        path.moveTo(p1.x, p1.y);
      }
      
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      
      path.bezierCurveTo(c1x, c1y, c2x, c2y, p2.x, p2.y);
    }
    path.closePath();
    return { path, points: pts };
  };

  // Dynamic color families
  const getDynamicColorFamily = (i, now) => {
    const baseHue = (i * 67 + now * 0.018) % 360;
    const hue2 = (baseHue + 40 + 20 * Math.sin(now * 0.0007 + i)) % 360;
    const sat = 80 + 10 * Math.sin(now * 0.0005 + i);
    const light1 = 60 + 10 * Math.cos(now * 0.0004 + i * 2);
    const light2 = 35 + 15 * Math.sin(now * 0.0006 + i * 3);
    return [hslToHex(baseHue, sat, light1), hslToHex(hue2, sat, light2)];
  };

  // Initialize orb states
  useEffect(() => {
    orbStatesRef.current = [];
    for (let i = 0; i <= childCount; i++) {
      orbStatesRef.current.push({
        orbitalSpeed: 0.22 + i * 0.1,
        orbitalAngle: (i * Math.PI * 2) / childCount
      });
    }
  }, []);

  // Handle scroll for gentle fade
  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
  }, []);

  // Main animation loop
  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const ctx = canvas.getContext('2d');
    const now = performance.now();
    const vw = viewportRef.current.width;
    const vh = viewportRef.current.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, vw, vh);
    
    // Calculate global fade based on scroll
    const globalFade = Math.max(0, Math.min(1, 1 - (scrollYRef.current / 400)));
    
    // Skip rendering if completely faded
    if (globalFade <= 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Parent position in upper right with subtle drift
    const px = vw * 0.7 + Math.sin(now * 0.00011) * 25;
    const py = 190 + Math.cos(now * 0.00012) * 20;
    parentCenterRef.current = { x: px, y: py };
    
    // Parent orb
    const parentMorphT = now * 0.0004;
    const { path: parentPath } = generateSuperSmoothBlob(px, py, parentRadius, 64, parentMorphT, 1);
    
    // Parent gradient - exact match to header_orb copy.html
    const baseHue = (now * 0.01) % 360;
    const parentGradient = ctx.createRadialGradient(px, py, 0, px, py, parentRadius * 0.7);
    
    // Parent gradient stops exactly as in original
    const parentStops = [
      { offset: 0, phase: 0 },
      { offset: 0.5, phase: Math.PI },
      { offset: 0.75, phase: Math.PI * 1.5 },
      { offset: 1, phase: Math.PI * 0.5 }
    ];
    
    parentStops.forEach((stop, i) => {
      const hue = (baseHue + 60 * Math.sin(now * 0.00015 + stop.phase)) % 360;
      const sat = 80 + 10 * Math.sin(now * 0.0002 + stop.phase);
      const light = 60 + 10 * Math.cos(now * 0.00018 + stop.phase);
      const color = hslToHex(hue < 0 ? hue + 360 : hue, sat, light);
      parentGradient.addColorStop(stop.offset, color);
    });
    
    ctx.fillStyle = parentGradient;
    ctx.globalAlpha = 0.95 * globalFade;
    ctx.fill(parentPath);
    
    // Children
    for (let i = 0; i < childCount; i++) {
      const state = orbStatesRef.current[i + 1];
      const fam = getDynamicColorFamily(i, now);
      const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
      
      // Update orbital angle
      state.orbitalAngle += 0.00022 * state.orbitalSpeed;
      
      // Calculate position
      const radius = 160 + i * 25;
      const x = px + Math.cos(state.orbitalAngle) * radius;
      const y = py + Math.sin(state.orbitalAngle) * radius;
      
      const morphT = now * 0.0005 + i * 10;
      const { path: childPath } = generateSuperSmoothBlob(x, y, childRadius, childPoints, morphT, childAmp, i);
      
      // Draw child orb with richer gradient
      const childGradient = ctx.createRadialGradient(x, y, 0, x, y, childRadius);
      childGradient.addColorStop(0, lerpColor(fam[0], fam[1], tcol));
      childGradient.addColorStop(0.7, lerpColor(fam[1], fam[0], tcol * 0.5));
      childGradient.addColorStop(1, lerpColor(fam[1], fam[0], tcol));
      
      ctx.fillStyle = childGradient;
      ctx.globalAlpha = globalFade * 0.95;
      ctx.fill(childPath);
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    canvas.width = vw;
    canvas.height = vh;
    viewportRef.current = { width: vw, height: vh };
  }, []);

  // Setup
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize, handleScroll, animate]);

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
    </Box>
  );
};

export default AnimatedOrbCanvas;