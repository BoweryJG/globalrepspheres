import React, { useEffect, useRef } from 'react';

const KineticStarfield = () => {
  const starfieldRef = useRef(null);

  useEffect(() => {
    const starfield = starfieldRef.current;
    if (!starfield) return;

    // Create stars
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.width = Math.random() * 3 + 'px';
      star.style.height = star.style.width;
      star.style.backgroundColor = '#fff';
      star.style.borderRadius = '50%';
      star.style.opacity = Math.random() * 0.8 + 0.2;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animation = `twinkle ${Math.random() * 5 + 5}s linear infinite`;
      star.style.animationDelay = Math.random() * 5 + 's';
      
      return star;
    };

    // Add stars to the starfield
    const numberOfStars = 150;
    for (let i = 0; i < numberOfStars; i++) {
      starfield.appendChild(createStar());
    }

    // Add twinkle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      while (starfield.firstChild) {
        starfield.removeChild(starfield.firstChild);
      }
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return <div className="starfield" ref={starfieldRef} id="starfield"></div>;
};

export default KineticStarfield;