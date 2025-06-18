# RepSpheres Email Integration Guide

## Overview

This guide documents the email functionality implementation for RepSpheres, providing a professional email system with multiple providers, professional aliases, and comprehensive tracking.

## Architecture

### Frontend Components

1. **API Configuration** (`/src/config/api.js`)
   - Email endpoints for all email operations
   - Integration with backend at `osbackend-zl1h.onrender.com`

2. **Email Service** (`/src/services/emailService.js`)
   - Handles all email API calls
   - Email template generation
   - Form submission handling

3. **Professional Aliases** (`/src/config/repspheresEmails.js`)
   - 18+ professional email aliases (@repspheres.com)
   - Automated sender configuration
   - Email templates for common scenarios

### Email Endpoints

All email operations go through your backend API:

- `POST /api/emails/send` - Send single email
- `POST /api/emails/send-as-repspheres` - Send using RepSpheres alias
- `POST /api/emails/bulk` - Bulk email sending
- `POST /api/emails/campaign` - Campaign management
- `GET /api/emails/stats` - Email statistics
- `GET /api/emails/aliases` - List available aliases
- `POST /api/enterprise-inquiry` - Enterprise form submissions
- `POST /api/elite-application` - NEXUS Elite applications

## Backend Implementation Requirements

### 1. Install Dependencies

```bash
cd your-backend-directory
npm install nodemailer node-cron dotenv
```

### 2. Email Service Implementation

Create `/services/emailService.js` in your backend with:

```javascript
const nodemailer = require('nodemailer');
const cron = require('node-cron');

class EmailService {
  constructor() {
    this.emailAccounts = this.loadEmailAccounts();
    this.currentAccountIndex = 0;
    this.dailyCounts = {};
    
    // Reset counts daily at midnight
    cron.schedule('0 0 * * *', () => {
      this.dailyCounts = {};
    });
  }

  loadEmailAccounts() {
    const accounts = [];
    let i = 1;
    
    while (process.env[`GMAIL_EMAIL_${i}`]) {
      accounts.push({
        email: process.env[`GMAIL_EMAIL_${i}`],
        password: process.env[`GMAIL_APP_PASSWORD_${i}`],
        type: process.env[`GMAIL_TYPE_${i}`] || 'gmail',
        dailyLimit: process.env[`GMAIL_TYPE_${i}`] === 'workspace' ? 2000 : 500
      });
      i++;
    }
    
    return accounts;
  }

  async sendEmail(emailData) {
    const account = this.getNextAvailableAccount();
    
    if (!account) {
      throw new Error('No available email accounts with capacity');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: account.email,
        pass: account.password
      }
    });

    const result = await transporter.sendMail(emailData);
    
    // Update daily count
    this.dailyCounts[account.email] = (this.dailyCounts[account.email] || 0) + 1;
    
    // Log to database
    await this.logEmail(emailData, result, account.email);
    
    return result;
  }

  getNextAvailableAccount() {
    // Round-robin through accounts
    for (let i = 0; i < this.emailAccounts.length; i++) {
      const account = this.emailAccounts[this.currentAccountIndex];
      const dailyCount = this.dailyCounts[account.email] || 0;
      
      if (dailyCount < account.dailyLimit) {
        return account;
      }
      
      this.currentAccountIndex = (this.currentAccountIndex + 1) % this.emailAccounts.length;
    }
    
    return null;
  }

  async logEmail(emailData, result, sentFrom) {
    // Log to your Supabase database
    // Implementation depends on your database setup
  }
}

module.exports = new EmailService();
```

### 3. API Routes Implementation

Create email routes in your backend:

```javascript
const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');
const { REPSPHERES_ALIASES } = require('../config/repspheresEmails');

// Send single email
router.post('/api/emails/send', async (req, res) => {
  try {
    const result = await emailService.sendEmail(req.body);
    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send as RepSpheres alias
router.post('/api/emails/send-as-repspheres', async (req, res) => {
  try {
    const { fromAlias, ...emailData } = req.body;
    const aliasDetails = REPSPHERES_ALIASES[fromAlias];
    
    if (!aliasDetails) {
      return res.status(400).json({ error: 'Invalid alias' });
    }
    
    const result = await emailService.sendEmail({
      ...emailData,
      from: `${aliasDetails.name} <${fromAlias}>`,
      replyTo: fromAlias
    });
    
    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle enterprise inquiry
router.post('/api/enterprise-inquiry', async (req, res) => {
  try {
    const inquiryData = req.body;
    
    // Send confirmation to user
    await emailService.sendEmail({
      to: inquiryData.email,
      from: 'RepSpheres Enterprise <enterprise@repspheres.com>',
      subject: 'We received your enterprise inquiry',
      html: generateEnterpriseConfirmationEmail(inquiryData)
    });
    
    // Send notification to admin
    await emailService.sendEmail({
      to: 'jason@repspheres.com',
      from: 'RepSpheres Notifications <notifications@repspheres.com>',
      subject: 'New Enterprise Inquiry',
      html: generateEnterpriseNotificationEmail(inquiryData)
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle NEXUS application
router.post('/api/elite-application', async (req, res) => {
  try {
    const applicationData = req.body;
    
    // Send confirmation to applicant
    await emailService.sendEmail({
      to: applicationData.email,
      from: 'RepSpheres NEXUS <nexus@repspheres.com>',
      subject: 'NEXUS Elite Application Received',
      html: generateNexusConfirmationEmail(applicationData)
    });
    
    // Send notification to admin
    await emailService.sendEmail({
      to: 'jason@repspheres.com',
      from: 'RepSpheres Notifications <notifications@repspheres.com>',
      subject: 'New NEXUS Elite Application',
      html: generateNexusNotificationEmail(applicationData)
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 4. Database Schema

Add these tables to your Supabase database:

```sql
-- Email logs table
CREATE TABLE email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT,
  status TEXT NOT NULL,
  message_id TEXT,
  sent_from_account TEXT,
  metadata JSONB
);

