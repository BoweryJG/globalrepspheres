# RepSpheres SSO Setup Guide

## ✅ Completed Steps

1. **globalrepspheres** - Main site Supabase client updated with cross-domain cookies
2. **SphereOsCrM** - CRM Supabase client updated with cross-domain cookies

## 🔧 Supabase Dashboard Configuration

### 1. Enable Cross-Domain Authentication
1. Go to https://supabase.com/dashboard/project/cbopynuvhcymbumjnvay/auth/settings
2. Under **Authentication Settings** → **Cookies**:
   - Enable "Use cookies"
   - Set cookie domain to `.repspheres.com`
   - Set Same-Site to `lax`
   - Enable "Secure cookies" (for HTTPS)

### 2. Add Allowed Redirect URLs
Add these URLs to **Authentication** → **URL Configuration** → **Redirect URLs**:
```
https://repspheres.com/*
https://www.repspheres.com/*
https://market.repspheres.com/*
https://canvas.repspheres.com/*
https://crm.repspheres.com/*
http://localhost:3000/*
http://localhost:3001/*
http://localhost:3002/*
http://localhost:3003/*
```

### 3. OAuth Provider Settings
For each OAuth provider (Google, Facebook), ensure the redirect URL is set to:
```
https://repspheres.com/auth/callback
```

## 📝 Code Updates Needed

### market-data-jg Supabase Configuration

Create or update the Supabase client file with cookie support:

```javascript
// market-data-jg/src/supabase.js (or similar path)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: window.localStorage,
    cookieOptions: {
      domain: '.repspheres.com',
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

### canvasheader Supabase Configuration

Update the Supabase client file similarly:

```javascript
// canvasheader/src/supabase.js (or similar path)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: window.localStorage,
    cookieOptions: {
      domain: '.repspheres.com',
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

## 🧪 Testing SSO

### Local Testing
1. Start all apps on different ports:
   - globalrepspheres: `npm start` (port 3000)
   - market-data-jg: `npm start` (port 3001)
   - canvasheader: `npm start` (port 3002)
   - SphereOsCrM: `npm start` (port 3003)

2. Log in on the main site (localhost:3000)
3. Navigate to other apps - you should remain logged in

### Production Testing
1. Deploy all apps to their respective domains
2. Log in at https://repspheres.com
3. Navigate to:
   - https://market.repspheres.com
   - https://canvas.repspheres.com
   - https://crm.repspheres.com
4. Verify you remain logged in across all domains

## 🚨 Important Notes

1. **Cookie Domain**: The `.repspheres.com` domain setting allows cookies to be shared across all subdomains
2. **Storage Key**: All apps use the same `repspheres-auth` storage key for consistency
3. **Secure Cookies**: In production, cookies are marked as secure (HTTPS only)
4. **Development**: Local development uses different cookie settings to work with localhost

## 🔍 Troubleshooting

If SSO isn't working:
1. Check browser developer tools → Application → Cookies
2. Look for `sb-cbopynuvhcymbumjnvay-auth-token` cookie
3. Verify the cookie domain is `.repspheres.com`
4. Ensure all apps are using HTTPS in production
5. Check Supabase dashboard for any auth errors