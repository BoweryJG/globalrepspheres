// Shared authentication and subscription utilities for RepSpheres apps

// Contexts
export { 
  SubscriptionProvider, 
  useSubscription,
  type SubscriptionData,
  type SubscriptionLimits,
  type SubscriptionUsage,
  type AccessResult,
  type UpgradeMessage,
} from './SubscriptionContext';

// Hooks
export { 
  useAccessControl,
  type AccessControlHook,
} from './useAccessControl';

// Components
export {
  TeaserTable,
  FeatureCard,
  TeaserStats,
  TeaserCTA,
} from './TeaserComponents';

// Re-export from main app for convenience
export { useAuth } from '../contexts/AuthContext';
export { 
  handleAuthenticatedNavigation,
  canAccessModule,
  navigateToModule,
  getCurrentModule,
  isProtectedPage,
} from '../utils/authUtils';
export {
  getMainDomain,
  isOnSubdomain,
  getCurrentDomain,
  storeReturnUrl,
  getAndClearReturnUrl,
  initiateCrossDomainAuth,
  checkCrossDomainAuth,
  handleAuthRedirect,
  setupCrossDomainAuthListener,
  broadcastAuthState,
} from '../utils/crossDomainAuth';