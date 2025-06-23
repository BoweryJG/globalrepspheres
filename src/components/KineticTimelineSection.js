import React from 'react';

const KineticTimelineSection = () => {
  return (
    <section className="timeline-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textAlign: 'center', marginBottom: '80px' }}>
          While They React,<br/>
          <span className="gradient-text">We Predict</span>
        </h2>

        {/* Timeline Step 1: Detection */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': 'var(--green-accent)' }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': 'var(--green-accent)', '--icon-secondary': 'var(--cyan-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#practice-scanner"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              00:00:01 - New Practice Detected
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Alexis Sterling AI spots a new dermatology clinic opening in Charlotte 
              before their business license is even public. Social chatter, permit 
              filings, and contractor activity painted the picture 47 days early.
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[SIGNAL DETECTED]</div>
                <div>Entity: Charlotte Dermatology Associates</div>
                <div>Confidence: 94.2%</div>
                <div>Lead Time: 47 days</div>
                <div>Revenue Potential: $2.4M/yr</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--green-accent)' }}>
              The 47-Day Head Start
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
              Before they've chosen their EMR, before they've hired their first 
              receptionist, before your competition even knows they exist—RepSpheres 
              has already mapped their entire operation.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Our AI tracks contractor permits, equipment deliveries, job postings, 
              and social media breadcrumbs. By the time they open, we know their 
              specialties, their tech stack preferences, and their operational gaps.
            </p>
          </div>
        </div>

        {/* Timeline Step 2: Enrichment */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': 'var(--purple-primary)' }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': 'var(--purple-primary)', '--icon-secondary': 'var(--blue-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#alexis-sterling-ai"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              00:00:12 - Deep Intelligence Mapping
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Alexis Sterling AI cross-references LinkedIn profiles, medical school 
              affiliations, and publication history. We discover Dr. Sarah Chen, 
              the lead physician, specializes in cosmetic dermatology with a 
              preference for cutting-edge laser treatments.
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[PROFILE ENRICHED]</div>
                <div>Primary Decision Maker: Dr. Sarah Chen</div>
                <div>Technology Affinity: 92%</div>
                <div>Growth Indicators: High</div>
                <div>Integration Needs: EMR, Billing, Marketing</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--purple-primary)' }}>
              Beyond Surface Intelligence
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
              We don't just know they exist—we understand their ambitions. Dr. Chen's 
              recent conference attendance, her published papers on patient engagement, 
              her team's certifications. Every data point builds a complete picture.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Our AI predicts their pain points before they experience them. We know 
              they'll struggle with appointment scheduling inefficiencies by month two, 
              based on their staffing model and expected patient volume.
            </p>
          </div>
        </div>

        {/* Timeline Step 3: Action */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': 'var(--orange-accent)' }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': 'var(--orange-accent)', '--icon-secondary': 'var(--yellow-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#ai-deployment"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              00:01:23 - Perfect Timing Execution
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Three days before their soft launch, when they're overwhelmed with 
              last-minute preparations, our perfectly crafted outreach arrives. 
              Not a sales pitch—a case study on how a similar clinic in Austin 
              reduced no-shows by 34% using our platform.
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[ENGAGEMENT DEPLOYED]</div>
                <div>Channel: Direct Email + LinkedIn</div>
                <div>Personalization Score: 97%</div>
                <div>Open Rate: 100%</div>
                <div>Response Time: 4 hours</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--orange-accent)' }}>
              The Unfair Advantage
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
              While competitors cold-call with generic pitches, we arrive as trusted 
              advisors. We know their challenges, speak their language, and offer 
              solutions to problems they're just beginning to recognize.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Result? A 15-minute discovery call scheduled for their second week of 
              operations. By the time traditional sales teams learn they exist, we're 
              already implementing our solution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KineticTimelineSection;