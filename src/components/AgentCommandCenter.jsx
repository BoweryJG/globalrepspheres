import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AgentCommandCenter.css';

gsap.registerPlugin(ScrollTrigger);

const AgentCommandCenter = () => {
  const sectionRef = useRef(null);
  const harveyRef = useRef(null);
  const coachingBubblesRef = useRef(null);
  const voiceWaveformRef = useRef(null);
  const personalityCardsRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const [activePersonality, setActivePersonality] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const coachingExamples = [
    { text: "Slow down, you're talking too fast", type: "pace" },
    { text: "They just mentioned budget concerns", type: "alert" },
    { text: "Focus more on clinical outcomes", type: "guidance" },
    { text: "This prospect prefers data over stories", type: "personality" }
  ];

  const aiPersonalities = [
    { name: "Sales Coach", icon: "🎯", specialty: "Close rate optimization" },
    { name: "Medical Expert", icon: "🏥", specialty: "Clinical knowledge" },
    { name: "Objection Handler", icon: "🛡️", specialty: "Overcome resistance" },
    { name: "Data Analyst", icon: "📊", specialty: "Metrics & insights" }
  ];

  const languages = ['EN', 'ES', 'FR', 'DE', 'JP', 'CN', 'PT', 'RU'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set('.agent-section-content > *', { opacity: 0, y: 50 });
      
      // Main section animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      });

      // Headline animations
      tl.to('.agent-headline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to('.agent-subheadline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5');

      // Harvey AI showcase animation
      gsap.timeline({
        scrollTrigger: {
          trigger: harveyRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })
      .to('.harvey-showcase', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to('.harvey-visual', {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.5');

      // Coaching bubbles animation
      gsap.timeline({
        scrollTrigger: {
          trigger: coachingBubblesRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })
      .to('.coaching-bubble', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });

      // Voice waveform animation
      gsap.to('.waveform-bar', {
        scaleY: () => 0.2 + Math.random() * 0.8,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.05,
          from: 'center'
        }
      });

      // Personality cards hover effect
      personalityCardsRef.current?.querySelectorAll('.personality-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(159, 88, 250, 0.3)',
            duration: 0.3
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            duration: 0.3
          });
        });
      });

      // Language selector animation
      const languageButtons = languageSelectorRef.current?.querySelectorAll('.language-btn');
      languageButtons?.forEach((btn, index) => {
        gsap.set(btn, { scale: 0, opacity: 0 });
        gsap.to(btn, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: languageSelectorRef.current,
            start: 'top 70%'
          }
        });
      });

      // Floating animation for feature highlights
      gsap.to('.feature-highlight', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate personalities
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePersonality((prev) => (prev + 1) % aiPersonalities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="agent-command-center">
      <div className="agent-section-content">
        <h2 className="agent-headline">Your Personal AI Development Team</h2>
        <p className="agent-subheadline">Enterprise Tools for Individual Reps</p>

        {/* Harvey AI Showcase */}
        <div ref={harveyRef} className="harvey-showcase">
          <h3 className="harvey-title">Like Having a Championship Coach in Your Ear. Literally.</h3>
          
          <div className="harvey-visual">
            <div className="harvey-avatar">
              <div className="harvey-glow"></div>
              <div className="harvey-core">
                <span className="harvey-icon">🎧</span>
              </div>
              <div className="whisper-waves">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div className="harvey-features">
            <p className="feature-highlight">
              Just like a quarterback gets plays whispered from the sideline, Harvey whispers intelligence in your ear
            </p>
            <p className="feature-highlight">
              When a prospect calls, Harvey tells you who they are BEFORE you say hello
            </p>
            <p className="feature-highlight">
              Four elite AI personalities listening to every call, coaching you in real-time
            </p>
            <p className="feature-highlight unique-value">
              Only YOU hear it. Your prospect never knows. It's your secret weapon.
            </p>
          </div>

          {/* Real-time Coaching Examples */}
          <div ref={coachingBubblesRef} className="coaching-examples">
            <h4>Real-time Examples:</h4>
            <div className="coaching-bubbles">
              {coachingExamples.map((example, index) => (
                <div key={index} className={`coaching-bubble ${example.type}`}>
                  <span className="bubble-text">{example.text}</span>
                  <div className="bubble-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Command Center */}
        <div className="command-center">
          <h3 className="command-title">Infinite Personality Multiplication</h3>
          
          {/* Voice Waveform Visualization */}
          <div ref={voiceWaveformRef} className="voice-waveform">
            <div className="waveform-container">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="waveform-bar"></div>
              ))}
            </div>
            <p className="waveform-text">Voice-clone your top performers. Deploy in any language instantly.</p>
          </div>

          {/* AI Personality Cards */}
          <div ref={personalityCardsRef} className="personality-cards">
            {aiPersonalities.map((personality, index) => (
              <div 
                key={index} 
                className={`personality-card ${activePersonality === index ? 'active' : ''}`}
                onClick={() => setActivePersonality(index)}
              >
                <div className="card-icon">{personality.icon}</div>
                <h4>{personality.name}</h4>
                <p>{personality.specialty}</p>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>

          {/* Language Selector Visualization */}
          <div ref={languageSelectorRef} className="language-selector">
            <h4>Deploy in Any Language</h4>
            <div className="language-grid">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`language-btn ${selectedLanguage === lang ? 'selected' : ''}`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="key-features">
            <div className="feature-item">
              <span className="feature-number">15+</span>
              <span className="feature-text">Pre-built Specialists</span>
            </div>
            <div className="feature-item">
              <span className="feature-number">$100K+</span>
              <span className="feature-text">Enterprise Value in Your Pocket</span>
            </div>
            <div className="feature-item highlight">
              <span className="feature-number">3X</span>
              <span className="feature-text">One rep with RepSpheres outperforms three without it</span>
            </div>
          </div>

          {/* Unique Positioning */}
          <div className="unique-positioning">
            <p className="positioning-text">
              We're the <span className="highlight">ONLY</span> platform offering real-time whisper coaching.
            </p>
            <p className="positioning-subtext">Because being first matters.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentCommandCenter;