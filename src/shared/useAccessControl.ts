import { useSubscription } from './SubscriptionContext';

export interface AccessControlHook {
  checkFeatureAccess: (feature: string) => {
    hasAccess: boolean;
    reason?: string;
    remaining?: number;
  };
  trackUsage: (feature: string) => Promise<void>;
  canAccessPremiumContent: () => boolean;
  getDataLimit: (feature: string) => number;
  isAuthenticated: boolean;
  tier: string;
  getRemainingUsage: (feature: string) => number;
  getUsagePercentage: (feature: string) => number;
}

/**
 * Hook for managing feature access control and usage tracking
 * 
 * @example
 * ```tsx
 * const { checkFeatureAccess, trackUsage, canAccessPremiumContent } = useAccessControl();
 * 
 * // Check if user can access a feature
 * const marketDataAccess = checkFeatureAccess('market_procedures');
 * if (!marketDataAccess.hasAccess) {
 *   // Show upgrade prompt or teaser content
 * }
 * 
 * // Track usage when user accesses a feature
 * await trackUsage('market_procedures');
 * ```
 */
export const useAccessControl = (): AccessControlHook => {
  const { 
    subscription, 
    usage, 
    checkLimit, 
    incrementUsage,
    getUsagePercentage,
    checkFeatureAccess,
    isAuthenticated,
    tier 
  } = useSubscription();

  /**
   * Check if user has access to a specific feature
   */
  const checkAccess = (feature: string) => {
    return checkFeatureAccess(feature as any);
  };

  /**
   * Track usage for a specific feature
   */
  const trackUsage = async (feature: string): Promise<void> => {
    try {
      await incrementUsage(feature as any);
    } catch (error) {
      console.error(`Error tracking usage for ${feature}:`, error);
    }
  };

  /**
   * Check if user can access premium content (authenticated + paid tier)
   */
  const canAccessPremiumContent = (): boolean => {
    if (!subscription || !isAuthenticated) return false;
    return ['professional', 'growth', 'enterprise', 'elite'].includes(tier);
  };

  /**
   * Get the data limit for a specific feature
   */
  const getDataLimit = (feature: string): number => {
    if (!subscription) return 0;
    const limit = subscription.limits[feature as keyof typeof subscription.limits];
    return limit === -1 ? Infinity : limit;
  };

  /**
   * Get remaining usage for a specific feature
   */
  const getRemainingUsage = (feature: string): number => {
    if (!subscription) return 0;
    
    const limit = subscription.limits[feature as keyof typeof subscription.limits];
    if (limit === -1) return Infinity;
    
    const currentUsage = usage[feature as keyof typeof usage] || 0;
    return Math.max(0, limit - currentUsage);
  };

  /**
   * Get usage percentage for a specific feature
   */
  const getUsagePercent = (feature: string): number => {
    return getUsagePercentage(feature as any);
  };

  return {
    checkFeatureAccess: checkAccess,
    trackUsage,
    canAccessPremiumContent,
    getDataLimit,
    isAuthenticated,
    tier,
    getRemainingUsage,
    getUsagePercentage: getUsagePercent,
  };
};

export default useAccessControl;