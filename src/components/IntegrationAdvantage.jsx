import React, { useEffect, useRef } from 'react';
import './IntegrationAdvantage.css';

const IntegrationAdvantage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="integration-advantage" ref={containerRef}>
      <div className="integration-container">
        {/* Main Headline */}
        <div className="headline-wrapper animate-on-scroll">
          <h1 className="main-headline">
            We Don't Replace Your Tools.
            <span className="highlight"> We Make Them Infinitely Smarter.</span>
          </h1>
        </div>

        {/* CRM Integration Showcase */}
        <div className="crm-showcase animate-on-scroll">
          <div className="crm-logos">
            <div className="crm-logo hubspot">
              <img src="/assets/hubspot-logo.svg" alt="HubSpot" />
              <div className="enhancement-effect"></div>
            </div>
            
            <div className="sync-visualization">
              <div className="sync-arrow">
                <div className="arrow-line"></div>
                <div className="sync-text">One-Click Sync</div>
                <div className="data-particles">
                  <span className="particle"></span>
                  <span className="particle"></span>
                  <span className="particle"></span>
                </div>
              </div>
            </div>

            <div className="crm-logo salesforce">
              <img src="/assets/salesforce-logo.svg" alt="Salesforce" />
              <div className="enhancement-effect"></div>
            </div>
          </div>

          <div className="integration-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V12C2 16.55 4.84 20.74 9 22.35V20.03C6.17 18.63 4 15.52 4 12V8.27L12 4.44L20 8.27V12C20 12.68 19.94 13.34 19.82 13.98C20.53 14.25 21.19 14.6 21.82 15.03C21.94 14.36 22 13.69 22 13V7L12 2Z" fill="currentColor"/>
                  <path d="M15 16L18 19L23 14L21.59 12.59L18 16.17L16.41 14.59L15 16Z" fill="currentColor"/>
                </svg>
              </div>
              <h3>One-click sync to HubSpot, Salesforce, any CRM</h3>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Your company's investment, supercharged with AI intelligence</h3>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 7h9v2h-9zM13 15h9v2h-9zM16 11h6v2h-6zM13 12L8 7v4H2v2h6v4z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Same workflow, 10x better results</h3>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <h3>We're not the enemy of your sales stack. We're the upgrade.</h3>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="comparison-section animate-on-scroll">
          <div className="comparison-wrapper">
            <div className="before-side">
              <h3>Without RepSpheres</h3>
              <div className="metric-box">
                <div className="metric-value">50+</div>
                <div className="metric-label">Generic emails per day</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">2%</div>
                <div className="metric-label">Response rate</div>
              </div>
              <div className="email-visual">
                <div className="email-item generic">Generic Template</div>
                <div className="email-item generic">Generic Template</div>
                <div className="email-item generic">Generic Template</div>
              </div>
            </div>

            <div className="transformation-arrow">
              <div className="arrow-body">
                <span className="arrow-text">AI Enhancement</span>
              </div>
            </div>

            <div className="after-side">
              <h3>With RepSpheres</h3>
              <div className="metric-box enhanced">
                <div className="metric-value">1</div>
                <div className="metric-label">Perfect email at the perfect moment</div>
              </div>
              <div className="metric-box enhanced">
                <div className="metric-value">27%</div>
                <div className="metric-label">Response rate</div>
              </div>
              <div className="email-visual">
                <div className="email-item perfect">
                  <span className="email-icon">✨</span>
                  Personalized with AI Intelligence
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Development Section */}
        <div className="professional-development animate-on-scroll">
          <h2>Professional Development That Benefits Everyone</h2>
          <div className="development-grid">
            <div className="development-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Career development that benefits everyone</h3>
              <p>Align individual growth with company success through intelligence</p>
            </div>

            <div className="development-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Better rep performance = better company results</h3>
              <p>We align rep desires with company needs through intelligence, not disruption</p>
            </div>

            <div className="development-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Professional line separation that enhances existing systems</h3>
              <p>Keep your tools, multiply their effectiveness</p>
            </div>
          </div>
        </div>

        {/* Anti-Threat Messaging */}
        <div className="anti-threat animate-on-scroll">
          <div className="threat-message">
            <div className="quote-mark">"</div>
            <p>
              We don't send more emails. We send the <span className="highlight">RIGHT</span> email 
              at the <span className="highlight">PERFECT</span> moment with <span className="highlight">EXACTLY</span> what 
              they need to hear. That's not disruption. That's enhancement.
            </p>
            <div className="quote-mark end">"</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="integration-cta animate-on-scroll">
          <button className="cta-button primary">
            Supercharge Your CRM
            <span className="button-arrow">→</span>
          </button>
          <p className="cta-subtext">One-click integration. Zero disruption. Infinite intelligence.</p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationAdvantage;