import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import supabase from './supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle the OAuth callback
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        if (error) {
          console.error('Error during auth callback:', error);
          navigate('/login');
          return;
        }

        // Check for intended destination
        const intendedDestination = sessionStorage.getItem('intendedDestination');
        sessionStorage.removeItem('intendedDestination');

        if (intendedDestination) {
          // If it's an external RepSpheres domain, redirect there
          if (intendedDestination.includes('repspheres.com')) {
            window.location.href = intendedDestination;
          } else {
            navigate(intendedDestination);
          }
        } else {
          // Default redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
      }}
    >
      <CircularProgress size={60} sx={{ color: '#00ffc6', mb: 3 }} />
      <Typography variant="h6" sx={{ color: '#fff' }}>
        Completing sign in...
      </Typography>
    </Box>
  );
}