import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RepSpheresNavbar from './RepSpheresNavbar';
import './RepSpheresNavbar.css';
import DimensionalTear from './DimensionalTear';
import GreatDivide from './GreatDivide';
import AgentCommandCenter from './AgentCommandCenter';
import IntegrationAdvantage from './IntegrationAdvantage';
import SubscriptionTiers from './SubscriptionTiers';
import EntryPointSection from './EntryPointSection';
import HarveyWhisper from './HarveyWhisper';
import DealCounter from './DealCounter';
import MagneticButtons from './MagneticButtons';
import SpeedTunnel from './SpeedTunnel';
import WealthVault from './WealthVault';
import KineticTimelineSection from './KineticTimelineSection';
import KineticStarfield from './KineticStarfield';
import KineticDataGrid from './KineticDataGrid';
import MathematicalProof from './MathematicalProof';
import UrgencyTimer from './UrgencyTimer';
import ScarcityIndicator from './ScarcityIndicator';
import EmpireOpportunity from './EmpireOpportunity';
import { kineticStyles } from './KineticStyles';
import './LightningStrikeEnhancements.css';

gsap.registerPlugin(ScrollTrigger);

const KineticNeedlesPage = () => {
  useEffect(() => {
    // Initialize animations
    document.querySelectorAll('.timeline-step').forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 80%",
        onEnter: () => {
          setTimeout(() => {
            step.classList.add('active');
          }, index * 100);
        }
      });
    });

    // Subtle idle rotation for screws every 4 seconds
    const screwInterval = setInterval(() => {
      document.querySelectorAll('.corner-screw, .nav-screw').forEach(screw => {
        const angle = Math.random() * 30 - 15; // Random between -15 and +15 degrees
        screw.style.transform = `rotate(${angle}deg)`;
      });
    }, 4000);

    // Title and favicon pulse when scrolled to 90%
    let faviconPulseTriggered = false;
    
    const handleScroll = () => {
      const scrollPercentage = (window.pageYOffset) / (document.documentElement.scrollHeight - window.innerHeight);
      
      if (!faviconPulseTriggered && scrollPercentage > 0.9) {
        faviconPulseTriggered = true;
        
        // Store original title
        const originalTitle = document.title;
        
        // Pulse title
        document.title = "🔥 " + originalTitle + " 🔥";
        
        // Flash favicon
        const links = document.querySelectorAll("link[rel*='icon']");
        const originalHrefs = Array.from(links).map(link => link.href);
        
        // Create flashing effect
        let flashCount = 0;
        const flashInterval = setInterval(() => {
          links.forEach((link, index) => {
            link.href = flashCount % 2 === 0 ? 
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="%239f58fa"/></svg>' : 
              originalHrefs[index];
          });
          
          flashCount++;
          
          if (flashCount > 6) {
            clearInterval(flashInterval);
            // Restore original favicon
            links.forEach((link, index) => {
              link.href = originalHrefs[index];
            });
            
            // Restore title after a delay
            setTimeout(() => {
              document.title = originalTitle;
            }, 2000);
          }
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(screwInterval);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{kineticStyles}</style>
      
      {/* SVG Icon Definitions */}
      <svg className="icon-defs">
        <defs>
          {/* Gradient Definitions */}
          <linearGradient id="gradient-purple-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9f58fa', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4B96DC', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="gradient-green-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4bd48e', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="gradient-orange-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ffd93d', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="gradient-pink-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f53969', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9f58fa', stopOpacity: 1 }} />
          </linearGradient>

          {/* Enhanced Social Intelligence Icon */}
          <symbol id="social-intelligence" viewBox="0 0 48 48">
            <circle cx="24" cy="12" r="8" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" fill="none"/>
            <path d="M36 36c0-6.627-5.373-12-12-12s-12 5.373-12 12" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" fill="none"/>
            <circle cx="40" cy="16" r="4" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" fill="none"/>
            <circle cx="8" cy="16" r="4" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" fill="none"/>
            <path d="M32 12l6 3M16 12l-6 3" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" opacity="0.7"/>
            <path d="M24 20v-8M18 10l6-6 6 6" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <circle cx="24" cy="12" r="2" fill="url(#gradient-purple-blue)"/>
          </symbol>

          {/* Enhanced Regulatory Window Icon */}
          <symbol id="regulatory-window" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" stroke="url(#gradient-pink-purple)" strokeWidth="1.5" fill="none"/>
            <path d="M24 12v12l8 8" stroke="url(#gradient-pink-purple)" strokeWidth="2"/>
            <circle cx="24" cy="24" r="16" stroke="url(#gradient-pink-purple)" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M12 4l4 4M36 4l-4 4" stroke="#f53969" strokeWidth="1.5"/>
            <path d="M16 38h16" stroke="#f53969" strokeWidth="2"/>
            <text x="24" y="28" textAnchor="middle" fontSize="10" fill="#f53969" fontWeight="bold">12</text>
            <circle cx="24" cy="24" r="3" fill="url(#gradient-pink-purple)"/>
          </symbol>

          {/* Enhanced Practice Scanner Icon */}
          <symbol id="practice-scanner" viewBox="0 0 48 48">
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="url(#gradient-green-cyan)" strokeWidth="1.5" fill="none"/>
            <path d="M8 16h32M16 8v8M32 8v8" stroke="url(#gradient-green-cyan)" strokeWidth="1.5" opacity="0.7"/>
            <path d="M16 24h16M16 32h8" stroke="url(#gradient-green-cyan)" strokeWidth="1.5"/>
            <circle cx="36" cy="36" r="8" fill="#4bd48e"/>
            <path d="M36 32v8M32 36h8" stroke="white" strokeWidth="2"/>
            <rect x="12" y="20" width="24" height="16" rx="2" fill="url(#gradient-green-cyan)" opacity="0.1"/>
          </symbol>

          {/* Enhanced AI Deployment Icon */}
          <symbol id="ai-deployment" viewBox="0 0 48 48">
            <path d="M24 4l16 8v16l-16 8-16-8V12z" stroke="url(#gradient-orange-yellow)" strokeWidth="1.5" fill="none"/>
            <path d="M24 20v16M8 12l16 8 16-8M16 16v16l8 4 8-4V16" stroke="url(#gradient-orange-yellow)" strokeWidth="1.5" opacity="0.7"/>
            <circle cx="24" cy="20" r="4" fill="url(#gradient-orange-yellow)"/>
            <circle cx="24" cy="20" r="6" stroke="url(#gradient-orange-yellow)" strokeWidth="0.5" fill="none" opacity="0.5"/>
            <path d="M20 40l4-4 4 4" stroke="url(#gradient-orange-yellow)" strokeWidth="2"/>
          </symbol>

          {/* Enhanced Data Control Icon */}
          <symbol id="data-control" viewBox="0 0 48 48">
            <rect x="4" y="8" width="16" height="32" rx="2" stroke="url(#gradient-green-cyan)" strokeWidth="1.5" fill="none"/>
            <rect x="28" y="8" width="16" height="32" rx="2" stroke="url(#gradient-green-cyan)" strokeWidth="1.5" fill="none"/>
            <path d="M20 24h8M24 20v8" stroke="url(#gradient-green-cyan)" strokeWidth="2"/>
            <circle cx="12" cy="16" r="2" fill="#4bd48e"/>
            <circle cx="12" cy="24" r="2" fill="#4bd48e"/>
            <circle cx="12" cy="32" r="2" fill="#4bd48e"/>
            <path d="M32 16h8M32 24h8M32 32h8" stroke="url(#gradient-green-cyan)" strokeWidth="1.5"/>
            <rect x="8" y="12" width="8" height="24" rx="1" fill="url(#gradient-green-cyan)" opacity="0.1"/>
            <rect x="32" y="12" width="8" height="24" rx="1" fill="url(#gradient-green-cyan)" opacity="0.1"/>
          </symbol>

          {/* Enhanced Alexis Sterling AI Icon */}
          <symbol id="alexis-sterling-ai" viewBox="0 0 48 48">
            <circle cx="24" cy="20" r="12" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" fill="none"/>
            <path d="M24 32v8M16 36h16" stroke="url(#gradient-purple-blue)" strokeWidth="1.5"/>
            <circle cx="19" cy="18" r="2" fill="#9f58fa"/>
            <circle cx="29" cy="18" r="2" fill="#9f58fa"/>
            <path d="M19 24c0 2.761 2.239 5 5 5s5-2.239 5-5" stroke="url(#gradient-purple-blue)" strokeWidth="1.5"/>
            <circle cx="24" cy="20" r="10" stroke="url(#gradient-purple-blue)" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M12 8l4 4M36 8l-4 4M8 20h4M36 20h4" stroke="url(#gradient-purple-blue)" strokeWidth="1.5" opacity="0.5"/>
            <circle cx="24" cy="8" r="2" fill="#4B96DC"/>
          </symbol>
        </defs>
      </svg>

      {/* Animated Starfield */}
      <KineticStarfield />
      
      {/* Data Grid */}
      <KineticDataGrid />

      {/* Navigation Bar */}
      <RepSpheresNavbar 
        onLogin={() => window.location.href = '/login'}
        onSignup={() => window.location.href = '/signup'}
        customLinks={[
          { href: '#dimensional-tear', label: 'The Moment', icon: 'market' },
          { href: '#mathematical-proof', label: 'The Math', icon: 'canvas' },
          { href: '#empire', label: 'Your Empire', icon: 'pipeline' },
          { href: '#empire', label: 'Your Empire', icon: 'sphere' },
          { href: '#pricing', label: 'Join Now', icon: 'podcasts' }
        ]}
      />

      {/* Hero Section - Dimensional Tear */}
      <div id="dimensional-tear">
        <DimensionalTear />
      </div>

      {/* The Great Divide Section */}
      <GreatDivide />

      {/* Mathematical Proof Section */}
      <div id="mathematical-proof">
        <MathematicalProof />
      </div>

      {/* Empire Opportunity Section */}
      <div id="empire">
        <EmpireOpportunity />
      </div>


      {/* Harvey Whisper Section - Binaural Helix */}
      <section id="harvey-whisper" className="section-container" style={{ 
        backgroundColor: '#0a0a0a', 
        padding: 'clamp(80px, 10vh, 120px) 0',
        marginTop: 'clamp(100px, 15vh, 150px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#FFD700', 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '3rem',
            fontWeight: '800',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
          }}>
            Harvey Whispers Your Empire's Blueprint
          </h2>
          <HarveyWhisper />
        </div>
      </section>

      {/* Deal Counter Section */}
      <section id="deal-counter" className="section-container" style={{ 
        backgroundColor: '#111111', 
        padding: 'clamp(80px, 10vh, 120px) 0',
        marginTop: 'clamp(100px, 15vh, 150px)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h2 style={{ 
            color: '#FFFFFF', 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            Watch the Empire Grow in Real-Time
          </h2>
          <DealCounter 
            initialCount={872} 
            targetCount={2500} 
            duration={60000}
          />
        </div>
      </section>

      {/* Speed Tunnel - 75x Visualization */}
      <section id="speed-tunnel" className="section-container" style={{ 
        backgroundColor: '#000000', 
        padding: '0',
        marginTop: 'clamp(100px, 15vh, 150px)',
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
          textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
        }}>
          Experience the 75x Speed Differential
        </h2>
        <SpeedTunnel />
      </section>


      {/* Corporate Prison Break Section */}
      <section id="corporate-prison-break" className="section-container" style={{ 
        backgroundColor: '#000000', 
        padding: '0',
        marginTop: 'clamp(100px, 15vh, 150px)',
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
          textShadow: '0 0 30px rgba(255, 68, 68, 0.5)'
        }}>
          Break the Corporate Chains
        </h2>
        <CorporatePrisonBreak />
      </section>

      {/* Empire Opportunity Section */}
      <div id="empire">
        <EmpireOpportunity />
      </div>

      {/* Wealth Vault - 4D Accumulation */}
      <section id="wealth-vault" className="section-container" style={{ 
        backgroundColor: '#000000', 
        padding: '0',
        marginTop: 'clamp(100px, 15vh, 150px)',
        position: 'relative'
      }}>
        <h2 style={{ 
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFD700', 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          textAlign: 'center',
          zIndex: 20,
          textShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
        }}>
          Your Wealth Accumulation Vault
        </h2>
        <WealthVault />
      </section>

      {/* Subscription Tiers Section */}
      <div id="pricing">
        <SubscriptionTiers />
      </div>

      {/* Urgency and Scarcity Section */}
      <section id="urgency-scarcity" className="section-container" style={{ 
        backgroundColor: '#0a0a0a', 
        padding: 'clamp(80px, 10vh, 120px) 0',
        marginTop: 'clamp(50px, 8vh, 80px)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
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

      {/* Entry Point Section */}
      <EntryPointSection />

      {/* Magnetic Choice Section */}
      <section id="magnetic-choice" className="section-container" style={{ 
        backgroundColor: '#0f0f0f', 
        padding: 'clamp(100px, 12vh, 150px) 0',
        marginTop: 'clamp(100px, 15vh, 150px)',
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
                // Scroll to sign up or show modal
                window.location.href = '#signup';
              } else {
                // Show warning or educate
                console.log('User chose to keep falling behind');
              }
            }}
          />
        </div>
      </section>

      {/* Add more sections as needed */}
    </>
  );
};

export default KineticNeedlesPage;