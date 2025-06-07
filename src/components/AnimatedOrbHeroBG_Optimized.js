import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useOrbContext } from './OrbContextProvider';

// Pool of DOM elements to reuse instead of recreating
class ElementPool {
  constructor(tagName, namespace = null) {
    this.tagName = tagName;
    this.namespace = namespace;
    this.available = [];
    this.inUse = new Set();
  }

  acquire() {
    let element;
    if (this.available.length > 0) {
      element = this.available.pop();
    } else {
      if (this.namespace) {
        element = document.createElementNS(this.namespace, this.tagName);
      } else {
        element = document.createElement(this.tagName);
      }
    }
    this.inUse.add(element);
    return element;
  }

  release(element) {
    if (this.inUse.has(element)) {
      this.inUse.delete(element);
      this.available.push(element);
      // Clear attributes for reuse
      while (element.attributes.length > 0) {
        element.removeAttribute(element.attributes[0].name);
      }
    }
  }

  releaseAll() {
    this.inUse.forEach(element => {
      this.available.push(element);
    });
    this.inUse.clear();
  }
}

const AnimatedOrbHeroBG_Optimized = ({ zIndex = 0, sx = {}, style = {}, className = "" }) => {
  const svgRef = useRef(null);
  const parentOrbRef = useRef(null);
  const childrenGroupRef = useRef(null);
  const particlesGroupRef = useRef(null);

  // Element pools for performance
  const circlePoolRef = useRef(new ElementPool('circle', 'http://www.w3.org/2000/svg'));

  // Refs to store mutable values
  const orbStatesRef = useRef([]);
  const childOrbsRef = useRef([]);
  const particlesRef = useRef([]);
  const viewportSizeRef = useRef({ vw: 800, vh: 800 });
  const parentCenterBaseRef = useRef({ x: 400, y: 400 });
  const parentCenterRef = useRef({ x: 400, y: 400 });
  const orbScaleRef = useRef(1);
  const lastWheelTimeRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  const childCount = 5;
  const parentRadius = 100;
  const childRadius = 36;
  const childPoints = 48;
  const childAmp = 0.5;
  const orbMorphDirections = [];
  const orbMorphSpeeds = [];

  // Get the context to update gradient colors
  const { updateGradientColors } = useOrbContext();

  // --- Utility functions ---
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
  };

  const getDynamicColorFamily = (i, now) => {
    const baseHue = (i * 67 + now * 0.018) % 360;
    const hue2 = (baseHue + 40 + 20 * Math.sin(now * 0.0007 + i)) % 360;
    const sat = 80 + 10 * Math.sin(now * 0.0005 + i);
    const light1 = 60 + 10 * Math.cos(now * 0.0004 + i * 2);
    const light2 = 35 + 15 * Math.sin(now * 0.0006 + i * 3);
    return [hslToHex(baseHue, sat, light1), hslToHex(hue2, sat, light2)];
  };

  const approach = (current, target, speed) => {
    return current + (target - current) * speed;
  };

  const dampedSpring = (current, target, velocity, stiffness, damping) => {
    const force = (target - current) * stiffness;
    velocity += force;
    velocity *= damping;
    current += velocity;
    return [current, velocity];
  };

  const emitParticles = (x, y, color, count = 3, i = 0, now = 0) => {
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
    // Limit particle count to prevent performance issues
    if (particlesRef.current.length > 150) {
      particlesRef.current = particlesRef.current.slice(-150);
    }
  };

  const animateParticles = () => {
    // Update particles
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
    
    // Release all circles back to pool
    circlePoolRef.current.releaseAll();
    
    // Clear particles group
    while (particlesGroupRef.current.firstChild) {
      particlesGroupRef.current.removeChild(particlesGroupRef.current.firstChild);
    }
    
    // Create document fragment for batch insertion
    const fragment = document.createDocumentFragment();
    
    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.life -= p.decay;
      p.opacity = Math.max(0, p.life);
      
      const circ = circlePoolRef.current.acquire();
      circ.setAttribute("cx", p.x.toFixed(1));
      circ.setAttribute("cy", p.y.toFixed(1));
      circ.setAttribute("r", (p.r * p.opacity).toFixed(1));
      circ.setAttribute("fill", p.color);
      circ.setAttribute("opacity", (p.opacity * 0.7).toFixed(2));
      fragment.appendChild(circ);
    }
    
    particlesGroupRef.current.appendChild(fragment);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const adjustSVGSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      viewportSizeRef.current = { vw, vh };
      
      const maxChildIndex = childCount - 1;
      const maxOrbit = parentRadius + 120 + maxChildIndex * 40;
      const maxReach = maxOrbit + childRadius + 8;
      const minDim = Math.min(vw, vh);
      const scale = minDim / (maxReach * 2);
      
      svg.setAttribute('width', vw.toString());
      svg.setAttribute('height', vh.toString());
      svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      
      parentCenterBaseRef.current = { x: vw/2, y: vh/2 };
      parentCenterRef.current = { x: vw/2, y: vh/2 };
      orbScaleRef.current = scale;
    };

    adjustSVGSize();
    window.addEventListener('resize', adjustSVGSize);

    parentOrbRef.current = svg.querySelector('#parentOrb');
    childrenGroupRef.current = svg.querySelector('#children');
    particlesGroupRef.current = svg.querySelector('#particles');

    const makeOrbState = () => ({
      drag: 0, dragTarget: 0, dragV: 0,
      squash: 0, squashTarget: 0, squashV: 0,
      mouseDir: 0, mouseDirTarget: 0, mouseDirV: 0,
      wobble: 0, lastUpdate: performance.now(),
      wasVisible: true
    });

    // Initialize morph directions and speeds
    orbMorphDirections.length = 0;
    orbMorphSpeeds.length = 0;
    orbMorphDirections.push(Math.PI / 2);
    orbMorphSpeeds.push(0.012);
    for (let i = 0; i < childCount; i++) {
      const angle = Math.PI / 2 + (i - (childCount - 1) / 2) * (Math.PI / 8) + (Math.random() - 0.5) * (Math.PI / 12);
      orbMorphDirections.push(angle);
      orbMorphSpeeds.push(0.014 + i * 0.004 + Math.random() * 0.003);
    }

    // Initialize orb states
    orbStatesRef.current = [makeOrbState()]; // Parent
    
    // Create child orbs once and reuse them
    childOrbsRef.current = [];
    if (childrenGroupRef.current) {
      // Clear existing children
      while (childrenGroupRef.current.firstChild) {
        childrenGroupRef.current.removeChild(childrenGroupRef.current.firstChild);
      }
      
      for (let i = 0; i < childCount; i++) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", `url(#childGrad${i})`);
        path.setAttribute("opacity", "0.95");
        childrenGroupRef.current.appendChild(path);
        childOrbsRef.current.push(path);
        orbStatesRef.current.push(makeOrbState());
      }
    }

    const handleWheel = (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastWheelTimeRef.current);
      lastWheelTimeRef.current = now;
      const velocity = Math.max(-80, Math.min(80, e.deltaY / dt * 120));
      
      orbStatesRef.current.forEach((state, i) => {
        const angle = orbMorphDirections[i];
        state.dragTarget += Math.sin(angle) * velocity * 1.8 + Math.cos(angle) * velocity * 0.7;
      });
      e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    const animate = () => {
      const now = performance.now();
      const baseHue = (now * 0.01) % 360;
      
      // Update parent gradient
      const parentStops = [
        { id: "p0", phase: 0 },
        { id: "p1", phase: Math.PI * 0.5 },
        { id: "p2", phase: Math.PI },
        { id: "p3", phase: Math.PI * 1.5 }
      ];
      
      for (let i = 0; i < parentStops.length; i++) {
        const stop = parentStops[i];
        const hue = (baseHue + 60 * Math.sin(now * 0.00015 + stop.phase)) % 360;
        const sat = 80 + 10 * Math.sin(now * 0.0002 + stop.phase);
        const light = 60 + 10 * Math.cos(now * 0.00018 + stop.phase);
        const stopEl = svg.querySelector(`#${stop.id}`);
        if (stopEl) stopEl.setAttribute("stop-color", hslToHex(hue, sat, light));
      }

      // Update gradient colors for navbar orb
      const startHue = baseHue;
      const endHue = (baseHue + 60 * Math.sin(now * 0.00015 + Math.PI * 0.5)) % 360;
      updateGradientColors({ 
        start: hslToHex(startHue, 80, 60), 
        end: hslToHex(endHue, 80, 60) 
      });

      // Animate orb morph states
      for (let i = 0; i < orbStatesRef.current.length; i++) {
        const state = orbStatesRef.current[i];
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

      // Update parent orb
      const parentState = orbStatesRef.current[0];
      const parentMorphT = now * 0.0004;
      const parentDrag = parentState.drag;
      const parentAngle = orbMorphDirections[0];
      const parentDx = Math.cos(parentAngle) * parentDrag;
      const parentDy = Math.sin(parentAngle) * parentDrag;
      const scale = orbScaleRef.current;

      const { vw, vh } = viewportSizeRef.current;
      const px = parentCenterBaseRef.current.x + Math.sin(now * 0.00011) * vw * 0.09 + Math.cos(now * 0.00007) * vw * 0.07;
      const py = parentCenterBaseRef.current.y + Math.cos(now * 0.00009) * vh * 0.08 + Math.sin(now * 0.00016) * vh * 0.06;
      parentCenterRef.current = { x: px, y: py };

      const parentR = (parentRadius + parentDrag * 0.15) * scale;
      const parentAmp = (1 + Math.abs(parentDrag) * 0.008) * scale;
      const parentPath = generateSuperSmoothBlob(px + parentDx * scale, py + parentDy * scale, parentR, 64, parentMorphT, parentAmp);
      if (parentOrbRef.current) {
        parentOrbRef.current.setAttribute('d', parentPath);
      }

      // Update children - reuse existing elements
      for (let i = 0; i < childCount; i++) {
        const state = orbStatesRef.current[i + 1];
        const path = childOrbsRef.current[i];
        if (!state || !path) continue;

        // Update child gradient colors
        const fam = getDynamicColorFamily(i, now);
        const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
        const stop0 = svg.querySelector(`#c${i}s0`);
        const stop1 = svg.querySelector(`#c${i}s1`);
        if (stop0) stop0.setAttribute("stop-color", lerpColor(fam[0], fam[1], tcol));
        if (stop1) stop1.setAttribute("stop-color", lerpColor(fam[1], fam[0], tcol));

        // Calculate child position
        const baseAngle = (now * 0.00022 + i * (2 * Math.PI / childCount));
        const { vw, vh } = viewportSizeRef.current;
        const parentR = (parentRadius + state.drag * 0.15) * scale;
        const minEdge = Math.min(
          parentCenterRef.current.x,
          vw - parentCenterRef.current.x,
          parentCenterRef.current.y,
          vh - parentCenterRef.current.y
        );
        const maxChildOrbit = Math.max(40, minEdge - parentR - childRadius * scale - 16);
        const orbitPhase = now * (0.00012 + 0.00007 * i) + i * 1.13;
        const orbitWobble = Math.sin(orbitPhase) * 0.18 + Math.cos(orbitPhase * 0.7) * 0.09;
        const minOrbit = parentR + childRadius * scale + 12;
        let rawOrbit = (parentR + 60 + (i * 0.71 + 1.4) * maxChildOrbit / childCount) * (0.7 + 0.23 * orbitWobble);
        const orbitRadius = Math.max(rawOrbit, minOrbit);
        const ellipseA = orbitRadius * 1.3 * (0.97 + 0.07 * Math.sin(now * 0.00013 + i));
        const ellipseB = orbitRadius * 1.1 * (0.97 + 0.07 * Math.cos(now * 0.00016 + i * 2));
        const angle = baseAngle + Math.sin(now * 0.00009 + i * 1.7) * 0.22;
        const dragAngle = orbMorphDirections[i + 1];
        const dx = Math.cos(dragAngle) * state.drag;
        const dy = Math.sin(dragAngle) * state.drag;
        const x = parentCenterRef.current.x + Math.cos(angle) * ellipseA + dx;
        const y = parentCenterRef.current.y + Math.sin(angle) * ellipseB + dy;
        const cR = (childRadius + state.drag * 0.08) * scale;
        const cAmp = (childAmp + Math.abs(state.drag) * 0.006) * scale;
        const morphT = now * 0.0005 + i * 10;
        const childPath = generateSuperSmoothBlob(
          x * scale + (1 - scale) * parentCenterRef.current.x, 
          y * scale + (1 - scale) * parentCenterRef.current.y, 
          cR, childPoints, morphT, cAmp, i
        );
        
        // Update path
        path.setAttribute("d", childPath);
        
        // Handle fade and particles
        const fadeStart = 40, fadeEnd = 340;
        const fade = Math.min(1, Math.max(0, (fadeEnd - Math.abs(state.dragTarget)) / (fadeEnd - fadeStart)));
        
        if (state.wasVisible === undefined) state.wasVisible = fade > 0.5;

        if (fade < 0.5 && fade > 0.05) {
          const color = lerpColor(fam[0], fam[1], tcol);
          const emission = Math.ceil((0.5 - fade) * 12);
          emitParticles(x, y, color, emission, i, now);
          path.setAttribute("opacity", (fade * 0.95).toFixed(2));
        } else if (state.wasVisible && fade <= 0.05) {
          const color = lerpColor(fam[0], fam[1], tcol);
          emitParticles(x, y, color, 12, i, now);
          path.setAttribute("opacity", "0");
          state.wasVisible = false;
        } else if (!state.wasVisible && fade > 0.05) {
          const color = lerpColor(fam[0], fam[1], tcol);
          emitParticles(x, y, color, 9, i, now);
          path.setAttribute("opacity", (fade * 0.95).toFixed(2));
          state.wasVisible = true;
        } else {
          path.setAttribute("opacity", (fade * 0.95).toFixed(2));
        }
      }

      // Animate particles
      animateParticles();
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', adjustSVGSize);
      window.removeEventListener('wheel', handleWheel);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
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
        touchAction: 'none',
        background: '#0B0B20',
        ...sx,
      }}
      style={style}
      className={className}
    >
      <svg 
        ref={svgRef} 
        id="orbSVG"
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative'
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

export default AnimatedOrbHeroBG_Optimized;