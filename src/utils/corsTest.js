/**
 * CORS Test Utility
 * Helps debug CORS issues with the backend
 */

import { BACKEND_URL } from '../config/api';
import supabase from '../supabase';

/**
 * Test CORS configuration with the backend
 */
export async function testCORS() {
  console.group('🔍 CORS Test');
  console.log('Backend URL:', BACKEND_URL);
  console.log('Frontend Origin:', window.location.origin);
  
  // Test 1: Simple GET request
  console.log('\n📌 Test 1: Simple GET request...');
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    console.log('✅ GET request successful:', response.status);
  } catch (error) {
    console.error('❌ GET request failed:', error.message);
  }
  
  // Test 2: Authenticated request
  console.log('\n📌 Test 2: Authenticated request...');
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const response = await fetch(`${BACKEND_URL}/api/subscription-status`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('✅ Authenticated request successful:', response.status);
      if (!response.ok) {
        const text = await response.text();
        console.log('Response body:', text);
      }
    } else {
      console.log('⚠️ No active session - login first to test authenticated requests');
    }
  } catch (error) {
    console.error('❌ Authenticated request failed:', error.message);
  }
  
  // Test 3: POST request
  console.log('\n📌 Test 3: POST request...');
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const response = await fetch(`${BACKEND_URL}/api/usage/increment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feature: 'test_feature' }),
      });
      console.log('✅ POST request successful:', response.status);
    } else {
      console.log('⚠️ No active session - login first to test POST requests');
    }
  } catch (error) {
    console.error('❌ POST request failed:', error.message);
  }
  
  console.groupEnd();
}

// Make it available globally for easy testing
if (typeof window !== 'undefined') {
  window.testCORS = testCORS;
  console.log('💡 Run window.testCORS() in console to test backend CORS');
}