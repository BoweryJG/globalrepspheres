import React, { useState, useEffect } from 'react';

const KineticTimelineSection = () => {
  const [currentScenario, setCurrentScenario] = useState(0);

  const scenarios = [
    {
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
    },
    {
      id: 2,
      timestamp: "00:00:08",
      title: "Facebook Posting Pattern Analysis",
      subtitle: "Digital Behavior Intelligence",
      description: "AI analyzes Dr. Martinez's Facebook posts frequency dropping 60% + Instagram stories about 'big changes coming' + sudden increase in medical conference posts + LinkedIn profile updates. Predicts she's planning practice expansion requiring new equipment.",
      advantage: "23-day advantage",
      display: {
        status: "EXPANSION SIGNALS DETECTED",
        data: [
          "Doctor: Dr. Martinez",
          "Facebook Activity: -60%",
          "Instagram Hints: 'Big changes coming'",
          "LinkedIn Updates: 3 in 2 weeks",
          "Expansion Probability: 89%",
          "Equipment Need: $400K-600K"
        ]
      },
      color: "var(--blue-accent)"
    },
    {
      id: 3,
      timestamp: "00:00:15",
      title: "Doctor Behavior Surveillance",
      subtitle: "Personal Life Intelligence",
      description: "AI tracks Dr. Wilson's Facebook posts about his daughter's college tuition + Instagram photos of expensive vacation + LinkedIn posts about 'practice growth' + credit card data showing financial stress. Predicts he needs revenue-generating equipment purchase.",
      advantage: "31-day advantage",
      display: {
        status: "FINANCIAL PRESSURE DETECTED",
        data: [
          "Doctor: Dr. Wilson",
          "Stressor: Daughter's college tuition",
          "Vacation Expense: $15K recent",
          "Revenue Need: Critical",
          "Equipment Interest: High-ROI devices",
          "Purchase Timeline: 31 days"
        ]
      },
      color: "var(--purple-primary)"
    },
    {
      id: 4,
      timestamp: "00:00:22",
      title: "Staff Movement Tracking",
      subtitle: "Personnel Intelligence",
      description: "AI monitors LinkedIn job changes + Facebook posts about 'new opportunities' + Instagram stories from dental hygienists + Indeed job applications. Detects that Smile Dental's entire staff is job hunting, forcing Dr. Park to offer higher salaries by buying efficiency equipment.",
      advantage: "18-day advantage",
      display: {
        status: "STAFF EXODUS DETECTED",
        data: [
          "Practice: Smile Dental",
          "Job Hunting Staff: 6 of 8",
          "Salary Pressure: +40%",
          "Efficiency Need: Critical",
          "Equipment Solution: Automation",
          "Timeline: 18 days"
        ]
      },
      color: "var(--orange-accent)"
    },
    {
      id: 5,
      timestamp: "00:00:29",
      title: "Insurance Reimbursement Correlation",
      subtitle: "Payment Pattern Analysis",
      description: "AI tracks insurance payment delays + Facebook posts from doctors about 'cash flow issues' + LinkedIn discussions about 'practice finances' + equipment lease payment patterns. Identifies 47 practices needing financing solutions.",
      advantage: "26-day advantage",
      display: {
        status: "CASH FLOW CRISIS CLUSTER",
        data: [
          "Affected Practices: 47",
          "Insurance Delays: 60+ days",
          "Financial Stress: High",
          "Financing Need: Immediate",
          "Opportunity Size: $3.2M",
          "Detection Advantage: 26 days"
        ]
      },
      color: "var(--red-accent)"
    },
    {
      id: 6,
      timestamp: "00:00:36",
      title: "Competitor Equipment Failure",
      subtitle: "Equipment Surveillance",
      description: "AI monitors service call requests + Facebook posts complaining about 'equipment issues' + LinkedIn discussions about 'downtime problems' + technician GPS patterns showing frequent visits. Predicts equipment failure creating sales opportunity.",
      advantage: "35-day advantage",
      display: {
        status: "EQUIPMENT FAILURE IMMINENT",
        data: [
          "Practice: Ocean View Dental",
          "Service Calls: 8 in 2 weeks",
          "Downtime: 40% increase",
          "Technician Visits: Daily",
          "Failure Probability: 94%",
          "Replacement Need: $280K"
        ]
      },
      color: "var(--cyan-accent)"
    },
    {
      id: 7,
      timestamp: "00:00:43",
      title: "Partnership Formation Detection",
      subtitle: "Relationship Intelligence",
      description: "AI tracks Facebook friend connections + Instagram photo tags + LinkedIn professional connections + shared conference attendance + joint Facebook posts. Detects Dr. Johnson and Dr. Kim planning partnership, doubling equipment needs.",
      advantage: "29-day advantage",
      display: {
        status: "PARTNERSHIP FORMING",
        data: [
          "Doctors: Dr. Johnson + Dr. Kim",
          "Relationship Strength: High",
          "Joint Planning: Confirmed",
          "Equipment Needs: Double",
          "Combined Budget: $1.6M",
          "Announcement: 29 days"
        ]
      },
      color: "var(--yellow-accent)"
    },
    {
      id: 8,
      timestamp: "00:00:50",
      title: "Patient Demand Surge Prediction",
      subtitle: "Market Intelligence",
      description: "AI analyzes Facebook health groups + Instagram beauty trends + TikTok viral videos + Google search patterns + celebrity treatment posts. Predicts 300% increase in lip filler demand after celebrity influence spreads.",
      advantage: "22-day advantage",
      display: {
        status: "DEMAND SURGE INCOMING",
        data: [
          "Treatment: Lip Fillers",
          "Trigger: Celebrity influence",
          "Demand Increase: 300%",
          "Market Impact: $4.8M",
          "Preparation Time: 22 days",
          "Equipment Shortage: Likely"
        ]
      },
      color: "var(--pink-accent)"
    },
    {
      id: 9,
      timestamp: "00:00:57",
      title: "Regulatory Change Impact",
      subtitle: "Compliance Intelligence",
      description: "AI monitors FDA meetings + regulatory filings + medical board discussions + Facebook posts from device manufacturers + LinkedIn regulatory updates. Predicts new compliance requirements forcing equipment upgrades.",
      advantage: "19-day advantage",
      display: {
        status: "REGULATORY CHANGE COMING",
        data: [
          "Requirement: New safety standards",
          "Affected Equipment: Class II devices",
          "Compliance Cost: $150K-300K",
          "Implementation: 90 days",
          "Affected Practices: 2,400",
          "Early Warning: 19 days"
        ]
      },
      color: "var(--teal-accent)"
    },
    {
      id: 10,
      timestamp: "00:01:04",
      title: "Demographic Shift Detection",
      subtitle: "Population Intelligence",
      description: "AI tracks Facebook location check-ins + Instagram geo-tags + real estate transactions + school enrollment + LinkedIn job changes + moving company data. Detects 1,200 affluent families moving to Frisco, Texas, creating $8M aesthetic market opportunity.",
      advantage: "38-day advantage",
      display: {
        status: "DEMOGRAPHIC GOLDMINE",
        data: [
          "Location: Frisco, Texas",
          "New Residents: 1,200 families",
          "Income Level: $250K+ average",
          "Market Opportunity: $8M",
          "Competition: Minimal",
          "Discovery Advantage: 38 days"
        ]
      },
      color: "var(--violet-accent)"
    }
  ];

  // Manual scenario navigation
  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length);
  };

  const current = scenarios[currentScenario];

  return (
    <section className="timeline-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textAlign: 'center', marginBottom: '80px' }}>
          While They React,<br/>
          <span className="gradient-text">We Predict</span>
        </h2>

        {/* Rotating AI Surveillance Scenario */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': current.color }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': current.color, '--icon-secondary': 'var(--cyan-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#ai-surveillance"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              {current.timestamp} - {current.title}
            </h3>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: current.color, fontWeight: 600 }}>
              {current.subtitle}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {current.description}
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[{current.display.status}]</div>
                {current.display.data.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: current.color }}>
              The {current.advantage}
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

        {/* Scenario Navigation Button */}
        <div style={{ textAlign: 'center', margin: '60px 0' }}>
          <button
            onClick={nextScenario}
            style={{
              background: 'linear-gradient(135deg, var(--electric-blue), var(--neon-cyan))',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.3)';
            }}
          >
            ⚡ See Another Scenario ({currentScenario + 1}/{scenarios.length})
          </button>
        </div>

        {/* Timeline Step 2: Enrichment */}
        <div className="timeline-step">
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': scenarios[(currentScenario + 1) % scenarios.length].color }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': scenarios[(currentScenario + 1) % scenarios.length].color, '--icon-secondary': 'var(--blue-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#alexis-sterling-ai"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              {scenarios[(currentScenario + 1) % scenarios.length].timestamp} - {scenarios[(currentScenario + 1) % scenarios.length].title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {scenarios[(currentScenario + 1) % scenarios.length].description}
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[{scenarios[(currentScenario + 1) % scenarios.length].display.status}]</div>
                {scenarios[(currentScenario + 1) % scenarios.length].display.data.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: scenarios[(currentScenario + 1) % scenarios.length].color }}>
              The {scenarios[(currentScenario + 1) % scenarios.length].advantage}
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
          <div className="premium-panel" style={{ padding: '50px', '--accent-color': scenarios[(currentScenario + 2) % scenarios.length].color }}>
            <div className="panel-accent-line"></div>
            <div className="corner-screw" style={{ top: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ top: '15px', right: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', left: '15px' }}></div>
            <div className="corner-screw" style={{ bottom: '15px', right: '15px' }}></div>
            
            <div className="icon-container" style={{ '--icon-primary': scenarios[(currentScenario + 2) % scenarios.length].color, '--icon-secondary': 'var(--yellow-accent)', marginBottom: '30px' }}>
              <div className="custom-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#ai-deployment"/>
                </svg>
              </div>
            </div>
            
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}>
              {scenarios[(currentScenario + 2) % scenarios.length].timestamp} - {scenarios[(currentScenario + 2) % scenarios.length].title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {scenarios[(currentScenario + 2) % scenarios.length].description}
            </p>
            
            <div className="digital-display" style={{ marginTop: '30px', padding: '20px', borderRadius: '12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--matrix-green)' }}>
                <div style={{ opacity: 0.8 }}>[{scenarios[(currentScenario + 2) % scenarios.length].display.status}]</div>
                {scenarios[(currentScenario + 2) % scenarios.length].display.data.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: scenarios[(currentScenario + 2) % scenarios.length].color }}>
              The {scenarios[(currentScenario + 2) % scenarios.length].advantage}
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