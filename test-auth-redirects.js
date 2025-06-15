#!/usr/bin/env node

/**
 * Auth Redirect Test Script
 * Run this to test various auth redirect scenarios
 */

console.log('🔍 Testing Auth Redirect Configuration...\n');

// Test scenarios
const scenarios = [
  {
    name: 'Direct login (no redirect)',
    url: '/login',
    expectedRedirect: '/'
  },
  {
    name: 'Login with redirect param',
    url: '/login?redirect=%2Faccount',
    expectedRedirect: '/account'
  },
  {
    name: 'Login with external redirect (Market Data)',
    url: '/login?redirect=https%3A%2F%2Fmarketdata.repspheres.com%2F',
    expectedRedirect: 'https://marketdata.repspheres.com/'
  },
  {
    name: 'OAuth callback with no destination',
    url: '/auth/callback',
    expectedRedirect: '/'
  },
  {
    name: 'OAuth callback with redirect param',
    url: '/auth/callback?redirect=%2Fadmin-analytics',
    expectedRedirect: '/admin-analytics'
  }
];

console.log('📋 Test Scenarios:');
scenarios.forEach((scenario, index) => {
  console.log(`\n${index + 1}. ${scenario.name}`);
  console.log(`   URL: ${scenario.url}`);
  console.log(`   Expected: ${scenario.expectedRedirect}`);
});

console.log('\n\n🔧 Debugging Steps:\n');
console.log('1. Open browser DevTools');
console.log('2. Go to Application/Storage tab');
console.log('3. Clear all site data');
console.log('4. Try each scenario above');
console.log('5. Check:');
console.log('   - sessionStorage for "intendedDestination"');
console.log('   - localStorage for "authReturnUrl"');
console.log('   - Final redirect location');

console.log('\n\n🐛 Common Issues:\n');
console.log('1. Cookie domain mismatch - Check if cookies are set to .repspheres.com');
console.log('2. Session storage not persisting - Check cross-origin policies');
console.log('3. OAuth redirect URL mismatch - Verify Supabase dashboard settings');
console.log('4. CORS issues - Check browser console for errors');

console.log('\n\n✅ Fixed Issues:\n');
console.log('1. OAuth redirects now use window.location.origin instead of hardcoded URL');
console.log('2. LoginPage now properly checks for redirect params and session storage');
console.log('3. AuthCallback handles multiple redirect sources');

console.log('\n\n🚀 Next Steps:\n');
console.log('1. Test each scenario in your browser');
console.log('2. Check Supabase dashboard for correct redirect URLs');
console.log('3. Ensure all subdomains are configured in Supabase');
console.log('4. Test cross-domain authentication between apps');