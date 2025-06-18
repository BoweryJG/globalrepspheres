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
  width: 48,
  height: 48,
  background: 'linear-gradient(135deg, #667eea 0%, #f5576c 100%)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #f5576c 0%, #667eea 100%)',
    transform: 'scale(1.15) rotate(5deg)',
    border: '2px solid rgba(102, 126, 234, 0.5)',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.5), 0 0 40px rgba(102, 126, 234, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    background: 'linear-gradient(135deg, #667eea 0%, #f5576c 100%)',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: -1,
    animation: 'ripple 2.5s ease-out infinite'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(245, 87, 108, 0.4))',
    animation: 'rotate 3s linear infinite',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    padding: '1px',
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1)',
      opacity: 0.5
    },
    '100%': {
      transform: 'scale(1.4)',
      opacity: 0
    }
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
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
            bottom: isMobile ? 10 : 70,
            right: isMobile ? '5%' : 16,
            width: isMobile ? '90%' : 280,
            height: isMobile ? '50vh' : 360,
            maxHeight: isMobile ? '50vh' : 360,
            zIndex: 1100, // Lower than navbar (1200)
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
            borderRadius: '12px',
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
              right: 8,
              top: 8,
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
            <AutoAwesomeIcon sx={{ fontSize: 16, color: 'white' }} />
          </Badge>
        </PulsingFab>
      </Zoom>

      {/* Tooltip on first visit */}
      <Zoom in={!isOpen && showTooltip}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 65,
            right: 16,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1.5,
            fontSize: '0.75rem',
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
          🔥 Meet Harvey - Your $47M AI Closer
        </Box>
      </Zoom>
    </>
  );
};

export default ChatbotLauncher;