# GlobalRepSpheres - Update for Independent Auth

## Changes Needed for Independent Module Authentication

Since each module (market-data-jg, canvas, crm) now handles its own authentication independently, globalrepspheres needs updates to prevent interference.

### 1. Remove Cross-Domain Auth Gateway Role
The main site should NO LONGER:
- Act as central auth gateway
- Handle OAuth callbacks for other domains
- Broadcast auth state to subdomains
- Sync sessions across domains

### 2. Update Navigation Links
In `src/components/NavBar.js`, update the navigation to simply link to each app without auth checks:

```javascript
// Simple navigation links - no auth state sharing
const navLinks = [
  { 
    label: 'Market Data', 
    href: 'https://market.repspheres.com/',
    icon: <InsightsIcon />
  },
  { 
    label: 'Canvas', 
    href: 'https://canvas.repspheres.com/',
    icon: <MemoryIcon />
  },
  { 
    label: 'CRM', 
    href: 'https://crm.repspheres.com/',
    icon: <DashboardIcon />
  }
];
```

### 3. Disable Cross-Domain Auth Files
Remove or disable these files to prevent interference:
- `/public/auth/sync.html` - Remove cross-domain sync
- `/public/auth/check.html` - Remove auth checking
- Update `/public/auth/callback.html` to only handle local auth

### 4. Update Supabase Configuration
In `src/supabase.js`, remove cross-domain cookie settings:

```javascript
// Remove domain-wide cookies
auth: {
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
  // Remove: cookieOptions: { domain: '.repspheres.com' }
}
```

### 5. Simplify Auth Context
In `src/contexts/AuthContext.js`:
- Remove cross-domain auth listener setup
- Remove auth state broadcasting
- Keep only local authentication logic

### 6. Update OAuth Redirects
Change all OAuth redirect URLs from:
- `https://repspheres.com/auth/callback`

To local callbacks for each app:
- globalrepspheres: `https://repspheres.com/auth/callback`
- market-data: `https://market.repspheres.com/auth/callback`
- canvas: `https://canvas.repspheres.com/auth/callback`
- crm: `https://crm.repspheres.com/auth/callback`

### 7. Remove handleAuthenticatedNavigation
Replace authenticated navigation with simple links that open in the same tab.

## Deployment Steps

1. Make these updates locally
2. Test that globalrepspheres login only affects globalrepspheres
3. Verify navigation links work without auth interference
4. Deploy updated version

## Benefits
- Each app manages its own auth independently
- No complex cross-domain session management
- Users understand they need to log in to each app
- Simpler, more maintainable architecture