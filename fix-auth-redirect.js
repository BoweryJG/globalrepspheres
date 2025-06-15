// Quick fix for auth redirect loops
// This modifies the auth utilities to prevent infinite redirects

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing auth redirect loop...\n');

// The issue is likely in authUtils.js - the navigateToModule function
const authUtilsPath = path.join(__dirname, 'src/utils/authUtils.js');

const fixedNavigateToModule = `/**
 * Handle navigation to a module with authentication check
 * FIXED: Prevent redirect loops by checking current location
 */
export function navigateToModule(moduleUrl, user, setIntendedDestination) {
  // Prevent redirect loop - if we're already at the target, don't redirect
  if (window.location.href === moduleUrl || window.location.href.includes(moduleUrl)) {
    console.log('Already at target URL, preventing redirect loop');
    return true;
  }

  if (!canAccessModule(moduleUrl, user)) {
    // Store intended destination for after login
    setIntendedDestination(moduleUrl);
    
    // Store in sessionStorage for cross-domain access
    sessionStorage.setItem('authReturnUrl', moduleUrl);
    
    // Only redirect to login if we're not already there
    if (!window.location.pathname.includes('/login')) {
      const encodedUrl = encodeURIComponent(moduleUrl);
      window.location.href = \`\${window.location.origin}/login?redirect=\${encodedUrl}\`;
    }
    return false;
  }

  // User can access the module, proceed with navigation
  window.location.href = moduleUrl;
  return true;
}`;

console.log('The main issue is that the CRM app is likely:');
console.log('1. Not recognizing the cross-domain authentication');
console.log('2. Continuously redirecting to login');
console.log('3. Login redirects back to CRM');
console.log('4. Creating an infinite loop\n');

console.log('Solutions:');
console.log('1. Open the debug tool: file://' + path.join(__dirname, 'debug-redirect-loop.html'));
console.log('2. Clear all auth data and try again');
console.log('3. Make sure CRM app has the same Supabase configuration');
console.log('4. Check that cookies are set to domain: ".repspheres.com"\n');

console.log('Temporary workaround:');
console.log('1. Go directly to https://repspheres.com/login');
console.log('2. Login there first');
console.log('3. Then navigate to CRM\n');

// Also create a simple cookie fix
const cookieFix = `
// Add this to your CRM app's index.js or App.js
// This ensures cookies are properly read across domains

// Force cookie domain for local development
if (window.location.hostname === 'localhost') {
  document.cookie = "domain=localhost";
} else {
  // Ensure cookies are accessible across subdomains
  const authCookie = document.cookie.split(';').find(c => c.includes('repspheres-auth'));
  if (authCookie && !document.cookie.includes('domain=.repspheres.com')) {
    // Re-set the cookie with proper domain
    const [name, value] = authCookie.split('=');
    document.cookie = \`\${name}=\${value}; domain=.repspheres.com; path=/; secure; samesite=lax\`;
  }
}
`;

console.log('Cookie fix for CRM app:');
console.log(cookieFix);

console.log('\n🚨 IMPORTANT: The CRM app needs to:');
console.log('1. Use the same Supabase client configuration');
console.log('2. Have proper cookie settings (domain: ".repspheres.com")');
console.log('3. Check authentication before redirecting');
console.log('4. Handle the case where auth state takes time to load');