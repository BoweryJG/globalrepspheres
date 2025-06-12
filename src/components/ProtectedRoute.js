import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * ProtectedRoute component that ensures user is authenticated before accessing content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} props.redirectPath - Path to redirect to after login (optional)
 * @param {string} props.loginMessage - Custom message to show when redirecting to login (optional)
 */
export default function ProtectedRoute({ 
  children, 
  redirectPath, 
  loginMessage = 'Please sign in to access this content' 
}) {
  const { user, loading, setIntendedDestination } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Store intended destination for after login
      const intendedPath = redirectPath || window.location.pathname + window.location.search;
      setIntendedDestination(intendedPath);
      
      // Redirect to login with intended destination as URL param
      const encodedPath = encodeURIComponent(intendedPath);
      window.location.href = `/login?redirect=${encodedPath}`;
    }
  }, [user, loading, redirectPath, setIntendedDestination]);

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress sx={{ color: '#00ffc6' }} />
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Show loading state while redirecting to login
  if (!user) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress sx={{ color: '#00ffc6' }} />
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {loginMessage}
        </Typography>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
          Redirecting to login...
        </Typography>
      </Box>
    );
  }

  // User is authenticated, render the protected content
  return children;
}

/**
 * Hook to protect individual functions or actions
 * @param {string} redirectPath - Path to redirect to after login (optional)
 * @returns {Function} Function that returns true if user is authenticated, false otherwise
 */
export function useAuthRequired(redirectPath) {
  const { user, setIntendedDestination } = useAuth();

  return () => {
    if (!user) {
      // Store intended destination
      const intendedPath = redirectPath || window.location.pathname + window.location.search;
      setIntendedDestination(intendedPath);
      
      // Redirect to login
      const encodedPath = encodeURIComponent(intendedPath);
      window.location.href = `/login?redirect=${encodedPath}`;
      return false;
    }
    return true;
  };
}

/**
 * Higher-order component to wrap components that require authentication
 * @param {React.Component} WrappedComponent - Component to protect
 * @param {Object} options - Options for protection
 * @returns {React.Component} Protected component
 */
export function withAuthRequired(WrappedComponent, options = {}) {
  return function AuthRequiredComponent(props) {
    return (
      <ProtectedRoute 
        redirectPath={options.redirectPath}
        loginMessage={options.loginMessage}
      >
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}