import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveMultiplier from './InteractiveMultiplier';

gsap.registerPlugin(ScrollTrigger);

const MathematicalProof = () => {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const calculationRefs = useRef([]);
  const multiplierRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial states
    gsap.set(calculationRefs.current, { opacity: 0, x: -50 });
    gsap.set(multiplierRef.current, { scale: 0, rotation: -180 });

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onEnter: () => setAnimationStarted(true),
      }
    });

    // Animate calculations appearing
    tl.to(calculationRefs.current, {
      opacity: 1,
      x: 0,
      duration: 2,
      stagger: 0.3,
      ease: "power2.out"
    })
    .to(multiplierRef.current, {
      scale: 1,
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    }, "-=1");

    // Chart bars animation
    const chartBars = chartRef.current?.querySelectorAll('.chart-bar');
    if (chartBars) {
      gsap.set(chartBars, { scaleY: 0, transformOrigin: "bottom" });
      
      ScrollTrigger.create({
        trigger: chartRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(chartBars, {
            scaleY: 1,
            duration: 2,
            stagger: 0.2,
            ease: "power2.out"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addCalculationRef = (el) => {
    if (el && !calculationRefs.current.includes(el)) {
      calculationRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="mathematical-proof-section"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        background: 'linear-gradient(135deg, #0f1419 0%, #000000 50%, #1a1a1a 100%)',
        padding: 'clamp(100px, 15vh, 150px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Mathematical grid background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        zIndex: 1
      }} />

      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Main Headline */}
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
            THIS ISN'T OPINION.<br />
            <span style={{ color: '#3b82f6' }}>IT'S MATH.</span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#cccccc',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            The numbers don't lie. Here's the mathematical proof that intelligent automation 
            transforms rep performance by orders of magnitude.
          </p>
        </div>

        {/* Interactive Calculator */}
        <InteractiveMultiplier />

        {/* The Static Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem',
          padding: '3rem',
          background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.8), rgba(10, 10, 10, 0.9))',
          borderRadius: '20px',
          border: '2px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 0 50px rgba(59, 130, 246, 0.2)'
        }}>
          
          {/* Traditional Rep Calculation */}
          <div 
            ref={addCalculationRef}
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'linear-gradient(145deg, rgba(255, 68, 68, 0.1), rgba(139, 0, 0, 0.1))',
              borderRadius: '15px',
              border: '2px solid rgba(255, 68, 68, 0.3)'
            }}
          >
            <h3 style={{
              color: '#ff4444',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: '1.5rem',
              fontWeight: '800'
            }}>
              Traditional Rep
            </h3>
            
            <div style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ color: '#ffaa00' }}>50</span> calls/day
              </div>
              <div style={{ marginBottom: '1rem', color: '#888' }}>×</div>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ color: '#ffaa00' }}>2%</span> conversion rate
              </div>
              <div style={{ marginBottom: '1rem', color: '#888' }}>=</div>
              <div style={{ 
                color: '#ff4444', 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                fontWeight: '900',
                textShadow: '0 0 20px rgba(255, 68, 68, 0.5)'
              }}>
                <span style={{ fontSize: '0.7em' }}>limited</span> results
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div 
            ref={multiplierRef}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '900',
              color: '#ffd700',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div>VS</div>
            <div style={{
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              color: '#00ff88',
              textShadow: '0 0 40px rgba(0, 255, 136, 0.8)',
              animation: animationStarted ? 'pulse 2s ease-in-out infinite' : 'none'
            }}>
              ???X
            </div>
          </div>

          {/* AI Rep Calculation */}
          <div 
            ref={addCalculationRef}
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'linear-gradient(145deg, rgba(0, 255, 136, 0.1), rgba(0, 200, 100, 0.1))',
              borderRadius: '15px',
              border: '2px solid rgba(0, 255, 136, 0.3)'
            }}
          >
            <h3 style={{
              color: '#00ff88',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: '1.5rem',
              fontWeight: '800'
            }}>
              Intelligence-Enhanced Rep
            </h3>
            
            <div style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ color: '#00ff88' }}>500</span> touchpoints/day
              </div>
              <div style={{ marginBottom: '1rem', color: '#888' }}>×</div>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ color: '#00ff88' }}>15%</span> conversion rate
              </div>
              <div style={{ marginBottom: '1rem', color: '#888' }}>=</div>
              <div style={{ 
                color: '#00ff88', 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                fontWeight: '900',
                textShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
              }}>
                exponential results
              </div>
            </div>
          </div>
        </div>

        {/* Visual Chart */}
        <div 
          ref={chartRef}
          style={{
            background: 'linear-gradient(145deg, rgba(10, 10, 10, 0.9), rgba(20, 20, 20, 0.8))',
            padding: '3rem',
            borderRadius: '20px',
            border: '2px solid rgba(100, 100, 100, 0.3)',
            marginBottom: '4rem'
          }}
        >
          <h3 style={{
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '3rem',
            fontWeight: '800'
          }}>
            Daily Deal Volume Comparison
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            gap: '4rem',
            height: '400px',
            padding: '2rem'
          }}>
            
            {/* Traditional Rep Bar */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                className="chart-bar"
                style={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: '#ff4444',
                  borderRadius: '5px 5px 0 0',
                  position: 'relative',
                  boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#ff4444',
                  fontWeight: '900',
                  fontSize: '1.2rem'
                }}>
                  Limited
                </div>
              </div>
              <div style={{ color: '#cccccc', fontWeight: '600' }}>Traditional Rep</div>
            </div>

            {/* AI Rep Bar */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div
                className="chart-bar"
                style={{
                  width: '100px',
                  height: '360px',
                  background: 'linear-gradient(0deg, #00ff88, #00d4ff)',
                  borderRadius: '5px 5px 0 0',
                  position: 'relative',
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#00ff88',
                  fontWeight: '900',
                  fontSize: '1.2rem'
                }}>
                  Exponential
                </div>
              </div>
              <div style={{ color: '#cccccc', fontWeight: '600' }}>AI-Powered Rep</div>
            </div>
          </div>
        </div>

        {/* The Exponential Growth Formula */}
        <div 
          ref={addCalculationRef}
          style={{
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
            padding: '3rem',
            borderRadius: '20px',
            border: '2px solid rgba(255, 215, 0, 0.4)',
            boxShadow: '0 0 50px rgba(255, 215, 0, 0.2)'
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#ffd700',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            THE EXPONENTIAL ADVANTAGE
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255, 215, 0, 0.3)'
            }}>
              <h4 style={{ color: '#ffd700', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Monthly Impact
              </h4>
              <div style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6' }}>
                <div>Traditional: <span style={{ color: '#ff4444' }}>Limited pipeline</span></div>
                <div>Intelligence-Enhanced: <span style={{ color: '#00ff88' }}>Exponential growth</span></div>
                <div style={{ color: '#ffd700', fontWeight: '900', marginTop: '1rem' }}>
                  CALCULATE YOUR MULTIPLIER ABOVE
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255, 215, 0, 0.3)'
            }}>
              <h4 style={{ color: '#ffd700', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Annual Impact
              </h4>
              <div style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6' }}>
                <div>Traditional: <span style={{ color: '#ff4444' }}>Slow growth</span></div>
                <div>Intelligence-Enhanced: <span style={{ color: '#00ff88' }}>Career transformation</span></div>
                <div style={{ color: '#ffd700', fontWeight: '900', marginTop: '1rem' }}>
                  YOUR CUSTOM CALCULATION
                </div>
              </div>
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
            This isn't theory. This is mathematical certainty. Every day you delay 
            is another day of exponential opportunity cost.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default MathematicalProof;