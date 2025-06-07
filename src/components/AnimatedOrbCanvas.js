import React, { useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';

const AnimatedOrbCanvas = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const viewportRef = useRef({ width: 800, height: 800 });
  
  // Orb states matching header_orb copy.html exactly
  const orbStatesRef = useRef([]);
  const particlesRef = useRef([]);
  const lastWheelTimeRef = useRef(0);
  const parentCenterBaseRef = useRef({ x: 400, y: 400 });
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
  const makeOrbState = () => ({
    drag: 0,
    dragTarget: 0,
    dragV: 0,
    squash: 0,
    squashTarget: 0,
    squashV: 0,
    mouseDir: 0,
    mouseDirTarget: 0,
    mouseDirV: 0,
    wobble: 0,
    lastUpdate: performance.now(),
  });

  // Orb morph directions and speeds
  const orbMorphDirections = useRef([]);
  const orbMorphSpeeds = useRef([]);

  // Initialize states
  useEffect(() => {
    // Parent orb: slowest, morphs mostly vertical
    orbMorphDirections.current[0] = Math.PI / 2;
    orbMorphSpeeds.current[0] = 0.012;

    // Children: varied directions and speeds
    for (let i = 0; i < childCount; i++) {
      const angle = Math.PI / 2 + (i - (childCount - 1) / 2) * (Math.PI / 8) + (Math.random() - 0.5) * (Math.PI / 12);
      orbMorphDirections.current[i + 1] = angle;
      orbMorphSpeeds.current[i + 1] = 0.014 + i * 0.004 + Math.random() * 0.003;
    }

    // Create orb states
    orbStatesRef.current = [];
    for (let i = 0; i <= childCount; i++) {
      orbStatesRef.current.push(makeOrbState());
    }
  }, []);

  // Handle scroll/wheel
  const handleWheel = useCallback((e) => {
    const now = performance.now();
    const dt = Math.max(1, now - lastWheelTimeRef.current);
    lastWheelTimeRef.current = now;
    
    const velocity = Math.max(-80, Math.min(80, e.deltaY / dt * 120));
    
    // Set dragTarget for all orbs
    orbStatesRef.current.forEach((state, i) => {
      const angle = orbMorphDirections.current[i];
      state.dragTarget += Math.sin(angle) * velocity * 1.8 + Math.cos(angle) * velocity * 0.7;
    });
    
    e.preventDefault();
  }, []);

  // Spring physics
  const approach = (current, target, speed) => current + (target - current) * speed;
  
  const dampedSpring = (current, target, velocity, stiffness, damping) => {
    const force = (target - current) * stiffness;
    velocity += force;
    velocity *= damping;
    current += velocity;
    return [current, velocity];
  };

  // Particle system
  const emitParticles = useCallback((x, y, color, count = 3, i = 0, now = 0) => {
    for (let j = 0; j < count; j++) {
      let h = (i * 67 + now * 0.018) % 360 + (Math.random() - 0.5) * 24;
      let s = 85 + Math.random() * 10;
      let l = 55 + Math.random() * 20;
      const particleColor = hslToHex(h, s, l);
      const angle = Math.random() * 2 * Math.PI;
      const speed = 0.4 + Math.random() * 0.7;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      particlesRef.current.push({
        x, y, vx, vy,
        r: 1.1 + Math.random() * 1.2,
        life: 0.6,
        decay: 0.025 + Math.random() * 0.015,
        color: particleColor,
        opacity: 0.45
      });
    }
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
    
    // Animate parent gradient
    const baseHue = (now * 0.01) % 360;
    
    // Update orb physics
    for (let i = 0; i < orbStatesRef.current.length; i++) {
      const state = orbStatesRef.current[i];
      const spring = 0.045 * (1 + orbMorphSpeeds.current[i]);
      const damping = 0.90 - orbMorphSpeeds.current[i] * 0.33;
      
      [state.drag, state.dragV] = dampedSpring(state.drag, state.dragTarget, state.dragV, spring, damping);
      
      // Wobble
      if (Math.abs(state.dragTarget) < 0.1 && Math.abs(state.drag) > 0.1) {
        state.wobble += 0.04 + orbMorphSpeeds.current[i] * 0.9;
        state.drag += Math.sin(state.wobble) * Math.max(0, Math.abs(state.drag) * 0.13 * (1 + orbMorphSpeeds.current[i]));
      } else if (Math.abs(state.dragTarget) < 0.1) {
        state.wobble = 0;
      }
      
      state.dragTarget = approach(state.dragTarget, 0, 0.018 + orbMorphSpeeds.current[i] * 0.6);
    }
    
    // Parent orb
    const parentState = orbStatesRef.current[0];
    const parentMorphT = now * 0.0004;
    const parentDrag = parentState.drag;
    const parentAngle = orbMorphDirections.current[0];
    const parentDx = Math.cos(parentAngle) * parentDrag;
    const parentDy = Math.sin(parentAngle) * parentDrag;
    
    // Parent position with drift
    const px = vw/2 + Math.sin(now * 0.00011) * vw * 0.09 + Math.cos(now * 0.00007) * vw * 0.07;
    const py = vh/2 + Math.cos(now * 0.00009) * vh * 0.08 + Math.sin(now * 0.00016) * vh * 0.06;
    parentCenterRef.current = { x: px, y: py };
    
    const parentR = parentRadius + parentDrag * 0.15;
    const parentAmp = 1 + Math.abs(parentDrag) * 0.008;
    const { path: parentPath } = generateSuperSmoothBlob(px + parentDx, py + parentDy, parentR, 64, parentMorphT, parentAmp);
    
    // Parent gradient
    const parentGradient = ctx.createRadialGradient(px, py, 0, px, py, parentR * 0.7);
    for (let i = 0; i < 4; i++) {
      const phase = i * Math.PI * 0.5;
      const hue = (baseHue + 60 * Math.sin(now * 0.00015 + phase)) % 360;
      const sat = 80 + 10 * Math.sin(now * 0.0002 + phase);
      const light = 60 + 10 * Math.cos(now * 0.00018 + phase);
      parentGradient.addColorStop(i / 3, hslToHex(hue < 0 ? hue + 360 : hue, sat, light));
    }
    
    ctx.fillStyle = parentGradient;
    ctx.globalAlpha = 0.95;
    ctx.fill(parentPath);
    
    // Children
    for (let i = 0; i < childCount; i++) {
      const state = orbStatesRef.current[i + 1];
      const fam = getDynamicColorFamily(i, now);
      const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
      
      const baseAngle = (now * 0.00022 + i * (2 * Math.PI / childCount));
      const orbitPhase = now * (0.00012 + 0.00007 * i) + i * 1.13;
      const orbitWobble = Math.sin(orbitPhase) * 0.18 + Math.cos(orbitPhase * 0.7) * 0.09;
      
      const minEdge = Math.min(px, vw - px, py, vh - py);
      const maxChildOrbit = Math.max(40, minEdge - parentR - childRadius - 16);
      const minOrbit = parentR + childRadius + 12;
      let rawOrbit = (parentR + 60 + (i * 0.71 + 1.4) * maxChildOrbit / childCount) * (0.7 + 0.23 * orbitWobble);
      const orbitRadius = Math.max(rawOrbit, minOrbit);
      
      const ellipseA = orbitRadius * 1.3 * (0.97 + 0.07 * Math.sin(now * 0.00013 + i));
      const ellipseB = orbitRadius * 1.1 * (0.97 + 0.07 * Math.cos(now * 0.00016 + i * 2));
      const angle = baseAngle + Math.sin(now * 0.00009 + i * 1.7) * 0.22;
      
      const dragAngle = orbMorphDirections.current[i + 1];
      const dx = Math.cos(dragAngle) * state.drag;
      const dy = Math.sin(dragAngle) * state.drag;
      const x = px + Math.cos(angle) * ellipseA + dx;
      const y = py + Math.sin(angle) * ellipseB + dy;
      
      const cR = childRadius + state.drag * 0.08;
      const cAmp = childAmp + Math.abs(state.drag) * 0.006;
      const morphT = now * 0.0005 + i * 10;
      const { path: childPath } = generateSuperSmoothBlob(x, y, cR, childPoints, morphT, cAmp, i);
      
      // Fade based on drag
      const fadeStart = 40, fadeEnd = 340;
      const fade = Math.min(1, Math.max(0, (fadeEnd - Math.abs(state.dragTarget)) / (fadeEnd - fadeStart)));
      
      // Track visibility
      if (state.wasVisible === undefined) state.wasVisible = fade > 0.5;
      
      // Emit particles on state change
      if (fade < 0.5 && fade > 0.05) {
        const emission = Math.ceil((0.5 - fade) * 12);
        emitParticles(x, y, lerpColor(fam[0], fam[1], tcol), emission, i, now);
      } else if (state.wasVisible && fade <= 0.05) {
        emitParticles(x, y, lerpColor(fam[0], fam[1], tcol), 12, i, now);
        state.wasVisible = false;
      } else if (!state.wasVisible && fade > 0.05) {
        emitParticles(x, y, lerpColor(fam[0], fam[1], tcol), 9, i, now);
        state.wasVisible = true;
      }
      
      // Draw child orb
      const childGradient = ctx.createRadialGradient(x, y, 0, x, y, cR * 0.7);
      childGradient.addColorStop(0, lerpColor(fam[0], fam[1], tcol));
      childGradient.addColorStop(1, lerpColor(fam[1], fam[0], tcol));
      
      ctx.fillStyle = childGradient;
      ctx.globalAlpha = fade * 0.95;
      ctx.fill(childPath);
    }
    
    // Update particles
    particlesRef.current = particlesRef.current.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.life -= p.decay;
      
      if (p.life <= 0) return false;
      
      ctx.globalAlpha = p.opacity * p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fill();
      
      return true;
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [emitParticles]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    canvas.width = vw;
    canvas.height = vh;
    viewportRef.current = { width: vw, height: vh };
    parentCenterBaseRef.current = { x: vw / 2, y: vh / 2 };
  }, []);

  // Setup
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize, handleWheel, animate]);

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