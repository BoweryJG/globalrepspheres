import React from 'react';
import NavBar from './components/NavBar';
import { Box, Button, Typography } from '@mui/material';

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
    try {
      if (typeof supabase !== 'undefined' && supabase.auth) {
        await supabase.auth.signInWithOAuth({ provider: 'google' });
      } else {
        console.warn('Supabase not configured');
      }
    } catch (err) {
      console.error('Error signing in with Google', err);
    }
  };

  return (
    <div>
      <NavBar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Button variant="contained" onClick={handleGoogleSignIn}>
          Sign In with Google
        </Button>
      </Box>
    </div>
  );
}
