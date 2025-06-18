/**
 * RepSpheres Professional Email Aliases
 * All aliases forward to the main email account
 */

export const REPSPHERES_ALIASES = {
  // Executive & Leadership
  'jason@repspheres.com': {
    name: 'Jason Golden',
    role: 'CEO & Founder',
    signature: 'CEO & Founder, RepSpheres'
  },
  'jgolden@repspheres.com': {
    name: 'Jason Golden',
    role: 'Chief Executive Officer',
    signature: 'Chief Executive Officer'
  },
  
  // General Communication
  'hello@repspheres.com': {
    name: 'RepSpheres Team',
    role: 'General Inquiries',
    signature: 'The RepSpheres Team'
  },
  'info@repspheres.com': {
    name: 'RepSpheres Info',
    role: 'Information Desk',
    signature: 'RepSpheres Information'
  },
  'contact@repspheres.com': {
    name: 'RepSpheres Contact',
    role: 'Contact Team',
    signature: 'RepSpheres Contact Team'
  },
  
  // Support & Service
  'support@repspheres.com': {
    name: 'RepSpheres Support',
    role: 'Customer Support',
    signature: 'RepSpheres Support Team'
  },
  'help@repspheres.com': {
    name: 'RepSpheres Help',
    role: 'Help Desk',
    signature: 'RepSpheres Help Team'
  },
  
  // Sales & Business Development
  'sales@repspheres.com': {
    name: 'RepSpheres Sales',
    role: 'Sales Team',
    signature: 'RepSpheres Sales Team'
  },
  'enterprise@repspheres.com': {
    name: 'Enterprise Sales',
    role: 'Enterprise Solutions',
    signature: 'RepSpheres Enterprise Team'
  },
  'partnerships@repspheres.com': {
    name: 'Partnerships Team',
    role: 'Strategic Partnerships',
    signature: 'RepSpheres Partnerships'
  },
  
  // Specialized Teams
  'elite@repspheres.com': {
    name: 'NEXUS Team',
    role: 'NEXUS Elite Program',
    signature: 'RepSpheres NEXUS Team'
  },
  'nexus@repspheres.com': {
    name: 'NEXUS Program',
    role: 'NEXUS Applications',
    signature: 'NEXUS Elite Program'
  },
  'onboarding@repspheres.com': {
    name: 'Onboarding Team',
    role: 'Customer Onboarding',
    signature: 'RepSpheres Onboarding'
  },
  
  // Administrative
  'billing@repspheres.com': {
    name: 'Billing Department',
    role: 'Billing & Payments',
    signature: 'RepSpheres Billing'
  },
  'legal@repspheres.com': {
    name: 'Legal Department',
    role: 'Legal Affairs',
    signature: 'RepSpheres Legal'
  },
  
  // Automated & System
  'noreply@repspheres.com': {
    name: 'RepSpheres',
    role: 'Automated System',
    signature: 'RepSpheres Automated System'
  },
  'notifications@repspheres.com': {
    name: 'RepSpheres Notifications',
    role: 'System Notifications',
    signature: 'RepSpheres Notifications'
  },
  'welcome@repspheres.com': {
    name: 'RepSpheres Welcome',
    role: 'Welcome Team',
    signature: 'Welcome to RepSpheres!'
  }
};

// Get all available aliases
export const getAliases = () => Object.keys(REPSPHERES_ALIASES);

// Get alias details
export const getAliasDetails = (email) => REPSPHERES_ALIASES[email] || null;

// Get formatted sender name for an alias
export const getFormattedSender = (email) => {
  const alias = REPSPHERES_ALIASES[email];
  return alias ? `${alias.name} <${email}>` : email;
};

// Default email configuration
export const DEFAULT_FROM_EMAIL = 'noreply@repspheres.com';
export const DEFAULT_REPLY_TO = 'support@repspheres.com';

// Email templates for common scenarios
export const EMAIL_TEMPLATES = {
  WELCOME: {
    from: 'welcome@repspheres.com',
    subject: 'Welcome to RepSpheres! 🎯',
    template: 'welcome'
  },
  ENTERPRISE_INQUIRY_RECEIVED: {
    from: 'enterprise@repspheres.com',
    subject: 'We received your enterprise inquiry',
    template: 'enterprise-inquiry-received'
  },
  ENTERPRISE_INQUIRY_INTERNAL: {
    from: 'notifications@repspheres.com',
    to: 'jason@repspheres.com',
    subject: 'New Enterprise Inquiry',
    template: 'enterprise-inquiry-internal'
  },
  NEXUS_APPLICATION_RECEIVED: {
    from: 'nexus@repspheres.com',
    subject: 'NEXUS Elite Application Received',
    template: 'nexus-application-received'
  },
  NEXUS_APPLICATION_INTERNAL: {
    from: 'notifications@repspheres.com',
    to: 'jason@repspheres.com',
    subject: 'New NEXUS Elite Application',
    template: 'nexus-application-internal'
  },
  SUBSCRIPTION_CONFIRMATION: {
    from: 'billing@repspheres.com',
    subject: 'Subscription Confirmed',
    template: 'subscription-confirmation'
  },
  SUBSCRIPTION_CANCELLED: {
    from: 'billing@repspheres.com',
    subject: 'Subscription Cancelled',
    template: 'subscription-cancelled'
  }
};