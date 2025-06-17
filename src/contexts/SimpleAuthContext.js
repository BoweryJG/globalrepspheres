import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

// Create an authentication context
const AuthContext = createContext();

// Hook for easy access to the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Authentication provider component - local auth only
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      throw error;
    }
  };

  // Function to sign in with email and password
  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  // Function to sign up with email and password
  const signUpWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  // Function to sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  // Check if user is an admin
  const checkAdminStatus = (user) => {
    if (!user) return false;
    
    const adminEmails = [
      'jasonwilliamgolden@gmail.com',
      'Jason@emranatrix.com'
    ];
    
    return adminEmails.includes(user.email);
  };

  // Handle authentication state changes
  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(checkAdminStatus(session.user));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading session:', error);
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes - local only
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(checkAdminStatus(session.user));
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Provide authentication context to children
  const value = {
    user,
    isAdmin,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}