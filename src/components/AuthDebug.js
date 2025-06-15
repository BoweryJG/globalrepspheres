import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Chip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase';

export default function AuthDebug() {
  const { user } = useAuth();
  const [debugInfo, setDebugInfo] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const updateDebugInfo = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const { data: { session } } = await supabase.auth.getSession();
      
      setDebugInfo({
        currentUrl: window.location.href,
        origin: window.location.origin,
        redirectParam: urlParams.get('redirect'),
        intendedDestination: sessionStorage.getItem('intendedDestination'),
        authReturnUrl: sessionStorage.getItem('authReturnUrl'),
        userEmail: user?.email,
        sessionExists: !!session,
        cookieDomain: document.domain,
        localStorage: {
          'supabase.auth.token': !!localStorage.getItem('supabase.auth.token'),
          'repspheres-auth': !!localStorage.getItem('repspheres-auth')
        }
      });
    };

    updateDebugInfo();
    
    // Update on storage changes
    window.addEventListener('storage', updateDebugInfo);
    return () => window.removeEventListener('storage', updateDebugInfo);
  }, [user]);

  const clearAuthData = () => {
    sessionStorage.clear();
    localStorage.removeItem('intendedDestination');
    localStorage.removeItem('authReturnUrl');
    window.location.reload();
  };

  if (!showDebug) {
    return (
      <Button 
        size="small" 
        onClick={() => setShowDebug(true)}
        sx={{ position: 'fixed', bottom: 20, right: 20, opacity: 0.7 }}
      >
        Show Auth Debug
      </Button>
    );
  }

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20, 
        p: 2, 
        maxWidth: 400,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Auth Debug Info
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Chip 
          label={user ? 'Authenticated' : 'Not Authenticated'} 
          color={user ? 'success' : 'error'} 
          size="small"
          sx={{ mb: 1 }}
        />
      </Box>

      <Typography variant="body2" component="pre" sx={{ fontSize: '11px' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button size="small" onClick={clearAuthData} variant="outlined">
          Clear Auth Data
        </Button>
        <Button size="small" onClick={() => setShowDebug(false)}>
          Hide
        </Button>
      </Box>
    </Paper>
  );
}