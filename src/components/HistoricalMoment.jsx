import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import './HistoricalMoment.css';

const HistoricalMoment = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    
    containerRef.current.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Timeline geometry - massive horizontal line
    const timelineGeometry = new THREE.BufferGeometry();
    const timelinePositions = [];
    const timelineColors = [];
    const timelineLength = 100;
    
    for (let i = 0; i <= timelineLength; i++) {
      timelinePositions.push(i - timelineLength / 2, 0, 0);
      // Gradient from dark to golden
      const progress = i / timelineLength;
      timelineColors.push(
        progress * 0.8 + 0.2, // R
        progress * 0.6 + 0.2, // G
        progress * 0.2 + 0.1  // B
      );
    }
    
    timelineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(timelinePositions, 3));
    timelineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(timelineColors, 3));
    
    const timelineMaterial = new THREE.LineBasicMaterial({ 
      vertexColors: true, 
      linewidth: 3,
      transparent: true,
      opacity: 0.8
    });
    
    const timelineLine = new THREE.Line(timelineGeometry, timelineMaterial);
    scene.add(timelineLine);

    // Historical markers
    const markerGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    
    // Electricity moment (1879)
    const electricityMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4a90e2,
      emissive: 0x1a3052,
      transparent: true,
      opacity: 0.9
    });
    const electricityMarker = new THREE.Mesh(markerGeometry, electricityMaterial);
    electricityMarker.position.set(-15, 0, 0);
    scene.add(electricityMarker);

    // AI moment (2024)
    const aiMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      emissive: 0x664400,
      transparent: true,
      opacity: 0.9
    });
    const aiMarker = new THREE.Mesh(markerGeometry, aiMaterial);
    aiMarker.position.set(15, 0, 0);
    scene.add(aiMarker);

    // Particle systems for energy flows (reduced for mobile)
    const particleCount = isMobile ? 500 : 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions around the AI marker
      particlePositions[i3] = (Math.random() - 0.5) * 100;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 30;
      
      // Random velocities
      particleVelocities[i3] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Golden colors
      particleColors[i3] = 0.8 + Math.random() * 0.2;     // R
      particleColors[i3 + 1] = 0.6 + Math.random() * 0.2; // G
      particleColors[i3 + 2] = 0.1 + Math.random() * 0.1; // B
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(particleVelocities, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Investment streams (from tech giants to AI infrastructure)
    const streamGeometry = new THREE.BufferGeometry();
    const streamPositions = [];
    const streamColors = [];
    
    // Create curved paths from different points to center
    const sources = [
      { x: -30, y: 15, name: 'OpenAI' },
      { x: -30, y: -15, name: 'Oracle' },
      { x: 30, y: 10, name: 'Amazon' }
    ];
    
    sources.forEach(source => {
      for (let i = 0; i <= 50; i++) {
        const progress = i / 50;
        const curve = Math.sin(progress * Math.PI) * 5;
        
        const x = source.x + (15 - source.x) * progress;
        const y = source.y * (1 - progress) + curve;
        const z = 0;
        
        streamPositions.push(x, y, z);
        streamColors.push(1, 0.8, 0); // Golden
      }
    });
    
    streamGeometry.setAttribute('position', new THREE.Float32BufferAttribute(streamPositions, 3));
    streamGeometry.setAttribute('color', new THREE.Float32BufferAttribute(streamColors, 3));
    
    const streamMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      linewidth: 2
    });
    
    const investmentStreams = new THREE.Line(streamGeometry, streamMaterial);
    scene.add(investmentStreams);

    // Individual human figures (radiating from AI center)
    const humanGeometry = new THREE.ConeGeometry(0.2, 0.8, 6);
    const humanMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      emissive: 0x333333,
      transparent: true,
      opacity: 0.8
    });
    
    const humanFigures = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      const human = new THREE.Mesh(humanGeometry, humanMaterial);
      
      human.position.set(
        15 + Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 6
      );
      human.lookAt(aiMarker.position);
      
      humanFigures.push(human);
      scene.add(human);
    }

    // Camera positioning
    camera.position.set(0, 10, 25);
    camera.lookAt(0, 0, 0);

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate particles
      const positions = particleSystem.geometry.attributes.position.array;
      const velocities = particleSystem.geometry.attributes.velocity.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Add attraction to AI center
        const dx = 15 - positions[i3];
        const dy = 0 - positions[i3 + 1];
        const dz = 0 - positions[i3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance > 0.1) {
          const force = 0.0001;
          velocities[i3] += dx * force;
          velocities[i3 + 1] += dy * force;
          velocities[i3 + 2] += dz * force;
        }
        
        // Reset particles that are too far
        if (distance > 50) {
          positions[i3] = (Math.random() - 0.5) * 100;
          positions[i3 + 1] = (Math.random() - 0.5) * 30;
          positions[i3 + 2] = (Math.random() - 0.5) * 30;
          velocities[i3] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }
      }
      
      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      // Animate markers
      electricityMarker.rotation.y += 0.01;
      aiMarker.rotation.y += 0.02;
      
      // Animate human figures
      humanFigures.forEach((human, index) => {
        const offset = index * 0.5;
        human.rotation.y = time * 0.5 + offset;
        human.position.y += Math.sin(time * 2 + offset) * 0.01;
      });
      
      // Mouse interaction effects
      const mouseInfluence = 0.1;
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * mouseInfluence;
      camera.position.y += (mouseRef.current.y * 5 - camera.position.y + 10) * mouseInfluence;
      camera.lookAt(0, 0, 0);
      
      // Investment stream animation
      const streamPositions = investmentStreams.geometry.attributes.position.array;
      for (let i = 0; i < streamPositions.length; i += 3) {
        streamPositions[i + 1] += Math.sin(time * 2 + i * 0.1) * 0.01;
      }
      investmentStreams.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);
    
    // GSAP entrance animations
    gsap.fromTo('.historical-moment-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 }
    );
    
    gsap.fromTo('.subheadline', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.8 }
    );
    
    gsap.fromTo('.investment-flow', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)', delay: 1.2 }
    );
    
    gsap.fromTo('.key-message', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.5 }
    );
    
    gsap.fromTo('.call-to-action', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)', delay: 1.8 }
    );
    
    gsap.fromTo('.timeline-marker', 
      { opacity: 0, x: (index) => index === 0 ? -50 : 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 2, stagger: 0.2 }
    );

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Store container reference for cleanup
      const container = containerRef.current;
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <section className="historical-moment-section" style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef}
        className="threejs-container"
      />
      
      {/* Content Overlay */}
      <div className="content-overlay">
        {/* Main Headline */}
        <h1 className="historical-moment-title">
          THE HISTORICAL MOMENT
        </h1>
        
        {/* Subheadline */}
        <div className="subheadline">
          Never before in the history of the world has so much intelligence and reasoning power been available to the average person.
        </div>
        
        {/* Investment Flow Indicator */}
        <div className="investment-flow">
          $700 BILLION from OpenAI • Oracle • Amazon
        </div>
        
        {/* Key Message */}
        <div className="key-message">
          Just went into the infrastructure that makes this possible.<br />
          <span className="key-message-highlight">
            The scales have been rebalanced toward the individual.
          </span>
        </div>
        
        {/* Call to Action */}
        <div className="call-to-action">
          This is your moment.
        </div>
      </div>
      
      {/* Timeline Labels */}
      <div className="timeline-marker electricity">
        1879: ELECTRICITY
      </div>
      
      <div className="timeline-marker ai">
        2024: AI
      </div>
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-text">
            Loading Historical Moment...
          </div>
        </div>
      )}
      
    </section>
  );
};

export default HistoricalMoment;