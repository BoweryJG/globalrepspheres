# Quick Auth Update Instructions

## To disable cross-domain auth interference:

### 1. Update App.js
Replace the NavBar import with SimpleNavBar:
```javascript
import SimpleNavBar from './components/SimpleNavBar';
// Replace <NavBar /> with <SimpleNavBar />
```

### 2. Remove Cross-Domain Auth HTML Files
```bash
rm public/auth/sync.html
rm public/auth/check.html
```

### 3. Update public/auth/callback.html
Remove any cross-domain broadcasting code. Keep only:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Authentication</title>
</head>
<body>
  <script>
    // Simple redirect back to app after OAuth
    window.location.href = '/';
  </script>
</body>
</html>
```

### 4. Update supabase.js
Remove the cookie domain setting:
```javascript
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Remove this line:
    // cookieOptions: { domain: '.repspheres.com' }
  }
});
```

### 5. Test Locally
1. Start globalrepspheres
2. Click on Market Data, Canvas, or CRM links
3. Verify they open without any auth interference
4. Verify local login still works for globalrepspheres

### 6. Deploy
Once tested, deploy the updated globalrepspheres.

## Result
- GlobalRepSpheres becomes a simple landing page with links
- Each app (Market Data, Canvas, CRM) handles its own auth
- No cross-domain session complexity
- Users understand they log in to each app separately