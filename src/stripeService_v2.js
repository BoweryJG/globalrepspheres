// Stripe Pricing Configuration
export const PRICING_TIERS = {
  starter: {
    name: 'Starter',
    priceId: process.env.REACT_APP_STRIPE_STARTER_PRICE_ID,
    price: 297,
    interval: 'month',
  },
  professional: {
    name: 'Professional', 
    priceId: process.env.REACT_APP_STRIPE_PROFESSIONAL_PRICE_ID,
    price: 797,
    interval: 'month',
    annualPriceId: process.env.REACT_APP_STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID,
    annualPrice: 7970, // $797 * 10 months (2 months free)
  },
  enterprise: {
    name: 'Enterprise',
    priceId: 'custom',
    price: 'custom',
    interval: 'custom',
  }
};

export async function createCheckoutSession(tier, billingInterval = 'month') {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    throw new Error('Backend URL not configured');
  }

  // Handle enterprise tier differently
  if (tier === 'enterprise') {
    // Redirect to calendly or contact form
    window.location.href = '/contact-sales';
    return;
  }

  try {
    const tierConfig = PRICING_TIERS[tier];
    if (!tierConfig) {
      throw new Error('Invalid pricing tier');
    }

    // Determine which price ID to use
    let priceId = tierConfig.priceId;
    if (billingInterval === 'year' && tierConfig.annualPriceId) {
      priceId = tierConfig.annualPriceId;
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