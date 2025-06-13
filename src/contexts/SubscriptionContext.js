import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

const TIER_LIMITS = {
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

export function SubscriptionProvider({ children }) {
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState({});
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
        setSubscription({ tier: 'free', status: 'active', isDemo: true });
        setUsage({});
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSubscription({ tier: 'free', status: 'active' });
        setLoading(false);
        return;
      }

      // Get the session token from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubscription({ tier: 'free', status: 'active' });
        setLoading(false);
        return;
      }

      // For now, authenticated users get professional tier access
      // TODO: Integrate with actual subscription backend
      if (user.email) {
        setSubscription({ 
          tier: 'professional', 
          status: 'active',
          isDemo: false,
          user_id: user.id,
          email: user.email
        });
      } else {
        setSubscription({ tier: 'free', status: 'active', isDemo: true });
      }

      // When backend is ready, use this:
      /*
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subscription-status`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      } else {
        // Default to free tier if no subscription
        setSubscription({ tier: 'free', status: 'active' });
      }
      */
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({ tier: 'free', status: 'active', isDemo: true });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUsage({});
        return;
      }

      // For now, return sample usage for authenticated users
      // TODO: Integrate with actual usage backend
      setUsage({
        canvas_briefs: 5,
        ai_prompts: 10,
        call_analyses: 2,
        market_procedures: 50,
        contacts: 15,
        ripples: 20,
      });

      // When backend is ready, use this:
      /*
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/usage`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsage(data);
      }
      */
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const checkLimit = (feature) => {
    if (!subscription) return false;
    
    const limit = TIER_LIMITS[subscription.tier]?.[feature];
    if (limit === -1) return true; // Unlimited
    
    const currentUsage = usage[feature] || 0;
    return currentUsage < limit;
  };

  const getUsagePercentage = (feature) => {
    if (!subscription) return 0;
    
    const limit = TIER_LIMITS[subscription.tier]?.[feature];
    if (limit === -1) return 0; // Unlimited
    
    const currentUsage = usage[feature] || 0;
    return (currentUsage / limit) * 100;
  };

  const incrementUsage = async (feature) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // For now, just increment locally
      // TODO: Integrate with actual usage backend
      setUsage(prev => ({
        ...prev,
        [feature]: (prev[feature] || 0) + 1
      }));

      // When backend is ready, use this:
      /*
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/usage/increment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feature }),
      });
      
      // Refresh usage
      await fetchUsage();
      */
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  };

  const shouldShowUpgradePrompt = (feature) => {
    const percentage = getUsagePercentage(feature);
    return percentage >= 80 && percentage < 100;
  };

  const getUpgradeMessage = (feature) => {
    const percentage = getUsagePercentage(feature);
    const remaining = TIER_LIMITS[subscription?.tier]?.[feature] - (usage[feature] || 0);
    
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

  const value = {
    subscription,
    usage,
    loading,
    checkLimit,
    getUsagePercentage,
    incrementUsage,
    shouldShowUpgradePrompt,
    getUpgradeMessage,
    limits: TIER_LIMITS[subscription?.tier] || TIER_LIMITS.free,
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
}