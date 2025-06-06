import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MedicalChatbot from './components/MedicalChatbot';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20'
    }
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
});

const ChatbotPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MedicalChatbot />
    </ThemeProvider>
  );
};

export default ChatbotPage;