# Simple Auth Setup Guide

## Quick Fix for Auth Redirect Loops

### 1. For the CRM App (and other RepSpheres apps)

#### Step 1: Copy these files to your app
```bash
# From the main RepSpheres repo, copy:
src/utils/simpleAuth.js
src/components/SimpleAuthWrapper.js
src/supabase.js (use the EXACT same config)
```

#### Step 2: Update your App.js
```javascript
import SimpleAuthWrapper from './components/SimpleAuthWrapper';

function App() {
  return (
    <SimpleAuthWrapper requireAuth={true}>
      {/* Your existing app content */}
    </SimpleAuthWrapper>
  );
}
```

#### Step 3: Use the EXACT same Supabase config
```javascript
// supabase.js - MUST be identical in all apps
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'your-anon-key-here';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: window.localStorage,
    cookieOptions: {
      domain: window.location.hostname === 'localhost' ? 'localhost' : '.repspheres.com',
      sameSite: 'lax',
      secure: window.location.protocol === 'https:',
      maxAge: 60 * 60 * 24 * 7
    }
  }
});

export default supabase;
```

### 2. For Navigation Between Apps

Replace complex navigation with:
```javascript
import { simpleAuth } from './utils/simpleAuth';

// Simple navigation
const handleMarketDataClick = () => {
  simpleAuth.goToApp('https://marketdata.repspheres.com');
};
```

### 3. Debug Auth Issues

Add this to any page to debug:
```javascript
// In your component
useEffect(() => {
  // Debug auth on mount
  simpleAuth.debug();
}, []);

// Or in console:
// window.simpleAuth = require('./utils/simpleAuth').default;
// simpleAuth.debug();
```

### 4. When Things Break

```javascript
// Nuclear option - clear everything
simpleAuth.reset();
// Then try logging in again
```

## Why This Works

1. **No Complex State Sync** - Each app checks its own auth
2. **500ms Delay** - Gives cookies time to load
3. **Simple Redirects** - No loops, just "go to login" or "stay here"
4. **Same Storage Key** - All apps use 'repspheres-auth'

## Testing

1. Clear all data: `simpleAuth.reset()`
2. Go to main site: `https://repspheres.com`
3. Login there
4. Wait 2 seconds
5. Go to CRM: `https://crm.repspheres.com`
6. Should work without redirect loop

## Common Issues

**Still getting loops?**
- Make sure ALL apps use the EXACT same supabase.js config
- Check that cookies are set to `.repspheres.com` domain
- Try increasing the delay in SimpleAuthWrapper to 1000ms

**Can't stay logged in?**
- Check browser allows third-party cookies
- Make sure all apps are on HTTPS in production
- Verify Supabase dashboard has all domains in redirect URLs

**Debug in browser console:**
```javascript
// Check what's in storage
localStorage.getItem('repspheres-auth')

// Check cookies
document.cookie

// Force reset
localStorage.clear();
sessionStorage.clear();
```

That's it! Simple auth that just works.