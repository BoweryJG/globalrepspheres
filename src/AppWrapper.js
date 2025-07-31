import React, { useEffect } from 'react';
import OrbContextProvider from './components/OrbContextProvider';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { UnifiedAuthWrapper } from './auth/UnifiedAuthWrapper';
import { initializeUnifiedAuth } from './auth/initializeUnifiedAuth';

export default function AppWrapper({ children }) {
  // Initialize unified auth on mount
  useEffect(() => {
    initializeUnifiedAuth();
  }, []);

  return (
    <OrbContextProvider>
      <UnifiedAuthWrapper>
        <AuthProvider>
          <SubscriptionProvider>
            {children}
          </SubscriptionProvider>
        </AuthProvider>
      </UnifiedAuthWrapper>
    </OrbContextProvider>
  );
}