-- Email campaigns table
CREATE TABLE email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  scheduled_for TIMESTAMP WITH TIME ZONE,
  template JSONB,
  recipients JSONB,
  stats JSONB
);

-- Create indexes
CREATE INDEX idx_email_logs_created_at ON email_logs(created_at);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
```

## Configuration Steps

### 1. Set Up Google Workspace/Gmail

1. Enable 2-factor authentication for each email account
2. Generate app-specific passwords:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in your .env file

### 2. Configure Domain Authentication

Add these DNS records to your domain:

```
# SPF Record
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com ~all

# DKIM (Enable in Google Workspace Admin)
Follow Google's DKIM setup guide

# DMARC Record
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@repspheres.com
```

### 3. Environment Variables

Copy `.env.email.example` to your backend's `.env` file and fill in:

```bash
# Primary email account
GMAIL_EMAIL_1=jason@repspheres.com
GMAIL_APP_PASSWORD_1=your-app-password-here
GMAIL_TYPE_1=workspace

# Add more accounts as needed
GMAIL_EMAIL_2=notifications@repspheres.com
GMAIL_APP_PASSWORD_2=your-app-password-here
GMAIL_TYPE_2=workspace

# API Key for email endpoints
EMAIL_API_KEY=generate-secure-random-string

# Your existing Supabase config
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-service-key
```

## Testing

### 1. Test Email Delivery

```javascript
// Test script for your backend
const emailService = require('./services/emailService');

async function testEmail() {
  try {
    const result = await emailService.sendEmail({
      to: 'test@example.com',
      from: 'RepSpheres Test <noreply@repspheres.com>',
      subject: 'Test Email',
      html: '<h1>Test</h1><p>This is a test email from RepSpheres.</p>'
    });
    
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmail();
```

### 2. Test Form Submissions

1. Submit enterprise inquiry form at `/contact-sales.html`
2. Submit NEXUS application at `/nexus-application.html`
3. Verify emails are received

## Professional Email Aliases

The system includes these professional aliases:

- **Leadership**: jason@, jgolden@
- **General**: hello@, info@, contact@
- **Support**: support@, help@
- **Sales**: sales@, enterprise@, partnerships@
- **Programs**: elite@, nexus@, onboarding@
- **Admin**: billing@, legal@
- **System**: noreply@, notifications@, welcome@

All aliases should be configured to forward to your main email account in Google Workspace.

## Monitoring & Maintenance

### Daily Monitoring
- Check email send counts: `/api/emails/stats`
- Monitor delivery rates in email logs
- Review failed emails and retry if needed

### Weekly Tasks
- Review email campaign performance
- Check spam scores using mail-tester.com
- Update email templates based on engagement

### Monthly Tasks
- Analyze email metrics
- Review and optimize sending patterns
- Update DNS records if needed

## Troubleshooting

### Common Issues

1. **"No available email accounts with capacity"**
   - Add more email accounts to rotation
   - Consider implementing Postal server for unlimited sends

2. **High bounce rates**
   - Verify email addresses before sending
   - Implement double opt-in for subscriptions
   - Check domain reputation

3. **Emails going to spam**
   - Ensure proper SPF/DKIM/DMARC setup
   - Avoid spam trigger words
   - Maintain good sender reputation

## Security Best Practices

1. **Never commit credentials**
   - Use environment variables
   - Keep .env files out of version control

2. **Validate all inputs**
   - Sanitize email addresses
   - Prevent email injection attacks

3. **Rate limiting**
   - Implement API rate limits
   - Prevent abuse of email endpoints

4. **Access control**
   - Require authentication for email APIs
   - Log all email operations

## Support

For additional help with email integration:
- Review backend logs for detailed error messages
- Check Google Workspace admin console for delivery issues
- Contact support@repspheres.com for assistance