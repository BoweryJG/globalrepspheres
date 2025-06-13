# Cross-Domain Authentication Fix for RepSpheres

## The Problem

When you login at `repspheres.com` and navigate to `marketdata.repspheres.com`:
1. Auth state doesn't persist
2. Login redirects back to homepage instead of marketdata

## Root Cause

The issue is that each subdomain app needs:
1. Same Supabase configuration with cookie domain set to `.repspheres.com`
2. Proper redirect handling after login
3. Session synchronization across domains

## Solution

### 1. Update MarketData App Supabase Configuration

In your `market-data-jg` repository, update the Supabase client:

```javascript
// src/supabase.js (or similar)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth', // Same key across all apps
    storage: window.localStorage,
    cookieOptions: {
      domain: '.repspheres.com', // CRITICAL: Leading dot for cross-subdomain
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 7 days
    },
    // Fallback for local development
    ...(window.location.hostname === 'localhost' && {
      cookieOptions: {
        domain: 'localhost',
        sameSite: 'lax',
        secure: false,
        maxAge: 60 * 60 * 24 * 7
      }
    })
  },
});

export default supabase;
```

### 2. Add Authentication Check on MarketData Load

In your marketdata app's main component:

```javascript
import { useEffect, useState } from 'react';
import supabase from './supabase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    checkAuth();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (!session) {
        // Store current URL for return after login
        sessionStorage.setItem('authReturnUrl', window.location.href);
        // Redirect to main domain login
        window.location.href = `https://repspheres.com/login?redirect=${encodeURIComponent(window.location.href)}`;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  // Your app content here
  return <YourApp user={user} />;
}
```

### 3. Fix Login Redirect on Main Domain

Update `src/contexts/AuthContext.js` in globalrepspheres:

```javascript
// In signInWithGoogle and other OAuth methods
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `https://repspheres.com/auth/callback`,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    }
  },
});
```

### 4. Update Auth Callback Handler

In `src/AuthCallback.js`:

```javascript
// Check all possible sources for intended destination
const getIntendedDestination = () => {
  // Priority 1: Session storage
  const sessionDest = sessionStorage.getItem('intendedDestination');
  if (sessionDest) {
    sessionStorage.removeItem('intendedDestination');
    return sessionDest;
  }
  
  // Priority 2: URL params
  const urlParams = new URLSearchParams(window.location.search);
  const redirectParam = urlParams.get('redirect');
  if (redirectParam) {
    return decodeURIComponent(redirectParam);
  }
  
  // Priority 3: Auth return URL
  const authReturn = sessionStorage.getItem('authReturnUrl');
  if (authReturn) {
    sessionStorage.removeItem('authReturnUrl');
    return authReturn;
  }
  
  // Default
  return '/';
};
```

## Testing Steps

1. Deploy all changes
2. Clear all cookies for repspheres.com domain
3. Go to repspheres.com and login
4. Navigate to marketdata.repspheres.com
5. Should stay logged in

## Debug Commands

Run these in browser console:

```javascript
// On main domain after login
window.debugAuth()

// On marketdata domain
window.debugAuth()

// Check cookies
document.cookie
```

## Supabase Dashboard Settings

Ensure these are set in Supabase Dashboard:
1. **Cookie domain**: `.repspheres.com`
2. **Redirect URLs**: Include all subdomains
3. **JWT expiry**: Set appropriately (default 1 hour)