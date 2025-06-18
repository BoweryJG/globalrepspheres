import React, { useState } from 'react';
import { Fab } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HarveyChat from './HarveyChat';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(139, 69, 19, 0.5); }
  50% { box-shadow: 0 0 40px rgba(139, 69, 19, 0.8), 0 0 60px rgba(139, 69, 19, 0.4); }
  100% { box-shadow: 0 0 20px rgba(139, 69, 19, 0.5); }
`;

// Styled Components
const LauncherButton = styled(Fab)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '56px',
  height: '56px',
  background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
  color: '#FFD700',
  animation: `${float} 3s ease-in-out infinite, ${glow} 2s ease-in-out infinite`,
  '&:hover': {
    background: 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)',
    transform: 'scale(1.1)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.8rem'
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