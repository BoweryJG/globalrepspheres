# Google Analytics Setup Guide

## Current Setup

This project uses Google Analytics 4 (GA4) with the measurement ID: `G-FBZBYE0D17`

## Configuration

1. **Environment Variable**: The GA4 measurement ID is stored in the `.env` file:
   ```
   REACT_APP_GA_ID=G-FBZBYE0D17
   ```

2. **Implementation**: Analytics is initialized in `src/analytics.js` using the `react-ga4` package.

3. **Initialization**: Analytics is automatically initialized when the app loads in `src/index.js`.

## Features Implemented

- **Page View Tracking**: Automatically tracks all page views
- **Event Tracking**: Custom functions for tracking:
  - Button clicks
  - Form submissions
  - Scroll depth
  - External link clicks

## Usage in Components

```javascript
import { logButtonClick, logEvent } from '../analytics';

// Track button clicks
<button onClick={() => logButtonClick('CTA Button', 'Hero Section')}>
  Click Me
</button>

// Track custom events
logEvent('Category', 'Action', 'Label', value);
```

## Testing

1. In development, you can see analytics events in the browser console
2. In production, events will appear in your Google Analytics dashboard within 24 hours

## Troubleshooting

- Make sure the `.env` file exists with the correct GA ID
- Restart the development server after adding/changing the `.env` file
- Check the browser console for any analytics initialization errors
- Use the Google Analytics Debugger Chrome extension for testing

## Note for Deployment

When deploying to production (e.g., Netlify, Vercel):
- Add `REACT_APP_GA_ID=G-FBZBYE0D17` to your environment variables in the deployment platform
- The `.env` file is not committed to git for security reasons