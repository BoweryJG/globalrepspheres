import React, { useState } from 'react';
import {
  Fab,
  Box,
  Slide,
  IconButton,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Gavel as GavelIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import HarveyChat from './HarveyChat';

const HarveyChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: isMobile ? 0 : 90,
            right: isMobile ? 0 : 20,
            width: isMobile ? '100%' : 400,
            height: isMobile ? '80vh' : 600,
            maxHeight: isMobile ? '80vh' : 600,
            zIndex: 1300,
            boxShadow: '0 0 30px rgba(0,0,0,0.3)',
            borderRadius: isMobile ? '16px 16px 0 0' : '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper'
          }}
        >
          <IconButton
            onClick={handleToggle}
            size="small"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 10,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <HarveyChat />
        </Box>
      </Slide>

      <Zoom in={!isOpen}>
        <Fab
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1299,
            backgroundColor: '#1a1a1a',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2d2d2d',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
          onClick={handleToggle}
        >
          <GavelIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default HarveyChatLauncher;