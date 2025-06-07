import React from 'react';

const SimpleOrb = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 1,
      animation: 'pulse 4s ease-in-out infinite'
    }}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default SimpleOrb;