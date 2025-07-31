#!/usr/bin/env node

/**
 * Test Auth Endpoints
 * Verifies backend auth endpoints are responding correctly
 */

const https = require('https');

const BACKEND_URL = 'https://osbackend-zl1h.onrender.com';

console.log('🔌 TESTING AUTH ENDPOINTS...\n');

// Test endpoints
const endpoints = [
  { path: '/health', method: 'GET', description: 'Backend Health Check' },
  { path: '/api/repx/plans', method: 'GET', description: 'RepX Tier Plans' },
  { path: '/api/auth/session', method: 'GET', description: 'Session Check (requires auth)' }
];

async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'osbackend-zl1h.onrender.com',
      path: endpoint.path,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📍 ${endpoint.description}`);
        console.log(`   Endpoint: ${endpoint.method} ${endpoint.path}`);
        console.log(`   Status: ${res.statusCode} ${res.statusCode < 400 ? '✅' : '❌'}`);
        
        if (res.statusCode === 401) {
          console.log('   Response: Authentication required (expected for protected routes)');
        } else if (data) {
          try {
            const parsed = JSON.parse(data);
            console.log('   Response:', JSON.stringify(parsed, null, 2).substring(0, 200) + '...');
          } catch (e) {
            console.log('   Response:', data.substring(0, 100) + '...');
          }
        }
        console.log('');
        resolve();
      });
    });
    
    req.on('error', (e) => {
      console.log(`❌ ${endpoint.description}`);
      console.log(`   Error: ${e.message}`);
      console.log('');
      resolve();
    });
    
    req.end();
  });
}

async function runTests() {
  console.log(`Backend URL: ${BACKEND_URL}\n`);
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
  
  console.log('🔐 AUTH CONFIGURATION CHECKLIST:');
  console.log('- [ ] Backend is responding (check /health)');
  console.log('- [ ] RepX tiers are configured (check /api/repx/plans)');
  console.log('- [ ] Auth middleware is working (401 on protected routes)');
  console.log('- [ ] CORS is configured for *.repspheres.com');
  console.log('- [ ] Cookies are set with correct domain');
}

runTests();