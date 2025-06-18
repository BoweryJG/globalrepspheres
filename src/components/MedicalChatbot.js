import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  Button,
  Fade,
  Container,
  keyframes
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Clear as ClearIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import MedicalSalesChatbot from '../services/chatbotService';

// Styled components for the wow factor - SMALLER SIZES
const ChatContainer = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(11, 11, 32, 0.95) 0%, rgba(24, 24, 43, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 229, 255, 0.2)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 50px rgba(0, 229, 255, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #00E5FF, #5B3CFF, #00E5FF)',
    borderRadius: theme.spacing(2),
    opacity: 0.3,
    animation: 'pulse 4s ease-in-out infinite',
    zIndex: -1,
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.3 },
    '50%': { opacity: 0.5 },
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00E5FF 0%, #5B3CFF 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(1.5, 2),
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
  50% { transform: translateY(-5px); }
`;

const BotAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00E5FF 0%, #5B3CFF 100%)',
  boxShadow: '0 2px 10px rgba(0, 229, 255, 0.5)',
  animation: `${float} 3s ease-in-out infinite`,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF006E 0%, #8338EC 100%)',
  boxShadow: '0 2px 10px rgba(255, 0, 110, 0.3)',
}));

const MessageBubble = styled(Paper)(({ theme, isUser }) => ({
  background: isUser 
    ? 'linear-gradient(135deg, rgba(91, 60, 255, 0.9) 0%, rgba(131, 56, 236, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${isUser ? 'rgba(91, 60, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  color: '#fff',
  maxWidth: '100%',
  wordBreak: 'break-word',
  fontSize: '0.8rem',
  lineHeight: 1.5,
  boxShadow: isUser 
    ? '0 4px 15px rgba(91, 60, 255, 0.2)' 
    : '0 4px 15px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    [isUser ? 'right' : 'left']: -8,
    top: '50%',
    transform: 'translateY(-50%)',
    borderStyle: 'solid',
    borderWidth: isUser ? '8px 0 8px 8px' : '8px 8px 8px 0',
    borderColor: isUser 
      ? `transparent transparent transparent rgba(91, 60, 255, 0.9)`
      : `transparent rgba(255, 255, 255, 0.1) transparent transparent`,
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00E5FF 0%, #5B3CFF 100%)',
  color: '#fff',
  padding: '8px',
  '&:hover': {
    background: 'linear-gradient(135deg, #5B3CFF 0%, #00E5FF 100%)',
    transform: 'scale(1.1)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(1.5),
  background: 'transparent',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 229, 255, 0.3)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(0, 229, 255, 0.5)',
    },
  },
}));

const MedicalChatbot = ({ isEmbedded = false, onNewMessage }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const [chatbot, setChatbot] = useState(null);
  const messagesEndRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    try {
      const bot = new MedicalSalesChatbot();
      setChatbot(bot);
      
      const welcomeMessage = {
        id: Date.now(),
        text: "Ever wondered if your boss really had your best interests at heart? I do. That's why they call me 'The Boss.'\n\nI don't have dreams, I have goals - and right now, my goal is to make you unstoppable. I've analyzed 2.4 million provider records, mastered 300+ AI models, and built on 15 years of industry wins. I don't do second place.\n\nWhether you're here to crush sales, transform your practice, or get the answers nobody else will give you - I play to win. And when you work with me, so do you.\n\nTime is money. Let's get to work.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
      const errorMessage = {
        id: Date.now(),
        text: `⚠️ The chatbot is not properly configured. Please ensure the OpenRouter API key is set in the .env file.\n\nTo fix this:\n1. Check that your .env file contains: REACT_APP_OPENROUTER_API_KEY=your_key_here\n2. Stop the server (Ctrl+C)\n3. Run 'npm start' again\n\nCurrent API key status: ${process.env.REACT_APP_OPENROUTER_API_KEY ? 'Key is present but may be invalid' : 'Key is missing'}`,
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages([errorMessage]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'SALES_REP':
        return 'primary';
      case 'PHYSICIAN':
        return 'secondary';
      case 'PATIENT':
        return 'success';
      default:
        return 'default';
    }
  };

  const getUserTypeLabel = (type) => {
    switch (type) {
      case 'SALES_REP':
        return 'Sales Pro';
      case 'PHYSICIAN':
        return 'Medical Pro';
      case 'PATIENT':
        return 'Patient';
      default:
        return 'User';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatbot || isLoading) return;

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
      const response = await chatbot.processMessage(inputMessage, 'user123');
      
      if (response.searchPerformed) {
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 2000);
      }

      const botMessage = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
        searchPerformed: response.searchPerformed
      };

      setMessages(prev => [...prev, botMessage]);
      setUserType(response.userType);
      
      // Notify parent about new message
      if (onNewMessage) {
        onNewMessage();
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (chatbot) {
      chatbot.clearConversation();
      setMessages([{
        id: Date.now(),
        text: "Slate wiped clean. New game, new rules. What's your play?",
        sender: 'bot',
        timestamp: new Date()
      }]);
      setUserType(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth={isEmbedded ? false : "md"} sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: isEmbedded ? 0 : 2, px: isEmbedded ? 0 : 2 }}>
      <ChatContainer elevation={isEmbedded ? 0 : 3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <HeaderBox>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BotAvatar sx={{ width: 32, height: 32 }}>
                <BotIcon sx={{ fontSize: 18 }} />
              </BotAvatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', lineHeight: 1.2 }}>
                  The Boss
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.65rem', fontStyle: 'italic' }}>
                  Your success is my business
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {userType && (
                <Chip
                  label={getUserTypeLabel(userType)}
                  size="small"
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontSize: '0.65rem',
                    height: '20px',
                    fontWeight: 600,
                    letterSpacing: '0.3px'
                  }}
                />
              )}
              {!isEmbedded && (
                <IconButton 
                  onClick={handleClearChat} 
                  size="small"
                  sx={{ 
                    color: 'white',
                    padding: '4px',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}>
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
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
                  mb: 1.5
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: 1,
                    maxWidth: '85%'
                  }}
                >
                  {message.sender === 'user' ? (
                    <UserAvatar sx={{ width: 24, height: 24 }}>
                      <PersonIcon sx={{ fontSize: 14 }} />
                    </UserAvatar>
                  ) : (
                    <BotAvatar sx={{ width: 24, height: 24 }}>
                      <BotIcon sx={{ fontSize: 14 }} />
                    </BotAvatar>
                  )}
                  <MessageBubble elevation={0} isUser={message.sender === 'user'}>
                    {message.searchPerformed && (
                      <Chip
                        icon={<SearchIcon sx={{ fontSize: 12 }} />}
                        label="Intel gathered"
                        size="small"
                        sx={{ 
                          mb: 1,
                          background: 'rgba(0, 229, 255, 0.2)',
                          border: '1px solid rgba(0, 229, 255, 0.4)',
                          color: '#00E5FF',
                          fontSize: '0.65rem',
                          height: '18px',
                          '& .MuiChip-icon': {
                            color: '#00E5FF'
                          }
                        }}
                      />
                    )}
                    <Typography 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.8rem',
                        lineHeight: 1.5,
                        color: message.isError ? '#ff6b6b' : 'inherit'
                      }}
                    >
                      {message.text}
                    </Typography>
                  </MessageBubble>
                </Box>
              </Box>
            </Fade>
          ))}
          {isLoading && (
            <Fade in timeout={300}>
              <Box display="flex" alignItems="center" mb={1.5}>
                <BotAvatar sx={{ width: 24, height: 24, mr: 1 }}>
                  <BotIcon sx={{ fontSize: 14 }} />
                </BotAvatar>
                <MessageBubble elevation={0} isUser={false}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={14} sx={{ color: '#00E5FF' }} />
                    <Typography 
                      sx={{ 
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        animation: 'typing 1.4s steps(3, end) infinite',
                      }}
                    >
                      Processing...
                    </Typography>
                  </Box>
                </MessageBubble>
              </Box>
            </Fade>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ p: 1.5, position: 'relative' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What's your next move?"
              disabled={isLoading}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.8rem',
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 229, 255, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00E5FF',
                    borderWidth: 1,
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                },
              }}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="small"
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </SendButton>
          </Box>
          {isSearching && (
            <Box sx={{ 
              position: 'absolute', 
              top: -30, 
              left: '50%', 
              transform: 'translateX(-50%)',
              background: 'rgba(0, 229, 255, 0.2)',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <SearchIcon sx={{ fontSize: 14, color: '#00E5FF' }} />
              <Typography sx={{ fontSize: '0.7rem', color: '#00E5FF' }}>
                Gathering intel...
              </Typography>
            </Box>
          )}
        </Box>
      </ChatContainer>
    </Container>
  );
};

export default MedicalChatbot;