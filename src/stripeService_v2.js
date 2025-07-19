import { API_ENDPOINTS } from './config/api';

// Fetch pricing tiers from backend
let cachedPricingTiers = null;
export async function getPricingTiers() {
  if (cachedPricingTiers) {
    return cachedPricingTiers;
  }

  try {
    const response = await fetch(API_ENDPOINTS.PRICING_TIERS);
    if (!response.ok) {
      throw new Error('Failed to fetch pricing tiers');
    }
    
    cachedPricingTiers = await response.json();
    return cachedPricingTiers;
  } catch (error) {
    console.error('Error fetching pricing tiers:', error);
    // Return fallback pricing if backend is unavailable
    return {
      explorer: { name: 'Explorer', stripeIds: { monthly: 'price_1RRuqbGRiAPUZqWu3f91wnNx', annual: 'price_1RWMXEGRiAPUZqWuPwcgrovN' }},
      professional: { name: 'Professional', stripeIds: { monthly: 'price_1RRurNGRiAPUZqWuklICsE4P', annual: 'price_1RWMWjGRiAPUZqWu6YBZY7o4' }},
      growth: { name: 'Growth', stripeIds: { monthly: 'price_1RWMW3GRiAPUZqWuoTA0eLUC', annual: 'price_1RRus5GRiAPUZqWup3jk1S8U' }},
      enterprise: { name: 'Enterprise', stripeIds: { monthly: 'price_1RRushGRiAPUZqWuIvqueK7h', annual: 'price_1RWMT4GRiAPUZqWuqiNhkZfw' }},
      elite: { name: 'Elite', stripeIds: { monthly: 'price_1RRutVGRiAPUZqWuDMSAqHsD', annual: 'price_1RWMSCGRiAPUZqWu30j19b9G' }}
    };
  }
}

export async function createCheckoutSession(tier, billingInterval = 'month') {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    throw new Error('Backend URL not configured');
  }

  // Handle elite tier differently for custom onboarding
  if (tier === 'elite') {
    // Redirect to elite application or contact form
    window.location.href = '/elite-application';
    return;
  }

  try {
    const pricingTiers = await getPricingTiers();
    const tierConfig = pricingTiers[tier];
    if (!tierConfig) {
      throw new Error('Invalid pricing tier');
    }

    // Determine which price ID to use
    let priceId = tierConfig.stripeIds.monthly;
    if (billingInterval === 'year' && tierConfig.stripeIds.annual) {
      priceId = tierConfig.stripeIds.annual;
    }

    const res = await fetch(`${backendUrl}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        tier: tierConfig.name,
        billingInterval,
        successUrl: `${window.location.origin}/success?tier=${tier}`,
        cancelUrl: `${window.location.origin}/pricing`,
        metadata: {
          tier: tierConfig.name,
          billingInterval,
        }
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    // Show user-friendly error
    alert('Unable to start checkout process. Please try again or contact support.');
  }
}

// Customer portal for managing subscriptions
export async function createPortalSession() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assuming auth token
      },
    });

    if (!res.ok) {
      throw new Error('Failed to create portal session');
    }

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error('Portal error:', err);
    alert('Unable to access billing portal. Please try again or contact support.');
  }
}

// Validate current subscription status
export async function getSubscriptionStatus() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    return null;
  }

  try {
    const res = await fetch(`${backendUrl}/subscription-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to get subscription status');
    }

    const data = await res.json();
    return {
      active: data.active,
      tier: data.tier,
      billingInterval: data.billingInterval,
      cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      currentPeriodEnd: data.currentPeriodEnd,
    };
  } catch (err) {
    console.error('Subscription status error:', err);
    return null;
  }
}