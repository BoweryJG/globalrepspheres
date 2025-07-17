import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const CRMIntegrations = () => {
  const [connectedSystems, setConnectedSystems] = useState({});
  const [isConnecting, setIsConnecting] = useState({});
  const integrationRefs = useRef([]);

  const crmSystems = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: '☁️',
      color: '#00A1E0',
      description: 'Connect to your Salesforce org instantly'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      icon: '🧡',
      color: '#FF7A59',
      description: 'Sync with your HubSpot CRM'
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      icon: '🚀',
      color: '#1FC219',
      description: 'Integrate with Pipedrive pipeline'
    },
    {
      id: 'monday',
      name: 'Monday.com',
      icon: '📅',
      color: '#6C6CFF',
      description: 'Connect to Monday CRM boards'
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      icon: '⚡',
      color: '#E94B3C',
      description: 'Link with Zoho CRM data'
    },
    {
      id: 'dynamics',
      name: 'Microsoft Dynamics',
      icon: '🔗',
      color: '#0078D4',
      description: 'Sync with Dynamics 365'
    }
  ];

  useEffect(() => {
    // Animate integrations on load
    integrationRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 30, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.6, 
            delay: index * 0.1,
            ease: "back.out(1.7)"
          }
        );
      }
    });
  }, []);

  const handleConnect = async (systemId) => {
    if (connectedSystems[systemId]) {
      // Disconnect
      setConnectedSystems(prev => ({ ...prev, [systemId]: false }));
      return;
    }

    setIsConnecting(prev => ({ ...prev, [systemId]: true }));

    // Simulate connection process
    setTimeout(() => {
      setConnectedSystems(prev => ({ ...prev, [systemId]: true }));
      setIsConnecting(prev => ({ ...prev, [systemId]: false }));
      
      // Success animation
      const ref = integrationRefs.current.find(ref => 
        ref && ref.dataset.systemId === systemId
      );
      if (ref) {
        gsap.to(ref, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    }, 1500);
  };

  const addIntegrationRef = (el) => {
    if (el && !integrationRefs.current.includes(el)) {
      integrationRefs.current.push(el);
    }
  };

  return (
    <section style={{
      backgroundColor: '#0a0a0a',
      padding: 'clamp(80px, 10vh, 120px) 0',
      position: 'relative'
    }}>
      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '1rem',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
          }}>
            🔗 Instant CRM Integration
          </h2>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#cccccc',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Connect to your existing CRM with one click. No IT tickets, no waiting, 
            no complex setup. Start enhancing your pipeline immediately.
          </p>
        </div>

        {/* Integration Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {crmSystems.map((system, index) => {
            const isConnected = connectedSystems[system.id];
            const isLoading = isConnecting[system.id];
            
            return (
              <div
                key={system.id}
                ref={addIntegrationRef}
                data-system-id={system.id}
                style={{
                  background: isConnected 
                    ? `linear-gradient(135deg, ${system.color}20, ${system.color}10)`
                    : 'linear-gradient(135deg, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.9))',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: isConnected 
                    ? `2px solid ${system.color}60`
                    : '1px solid rgba(100, 100, 100, 0.3)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isConnected ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isConnected 
                    ? `0 0 30px ${system.color}40`
                    : '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => handleConnect(system.id)}
                onMouseEnter={(e) => {
                  if (!isConnected) {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isConnected) {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }
                }}
              >
                {/* Connection Status Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isConnected ? '#00ff88' : '#666666',
                  boxShadow: isConnected ? '0 0 10px #00ff88' : 'none',
                  animation: isLoading ? 'pulse 1s ease-in-out infinite' : 'none'
                }} />

                {/* System Icon and Name */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginRight: '1rem'
                  }}>
                    {system.icon}
                  </div>
                  <div>
                    <h3 style={{
                      color: isConnected ? system.color : '#ffffff',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem'
                    }}>
                      {system.name}
                    </h3>
                    <p style={{
                      color: '#cccccc',
                      fontSize: '0.9rem',
                      margin: 0
                    }}>
                      {system.description}
                    </p>
                  </div>
                </div>

                {/* Connection Button */}
                <div style={{
                  background: isConnected 
                    ? `linear-gradient(135deg, ${system.color}, ${system.color}CC)`
                    : 'linear-gradient(135deg, #333333, #444444)',
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center',
                  border: `1px solid ${isConnected ? system.color : '#555555'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {isLoading && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      animation: 'shimmer 1.5s ease-in-out infinite'
                    }} />
                  )}
                  
                  <div style={{
                    color: isConnected ? '#ffffff' : '#cccccc',
                    fontSize: '1rem',
                    fontWeight: '600',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {isLoading ? 'Connecting...' : 
                     isConnected ? '✓ Connected' : 
                     'Click to Connect'}
                  </div>
                </div>

                {/* Data Flow Indicator */}
                {isConnected && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.8rem',
                    background: 'rgba(0, 255, 136, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    fontSize: '0.85rem',
                    color: '#00ff88',
                    textAlign: 'center'
                  }}>
                    📊 Data syncing in real-time
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connected Summary */}
        {Object.values(connectedSystems).some(Boolean) && (
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 200, 100, 0.05))',
            padding: '2rem',
            borderRadius: '15px',
            border: '2px solid rgba(0, 255, 136, 0.3)',
            boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)'
          }}>
            <h3 style={{
              color: '#00ff88',
              fontSize: '1.5rem',
              fontWeight: '800',
              marginBottom: '1rem'
            }}>
              🎉 Integration Active!
            </h3>
            <p style={{
              color: '#ffffff',
              fontSize: '1.1rem',
              lineHeight: '1.5',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Your RepSpheres intelligence is now flowing into your existing workflow. 
              Every call, every insight, every breakthrough automatically synced.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
};

export default CRMIntegrations;