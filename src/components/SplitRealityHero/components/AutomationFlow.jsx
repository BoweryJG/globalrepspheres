import React, { useEffect, useRef } from 'react';
import './AutomationFlow.css';

/**
 * Automation Flow Component - Shows data transforming from burden to freedom
 * CRM fields becoming golden butterflies that fly away
 */
const AutomationFlow = ({ isActive, isMobile }) => {
  const flowRef = useRef(null);
  const butterfliesRef = useRef(null);

  useEffect(() => {
    if (!isActive || !flowRef.current) return;

    const container = butterfliesRef.current;
    const crmFields = ['Name', 'Email', 'Phone', 'Status', 'Notes', 'Follow-up', 'Deal Size', 'Next Step'];
    
    // Create transformation animation
    const createButterfly = (field) => {
      // Create CRM field element
      const fieldElement = document.createElement('div');
      fieldElement.className = 'crm-field-transform';
      fieldElement.textContent = field;
      
      // Position randomly on dark side
      if (isMobile) {
        fieldElement.style.left = Math.random() * 80 + 10 + '%';
        fieldElement.style.top = '25%';
      } else {
        fieldElement.style.left = '25%';
        fieldElement.style.top = Math.random() * 80 + 10 + '%';
      }
      
      container.appendChild(fieldElement);
      
      // After a delay, transform to butterfly
      setTimeout(() => {
        fieldElement.classList.add('transforming');
        
        // Create butterfly
        const butterfly = document.createElement('div');
        butterfly.className = 'golden-butterfly';
        butterfly.innerHTML = `
          <div class="butterfly-body"></div>
          <div class="butterfly-wings">
            <div class="wing left"></div>
            <div class="wing right"></div>
          </div>
        `;
        
        // Copy position
        butterfly.style.left = fieldElement.style.left;
        butterfly.style.top = fieldElement.style.top;
        
        container.appendChild(butterfly);
        
        // Remove field element
        setTimeout(() => {
          fieldElement.remove();
          
          // Animate butterfly to freedom
          butterfly.classList.add('flying');
          
          // Remove butterfly after animation
          setTimeout(() => {
            butterfly.remove();
          }, 3000);
        }, 500);
      }, Math.random() * 1000 + 500);
    };

    // Create butterflies periodically
    let index = 0;
    const interval = setInterval(() => {
      if (index < crmFields.length) {
        createButterfly(crmFields[index]);
        index++;
      } else {
        index = 0;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isActive, isMobile]);

  return (
    <div ref={flowRef} className={`automation-flow ${isActive ? 'active' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Butterfly Container */}
      <div ref={butterfliesRef} className="butterflies-container" />
      
      {/* Flow Indicators */}
      <div className="flow-indicators">
        <div className="flow-line" />
        <div className="flow-pulse pulse-1" />
        <div className="flow-pulse pulse-2" />
        <div className="flow-pulse pulse-3" />
      </div>
      
      {/* Automation Labels */}
      <div className="automation-labels">
        <div className="label-start">
          <span className="label-icon">📊</span>
          <span className="label-text">Manual Data</span>
        </div>
        <div className="label-process">
          <span className="label-icon">⚡</span>
          <span className="label-text">RepSpheres Magic</span>
        </div>
        <div className="label-end">
          <span className="label-icon">🦋</span>
          <span className="label-text">Freedom</span>
        </div>
      </div>
      
      {/* Transformation Stats */}
      <div className="transformation-stats">
        <div className="stat">
          <span className="stat-number">0</span>
          <span className="stat-label">Manual Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">Automated</span>
        </div>
        <div className="stat">
          <span className="stat-number">∞</span>
          <span className="stat-label">Time Saved</span>
        </div>
      </div>
    </div>
  );
};

export default AutomationFlow;