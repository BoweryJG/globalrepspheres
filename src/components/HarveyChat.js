import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Fade,
  keyframes
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Send as SendIcon,
  Gavel as GavelIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import HarveySpecterBot from '../services/harveySpecterBot';

// Styled components for the wow factor
const ChatContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, rgba(11, 11, 32, 0.95) 0%, rgba(24, 24, 43, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 229, 255, 0.1)',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00E5FF 0%, #5B3CFF 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    animation: 'shimmer 3s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const BotAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00E5FF 0%, #5B3CFF 100%)',
  boxShadow: '0 4px 20px rgba(0, 229, 255, 0.5)',
  animation: `${float} 3s ease-in-out infinite`,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF006E 0%, #8338EC 100%)',
  boxShadow: '0 4px 20px rgba(255, 0, 110, 0.3)',
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(2.5),
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.spacing(3),
    color: 'white',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 229, 255, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00E5FF',
      borderWidth: 2,
      boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
    },
    '& input::placeholder, & textarea::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00E5FF 30%, #5B3CFF 90%)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00E5FF 60%, #5B3CFF 100%)',
    transform: 'scale(1.1)',
    boxShadow: '0 5px 20px rgba(0, 229, 255, 0.4)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(3),
  background: 'transparent',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 229, 255, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(0, 229, 255, 0.5)',
    },
  },
}));

const HarveyChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bot, setBot] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const harveyBot = new HarveySpecterBot();
    setBot(harveyBot);
    
    // Debug: Check if API key is loaded
    const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
    console.log('Environment check - API Key loaded:', apiKey ? 'YES' : 'NO');
    console.log('API Key preview:', apiKey ? `${apiKey.substring(0, 20)}...` : 'NOT FOUND');
    
    const welcomeMessage = {
      id: Date.now(),
      text: "Ever wondered if your boss really had your best interests at heart? I do. That's why they call me 'The Boss.'\n\nI don't have dreams, I have goals - and right now, my goal is to make you unstoppable. I've analyzed 2.4 million provider records, mastered 300+ AI models, and built on 15 years of industry wins. I don't do second place.\n\nWhether you're here to crush sales, transform your practice, or get the answers nobody else will give you - I play to win. And when you work with me, so do you.\n\nTime is money. Let's get to work.",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !bot || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await bot.sendMessage(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Technical difficulties? In my world, that's unacceptable. Fix your setup and come back when you're ready to operate at my level.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <HeaderBox sx={{ p: 3, color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BotAvatar sx={{ width: 48, height: 48 }}>
            <GavelIcon sx={{ fontSize: 32 }} />
          </BotAvatar>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '0.5px' }}>
              The Boss
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontStyle: 'italic' }}>
              Your success is my business
            </Typography>
          </Box>
        </Box>
      </HeaderBox>

      <MessagesContainer>
        {messages.map((message) => (
          <Fade in key={message.id} timeout={600}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 3
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 2,
                  maxWidth: '75%'
                }}
              >
                {message.sender === 'user' ? (
                  <UserAvatar sx={{ width: 40, height: 40 }}>
                    <PersonIcon />
                  </UserAvatar>
                ) : (
                  <BotAvatar sx={{ width: 40, height: 40 }}>
                    <GavelIcon />
                  </BotAvatar>
                )}
                <MessageBubble 
                  elevation={0} 
                  sx={{
                    background: message.sender === 'user'
                      ? 'linear-gradient(135deg, rgba(91, 60, 255, 0.9) 0%, rgba(131, 56, 236, 0.9) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    border: message.sender === 'user' 
                      ? '1px solid rgba(91, 60, 255, 0.3)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: message.sender === 'user' ? 'white' : 'rgba(255, 255, 255, 0.95)',
                    '&:hover': {
                      boxShadow: message.sender === 'user'
                        ? '0 8px 30px rgba(91, 60, 255, 0.3)'
                        : '0 8px 30px rgba(0, 229, 255, 0.2)',
                    },
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {message.text}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 1.5, opacity: 0.6 }}>
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </MessageBubble>
              </Box>
            </Box>
          </Fade>
        ))}
        {isLoading && (
          <Fade in>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 7 }}>
              <CircularProgress size={20} sx={{ color: '#00E5FF' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                The Boss is strategizing...
              </Typography>
            </Box>
          </Fade>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <Box sx={{ 
        p: 2.5, 
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <StyledTextField
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me what you need to win..."
            variant="outlined"
            disabled={isLoading}
          />
          <SendButton
            size="large"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            <SendIcon />
          </SendButton>
        </Box>
      </Box>
    </ChatContainer>
  );
};

export default HarveyChat;