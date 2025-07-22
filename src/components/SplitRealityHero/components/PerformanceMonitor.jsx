import React, { useState, useEffect } from 'react';
import { usePerformance } from '../hooks/usePerformance';

/**
 * Performance Monitor Component
 * Shows real-time performance metrics for the Split Reality Hero
 */
const PerformanceMonitor = ({ show = false }) => {
  const { fps, performanceMode, isLowEndDevice, togglePerformanceMode } = usePerformance();
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    domNodes: 0,
    animations: 0
  });

  useEffect(() => {
    if (!show) return;

    const updateMetrics = () => {
      // Measure render time
      const renderStart = performance.now();
      requestAnimationFrame(() => {
        const renderTime = performance.now() - renderStart;
        
        // Get memory usage (Chrome only)
        const memoryInfo = performance.memory;
        const memoryUsage = memoryInfo 
          ? Math.round((memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100)
          : 0;
        
        // Count DOM nodes
        const domNodes = document.querySelectorAll('*').length;
        
        // Count active animations
        const animations = document.getAnimations ? document.getAnimations().length : 0;
        
        setMetrics({
          renderTime: Math.round(renderTime * 100) / 100,
          memoryUsage,
          domNodes,
          animations
        });
      });
    };

    const interval = setInterval(updateMetrics, 1000);
    updateMetrics();

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#FFD700',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '200px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(159, 88, 250, 0.3)'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#9F58FA' }}>
        Performance Monitor
      </h4>
      
      <div style={{ display: 'grid', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>FPS:</span>
          <span style={{ 
            color: fps >= 50 ? '#4CAF50' : fps >= 30 ? '#FFD700' : '#FF4444' 
          }}>
            {fps}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Render:</span>
          <span>{metrics.renderTime}ms</span>
        </div>
        
        {metrics.memoryUsage > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Memory:</span>
            <span>{metrics.memoryUsage}%</span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>DOM Nodes:</span>
          <span>{metrics.domNodes}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Animations:</span>
          <span>{metrics.animations}</span>
        </div>
        
        <div style={{ 
          marginTop: '8px', 
          paddingTop: '8px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Performance Mode:</span>
            <button
              onClick={togglePerformanceMode}
              style={{
                background: performanceMode ? '#4CAF50' : '#666',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              {performanceMode ? 'ON' : 'OFF'}
            </button>
          </div>
          
          {isLowEndDevice && (
            <div style={{ 
              marginTop: '8px', 
              fontSize: '10px', 
              color: '#FFA500' 
            }}>
              ⚠️ Low-end device detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;