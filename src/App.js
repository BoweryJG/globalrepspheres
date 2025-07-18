import React, { useState, useEffect } from 'react';
import RepSpheresNavbar from './components/RepSpheresNavbar';
import KineticStarfield from './components/KineticStarfield';
import HistoricalMoment from './components/HistoricalMoment';
import ReplacementReality from './components/ReplacementReality';
import IntelligentSynchronization from './components/IntelligentSynchronization';
import AdminElimination from './components/AdminElimination';
import ClosingWindow from './components/ClosingWindow';
import Footer from './components/Footer';
import PerformanceMonitor from './components/PerformanceMonitor';
import HarveyLauncher from './components/HarveyLauncher';
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

  // New 5-section homepage layout with smooth transitions
  return (
    <>
      {/* Background effects */}
      <KineticStarfield />
      
      {/* Navigation */}
      <RepSpheresNavbar />
      
      {/* Main content sections */}
      <main className="main-content">
        <HistoricalMoment />
        <ReplacementReality />
        <IntelligentSynchronization />
        <AdminElimination />
        <ClosingWindow />
      </main>
      
      {/* Footer and utilities */}
      <Footer />
      {showPerformanceMonitor && <PerformanceMonitor />}
      <HarveyLauncher />
      
      {/* Global styles for smooth transitions */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #0a0a0a;
          color: #ffffff;
          overflow-x: hidden;
        }
        
        .main-content {
          position: relative;
          z-index: 1;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Section transition effects */
        section {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s ease-in-out;
        }
        
        /* Intersection observer animations */
        .section-enter {
          opacity: 0;
          transform: translateY(50px);
        }
        
        .section-enter-active {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Performance optimizations */
        * {
          will-change: auto;
        }
        
        ${performanceMode ? `
          * {
            animation-duration: 0.01ms !important;
            animation-delay: 0.01ms !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0.01ms !important;
          }
        ` : ''}
        
        /* Responsive design */
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default App;
