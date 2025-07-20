import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RepSpheresNavbar from './RepSpheresNavbar';
import LoginModal from './LoginModal';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import './RepSpheresNavbar.css';
import DimensionalTear from './DimensionalTear';
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
import KineticTimelineSection from './KineticTimelineSection';
import { kineticStyles } from './KineticStyles';
import './LightningStrikeEnhancements.css';
import './MobileOptimizedStyles.css';

gsap.registerPlugin(ScrollTrigger);

const KineticNeedlesPage_Optimized = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

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
    <AuthProvider>
      <style>{kineticStyles}</style>
      
      {/* Animated Background Elements */}
      <KineticStarfield />
      <KineticDataGrid />

      {/* Navigation Bar */}
      <RepSpheresNavbar 
        onLogin={() => {
          setIsSignupMode(false);
          setShowLoginModal(true);
        }}
        onSignup={() => {
          setIsSignupMode(true);
          setShowLoginModal(true);
        }}
        customLinks={[
          { href: 'https://marketdata.repspheres.com/', label: 'Market Data', icon: 'market' },
          { href: 'https://canvas.repspheres.com/', label: 'Canvas', icon: 'canvas' },
          { href: 'https://repconnect.repspheres.com/', label: 'RepConnect', icon: 'pipeline' },
          { href: 'https://crm.repspheres.com/', label: 'CRM', icon: 'sphere' }
        ]}
      />

      {/* 1. THE DIMENSIONAL TEAR - The Second Electricity Moment */}
      <div id="dimensional-tear" className="lightning-section">
        <DimensionalTear />
      </div>

      {/* 2. KINETIC TIMELINE - While They React, We Predict */}
      <div className="lightning-section">
        <KineticTimelineSection />
      </div>

      {/* 3. THE GREAT DIVIDE - Which Side Are You On? */}
      <div className="lightning-section">
        <GreatDivide />
      </div>

      {/* 4. MATHEMATICAL PROOF - This Isn't Opinion. It's Math. */}
      <div id="mathematical-proof" className="lightning-section">
        <MathematicalProof />
      </div>

      {/* 5. CANVAS INTELLIGENCE - The HOW Behind the Results */}
      <div id="canvas" className="lightning-section">
        <CanvasIntelligence />
      </div>

      {/* 6. HARVEY WHISPER - Championship Coach in Your Ear */}
      <section id="harvey-whisper" className="lightning-section section-container" style={{ 
        backgroundColor: '#0a0a0a', 
        padding: 'clamp(80px, 10vh, 120px) 0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative' 
      }}>
        <HarveyWhisper />
      </section>

      {/* 7. SPEED TUNNEL - Experience the 75x Differential */}
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

      {/* 8. SUBSCRIPTION TIERS - Choose Your Path */}
      <div id="pricing" className="lightning-section">
        <SubscriptionTiers />
      </div>

      {/* 9. CRM INTEGRATIONS - Connect Instantly */}
      <CRMIntegrations />

      {/* 10. URGENCY & SCARCITY - Final Call */}
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

      {/* 11. MAGNETIC CHOICE - Choose Your Destiny */}
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

      {/* Authentication Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        mode={isSignupMode ? 'signup' : 'login'}
        onClose={() => setShowLoginModal(false)}
        onGoogleAuth={async () => {
          // Handle Google auth
          console.log(`${isSignupMode ? 'Signup' : 'Login'} with Google triggered`);
          setShowLoginModal(false);
        }}
        onFacebookAuth={async () => {
          // Handle Facebook auth  
          console.log(`${isSignupMode ? 'Signup' : 'Login'} with Facebook triggered`);
          setShowLoginModal(false);
        }}
        onEmailAuth={async () => {
          // Handle email auth
          console.log(`${isSignupMode ? 'Signup' : 'Login'} with Email triggered`);
          setShowLoginModal(false);
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .lightning-section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </AuthProvider>
  );
};

export default KineticNeedlesPage_Optimized;