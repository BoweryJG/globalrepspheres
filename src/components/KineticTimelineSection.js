import React from 'react';

const KineticTimelineSection = () => {
  const scenario = {
    id: 1,
    timestamp: "00:00:01",
    title: "New Practice Opening Detection",
    subtitle: "Practice Birth Prediction",
    description: "AI monitors building permits + contractor LinkedIn posts + medical equipment delivery trucks + business license filings + job postings for 'medical receptionist' + Facebook posts about 'new office space.' Detects Dr. Sarah Chen opening Charlotte Dermatology Associates 47 days before competitors know it exists.",
    advantage: "47-day advantage",
    display: {
      status: "NEW PRACTICE DETECTED",
      data: [
        "Doctor: Dr. Sarah Chen",
        "Practice: Charlotte Dermatology Associates",
        "Location: Charlotte, NC",
        "Equipment Budget: $800K-1.2M",
        "Opening Date: 47 days",
        "Competitor Awareness: 0%"
      ]
    },
    color: "var(--green-accent)"
  };

  return (
    <section className="timeline-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textAlign: 'center', marginBottom: '80px' }}>
          While They React,<br/>
          <span className="gradient-text">We Predict</span>
        </h2>

        {/* AI Surveillance Scenario */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': scenario.color }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': scenario.color, '--icon-secondary': 'var(--cyan-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#ai-surveillance"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              {scenario.timestamp} - {scenario.title}
            </h3>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: scenario.color, fontWeight: 600 }}>
              {scenario.subtitle}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {scenario.description}
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[{scenario.display.status}]</div>
                {scenario.display.data.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: scenario.color }}>
              The {scenario.advantage}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
              While competitors rely on outdated methods, RepSpheres AI processes millions of data points 
              from social media, public records, industry databases, and behavioral patterns to predict 
              opportunities before they become obvious.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              This is the unfair advantage that separates top 1% sales performers from everyone else. 
              When you arrive with intelligence this deep, you're not selling—you're solving problems 
              they didn't even know they had.
            </p>
          </div>
        </div>

        {/* Timeline Step 2: Enrichment */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': 'var(--blue-accent)' }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': 'var(--blue-accent)', '--icon-secondary': 'var(--blue-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#alexis-sterling-ai"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              00:00:08 - Data Enrichment & Intelligence
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              RepSpheres AI doesn't just detect opportunities—it builds complete intelligence profiles. 
              Every data point is cross-referenced, verified, and enriched with contextual information 
              to create actionable insights.
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[INTELLIGENCE ENRICHMENT COMPLETE]</div>
                <div>Contact Methods: 5 verified channels</div>
                <div>Decision Makers: 3 key stakeholders</div>
                <div>Budget Authority: Dr. Chen (confirmed)</div>
                <div>Timing Windows: 3 optimal contact periods</div>
                <div>Pain Points: 7 identified opportunities</div>
                <div>Competitive Intelligence: 2 active rivals</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--blue-accent)' }}>
              The Intelligence Advantage
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
              We don't just know they exist—we understand their ambitions. Every data point builds 
              a complete picture from multiple intelligence sources working in perfect synchronization.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Our AI predicts their pain points before they experience them. We know their challenges, 
              their opportunities, and their timing better than they do.
            </p>
          </div>
        </div>

        {/* Timeline Step 3: Action */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': 'var(--purple-primary)' }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': 'var(--purple-primary)', '--icon-secondary': 'var(--yellow-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#ai-deployment"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              00:00:15 - Precision Deployment
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Armed with deep intelligence, RepSpheres deploys personalized outreach at the perfect moment. 
              Every message is crafted based on the prospect's current situation, immediate needs, and 
              decision-making patterns.
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[DEPLOYMENT INITIATED]</div>
                <div>Outreach Channel: LinkedIn + Email</div>
                <div>Message Tone: Consultative/Advisory</div>
                <div>Timing: Tuesday 10:15 AM (optimal)</div>
                <div>Follow-up Sequence: 5-touch cadence</div>
                <div>Success Probability: 87%</div>
                <div>Expected Response: 24-48 hours</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--purple-primary)' }}>
              The Precision Strike
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
              While competitors cold-call with generic pitches, we arrive as trusted 
              advisors. We know their challenges, speak their language, and offer 
              solutions to problems they're just beginning to recognize.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Result? Perfect timing, perfect message, perfect opportunity. By the time traditional 
              sales teams learn they exist, we're already implementing our solution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KineticTimelineSection;