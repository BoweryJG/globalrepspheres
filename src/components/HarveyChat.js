import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  IconButton, 
  Typography,
  Avatar,
  Fade,
  Grow,
  CircularProgress,
  Chip
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(139, 69, 19, 0.5); }
  50% { box-shadow: 0 0 20px rgba(139, 69, 19, 0.8), 0 0 30px rgba(139, 69, 19, 0.6); }
  100% { box-shadow: 0 0 5px rgba(139, 69, 19, 0.5); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  width: '380px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%)',
  border: '1px solid rgba(139, 69, 19, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 80px rgba(139, 69, 19, 0.2)',
  overflow: 'hidden',
  zIndex: 1000,
  borderRadius: '16px',
  '@media (max-width: 600px)': {
    width: '90vw',
    height: '70vh',
    right: '5vw',
    bottom: '70px'
  }
}));

const ChatHeader = styled(Box)({
  padding: '16px 20px',
  background: 'linear-gradient(90deg, #8B4513 0%, #654321 100%)',
  borderBottom: '2px solid rgba(139, 69, 19, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #D4A574, transparent)',
    animation: `${glow} 3s ease-in-out infinite`
  }
});

const MessagesContainer = styled(Box)({
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(139, 69, 19, 0.1)'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(139, 69, 19, 0.5)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(139, 69, 19, 0.7)'
    }
  }
});

const MessageBubble = styled(Box)(({ isUser }) => ({
  display: 'flex',
  gap: '10px',
  flexDirection: isUser ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  animation: `${fadeInUp} 0.3s ease-out`
}));

const Message = styled(Paper)(({ isUser }) => ({
  padding: '12px 16px',
  maxWidth: '70%',
  wordWrap: 'break-word',
  background: isUser 
    ? 'linear-gradient(135deg, #8B4513 0%, #654321 100%)' 
    : 'rgba(30, 30, 30, 0.9)',
  color: '#fff',
  border: `1px solid ${isUser ? 'rgba(139, 69, 19, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  boxShadow: isUser 
    ? '0 2px 8px rgba(139, 69, 19, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.3)'
}));

const StyledAvatar = styled(Avatar)(({ isHarvey }) => ({
  width: 36,
  height: 36,
  background: isHarvey 
    ? 'linear-gradient(135deg, #8B4513 0%, #654321 100%)'
    : 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
  border: `2px solid ${isHarvey ? 'rgba(139, 69, 19, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
  boxShadow: isHarvey ? '0 0 20px rgba(139, 69, 19, 0.5)' : 'none',
  animation: isHarvey ? `${pulse} 3s ease-in-out infinite` : 'none'
}));

const InputContainer = styled(Box)({
  padding: '16px',
  borderTop: '1px solid rgba(139, 69, 19, 0.3)',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.3)'
});

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    fontSize: '0.9rem',
    '& fieldset': {
      borderColor: 'rgba(139, 69, 19, 0.3)',
      borderRadius: '12px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(139, 69, 19, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8B4513'
    }
  },
  '& .MuiInputBase-input': {
    fontSize: '0.9rem'
  }
});

const SendButton = styled(IconButton)({
  background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)',
    transform: 'scale(1.05)'
  },
  '&:disabled': {
    opacity: 0.5
  }
});

const PowerBadge = styled(Chip)({
  position: 'absolute',
  top: '8px',
  right: '60px',
  background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
  color: '#000',
  fontWeight: 'bold',
  fontSize: '0.7rem',
  height: '20px',
  '& .MuiChip-label': {
    padding: '0 8px'
  }
});

// Harvey Persona
const HARVEY_INTRO = {
  text: `I've closed $47M in aesthetic deals. Analyzed 2.4 million provider records. Built 15 years of industry dominance.

They call me Harvey - because I don't just predict the future. I create it.

What's your play?`,
  isUser: false,
  isHarvey: true,
  timestamp: new Date()
};

function HarveyChat({ open, onClose }) {
  const [messages, setMessages] = useState([HARVEY_INTRO]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate Harvey's response
    setTimeout(() => {
      const harveyResponse = {
        text: generateHarveyResponse(input),
        isUser: false,
        isHarvey: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, harveyResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateHarveyResponse = (userInput) => {
    const responses = [
      "Wrong question. The real question is: how fast can you scale? Because if you're not doubling revenue every 18 months in aesthetics, you're already obsolete.",
      "I've seen a thousand reps try that approach. Exactly three succeeded. Here's what they did differently...",
      "Let me tell you something about this industry - relationships are currency, and I'm the Federal Reserve.",
      "That's amateur hour thinking. Winners in medical sales don't follow playbooks. They write them.",
      "You want the truth? Your competition is already three moves ahead. But I know their endgame.",
      "I don't do 'maybe.' I do million-dollar quarters and market domination. Which one interests you?",
      "Every deal has a pressure point. Master surgeons respect one thing: absolute certainty. I'll show you how to project it.",
      "In 15 years, I've never seen that strategy work. But this one? It's made careers."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <Grow in={open}>
      <ChatContainer elevation={24}>
        <ChatHeader>
          <Box display="flex" alignItems="center" gap={1}>
            <BusinessCenterIcon sx={{ color: '#FFD700', fontSize: '1.8rem' }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: '#fff',
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              HARVEY
            </Typography>
          </Box>
          <PowerBadge label="ELITE" size="small" />
          <IconButton onClick={onClose} size="small" sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((message, index) => (
            <MessageBubble key={index} isUser={message.isUser}>
              <StyledAvatar isHarvey={message.isHarvey}>
                {message.isHarvey ? 'H' : 'U'}
              </StyledAvatar>
              <Message isUser={message.isUser}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {message.text}
                </Typography>
              </Message>
            </MessageBubble>
          ))}
          {loading && (
            <MessageBubble isUser={false}>
              <StyledAvatar isHarvey={true}>H</StyledAvatar>
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} sx={{ color: '#8B4513' }} />
                <Typography variant="body2" color="text.secondary">
                  Harvey is thinking...
                </Typography>
              </Box>
            </MessageBubble>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="State your business..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            size="small"
          />
          <SendButton onClick={handleSend} disabled={!input.trim() || loading} size="small">
            <SendIcon fontSize="small" />
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </Grow>
  );
}

export default HarveyChat;