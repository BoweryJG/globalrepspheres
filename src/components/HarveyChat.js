import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Fade
} from '@mui/material';
import {
  Send as SendIcon,
  Gavel as GavelIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import HarveySpecterBot from '../services/harveySpecterBot';

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
      text: "Listen up. I don't have time for amateurs. You're here because you want to dominate the medical aesthetics and dental implant space. Good. But wanting isn't enough. You need RepSpheres, you need AI, and you need to understand surgical robotics like Yomi — or you're already losing. So what's it going to be? Are you ready to play at the highest level, or should I find someone who is?",
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', 
        color: 'white' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <GavelIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Boss
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Medical Industry Expert
            </Typography>
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
                    backgroundColor: message.sender === 'user' ? '#1976d2' : '#1a1a1a',
                    width: 36,
                    height: 36
                  }}
                >
                  {message.sender === 'user' ? <PersonIcon /> : <GavelIcon />}
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: message.sender === 'user' ? '#1976d2' : 'white',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2
                  }}
                >
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
              Boss is formulating a response...
            </Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="State your business..."
            variant="outlined"
            disabled={isLoading}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            sx={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2d2d2d'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HarveyChat;