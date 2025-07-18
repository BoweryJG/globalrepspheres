import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RepSpheresNavbar from './RepSpheresNavbar';
import './RepSpheresNavbar.css';
import HistoricalMoment from './HistoricalMoment';
import GreatDivide from './GreatDivide';
import MathematicalProof from './MathematicalProof';
import HarveyWhisper from './HarveyWhisper';
import SpeedTunnel from './SpeedTunnel';
import EmpireOpportunity from './EmpireOpportunity';
import CorporatePrisonBreak from './CorporatePrisonBreak';
import SubscriptionTiers from './SubscriptionTiers';
import UrgencyTimer from './UrgencyTimer';
import ScarcityIndicator from './ScarcityIndicator';
import MagneticButtons from './MagneticButtons';
import CRMIntegrations from './CRMIntegrations';
import CanvasIntelligence from './CanvasIntelligence';
import KineticStarfield from './KineticStarfield';
import KineticDataGrid from './KineticDataGrid';
import { kineticStyles } from './KineticStyles';
import './LightningStrikeEnhancements.css';
import './MobileOptimizedStyles.css';

gsap.registerPlugin(ScrollTrigger);

const KineticNeedlesPage_Optimized = () => {
  useEffect(() => {
    // Add mobile viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(viewport);
    }

    // Enhanced scroll-driven effects for seamless flow
    const sections = document.querySelectorAll('.lightning-section');
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        }
      });
    });

    // Favicon and title effects
    let faviconPulseTriggered = false;
    
    const handleScroll = () => {
      const scrollPercentage = (window.pageYOffset) / (document.documentElement.scrollHeight - window.innerHeight);
      
      if (!faviconPulseTriggered && scrollPercentage > 0.9) {
        faviconPulseTriggered = true;
        const originalTitle = document.title;
        document.title = "⚡ " + originalTitle + " ⚡";
        
        setTimeout(() => {
          document.title = originalTitle;
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{kineticStyles}</style>
      
      {/* Animated Background Elements */}
      <KineticStarfield />
      <KineticDataGrid />

      {/* Navigation Bar */}
      <RepSpheresNavbar 
        onLogin={() => window.location.href = '/login'}
        onSignup={() => window.location.href = '/signup'}
        customLinks={[
          { href: '#historical-moment', label: 'The Moment', icon: 'market' },
          { href: '#mathematical-proof', label: 'The Math', icon: 'canvas' },
          { href: '#canvas', label: 'Canvas Intelligence', icon: 'pipeline' },
          { href: '#empire', label: 'Your Empire', icon: 'sphere' },
          { href: '#pricing', label: 'Join Now', icon: 'podcasts' }
        ]}
      />

      {/* 1. THE HISTORICAL MOMENT - The Second Electricity Moment */}
      <div id="historical-moment" className="lightning-section">
        <HistoricalMoment />
      </div>

      {/* 2. THE GREAT DIVIDE - Which Side Are You On? */}
      <div className="lightning-section">
        <GreatDivide />
      </div>

      {/* 3. MATHEMATICAL PROOF - This Isn't Opinion. It's Math. */}
      <div id="mathematical-proof" className="lightning-section">
        <MathematicalProof />
      </div>

      {/* 4. CANVAS INTELLIGENCE - The HOW Behind the Results */}
      <div id="canvas" className="lightning-section">
        <CanvasIntelligence />
      </div>

      {/* 5. HARVEY WHISPER - Championship Coach in Your Ear */}
      <section id="harvey-whisper" className="lightning-section section-container" style={{ 
        backgroundColor: '#0a0a0a', 
        padding: 'clamp(80px, 10vh, 120px) 0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative' 
      }}>
        <HarveyWhisper />
      </section>

      {/* 6. SPEED TUNNEL - Experience the 75x Differential */}
      <section id="speed-tunnel" className="lightning-section section-container" style={{ 
        backgroundColor: '#000000', 
        padding: '0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative'
      }}>
        <h2 style={{ 
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFFFFF', 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          zIndex: 10,
          textShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
        }}>
          Feel the 75x Speed Difference
        </h2>
        <SpeedTunnel />
      </section>

      {/* 7. EMPIRE OPPORTUNITY - Your Empire Awaits */}
      <section id="empire" className="lightning-section section-container" style={{ 
        backgroundColor: '#000000', 
        padding: '0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative'
      }}>
        <h2 style={{ 
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFFFFF', 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          textAlign: 'center',
          zIndex: 20,
          textShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
        }}>
          Your Empire Awaits
        </h2>
        <EmpireOpportunity />
      </section>

      {/* 8. SUBSCRIPTION TIERS - Choose Your Path */}
      <div id="pricing" className="lightning-section">
        <SubscriptionTiers />
      </div>

      {/* 10. CRM INTEGRATIONS - Connect Instantly */}
      <CRMIntegrations />

      {/* 11. SUBSCRIPTION TIERS - Lock In Your Empire */}
      <div id="pricing" className="lightning-section">
        <SubscriptionTiers />
      </div>

      {/* 12. URGENCY & SCARCITY - Final Call */}
      <section id="urgency-scarcity" className="lightning-section section-container" style={{ 
        backgroundColor: '#0a0a0a', 
        padding: 'clamp(80px, 10vh, 120px) 0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="urgency-scarcity-grid" style={{
            marginBottom: '3rem'
          }}>
            <UrgencyTimer 
              title="FOUNDING MEMBER PRICING EXPIRES IN:"
              variant="default"
            />
            <ScarcityIndicator 
              totalSpots={100}
              remainingSpots={17}
              territory="your territory"
              variant="critical"
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <UrgencyTimer 
              title="⚡ FINAL HOURS TO LOCK IN 75X ADVANTAGE ⚡"
              variant="critical"
            />
          </div>
        </div>
      </section>

      {/* 13. MAGNETIC CHOICE - Choose Your Destiny */}
      <section id="magnetic-choice" className="lightning-section section-container" style={{ 
        backgroundColor: '#0f0f0f', 
        padding: 'clamp(100px, 12vh, 150px) 0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#FFFFFF', 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginBottom: '4rem',
            fontWeight: '900',
            letterSpacing: '-0.02em'
          }}>
            Choose Your Destiny
          </h2>
          <MagneticButtons 
            onChoice={(choice) => {
              if (choice === 'empire') {
                window.location.href = '#pricing';
              } else {
                console.log('User chose to keep falling behind');
              }
            }}
          />
        </div>
      </section>

      {/* FINAL URGENCY BANNER */}
      <section className="lightning-section" style={{
        backgroundColor: '#ff4444',
        background: 'linear-gradient(135deg, #ff4444, #cc0000)',
        padding: '2rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          animation: 'shimmer 2s ease-in-out infinite'
        }} />
        <div style={{
          color: '#ffffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: '900',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 2
        }}>
          ⚡ THE WINDOW IS CLOSING. THE EMPIRE AWAITS. ⚡
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .lightning-section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </>
  );
};

export default KineticNeedlesPage_Optimized;