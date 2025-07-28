import React from 'react';

// NAVIGATION ICONS - Award-winning kinetic sculptures

export const MarketDataIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-market-data' : ''}
  >
    <defs>
      <linearGradient id="marketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.8" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Ticker lines morphing into crosshairs */}
    <g className="ticker-group">
      <path d="M4 24 L12 20 L20 28 L28 16 L36 22 L44 18" 
        stroke="url(#marketGrad)" 
        strokeWidth="2" 
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <path d="M4 30 L12 26 L20 34 L28 22 L36 28 L44 24" 
        stroke="url(#marketGrad)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
    
    {/* Crosshairs */}
    <g className="crosshair-group">
      <circle cx="24" cy="24" r="12" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none" 
        strokeDasharray="2 2"
        opacity="0.8"
      />
      <line x1="24" y1="8" x2="24" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="24" x2="16" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="24" x2="40" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      
      {/* Center jewel */}
      <circle cx="24" cy="24" r="3" fill="url(#marketGrad)" filter="url(#glow)" />
    </g>
    
    <style>{`
      .icon-market-data .ticker-group {
        animation: tickerFlow 3s ease-in-out infinite;
      }
      .icon-market-data .crosshair-group {
        animation: crosshairPulse 2s ease-in-out infinite;
        transform-origin: center;
      }
      @keyframes tickerFlow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      @keyframes crosshairPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
      }
    `}</style>
  </svg>
);

