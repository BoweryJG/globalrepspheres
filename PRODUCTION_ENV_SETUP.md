# Production Environment Setup

## Required Environment Variables

All modules must use the same Stripe account and environment variables for unified pricing.

### Stripe Configuration
```bash
# Main Stripe Account Keys
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Unified Price IDs (Monthly)
STRIPE_EXPLORER_MONTHLY_PRICE_ID=price_1RRuqbGRiAPUZqWu3f91wnNx
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_1RRurNGRiAPUZqWuklICsE4P
STRIPE_GROWTH_MONTHLY_PRICE_ID=price_1RWMW3GRiAPUZqWuoTA0eLUC
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_1RRushGRiAPUZqWuIvqueK7h
STRIPE_ELITE_MONTHLY_PRICE_ID=price_1RRutVGRiAPUZqWuDMSAqHsD

# Annual Price IDs
STRIPE_EXPLORER_ANNUAL_PRICE_ID=price_1RWMXEGRiAPUZqWuPwcgrovN
STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID=price_1RWMWjGRiAPUZqWu6YBZY7o4
STRIPE_GROWTH_ANNUAL_PRICE_ID=price_1RRus5GRiAPUZqWup3jk1S8U
STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=price_1RWMT4GRiAPUZqWuqiNhkZfw
STRIPE_ELITE_ANNUAL_PRICE_ID=price_1RWMSCGRiAPUZqWu30j19b9G

# Webhook Endpoint Secret
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Supabase Configuration
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Module-Specific Environment Setup

#### Main App (globalrepspheres)
Add to `.env.production`:
```bash
REACT_APP_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY
REACT_APP_STRIPE_EXPLORER_MONTHLY_PRICE_ID=$STRIPE_EXPLORER_MONTHLY_PRICE_ID
REACT_APP_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=$STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID
REACT_APP_STRIPE_GROWTH_MONTHLY_PRICE_ID=$STRIPE_GROWTH_MONTHLY_PRICE_ID
REACT_APP_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=$STRIPE_ENTERPRISE_MONTHLY_PRICE_ID
REACT_APP_STRIPE_ELITE_MONTHLY_PRICE_ID=$STRIPE_ELITE_MONTHLY_PRICE_ID
```

#### SphereOsCrM Module
Add to `netlify.toml`:
```toml
[build.environment]
STRIPE_SECRET_KEY = "sk_live_..."
STRIPE_EXPLORER_MONTHLY_PRICE_ID = "price_1RRuqbGRiAPUZqWu3f91wnNx"
# ... all other price IDs
```

#### canvasheader Module
Add to `netlify.toml`:
```toml
[build.environment]
VITE_STRIPE_PUBLISHABLE_KEY = "pk_live_..."
VITE_STRIPE_EXPLORER_MONTHLY_PRICE_ID = "price_1RRuqbGRiAPUZqWu3f91wnNx"
# ... all other price IDs
```

#### market-data-jg Module
Add to environment configuration:
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_EXPLORER_MONTHLY_PRICE_ID=price_1RRuqbGRiAPUZqWu3f91wnNx
# ... all other price IDs
```

## Deployment Checklist

### 1. Verify All Price IDs Match
- [ ] Explorer: $49/month, $490/year
- [ ] Professional: $149/month, $1,490/year  
- [ ] Growth: $349/month, $3,490/year
- [ ] Enterprise: $749/month, $7,490/year
- [ ] Elite: $1,499/month, $14,990/year

### 2. Test Subscription Flow
- [ ] Test checkout for each tier
- [ ] Verify webhook delivery to all modules
- [ ] Test subscription upgrades/downgrades
- [ ] Test cancellation flow

### 3. Cross-Module Feature Access
- [ ] Verify subscription status syncs across modules
- [ ] Test feature gating in each module
- [ ] Verify usage tracking works correctly

### 4. Analytics & Monitoring
- [ ] Set up subscription analytics dashboard
- [ ] Monitor failed payment webhooks
- [ ] Track conversion rates by tier

## Production URLs

### Stripe Success/Cancel URLs
```bash
# Main App
STRIPE_SUCCESS_URL=https://globalrepspheres.com/success
STRIPE_CANCEL_URL=https://globalrepspheres.com/pricing

# SphereOS CRM  
STRIPE_SUCCESS_URL=https://sphereoscrm.netlify.app/subscribe/success
STRIPE_CANCEL_URL=https://sphereoscrm.netlify.app/subscribe/cancel

# Canvas Header
STRIPE_SUCCESS_URL=https://canvasheader.netlify.app/dashboard?subscription=success  
STRIPE_CANCEL_URL=https://canvasheader.netlify.app/pricing?subscription=canceled

# Market Data
STRIPE_SUCCESS_URL=https://market-data-jg.netlify.app/dashboard
STRIPE_CANCEL_URL=https://market-data-jg.netlify.app/pricing
```

## Webhook Configuration

Set up a single webhook endpoint that handles all subscription events:
- URL: `https://your-main-domain.com/.netlify/functions/stripe-webhook`
- Events: `customer.subscription.*`, `invoice.payment_succeeded`, `invoice.payment_failed`

The webhook should update subscription status in Supabase, which all modules will read from.

## Database Schema

Ensure your Supabase `user_profiles` table has this structure:
```sql
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  stripe_customer_id TEXT,
  subscription JSONB DEFAULT '{
    "tier": "explorer",
    "status": "inactive",
    "usage": {
      "canvas": {"creditsUsed": 0, "magicLinksUsed": 0},
      "sphereOs": {"callMinutesUsed": 0, "contactsStored": 0},
      "marketData": {"aiQueriesUsed": 0, "exportsGenerated": 0}
    }
  }'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Security Notes

1. **Never expose secret keys** in client-side code
2. **Validate all webhook signatures** using `STRIPE_WEBHOOK_SECRET`
3. **Use environment-specific URLs** (staging vs production)
4. **Regularly rotate API keys** and update all modules
5. **Monitor for unauthorized API usage**

## Support & Maintenance

- Monitor Stripe dashboard for failed payments
- Set up alerts for webhook delivery failures  
- Regularly review subscription analytics
- Update price IDs if plans change
- Test subscription flows after any deployment