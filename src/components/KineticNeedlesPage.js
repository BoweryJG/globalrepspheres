import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalNavBar from './GlobalNavBar';
import KineticHeroSection from './KineticHeroSection';
import KineticTimelineSection from './KineticTimelineSection';
import KineticStarfield from './KineticStarfield';
import KineticDataGrid from './KineticDataGrid';
import { kineticStyles } from './KineticStyles';

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
      <GlobalNavBar />

      {/* Hero Section */}
      <KineticHeroSection />

      {/* Intelligence Timeline */}
      <KineticTimelineSection />

      {/* Add more sections as needed */}
    </>
  );
};

export default KineticNeedlesPage;