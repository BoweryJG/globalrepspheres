/**
 * Universal Authentication Solution for RepSpheres
 * Fixes redirect loops and cross-domain auth issues
 */

import supabase from '../supabase';

// Configuration
const AUTH_CONFIG = {
  mainDomain: 'https://repspheres.com',
  cookieName: 'repspheres-auth-token',
  sessionKey: 'repspheres-session',
  checkInterval: 1000, // ms
  maxRetries: 3
};

/**
 * Get auth token from all possible sources
 */
function getAuthToken() {
  // 1. Check URL hash (for OAuth callbacks)
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  if (accessToken) return accessToken;

  // 2. Check cookies
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === AUTH_CONFIG.cookieName) return value;
  }

  // 3. Check localStorage
  const stored = localStorage.getItem(AUTH_CONFIG.sessionKey);
  if (stored) {
    try {
      const session = JSON.parse(stored);
      return session.access_token;
    } catch (e) {}
  }

  // 4. Check Supabase storage
  const supabaseAuth = localStorage.getItem('supabase.auth.token');
  if (supabaseAuth) {
    try {
      const data = JSON.parse(supabaseAuth);
      return data.currentSession?.access_token;
    } catch (e) {}
  }

  return null;
}

/**
 * Set auth token in all storage locations
 */
function setAuthToken(token, session) {
  // Set cookie with proper domain
  const domain = window.location.hostname.includes('localhost') 
    ? 'localhost' 
    : '.repspheres.com';
  
  document.cookie = `${AUTH_CONFIG.cookieName}=${token}; domain=${domain}; path=/; max-age=604800; samesite=lax${window.location.protocol === 'https:' ? '; secure' : ''}`;
  
  // Set in localStorage
  localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(session));
}

/**
 * Clear all auth data
 */
export function clearAuth() {
  // Clear cookies
  document.cookie = `${AUTH_CONFIG.cookieName}=; domain=.repspheres.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${AUTH_CONFIG.cookieName}=; domain=${window.location.hostname}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  
  // Clear storage
  localStorage.removeItem(AUTH_CONFIG.sessionKey);
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem('repspheres-auth');
  sessionStorage.clear();
}

/**
 * Check if user is authenticated without causing redirects
 */
export async function checkAuth() {
  try {
    // First try to get token from storage
    const token = getAuthToken();
    if (!token) return { authenticated: false, user: null };

    // Verify with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return { authenticated: false, user: null };
    }

    return { authenticated: true, user };
  } catch (error) {
    console.error('Auth check failed:', error);
    return { authenticated: false, user: null };
  }
}

/**
 * Safe navigation that prevents loops
 */
export async function safeNavigate(targetUrl, requiresAuth = true) {
  // Prevent self-redirect
  const currentUrl = window.location.href;
  if (currentUrl === targetUrl || currentUrl.includes(targetUrl.replace(/\/$/, ''))) {
    console.log('Already at target URL');
    return;
  }

  if (requiresAuth) {
    const { authenticated } = await checkAuth();
    
    if (!authenticated) {
      // Store target and redirect to login
      sessionStorage.setItem('authReturnUrl', targetUrl);
      
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = `${AUTH_CONFIG.mainDomain}/login?redirect=${encodeURIComponent(targetUrl)}`;
      }
      return;
    }
  }

  // Navigate to target
  window.location.href = targetUrl;
}

/**
 * Initialize auth state from main domain
 */
export async function initializeAuth() {
  // If we're on a subdomain, check main domain for auth
  if (window.location.hostname !== 'repspheres.com' && !window.location.hostname.includes('localhost')) {
    try {
      // Create hidden iframe to main domain
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${AUTH_CONFIG.mainDomain}/auth/check`;
      
      return new Promise((resolve) => {
        let retries = 0;
        
        const checkInterval = setInterval(async () => {
          const { authenticated, user } = await checkAuth();
          
          if (authenticated || retries >= AUTH_CONFIG.maxRetries) {
            clearInterval(checkInterval);
            if (iframe.parentNode) {
              document.body.removeChild(iframe);
            }
            resolve({ authenticated, user });
          }
          
          retries++;
        }, AUTH_CONFIG.checkInterval);
        
        document.body.appendChild(iframe);
        
        // Timeout after max retries
        setTimeout(() => {
          clearInterval(checkInterval);
          if (iframe.parentNode) {
            document.body.removeChild(iframe);
          }
          resolve({ authenticated: false, user: null });
        }, AUTH_CONFIG.checkInterval * AUTH_CONFIG.maxRetries);
      });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      return { authenticated: false, user: null };
    }
  }
  
  return checkAuth();
}

/**
 * Handle OAuth callback
 */
export async function handleOAuthCallback() {
  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
    
    if (error) throw error;
    
    if (data.session) {
      // Set auth in all storage locations
      setAuthToken(data.session.access_token, data.session);
      
      // Broadcast to other domains
      broadcastAuthState(data.session);
      
      return { success: true, session: data.session };
    }
    
    return { success: false, error: 'No session returned' };
  } catch (error) {
    console.error('OAuth callback error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Broadcast auth state to other RepSpheres domains
 */
function broadcastAuthState(session) {
  const domains = [
    'https://marketdata.repspheres.com',
    'https://canvas.repspheres.com',
    'https://crm.repspheres.com',
    'https://podcast.repspheres.com'
  ];
  
  domains.forEach(domain => {
    if (!window.location.href.includes(domain)) {
      try {
        // Use postMessage to notify other domains
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `${domain}/auth/sync`;
        iframe.onload = () => {
          iframe.contentWindow.postMessage({
            type: 'AUTH_UPDATE',
            session: session
          }, domain);
          
          setTimeout(() => {
            if (iframe.parentNode) {
              document.body.removeChild(iframe);
            }
          }, 1000);
        };
        document.body.appendChild(iframe);
      } catch (e) {
        console.error(`Failed to sync with ${domain}:`, e);
      }
    }
  });
}

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    initializeAuth().then(({ authenticated, user }) => {
      console.log('Auth initialized:', authenticated ? 'Logged in' : 'Not logged in');
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('authInitialized', {
        detail: { authenticated, user }
      }));
    });
  });
  
  // Listen for auth updates from other domains
  window.addEventListener('message', async (event) => {
    if (event.data.type === 'AUTH_UPDATE' && event.data.session) {
      setAuthToken(event.data.session.access_token, event.data.session);
      window.location.reload();
    }
  });
}

export default {
  checkAuth,
  clearAuth,
  safeNavigate,
  initializeAuth,
  handleOAuthCallback
};