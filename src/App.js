import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import StarryBackground from './components/StarryBackground_Ultra';
import StarryBackground_Enhanced from './components/StarryBackground_Enhanced';
import AnimatedOrbExact from './components/AnimatedOrbExact';
import HeroSection from './components/HeroSection';
import PhilosophicalOpenerSection from './components/PhilosophicalOpenerSection';
import CrossroadsSection from './components/CrossroadsSection';
import SystemArchitectsSection from './components/SystemArchitectsSection';
import SocraticMethodSection from './components/SocraticMethodSection';
import ModulesSection from './components/ModulesSection';
import UrgencySection from './components/UrgencySection';
import ProofOfConceptSection from './components/ProofOfConceptSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import OrbContextProvider from './components/OrbContextProvider';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';
import PerformanceMonitor from './components/PerformanceMonitor';
import ChatbotLauncher from './components/ChatbotLauncher';

function App() {
  const [performanceMode, setPerformanceMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('performanceMode');
    return saved === 'true';
  });
  
  const [showPerformanceMonitor] = useState(false);

  useEffect(() => {
    // Listen for performance mode changes from navbar
    const handlePerformanceModeChange = (event) => {
      setPerformanceMode(event.detail);
    };
    
    window.addEventListener('performanceModeChanged', handlePerformanceModeChange);
    
    return () => {
      window.removeEventListener('performanceModeChanged', handlePerformanceModeChange);
    };
  }, []);

  // Choose the appropriate components based on performance mode
  // Use exact SVG version that matches header_orb copy.html
  const OrbComponent = AnimatedOrbExact;
  const StarComponent = performanceMode ? StarryBackground_Enhanced : StarryBackground;

  return (
    <OrbContextProvider>
      <AuthProvider>
        <StarComponent />
        <NavBar />
        <OrbComponent zIndex={5} />
        <HeroSection />
        <PhilosophicalOpenerSection />
        <CrossroadsSection />
        <SystemArchitectsSection />
        <SocraticMethodSection />
        <ModulesSection />
        <UrgencySection />
        <ProofOfConceptSection />
        <CTASection />
        <PricingSection />
        <Footer />
        {showPerformanceMonitor && <PerformanceMonitor />}
        <ChatbotLauncher />
      </AuthProvider>
    </OrbContextProvider>
  );
}

export default App;
