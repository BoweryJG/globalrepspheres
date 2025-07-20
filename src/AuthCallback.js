import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import supabase from './supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  console.log('🔄 AuthCallback component mounted');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔄 Auth callback started, current URL:', window.location.href);
        
        // Check if we have URL parameters indicating an OAuth callback
        const urlParams = new URLSearchParams(window.location.search);
        const hasCode = urlParams.has('code');
        const hasError = urlParams.has('error');
        
        console.log('🔄 URL params check:', { hasCode, hasError, allParams: Object.fromEntries(urlParams) });
        
        if (hasError) {
          console.error('❌ OAuth error in URL:', urlParams.get('error'));
          navigate('/');
          return;
        }
        
        if (!hasCode) {
          console.log('⚠️ No OAuth code found in URL, redirecting home');
          navigate('/');
          return;
        }
        
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        console.log('🔄 Exchange result:', { data, error });
        
        if (error) {
          console.error('❌ Error during auth callback:', error);
          navigate('/');
          return;
        }
        
        if (data?.session) {
          console.log('✅ Session established:', data.session.user.email);
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