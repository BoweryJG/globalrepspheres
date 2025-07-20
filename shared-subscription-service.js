/**
 * Shared Subscription Service for GlobalRepSpheres
 * 
 * This service manages subscription state and synchronization across all modules:
 * - Main App (globalrepspheres)
 * - SphereOsCrM  
 * - canvasheader
 * - market-data-jg
 * 
 * NOTE: This file is currently unused in the application.
 * The working subscription system is in src/contexts/SubscriptionContext.js
 * which properly connects to the osbackend for all subscription functionality.
 */

// NOTE: Imports commented out since this service is not currently used
// If you need to use this service in the future, uncomment these imports:
// import { createClient } from '@supabase/supabase-js';
// import { UNIFIED_PRICING_TIERS, getPriceId, getTierFeatures, canAccessFeature } from './unified-pricing-config.js';

// Initialize Supabase client (commented out since service is unused)
// const supabase = createClient(
//   process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
// );

/*
NOTE: This entire class is commented out since it's not currently used.
The working subscription system is in src/contexts/SubscriptionContext.js

export class SubscriptionService {
  
  // Get user's current subscription across all modules
  static async getUserSubscription(userId) {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('subscription, stripe_customer_id')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (!profile?.subscription) {
        return {
          tier: 'explorer',
          status: 'inactive',
          isActive: false,
          features: getTierFeatures('explorer'),
          modules: {
            canvas: getTierFeatures('explorer', 'canvas'),
            sphereOs: getTierFeatures('explorer', 'sphereOs'),
            marketData: getTierFeatures('explorer', 'marketData')
          }
        };
      }

      const subscription = profile.subscription;
      const isActive = subscription.status === 'active' && 
                      new Date(subscription.endDate) > new Date();

      return {
        tier: subscription.tier,
        status: subscription.status,
        isActive,
        billingCycle: subscription.billingCycle || 'monthly',
        currentPeriodEnd: subscription.endDate,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
        stripeCustomerId: profile.stripe_customer_id,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        features: getTierFeatures(subscription.tier),
        modules: {
          canvas: getTierFeatures(subscription.tier, 'canvas'),
          sphereOs: getTierFeatures(subscription.tier, 'sphereOs'),
          marketData: getTierFeatures(subscription.tier, 'marketData')
        },
        usage: subscription.usage || {}
      };
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      return {
        tier: 'explorer',
        status: 'error',
        isActive: false,
        features: getTierFeatures('explorer'),
        modules: {
          canvas: getTierFeatures('explorer', 'canvas'),
          sphereOs: getTierFeatures('explorer', 'sphereOs'),
          marketData: getTierFeatures('explorer', 'marketData')
        }
      };
    }
  }

  /**
   * Update subscription after Stripe webhook
   */
  static async updateSubscriptionFromStripe(userId, stripeSubscription, stripeCustomerId) {
    try {
      // Map Stripe price ID to tier
      let tier = 'explorer';
      let billingCycle = 'monthly';
      
      const priceId = stripeSubscription.items.data[0].price.id;
      
      // Find matching tier based on price ID
      for (const [tierName, tierConfig] of Object.entries(UNIFIED_PRICING_TIERS)) {
        if (tierConfig.stripeIds.monthly === priceId) {
          tier = tierName;
          billingCycle = 'monthly';
          break;
        } else if (tierConfig.stripeIds.annual === priceId) {
          tier = tierName;
          billingCycle = 'annual';
          break;
        }
      }

      const tierConfig = UNIFIED_PRICING_TIERS[tier];
      
      // Update user profile with unified subscription data
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          stripe_customer_id: stripeCustomerId,
          subscription: {
            tier,
            status: stripeSubscription.status,
            billingCycle,
            startDate: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
            endDate: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
            stripeSubscriptionId: stripeSubscription.id,
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            // Initialize usage tracking for all modules
            usage: {
              canvas: {
                creditsUsed: 0,
                magicLinksUsed: 0,
                scansThisMonth: 0
              },
              sphereOs: {
                callMinutesUsed: 0,
                contactsStored: 0
              },
              marketData: {
                aiQueriesUsed: 0,
                categoriesAccessed: 0,
                exportsGenerated: 0
              }
            },
            // Store feature limits for quick access
            limits: {
              canvas: tierConfig.features.canvas,
              sphereOs: tierConfig.features.sphereOs,
              marketData: tierConfig.features.marketData
            }
          }
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Log subscription change for analytics
      await this.logSubscriptionChange(userId, tier, stripeSubscription.id);
      
      return { success: true, tier, billingCycle };
    } catch (error) {
      console.error('Error updating subscription from Stripe:', error);
      throw error;
    }
  }

  /**
   * Check if user can access a specific feature in a module
   */
  static async checkFeatureAccess(userId, module, feature) {
    try {
      const subscription = await this.getUserSubscription(userId);
      
      if (!subscription.isActive) {
        return { 
          hasAccess: false, 
          reason: 'No active subscription',
          upgradeRequired: true,
          currentTier: subscription.tier
        };
      }

      const moduleFeatures = subscription.modules[module];
      if (!moduleFeatures) {
        return { 
          hasAccess: false, 
          reason: 'Invalid module',
          upgradeRequired: false
        };
      }

      const limit = moduleFeatures[feature];
      const usage = subscription.usage?.[module]?.[feature + 'Used'] || 0;

      // Check limits
      if (limit === false || limit === 0) {
        return { 
          hasAccess: false, 
          reason: `${feature} not available in ${subscription.tier} plan`,
          upgradeRequired: true,
          currentTier: subscription.tier
        };
      }

      if (limit === true || limit === -1 || limit === 'unlimited') {
        return { hasAccess: true };
      }

      if (typeof limit === 'number' && usage >= limit) {
        return { 
          hasAccess: false, 
          reason: `${feature} limit reached (${usage}/${limit})`,
          upgradeRequired: true,
          currentTier: subscription.tier,
          canPurchaseMore: true
        };
      }

      return { 
        hasAccess: true, 
        usage, 
        limit,
        remaining: typeof limit === 'number' ? limit - usage : 'unlimited'
      };
    } catch (error) {
      console.error('Error checking feature access:', error);
      return { 
        hasAccess: false, 
        reason: 'Error checking access',
        upgradeRequired: false
      };
    }
  }

  /**
   * Record usage for a specific feature in a module
   */
  static async recordUsage(userId, module, feature, quantity = 1) {
    try {
      const subscription = await this.getUserSubscription(userId);
      
      if (!subscription.isActive) {
        throw new Error('No active subscription');
      }

      // Update usage in database
      const usageKey = `subscription.usage.${module}.${feature}Used`;
      const currentUsage = subscription.usage?.[module]?.[feature + 'Used'] || 0;
      const newUsage = currentUsage + quantity;

      const { error } = await supabase
        .from('user_profiles')
        .update({
          [`subscription.usage.${module}.${feature}Used`]: newUsage
        })
        .eq('user_id', userId);

      if (error) throw error;

      // Log usage for analytics
      await supabase
        .from('usage_logs')
        .insert({
          user_id: userId,
          module,
          feature,
          quantity,
          timestamp: new Date().toISOString(),
          subscription_tier: subscription.tier
        });

      return { success: true, newUsage };
    } catch (error) {
      console.error('Error recording usage:', error);
      throw error;
    }
  }

  /**
   * Reset monthly usage (called by cron job)
   */
  static async resetMonthlyUsage(userId) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          'subscription.usage': {
            canvas: {
              creditsUsed: 0,
              magicLinksUsed: 0,
              scansThisMonth: 0
            },
            sphereOs: {
              callMinutesUsed: 0
            },
            marketData: {
              aiQueriesUsed: 0,
              exportsGenerated: 0
            }
          }
        })
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error resetting monthly usage:', error);
      throw error;
    }
  }

  /**
   * Log subscription changes for analytics
   */
  static async logSubscriptionChange(userId, newTier, stripeEventId) {
    try {
      await supabase
        .from('subscription_history')
        .insert({
          user_id: userId,
          new_tier: newTier,
          change_type: 'stripe_update',
          stripe_event_id: stripeEventId,
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error logging subscription change:', error);
      // Don't throw - this is not critical
    }
  }

  /**
   * Get subscription analytics for admin dashboard
   */
  static async getSubscriptionAnalytics() {
    try {
      const { data: stats, error } = await supabase
        .from('user_profiles')
        .select('subscription')
        .not('subscription', 'is', null);

      if (error) throw error;

      const analytics = {
        totalSubscribers: stats.length,
        tierBreakdown: {},
        billingBreakdown: { monthly: 0, annual: 0 },
        activeSubscriptions: 0,
        monthlyRevenue: 0,
        annualRevenue: 0
      };

      stats.forEach(profile => {
        const sub = profile.subscription;
        if (!sub) return;

        // Tier breakdown
        analytics.tierBreakdown[sub.tier] = (analytics.tierBreakdown[sub.tier] || 0) + 1;
        
        // Billing breakdown
        analytics.billingBreakdown[sub.billingCycle || 'monthly']++;
        
        // Active subscriptions
        if (sub.status === 'active' && new Date(sub.endDate) > new Date()) {
          analytics.activeSubscriptions++;
          
          // Revenue calculation
          const tierConfig = UNIFIED_PRICING_TIERS[sub.tier];
          if (tierConfig) {
            if (sub.billingCycle === 'annual') {
              analytics.annualRevenue += tierConfig.price.annual;
            } else {
              analytics.monthlyRevenue += tierConfig.price.monthly;
            }
          }
        }
      });

      return analytics;
    } catch (error) {
      console.error('Error getting subscription analytics:', error);
      throw error;
    }
  }
}

// Export convenience functions
export const {
  getUserSubscription,
  updateSubscriptionFromStripe,
  checkFeatureAccess,
  recordUsage,
  resetMonthlyUsage,
  getSubscriptionAnalytics
} = SubscriptionService;

*/

// This file is currently inactive.
// All subscription functionality is handled by src/contexts/SubscriptionContext.js
// which connects to the osbackend for proper subscription management.