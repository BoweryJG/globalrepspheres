/**
 * Backend health check utilities
 */

import { BACKEND_URL } from '../config/api';

/**
 * Check if backend is accessible
 * @returns {Promise<{healthy: boolean, message: string}>}
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        healthy: true,
        message: `Backend is running: ${data.message || 'OK'}`,
        version: data.version,
      };
    } else {
      return {
        healthy: false,
        message: `Backend returned status: ${response.status}`,
      };
    }
  } catch (error) {
    return {
      healthy: false,
      message: `Cannot connect to backend: ${error.message}`,
    };
  }
}

/**
 * Log backend connection status
 */
export async function logBackendStatus() {
  const health = await checkBackendHealth();
  
  if (health.healthy) {
    console.log('✅ Backend connection successful:', health.message);
    if (health.version) {
      console.log('📌 Backend version:', health.version);
    }
  } else {
    console.error('❌ Backend connection failed:', health.message);
    console.log('🔗 Backend URL:', BACKEND_URL);
  }
  
  return health;
}