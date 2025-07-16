import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const UrgencyTimer = ({ 
  title = "FOUNDING MEMBER PRICING EXPIRES IN:", 
  endTime,
  onExpire,
  variant = "default" // "default", "minimal", "critical"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const timerRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    // Set default end time to 24 hours from now if not provided
    const defaultEndTime = endTime || new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = defaultEndTime - now;

      if (distance < 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onExpire) onExpire();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      // Critical urgency when under 1 hour
      if (distance < 3600000 && pulseRef.current) { // 1 hour in milliseconds
        gsap.to(pulseRef.current, {
          scale: 1.05,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return {
          background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(255, 140, 0, 0.1))',
          border: '1px solid rgba(255, 68, 68, 0.3)',
          padding: '1rem 2rem',
          borderRadius: '10px'
        };
      case "critical":
        return {
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(139, 0, 0, 0.3))',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 0 30px rgba(255, 0, 0, 0.4)'
        };
      default:
        return {
          background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.15), rgba(255, 140, 0, 0.15))',
          border: '2px solid rgba(255, 68, 68, 0.4)',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 0 40px rgba(255, 68, 68, 0.3)'
        };
    }
  };

  const getTitleSize = () => {
    switch (variant) {
      case "minimal":
        return 'clamp(0.9rem, 2vw, 1.1rem)';
      case "critical":
        return 'clamp(1.5rem, 4vw, 2rem)';
      default:
        return 'clamp(1.2rem, 3vw, 1.6rem)';
    }
  };

  const getNumberSize = () => {
    switch (variant) {
      case "minimal":
        return 'clamp(1.5rem, 4vw, 2rem)';
      case "critical":
        return 'clamp(2.5rem, 6vw, 3.5rem)';
      default:
        return 'clamp(2rem, 5vw, 2.8rem)';
    }
  };

  if (isExpired) {
    return (
      <div 
        ref={timerRef}
        style={{
          ...getVariantStyles(),
          textAlign: 'center'
        }}
      >
        <div style={{
          color: '#ff4444',
          fontSize: getTitleSize(),
          fontWeight: '800',
          marginBottom: '1rem'
        }}>
          ⚠️ OFFER EXPIRED ⚠️
        </div>
        <div style={{
          color: '#cccccc',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
        }}>
          Contact us for current pricing
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={timerRef}
      style={{
        ...getVariantStyles(),
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div 
        ref={pulseRef}
        style={{
          color: '#ff4444',
          fontSize: getTitleSize(),
          fontWeight: '800',
          marginBottom: variant === "minimal" ? '0.5rem' : '1.5rem',
          textShadow: '0 0 10px rgba(255, 68, 68, 0.5)'
        }}
      >
        {title}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: variant === "minimal" ? '1rem' : '2rem',
        flexWrap: 'wrap'
      }}>
        {timeLeft.days > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#ffffff',
              fontSize: getNumberSize(),
              fontWeight: '900',
              fontFamily: 'monospace',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
            }}>
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div style={{
              color: '#cccccc',
              fontSize: variant === "minimal" ? '0.8rem' : '0.9rem',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              Days
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: '#ffffff',
            fontSize: getNumberSize(),
            fontWeight: '900',
            fontFamily: 'monospace',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
          }}>
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div style={{
            color: '#cccccc',
            fontSize: variant === "minimal" ? '0.8rem' : '0.9rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Hours
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: '#ffffff',
            fontSize: getNumberSize(),
            fontWeight: '900',
            fontFamily: 'monospace',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
          }}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div style={{
            color: '#cccccc',
            fontSize: variant === "minimal" ? '0.8rem' : '0.9rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Minutes
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: timeLeft.hours === 0 && timeLeft.minutes < 30 ? '#ff4444' : '#ffffff',
            fontSize: getNumberSize(),
            fontWeight: '900',
            fontFamily: 'monospace',
            textShadow: timeLeft.hours === 0 && timeLeft.minutes < 30 
              ? '0 0 15px rgba(255, 68, 68, 0.8)' 
              : '0 0 15px rgba(255, 255, 255, 0.5)'
          }}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div style={{
            color: '#cccccc',
            fontSize: variant === "minimal" ? '0.8rem' : '0.9rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Seconds
          </div>
        </div>
      </div>

      {variant !== "minimal" && (
        <div style={{
          marginTop: '1.5rem',
          color: '#ffaa00',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: '600'
        }}>
          {timeLeft.hours === 0 && timeLeft.minutes < 30 
            ? "⚡ FINAL MINUTES TO SECURE YOUR SPOT ⚡"
            : "Lock in founder pricing before it's gone forever"}
        </div>
      )}
    </div>
  );
};

export default UrgencyTimer;