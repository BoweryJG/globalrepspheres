/**
 * Unified Pricing Configuration for GlobalRepSpheres
 * 
 * This configuration is used across all three modules:
 * - Main App (globalrepspheres)
 * - SphereOsCrM  
 * - canvasheader
 * - market-data-jg
 * 
 * All modules should reference these same Stripe price IDs and tier structures
 */

export const UNIFIED_PRICING_TIERS = {
  explorer: {
    name: 'Explorer',
    displayName: 'Explorer',
    price: {
      monthly: 49,
      annual: 490
    },
    stripeIds: {
      monthly: process.env.STRIPE_EXPLORER_MONTHLY_PRICE_ID || 'price_1RRuqbGRiAPUZqWu3f91wnNx',
      annual: process.env.STRIPE_EXPLORER_ANNUAL_PRICE_ID || 'price_1RWMXEGRiAPUZqWuPwcgrovN'
    },
    features: {
      // Core features available across all modules
      core: {
        users: 1,
        support: 'email',
        mobileApp: true
      },
      // Canvas Header specific
      canvas: {
        aiCredits: 50,
        magicLinks: 5,
        canvasScansPerMonth: 50,
        marketInsightsAccess: true,
        crmContactsMax: 100,
        aiResearchReports: 10,
        exportEnabled: true,
        teamMembers: 1
      },
      // SphereOS CRM specific  
      sphereOs: {
        callMinutes: 100,
        contacts: 500,
        analytics: 'basic',
        integrations: 'basic'
      },
      // Market Data specific
      marketData: {
        aiQueries: 50,
        categories: 10,
        automation: false,
        dataExports: 5,
        realTimeAlerts: false
      }
    }
  },

  professional: {
    name: 'Professional',
    displayName: 'Professional',
    price: {
      monthly: 149,
      annual: 1490
    },
    stripeIds: {
      monthly: process.env.STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID || 'price_1RRurNGRiAPUZqWuklICsE4P',
      annual: process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID || 'price_1RWMWjGRiAPUZqWu6YBZY7o4'
    },
    features: {
      core: {
        users: 2,
        support: 'priority',
        mobileApp: true
      },
      canvas: {
        aiCredits: 200,
        magicLinks: 20,
        canvasScansPerMonth: 200,
        marketInsightsAccess: true,
        crmContactsMax: 1000,
        aiResearchReports: 50,
        exportEnabled: true,
        teamMembers: 2
      },
      sphereOs: {
        callMinutes: 500,
        contacts: 2000,
        analytics: 'advanced',
        integrations: 'standard',
        callAnalysis: true
      },
      marketData: {
        aiQueries: 200,
        categories: 50,
        automation: true,
        dataExports: 50,
        realTimeAlerts: true
      }
    }
  },

  growth: {
    name: 'Growth',
    displayName: 'Growth',
    price: {
      monthly: 349,
      annual: 3490
    },
    stripeIds: {
      monthly: process.env.STRIPE_GROWTH_MONTHLY_PRICE_ID || 'price_1RWMW3GRiAPUZqWuoTA0eLUC',
      annual: process.env.STRIPE_GROWTH_ANNUAL_PRICE_ID || 'price_1RRus5GRiAPUZqWup3jk1S8U'
    },
    features: {
      core: {
        users: 5,
        support: 'priority',
        mobileApp: true
      },
      canvas: {
        aiCredits: 500,
        magicLinks: 50,
        canvasScansPerMonth: 500,
        marketInsightsAccess: true,
        crmContactsMax: 5000,
        aiResearchReports: 150,
        exportEnabled: true,
        teamMembers: 5
      },
      sphereOs: {
        callMinutes: 1500,
        contacts: 10000,
        analytics: 'advanced',
        integrations: 'premium',
        callAnalysis: true,
        automation: true
      },
      marketData: {
        aiQueries: 500,
        categories: 'unlimited',
        automation: true,
        dataExports: 'unlimited',
        realTimeAlerts: true,
        customReports: true
      }
    }
  },

  enterprise: {
    name: 'Enterprise',
    displayName: 'Enterprise',
    price: {
      monthly: 749,
      annual: 7490
    },
    stripeIds: {
      monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'price_1RRushGRiAPUZqWuIvqueK7h',
      annual: process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID || 'price_1RWMT4GRiAPUZqWuqiNhkZfw'
    },
    features: {
      core: {
        users: 20,
        support: 'dedicated',
        mobileApp: true
      },
      canvas: {
        aiCredits: 1500,
        magicLinks: 200,
        canvasScansPerMonth: 1500,
        marketInsightsAccess: true,
        crmContactsMax: -1, // unlimited
        aiResearchReports: 500,
        exportEnabled: true,
        teamMembers: 20
      },
      sphereOs: {
        callMinutes: 5000,
        contacts: 'unlimited',
        analytics: 'enterprise',
        integrations: 'unlimited',
        callAnalysis: true,
        automation: true,
        customIntegrations: true
      },
      marketData: {
        aiQueries: 1500,
        categories: 'unlimited',
        automation: true,
        dataExports: 'unlimited',
        realTimeAlerts: true,
        customReports: true,
        apiAccess: true,
        dedicatedSupport: true
      }
    }
  },

  elite: {
    name: 'Elite',
    displayName: 'Elite',
    price: {
      monthly: 1499,
      annual: 14990
    },
    stripeIds: {
      monthly: process.env.STRIPE_ELITE_MONTHLY_PRICE_ID || 'price_1RRutVGRiAPUZqWuDMSAqHsD',
      annual: process.env.STRIPE_ELITE_ANNUAL_PRICE_ID || 'price_1RWMSCGRiAPUZqWu30j19b9G'
    },
    features: {
      core: {
        users: 'unlimited',
        support: 'white-glove',
        mobileApp: true
      },
      canvas: {
        aiCredits: -1, // unlimited
        magicLinks: -1, // unlimited
        canvasScansPerMonth: -1,
        marketInsightsAccess: true,
        crmContactsMax: -1,
        aiResearchReports: -1,
        exportEnabled: true,
        teamMembers: -1
      },
      sphereOs: {
        callMinutes: 'unlimited',
        contacts: 'unlimited',
        analytics: 'enterprise-plus',
        integrations: 'unlimited',
        callAnalysis: true,
        automation: true,
        customIntegrations: true,
        whiteLabel: true
      },
      marketData: {
        aiQueries: 'unlimited',
        categories: 'unlimited',
        automation: true,
        dataExports: 'unlimited',
        realTimeAlerts: true,
        customReports: true,
        apiAccess: true,
        dedicatedSupport: true,
        whiteLabel: true,
        customIntegrations: true
      }
    }
  }
};

