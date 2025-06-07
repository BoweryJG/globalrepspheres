import React, { useState, useEffect } from 'react';
import {
  Fab,
  Box,
  Slide,
  IconButton,
  Badge,
  Zoom,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import {
  SmartToy as BotIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';
import MedicalChatbot from './MedicalChatbot';

const PulsingFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 1299,
  width: 64,
  height: 64,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'scale(1.1)'
  },
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    opacity: 0.6,
    zIndex: -1,
    animation: 'ripple 2s ease-out infinite'
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1)',
      opacity: 0.6
    },
    '100%': {
      transform: 'scale(1.2)',
      opacity: 0
    }
  }
}));

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Show tooltip after 3 seconds if not already shown
    const timer = setTimeout(() => {
      if (!localStorage.getItem('chatbotTooltipShown')) {
        setShowTooltip(true);
        // Auto-hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem('chatbotTooltipShown', 'true');
        }, 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Chatbot Window */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: isMobile ? 0 : 90,
            right: isMobile ? 0 : 20,
            width: isMobile ? '100%' : 380,
            height: isMobile ? '70vh' : 500,
            maxHeight: isMobile ? '70vh' : 500,
            zIndex: 1100, // Lower than navbar (1200)
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
            borderRadius: isMobile ? '16px 16px 0 0' : '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper'
          }}
        >
          {/* Close/Minimize button - FIXED */}
          <IconButton
            onClick={handleToggle}
            size="small"
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              zIndex: 9999,
              backgroundColor: '#f44336',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: '#d32f2f',
                transform: 'scale(1.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <MedicalChatbot isEmbedded={true} onNewMessage={() => !isOpen && setHasNewMessage(true)} />
          </Box>
        </Box>
      </Slide>

      {/* Floating Action Button */}
      <Zoom in={!isOpen}>
        <PulsingFab
          color="primary"
          aria-label="chat"
          onClick={handleToggle}
        >
          <Badge
            color="error"
            variant="dot"
            invisible={!hasNewMessage}
            sx={{
              '& .MuiBadge-dot': {
                width: 12,
                height: 12,
                border: '2px solid white',
                animation: hasNewMessage ? 'pulse 2s infinite' : 'none'
              },
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 1
                },
                '50%': {
                  transform: 'scale(1.2)',
                  opacity: 0.7
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 1
                }
              }
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 28, color: 'white' }} />
          </Badge>
        </PulsingFab>
      </Zoom>

      {/* Tooltip on first visit */}
      <Zoom in={!isOpen && showTooltip}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 20,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            px: 2.5,
            py: 1.5,
            borderRadius: 2,
            fontSize: '0.925rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            cursor: 'pointer',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -6,
              right: 32,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #764ba2'
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 24px rgba(102, 126, 234, 0.5)'
            },
            transition: 'all 0.3s ease'
          }}
          onClick={() => {
            setShowTooltip(false);
            localStorage.setItem('chatbotTooltipShown', 'true');
            handleToggle();
          }}
        >
          💡 Need help? Ask our AI consultant!
        </Box>
      </Zoom>
    </>
  );
};

export default ChatbotLauncher;