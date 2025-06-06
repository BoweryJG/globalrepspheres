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
  Container
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Clear as ClearIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import MedicalSalesChatbot from '../services/chatbotService';

const MedicalChatbot = ({ isEmbedded = false, onNewMessage }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const [chatbot, setChatbot] = useState(null);
  const messagesEndRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const bot = new MedicalSalesChatbot();
    setChatbot(bot);
    
    const welcomeMessage = {
      id: Date.now(),
      text: "Hello! I'm your elite medical industry consultant. I combine Harvey Specter's strategic brilliance with Warren Buffett's principled wisdom to help you succeed. Whether you're a sales rep looking to close deals, a physician seeking insights, or a patient with questions, I'm here to help. What brings you here today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
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
        return 'Sales Professional';
      case 'PHYSICIAN':
        return 'Medical Professional';
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
        text: "Conversation cleared. How can I help you today?",
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
      <Paper elevation={isEmbedded ? 0 : 3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ p: isEmbedded ? 1.5 : 2, background: isEmbedded ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: isEmbedded ? 1 : 2 }}>
              <BotIcon sx={{ fontSize: isEmbedded ? 24 : 32 }} />
              <Box>
                <Typography variant={isEmbedded ? "body1" : "h6"} fontWeight="bold">
                  Elite Medical Consultant
                </Typography>
                {!isEmbedded && (
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Harvey Specter meets Warren Buffett
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {userType && (
                <Chip
                  label={getUserTypeLabel(userType)}
                  color={getUserTypeColor(userType)}
                  size="small"
                  sx={{ color: 'white' }}
                />
              )}
              {!isEmbedded && (
                <IconButton onClick={handleClearChat} sx={{ color: 'white' }}>
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: 2, backgroundColor: '#f5f5f5' }}>
          {messages.map((message) => (
            <Fade in key={message.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: 1,
                    maxWidth: '70%'
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: message.sender === 'user' ? 'secondary.main' : 'primary.main',
                      width: 36,
                      height: 36
                    }}
                  >
                    {message.sender === 'user' ? <PersonIcon /> : <BotIcon />}
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: message.sender === 'user' ? 'secondary.light' : 'white',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                      position: 'relative'
                    }}
                  >
                    {message.searchPerformed && (
                      <Chip
                        icon={<SearchIcon />}
                        label="Live search performed"
                        size="small"
                        color="info"
                        sx={{ mb: 1 }}
                      />
                    )}
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {message.text}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Fade>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 6 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                {isSearching ? 'Searching for latest information...' : 'Thinking...'}
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about medical procedures, sales strategies, or clinical insights..."
              variant="outlined"
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                },
                '&:disabled': {
                  backgroundColor: 'action.disabledBackground'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Powered by Bowery Creative Agency - Empowering physician campaigns for over 15 years
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MedicalChatbot;