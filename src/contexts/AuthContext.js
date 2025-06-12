import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

// Create an authentication context
const AuthContext = createContext();

// Hook for easy access to the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Helper functions for managing intended destinations
const setIntendedDestination = (path) => {
  sessionStorage.setItem('intendedDestination', path);
};

const getIntendedDestination = () => {
  const destination = sessionStorage.getItem('intendedDestination');
  sessionStorage.removeItem('intendedDestination');
  return destination;
};

const clearIntendedDestination = () => {
  sessionStorage.removeItem('intendedDestination');
};

// Authentication provider component
export function AuthProvider({ children }) {
  // State for the current user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to sign in with Google
  const signInWithGoogle = async (intendedPath = null) => {
    try {
      if (intendedPath) {
        setIntendedDestination(intendedPath);
      }
      
      // Store the full return URL if we're on a subdomain
      const currentUrl = window.location.href;
      if (currentUrl.includes('crm.repspheres.com') || 
          currentUrl.includes('marketdata.repspheres.com') || 
          currentUrl.includes('canvas.repspheres.com')) {
        sessionStorage.setItem('authReturnUrl', currentUrl);
      }
      
      // Always redirect to main domain for auth callback
      const mainDomain = 'https://globalrepspheres.netlify.app';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${mainDomain}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      throw error;
    }
  };

  // Function to sign in with Facebook
  const signInWithFacebook = async (intendedPath = null) => {
    try {
      if (intendedPath) {
        setIntendedDestination(intendedPath);
      }
      
      // Store the full return URL if we're on a subdomain
      const currentUrl = window.location.href;
      if (currentUrl.includes('crm.repspheres.com') || 
          currentUrl.includes('marketdata.repspheres.com') || 
          currentUrl.includes('canvas.repspheres.com')) {
        sessionStorage.setItem('authReturnUrl', currentUrl);
      }
      
      // Always redirect to main domain for auth callback
      const mainDomain = 'https://globalrepspheres.netlify.app';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${mainDomain}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Facebook:', error.message);
      throw error;
    }
  };

  // Function to sign in with email and password
  const signInWithEmail = async (email, password, intendedPath = null) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      // Handle post-login navigation for email sign-in
      if (intendedPath) {
        setTimeout(() => {
          window.location.href = intendedPath;
        }, 100);
      } else {
        const destination = getIntendedDestination();
        if (destination) {
          setTimeout(() => {
            window.location.href = destination;
          }, 100);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error signing in with email:', error.message);
      throw error;
    }
  };

  // Function to sign up with email and password
  const signUpWithEmail = async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing up with email:', error.message);
      throw error;
    }
  };

  // Function to reset password
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error.message);
      throw error;
    }
  };

  // Generic function to sign in with any OAuth provider
  const signInWithProvider = async (provider, intendedPath = null) => {
    try {
      if (intendedPath) {
        setIntendedDestination(intendedPath);
      }
      
      // Store the full return URL if we're on a subdomain
      const currentUrl = window.location.href;
      if (currentUrl.includes('crm.repspheres.com') || 
          currentUrl.includes('marketdata.repspheres.com') || 
          currentUrl.includes('canvas.repspheres.com')) {
        sessionStorage.setItem('authReturnUrl', currentUrl);
      }
      
      // Always redirect to main domain for auth callback
      const mainDomain = 'https://globalrepspheres.netlify.app';
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${mainDomain}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error.message);
      throw error;
    }
  };

  // Function to sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Effect to set up auth state listener and handle initial session
  useEffect(() => {
    // Get the current session
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check active session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
      }
      
      // Set up auth state change listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            setUser(currentUser);
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      );
      
      setLoading(false);
      
      // Clean up subscription on unmount
      return () => {
        if (authListener && authListener.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    };

    initializeAuth();
  }, []);

  // Determine admin status whenever user changes
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    const adminEmails = (process.env.REACT_APP_ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    if (adminEmails.includes(user.email)) {
      setIsAdmin(true);
    } else if (user.user_metadata?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  // Values to provide through the context
  const value = {
    user,
    loading,
    isAdmin,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    signInWithProvider,
    signOut,
    setIntendedDestination,
    getIntendedDestination,
    clearIntendedDestination,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
