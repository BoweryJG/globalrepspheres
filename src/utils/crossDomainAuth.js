/**
 * Cross-Domain Authentication Utilities
 * Handles authentication state sharing across RepSpheres modules
 */

import supabase from '../supabase';

// Configuration for all RepSpheres domains
const REPSPHERES_DOMAINS = {
  main: 'https://repspheres.com',
  marketdata: 'https://marketdata.repspheres.com',
  canvas: 'https://canvas.repspheres.com',
  crm: 'https://crm.repspheres.com',
  podcast: 'https://podcast.repspheres.com'
};

/**
 * Get the main domain URL (for centralized auth)
 */
export function getMainDomain() {
  // In development, use the current origin
  if (window.location.hostname === 'localhost') {
    return window.location.origin;
  }
  return REPSPHERES_DOMAINS.main;
}

/**
 * Check if we're on a RepSpheres subdomain
 */
export function isOnSubdomain() {
  const hostname = window.location.hostname;
  return hostname.includes('marketdata.repspheres.com') ||
         hostname.includes('canvas.repspheres.com') ||
         hostname.includes('crm.repspheres.com') ||
         hostname.includes('podcast.repspheres.com');
}

/**
 * Get the current domain context
 */
export function getCurrentDomain() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('marketdata.repspheres.com')) {
    return 'marketdata';
  } else if (hostname.includes('canvas.repspheres.com')) {
    return 'canvas';
  } else if (hostname.includes('crm.repspheres.com')) {
    return 'crm';
  } else if (hostname.includes('podcast.repspheres.com')) {
    return 'podcast';
  }
  
  return 'main';
}

/**
 * Store the return URL for cross-domain auth
 */
export function storeReturnUrl(url = window.location.href) {
  // Store in both sessionStorage and localStorage for redundancy
  sessionStorage.setItem('authReturnUrl', url);
  localStorage.setItem('authReturnUrl', url);
  
  // Also store domain context
  const domain = getCurrentDomain();
  sessionStorage.setItem('authReturnDomain', domain);
  localStorage.setItem('authReturnDomain', domain);
}

/**
 * Get and clear the stored return URL
 */
export function getAndClearReturnUrl() {
  // Try sessionStorage first, then localStorage
  let returnUrl = sessionStorage.getItem('authReturnUrl') || 
                  localStorage.getItem('authReturnUrl');
  
  // Clear both storages
  sessionStorage.removeItem('authReturnUrl');
  sessionStorage.removeItem('authReturnDomain');
  localStorage.removeItem('authReturnUrl');
  localStorage.removeItem('authReturnDomain');
  
  return returnUrl;
}

/**
 * Initiate cross-domain authentication
 */
export async function initiateCrossDomainAuth(provider = 'google') {
  // Store current URL if on subdomain
  if (isOnSubdomain()) {
    storeReturnUrl();
  }
  
  // Always redirect to main domain for auth
  const mainDomain = getMainDomain();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${mainDomain}/auth/callback`,
    },
  });
  
  if (error) throw error;
}

/**
 * Check authentication state for cross-domain access
 */
export async function checkCrossDomainAuth() {
  // First check local session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    return { authenticated: true, session };
  }
  
  // If no local session and we're on a subdomain, redirect to main for auth check
  if (isOnSubdomain()) {
    // Store current URL for return
    storeReturnUrl();
    
    // Redirect to main domain auth check endpoint
    const mainDomain = getMainDomain();
    window.location.href = `${mainDomain}/auth/check?return=${encodeURIComponent(window.location.href)}`;
  }
  
  return { authenticated: false, session: null };
}

/**
 * Handle post-authentication redirect
 */
export function handleAuthRedirect() {
  // Get stored return URL
  const returnUrl = getAndClearReturnUrl();
  
  if (returnUrl) {
    // Validate the return URL is a RepSpheres domain
    const isValidDomain = Object.values(REPSPHERES_DOMAINS).some(domain => 
      returnUrl.startsWith(domain)
    );
    
    if (isValidDomain || returnUrl.includes('localhost')) {
      window.location.href = returnUrl;
      return true;
    }
  }
  
  // Check referrer as fallback
  const referrer = document.referrer;
  if (referrer) {
    for (const [key, domain] of Object.entries(REPSPHERES_DOMAINS)) {
      if (referrer.startsWith(domain)) {
        window.location.href = domain;
        return true;
      }
    }
  }
  
  // Default to homepage
  window.location.href = '/';
  return false;
}

/**
 * Setup cross-domain auth message listener
 */
export function setupCrossDomainAuthListener() {
  // Listen for auth state changes from other domains
  window.addEventListener('message', async (event) => {
    // Validate origin
    const validOrigins = Object.values(REPSPHERES_DOMAINS);
    if (!validOrigins.includes(event.origin) && !event.origin.includes('localhost')) {
      return;
    }
    
    // Handle auth state sync messages
    if (event.data.type === 'AUTH_STATE_SYNC') {
      const { session } = event.data;
      
      if (session) {
        // Set the session in the current domain
        await supabase.auth.setSession(session);
      } else {
        // Clear session if logged out
        await supabase.auth.signOut();
      }
    }
  });
}

/**
 * Broadcast auth state to other domains
 */
export function broadcastAuthState(session) {
  // Only broadcast if we have postMessage support
  if (!window.postMessage) return;
  
  // Broadcast to all RepSpheres domains
  Object.values(REPSPHERES_DOMAINS).forEach(domain => {
    if (domain !== window.location.origin) {
      try {
        // Create iframe for cross-domain communication
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `${domain}/auth/sync`;
        document.body.appendChild(iframe);
        
        // Send message once iframe loads
        iframe.onload = () => {
          iframe.contentWindow.postMessage({
            type: 'AUTH_STATE_SYNC',
            session: session
          }, domain);
          
          // Remove iframe after sending
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        };
      } catch (error) {
        console.error(`Failed to sync auth with ${domain}:`, error);
      }
    }
  });
}