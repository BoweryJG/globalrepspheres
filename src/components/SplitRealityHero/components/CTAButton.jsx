import React, { useState } from 'react';
import './CTAButton.css';

/**
 * Custom CTA Button Component - Book-shaped design for Life Reclamation
 * Primary button transforms like opening a book
 */
const CTAButton = ({ 
  primary = false, 
  secondary = false,
  onClick, 
  text = 'Get Started',
  icon = null,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    
    setIsClicked(true);
    
    // Ripple effect origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple
    const ripple = document.createElement('span');
    ripple.className = 'cta-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    e.currentTarget.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
      setIsClicked(false);
    }, 600);
    
    // Call onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'book':
        return (
          <svg className="cta-icon book-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 7V20L12 15L20 20V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 2V15" stroke="currentColor" strokeWidth="2"/>
            <path className="page-flutter" d="M8 10L12 12L16 10" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
          </svg>
        );
      case 'play':
        return (
          <svg className="cta-icon play-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5V19L19 12L8 5Z"/>
          </svg>
        );
      case 'arrow':
        return (
          <svg className="cta-icon arrow-icon" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const buttonClass = [
    'cta-button',
    primary ? 'primary' : '',
    secondary ? 'secondary' : '',
    isHovered ? 'hovered' : '',
    isClicked ? 'clicked' : '',
    disabled ? 'disabled' : '',
    icon === 'book' ? 'book-style' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {/* Book spine effect for primary button */}
      {primary && icon === 'book' && (
        <span className="book-spine" />
      )}
      
      {/* Button content */}
      <span className="cta-content">
        {getIcon()}
        <span className="cta-text">{text}</span>
      </span>
      
      {/* Arrow indicator */}
      <span className="cta-arrow">→</span>
      
      {/* Glow effect */}
      <span className="cta-glow" />
      
      {/* Page turn effect for book button */}
      {primary && icon === 'book' && (
        <span className="page-turn">
          <span className="page page-1" />
          <span className="page page-2" />
          <span className="page page-3" />
        </span>
      )}
    </button>
  );
};

export default CTAButton;