/**
 * Simple Navigation - Replace complex auth navigation with simple redirects
 */

import { simpleAuth } from './simpleAuth';

// App URLs
export const APPS = {
  main: 'https://repspheres.com',
  marketData: 'https://marketdata.repspheres.com',
  canvas: 'https://canvas.repspheres.com',
  crm: 'https://crm.repspheres.com',
  podcast: 'https://podcast.repspheres.com'
};

/**
 * Navigate to an app - no complex auth checks, just go there
 */
export function goToApp(appKey) {
  const url = APPS[appKey];
  if (url) {
    window.location.href = url;
  }
}

/**
 * Navigate with optional auth check
 */
export async function navigateTo(url, requireAuth = false) {
  if (requireAuth) {
    const loggedIn = await simpleAuth.isLoggedIn();
    if (!loggedIn) {
      simpleAuth.loginWithRedirect(url);
      return;
    }
  }
  
  window.location.href = url;
}

/**
 * Get app name from URL
 */
export function getCurrentApp() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('marketdata')) return 'marketData';
  if (hostname.includes('canvas')) return 'canvas';
  if (hostname.includes('crm')) return 'crm';
  if (hostname.includes('podcast')) return 'podcast';
  
  return 'main';
}

/**
 * Simple link handler for navigation
 */
export function handleNavClick(e, url, requireAuth = false) {
  e.preventDefault();
  navigateTo(url, requireAuth);
}

export default {
  APPS,
  goToApp,
  navigateTo,
  getCurrentApp,
  handleNavClick
};