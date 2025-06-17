import React from 'react';
import OrbContextProvider from './components/OrbContextProvider';
import { AuthProvider } from './contexts/SimpleAuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

export default function AppWrapper({ children }) {
  return (
    <OrbContextProvider>
      <AuthProvider>
        <SubscriptionProvider>
          {children}
        </SubscriptionProvider>
      </AuthProvider>
    </OrbContextProvider>
  );
}