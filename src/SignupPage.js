import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import NavBar from './components/NavBar';
import { useAuth } from './contexts/AuthContext';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    title: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const { 
    user, 
    signUpWithEmail, 
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
      window.location.href = '/';
    }
  }, [user]);

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your first and last name');
      return false;
    }
    if (!formData.email) {
      setError('Please enter your email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const metadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: formData.company,
        title: formData.title,
        phone: formData.phone,
        full_name: `${formData.firstName} ${formData.lastName}`
      };

      await signUpWithEmail(formData.email, formData.password, metadata);
      
      // Show success message
      alert('Account created successfully! Please check your email to verify your account.');
      
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      // OAuth redirect will handle the rest
    } catch (error) {
      setError('Failed to sign up with Google');
      setLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithFacebook();
      // OAuth redirect will handle the rest
    } catch (error) {
      setError('Failed to sign up with Facebook');
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
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
              Join RepSpheres
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'DM Sans', Arial, sans-serif"
              }}
            >
              Start your journey to AI-powered sales intelligence
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
              onClick={handleGoogleSignup}
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
              {loading ? <CircularProgress size={20} /> : 'Sign up with Google'}
            </Button>

            <Button
              variant="outlined"
              startIcon={<Facebook />}
              onClick={handleFacebookSignup}
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
              {loading ? <CircularProgress size={20} /> : 'Sign up with Facebook'}
            </Button>

            <Divider sx={{ my: 2, color: 'rgba(255, 255, 255, 0.5)' }}>
              or create an account
            </Divider>

            {/* Signup Form */}
            <Box component="form" onSubmit={handleEmailSignup}>
              <Stack spacing={3}>
                {/* Name Fields */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    required
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    required
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                    }}
                  />
                </Box>

                {/* Email */}
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  fullWidth
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-input': { color: '#fff' },
                  }}
                />

                {/* Company & Title */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Company"
                    value={formData.company}
                    onChange={handleInputChange('company')}
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                    }}
                  />
                  <TextField
                    label="Job Title"
                    value={formData.title}
                    onChange={handleInputChange('title')}
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                    }}
                  />
                </Box>

                {/* Phone */}
                <TextField
                  label="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-input': { color: '#fff' },
                  }}
                />

                {/* Password Fields */}
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  fullWidth
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
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-input': { color: '#fff' },
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  required
                  fullWidth
                  disabled={loading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 255, 198, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00ffc6' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-input': { color: '#fff' },
                  }}
                />

                {/* Terms Agreement */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': { color: '#00ffc6' }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      I agree to the Terms of Service and Privacy Policy
                    </Typography>
                  }
                  sx={{ alignItems: 'flex-start' }}
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
                  {loading ? <CircularProgress size={20} sx={{ color: '#0a0a0a' }} /> : 'Create Account'}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Already have an account?{' '}
                <Button
                  variant="text"
                  onClick={() => window.location.href = '/login'}
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
                  Sign in here
                </Button>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}