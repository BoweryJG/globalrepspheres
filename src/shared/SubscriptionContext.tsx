import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import supabase from '../supabase';

// Types
export interface SubscriptionLimits {
  canvas_briefs: number;
  ai_prompts: number;
  call_analyses: number;
  market_procedures: number;
  contacts: number;
  ripples: number;
}

export interface SubscriptionUsage {
  canvas_briefs: number;
  ai_prompts: number;
  call_analyses: number;
  market_procedures: number;
  contacts: number;
  ripples: number;
}

export interface SubscriptionData {
  tier: 'free' | 'explorer' | 'professional' | 'growth' | 'enterprise' | 'elite';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  user_id?: string;
  email?: string;
  isDemo: boolean;
  limits: SubscriptionLimits;
  usage: SubscriptionUsage;
}

export interface AccessResult {
  hasAccess: boolean;
  reason?: 'authentication_required' | 'limit_exceeded' | 'tier_insufficient';
  remaining?: number;
}

export interface UpgradeMessage {
  title: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface SubscriptionContextType {
  subscription: SubscriptionData | null;
  usage: SubscriptionUsage;
  loading: boolean;
  checkLimit: (feature: keyof SubscriptionLimits) => boolean;
  getUsagePercentage: (feature: keyof SubscriptionLimits) => number;
  incrementUsage: (feature: keyof SubscriptionLimits) => Promise<void>;
  shouldShowUpgradePrompt: (feature: keyof SubscriptionLimits) => boolean;
  getUpgradeMessage: (feature: keyof SubscriptionLimits) => UpgradeMessage | null;
  checkFeatureAccess: (feature: keyof SubscriptionLimits) => AccessResult;
  refreshSubscription: () => Promise<void>;
  refreshUsage: () => Promise<void>;
  isDemo: boolean;
  isAuthenticated: boolean;
  tier: string;
}

// Tier limits configuration
const TIER_LIMITS: Record<string, SubscriptionLimits> = {
  free: {
    canvas_briefs: 3,
    ai_prompts: 2,
    call_analyses: 1,
    market_procedures: 20,
    contacts: 5,
    ripples: 3,
  },
  explorer: {
    canvas_briefs: 25,
    ai_prompts: 5,
    call_analyses: 5,
    market_procedures: 100,
    contacts: 10,
    ripples: 25,
  },
  professional: {
    canvas_briefs: 50,
    ai_prompts: 50,
    call_analyses: 10,
    market_procedures: 500,
    contacts: 25,
    ripples: 50,
  },
  growth: {
    canvas_briefs: 100,
    ai_prompts: -1, // unlimited
    call_analyses: 50,
    market_procedures: -1,
    contacts: 50,
    ripples: 100,
  },
  enterprise: {
    canvas_briefs: -1,
    ai_prompts: -1,
    call_analyses: -1,
    market_procedures: -1,
    contacts: 100,
    ripples: -1,
  },
  elite: {
    canvas_briefs: -1,
    ai_prompts: -1,
    call_analyses: -1,
    market_procedures: -1,
    contacts: -1,
    ripples: -1,
  },
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

export interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [usage, setUsage] = useState<SubscriptionUsage>({
    canvas_briefs: 0,
    ai_prompts: 0,
    call_analyses: 0,
    market_procedures: 0,
    contacts: 0,
    ripples: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
    fetchUsage();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchSubscription();
        fetchUsage();
      } else if (event === 'SIGNED_OUT') {
        setSubscription({
          tier: 'free',
          status: 'active',
          isDemo: true,
          limits: TIER_LIMITS.free,
          usage: {
            canvas_briefs: 0,
            ai_prompts: 0,
            call_analyses: 0,
            market_procedures: 0,
            contacts: 0,
            ripples: 0,
          }
        });
        setUsage({
          canvas_briefs: 0,
          ai_prompts: 0,
          call_analyses: 0,
          market_procedures: 0,
          contacts: 0,
          ripples: 0,
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchSubscription = async (): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSubscription({
          tier: 'free',
          status: 'active',
          isDemo: true,
          limits: TIER_LIMITS.free,
          usage: {
            canvas_briefs: 0,
            ai_prompts: 0,
            call_analyses: 0,
            market_procedures: 0,
            contacts: 0,
            ripples: 0,
          }
        });
        setLoading(false);
        return;
      }

      // Get the session token from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubscription({
          tier: 'free',
          status: 'active',
          isDemo: true,
          limits: TIER_LIMITS.free,
          usage: {
            canvas_briefs: 0,
            ai_prompts: 0,
            call_analyses: 0,
            market_procedures: 0,
            contacts: 0,
            ripples: 0,
          }
        });
        setLoading(false);
        return;
      }

      // Fetch subscription from backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 
                        process.env.VITE_BACKEND_URL || 
                        'https://osbackend-zl1h.onrender.com';
      
      try {
        const response = await fetch(`${backendUrl}/api/subscription-status`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const tierLimits = TIER_LIMITS[data.tier] || TIER_LIMITS.free;
          setSubscription({
            ...data,
            isDemo: false,
            user_id: user.id,
            email: user.email,
            limits: tierLimits,
            usage: data.usage || usage
          });
        } else {
          // If backend returns error, default to professional tier for authenticated users
          console.warn('Subscription API returned:', response.status);
          const tierLimits = TIER_LIMITS.professional;
          setSubscription({ 
            tier: 'professional', 
            status: 'active',
            isDemo: false,
            user_id: user.id,
            email: user.email,
            limits: tierLimits,
            usage
          });
        }
      } catch (error) {
        console.error('Error fetching subscription from backend:', error);
        // Fallback to professional tier for authenticated users
        const tierLimits = TIER_LIMITS.professional;
        setSubscription({ 
          tier: 'professional', 
          status: 'active',
          isDemo: false,
          user_id: user.id,
          email: user.email,
          limits: tierLimits,
          usage
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({
        tier: 'free',
        status: 'active',
        isDemo: true,
        limits: TIER_LIMITS.free,
        usage
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async (): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUsage({
          canvas_briefs: 0,
          ai_prompts: 0,
          call_analyses: 0,
          market_procedures: 0,
          contacts: 0,
          ripples: 0,
        });
        return;
      }

      // Fetch usage from backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 
                        process.env.VITE_BACKEND_URL || 
                        'https://osbackend-zl1h.onrender.com';
      
      try {
        const response = await fetch(`${backendUrl}/api/usage`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsage(data);
        } else {
          console.warn('Usage API returned:', response.status);
          // Default usage values
          setUsage({
            canvas_briefs: 0,
            ai_prompts: 0,
            call_analyses: 0,
            market_procedures: 0,
            contacts: 0,
            ripples: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching usage from backend:', error);
        // Default usage values
        setUsage({
          canvas_briefs: 0,
          ai_prompts: 0,
          call_analyses: 0,
          market_procedures: 0,
          contacts: 0,
          ripples: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const checkLimit = (feature: keyof SubscriptionLimits): boolean => {
    if (!subscription) return false;
    
    const limit = subscription.limits[feature];
    if (limit === -1) return true; // Unlimited
    
    const currentUsage = usage[feature] || 0;
    return currentUsage < limit;
  };

  const getUsagePercentage = (feature: keyof SubscriptionLimits): number => {
    if (!subscription) return 0;
    
    const limit = subscription.limits[feature];
    if (limit === -1) return 0; // Unlimited
    
    const currentUsage = usage[feature] || 0;
    return Math.min((currentUsage / limit) * 100, 100);
  };

  const incrementUsage = async (feature: keyof SubscriptionLimits): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Increment usage via backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 
                        process.env.VITE_BACKEND_URL || 
                        'https://osbackend-zl1h.onrender.com';
      
      try {
        const response = await fetch(`${backendUrl}/api/usage/increment`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ feature }),
        });

        if (response.ok) {
          // Refresh usage after successful increment
          await fetchUsage();
        } else {
          console.warn('Increment usage API returned:', response.status);
          // Optimistically update local state
          setUsage(prev => ({
            ...prev,
            [feature]: (prev[feature] || 0) + 1
          }));
        }
      } catch (error) {
        console.error('Error incrementing usage:', error);
        // Optimistically update local state
        setUsage(prev => ({
          ...prev,
          [feature]: (prev[feature] || 0) + 1
        }));
      }
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  };

  const shouldShowUpgradePrompt = (feature: keyof SubscriptionLimits): boolean => {
    const percentage = getUsagePercentage(feature);
    return percentage >= 80 && percentage < 100;
  };

  const getUpgradeMessage = (feature: keyof SubscriptionLimits): UpgradeMessage | null => {
    if (!subscription) return null;
    
    const percentage = getUsagePercentage(feature);
    const limit = subscription.limits[feature];
    const remaining = limit - (usage[feature] || 0);
    
    if (percentage >= 100) {
      return {
        title: "You've reached your limit!",
        message: `Upgrade to continue using ${feature.replace('_', ' ')}`,
        severity: 'error',
      };
    } else if (percentage >= 80) {
      return {
        title: "You're on fire! 🔥",
        message: `Only ${remaining} ${feature.replace('_', ' ')} left this month`,
        severity: 'warning',
      };
    }
    return null;
  };

  const checkFeatureAccess = (feature: keyof SubscriptionLimits): AccessResult => {
    if (!subscription) {
      return { 
        hasAccess: false, 
        reason: 'authentication_required' 
      };
    }
    
    const limit = subscription.limits[feature];
    const currentUsage = usage[feature] || 0;
    
    if (limit === -1) {
      return { hasAccess: true };
    }
    
    if (currentUsage >= limit) {
      return { 
        hasAccess: false, 
        reason: 'limit_exceeded',
        remaining: 0
      };
    }
    
    return { 
      hasAccess: true, 
      remaining: limit - currentUsage 
    };
  };

  const value: SubscriptionContextType = {
    subscription,
    usage,
    loading,
    checkLimit,
    getUsagePercentage,
    incrementUsage,
    shouldShowUpgradePrompt,
    getUpgradeMessage,
    checkFeatureAccess,
    refreshSubscription: fetchSubscription,
    refreshUsage: fetchUsage,
    isDemo: subscription?.isDemo ?? true,
    isAuthenticated: !!subscription?.user_id,
    tier: subscription?.tier || 'free',
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;