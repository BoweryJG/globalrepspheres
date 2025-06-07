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
    
    const parentRadius = 100;
    const childRadius = 36;
    const childPoints = 48;
    const childAmp = 0.5;
    const childGradIds = [
      "childGrad0", "childGrad1", "childGrad2", "childGrad3", "childGrad4"
    ];
    
    // Dynamically resize SVG to fit all orbs
    function adjustSVGSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      window.viewportSize = {vw, vh};
      const maxChildIndex = childCount - 1;
      const maxOrbit = parentRadius + 120 + maxChildIndex * 40;
      const maxReach = maxOrbit + childRadius + 8;
      const minDim = Math.min(vw, vh);
      const scale = minDim / (maxReach * 2);
      const size = maxReach * 2 * scale;
      const svg = svgRef.current;
      svg.setAttribute('width', vw);
      svg.setAttribute('height', vh);
      svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      window.parentCenterBase = window.parentCenter = {x: vw/2, y: vh/2};
      window.orbScale = scale;
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
    
    // Scroll/Drag Gravity Effect
    let lastWheelTime = 0;
    const handleWheel = (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastWheelTime);
      lastWheelTime = now;
      const velocity = Math.max(-80, Math.min(80, e.deltaY / dt * 120));
      orbStates.forEach((state, i) => {
        const angle = orbMorphDirections[i];
        state.dragTarget += Math.sin(angle) * velocity * 1.8 + Math.cos(angle) * velocity * 0.7;
      });
      e.preventDefault();
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    
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
      
      // Animate orb morph states
      for (let i = 0; i < orbStates.length; i++) {
        const state = orbStates[i];
        const spring = 0.045 * (1 + orbMorphSpeeds[i]);
        const damping = 0.90 - orbMorphSpeeds[i] * 0.33;
        [state.drag, state.dragV] = dampedSpring(state.drag, state.dragTarget, state.dragV, spring, damping);
        if (Math.abs(state.dragTarget) < 0.1 && Math.abs(state.drag) > 0.1) {
          state.wobble += 0.04 + orbMorphSpeeds[i] * 0.9;
          state.drag += Math.sin(state.wobble) * Math.max(0, Math.abs(state.drag) * 0.13 * (1 + orbMorphSpeeds[i]));
        } else if (Math.abs(state.dragTarget) < 0.1) {
          state.wobble = 0;
        }
        state.dragTarget = approach(state.dragTarget, 0, 0.018 + orbMorphSpeeds[i] * 0.6);
      }
      
      // Parent orb
      const parentState = orbStates[0];
      const parentMorphT = now * 0.0004;
      const parentDrag = parentState.drag;
      const parentAngle = orbMorphDirections[0];
      const parentDx = Math.cos(parentAngle) * parentDrag;
      const parentDy = Math.sin(parentAngle) * parentDrag;
      const scale = window.orbScale || 1;
      
      // Animate parent orb's position
      const {vw, vh} = window.viewportSize || {vw: 800, vh: 800};
      const px = window.parentCenterBase.x + Math.sin(now * 0.00011) * vw * 0.09 + Math.cos(now * 0.00007) * vw * 0.07;
      const py = window.parentCenterBase.y + Math.cos(now * 0.00009) * vh * 0.08 + Math.sin(now * 0.00016) * vh * 0.06;
      window.parentCenter = {x: px, y: py};
      
      const parentR = (parentRadius + parentDrag * 0.15) * scale;
      const parentAmp = (1 + Math.abs(parentDrag) * 0.008) * scale;
      const parentPath = generateSuperSmoothBlob(px + parentDx * scale, py + parentDy * scale, parentR, 64, parentMorphT, parentAmp);
      parentOrb.setAttribute('d', parentPath);
      
      // Children
      childrenGroup.innerHTML = '';
      for (let i = 0; i < childCount; i++) {
        const state = orbStates[i + 1];
        const fam = getDynamicColorFamily(i, now);
        const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
        svgRef.current.querySelector(`#c${i}s0`).setAttribute("stop-color", lerpColor(fam[0], fam[1], tcol));
        svgRef.current.querySelector(`#c${i}s1`).setAttribute("stop-color", lerpColor(fam[1], fam[0], tcol));
        
        const baseAngle = (now * 0.00022 + i * (2 * Math.PI / childCount));
        const parentR = (parentRadius + state.drag * 0.15) * (window.orbScale || 1);
        const minEdge = Math.min(
          window.parentCenter.x,
          vw - window.parentCenter.x,
          window.parentCenter.y,
          vh - window.parentCenter.y
        );
        const maxChildOrbit = Math.max(40, minEdge - parentR - childRadius * (window.orbScale || 1) - 16);
        const orbitPhase = now * (0.00012 + 0.00007 * i) + i * 1.13;
        const orbitWobble = Math.sin(orbitPhase) * 0.18 + Math.cos(orbitPhase * 0.7) * 0.09;
        const minOrbit = parentR + childRadius * (window.orbScale || 1) + 12;
        let rawOrbit = (parentR + 60 + (i * 0.71 + 1.4) * maxChildOrbit / childCount) * (0.7 + 0.23 * orbitWobble);
        const orbitRadius = Math.max(rawOrbit, minOrbit);
        const ellipseA = orbitRadius * 1.3 * (0.97 + 0.07 * Math.sin(now * 0.00013 + i));
        const ellipseB = orbitRadius * 1.1 * (0.97 + 0.07 * Math.cos(now * 0.00016 + i * 2));
        const angle = baseAngle + Math.sin(now * 0.00009 + i * 1.7) * 0.22;
        const dragAngle = orbMorphDirections[i + 1];
        const dx = Math.cos(dragAngle) * state.drag;
        const dy = Math.sin(dragAngle) * state.drag;
        const x = window.parentCenter.x + Math.cos(angle) * ellipseA + dx;
        const y = window.parentCenter.y + Math.sin(angle) * ellipseB + dy;
        const cR = (childRadius + state.drag * 0.08) * scale;
        const cAmp = (childAmp + Math.abs(state.drag) * 0.006) * scale;
        const morphT = now * 0.0005 + i * 10;
        const childPath = generateSuperSmoothBlob(x * scale + (1 - scale) * window.parentCenter.x, y * scale + (1 - scale) * window.parentCenter.y, cR, childPoints, morphT, cAmp, i);
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", childPath);
        path.setAttribute("fill", `url(#${childGradIds[i]})`);
        
        const fadeStart = 40, fadeEnd = 340;
        const fade = Math.min(1, Math.max(0, (fadeEnd - Math.abs(state.dragTarget)) / (fadeEnd - fadeStart)));
        if (state.wasVisible === undefined) state.wasVisible = fade > 0.5;
        if (fade < 0.5 && fade > 0.05) {
          const color = lerpColor(fam[0], fam[1], tcol);
          const emission = Math.ceil((0.5 - fade) * 12);
          emitParticles(x, y, color, emission, i, now);
          path.setAttribute("opacity", fade * 0.95);
        }
        else if (state.wasVisible && fade <= 0.05) {
          const color = lerpColor(fam[0], fam[1], tcol);
          emitParticles(x, y, color, 12, i, now);
          path.setAttribute("opacity", 0);
          state.wasVisible = false;
        }
        else if (!state.wasVisible && fade > 0.05) {
          const color = lerpColor(fam[0], fam[1], tcol);
          emitParticles(x, y, color, 9, i, now);
          path.setAttribute("opacity", fade * 0.95);
          state.wasVisible = true;
        } else {
          path.setAttribute("opacity", fade * 0.95);
        }
        childrenGroup.appendChild(path);
      }
      animateParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    animate();
    
    return () => {
      window.removeEventListener('resize', adjustSVGSize);
      window.removeEventListener('wheel', handleWheel);
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