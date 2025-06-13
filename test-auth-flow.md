# Authentication Flow Test Checklist

## Test Cases for Cross-Domain Authentication

### 1. Basic Authentication Flow
- [ ] Navigate to https://repspheres.com
- [ ] Click "Sign Up" or "Log In"
- [ ] Complete authentication with Google/Email
- [ ] Verify user is logged in on main domain
- [ ] Check that user avatar/name appears in navbar

### 2. Cross-Domain Navigation (Authenticated)
- [ ] While logged in on main domain, click "Market Data"
- [ ] Verify navigation to https://marketdata.repspheres.com/ without login prompt
- [ ] Verify user remains authenticated on Market Data app
- [ ] Navigate back to main domain - verify still logged in

### 3. Protected Route Redirect Flow
- [ ] Log out from all domains
- [ ] Navigate directly to https://marketdata.repspheres.com/
- [ ] Verify redirect to login page
- [ ] Complete login
- [ ] Verify redirect back to Market Data after authentication

### 4. Cross-Domain State Sync
- [ ] Log in on main domain
- [ ] Open Canvas app in new tab: https://canvas.repspheres.com/
- [ ] Verify user is automatically authenticated
- [ ] Log out from Canvas
- [ ] Switch to main domain tab - verify user is logged out there too

### 5. Subscription Tier Access
- [ ] Log in with a user account
- [ ] Navigate to Market Data
- [ ] Verify tier-based access restrictions are applied
- [ ] Check usage limits are enforced based on subscription

### 6. Public Content Access (Market Data)
- [ ] Navigate to https://marketdata.repspheres.com/ while logged out
- [ ] Verify "Top 50 Procedures" teaser content is visible
- [ ] Verify premium features show lock/blur overlay
- [ ] Verify "Sign Up" CTAs are prominent

## Current Domain Configuration

### Main Apps:
1. **Main Portal**: https://repspheres.com
2. **Market Data**: https://marketdata.repspheres.com/
3. **Canvas**: https://canvas.repspheres.com/
4. **CRM/SphereOS**: https://crm.repspheres.com/
5. **Podcast**: https://podcast.repspheres.com/

### Authentication Configuration:
- Cookie Domain: `.repspheres.com`
- Session Storage Key: `repspheres-auth`
- Cross-domain sync via postMessage API
- Protected routes require authentication
- Subscription tiers fetched from backend API

## Notes:
- All subdomains must use the same Supabase project
- Cookie domain must be `.repspheres.com` in production
- Each app should check authentication state on load
- Market Data needs to implement public/protected content strategy