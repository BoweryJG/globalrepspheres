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

// Premium design with sophisticated styling
const ChatContainer = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 25, 40, 0.95) 100%)',
  backdropFilter: 'blur(20px) saturate(200%)',
  WebkitBackdropFilter: 'blur(20px) saturate(200%)',
  border: '1px solid rgba(102, 126, 234, 0.2)',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 80px rgba(102, 126, 234, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.5), rgba(245, 87, 108, 0.5))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0.3,
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(1.25, 1.5),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)',
    animation: 'shimmer 3s infinite',
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
}));

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const BotAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 2px 12px rgba(102, 126, 234, 0.5), 0 0 20px rgba(102, 126, 234, 0.3)',
  width: 28,
  height: 28,
  border: '2px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    animation: `${float} 2s ease-in-out infinite`,
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  boxShadow: '0 2px 8px rgba(245, 87, 108, 0.3)',
  width: 24,
  height: 24,
}));

const MessageBubble = styled(Box)(({ theme, isUser, isWelcome }) => ({
  background: isUser 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(102, 126, 234, 0.15) 100%)'
    : isWelcome 
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(245, 87, 108, 0.08) 100%)'
      : 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${isUser ? 'rgba(102, 126, 234, 0.4)' : isWelcome ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
  borderRadius: isWelcome ? '12px' : '10px',
  padding: isWelcome ? '16px 20px' : '10px 14px',
  color: '#fff',
  fontSize: isWelcome ? '0.8rem' : '0.75rem',
  lineHeight: 1.5,
  maxWidth: '100%',
  position: 'relative',
  boxShadow: isWelcome ? '0 8px 24px rgba(102, 126, 234, 0.2)' : 'none',
  '& strong': {
    color: '#667eea',
    fontWeight: 700,
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(102, 126, 234, 0.2)',
  border: '1px solid rgba(102, 126, 234, 0.3)',
  color: '#667eea',
  padding: '6px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.3)',
    borderColor: '#667eea',
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    opacity: 0.5,
  },
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(1),
  background: 'transparent',
  position: 'relative',
  minHeight: 0,
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.02)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
}));

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: '0.75rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: '#fff',
    padding: 0,
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.08)',
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.5)',
      borderWidth: 1,
    },
  },
  '& .MuiInputBase-input': {
    padding: '6px 10px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)',
      opacity: 1,
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
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    try {
      const bot = new MedicalSalesChatbot();
      setChatbot(bot);
      
      const welcomeMessage = {
        id: Date.now(),
        text: "I've closed $47M in aesthetic deals. Analyzed 2.4 million provider records. Built 15 years of industry dominance.\n\nThey call me Harvey - because I don't just predict the future, I create it.\n\n🎯 Need to crush your quota?\n💎 Want the inside track on territory gold?\n🚀 Ready to leave your competition wondering what hit them?\n\nI'm not your average AI. I'm your unfair advantage.\n\nWhat's your play?",
        sender: 'bot',
        timestamp: new Date(),
        isWelcome: true
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
      const errorMessage = {
        id: Date.now(),
        text: `⚠️ Configuration needed. Check your API key.`,
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
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
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
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
        searchPerformed: response.searchPerformed
      };

      setMessages(prev => [...prev, botMessage]);
      setUserType(response.userType);
      
      if (onNewMessage) {
        onNewMessage();
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Having connection issues. Try again.",
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
        text: "Clean slate. New game.\n\nWhat are we conquering today?",
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
    <ChatContainer elevation={0} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden' 
    }}>
      {/* Compact Header */}
      <HeaderBox>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <BotAvatar>
              <BotIcon sx={{ fontSize: 14 }} />
            </BotAvatar>
            <Box>
              <Typography variant="caption" sx={{ 
                fontWeight: 700, 
                color: '#fff', 
                fontSize: '0.8rem',
                lineHeight: 1,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Harvey
              </Typography>
              {userType && (
                <Typography variant="caption" sx={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  fontSize: '0.65rem',
                  lineHeight: 1
                }}>
                  Industry Dominator
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton 
            onClick={handleClearChat} 
            size="small"
            sx={{ 
              color: 'rgba(255,255,255,0.5)',
              padding: '2px',
              '&:hover': {
                color: 'rgba(255,255,255,0.8)',
              }
            }}>
            <ClearIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </HeaderBox>

      {/* Messages Area - Properly sized */}
      <MessagesContainer ref={messagesContainerRef}>
        {messages.map((message) => (
          <Fade in key={message.id} timeout={300}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 0.75,
                  maxWidth: '85%'
                }}
              >
                {message.sender === 'user' ? (
                  <UserAvatar>
                    <PersonIcon sx={{ fontSize: 12 }} />
                  </UserAvatar>
                ) : (
                  <BotAvatar>
                    <BotIcon sx={{ fontSize: 12 }} />
                  </BotAvatar>
                )}
                <MessageBubble isUser={message.sender === 'user'} isWelcome={message.isWelcome}>
                  {message.searchPerformed && (
                    <Chip
                      icon={<SearchIcon sx={{ fontSize: 10 }} />}
                      label="Intel"
                      size="small"
                      sx={{ 
                        mb: 0.5,
                        height: '16px',
                        fontSize: '0.6rem',
                        background: 'rgba(102, 126, 234, 0.2)',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        color: '#a5b4fc',
                      }}
                    />
                  )}
                  <Typography 
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      color: message.isError ? '#ef4444' : 'inherit'
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
            <Box display="flex" alignItems="center" mb={1}>
              <BotAvatar sx={{ mr: 0.75 }}>
                <BotIcon sx={{ fontSize: 12 }} />
              </BotAvatar>
              <MessageBubble isUser={false}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CircularProgress size={10} sx={{ color: '#667eea' }} />
                  <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Thinking...
                  </Typography>
                </Box>
              </MessageBubble>
            </Box>
          </Fade>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {/* Compact Input Area */}
      <Box sx={{ 
        p: 1, 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <InputField
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            variant="outlined"
            size="small"
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="small"
          >
            <SendIcon sx={{ fontSize: 14 }} />
          </SendButton>
        </Box>
      </Box>
    </ChatContainer>
  );
};

export default MedicalChatbot;