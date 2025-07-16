import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ConspiracySection = () => {
  const sectionRef = useRef(null);
  const shadowyFiguresRef = useRef([]);
  const corporateLogosRef = useRef([]);
  const revealTextRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create shadowy corporate figures animation
    const shadowyFigures = shadowyFiguresRef.current.filter(Boolean);
    const corporateLogos = corporateLogosRef.current.filter(Boolean);

    // Initial setup - everything is hidden/dark
    gsap.set(shadowyFigures, { opacity: 0.1, scale: 0.8 });
    gsap.set(corporateLogos, { opacity: 0.3, filter: 'grayscale(100%)' });
    gsap.set(revealTextRef.current, { opacity: 0, y: 50 });

    // Conspiracy revelation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onEnter: () => setIsRevealed(true),
        onLeave: () => setIsRevealed(false),
      }
    });

    // Reveal the conspiracy
    tl.to(shadowyFigures, {
      opacity: 0.8,
      scale: 1.1,
      duration: 2,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(corporateLogos, {
      opacity: 0.9,
      filter: 'grayscale(0%) brightness(1.2)',
      duration: 1.5,
      stagger: 0.1
    }, "-=1")
    .to(revealTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.5");

    // Floating animation for shadowy figures
    shadowyFigures.forEach((figure, index) => {
      gsap.to(figure, {
        y: "+=20",
        duration: 3 + (index * 0.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Glitch effect for corporate logos
    corporateLogos.forEach((logo, index) => {
      gsap.to(logo, {
        skewX: "random(-2, 2)",
        skewY: "random(-1, 1)",
        duration: 0.1,
        repeat: -1,
        repeatDelay: 3 + (index * 0.8),
        yoyo: true
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addShadowyFigureRef = (el) => {
    if (el && !shadowyFiguresRef.current.includes(el)) {
      shadowyFiguresRef.current.push(el);
    }
  };

  const addCorporateLogoRef = (el) => {
    if (el && !corporateLogosRef.current.includes(el)) {
      corporateLogosRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="conspiracy-section"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        background: 'radial-gradient(ellipse at center, #1a0d2e 0%, #000000 70%)',
        padding: 'clamp(100px, 15vh, 150px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Dark corporate atmosphere */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(45deg, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
          linear-gradient(-45deg, rgba(75, 0, 130, 0.1) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Main Conspiracy Headline */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            color: '#ff4444',
            textShadow: '0 0 40px rgba(255, 68, 68, 0.6)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            YOUR COMPANY IS KEEPING<br />
            <span style={{ color: '#ffaa00' }}>THESE TOOLS FROM YOU</span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#cccccc',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            The elite know something you don't. While they automate their way to millions,
            they keep you trapped in manual labor.
          </p>
        </div>

        {/* Corporate Conspiracy Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          
          {/* Shadowy Figure 1 - CEO */}
          <div 
            ref={addShadowyFigureRef}
            style={{
              background: 'linear-gradient(145deg, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.9))',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #333, #666)',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem'
              }}>🕴️</div>
            </div>
            <h3 style={{ color: '#ff4444', fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>
              The C-Suite Secret
            </h3>
            <p style={{ color: '#cccccc', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'center' }}>
              "Let them keep making calls. We'll automate everything and claim the credit."
            </p>
          </div>

          {/* Shadowy Figure 2 - Sales Director */}
          <div 
            ref={addShadowyFigureRef}
            style={{
              background: 'linear-gradient(145deg, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.9))',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #333, #666)',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem'
              }}>👔</div>
            </div>
            <h3 style={{ color: '#ff4444', fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>
              The Sales Elite
            </h3>
            <p style={{ color: '#cccccc', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'center' }}>
              "If they get AI tools, they won't need us anymore. Keep them dialing."
            </p>
          </div>

          {/* Shadowy Figure 3 - Tech Gatekeepers */}
          <div 
            ref={addShadowyFigureRef}
            style={{
              background: 'linear-gradient(145deg, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.9))',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #333, #666)',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem'
              }}>💼</div>
            </div>
            <h3 style={{ color: '#ff4444', fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>
              IT Gatekeepers
            </h3>
            <p style={{ color: '#cccccc', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'center' }}>
              "AI tools are 'too risky' for reps. Let's stick with our CRM from 2015."
            </p>
          </div>
        </div>

        {/* Corporate Logo Wall */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          marginBottom: '4rem',
          padding: '2rem',
          background: 'rgba(20, 20, 20, 0.5)',
          borderRadius: '15px',
          border: '1px solid rgba(100, 100, 100, 0.2)'
        }}>
          {['CORP.', 'MEGA', 'TITAN', 'GLOBAL'].map((name, index) => (
            <div
              key={name}
              ref={addCorporateLogoRef}
              style={{
                fontSize: '1.8rem',
                fontWeight: '900',
                color: '#666666',
                letterSpacing: '0.1em',
                padding: '1rem 2rem',
                border: '2px solid rgba(100, 100, 100, 0.3)',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, rgba(50, 50, 50, 0.5), rgba(30, 30, 30, 0.7))'
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* The Truth Revelation */}
        <div 
          ref={revealTextRef}
          style={{
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(255, 68, 68, 0.1), rgba(255, 170, 0, 0.1))',
            padding: '3rem',
            borderRadius: '20px',
            border: '2px solid rgba(255, 68, 68, 0.3)',
            boxShadow: '0 0 50px rgba(255, 68, 68, 0.2)'
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#ffaa00',
            marginBottom: '1.5rem',
            fontWeight: '800'
          }}>
            THE TRUTH THEY DON'T WANT YOU TO KNOW
          </h3>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#ffffff',
            lineHeight: '1.6',
            maxWidth: '900px',
            margin: '0 auto 2rem',
            fontWeight: '500'
          }}>
            While you're making 50 calls a day, the elite are closing 75 deals with AI. 
            They profit off your manual labor while keeping the automation tools for themselves.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 68, 68, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 68, 68, 0.3)'
            }}>
              <h4 style={{ color: '#ff4444', fontSize: '1.2rem', marginBottom: '1rem' }}>
                What They Tell You
              </h4>
              <p style={{ color: '#cccccc', fontSize: '0.95rem' }}>
                "Work harder. Make more calls. Hustle is everything."
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 170, 0, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 170, 0, 0.3)'
            }}>
              <h4 style={{ color: '#ffaa00', fontSize: '1.2rem', marginBottom: '1rem' }}>
                What They're Actually Doing
              </h4>
              <p style={{ color: '#cccccc', fontSize: '0.95rem' }}>
                Using AI to automate everything while you stay trapped in manual labor.
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '15px',
            border: '2px solid rgba(255, 215, 0, 0.4)'
          }}>
            <h4 style={{
              color: '#ffd700',
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              marginBottom: '1rem',
              fontWeight: '800'
            }}>
              🔓 BREAK FREE FROM THE CONSPIRACY
            </h4>
            <p style={{
              color: '#ffffff',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: '1.5'
            }}>
              You don't need their permission. Take control of your own empire. 
              The tools exist. The window is open. But only for those brave enough to seize it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConspiracySection;