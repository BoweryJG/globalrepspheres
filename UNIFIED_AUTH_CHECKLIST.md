# 🔐 Unified Auth Final Checklist

## ✅ Code Implementation Status

### Global RepSpheres (Homepage)
- [x] Removed hardcoded Supabase credentials
- [x] Cookie configuration for cross-domain SSO
- [x] Build succeeds with 0 errors
- [x] Auth wrapper simplified for JS compatibility

### Backend (osbackend)
- [x] Unified auth middleware (`authenticateToken`)
- [x] RepX tier validation endpoints
- [x] Cookie configuration for `.repspheres.com`
- [x] CORS configured for all frontends

### All Apps
- [x] Using Supabase as primary auth
- [x] Environment variables for configuration
- [x] Cross-domain SSO via shared cookies

## 🧪 Manual Testing Steps

### 1. SSO Flow Test
1. Clear all cookies for `*.repspheres.com`
2. Visit https://repspheres.com
3. Log in with test account
4. Navigate to https://canvas.repspheres.com
5. **Expected**: Automatically logged in (no login prompt)
6. Check user menu shows correct email
7. Navigate to other apps (CRM, Market Data, etc.)
8. **Expected**: All apps recognize the session

### 2. Tier Feature Test
1. Log in with different tier accounts:
   - Rep⁰: Basic access only
   - Rep²: Canvas access enabled
   - Rep³: Email features unlocked
   - Rep⁴: Gmail integration available
   - Rep⁵: White label features
2. Verify features unlock correctly per tier

### 3. Cross-Domain Cookie Test
1. Open browser DevTools > Application > Cookies
2. Log into any RepSpheres app
3. Check for cookies with:
   - Domain: `.repspheres.com`
   - SameSite: `None` (for HTTPS)
   - Secure: `true`
   - Name: `sb-cbopynuvhcymbumjnvay-auth-token`

### 4. Backend Auth Test
```bash
# Test with valid token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://osbackend-zl1h.onrender.com/api/repx/validate-access

# Should return user's tier and features
```

## 🚨 Critical Items for Production

### Environment Variables (Set in Netlify)
```
REACT_APP_SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com
```

### Security Checklist
- [ ] No hardcoded credentials in any app
- [ ] All env vars set in Netlify dashboard
- [ ] Cookies use secure flags for HTTPS
- [ ] Backend validates auth on all protected routes
- [ ] Tier-based access controls working

## 🔍 Troubleshooting

### If SSO isn't working:
1. Check cookie domain is `.repspheres.com`
2. Ensure all apps use HTTPS in production
3. Verify backend CORS includes all frontend domains
4. Check browser console for auth errors

### If tier features aren't unlocking:
1. Check `/api/repx/validate-access` response
2. Verify user's subscription in database
3. Check tier definitions in backend routes

### If getting 401 errors:
1. Check token is being sent in headers
2. Verify token hasn't expired
3. Ensure `credentials: 'include'` in fetch calls

## 📊 Current Status
- **Code**: 100% Complete ✅
- **Build**: Successful ✅
- **Deployment**: Ready
- **Testing**: Manual verification needed

## 🎯 Next Steps
1. Deploy to Netlify
2. Set environment variables in Netlify dashboard
3. Test SSO flow across all production apps
4. Monitor for any auth issues in production