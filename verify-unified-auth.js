#!/usr/bin/env node

/**
 * Unified Auth Verification Script
 * Checks all critical auth configurations across RepSpheres apps
 */

const fs = require('fs');
const path = require('path');

// Load .env.local if it exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

console.log('🔍 REPSPHERES UNIFIED AUTH VERIFICATION\n');

// Check 1: Environment Variables
console.log('1️⃣ CHECKING ENVIRONMENT VARIABLES...');
const requiredEnvVars = [
  'REACT_APP_SUPABASE_URL',
  'REACT_APP_SUPABASE_ANON_KEY',
  'REACT_APP_BACKEND_URL'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.log('❌ Missing environment variables:', missingEnvVars.join(', '));
  console.log('   Add these to your .env.local file');
} else {
  console.log('✅ All required environment variables are set');
}

// Check 2: Supabase Configuration
console.log('\n2️⃣ CHECKING SUPABASE CONFIGURATION...');
const supabasePath = path.join(__dirname, 'src/supabase.js');
if (fs.existsSync(supabasePath)) {
  const supabaseContent = fs.readFileSync(supabasePath, 'utf8');
  
  // Check for hardcoded values
  const hasHardcodedUrl = supabaseContent.includes('https://cbopynuvhcymbumjnvay.supabase.co') && 
                          !supabaseContent.includes('process.env.REACT_APP_SUPABASE_URL');
  const hasHardcodedKey = supabaseContent.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9') && 
                          !supabaseContent.includes('process.env.REACT_APP_SUPABASE_ANON_KEY');
  
  if (hasHardcodedUrl || hasHardcodedKey) {
    console.log('⚠️  WARNING: Hardcoded credentials detected in supabase.js');
  } else {
    console.log('✅ Supabase using environment variables');
  }
  
  // Check cookie configuration
  if (supabaseContent.includes("sameSite: window.location.protocol === 'https:' ? 'none' : 'lax'")) {
    console.log('✅ Cookie configuration correct for cross-domain SSO');
  } else {
    console.log('❌ Cookie configuration may not support cross-domain SSO');
  }
  
  if (supabaseContent.includes("domain: window.location.hostname === 'localhost' ? 'localhost' : '.repspheres.com'")) {
    console.log('✅ Cookie domain configured for .repspheres.com');
  } else {
    console.log('❌ Cookie domain not configured for cross-domain');
  }
} else {
  console.log('❌ supabase.js not found');
}

// Check 3: Auth Context
console.log('\n3️⃣ CHECKING AUTH CONTEXT...');
const authContextPath = path.join(__dirname, 'src/contexts/AuthContext.js');
if (fs.existsSync(authContextPath)) {
  const authContent = fs.readFileSync(authContextPath, 'utf8');
  
  if (authContent.includes('supabase.auth.getSession')) {
    console.log('✅ AuthContext using Supabase auth');
  } else {
    console.log('⚠️  AuthContext may not be using Supabase auth');
  }
  
  if (authContent.includes('supabase.auth.onAuthStateChange')) {
    console.log('✅ Auth state change listener configured');
  } else {
    console.log('⚠️  No auth state change listener found');
  }
} else {
  console.log('❌ AuthContext.js not found');
}

// Check 4: Backend Configuration
console.log('\n4️⃣ CHECKING BACKEND CONFIGURATION...');
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://osbackend-zl1h.onrender.com';
console.log(`Backend URL: ${backendUrl}`);

// Check 5: Cross-App URLs
console.log('\n5️⃣ CROSS-APP URLS FOR SSO TESTING:');
console.log('- Homepage: https://repspheres.com');
console.log('- Canvas: https://canvas.repspheres.com');
console.log('- CRM: https://crm.repspheres.com');
console.log('- Market Data: https://marketdata.repspheres.com');
console.log('- RepConnect: https://repconnect.repspheres.com');

// Check 6: Build Status
console.log('\n6️⃣ BUILD STATUS:');
const buildPath = path.join(__dirname, 'build');
if (fs.existsSync(buildPath)) {
  console.log('✅ Build directory exists');
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html found in build');
  }
} else {
  console.log('❌ No build directory found - run npm run build');
}

// Summary
console.log('\n📊 SUMMARY:');
console.log('- Environment: ' + (missingEnvVars.length === 0 ? '✅' : '❌'));
console.log('- Supabase Config: ' + (fs.existsSync(supabasePath) ? '✅' : '❌'));
console.log('- Auth Context: ' + (fs.existsSync(authContextPath) ? '✅' : '❌'));
console.log('- Build Ready: ' + (fs.existsSync(buildPath) ? '✅' : '❌'));

console.log('\n🧪 MANUAL SSO TEST STEPS:');
console.log('1. Clear all cookies for *.repspheres.com');
console.log('2. Go to https://repspheres.com and log in');
console.log('3. Navigate to https://canvas.repspheres.com');
console.log('4. You should be automatically logged in (SSO working)');
console.log('5. Check tier features are correctly applied');

console.log('\n🔒 SECURITY CHECKLIST:');
console.log('- [ ] No hardcoded credentials in code');
console.log('- [ ] Environment variables set in Netlify');
console.log('- [ ] Cookies set with secure flag for HTTPS');
console.log('- [ ] Cross-domain cookies use .repspheres.com');
console.log('- [ ] Tier-based access controls working');