import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
    setError('');
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

  const handleSocialSignup = async (provider) => {
    setLoading(true);
    setError('');
    
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'facebook') {
        await signInWithFacebook();
      }
      // OAuth redirect will handle the rest
    } catch (error) {
      setError(`Failed to sign up with ${provider}`);
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Starfield Background */}
      <div className="starfield">
        <div className="stars"></div>
      </div>

      <div className="signup-container">
        <div className="signup-modal">
          {/* Power Rail */}
          <div className="power-rail">
            <div className="power-node"></div>
            <div className="power-node"></div>
            <div className="power-node"></div>
            <div className="power-node"></div>
          </div>

          {/* Luxury Screws */}
          <div className="screw screw-tl"></div>
          <div className="screw screw-tr"></div>
          <div className="screw screw-bl"></div>
          <div className="screw screw-br"></div>

          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <defs>
                  <linearGradient id="sphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff00aa" />
                    <stop offset="100%" stopColor="#00ffff" />
                  </linearGradient>
                  <radialGradient id="jewelGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="30%" stopColor="#ff00ff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#00ffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.9" />
                  </radialGradient>
                </defs>
                <circle cx="24" cy="24" r="18" fill="none" stroke="url(#sphereGradient)" strokeWidth="2" opacity="0.8" />
                <circle cx="24" cy="24" r="12" fill="none" stroke="url(#sphereGradient)" strokeWidth="1.5" opacity="0.5" />
                <circle cx="24" cy="24" r="5" fill="url(#jewelGradient)" className="logo-jewel" />
                <circle cx="24" cy="6" r="2" fill="#ff00aa">
                  <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="6s" repeatCount="indefinite"/>
                </circle>
                <circle cx="42" cy="24" r="2" fill="#00ffff">
                  <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="24" cy="42" r="2" fill="#4bd48e">
                  <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="10s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <h2 className="logo-title">RepSpheres</h2>
            <p className="logo-subtitle">Create Account</p>
          </div>

          {/* Social Auth Buttons */}
          <div className="social-auth-section">
            <button 
              className="social-btn google-btn" 
              onClick={() => handleSocialSignup('google')}
              disabled={loading}
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button 
              className="social-btn facebook-btn" 
              onClick={() => handleSocialSignup('facebook')}
              disabled={loading}
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleEmailSignup}>
            {error && <div className="error-message">{error}</div>}
            
            <input
              type="text"
              className="form-input"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              required
              disabled={loading}
            />
            
            <input
              type="text"
              className="form-input"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              required
              disabled={loading}
            />
            
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              disabled={loading}
            />
            
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange('password')}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>
            
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="switch-mode">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="switch-link"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}