// Helper functions for all modules to use
export const getPriceId = (tier, billingCycle = 'monthly') => {
  const tierConfig = UNIFIED_PRICING_TIERS[tier];
  if (!tierConfig) return null;
  return tierConfig.stripeIds[billingCycle];
};

export const getTierFeatures = (tier, module = 'core') => {
  const tierConfig = UNIFIED_PRICING_TIERS[tier];
  if (!tierConfig) return null;
  return tierConfig.features[module] || tierConfig.features.core;
};

export const getTierPrice = (tier, billingCycle = 'monthly') => {
  const tierConfig = UNIFIED_PRICING_TIERS[tier];
  if (!tierConfig) return null;
  return tierConfig.price[billingCycle];
};

export const canAccessFeature = (userTier, feature, module = 'core') => {
  const features = getTierFeatures(userTier, module);
  if (!features) return false;
  
  const limit = features[feature];
  if (limit === undefined || limit === false) return false;
  if (limit === true || limit === -1 || limit === 'unlimited') return true;
  
  return limit > 0;
};

// Environment variables needed for all modules
export const REQUIRED_ENV_VARS = [
  'STRIPE_SECRET_KEY',
  'STRIPE_EXPLORER_MONTHLY_PRICE_ID',
  'STRIPE_EXPLORER_ANNUAL_PRICE_ID',
  'STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID',
  'STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID',
  'STRIPE_GROWTH_MONTHLY_PRICE_ID',
  'STRIPE_GROWTH_ANNUAL_PRICE_ID',
  'STRIPE_ENTERPRISE_MONTHLY_PRICE_ID',
  'STRIPE_ENTERPRISE_ANNUAL_PRICE_ID',
  'STRIPE_ELITE_MONTHLY_PRICE_ID',
  'STRIPE_ELITE_ANNUAL_PRICE_ID'
];