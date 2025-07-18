import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GreatDivide.css';

gsap.registerPlugin(ScrollTrigger);

const GreatDivide = () => {
  console.log('🔥 GreatDivide rendering...');
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const dividerRef = useRef(null);
  const [dealsClosedCount, setDealsClosedCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the divider line
      gsap.to(dividerRef.current, {
        height: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Animate left side (falling)
      gsap.from(leftRef.current.querySelectorAll('.stat-item'), {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Animate right side (rising)
      gsap.from(rightRef.current.querySelectorAll('.stat-item'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Falling animation for left side elements
      gsap.to(leftRef.current.querySelectorAll('.falling-rep'), {
        y: 100,
        opacity: 0.3,
        duration: 3,
        repeat: -1,
        ease: 'power2.in',
        stagger: {
          each: 0.5,
          repeat: -1
        }
      });

      // Rising animation for right side elements
      gsap.to(rightRef.current.querySelectorAll('.rising-rep'), {
        y: -100,
        opacity: 1,
        duration: 3,
        repeat: -1,
        ease: 'power2.out',
        stagger: {
          each: 0.5,
          repeat: -1
        }
      });
    }, containerRef);

    // Deal counter animation
    const interval = setInterval(() => {
      setDealsClosedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={containerRef} className="section-container great-divide-section">
      <div className="container">
        <h2 className="section-headline">The Great Sales Inversion Has Begun. Which Side Are You On?</h2>
        
        <div className="divide-container">
          <div ref={leftRef} className="divide-side left-side">
            {/* Beautiful Detailed Screws */}
            <div className="corner-screw screw-tl deep" style={{top: '15px', left: '15px'}}></div>
            <div className="corner-screw screw-tr deep" style={{top: '15px', right: '15px'}}></div>
            <div className="corner-screw screw-bl deep" style={{bottom: '15px', left: '15px'}}></div>
            <div className="corner-screw screw-br deep" style={{bottom: '15px', right: '15px'}}></div>
            
            <h3 className="side-title">The Falling</h3>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">50</span>
                <span className="stat-label">calls/day</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2%</span>
                <span className="stat-label">close rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$150K</span>
                <span className="stat-label">revenue</span>
              </div>
            </div>
            <ul className="side-features">
              <li>Still leaving voicemails, using spreadsheets</li>
              <li>Working 60+ hours, stress level 9/10</li>
              <li className="highlight-red">"Losing ground every day"</li>
            </ul>
            <div className="visual-elements">
              <div className="falling-rep"></div>
              <div className="falling-rep"></div>
              <div className="falling-rep"></div>
            </div>
          </div>

          <div ref={dividerRef} className="divider-line"></div>

          <div ref={rightRef} className="divide-side right-side">
            {/* Beautiful Detailed Screws */}
            <div className="corner-screw screw-tl deep" style={{top: '15px', left: '15px'}}></div>
            <div className="corner-screw screw-tr deep" style={{top: '15px', right: '15px'}}></div>
            <div className="corner-screw screw-bl deep" style={{bottom: '15px', left: '15px'}}></div>
            <div className="corner-screw screw-br deep" style={{bottom: '15px', right: '15px'}}></div>
            
            <h3 className="side-title">The Rising</h3>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">150</span>
                <span className="stat-label">targeted touches/day</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">27%</span>
                <span className="stat-label">higher close rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$400K</span>
                <span className="stat-label">revenue</span>
              </div>
            </div>
            <ul className="side-features">
              <li>Neural connections, data streams, agent multiplication</li>
              <li>Working 45 hours, stress level 4/10</li>
              <li className="highlight-green">"Exponential advantage growing"</li>
            </ul>
            <div className="visual-elements">
              <div className="rising-rep"></div>
              <div className="rising-rep"></div>
              <div className="rising-rep"></div>
            </div>
          </div>
        </div>

        <div className="live-counter">
          <span className="counter-text">While you read this, RepSpheres users closed</span>
          <span className="counter-number">{dealsClosedCount}</span>
          <span className="counter-text">more deals</span>
        </div>

        <div className="supporting-copy">
          <p className="copy-item">Every day without RepSpheres = 40% less productive than your competition</p>
          <p className="copy-item">The gap isn't growing linearly. It's exponential. And it started yesterday.</p>
          <p className="copy-item">By 2026, manual prospecting will be as relevant as door-to-door encyclopedia sales.</p>
        </div>
      </div>
    </section>
  );
};

export default GreatDivide;