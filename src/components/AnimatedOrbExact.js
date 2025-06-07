import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

const AnimatedOrbExact = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Utility functions
    function lerp(a, b, t) { return a + (b - a) * t; }
    function hslToHex(h, s, l) {
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
    }
    function lerpColor(a, b, t) {
      const ah = parseInt(a.replace('#', ''), 16), bh = parseInt(b.replace('#', ''), 16);
      const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
      const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
      const rr = Math.round(ar + (br - ar) * t);
      const rg = Math.round(ag + (bg - ag) * t);
      const rb = Math.round(ab + (bb - ab) * t);
      return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1);
    }
    function generateSuperSmoothBlob(cx, cy, r, points, t, amp=1, phase=0) {
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
      let d = "";
      for (let i = 0; i < points; i++) {
        const p0 = pts[(i - 1 + points) % points];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % points];
        const p3 = pts[(i + 2) % points];
        if (i === 0) {
          d += `M${p1.x.toFixed(2)},${p1.y.toFixed(2)}`;
        }
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
      }
      d += "Z";
      return d;
    }

    const childCount = 5;
    // Dynamic Color Families
    function getDynamicColorFamily(i, now) {
      const baseHue = (i * 67 + now * 0.018) % 360;
      const hue2 = (baseHue + 40 + 20 * Math.sin(now * 0.0007 + i)) % 360;
      const sat = 80 + 10 * Math.sin(now * 0.0005 + i);
      const light1 = 60 + 10 * Math.cos(now * 0.0004 + i * 2);
      const light2 = 35 + 15 * Math.sin(now * 0.0006 + i * 3);
      return [hslToHex(baseHue, sat, light1), hslToHex(hue2, sat, light2)];
    }
    
    const parentRadius = 50;  // Half size
    const childRadius = 18;   // Half size
    const childPoints = 32;  // Reduced for performance
    const childAmp = 0.15;   // Much smaller amplitude for more spherical shape
    const childGradIds = [
      "childGrad0", "childGrad1", "childGrad2", "childGrad3", "childGrad4"
    ];
    
    // Simple resize handler
    function adjustSVGSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      window.viewportSize = {vw, vh};
      const svg = svgRef.current;
      svg.setAttribute('width', vw);
      svg.setAttribute('height', vh);
      svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      // Position to the right of center, below navbar with more clearance
      // Navbar ~80px + max orbit radius ~150px + parent movement ~15px
      window.parentCenterBase = window.parentCenter = {x: vw * 0.7, y: 250};
      window.orbScale = 1; // No scaling needed since we already halved the sizes
    }
    adjustSVGSize();
    window.addEventListener('resize', adjustSVGSize);

    const childrenGroup = svgRef.current.querySelector('#children');
    const childOrbs = [];
    
    // Orb State Management
    const orbStates = [];
    const parentOrb = svgRef.current.querySelector('#parentOrb');
    
    function makeOrbState() {
      return {
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
      };
    }
    
    // Orb Morph Personalities
    const orbMorphDirections = [];
    const orbMorphSpeeds = [];
    orbMorphDirections.push(Math.PI / 2);
    orbMorphSpeeds.push(0.012);
    for (let i = 0; i < childCount; i++) {
      const angle = Math.PI / 2 + (i - (childCount - 1) / 2) * (Math.PI / 8) + (Math.random() - 0.5) * (Math.PI / 12);
      orbMorphDirections.push(angle);
      orbMorphSpeeds.push(0.014 + i * 0.004 + Math.random() * 0.003);
    }
    
    // Parent orb state
    orbStates.push(makeOrbState());
    // Children orb states
    for (let i = 0; i < childCount; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", `url(#${childGradIds[i]})`);
      path.setAttribute("opacity", "0.95");
      childrenGroup.appendChild(path);
      childOrbs.push(path);
      orbStates.push(makeOrbState());
    }
    
    // Track scroll position for spiral effect
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animation Interpolation Helpers
    function approach(current, target, speed) {
      return current + (target - current) * speed;
    }
    function dampedSpring(current, target, velocity, stiffness, damping) {
      const force = (target - current) * stiffness;
      velocity += force;
      velocity *= damping;
      current += velocity;
      return [current, velocity];
    }
    
    // Particle system
    const particlesGroup = svgRef.current.querySelector('#particles');
    let particles = [];
    
    function animateParticles() {
      particles = particles.filter(p => p.life > 0);
      particlesGroup.innerHTML = '';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= p.decay;
        p.opacity = Math.max(0, p.life);
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", p.x);
        circ.setAttribute("cy", p.y);
        circ.setAttribute("r", p.r * p.opacity);
        circ.setAttribute("fill", p.color);
        circ.setAttribute("opacity", p.opacity * 0.7);
        particlesGroup.appendChild(circ);
      }
    }
    
    function emitParticles(x, y, color, count = 3, i = 0, now = 0) {
      for (let j = 0; j < count; j++) {
        let h = (i * 67 + now * 0.018) % 360 + (Math.random() - 0.5) * 24;
        let s = 85 + Math.random() * 10;
        let l = 55 + Math.random() * 20;
        const particleColor = hslToHex(h, s, l);
        const angle = Math.random() * 2 * Math.PI;
        const speed = 0.4 + Math.random() * 0.7;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        particles.push({
          x, y,
          vx, vy,
          r: 1.1 + Math.random() * 1.2,
          life: 0.6,
          decay: 0.025 + Math.random() * 0.015,
          color: particleColor,
          opacity: 0.45
        });
      }
    }
    
    function animate() {
      // Animate parent gradient
      const parentStops = [
        { id: "p0", phase: 0 },
        { id: "p1", phase: Math.PI * 0.5 },
        { id: "p2", phase: Math.PI },
        { id: "p3", phase: Math.PI * 1.5 }
      ];
      const now = performance.now();
      const baseHue = (now * 0.01) % 360;
      for (let i = 0; i < parentStops.length; i++) {
        const stop = parentStops[i];
        const hue = (baseHue + 60 * Math.sin(now * 0.00015 + stop.phase)) % 360;
        const sat = 80 + 10 * Math.sin(now * 0.0002 + stop.phase);
        const light = 60 + 10 * Math.cos(now * 0.00018 + stop.phase);
        svgRef.current.querySelector(`#${stop.id}`).setAttribute("stop-color", hslToHex(hue, sat, light));
      }
      
      // More aggressive fade - starts fading at 150px, fully faded at 450px
      const globalFade = Math.max(0, Math.min(1, 1 - ((scrollY - 150) / 300)));
      
      // Skip rendering if completely faded
      if (globalFade <= 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Parent orb - no drag, just morphing
      const parentMorphT = now * 0.0004;
      const scale = window.orbScale || 1;
      
      // Animate parent orb's position - smaller movement area
      const {vw, vh} = window.viewportSize || {vw: 800, vh: 800};
      const px = window.parentCenterBase.x + Math.sin(now * 0.00011) * 30; // Smaller movement
      const py = window.parentCenterBase.y + Math.cos(now * 0.00009) * 15; // Only move down, not up
      window.parentCenter = {x: px, y: py};
      
      // Much subtler spiral effect
      const spiralAngle = (scrollY / 300) * Math.PI;
      const spiralRadius = Math.min(scrollY * 0.1, 50); // Cap the spiral radius
      const spiralX = px + Math.cos(spiralAngle) * spiralRadius;
      const spiralY = py + Math.sin(spiralAngle) * spiralRadius;
      
      const parentR = parentRadius * scale;
      const parentPath = generateSuperSmoothBlob(spiralX, spiralY, parentR, 48, parentMorphT, 0.2); // Less points, smaller amplitude
      parentOrb.setAttribute('d', parentPath);
      
      // Ensure parent completely disappears
      const parentOpacity = globalFade < 0.01 ? 0 : 0.95 * globalFade;
      parentOrb.setAttribute('opacity', parentOpacity);
      
      // Children
      childrenGroup.innerHTML = '';
      for (let i = 0; i < childCount; i++) {
        const state = orbStates[i + 1];
        const fam = getDynamicColorFamily(i, now);
        const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
        svgRef.current.querySelector(`#c${i}s0`).setAttribute("stop-color", lerpColor(fam[0], fam[1], tcol));
        svgRef.current.querySelector(`#c${i}s1`).setAttribute("stop-color", lerpColor(fam[1], fam[0], tcol));
        
        // Simple orbit for children - ensure no overlap with parent
        const baseAngle = (now * 0.00022 + i * (2 * Math.PI / childCount));
        // Start orbit outside parent orb (parentRadius + childRadius + buffer)
        const minOrbitRadius = parentRadius + childRadius + 20; // 20px buffer
        const orbitRadius = minOrbitRadius + i * 15;
        
        // Calculate child fade first - more aggressive
        const childFadeStart = 50 + i * 15; // Start earlier
        const childFadeRange = 150; // Fade faster
        const childFade = Math.max(0, Math.min(1, 1 - ((scrollY - childFadeStart) / childFadeRange)));
        
        // Base position
        const baseX = window.parentCenter.x + Math.cos(baseAngle) * orbitRadius;
        const baseY = window.parentCenter.y + Math.sin(baseAngle) * orbitRadius;
        
        // Children spiral away as they fade
        const fadeProgress = 1 - childFade; // 0 when visible, 1 when faded
        const childSpiralAngle = (fadeProgress * Math.PI * 2) + i * Math.PI / 3;
        const childSpiralRadius = fadeProgress * 100; // Move away as they fade
        const x = baseX + Math.cos(childSpiralAngle) * childSpiralRadius;
        const y = baseY + Math.sin(childSpiralAngle) * childSpiralRadius;
        
        const cR = childRadius;
        const morphT = now * 0.0005 + i * 10;
        const childPath = generateSuperSmoothBlob(x, y, cR, childPoints, morphT, childAmp, i);
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", childPath);
        path.setAttribute("fill", `url(#${childGradIds[i]})`);
        
        // Set opacity based on fade - ensure complete disappearance
        const childOpacity = childFade < 0.01 ? 0 : 0.95 * childFade;
        path.setAttribute("opacity", childOpacity);
        
        // Skip rendering if invisible
        if (childOpacity === 0) continue;
        childrenGroup.appendChild(path);
      }
      // No particles needed
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    animate();
    
    return () => {
      window.removeEventListener('resize', adjustSVGSize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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
      <svg 
        ref={svgRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          touchAction: 'none',
        }}
      >
        <g id="particles"></g>
        <defs>
          <radialGradient id="parentGrad" cx="50%" cy="50%" r="70%">
            <stop id="p0" offset="0%" stopColor="#00E5FF"/>
            <stop id="p1" offset="100%" stopColor="#5B3CFF"/>
            <stop id="p2" offset="50%" stopColor="#00E5FF"/>
            <stop id="p3" offset="75%" stopColor="#5B3CFF"/>
          </radialGradient>
          <radialGradient id="childGrad0" cx="50%" cy="50%" r="70%">
            <stop id="c0s0" offset="0%" stopColor="#B3D8FF"/>
            <stop id="c0s1" offset="100%" stopColor="#0A192F"/>
          </radialGradient>
          <radialGradient id="childGrad1" cx="50%" cy="50%" r="70%">
            <stop id="c1s0" offset="0%" stopColor="#C6FFD9"/>
            <stop id="c1s1" offset="100%" stopColor="#145A32"/>
          </radialGradient>
          <radialGradient id="childGrad2" cx="50%" cy="50%" r="70%">
            <stop id="c2s0" offset="0%" stopColor="#FFB3C9"/>
            <stop id="c2s1" offset="100%" stopColor="#7B1F3A"/>
          </radialGradient>
          <radialGradient id="childGrad3" cx="50%" cy="50%" r="70%">
            <stop id="c3s0" offset="0%" stopColor="#E0D1FF"/>
            <stop id="c3s1" offset="100%" stopColor="#311B4F"/>
          </radialGradient>
          <radialGradient id="childGrad4" cx="50%" cy="50%" r="70%">
            <stop id="c4s0" offset="0%" stopColor="#FFF5B3"/>
            <stop id="c4s1" offset="100%" stopColor="#4B3800"/>
          </radialGradient>
        </defs>
        <path id="parentOrb" fill="url(#parentGrad)" opacity="0.95"/>
        <g id="children"></g>
      </svg>
    </Box>
  );
};

export default AnimatedOrbExact;