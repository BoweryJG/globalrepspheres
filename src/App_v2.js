import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import StarryBackground_Enhanced from './components/StarryBackground_Enhanced';
import AnimatedOrbHeroBG_FullOptimized from './components/AnimatedOrbHeroBG_FullOptimized';
import HeroSection from './components/HeroSection_v2';
import TheMomentSection from './components/TheMomentSection';
import ThePlatformSection from './components/ThePlatformSection';
import PricingSection from './components/PricingSection_v2';
import FinalCTASection from './components/FinalCTASection';
import OrbContextProvider from './components/OrbContextProvider';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import PerformanceMonitor from './components/PerformanceMonitor';
import PerformanceToggle from './components/PerformanceToggle';

function App() {
  const [performanceMode, setPerformanceMode] = useState(() => {
    const saved = localStorage.getItem('performanceMode');
    return saved === 'true';
  });
  
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  useEffect(() => {
    localStorage.setItem('performanceMode', performanceMode);
  }, [performanceMode]);

  return (
    <OrbContextProvider>
      <AuthProvider>
        {/* Background Elements */}
        <StarryBackground_Enhanced />
        <AnimatedOrbHeroBG_FullOptimized zIndex={5} />
        
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content - Consolidated Flow */}
        <HeroSection />
        <TheMomentSection />
        <ThePlatformSection />
        <PricingSection />
        <FinalCTASection />
        
        {/* Footer & Utilities */}
        <Footer />
        <ThemeToggle />
        <PerformanceToggle 
          performanceMode={performanceMode}
          setPerformanceMode={setPerformanceMode}
          showMonitor={showPerformanceMonitor}
          setShowMonitor={setShowPerformanceMonitor}
        />
        {showPerformanceMonitor && <PerformanceMonitor />}
      </AuthProvider>
    </OrbContextProvider>
  );
}

export default App;