import React from 'react';
import NavBar from './components/NavBar';
import StarryBackground from './components/StarryBackground_Ultra';
import AnimatedOrbHeroBG from './components/AnimatedOrbHeroBG';
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

function App() {
  return (
    <OrbContextProvider>
      <AuthProvider>
        <StarryBackground />
        <NavBar />
        <AnimatedOrbHeroBG zIndex={5} />
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
      </AuthProvider>
    </OrbContextProvider>
  );
}

export default App;
