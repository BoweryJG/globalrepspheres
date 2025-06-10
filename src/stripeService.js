export async function createCheckoutSession(priceId, mode = 'subscription') {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    // For development, redirect to a placeholder
    window.location.href = `/signup?plan=${priceId}`;
    return;
  }
  
  try {
    const res = await fetch(`${backendUrl}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        priceId,
        mode,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
      })
    });
    
    if (!res.ok) throw new Error('Failed to create session');
    
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error('Checkout error', err);
    // Fallback for development
    window.location.href = `/signup?plan=${priceId}`;
  }
}

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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        returnUrl: `${window.location.origin}/account`,
      })
    });
    
    if (!res.ok) throw new Error('Failed to create portal session');
    
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error('Portal error', err);
  }
}
