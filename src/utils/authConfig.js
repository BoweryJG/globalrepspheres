/**
 * Centralized auth configuration
 * Toggle settings here to debug auth issues
 */

export const authConfig = {
  // Set to false to disable cross-domain auth checks (for debugging)
  requireAuth: {
    marketdata: false, // Temporarily disabled
    canvas: false,     // Temporarily disabled  
    crm: false,        // Temporarily disabled
  },
  
  // Cookie settings
  cookieOptions: {
    domain: process.env.NODE_ENV === 'production' ? '.repspheres.com' : 'localhost',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  },
  
  // Debug mode
  debug: true,
  
  // Auth check timeout (ms)
  authCheckTimeout: 3000,
  
  // Redirect behavior
  redirectToLogin: true,
  loginUrl: '/login',
  defaultRedirect: '/'
};

// Helper to check if module requires auth
export function moduleRequiresAuth(moduleUrl) {
  if (!authConfig.redirectToLogin) return false;
  
  const module = moduleUrl.includes('marketdata') ? 'marketdata' :
                 moduleUrl.includes('canvas') ? 'canvas' :
                 moduleUrl.includes('crm') ? 'crm' : null;
                 
  return module ? authConfig.requireAuth[module] : false;
}