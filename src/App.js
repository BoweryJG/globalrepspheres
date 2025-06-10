import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import StarryBackground from './components/StarryBackground_Ultra';
import StarryBackground_Enhanced from './components/StarryBackground_Enhanced';
import AnimatedOrbExact from './components/AnimatedOrbExact';
import HeroSectionEnhanced from './components/HeroSectionEnhanced';
import TransformationSection from './components/TransformationSection';
import BridgeSection from './components/BridgeSection';
import TimeMultiplicationSection from './components/TimeMultiplicationSection';
import ModulesSection from './components/ModulesSection';
import RevolutionSection from './components/RevolutionSection';
import CTASection from './components/CTASection';
import PricingSection from './components/PricingSection';
import OrbContextProvider from './components/OrbContextProvider';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';
import PerformanceMonitor from './components/PerformanceMonitor';
import HarveyChatLauncher from './components/HarveyChatLauncher';
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
        <HeroSectionEnhanced />
        <TransformationSection />
        <BridgeSection />
        <TimeMultiplicationSection />
        <ModulesSection />
        <RevolutionSection />
        <CTASection />
        <PricingSection />
        <Footer />
        {showPerformanceMonitor && <PerformanceMonitor />}
        <HarveyChatLauncher />
      </AuthProvider>
    </OrbContextProvider>
  );
}

export default App;
