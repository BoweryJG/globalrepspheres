/**
 * API Configuration
 */

// Backend API URL - defaults to production URL
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://osbackend-zl1h.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Subscription endpoints
  SUBSCRIPTION_STATUS: `${BACKEND_URL}/api/subscription-status`,
  SUBSCRIPTION_CREATE: `${BACKEND_URL}/api/subscription/create`,
  SUBSCRIPTION_UPDATE: `${BACKEND_URL}/api/subscription/update`,
  SUBSCRIPTION_CANCEL: `${BACKEND_URL}/api/subscription/cancel`,
  
  // Usage endpoints
  USAGE_GET: `${BACKEND_URL}/api/usage`,
  USAGE_INCREMENT: `${BACKEND_URL}/api/usage/increment`,
  USAGE_RESET: `${BACKEND_URL}/api/usage/reset`,
  
  // Stripe endpoints
  STRIPE_CREATE_CHECKOUT: `${BACKEND_URL}/api/stripe/create-checkout-session`,
  STRIPE_CREATE_PORTAL: `${BACKEND_URL}/api/stripe/create-portal-session`,
  
  // User endpoints
  USER_PROFILE: `${BACKEND_URL}/api/user/profile`,
  USER_UPDATE: `${BACKEND_URL}/api/user/update`,
};

/**
 * Get auth headers for API requests
 * @param {string} token - The auth token (usually from Supabase session)
 * @returns {Object} Headers object
 */
export function getAuthHeaders(token) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Handle API response
 * @param {Response} response - Fetch response object
 * @returns {Promise} Parsed JSON or error
 */
export async function handleApiResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error (${response.status}): ${error}`);
  }
  
  return response.json();
}