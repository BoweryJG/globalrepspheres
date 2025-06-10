export async function createCheckoutSession(priceId, mode = 'subscription') {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    // For development, redirect to a placeholder
    window.location.href = `/signup?plan=${priceId}`;
    return;
  }
  
  try {
    const res = await fetch(`${backendUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        priceId,
        mode,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel?price_id=${priceId}`,
      })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage = errorData.message || `Server error: ${res.status}`;
      throw new Error(errorMessage);
    }
    
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL received from server');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    
    // Show user-friendly error message
    const errorMessage = err.message || 'Unable to start checkout process';
    
    // You can enhance this by adding a toast notification system
    // For now, use alert as a simple solution
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      alert('Connection error. Please check your internet connection and try again.');
    } else if (err.message.includes('Server error')) {
      alert('Our payment system is temporarily unavailable. Please try again in a few moments.');
    } else {
      alert(`Unable to process payment: ${errorMessage}`);
    }
    
    // Re-throw to let the component handle it
    throw err;
  }
}

export async function createPortalSession() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    console.error('REACT_APP_BACKEND_URL not set');
    return;
  }
  
  try {
    const res = await fetch(`${backendUrl}/api/create-portal-session`, {
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
