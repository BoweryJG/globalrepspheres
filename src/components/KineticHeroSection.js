import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroStyles } from './KineticStyles';

const KineticHeroSection = () => {
  const statCardsRef = useRef([]);
  const countersRef = useRef([]);

  useEffect(() => {
    // Animated counters
    countersRef.current.forEach(counter => {
      if (!counter) return;
      
      const target = parseInt(counter.getAttribute('data-target'));
      const parent = counter.parentElement;
      
      if (parent) {
        parent.classList.add('counting');
      }

      gsap.to(counter, {
        duration: 2.5,
        ease: "power2.out",
        innerText: target,
        snap: { innerText: 1 },
        onUpdate: function() {
          counter.innerText = Math.floor(this.targets()[0].innerText);
        },
        onComplete: () => {
          if (parent) {
            parent.style.background = '';
            parent.style.webkitTextFillColor = '';
            parent.style.animation = '';
            parent.style.textShadow = '';
          }
          gsap.fromTo(counter, { scale: 1.1 }, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
        }
      });
    });

    // Perfect needle animations with proper spins and subtle flare
    statCardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const value = parseInt(card.getAttribute('data-value'));
      const needle = card.querySelector('.analog-needle');
      const gauge = card.querySelector('.analog-indicator');
      const jewel = card.querySelector('.analog-center');
      const targetRotation = (value / 100) * 270 - 135;

      // Remove any CSS transitions that might interfere
      gsap.set(needle, { transition: 'none' });
      
      // Start from 0° for MAXIMUM visual impact
      gsap.set(needle, { rotation: 0 });

      const tl = gsap.timeline({
        delay: 0, // NO DELAY - start immediately!
        onStart: () => {
          gsap.to(gauge, {
            filter: "brightness(1.4) contrast(1.2)",
            boxShadow: "0 0 30px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
            duration: 0.3
          });
        }
      });

      // FIX 1: Ensure 2-3 full spins
      const spinRounds = 2 + Math.floor(Math.random() * 2); // 2 or 3 full spins
      const spinTarget = (360 * spinRounds) + targetRotation;
      
      tl.to(needle, {
        rotation: spinTarget,
        duration: 1.4,
        ease: "power2.out",
        onStart: () => {
          gauge.style.filter = "brightness(1.5) contrast(1.3)";
          gauge.style.boxShadow = "0 0 40px rgba(255,255,255,0.4), inset 0 0 30px rgba(255,255,255,0.2)";
        },
        onComplete: () => {
          gsap.to(gauge, {
            filter: "brightness(1)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
            duration: 0.5
          });
          
          // Subtle jewel pulse
          gsap.fromTo(jewel,
            { scale: 1 },
            { 
              scale: 1.3, // Reduced from 1.6
              boxShadow: '0 0 20px var(--gem-deep)', // Reduced from 40px
              duration: 0.3, 
              yoyo: true, 
              repeat: 1,
              ease: "power2.inOut"
            }
          );
          
          // FIX 2: Toned down flare
          const flare = document.createElement('div');
          flare.className = 'jewel-flare';
          
          const flare1 = document.createElement('div');
          const flare2 = document.createElement('div');
          flare1.style.cssText = 'position:absolute;top:50%;left:50%;width:60%;height:1px;background:linear-gradient(to right,transparent,var(--gem-impossible),transparent);transform:translate(-50%,-50%)';
          flare2.style.cssText = 'position:absolute;top:50%;left:50%;width:1px;height:60%;background:linear-gradient(to bottom,transparent,var(--gem-impossible),transparent);transform:translate(-50%,-50%)';
          flare.appendChild(flare1);
          flare.appendChild(flare2);
          
          jewel.appendChild(flare);
          
          gsap.timeline()
            .set(flare, { opacity: 0 })
            .to(flare, { opacity: 1, duration: 0.1 })
            .to([flare1, flare2], { 
              scale: 1.5, // Reduced from 3
              opacity: 0, 
              duration: 0.4, // Faster fade
              ease: "power2.out",
              stagger: 0.05,
              onComplete: () => flare.remove()
            });
        }
      });
    });

    // Cursor-responsive 3D tilt for gauges
    const handleGaugeMouseMove = (e, container) => {
      const gauge = container.querySelector('.analog-indicator');
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 5; // max 5deg tilt
      const rotateY = ((x - centerX) / centerX) * -5;

      gauge.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleGaugeMouseLeave = (container) => {
      const gauge = container.querySelector('.analog-indicator');
      gauge.style.transform = '';
    };

    const gaugeContainers = document.querySelectorAll('.gauge-container');
    gaugeContainers.forEach(container => {
      container.addEventListener('mousemove', (e) => handleGaugeMouseMove(e, container));
      container.addEventListener('mouseleave', () => handleGaugeMouseLeave(container));
    });

    return () => {
      gaugeContainers.forEach(container => {
        container.removeEventListener('mousemove', (e) => handleGaugeMouseMove(e, container));
        container.removeEventListener('mouseleave', () => handleGaugeMouseLeave(container));
      });
    };
  }, []);

  return (
    <>
      <style>{heroStyles}</style>
      
      <section className="hero">
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 24px', background: 'var(--glass)', border: '1px solid var(--purple-primary)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--purple-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '30px' }}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <use href="#social-intelligence"/>
            </svg>
            HELPING TEAMS DOMINATE 10X FASTER
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '30px' }}>
            They Check Databases.<br/>
            <span className="gradient-text">We Own Them.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 40px' }}>
            While your competition manually monitors new business openings, 
            RepSpheres autonomously tracks <span className="counter" ref={el => countersRef.current[0] = el} data-target="12847">0</span> practices, analyzes social patterns, 
            and deploys personalized outreach at scale. The gap is already insurmountable.
          </p>

          {/* Premium Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '60px auto 0' }}>
            {/* Stat Card 1 */}
            <div 
              className="premium-panel stat-card" 
              style={{ '--accent-color': '#00ff88', '--gem-impossible': '#ff00ff', '--gem-shift': '#00ffff', '--gem-deep': '#ff00aa', padding: '30px' }} 
              data-value="84"
              ref={el => statCardsRef.current[0] = el}
            >
              <div className="panel-accent-line"></div>
              <div className="corner-screw" style={{ top: '10px', left: '10px', transform: 'rotate(8deg)' }}></div>
              <div className="corner-screw deep" style={{ top: '10px', right: '10px', transform: 'rotate(-15deg)' }}></div>
              <div className="corner-screw" style={{ bottom: '10px', left: '10px', transform: 'rotate(27deg)' }}></div>
              <div className="corner-screw" style={{ bottom: '10px', right: '10px', transform: 'rotate(3deg)' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.7rem', fontFamily: "'Space Grotesk', monospace", fontWeight: 500 }}>
                  Practices Monitored
                </div>
                <div className="led-indicator led-green"></div>
              </div>
              
              <div className="value-display" style={{ '--accent-primary': '#00ff88', '--accent-secondary': '#00ff41' }}>
                <span className="counter" ref={el => countersRef.current[1] = el} data-target="12847">0</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#00ff88', fontFamily: "'Space Grotesk', monospace" }}>
                  +3.8% vs last period
                </div>
              </div>

              {/* Analog Indicator */}
              <div className="gauge-container">
                <div className="analog-indicator">
                  <div className="analog-needle" style={{ '--accent-color': '#00ff88' }}></div>
                  <div className="analog-center"></div>
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div 
              className="premium-panel stat-card" 
              style={{ '--accent-color': '#00d4ff', '--gem-impossible': '#ffff00', '--gem-shift': '#ff00ff', '--gem-deep': '#00ff00', padding: '30px' }} 
              data-value="12"
              ref={el => statCardsRef.current[1] = el}
            >
              <div className="panel-accent-line"></div>
              <div className="corner-screw" style={{ top: '10px', left: '10px', transform: 'rotate(-12deg)' }}></div>
              <div className="corner-screw" style={{ top: '10px', right: '10px', transform: 'rotate(22deg)' }}></div>
              <div className="corner-screw deep" style={{ bottom: '10px', left: '10px', transform: 'rotate(-5deg)' }}></div>
              <div className="corner-screw" style={{ bottom: '10px', right: '10px', transform: 'rotate(18deg)' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.7rem', fontFamily: "'Space Grotesk', monospace", fontWeight: 500 }}>
                  Response Time
                </div>
                <div className="led-indicator led-blue"></div>
              </div>
              
              <div className="value-display" style={{ '--accent-primary': '#00d4ff', '--accent-secondary': '#0099ff' }}>
                <span className="counter" ref={el => countersRef.current[2] = el} data-target="12">0</span> sec
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#00d4ff', fontFamily: "'Space Grotesk', monospace" }}>
                  From detection to outreach
                </div>
              </div>

              {/* Analog Indicator */}
              <div className="gauge-container">
                <div className="analog-indicator">
                  <div className="analog-needle" style={{ '--accent-color': '#00d4ff' }}></div>
                  <div className="analog-center"></div>
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div 
              className="premium-panel stat-card" 
              style={{ '--accent-color': '#ff6b35', '--gem-impossible': '#00ffff', '--gem-shift': '#ff00ff', '--gem-deep': '#ffff00', padding: '30px' }} 
              data-value="84"
              ref={el => statCardsRef.current[2] = el}
            >
              <div className="panel-accent-line"></div>
              <div className="corner-screw deep" style={{ top: '10px', left: '10px', transform: 'rotate(15deg)' }}></div>
              <div className="corner-screw" style={{ top: '10px', right: '10px', transform: 'rotate(-28deg)' }}></div>
              <div className="corner-screw" style={{ bottom: '10px', left: '10px', transform: 'rotate(7deg)' }}></div>
              <div className="corner-screw" style={{ bottom: '10px', right: '10px', transform: 'rotate(-20deg)' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.7rem', fontFamily: "'Space Grotesk', monospace", fontWeight: 500 }}>
                  Success Rate
                </div>
                <div className="led-indicator led-orange"></div>
              </div>
              
              <div className="value-display" style={{ '--accent-primary': '#ff6b35', '--accent-secondary': '#ff8c00' }}>
                <span className="counter" ref={el => countersRef.current[3] = el} data-target="84">0</span>%
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#ff6b35', fontFamily: "'Space Grotesk', monospace" }}>
                  Industry leading conversion
                </div>
              </div>

              {/* Analog Indicator */}
              <div className="gauge-container">
                <div className="analog-indicator">
                  <div className="analog-needle" style={{ '--accent-color': '#ff6b35' }}></div>
                  <div className="analog-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KineticHeroSection;