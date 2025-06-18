import React, { useState } from 'react';
import { Fab } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HarveyChat from './HarveyChat';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
`;

const glow = keyframes`
  0% { 
    box-shadow: 
      0 0 20px rgba(212, 175, 55, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  50% { 
    box-shadow: 
      0 0 40px rgba(212, 175, 55, 0.6), 
      0 0 60px rgba(139, 69, 19, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  100% { 
    box-shadow: 
      0 0 20px rgba(212, 175, 55, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
`;

// Styled Components
const LauncherButton = styled(Fab)({
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 100%)',
  color: '#FFF8DC',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  animation: `${float} 4s ease-in-out infinite, ${glow} 2.5s ease-in-out infinite`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #DAA520 0%, #A0522D 100%)',
    transform: 'scale(1.08) rotate(-5deg)',
    border: '1px solid rgba(255, 215, 0, 0.5)'
  },
  '&:active': {
    transform: 'scale(0.95)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
  },
  '@media (max-width: 600px)': {
    width: '44px',
    height: '44px',
    bottom: '12px',
    right: '12px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem'
    }
  }
});

function HarveyLauncher() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <LauncherButton
        onClick={() => setChatOpen(true)}
        aria-label="Open Harvey Chat"
      >
        <BusinessCenterIcon />
      </LauncherButton>
      <HarveyChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

export default HarveyLauncher;