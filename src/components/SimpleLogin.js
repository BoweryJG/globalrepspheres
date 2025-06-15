import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Stack, 
  TextField, 
  Typography, 
  Container,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook, Email } from '@mui/icons-material';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';
import { keyframes } from '@mui/system';

// Animation for the gradient background
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function SimpleLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { 
    user, 
    signInWithEmail,
    signUpWithEmail, 
    signInWithGoogle, 
    signInWithFacebook
  } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate('/');
    } catch (error) {
      setError(error.message || `Failed to ${isSignUp ? 'sign up' : 'sign in'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    setError('');
    
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithFacebook();
      }
      navigate('/');
    } catch (error) {
      setError(`Failed to sign in with ${provider}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #16213e)',
            backgroundSize: '400% 400%',
            animation: `${gradientShift} 15s ease infinite`,
            border: '1px solid rgba(0, 255, 198, 0.3)',
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: 'linear-gradient(45deg, #00ffc6, #00a693, #00ffc6)',
              borderRadius: 3,
              opacity: 0.2,
              zIndex: -1,
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: '#fff',
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(135deg, #fff 0%, #00ffc6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to RepSpheres
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {showEmailForm 
                ? (isSignUp ? 'Create your account' : 'Sign in to your account')
                : 'Access your intelligent sales universe'
              }
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                color: '#ff6b6b',
                border: '1px solid rgba(211, 47, 47, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#ff6b6b'
                }
              }}
            >
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
                onClick={() => handleSocialAuth('google')}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Google />}
                sx={{
                  py: 1.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: '#00ffc6',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 255, 198, 0.3)',
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
                onClick={() => handleSocialAuth('facebook')}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Facebook />}
                sx={{
                  py: 1.5,
                  backgroundColor: 'rgba(24, 119, 242, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(24, 119, 242, 0.3)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(24, 119, 242, 0.3)',
                    borderColor: '#1877F2',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(24, 119, 242, 0.3)',
                  }
                }}
              >
                Continue with Facebook
              </Button>

              {/* Divider */}
              <Box sx={{ position: 'relative', my: 2 }}>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#1a1a2e',
                    px: 2,
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  or
                </Typography>
              </Box>

              {/* Email Sign In */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => setShowEmailForm(true)}
                startIcon={<Email />}
                sx={{
                  py: 1.5,
                  borderColor: 'rgba(0, 255, 198, 0.5)',
                  color: '#00ffc6',
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#00ffc6',
                    backgroundColor: 'rgba(0, 255, 198, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 255, 198, 0.2)',
                  }
                }}
              >
                Continue with Email
              </Button>
            </Stack>
          ) : (
            <Box component="form" onSubmit={handleEmailAuth}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoFocus
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 255, 198, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
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
                          sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 255, 198, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
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
                    mt: 1,
                    backgroundColor: '#00ffc6',
                    color: '#0a0a0a',
                    fontSize: '16px',
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#00d9a6',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(0, 255, 198, 0.4)',
                    },
                    '&:disabled': {
                      backgroundColor: 'rgba(0, 255, 198, 0.3)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : (isSignUp ? 'Create Account' : 'Sign In')}
                </Button>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setShowEmailForm(false)}
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      textTransform: 'none',
                      '&:hover': {
                        color: '#00ffc6',
                        backgroundColor: 'transparent',
                      }
                    }}
                  >
                    ← Back
                  </Button>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setIsSignUp(!isSignUp)}
                    sx={{ 
                      color: '#00ffc6',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 255, 198, 0.1)',
                      }
                    }}
                  >
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}