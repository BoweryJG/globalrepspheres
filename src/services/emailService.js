/**
 * Email Service
 * Handles all email-related API calls to the backend
 */

import { API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../config/api';
import { EMAIL_TEMPLATES } from '../config/repspheresEmails';

class EmailService {
  /**
   * Send a single email
   * @param {Object} emailData - Email data
   * @param {string} emailData.to - Recipient email
   * @param {string} emailData.subject - Email subject
   * @param {string} emailData.html - HTML content
   * @param {string} emailData.text - Plain text content (optional)
   * @param {string} emailData.from - Sender email (optional)
   * @param {string} token - Auth token
   */
  async sendEmail(emailData, token) {
    const response = await fetch(API_ENDPOINTS.EMAIL_SEND, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(emailData)
    });
    
    return handleApiResponse(response);
  }

  /**
   * Send email as RepSpheres alias
   * @param {Object} emailData - Email data
   * @param {string} aliasEmail - RepSpheres alias email to send from
   * @param {string} token - Auth token
   */
  async sendAsRepSpheres(emailData, aliasEmail, token) {
    const response = await fetch(API_ENDPOINTS.EMAIL_SEND_AS_REPSPHERES, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        ...emailData,
        fromAlias: aliasEmail
      })
    });
    
    return handleApiResponse(response);
  }

  /**
   * Send bulk emails
   * @param {Array} recipients - Array of recipient objects
   * @param {Object} emailTemplate - Email template data
   * @param {string} token - Auth token
   */
  async sendBulkEmails(recipients, emailTemplate, token) {
    const response = await fetch(API_ENDPOINTS.EMAIL_BULK, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        recipients,
        template: emailTemplate
      })
    });
    
    return handleApiResponse(response);
  }

  /**
   * Create and send email campaign
   * @param {Object} campaignData - Campaign data
   * @param {string} token - Auth token
   */
  async createCampaign(campaignData, token) {
    const response = await fetch(API_ENDPOINTS.EMAIL_CAMPAIGN, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(campaignData)
    });
    
    return handleApiResponse(response);
  }

  /**
   * Get email statistics
   * @param {string} token - Auth token
   */
  async getEmailStats(token) {
    const response = await fetch(API_ENDPOINTS.EMAIL_STATS, {
      headers: getAuthHeaders(token)
    });
    
    return handleApiResponse(response);
  }

  /**
   * Get available email aliases
   * @param {string} token - Auth token
   */
  async getAliases(token) {
    const response = await fetch(API_ENDPOINTS.EMAIL_ALIASES, {
      headers: getAuthHeaders(token)
    });
    
    return handleApiResponse(response);
  }

  /**
   * Send enterprise inquiry notification
   * @param {Object} inquiryData - Inquiry form data
   */
  async sendEnterpriseInquiry(inquiryData) {
    // Send to the user
    const userEmailPromise = this.sendEmail({
      to: inquiryData.email,
      ...EMAIL_TEMPLATES.ENTERPRISE_INQUIRY_RECEIVED,
      html: this.generateEnterpriseInquiryUserEmail(inquiryData),
      text: `Thank you for your interest in RepSpheres Enterprise. We've received your inquiry and will get back to you within 24 hours.`
    });

    // Send internal notification
    const internalEmailPromise = this.sendEmail({
      ...EMAIL_TEMPLATES.ENTERPRISE_INQUIRY_INTERNAL,
      html: this.generateEnterpriseInquiryInternalEmail(inquiryData),
      text: `New enterprise inquiry from ${inquiryData.name} (${inquiryData.company})`
    });

    // Also submit to backend endpoint
    const backendPromise = fetch(API_ENDPOINTS.ENTERPRISE_INQUIRY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });

    await Promise.all([userEmailPromise, internalEmailPromise, backendPromise]);
  }

  /**
   * Send NEXUS application notification
   * @param {Object} applicationData - Application form data
   */
  async sendNexusApplication(applicationData) {
    // Send to the applicant
    const userEmailPromise = this.sendEmail({
      to: applicationData.email,
      ...EMAIL_TEMPLATES.NEXUS_APPLICATION_RECEIVED,
      html: this.generateNexusApplicationUserEmail(applicationData),
      text: `Thank you for applying to the RepSpheres NEXUS Elite program. We'll review your application and get back to you soon.`
    });

    // Send internal notification
    const internalEmailPromise = this.sendEmail({
      ...EMAIL_TEMPLATES.NEXUS_APPLICATION_INTERNAL,
      html: this.generateNexusApplicationInternalEmail(applicationData),
      text: `New NEXUS application from ${applicationData.name}`
    });

    // Also submit to backend endpoint
    const backendPromise = fetch(API_ENDPOINTS.ELITE_APPLICATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData)
    });

    await Promise.all([userEmailPromise, internalEmailPromise, backendPromise]);
  }

  // Email template generators
  generateEnterpriseInquiryUserEmail(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Thank You for Your Interest in RepSpheres Enterprise</h2>
        <p>Dear ${data.name},</p>
        <p>We've received your enterprise inquiry and appreciate your interest in RepSpheres. Our team will review your requirements and get back to you within 24 hours.</p>
        
        <h3>Your Inquiry Details:</h3>
        <ul>
          <li><strong>Company:</strong> ${data.company}</li>
          <li><strong>Team Size:</strong> ${data.teamSize}</li>
          <li><strong>Industry:</strong> ${data.industry || 'Not specified'}</li>
        </ul>
        
        <p>In the meantime, feel free to explore our enterprise features at <a href="https://repspheres.com/enterprise">repspheres.com/enterprise</a></p>
        
        <p>Best regards,<br>
        The RepSpheres Enterprise Team</p>
      </div>
    `;
  }

  generateEnterpriseInquiryInternalEmail(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Enterprise Inquiry</h2>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
          <li><strong>Company:</strong> ${data.company}</li>
        </ul>
        
        <h3>Company Details:</h3>
        <ul>
          <li><strong>Team Size:</strong> ${data.teamSize}</li>
          <li><strong>Industry:</strong> ${data.industry || 'Not specified'}</li>
          <li><strong>Use Case:</strong> ${data.useCase || 'Not specified'}</li>
        </ul>
        
        <h3>Message:</h3>
        <p>${data.message || 'No additional message'}</p>
        
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;
  }

  generateNexusApplicationUserEmail(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">NEXUS Elite Application Received</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for applying to the RepSpheres NEXUS Elite program. We're impressed by your interest in joining our most exclusive tier.</p>
        
        <p>Our team will carefully review your application based on:</p>
        <ul>
          <li>Your experience and achievements</li>
          <li>Alignment with NEXUS Elite criteria</li>
          <li>Current program capacity</li>
        </ul>
        
        <p>We'll notify you of our decision within 5-7 business days.</p>
        
        <p>Best regards,<br>
        The RepSpheres NEXUS Team</p>
      </div>
    `;
  }

  generateNexusApplicationInternalEmail(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New NEXUS Elite Application</h2>
        
        <h3>Applicant Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
          <li><strong>Location:</strong> ${data.location || 'Not specified'}</li>
        </ul>
        
        <h3>Professional Background:</h3>
        <ul>
          <li><strong>Current Role:</strong> ${data.currentRole || 'Not specified'}</li>
          <li><strong>Company:</strong> ${data.company || 'Not specified'}</li>
          <li><strong>Years of Experience:</strong> ${data.experience || 'Not specified'}</li>
          <li><strong>LinkedIn:</strong> ${data.linkedin || 'Not provided'}</li>
        </ul>
        
        <h3>Application Details:</h3>
        <p><strong>Why NEXUS:</strong> ${data.whyNexus || 'Not provided'}</p>
        <p><strong>Achievements:</strong> ${data.achievements || 'Not provided'}</p>
        
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;
  }
}

export default new EmailService();