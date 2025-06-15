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
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import NavBar from './components/NavBar';
import { useAuth } from './contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { 
    user, 
    signInWithEmail, 
    signInWithGoogle, 
    signInWithFacebook,
    setIntendedDestination 
  } = useAuth();

  // Check for intended destination in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect');
    if (redirectTo) {
      setIntendedDestination(decodeURIComponent(redirectTo));
    }
  }, [setIntendedDestination]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Simple redirect logic
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
      
      if (redirect) {
        // Decode and validate redirect URL
        const decodedUrl = decodeURIComponent(redirect);
        if (decodedUrl.includes('repspheres.com') || decodedUrl.startsWith('/')) {
          // Small delay to ensure auth is fully loaded
          setTimeout(() => {
            window.location.href = decodedUrl;
          }, 500);
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
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
      // Successful login - AuthContext will handle redirection
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
      // OAuth redirect will handle the rest
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
      // OAuth redirect will handle the rest
    } catch (error) {
      setError('Failed to sign in with Facebook');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              Welcome Back
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'DM Sans', Arial, sans-serif"
              }}
            >
              Sign in to access your RepSpheres account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            {/* OAuth Buttons */}
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              disabled={loading}
              fullWidth
              sx={{
                py: 1.5,
                borderColor: 'rgba(0, 255, 198, 0.3)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#00ffc6',
                  backgroundColor: 'rgba(0, 255, 198, 0.1)'
                }
              }}
            >
              {loading ? <CircularProgress size={20} /> : 'Continue with Google'}
            </Button>

            <Button
              variant="outlined"
              startIcon={<Facebook />}
              onClick={handleFacebookLogin}
              disabled={loading}
              fullWidth
              sx={{
                py: 1.5,
                borderColor: 'rgba(0, 255, 198, 0.3)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#00ffc6',
                  backgroundColor: 'rgba(0, 255, 198, 0.1)'
                }
              }}
            >
              {loading ? <CircularProgress size={20} /> : 'Continue with Facebook'}
            </Button>

            <Divider sx={{ my: 2, color: 'rgba(255, 255, 255, 0.5)' }}>
              or continue with email
            </Divider>

            {/* Email Form */}
            <Box component="form" onSubmit={handleEmailLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
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
                    '& .MuiOutlinedInput-input': {
                      color: '#fff',
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  disabled={loading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
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
                    '& .MuiOutlinedInput-input': {
                      color: '#fff',
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth
                  sx={{
                    py: 1.5,
                    mt: 2,
                    background: 'linear-gradient(135deg, #00d4ff 0%, #00ffc6 100%)',
                    color: '#0a0a0a',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00b8e6 0%, #00e6b3 100%)',
                    },
                    '&:disabled': {
                      opacity: 0.6,
                    }
                  }}
                >
                  {loading ? <CircularProgress size={20} sx={{ color: '#0a0a0a' }} /> : 'Sign In'}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Don't have an account?{' '}
                <Button
                  variant="text"
                  component={Link}
                  to="/signup"
                  sx={{
                    color: '#00ffc6',
                    textTransform: 'none',
                    fontWeight: 600,
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#00d4ff'
                    }
                  }}
                >
                  Sign up here
                </Button>
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1 }}
              >
                <Button
                  variant="text"
                  onClick={() => alert('Password reset functionality coming soon!')}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                >
                  Forgot your password?
                </Button>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}