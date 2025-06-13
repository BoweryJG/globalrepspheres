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

      // Fetch subscription from backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      
      try {
        const response = await fetch(`${backendUrl}/api/subscription-status`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubscription({
            ...data,
            isDemo: false,
            user_id: user.id,
            email: user.email
          });
        } else {
          // If backend returns error, default to professional tier for authenticated users
          console.warn('Subscription API returned:', response.status);
          setSubscription({ 
            tier: 'professional', 
            status: 'active',
            isDemo: false,
            user_id: user.id,
            email: user.email
          });
        }
      } catch (error) {
        console.error('Error fetching subscription from backend:', error);
        // Fallback to professional tier for authenticated users
        setSubscription({ 
          tier: 'professional', 
          status: 'active',
          isDemo: false,
          user_id: user.id,
          email: user.email
        });
      }
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

      // Fetch usage from backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      
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

      // Increment usage via backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      
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