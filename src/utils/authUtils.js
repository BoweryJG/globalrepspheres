/**
 * Authentication utilities for cross-module navigation and protection
 */

/**
 * Check if user needs authentication for a specific module
 * @param {string} moduleUrl - URL of the module (e.g., 'https://marketdata.repspheres.com/')
 * @param {Object} user - Current user object from AuthContext
 * @returns {boolean} - True if user can access the module, false if auth required
 */
export function canAccessModule(moduleUrl, user) {
  // Define which modules require authentication
  const protectedModules = [
    'https://marketdata.repspheres.com/',
    'https://canvas.repspheres.com/',
    'https://crm.repspheres.com/'
  ];

  const isProtected = protectedModules.some(module => moduleUrl.includes(module));
  
  // If module is protected and user is not authenticated, return false
  if (isProtected && !user) {
    return false;
  }

  return true;
}

/**
 * Handle navigation to a module with authentication check
 * @param {string} moduleUrl - URL of the module to navigate to
 * @param {Object} user - Current user object from AuthContext
 * @param {Function} setIntendedDestination - Function to set intended destination
 * @returns {boolean} - True if navigation proceeded, false if redirected to login
 */
export function navigateToModule(moduleUrl, user, setIntendedDestination) {
  if (!canAccessModule(moduleUrl, user)) {
    // Store intended destination for after login
    setIntendedDestination(moduleUrl);
    
    // Store the intended destination in sessionStorage for cross-domain access
    sessionStorage.setItem('authReturnUrl', moduleUrl);
    
    // Redirect to login with the module URL as intended destination
    const encodedUrl = encodeURIComponent(moduleUrl);
    window.location.href = `/login?redirect=${encodedUrl}`;
    return false;
  }

  // User can access the module, proceed with navigation
  window.location.href = moduleUrl;
  return true;
}

/**
 * Get the current module context based on URL
 * @param {string} url - Current URL (defaults to window.location.href)
 * @returns {string} - Module name ('main', 'marketdata', 'canvas', 'crm', 'podcast')
 */
export function getCurrentModule(url = window.location.href) {
  if (url.includes('marketdata.repspheres.com')) return 'marketdata';
  if (url.includes('canvas.repspheres.com')) return 'canvas';
  if (url.includes('crm.repspheres.com')) return 'crm';
  if (url.includes('page=podcast') || url.includes('/podcast.html')) return 'podcast';
  return 'main';
}

/**
 * Check if current page requires authentication
 * @param {string} url - Current URL (defaults to window.location.href)
 * @returns {boolean} - True if page requires authentication
 */
export function isProtectedPage(url = window.location.href) {
  const protectedPaths = [
    '/admin-analytics',
    '/account',
    '/dashboard',
    '/settings'
  ];

  const protectedModules = [
    'marketdata.repspheres.com',
    'canvas.repspheres.com', 
    'crm.repspheres.com'
  ];

  // Check if current URL is a protected path
  const isProtectedPath = protectedPaths.some(path => url.includes(path));
  
  // Check if current URL is a protected module
  const isProtectedModule = protectedModules.some(module => url.includes(module));

  return isProtectedPath || isProtectedModule;
}

/**
 * Generate the appropriate callback URL for OAuth based on current context
 * @param {string} currentUrl - Current URL (defaults to window.location.href)
 * @returns {string} - Callback URL for OAuth redirect
 */
export function generateOAuthCallbackUrl(currentUrl = window.location.href) {
  const currentModule = getCurrentModule(currentUrl);
  
  // Map modules to their base URLs
  const moduleBaseUrls = {
    'marketdata': 'https://marketdata.repspheres.com',
    'canvas': 'https://canvas.repspheres.com',
    'crm': 'https://crm.repspheres.com',
    'podcast': 'https://podcast.repspheres.com',
    'main': window.location.origin
  };

  const baseUrl = moduleBaseUrls[currentModule] || window.location.origin;
  return `${baseUrl}/auth/callback`;
}

/**
 * Enhanced navigation handler with authentication and analytics tracking
 * @param {string} href - URL to navigate to
 * @param {Object} user - Current user object
 * @param {Function} setIntendedDestination - Function to set intended destination
 * @param {boolean} trackAnalytics - Whether to track navigation event (default: true)
 */
export function handleAuthenticatedNavigation(
  href, 
  user, 
  setIntendedDestination, 
  trackAnalytics = true
) {
  // Track navigation with Google Analytics
  if (trackAnalytics && window.gtag) {
    window.gtag('event', 'navigation', {
      event_category: 'engagement',
      event_label: href,
      value: 1,
      authenticated: !!user
    });
  }

  // Check if navigation requires authentication
  if (!canAccessModule(href, user)) {
    // Track authentication required event
    if (trackAnalytics && window.gtag) {
      window.gtag('event', 'auth_required', {
        event_category: 'authentication',
        event_label: href,
        value: 1
      });
    }

    return navigateToModule(href, user, setIntendedDestination);
  }

  // Proceed with navigation
  setTimeout(() => {
    window.location.href = href;
  }, 100);

  return true;
}

/**
 * Initialize authentication state listener for cross-module sync
 * This can be used to sync authentication state across different modules
 */
export function initCrossModuleAuthSync() {
  // Listen for authentication events from other modules
  window.addEventListener('message', (event) => {
    // Only accept messages from RepSpheres domains
    const allowedOrigins = [
      'https://marketdata.repspheres.com',
      'https://canvas.repspheres.com',
      'https://crm.repspheres.com',
      'https://podcast.repspheres.com',
      window.location.origin
    ];

    if (!allowedOrigins.includes(event.origin)) {
      return;
    }

    // Handle authentication sync messages
    if (event.data.type === 'AUTH_STATE_CHANGED') {
      // Refresh current page to sync auth state
      window.location.reload();
    }
  });

  // Broadcast authentication changes to other modules
  window.broadcastAuthChange = (authState) => {
    const allowedOrigins = [
      'https://marketdata.repspheres.com',
      'https://canvas.repspheres.com', 
      'https://crm.repspheres.com',
      'https://podcast.repspheres.com'
    ];

    allowedOrigins.forEach(origin => {
      if (origin !== window.location.origin) {
        try {
          window.postMessage({
            type: 'AUTH_STATE_CHANGED',
            authState: authState
          }, origin);
        } catch (error) {
          // Silent fail for cross-origin restrictions
        }
      }
    });
  };
}