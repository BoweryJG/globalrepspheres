import React, { useEffect, useRef, useState } from 'react';
import './MagneticButtons.css';

const MagneticButtons = ({ onChoice }) => {
  const containerRef = useRef(null);
  const empireRef = useRef(null);
  const fallingRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [deviceTilt, setDeviceTilt] = useState(0);
  const [isHovering, setIsHovering] = useState({ empire: false, falling: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse/Touch tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCursorPosition({ x, y });
      
      // Update CSS variables for magnetic effect
      container.style.setProperty('--cursor-x', `${x}%`);
      container.style.setProperty('--cursor-y', `${y}%`);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        setCursorPosition({ x, y });
        
        container.style.setProperty('--cursor-x', `${x}%`);
        container.style.setProperty('--cursor-y', `${y}%`);
      }
    };

    // Device orientation for mobile
    const handleOrientation = (e) => {
      if (e.beta !== null) {
        const tilt = Math.max(-1, Math.min(1, e.beta / 90));
        setDeviceTilt(tilt);
        document.documentElement.style.setProperty('--device-tilt', tilt);
      }
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);

    // Progressive enhancement for device orientation
    if ('DeviceOrientationEvent' in window) {
      // Check if we need to request permission (iOS 13+)
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const requestOrientationPermission = async () => {
          try {
            const response = await DeviceOrientationEvent.requestPermission();
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          } catch (error) {
            console.log('Device orientation permission denied');
          }
        };
        
        // Add a click handler to request permission
        const handleFirstInteraction = () => {
          requestOrientationPermission();
          container.removeEventListener('click', handleFirstInteraction);
        };
        container.addEventListener('click', handleFirstInteraction);
      } else {
        // No permission needed
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Calculate distance and force for magnetic effects
  const calculateMagneticForce = (buttonRef) => {
    if (!buttonRef.current || !containerRef.current) return { force: 0, angle: 0 };

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    
    const buttonCenterX = button.left + button.width / 2 - container.left;
    const buttonCenterY = button.top + button.height / 2 - container.top;
    
    const cursorX = (cursorPosition.x / 100) * container.width;
    const cursorY = (cursorPosition.y / 100) * container.height;
    
    const deltaX = cursorX - buttonCenterX;
    const deltaY = cursorY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(container.width * container.width + container.height * container.height) / 2;
    
    const force = Math.max(0, 1 - (distance / maxDistance));
    const angle = Math.atan2(deltaY, deltaX);
    
    return { force, angle, deltaX, deltaY };
  };

  // Update magnetic effects on cursor position change
  useEffect(() => {
    if (!empireRef.current || !fallingRef.current) return;

    const empireForce = calculateMagneticForce(empireRef);
    const fallingForce = calculateMagneticForce(fallingRef);

    // Empire button - attractive force
    empireRef.current.style.setProperty('--distance', empireForce.force);
    empireRef.current.style.setProperty('--pull-x', empireForce.deltaX);
    empireRef.current.style.setProperty('--pull-y', empireForce.deltaY);

    // Falling button - repulsive force
    fallingRef.current.style.setProperty('--distance', fallingForce.force);
    fallingRef.current.style.setProperty('--push-x', -fallingForce.deltaX);
    fallingRef.current.style.setProperty('--push-y', -fallingForce.deltaY);
  }, [cursorPosition]);

  const handleEmpireClick = () => {
    // Add success animation
    empireRef.current.classList.add('chosen');
    setTimeout(() => {
      onChoice('empire');
    }, 600);
  };

  const handleFallingClick = () => {
    // Add reluctant animation
    fallingRef.current.classList.add('rejected');
    setTimeout(() => {
      onChoice('falling');
    }, 600);
  };

  return (
    <div className="magnetic-buttons-container" ref={containerRef}>
      <div className="force-field-visualizer">
        <div className="field-lines empire-field"></div>
        <div className="field-lines falling-field"></div>
      </div>

      <div className="button-wrapper">
        <button
          ref={empireRef}
          className={`magnetic-button btn-empire ${isHovering.empire ? 'hovering' : ''}`}
          onClick={handleEmpireClick}
          onMouseEnter={() => setIsHovering({ ...isHovering, empire: true })}
          onMouseLeave={() => setIsHovering({ ...isHovering, empire: false })}
        >
          <span className="button-text">Join the Empire</span>
          <div className="attraction-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{ '--particle-index': i }}></div>
            ))}
          </div>
          <div className="magnetic-glow"></div>
        </button>

        <div className="choice-divider">
          <span className="or-text">OR</span>
        </div>

        <button
          ref={fallingRef}
          className={`magnetic-button btn-falling ${isHovering.falling ? 'hovering' : ''}`}
          onClick={handleFallingClick}
          onMouseEnter={() => setIsHovering({ ...isHovering, falling: true })}
          onMouseLeave={() => setIsHovering({ ...isHovering, falling: false })}
        >
          <span className="button-text">Keep Falling Behind</span>
          <div className="repulsion-field"></div>
          <div className="warning-pulse"></div>
        </button>
      </div>

      <div className="mobile-tilt-indicator" style={{ opacity: Math.abs(deviceTilt) }}>
        <span>Tilt to Choose Your Destiny</span>
      </div>
    </div>
  );
};

export default MagneticButtons;