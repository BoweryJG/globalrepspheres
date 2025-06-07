import ReactGA from 'react-ga4';

// Initialize Google Analytics 4
export function initAnalytics() {
  const measurementId = process.env.REACT_APP_GA_ID;
  
  if (!measurementId) {
    console.warn('REACT_APP_GA_ID not set in environment variables');
    return;
  }
  
  try {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        // Enable debug mode in development
        debug_mode: process.env.NODE_ENV === 'development'
      }
    });
    
    console.log('Google Analytics initialized with ID:', measurementId);
    
    // Track initial page view
    logPageView();
    
    // Listen for route changes
    window.addEventListener('popstate', logPageView);
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
}

// Log page views
export function logPageView() {
  const pagePath = window.location.pathname + window.location.search;
  ReactGA.send({ 
    hitType: 'pageview', 
    page: pagePath,
    title: document.title 
  });
}

// Log custom events
export function logEvent(category, action, label = null, value = null) {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
}

// Log button clicks
export function logButtonClick(buttonName, section = null) {
  logEvent('User Interaction', 'Button Click', buttonName, section);
}

// Log form submissions
export function logFormSubmission(formName, success = true) {
  logEvent('Form', success ? 'Submit Success' : 'Submit Error', formName);
}

// Log page scroll depth
export function logScrollDepth(percentage) {
  logEvent('Engagement', 'Scroll Depth', `${percentage}%`);
}

// Log external link clicks
export function logExternalLink(url) {
  logEvent('Outbound', 'Link Click', url);
}
