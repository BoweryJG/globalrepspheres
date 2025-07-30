import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import KineticNeedlesPage_Optimized from './KineticNeedlesPage_Optimized';

const AuthPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signInWithGoogle, signInWithFacebook, signInWithEmail, setIntendedDestination } = useAuth();
  
  // Determine if we're in signup mode based on the route
  const isSignupMode = location.pathname === '/signup';

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

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      // Navigation handled by auth context
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      await signInWithFacebook();
      // Navigation handled by auth context
    } catch (error) {
      console.error('Facebook auth error:', error);
    }
  };

  const handleEmailAuth = () => {
    // For now, just navigate to the simple login for email
    navigate('/simple-login');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <KineticNeedlesPage_Optimized />
      <LoginModal 
        isOpen={isModalOpen}
        mode={isSignupMode ? 'signup' : 'login'}
        onClose={handleClose}
        onGoogleAuth={handleGoogleAuth}
        onFacebookAuth={handleFacebookAuth}
        onEmailAuth={handleEmailAuth}
      />
    </div>
  );
};

export default AuthPage;