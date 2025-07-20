import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EmpireOpportunity = () => {
  const sectionRef = useRef(null);
  const dataFlowRef = useRef(null);
  const empireVisualsRef = useRef([]);
  const [currentEmpire, setCurrentEmpire] = useState(0);

  const empires = [
    {
      company: "Google",
      data: "Search queries",
      value: "$280B",
      lesson: "They built an empire on knowing what people want"
    },
    {
      company: "Facebook",
      data: "Social connections",
      value: "$118B",
      lesson: "They monetized human relationships"
    },
    {
      company: "Amazon",
      data: "Purchase behavior",
      value: "$469B",
      lesson: "They own every customer interaction"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Empire rotation
    const empireInterval = setInterval(() => {
      setCurrentEmpire(prev => (prev + 1) % empires.length);
    }, 4000);

    // Data flow animation
    const createDataParticle = () => {
      if (!dataFlowRef.current) return;
      
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #ffd700, #ffaa00);
        border-radius: 50%;
        box-shadow: 0 0 10px #ffd700;
        top: ${Math.random() * 100}%;
        left: -10px;
        animation: dataFlow 3s linear forwards;
        z-index: 1;
      `;
      
      dataFlowRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 3000);
    };

    const particleInterval = setInterval(createDataParticle, 200);

    // Main scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    // Animate empire visuals
    empireVisualsRef.current.forEach((visual, index) => {
      if (visual) {
        tl.fromTo(visual, 
          { opacity: 0, scale: 0.5, rotation: -180 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1, delay: index * 0.2 }
        );
      }
    });

    return () => {
      clearInterval(empireInterval);
      clearInterval(particleInterval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addEmpireVisualRef = (el) => {
    if (el && !empireVisualsRef.current.includes(el)) {
      empireVisualsRef.current.push(el);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes dataFlow {
          0% {
            left: -10px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: calc(100% + 10px);
            opacity: 0;
          }
        }
        
        @keyframes empireGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="empire-opportunity-section"
        style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #0d1117 100%)',
          padding: 'clamp(100px, 15vh, 150px) 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Data stream background */}
        <div
          ref={dataFlowRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}
        />

        <div className="container" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 20px',
          position: 'relative',
          zIndex: 2
        }}>
          
          {/* Main Empire Message */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '900',
              color: '#ffd700',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.6)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              GOOGLE BUILT AN EMPIRE ON DATA.<br />
              <span style={{ color: '#ffffff' }}>NOW IT'S YOUR TURN.</span>
            </h2>
            
            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              color: '#cccccc',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.4',
              fontWeight: '500'
            }}>
              Every conversation is a data point. Every deal is intelligence. 
              Your career assets are more valuable than your portfolio.
            </p>
          </div>

          {/* Empire Examples */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {empires.map((empire, index) => (
              <div
                key={empire.company}
                ref={addEmpireVisualRef}
                style={{
                  background: index === currentEmpire 
                    ? 'linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.1))'
                    : 'linear-gradient(145deg, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.9))',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  border: index === currentEmpire 
                    ? '2px solid rgba(255, 215, 0, 0.5)'
                    : '1px solid rgba(100, 100, 100, 0.3)',
                  position: 'relative',
                  transform: index === currentEmpire ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.5s ease',
                  animation: index === currentEmpire ? 'empireGlow 2s ease-in-out infinite' : 'none'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  {empire.company === 'Google' ? '🔍' : 
                   empire.company === 'Facebook' ? '👥' : '🛒'}
                </div>
                
                <h3 style={{
                  color: '#ffd700',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontWeight: '800'
                }}>
                  {empire.company}
                </h3>
                
                <div style={{
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    Monetized: <span style={{ color: '#00ff88' }}>{empire.data}</span>
                  </div>
                  <div style={{
                    color: '#ffd700',
                    fontSize: '1.3rem',
                    fontWeight: '900'
                  }}>
                    {empire.value} Market Cap
                  </div>
                </div>
                
                <p style={{
                  color: '#cccccc',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  {empire.lesson}
                </p>
              </div>
            ))}
          </div>

          {/* Your Empire Section */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(0, 255, 136, 0.1))',
            borderRadius: '25px',
            padding: '3rem',
            border: '3px solid rgba(255, 215, 0, 0.4)',
            boxShadow: '0 0 50px rgba(255, 215, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
              animation: 'empireGlow 4s ease-in-out infinite',
              zIndex: -1
            }} />

            <h3 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#ffd700',
              marginBottom: '2rem',
              fontWeight: '900',
              textAlign: 'center',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.6)'
            }}>
              🏆 YOUR SALES EMPIRE BLUEPRINT
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '2rem',
                borderRadius: '15px',
                border: '2px solid rgba(255, 215, 0, 0.3)'
              }}>
                <h4 style={{
                  color: '#ffd700',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  fontWeight: '800'
                }}>
                  📞 Your Data Asset
                </h4>
                <p style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  Every call transcription, every customer insight, every successful approach. 
                  <span style={{ color: '#00ff88', fontWeight: '600' }}> This is your proprietary intelligence.</span>
                </p>
              </div>

              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '2rem',
                borderRadius: '15px',
                border: '2px solid rgba(0, 255, 136, 0.3)'
              }}>
                <h4 style={{
                  color: '#00ff88',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  fontWeight: '800'
                }}>
                  🎯 Your Empire Value
                </h4>
                <p style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  75 deals per day × $10K average = <span style={{ color: '#ffd700', fontWeight: '800' }}>$750K daily revenue</span>. 
                  Your data empire generates millions.
                </p>
              </div>

              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '2rem',
                borderRadius: '15px',
                border: '2px solid rgba(59, 130, 246, 0.3)'
              }}>
                <h4 style={{
                  color: '#3b82f6',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  fontWeight: '800'
                }}>
                  👑 Your Independence
                </h4>
                <p style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  Own your customer relationships. Control your revenue streams. 
                  <span style={{ color: '#ffd700', fontWeight: '600' }}>Build wealth that no company can take away.</span>
                </p>
              </div>
            </div>

            {/* The Opportunity Statement */}
            <div style={{
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '3rem',
              borderRadius: '20px',
              border: '2px solid rgba(255, 215, 0, 0.5)'
            }}>
              <h4 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                color: '#ffd700',
                marginBottom: '1.5rem',
                fontWeight: '900'
              }}>
                THE WINDOW IS OPEN RIGHT NOW
              </h4>
              
              <p style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                color: '#ffffff',
                lineHeight: '1.6',
                marginBottom: '2rem',
                maxWidth: '800px',
                margin: '0 auto 2rem'
              }}>
                While your company debates "AI strategy," the smart reps are building personal empires. 
                Every day you wait is market share lost to those already 75x ahead.
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(139, 0, 0, 0.3))',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 68, 68, 0.4)'
                }}>
                  <div style={{ color: '#ff4444', fontSize: '1.1rem', fontWeight: '700' }}>
                    Without AI Empire
                  </div>
                  <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    365 deals/year
                  </div>
                </div>

                <div style={{
                  fontSize: '2rem',
                  color: '#ffd700',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  VS
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 200, 100, 0.3))',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(0, 255, 136, 0.4)'
                }}>
                  <div style={{ color: '#00ff88', fontSize: '1.1rem', fontWeight: '700' }}>
                    With AI Empire
                  </div>
                  <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                    27,375 deals/year
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmpireOpportunity;