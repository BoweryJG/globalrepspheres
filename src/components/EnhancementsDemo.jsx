import React from 'react';
import SynchronizationEngine from './SynchronizationEngine';
import StrategicWhisperAudio from './StrategicWhisperAudio';
import { 
  MarketDataIcon, 
  CanvasIcon, 
  CRMIcon, 
  RepConnectIcon,
  SynchronizationIcon,
  SpeedIcon,
  IntelligenceIcon,
  AutomationIcon,
  WhisperCoachIcon,
  LoginIcon,
  StartTrialIcon,
  UpgradeIcon
} from './Icons/CustomIcons';
import '../styles/CategoryDefiningTypography.css';

const EnhancementsDemo = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(180deg, #0a0a0c 0%, #1a0a1f 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Typography Showcase */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="type-hero">Category-Defining Typography</h1>
        <h2 className="type-display">Mobile-First Design System</h2>
        <h3 className="type-h1">Revolutionary Sales Platform</h3>
        <h4 className="type-h2">Powered by AI Intelligence</h4>
        <p className="type-body">
          Experience the future of medical sales with our award-winning design system.
          Every element is crafted for maximum impact and mobile performance.
        </p>
        <div style={{ marginTop: '40px' }}>
          <span className="type-glitch" data-text="75x FASTER">75x FASTER</span>
        </div>
      </section>

      {/* Icon Showcase */}
      <section style={{ padding: '80px 20px', background: 'rgba(20, 20, 30, 0.6)' }}>
        <h2 className="type-display" style={{ textAlign: 'center', marginBottom: '60px' }}>
          Custom Icon System
        </h2>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 className="type-h3" style={{ marginBottom: '30px' }}>Navigation Icons</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            <IconCard title="Market Data" Icon={MarketDataIcon} />
            <IconCard title="Canvas AI" Icon={CanvasIcon} />
            <IconCard title="CRM System" Icon={CRMIcon} />
            <IconCard title="RepConnect" Icon={RepConnectIcon} />
          </div>

          <h3 className="type-h3" style={{ marginBottom: '30px' }}>Feature Icons</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            <IconCard title="Synchronization" Icon={SynchronizationIcon} />
            <IconCard title="Speed" Icon={SpeedIcon} />
            <IconCard title="Intelligence" Icon={IntelligenceIcon} />
            <IconCard title="Automation" Icon={AutomationIcon} />
            <IconCard title="Whisper Coach" Icon={WhisperCoachIcon} />
          </div>

          <h3 className="type-h3" style={{ marginBottom: '30px' }}>Action Icons</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <IconCard title="Login" Icon={LoginIcon} />
            <IconCard title="Start Trial" Icon={StartTrialIcon} />
            <IconCard title="Upgrade" Icon={UpgradeIcon} />
          </div>
        </div>
      </section>

      {/* Synchronization Engine */}
      <SynchronizationEngine />

      {/* Strategic Whisper Audio */}
      <StrategicWhisperAudio />
    </div>
  );
};

const IconCard = ({ title, Icon }) => (
  <div style={{
    background: 'rgba(20, 20, 30, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 0, 255, 0.3)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}>
    <div style={{ marginBottom: '20px' }}>
      <Icon size={48} animate={true} />
    </div>
    <h4 className="type-h4" style={{ margin: 0 }}>{title}</h4>
  </div>
);

export default EnhancementsDemo;