import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AuthModals.css';

const AuthModals = ({ isOpen, onClose, mode: initialMode = 'signup' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithFacebook, signOut } = useAuth();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      });
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        const metadata = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`
        };
        
        await signUpWithEmail(formData.email, formData.password, metadata);
        alert('Account created! Please check your email to verify.');
        onClose();
      } else if (mode === 'login') {
        await signInWithEmail(formData.email, formData.password);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
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
      } else if (provider === 'facebook') {
        await signInWithFacebook();
      }
      // OAuth redirect will handle the rest
    } catch (err) {
      setError(`Failed to sign in with ${provider}`);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      onClose();
    } catch (err) {
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Starfield Background */}
      <div className="starfield">
        <div className="stars"></div>
      </div>

      {/* Modal Overlay */}
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className={`auth-modal ${mode}-modal`} 
          onClick={(e) => e.stopPropagation()}
        >
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

          {/* Close Button */}
          <button className="close-btn" onClick={onClose} aria-label="Close"></button>

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
            <p className="logo-subtitle">
              {mode === 'signup' ? 'Create Account' : mode === 'login' ? 'Welcome Back' : 'Sign Out'}
            </p>
          </div>

          {/* Form Section */}
          {mode === 'logout' ? (
            <div className="logout-content">
              <p className="logout-message">Are you sure you want to sign out?</p>
              <div className="logout-actions">
                <button 
                  className="logout-cancel-btn" 
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  className="logout-confirm-btn" 
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Social Auth Buttons */}
              <div className="social-auth-section">
                <button 
                  className="social-btn google-btn" 
                  onClick={() => handleSocialAuth('google')}
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
                  onClick={() => handleSocialAuth('facebook')}
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

              {/* Email Form */}
              <form className="form-section" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                {mode === 'signup' && (
                  <>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      required
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      required
                    />
                  </>
                )}
                
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
                
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁' : '👁‍🗨'}
                  </button>
                </div>
                
                {mode === 'signup' && (
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    required
                  />
                )}
                
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              {/* Switch Mode */}
              <div className="switch-mode">
                {mode === 'signup' ? (
                  <p>
                    Already have an account?{' '}
                    <button onClick={() => setMode('login')} className="switch-link">
                      Sign in
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <button onClick={() => setMode('signup')} className="switch-link">
                      Sign up
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModals;