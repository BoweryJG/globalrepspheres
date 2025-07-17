import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CanvasIntelligence = () => {
  const sectionRef = useRef(null);
  const npiLookupRef = useRef(null);
  const tonesRef = useRef([]);
  const reportsRef = useRef([]);
  const [currentDemo, setCurrentDemo] = useState('npi');
  const [isAnimating, setIsAnimating] = useState(false);

  const harvardTones = [
    {
      id: 'clinical',
      name: 'Clinical Authority',
      description: 'Evidence-based, peer-to-peer communication',
      example: 'Based on the latest NEJM data...',
      color: '#3b82f6'
    },
    {
      id: 'collaborative',
      name: 'Collaborative Partner',
      description: 'Solution-focused, team-oriented approach',
      example: 'Working together, we can improve...',
      color: '#10b981'
    },
    {
      id: 'efficiency',
      name: 'Efficiency Expert',
      description: 'Time-conscious, workflow optimization',
      example: 'This streamlines your current process...',
      color: '#f59e0b'
    },
    {
      id: 'innovation',
      name: 'Innovation Leader',
      description: 'Forward-thinking, breakthrough solutions',
      example: 'The next generation approach...',
      color: '#8b5cf6'
    },
    {
      id: 'patient',
      name: 'Patient Advocate',
      description: 'Outcome-focused, compassionate care',
      example: 'For your patients\' best outcomes...',
      color: '#ef4444'
    },
    {
      id: 'practical',
      name: 'Practical Advisor',
      description: 'Real-world, implementation-focused',
      example: 'In practice, this means...',
      color: '#06b6d4'
    }
  ];

  const mockDoctorData = {
    name: "Dr. Sarah Chen, MD",
    npi: "1234567890",
    specialty: "Cardiology",
    practice: "Metropolitan Heart Institute",
    volume: "High Volume Practice",
    interests: ["Heart Failure", "Preventive Cardiology", "Digital Health"],
    recentPubs: 3,
    preferredTone: "clinical"
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate demo switching
    const demoInterval = setInterval(() => {
      if (!isAnimating) {
        setCurrentDemo(prev => {
          const demos = ['npi', 'tones', 'reports'];
          const currentIndex = demos.indexOf(prev);
          return demos[(currentIndex + 1) % demos.length];
        });
      }
    }, 8000);

    // Main scroll animation
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => {
        // Animate canvas elements
        gsap.fromTo(npiLookupRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
      }
    });

    return () => {
      clearInterval(demoInterval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isAnimating]);

  const addToneRef = (el) => {
    if (el && !tonesRef.current.includes(el)) {
      tonesRef.current.push(el);
    }
  };

  const addReportRef = (el) => {
    if (el && !reportsRef.current.includes(el)) {
      reportsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="canvas-intelligence-section"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
        padding: 'clamp(100px, 15vh, 150px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Canvas network background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Main Canvas Headline */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            color: '#ffffff',
            textShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            CANVAS: INSTANT COMPLETE<br />
            <span style={{ color: '#3b82f6' }}>INTELLIGENCE</span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#cccccc',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            Any doctor. Any NPI number. Complete intelligence profile in seconds.
            6 Harvard-level communication styles. Mass personalization at infinite scale.
          </p>
        </div>

        {/* Demo Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'npi', label: 'NPI Lookup', icon: '🔍' },
            { id: 'tones', label: 'Harvard Tones', icon: '🎓' },
            { id: 'reports', label: 'Smart Reports', icon: '📊' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentDemo(tab.id)}
              style={{
                background: currentDemo === tab.id 
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : 'linear-gradient(135deg, rgba(60, 60, 60, 0.8), rgba(40, 40, 40, 0.9))',
                border: currentDemo === tab.id 
                  ? '2px solid #3b82f6' 
                  : '1px solid rgba(100, 100, 100, 0.3)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: currentDemo === tab.id 
                  ? '0 0 20px rgba(59, 130, 246, 0.4)' 
                  : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* NPI Lookup Demo */}
        {currentDemo === 'npi' && (
          <div 
            ref={npiLookupRef}
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))',
              borderRadius: '20px',
              padding: '3rem',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)',
              marginBottom: '3rem'
            }}
          >
            <h3 style={{
              color: '#3b82f6',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              marginBottom: '2rem',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              🔍 Instant Doctor Intelligence
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 2fr',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Input Side */}
              <div>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  <label style={{
                    color: '#cccccc',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}>
                    Enter NPI Number
                  </label>
                  <input
                    type="text"
                    value="1234567890"
                    readOnly
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      border: '2px solid #3b82f6',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontFamily: 'monospace'
                    }}
                  />
                  <button style={{
                    marginTop: '1rem',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    🚀 Generate Canvas
                  </button>
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                fontSize: '2rem',
                color: '#3b82f6',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                ➡️
              </div>

              {/* Output Side */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '2rem',
                borderRadius: '15px',
                border: '2px solid rgba(59, 130, 246, 0.4)'
              }}>
                <h4 style={{
                  color: '#3b82f6',
                  fontSize: '1.3rem',
                  marginBottom: '1.5rem',
                  fontWeight: '700'
                }}>
                  Complete Intelligence Profile
                </h4>
                
                <div style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.8rem' }}>
                    <strong>{mockDoctorData.name}</strong>
                  </div>
                  <div>📍 {mockDoctorData.practice}</div>
                  <div>🏥 {mockDoctorData.specialty}</div>
                  <div>📊 {mockDoctorData.volume}</div>
                  <div>📚 {mockDoctorData.recentPubs} Recent Publications</div>
                  <div style={{ marginTop: '1rem' }}>
                    <strong>Interests:</strong>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {mockDoctorData.interests.map(interest => (
                        <span key={interest} style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          border: '1px solid rgba(59, 130, 246, 0.4)'
                        }}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Harvard Tones Demo */}
        {currentDemo === 'tones' && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)',
            marginBottom: '3rem'
          }}>
            <h3 style={{
              color: '#10b981',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              marginBottom: '2rem',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              🎓 6 Harvard-Level Communication Styles
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {harvardTones.map(tone => (
                <div
                  key={tone.id}
                  ref={addToneRef}
                  style={{
                    background: `linear-gradient(135deg, ${tone.color}20, ${tone.color}10)`,
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: `2px solid ${tone.color}40`,
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  <h4 style={{
                    color: tone.color,
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '0.8rem'
                  }}>
                    {tone.name}
                  </h4>
                  <p style={{
                    color: '#cccccc',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    marginBottom: '1rem'
                  }}>
                    {tone.description}
                  </p>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontStyle: 'italic',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}>
                    "{tone.example}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smart Reports Demo */}
        {currentDemo === 'reports' && (
          <div style={{
            background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)',
            marginBottom: '3rem'
          }}>
            <h3 style={{
              color: '#f59e0b',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              marginBottom: '2rem',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              📊 Instant Custom Reports & Distribution
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <div
                ref={addReportRef}
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '2px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                <h4 style={{
                  color: '#f59e0b',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  📈 Clinical Outcome Reports
                </h4>
                <ul style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li>Patient population analysis</li>
                  <li>Treatment efficacy data</li>
                  <li>Peer comparison metrics</li>
                  <li>ROI calculations</li>
                </ul>
              </div>

              <div
                ref={addReportRef}
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '2px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                <h4 style={{
                  color: '#f59e0b',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  🎯 Mass Personalization
                </h4>
                <ul style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li>Not mass email - mass personalization</li>
                  <li>Each doctor gets relevant data</li>
                  <li>Specialty-specific insights</li>
                  <li>Practice-tailored solutions</li>
                </ul>
              </div>

              <div
                ref={addReportRef}
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '2px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                <h4 style={{
                  color: '#f59e0b',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  🌐 Cross-Platform Distribution
                </h4>
                <ul style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li>Email, LinkedIn, Portal delivery</li>
                  <li>SMS for time-sensitive updates</li>
                  <li>CRM integration and tracking</li>
                  <li>Multi-channel follow-up</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* The Canvas Advantage */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
          borderRadius: '25px',
          padding: '3rem',
          border: '3px solid rgba(255, 215, 0, 0.4)',
          boxShadow: '0 0 50px rgba(255, 215, 0, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#ffd700',
            marginBottom: '2rem',
            fontWeight: '900'
          }}>
            🎯 MASS CONNECTING, NOT MASS MAILING
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
              <h4 style={{ color: '#ff4444', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Mass Email
              </h4>
              <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                Generic messages to everyone. Low response rates. Spam filters.
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h4 style={{ color: '#00ff88', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Mass Personalization
              </h4>
              <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                Relevant intelligence for each doctor. High engagement. Value-driven.
              </p>
            </div>
            
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h4 style={{ color: '#ffd700', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Mass Connecting
              </h4>
              <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                Find doctors who actually want what you're selling. Perfect matches.
              </p>
            </div>
          </div>

          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#ffffff',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto',
            fontWeight: '500'
          }}>
            Canvas transforms you from a cold caller into an intelligence expert who 
            connects the right doctors with the right solutions at the perfect moment.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default CanvasIntelligence;