export const CanvasIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-canvas' : ''}
  >
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff00ff" />
        <stop offset="100%" stopColor="#00ffff" />
      </linearGradient>
      <filter id="synapseGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Brain outline */}
    <path d="M24 8 C16 8 10 14 10 22 C10 30 16 38 24 38 C32 38 38 30 38 22 C38 14 32 8 24 8 Z" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
    
    {/* Neural pathways */}
    <g className="neural-group">
      <circle cx="18" cy="18" r="2" fill="url(#brainGrad)" />
      <circle cx="30" cy="18" r="2" fill="url(#brainGrad)" />
      <circle cx="24" cy="24" r="3" fill="url(#brainGrad)" filter="url(#synapseGlow)" />
      <circle cx="18" cy="30" r="2" fill="url(#brainGrad)" />
      <circle cx="30" cy="30" r="2" fill="url(#brainGrad)" />
      
      {/* Synapses */}
      <line x1="18" y1="18" x2="24" y2="24" stroke="url(#brainGrad)" strokeWidth="1" className="synapse" />
      <line x1="30" y1="18" x2="24" y2="24" stroke="url(#brainGrad)" strokeWidth="1" className="synapse" />
      <line x1="18" y1="30" x2="24" y2="24" stroke="url(#brainGrad)" strokeWidth="1" className="synapse" />
      <line x1="30" y1="30" x2="24" y2="24" stroke="url(#brainGrad)" strokeWidth="1" className="synapse" />
    </g>
    
    <style>{`
      .icon-canvas .neural-group circle {
        animation: neuronFire 2s ease-in-out infinite;
      }
      .icon-canvas .synapse {
        animation: synapseFlow 1.5s ease-in-out infinite;
        stroke-dasharray: 10;
        stroke-dashoffset: 10;
      }
      @keyframes neuronFire {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @keyframes synapseFlow {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
  </svg>
);

export const CRMIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-crm' : ''}
  >
    <defs>
      <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffaa00" />
        <stop offset="100%" stopColor="#ff00ff" />
      </linearGradient>
    </defs>
    
    {/* Interlocking gears forming sphere */}
    <g className="gear-group">
      {/* Gear 1 */}
      <g className="gear gear-1" transform="translate(18, 24)">
        <circle r="8" stroke={color} strokeWidth="2" fill="none" />
        <path d="M0,-10 L2,-6 L6,-6 L4,-2 L8,0 L4,2 L6,6 L2,6 L0,10 L-2,6 L-6,6 L-4,2 L-8,0 L-4,-2 L-6,-6 L-2,-6 Z" 
          fill="url(#gearGrad)" 
        />
      </g>
      
      {/* Gear 2 */}
      <g className="gear gear-2" transform="translate(30, 24)">
        <circle r="8" stroke={color} strokeWidth="2" fill="none" />
        <path d="M0,-10 L2,-6 L6,-6 L4,-2 L8,0 L4,2 L6,6 L2,6 L0,10 L-2,6 L-6,6 L-4,2 L-8,0 L-4,-2 L-6,-6 L-2,-6 Z" 
          fill="url(#gearGrad)" 
          opacity="0.8"
        />
      </g>
      
      {/* Center sphere */}
      <circle cx="24" cy="24" r="16" 
        stroke={color} 
        strokeWidth="1" 
        fill="none" 
        strokeDasharray="3 2"
        opacity="0.5"
      />
      
      {/* Core jewel */}
      <circle cx="24" cy="24" r="4" fill="url(#gearGrad)" className="core-jewel" />
    </g>
    
    <style>{`
      .icon-crm .gear-1 {
        animation: rotateGear 4s linear infinite;
        transform-origin: 0 0;
      }
      .icon-crm .gear-2 {
        animation: rotateGear 4s linear infinite reverse;
        transform-origin: 0 0;
      }
      .icon-crm .core-jewel {
        animation: jewelPulse 2s ease-in-out infinite;
      }
      @keyframes rotateGear {
        from { transform: translate(18px, 24px) rotate(0deg); }
        to { transform: translate(18px, 24px) rotate(360deg); }
      }
      @keyframes jewelPulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `}</style>
  </svg>
);

export const RepConnectIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-repconnect' : ''}
  >
    <defs>
      <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="50%" stopColor="#ff00ff" />
        <stop offset="100%" stopColor="#ffaa00" />
      </linearGradient>
    </defs>
    
    {/* Network nodes */}
    <g className="network-group">
      {/* Center node */}
      <circle cx="24" cy="24" r="6" fill="url(#networkGrad)" className="node node-center" />
      
      {/* Orbital nodes */}
      <circle cx="12" cy="12" r="4" fill={color} className="node node-1" />
      <circle cx="36" cy="12" r="4" fill={color} className="node node-2" />
      <circle cx="12" cy="36" r="4" fill={color} className="node node-3" />
      <circle cx="36" cy="36" r="4" fill={color} className="node node-4" />
      
      {/* Connections */}
      <line x1="24" y1="24" x2="12" y2="12" stroke="url(#networkGrad)" strokeWidth="2" className="connection connection-1" />
      <line x1="24" y1="24" x2="36" y2="12" stroke="url(#networkGrad)" strokeWidth="2" className="connection connection-2" />
      <line x1="24" y1="24" x2="12" y2="36" stroke="url(#networkGrad)" strokeWidth="2" className="connection connection-3" />
      <line x1="24" y1="24" x2="36" y2="36" stroke="url(#networkGrad)" strokeWidth="2" className="connection connection-4" />
      
      {/* Data packets */}
      <circle r="2" fill="#ffffff" className="packet packet-1">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath href="#path1" />
        </animateMotion>
      </circle>
      <circle r="2" fill="#ffffff" className="packet packet-2">
        <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
          <mpath href="#path2" />
        </animateMotion>
      </circle>
    </g>
    
    {/* Motion paths */}
    <path id="path1" d="M24,24 L12,12 L24,24" style={{display: 'none'}} />
    <path id="path2" d="M24,24 L36,36 L24,24" style={{display: 'none'}} />
    
    <style>{`
      .icon-repconnect .node {
        animation: nodePulse 3s ease-in-out infinite;
      }
      .icon-repconnect .node-1 { animation-delay: 0s; }
      .icon-repconnect .node-2 { animation-delay: 0.5s; }
      .icon-repconnect .node-3 { animation-delay: 1s; }
      .icon-repconnect .node-4 { animation-delay: 1.5s; }
      .icon-repconnect .connection {
        stroke-dasharray: 20;
        animation: connectionFlow 2s linear infinite;
      }
      @keyframes nodePulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @keyframes connectionFlow {
        to { stroke-dashoffset: -40; }
      }
    `}</style>
  </svg>
);

// FEATURE ICONS

export const SynchronizationIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-sync' : ''}
  >
    <defs>
      <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff00ff">
          <animate attributeName="stop-color" 
            values="#ff00ff;#00ffff;#ffaa00;#ff00ff" 
            dur="3s" 
            repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#00ffff">
          <animate attributeName="stop-color" 
            values="#00ffff;#ffaa00;#ff00ff;#00ffff" 
            dur="3s" 
            repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    
    {/* Infinity symbol made of flowing data */}
    <path d="M12 24 C12 18, 18 18, 24 24 C30 30, 36 30, 36 24 C36 18, 30 18, 24 24 C18 30, 12 30, 12 24 Z" 
      stroke="url(#infinityGrad)" 
      strokeWidth="3" 
      fill="none"
      strokeLinecap="round"
      className="infinity-path"
    />
    
    {/* Data particles */}
    <g className="data-particles">
      <circle r="1.5" fill="#ffffff">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#infinityPath" />
        </animateMotion>
      </circle>
      <circle r="1.5" fill="#ffffff">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
          <mpath href="#infinityPath" />
        </animateMotion>
      </circle>
      <circle r="1.5" fill="#ffffff">
        <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
          <mpath href="#infinityPath" />
        </animateMotion>
      </circle>
    </g>
    
    <path id="infinityPath" d="M12 24 C12 18, 18 18, 24 24 C30 30, 36 30, 36 24 C36 18, 30 18, 24 24 C18 30, 12 30, 12 24 Z" style={{display: 'none'}} />
    
    <style>{`
      .icon-sync .infinity-path {
        stroke-dasharray: 100;
        animation: infinityFlow 3s linear infinite;
      }
      @keyframes infinityFlow {
        to { stroke-dashoffset: -200; }
      }
    `}</style>
  </svg>
);

export const SpeedIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-speed' : ''}
  >
    <defs>
      <radialGradient id="sonicGrad">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Gauge background */}
    <path d="M8 32 A20 20 0 0 1 40 32" 
      stroke={color} 
      strokeWidth="4" 
      fill="none"
      strokeLinecap="round"
      opacity="0.3"
    />
    
    {/* Speed gauge */}
    <path d="M8 32 A20 20 0 0 1 40 32" 
      stroke="url(#infinityGrad)" 
      strokeWidth="4" 
      fill="none"
      strokeLinecap="round"
      strokeDasharray="80"
      strokeDashoffset="20"
      className="speed-gauge"
    />
    
    {/* Needle breaking sound barrier */}
    <g className="needle-group" transform="translate(24, 32)">
      <line x1="0" y1="0" x2="0" y2="-18" 
        stroke="#ff00ff" 
        strokeWidth="3" 
        strokeLinecap="round"
        className="speed-needle"
      />
      <circle r="3" fill="#ff00ff" />
    </g>
    
    {/* Sonic boom effect */}
    <g className="sonic-boom" opacity="0">
      <circle cx="24" cy="32" r="15" fill="none" stroke="url(#sonicGrad)" strokeWidth="2" />
      <circle cx="24" cy="32" r="20" fill="none" stroke="url(#sonicGrad)" strokeWidth="1" />
      <circle cx="24" cy="32" r="25" fill="none" stroke="url(#sonicGrad)" strokeWidth="0.5" />
    </g>
    
    <style>{`
      .icon-speed .speed-needle {
        transform-origin: 0 0;
        animation: needleSweep 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      .icon-speed .sonic-boom {
        animation: sonicBoom 2s ease-out infinite;
      }
      @keyframes needleSweep {
        0% { transform: rotate(-60deg); }
        70% { transform: rotate(60deg); }
        100% { transform: rotate(60deg); }
      }
      @keyframes sonicBoom {
        0%, 69% { opacity: 0; transform: scale(0.5); }
        70% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(2); }
      }
    `}</style>
  </svg>
);

export const IntelligenceIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-intelligence' : ''}
  >
    <defs>
      <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff00ff" />
        <stop offset="33%" stopColor="#00ffff" />
        <stop offset="66%" stopColor="#ffaa00" />
        <stop offset="100%" stopColor="#ff00ff" />
      </linearGradient>
    </defs>
    
    {/* Crystal prism */}
    <g className="prism-group">
      <path d="M24 8 L16 24 L24 40 L32 24 Z" 
        stroke={color} 
        strokeWidth="2" 
        fill="rgba(255, 255, 255, 0.1)"
      />
      <path d="M24 8 L16 24 L32 24 Z" 
        fill="url(#prismGrad)" 
        opacity="0.6"
      />
      <path d="M16 24 L24 40 L32 24 Z" 
        fill="url(#prismGrad)" 
        opacity="0.4"
      />
    </g>
    
    {/* Light beam entering */}
    <line x1="4" y1="24" x2="16" y2="24" 
      stroke="#ffffff" 
      strokeWidth="2"
      className="light-beam-in"
    />
    
    {/* Refracted light beams */}
    <g className="refracted-beams">
      <line x1="32" y1="24" x2="44" y2="18" stroke="#ff00ff" strokeWidth="2" opacity="0.8" />
      <line x1="32" y1="24" x2="44" y2="24" stroke="#00ffff" strokeWidth="2" opacity="0.8" />
      <line x1="32" y1="24" x2="44" y2="30" stroke="#ffaa00" strokeWidth="2" opacity="0.8" />
    </g>
    
    <style>{`
      .icon-intelligence .prism-group {
        animation: prismRotate 4s linear infinite;
        transform-origin: center;
      }
      .icon-intelligence .light-beam-in {
        stroke-dasharray: 10;
        animation: beamFlow 1s linear infinite;
      }
      .icon-intelligence .refracted-beams line {
        stroke-dasharray: 10;
        animation: beamFlow 1s linear infinite;
      }
      @keyframes prismRotate {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(360deg); }
      }
      @keyframes beamFlow {
        to { stroke-dashoffset: -20; }
      }
    `}</style>
  </svg>
);

export const AutomationIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-automation' : ''}
  >
    <defs>
      <linearGradient id="mechGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffaa00" />
        <stop offset="100%" stopColor="#ff00ff" />
      </linearGradient>
    </defs>
    
    {/* Robotic hand */}
    <g className="robot-hand">
      {/* Palm */}
      <rect x="16" y="20" width="16" height="20" 
        stroke={color} 
        strokeWidth="2" 
        fill="rgba(255, 255, 255, 0.1)"
        rx="2"
      />
      
      {/* Fingers with jeweled joints */}
      <g className="finger finger-1">
        <rect x="14" y="12" width="4" height="8" stroke={color} strokeWidth="1" fill="rgba(255, 255, 255, 0.1)" rx="1" />
        <circle cx="16" cy="16" r="2" fill="url(#mechGrad)" />
      </g>
      <g className="finger finger-2">
        <rect x="20" y="10" width="4" height="10" stroke={color} strokeWidth="1" fill="rgba(255, 255, 255, 0.1)" rx="1" />
        <circle cx="22" cy="15" r="2" fill="url(#mechGrad)" />
      </g>
      <g className="finger finger-3">
        <rect x="26" y="10" width="4" height="10" stroke={color} strokeWidth="1" fill="rgba(255, 255, 255, 0.1)" rx="1" />
        <circle cx="28" cy="15" r="2" fill="url(#mechGrad)" />
      </g>
      <g className="finger finger-4">
        <rect x="32" y="12" width="4" height="8" stroke={color} strokeWidth="1" fill="rgba(255, 255, 255, 0.1)" rx="1" />
        <circle cx="34" cy="16" r="2" fill="url(#mechGrad)" />
      </g>
      
      {/* Central jewel */}
      <circle cx="24" cy="30" r="4" fill="url(#mechGrad)" className="palm-jewel" />
    </g>
    
    <style>{`
      .icon-automation .finger {
        animation: fingerFlex 3s ease-in-out infinite;
        transform-origin: bottom;
      }
      .icon-automation .finger-1 { animation-delay: 0s; }
      .icon-automation .finger-2 { animation-delay: 0.2s; }
      .icon-automation .finger-3 { animation-delay: 0.4s; }
      .icon-automation .finger-4 { animation-delay: 0.6s; }
      .icon-automation .palm-jewel {
        animation: jewelPulse 2s ease-in-out infinite;
      }
      @keyframes fingerFlex {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.8); }
      }
      @keyframes jewelPulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `}</style>
  </svg>
);

export const WhisperCoachIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-whisper' : ''}
  >
    <defs>
      <radialGradient id="soundGrad">
        <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Ear shape formed by sound waves */}
    <g className="ear-waves">
      <path d="M24 12 C30 12, 36 18, 36 24 C36 30, 30 36, 24 36" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
        opacity="0.8"
      />
      <path d="M24 16 C28 16, 32 20, 32 24 C32 28, 28 32, 24 32" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
        opacity="0.6"
      />
      <path d="M24 20 C26 20, 28 22, 28 24 C28 26, 26 28, 24 28" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
        opacity="0.4"
      />
    </g>
    
    {/* Sound waves */}
    <g className="sound-waves">
      <circle cx="12" cy="24" r="4" fill="none" stroke="url(#soundGrad)" strokeWidth="2" className="wave wave-1" />
      <circle cx="12" cy="24" r="8" fill="none" stroke="url(#soundGrad)" strokeWidth="1.5" className="wave wave-2" />
      <circle cx="12" cy="24" r="12" fill="none" stroke="url(#soundGrad)" strokeWidth="1" className="wave wave-3" />
    </g>
    
    {/* Center jewel */}
    <circle cx="24" cy="24" r="3" fill="url(#mechGrad)" className="ear-jewel" />
    
    <style>{`
      .icon-whisper .wave {
        opacity: 0;
        animation: soundWave 2s ease-out infinite;
      }
      .icon-whisper .wave-1 { animation-delay: 0s; }
      .icon-whisper .wave-2 { animation-delay: 0.3s; }
      .icon-whisper .wave-3 { animation-delay: 0.6s; }
      .icon-whisper .ear-jewel {
        animation: jewelPulse 1s ease-in-out infinite;
      }
      @keyframes soundWave {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 0.8; }
        100% { opacity: 0; transform: scale(2); }
      }
    `}</style>
  </svg>
);

// ACTION ICONS

export const LoginIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-login' : ''}
  >
    <defs>
      <radialGradient id="retinaGrad">
        <stop offset="0%" stopColor="#ff00ff" />
        <stop offset="50%" stopColor="#00ffff" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
    </defs>
    
    {/* Biometric scanner */}
    <circle cx="24" cy="24" r="18" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
      strokeDasharray="4 2"
      className="scanner-ring"
    />
    
    {/* Eye/retina */}
    <g className="retina-group">
      <circle cx="24" cy="24" r="12" fill="url(#retinaGrad)" opacity="0.3" />
      <circle cx="24" cy="24" r="8" fill="url(#retinaGrad)" opacity="0.5" />
      <circle cx="24" cy="24" r="4" fill="#ff00ff" className="pupil" />
      
      {/* Scan line */}
      <line x1="6" y1="24" x2="42" y2="24" 
        stroke="#00ffff" 
        strokeWidth="2"
        opacity="0.8"
        className="scan-line"
      />
    </g>
    
    <style>{`
      .icon-login .scanner-ring {
        animation: scannerRotate 3s linear infinite;
        transform-origin: center;
      }
      .icon-login .scan-line {
        animation: scanSweep 2s ease-in-out infinite;
      }
      .icon-login .pupil {
        animation: pupilContract 2s ease-in-out infinite;
      }
      @keyframes scannerRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes scanSweep {
        0%, 100% { opacity: 0; transform: translateY(-20px); }
        50% { opacity: 0.8; transform: translateY(20px); }
      }
      @keyframes pupilContract {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.7); }
      }
    `}</style>
  </svg>
);

export const StartTrialIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-start-trial' : ''}
  >
    <defs>
      <radialGradient id="sparkGrad">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#ff00ff" />
      </radialGradient>
    </defs>
    
    {/* Ignition key */}
    <g className="key-group">
      <path d="M20 24 L12 24 L12 20 L16 16 L20 16 Z" 
        stroke={color} 
        strokeWidth="2" 
        fill="rgba(255, 255, 255, 0.1)"
      />
      <rect x="20" y="20" width="16" height="8" 
        stroke={color} 
        strokeWidth="2" 
        fill="rgba(255, 255, 255, 0.1)"
        rx="4"
      />
      <circle cx="32" cy="24" r="3" fill="url(#mechGrad)" />
    </g>
    
    {/* Spark effects */}
    <g className="sparks">
      <circle cx="36" cy="24" r="1" fill="url(#sparkGrad)" className="spark spark-1" />
      <circle cx="38" cy="22" r="1" fill="url(#sparkGrad)" className="spark spark-2" />
      <circle cx="38" cy="26" r="1" fill="url(#sparkGrad)" className="spark spark-3" />
      <circle cx="40" cy="24" r="1" fill="url(#sparkGrad)" className="spark spark-4" />
    </g>
    
    <style>{`
      .icon-start-trial .key-group {
        animation: keyTurn 3s ease-in-out infinite;
        transform-origin: 32px 24px;
      }
      .icon-start-trial .spark {
        opacity: 0;
        animation: sparkBurst 3s ease-out infinite;
      }
      .icon-start-trial .spark-1 { animation-delay: 1.5s; }
      .icon-start-trial .spark-2 { animation-delay: 1.6s; }
      .icon-start-trial .spark-3 { animation-delay: 1.7s; }
      .icon-start-trial .spark-4 { animation-delay: 1.8s; }
      @keyframes keyTurn {
        0%, 40% { transform: rotate(0deg); }
        50%, 100% { transform: rotate(45deg); }
      }
      @keyframes sparkBurst {
        0% { opacity: 0; transform: scale(0); }
        10% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(2) translate(10px, 0); }
      }
    `}</style>
  </svg>
);

export const UpgradeIcon = ({ size = 24, color = 'currentColor', animate = true }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={animate ? 'icon-upgrade' : ''}
  >
    <defs>
      <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ff00ff" />
        <stop offset="50%" stopColor="#ffaa00" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
    </defs>
    
    {/* Rocket body */}
    <g className="rocket-group">
      <path d="M24 8 L20 20 L20 32 L24 36 L28 32 L28 20 Z" 
        stroke={color} 
        strokeWidth="2" 
        fill="rgba(255, 255, 255, 0.1)"
      />
      
      {/* Window with jewel */}
      <circle cx="24" cy="18" r="4" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="24" cy="18" r="2" fill="url(#mechGrad)" />
      
      {/* Fins */}
      <path d="M20 28 L16 32 L16 36 L20 32" fill={color} opacity="0.6" />
      <path d="M28 28 L32 32 L32 36 L28 32" fill={color} opacity="0.6" />
    </g>
    
    {/* Thrust flame */}
    <g className="flame-group">
      <path d="M24 36 L20 44 L24 40 L28 44 Z" 
        fill="url(#flameGrad)" 
        className="flame"
      />
      <circle cx="24" cy="42" r="2" fill="#ffffff" opacity="0.8" className="flame-particle" />
    </g>
    
    <style>{`
      .icon-upgrade .rocket-group {
        animation: rocketFloat 2s ease-in-out infinite;
      }
      .icon-upgrade .flame {
        animation: flameFlicker 0.2s ease-in-out infinite alternate;
        transform-origin: top;
      }
      .icon-upgrade .flame-particle {
        animation: particleFall 1s ease-out infinite;
      }
      @keyframes rocketFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes flameFlicker {
        from { transform: scaleY(1); opacity: 0.8; }
        to { transform: scaleY(1.2); opacity: 1; }
      }
      @keyframes particleFall {
        0% { opacity: 0.8; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(10px); }
      }
    `}</style>
  </svg>
);