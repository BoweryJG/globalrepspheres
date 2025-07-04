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

        // Check all possible sources for intended destination
        const getIntendedDestination = () => {
          // Priority 1: Session storage
          const sessionDest = sessionStorage.getItem('intendedDestination');
          if (sessionDest) {
            sessionStorage.removeItem('intendedDestination');
            return sessionDest;
          }
          
          // Priority 2: URL params
          const urlParams = new URLSearchParams(window.location.search);
          const redirectParam = urlParams.get('redirect');
          if (redirectParam) {
            return decodeURIComponent(redirectParam);
          }
          
          // Priority 3: Auth return URL
          const authReturn = sessionStorage.getItem('authReturnUrl');
          if (authReturn) {
            sessionStorage.removeItem('authReturnUrl');
            return authReturn;
          }
          
          // Default
          return '/';
        };

        const destination = getIntendedDestination();
        
        if (destination) {
          // If it's an external RepSpheres domain, redirect there
          if (destination.includes('repspheres.com') && !destination.startsWith('/')) {
            window.location.href = destination;
          } else {
            navigate(destination);
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