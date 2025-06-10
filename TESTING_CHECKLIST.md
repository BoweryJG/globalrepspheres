# RepSpheres Production Testing Checklist

## Pre-Launch Testing

### Homepage Flow
- [ ] Homepage loads with all 6 sections
- [ ] Live counter in HeroTransformationSection animates
- [ ] All section animations work on scroll
- [ ] Mobile responsive design works properly

### Pricing Section
- [ ] Monthly/Annual toggle switches prices correctly
- [ ] All 5 pricing tiers display with correct prices
- [ ] Loading states appear when clicking subscription buttons
- [ ] "Book a Demo" button links to /demo

### Stripe Integration
For each pricing tier (Explorer, Professional, Growth, Enterprise):
- [ ] Click subscription button
- [ ] Loading state shows "Processing..."
- [ ] Redirects to Stripe checkout
- [ ] Success URL goes to /success page
- [ ] Cancel URL goes to /cancel page

### Elite Tier
- [ ] Elite "Apply Now" button goes to /elite-application
- [ ] Application form validates required fields
- [ ] Form submission shows success message

### Static Pages
- [ ] /demo - Demo booking form works
- [ ] /contact-sales - Enterprise inquiry form works
- [ ] /success - Shows after successful payment
- [ ] /cancel - Shows after cancelled payment
- [ ] /elite-application - Elite application form works

### Error Handling
- [ ] Test with backend URL down (should show error alert)
- [ ] Test with no internet (should show connection error)
- [ ] Test invalid Stripe price IDs (should show error)

### Multi-App Navigation
- [ ] /workspace/* routes work
- [ ] /market/* routes work
- [ ] /crm/* routes work
- [ ] /conversation-analysis/* routes work

## Backend Verification
- [ ] Verify https://osbackend-zl1h.onrender.com is running
- [ ] Test /create-checkout-session endpoint
- [ ] Verify Stripe webhook handling
- [ ] Check session verification endpoint

## Production Deployment
1. Commit all changes: `git add . && git commit -m "Production-ready checkout flow"`
2. Push to GitHub: `git push origin main`
3. Verify Netlify auto-deployment
4. Test live site with real Stripe test mode
5. Switch to Stripe live mode when ready

## Important Notes
- Backend URL is set in .env: `REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com`
- All static HTML pages are in `/public` folder
- No React Router needed - using static HTML pages
- Netlify _redirects file handles multi-app routing