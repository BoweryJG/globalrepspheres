import React from 'react';
import { UnifiedAuthProvider } from '../unified-auth/src/UnifiedAuthContext';

/**
 * Wrapper component that provides unified auth context
 */
export const UnifiedAuthWrapper = ({ children }) => {
  const hasSupabaseConfig = !!(
    process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY
  );
  
  if (!hasSupabaseConfig) {
    console.warn('UnifiedAuthWrapper: Supabase not configured, rendering without auth');
    return <>{children}</>;
  }
  
  return (
    <UnifiedAuthProvider>
      {children}
    </UnifiedAuthProvider>
  );
};