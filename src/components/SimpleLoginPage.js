import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Stack, 
  TextField, 
  Typography, 
  Divider, 
  Container,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook, Email } from '@mui/icons-material';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { 
    user, 
    signInWithEmail, 
    signInWithGoogle, 
    signInWithFacebook
  } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmail(email, password);
    } catch (error) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithFacebook();
    } catch (error) {
      setError('Failed to sign in with Facebook');
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            backgroundColor: 'rgba(24, 24, 43, 0.95)',
            border: '1px solid rgba(0, 255, 198, 0.2)',
            borderRadius: 3,
            backdropFilter: 'blur(20px)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: '#fff',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                mb: 1
              }}
            >
              Welcome to RepSpheres
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Inter', Arial, sans-serif"
              }}
            >
              Sign in to access your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!showEmailForm ? (
            <Stack spacing={2}>
              {/* Google Sign In */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleGoogleLogin}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Google />}
                sx={{
                  py: 1.5,
                  backgroundColor: '#4285F4',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#357ae8',
                  }
                }}
              >
                Continue with Google
              </Button>

              {/* Facebook Sign In */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleFacebookLogin}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Facebook />}
                sx={{
                  py: 1.5,
                  backgroundColor: '#1877F2',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#166FE5',
                  }
                }}
              >
                Continue with Facebook
              </Button>

              {/* Email Sign In */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => setShowEmailForm(true)}
                startIcon={<Email />}
                sx={{
                  py: 1.5,
                  borderColor: '#00ffc6',
                  color: '#00ffc6',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#00d9a6',
                    backgroundColor: 'rgba(0, 255, 198, 0.1)',
                  }
                }}
              >
                Continue with Email
              </Button>
            </Stack>
          ) : (
            <Box component="form" onSubmit={handleEmailLogin}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#00ffc6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#00ffc6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    backgroundColor: '#00ffc6',
                    color: '#0a0a0a',
                    fontSize: '16px',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#00d9a6',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  onClick={() => setShowEmailForm(false)}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Back to other options
                </Button>
              </Stack>
            </Box>
          )}

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                style={{ 
                  color: '#00ffc6', 
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}