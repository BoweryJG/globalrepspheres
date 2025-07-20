import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScarcityIndicator = ({ 
  totalSpots = 100, 
  remainingSpots = 17, 
  territory = "your territory",
  variant = "default" // "default", "critical", "territory"
}) => {
  const [currentSpots, setCurrentSpots] = useState(remainingSpots);
  const progressRef = useRef(null);
  const pulseRef = useRef(null);
  const spotsRef = useRef([]);

  useEffect(() => {
    // Simulate spots being taken every few seconds
    const interval = setInterval(() => {
      setCurrentSpots(prev => {
        const newSpots = Math.max(0, prev - Math.floor(Math.random() * 2 + 1));
        return newSpots;
      });
    }, 8000 + Math.random() * 4000); // Random interval between 8-12 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate progress bar
    if (progressRef.current) {
      const percentage = ((totalSpots - currentSpots) / totalSpots) * 100;
      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 1,
        ease: "power2.out"
      });
    }

    // Critical urgency animation when spots are low
    if (currentSpots <= 10 && pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.02,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [currentSpots, totalSpots]);

  const getUrgencyColor = () => {
    const percentage = (currentSpots / totalSpots) * 100;
    if (percentage <= 10) return '#ff4444'; // Critical - Red
    if (percentage <= 25) return '#ffaa00'; // Warning - Orange
    return '#00ff88'; // Safe - Green
  };

  const getUrgencyMessage = () => {
    const percentage = (currentSpots / totalSpots) * 100;
    if (percentage <= 5) return "🚨 CRITICAL: Final spots remaining!";
    if (percentage <= 10) return "⚠️ URGENT: Very few spots left!";
    if (percentage <= 25) return "🔥 LIMITED: Spots filling fast!";
    return "Available spots in your area";
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "critical":
        return {
          background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(139, 0, 0, 0.3))',
          border: '2px solid rgba(255, 68, 68, 0.5)',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 0 30px rgba(255, 68, 68, 0.4)'
        };
      case "territory":
        return {
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.2))',
          border: '2px solid rgba(59, 130, 246, 0.4)',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 0 25px rgba(59, 130, 246, 0.3)'
        };
      default:
        return {
          background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(255, 68, 68, 0.1))',
          border: '2px solid rgba(255, 140, 0, 0.4)',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 0 25px rgba(255, 140, 0, 0.3)'
        };
    }
  };

  return (
    <div 
      ref={pulseRef}
      style={{
        ...getVariantStyles(),
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{
            color: getUrgencyColor(),
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            fontWeight: '800',
            marginBottom: '0.5rem',
            textShadow: `0 0 10px ${getUrgencyColor()}40`
          }}>
            Available Spots in {territory.toUpperCase()}
          </h3>
          <div style={{
            color: '#cccccc',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: '500'
          }}>
            {getUrgencyMessage()}
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          background: `linear-gradient(135deg, ${getUrgencyColor()}20, ${getUrgencyColor()}10)`,
          padding: '1rem',
          borderRadius: '10px',
          border: `1px solid ${getUrgencyColor()}40`,
          minWidth: '100px'
        }}>
          <div style={{
            color: getUrgencyColor(),
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '900',
            fontFamily: 'monospace',
            lineHeight: '1',
            textShadow: `0 0 15px ${getUrgencyColor()}60`
          }}>
            {currentSpots}
          </div>
          <div style={{
            color: '#cccccc',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            marginTop: '0.3rem'
          }}>
            Left
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        marginBottom: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
            Spots Taken
          </span>
          <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '600' }}>
            {totalSpots - currentSpots} of {totalSpots}
          </span>
        </div>
        
        <div style={{
          width: '100%',
          height: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div
            ref={progressRef}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${getUrgencyColor()}, ${getUrgencyColor()}CC)`,
              borderRadius: '6px',
              width: '0%',
              position: 'relative',
              boxShadow: `0 0 10px ${getUrgencyColor()}60`
            }}
          />
        </div>
      </div>

      {/* Spot Visualization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '0.3rem',
        marginBottom: '1rem'
      }}>
        {Array.from({ length: Math.min(50, totalSpots) }, (_, index) => (
          <div
            key={index}
            ref={el => {
              if (el && !spotsRef.current.includes(el)) {
                spotsRef.current.push(el);
              }
            }}
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: '50%',
              backgroundColor: index < (totalSpots - currentSpots) 
                ? getUrgencyColor() 
                : 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${index < (totalSpots - currentSpots) ? getUrgencyColor() : 'rgba(255, 255, 255, 0.2)'}`,
              transition: 'all 0.3s ease',
              boxShadow: index < (totalSpots - currentSpots) 
                ? `0 0 5px ${getUrgencyColor()}60` 
                : 'none'
            }}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div style={{
        textAlign: 'center',
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          color: getUrgencyColor(),
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}>
          {currentSpots <= 5 
            ? "⚡ FINAL CALL: Secure your spot NOW!"
            : currentSpots <= 15
            ? "🔥 Limited availability - Act fast!"
            : "🎯 Reserve your spot before it's taken"
          }
        </div>
        <div style={{
          color: '#cccccc',
          fontSize: '0.85rem'
        }}>
          Once these {currentSpots} spots are gone, the next opening won't be until Q2 2025
        </div>
      </div>

      {/* Background particles for extra effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 80%, ${getUrgencyColor()}10 0%, transparent 50%), 
                     radial-gradient(circle at 80% 20%, ${getUrgencyColor()}05 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: -1
      }} />
    </div>
  );
};

export default ScarcityIndicator;