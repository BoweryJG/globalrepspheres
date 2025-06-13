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
import OrbContextProvider from './components/OrbContextProvider';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import Footer from './components/Footer';
import PerformanceMonitor from './components/PerformanceMonitor';
import HarveyChatLauncher from './components/HarveyChatLauncher';
import { logBackendStatus } from './utils/backendHealth';
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
    
    // Check backend health on app startup
    logBackendStatus();
    
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
        <SubscriptionProvider>
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
        <HarveyChatLauncher />
        </SubscriptionProvider>
      </AuthProvider>
    </OrbContextProvider>
  );
}

export default App;
