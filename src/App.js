import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import StarryBackground from './components/StarryBackground_Ultra';
import StarryBackground_Enhanced from './components/StarryBackground_Enhanced';
import AnimatedOrbHeroBG from './components/AnimatedOrbHeroBG_Optimized';
import AnimatedOrbHeroBG_FullOptimized from './components/AnimatedOrbHeroBG_FullOptimized';
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
import ThemeToggle from './components/ThemeToggle';
import PerformanceMonitor from './components/PerformanceMonitor';
import PerformanceToggle from './components/PerformanceToggle';
import ChatbotLauncher from './components/ChatbotLauncher';

function App() {
  const [performanceMode, setPerformanceMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('performanceMode');
    return saved === 'true';
  });
  
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  useEffect(() => {
    // Save preference
    localStorage.setItem('performanceMode', performanceMode);
  }, [performanceMode]);

  // Choose the appropriate components based on performance mode
  const OrbComponent = performanceMode ? AnimatedOrbHeroBG_FullOptimized : AnimatedOrbHeroBG;
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
        <ThemeToggle />
        <PerformanceToggle 
          performanceMode={performanceMode}
          setPerformanceMode={setPerformanceMode}
          showMonitor={showPerformanceMonitor}
          setShowMonitor={setShowPerformanceMonitor}
        />
        {showPerformanceMonitor && <PerformanceMonitor />}
        <ChatbotLauncher />
      </AuthProvider>
    </OrbContextProvider>
  );
}

export default App;
