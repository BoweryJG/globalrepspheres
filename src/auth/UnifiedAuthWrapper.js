import React from 'react';

/**
 * Wrapper component that provides unified auth context
 * For now, this is a simple passthrough since the TypeScript
 * unified-auth package has build issues. The actual auth
 * is handled by AuthProvider in AppWrapper.
 */
export const UnifiedAuthWrapper = ({ children }) => {
  const hasSupabaseConfig = !!(
    process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY
  );
  
  if (!hasSupabaseConfig) {
    console.warn('UnifiedAuthWrapper: Supabase not configured, rendering without auth');
  }
  
  // Pass through children - auth is handled by AuthProvider
  return <>{children}</>;
};