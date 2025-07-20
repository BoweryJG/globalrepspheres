import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import StarryBackground from './components/StarryBackground_Ultra';
import StarryBackground_Enhanced from './components/StarryBackground_Enhanced';
import AnimatedOrbExact from './components/AnimatedOrbExact';
import HeroTransformationSection from './components/HeroTransformationSection';
import IntelligenceTrinitySection from './components/IntelligenceTrinitySection';
import MultiplierEffectSection from './components/MultiplierEffectSection';
import BridgeSection from './components/BridgeSection';
import PricingSection from './components/PricingSection';
import DecisionPointSection from './components/DecisionPointSection';
import Footer from './components/Footer';
import PerformanceMonitor from './components/PerformanceMonitor';
import HarveyLauncher from './components/HarveyLauncher';
import KineticNeedlesPage from './components/KineticNeedlesPage_Optimized';
import { logBackendStatus } from './utils/backendHealth';
function App() {
  const [useKineticDesign] = useState(true); // Set to true to use the new kinetic design
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
    
    // Check backend health on app startup
    logBackendStatus();
    
    return () => {
      window.removeEventListener('performanceModeChanged', handlePerformanceModeChange);
    };
  }, []);

  // If using kinetic design, return the new page
  if (useKineticDesign) {
    return <KineticNeedlesPage />;
  }

  // Otherwise, return the original design
  // Choose the appropriate components based on performance mode
  // Use exact SVG version that matches header_orb copy.html
  const OrbComponent = AnimatedOrbExact;
  const StarComponent = performanceMode ? StarryBackground_Enhanced : StarryBackground;

  return (
    <>
      <StarComponent />
      <NavBar />
      <OrbComponent zIndex={5} />
      <HeroTransformationSection />
      <IntelligenceTrinitySection />
      <MultiplierEffectSection />
      <BridgeSection />
      <PricingSection />
      <DecisionPointSection />
      <Footer />
      {showPerformanceMonitor && <PerformanceMonitor />}
      <HarveyLauncher />
    </>
  );
}

export default App;
