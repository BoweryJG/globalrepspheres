import React, { useEffect, useRef } from 'react';

const KineticStarfield = () => {
  const starfieldRef = useRef(null);

  useEffect(() => {
    const starfield = starfieldRef.current;
    if (!starfield) return;

    // Create stars with falling animation
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.width = '2px';
      star.style.height = '2px';
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      const duration = Math.random() * 3 + 2; // 2-5 seconds
      star.style.animation = `twinkle ${duration}s linear infinite`;
      star.style.animationDelay = Math.random() * duration + 's';
      
      return star;
    };

    // Add stars to the starfield
    const numberOfStars = 200;
    for (let i = 0; i < numberOfStars; i++) {
      starfield.appendChild(createStar());
    }

    // Add the correct twinkle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0; transform: translateY(0); }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-100vh); }
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