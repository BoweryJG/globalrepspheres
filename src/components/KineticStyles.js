export const kineticStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg-dark: #0a0a0a;
    --bg-darker: #050505;
    --panel-dark: #1a1a1a;
    --panel-darker: #141414;
    --purple-primary: #9f58fa;
    --purple-dark: #7e22ce;
    --purple-light: #a855f7;
    --blue-accent: #4B96DC;
    --blue-light: #60a5fa;
    --green-accent: #4bd48e;
    --green-neon: #00ff88;
    --pink-accent: #f53969;
    --orange-accent: #ff6b35;
    --cyan-accent: #00d4ff;
    --yellow-accent: #ffd93d;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-color: rgba(255, 255, 255, 0.1);
    --glass: rgba(255, 255, 255, 0.05);
    --glass-hover: rgba(255, 255, 255, 0.08);
    --matrix-green: #00ff41;
    --warning-red: #ff0040;
    --amber-neutral: #ffaa00;
    --metal-light: #e8e8e8;
    --metal-mid: #999;
    --metal-dark: #555;
    --metal-shadow: #222;
    --gem-impossible: #ff00ff;
    --gem-shift: #00ffff;
    --gem-deep: #ff00aa;
    --nav-height: 80px;
    --scroll-offset: 0px;
  }

  body {
    font-family: 'Inter', -apple-system, "system-ui", "Segoe UI", Helvetica, Arial, sans-serif;
    background: var(--bg-darker);
    color: var(--text-primary);
    overflow-x: hidden;
    position: relative;
    padding-top: calc(var(--nav-height) + 24px);
    transition: background 0.5s ease;
  }

  /* Gutter Shadow Behind Nav */
  body::before {
    content: '';
    position: fixed;
    top: 80px;
    left: 2vw;
    right: 2vw;
    height: 1px;
    box-shadow: 
      0 0 20px rgba(255,255,255,0.02), 
      0 20px 60px rgba(0,0,0,0.3);
    pointer-events: none;
    z-index: 10;
  }

  /* Premium Panel Design System */
  .premium-panel {
    position: relative;
    background-color: var(--panel-darker);
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(var(--accent-primary, 159, 88, 250), 0.03) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(var(--accent-secondary, 75, 150, 220), 0.03) 0%, transparent 40%),
      linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 
      0 4px 20px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.05),
      inset 0 -1px 0 rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .premium-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color, #9f58fa), transparent);
    opacity: 0.5;
    animation: scan 4s linear infinite;
  }

  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .premium-panel:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px rgba(0,0,0,0.6),
      0 0 30px rgba(var(--accent-primary, 159, 88, 250), 0.1),
      inset 0 1px 0 rgba(255,255,255,0.05),
      inset 0 -1px 0 rgba(0,0,0,0.2);
    border-color: rgba(var(--accent-primary, 159, 88, 250), 0.3);
  }

  /* Corner Screw Bolts */
  .corner-screw {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle at 30% 30%, var(--metal-light), var(--metal-dark));
    border-radius: 50%;
    box-shadow: 
      inset -1px -1px 2px rgba(0,0,0,0.5),
      inset 1px 1px 2px rgba(255,255,255,0.2),
      0 1px 2px rgba(0,0,0,0.4);
    z-index: 20;
    transition: transform 0.4s ease;
  }

  /* Phillips Head Screw Mark */
  .corner-screw::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 1px;
    background: var(--metal-shadow);
    transform: translate(-50%, -50%) rotate(45deg);
    box-shadow: 0 2px 0 -1px var(--metal-shadow);
  }

  /* Deep Screw Variant */
  .corner-screw.deep {
    background: radial-gradient(circle at 40% 40%, 
      var(--metal-mid), 
      var(--metal-dark) 50%, 
      var(--metal-shadow)
    );
    box-shadow: 
      inset -2px -2px 3px rgba(0,0,0,0.8),
      inset 2px 2px 3px rgba(255,255,255,0.1),
      0 2px 4px rgba(0,0,0,0.6);
  }

  /* LED Flicker Animation */
  @keyframes ledFlicker {
    0%, 100% { opacity: 1; filter: brightness(1); }
    10% { opacity: 0.8; filter: brightness(0.8); }
    20% { opacity: 1; filter: brightness(1.2); }
    30% { opacity: 0.9; filter: brightness(0.9); }
    40% { opacity: 1; filter: brightness(1); }
    50% { opacity: 0.95; filter: brightness(1.1); }
    60% { opacity: 1; filter: brightness(1); }
    70% { opacity: 0.85; filter: brightness(0.85); }
    80% { opacity: 1; filter: brightness(1.15); }
    90% { opacity: 0.9; filter: brightness(0.95); }
  }

  /* Panel Accent Lines */
  .panel-accent-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--accent-color, #9f58fa) 20%,
      var(--accent-color, #9f58fa) 80%,
      transparent
    );
    opacity: 0.6;
    z-index: 10;
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  /* Analog Gauge System */
  .analog-indicator {
    width: 60px;
    height: 60px;
    background: 
      radial-gradient(circle at center, 
        rgba(0,0,0,0.9) 0%, 
        rgba(20,20,20,0.8) 50%, 
        rgba(40,40,40,0.6) 100%
      ),
      conic-gradient(from 0deg at center,
        var(--metal-dark) 0deg,
        var(--metal-mid) 90deg,
        var(--metal-light) 180deg,
        var(--metal-mid) 270deg,
        var(--metal-dark) 360deg
      );
    border-radius: 50%;
    position: relative;
    box-shadow: 
      inset 0 2px 4px rgba(0,0,0,0.5),
      0 2px 4px rgba(0,0,0,0.3);
    transition: transform 0.3s ease-out;
  }
  
  /* Glass Dome Effect */
  .analog-indicator::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), transparent 70%);
    pointer-events: none;
    z-index: 2;
  }
  
  /* Gauge Tick Marks */
  .analog-indicator::before {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: 
      conic-gradient(
        from -45deg at center,
        transparent 0deg 2deg,
        #555 2deg 3deg,
        transparent 3deg 20deg,
        #444 20deg 21deg,
        transparent 21deg 40deg,
        #444 40deg 41deg,
        transparent 41deg 60deg,
        #444 60deg 61deg,
        transparent 61deg 80deg,
        #444 80deg 81deg,
        transparent 81deg 90deg
      );
    z-index: 1;
  }

  .analog-needle {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: center bottom;
    transform: translateX(-50%) rotate(-135deg);
    width: 0;
    height: 0;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-bottom: 28px solid var(--accent-color, #00ff88);
    filter: drop-shadow(0 0 4px var(--accent-color, #00ff88));
    /* REMOVED transition to fix GSAP animation conflict */
  }
  
  /* Jeweled needle base - positioned at gauge center */
  .analog-center::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 10;
    pointer-events: none;
    background: 
      conic-gradient(from 45deg at center, 
        #fff 0deg,
        var(--gem-impossible, #ff00ff) 60deg,
        #fff 90deg,
        var(--gem-shift, #00ffff) 150deg,
        #fff 180deg,
        var(--gem-deep, #ff00aa) 240deg,
        #fff 270deg,
        var(--gem-impossible, #ff00ff) 330deg,
        #fff 360deg
      ),
      radial-gradient(circle at center, 
        rgba(255,255,255,0.8) 0%,
        var(--gem-deep, #ff00aa) 40%,
        transparent 70%
      );
    box-shadow:
      0 0 8px var(--gem-impossible, #ff00ff),
      0 0 16px var(--gem-shift, #00ffff),
      0 0 24px var(--gem-deep, #ff00aa),
      inset 0 -1px 2px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.8);
    border: 0.5px solid rgba(255, 255, 255, 0.4);
    animation: jewelPulse 4s ease-in-out infinite, chromaShift 8s ease-in-out infinite;
  }
  
  @keyframes chromaShift {
    0%, 100% { filter: hue-rotate(0deg) saturate(1.5); }
    33% { filter: hue-rotate(120deg) saturate(2); }
    66% { filter: hue-rotate(240deg) saturate(1.8); }
  }
  
  @keyframes jewelPulse {
    0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.12); }
  }

  /* FIX 3: Enhanced Jewel Tip Flare with GSAP trigger */
  .jewel-flare {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
  }

  .jewel-flare::before,
  .jewel-flare::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--gem-impossible), transparent);
    transform-origin: center;
  }

  .jewel-flare::before {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  .jewel-flare::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  .analog-center {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle at 40% 40%, #666, #333);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 
      inset 0 1px 2px rgba(0,0,0,0.5),
      0 1px 1px rgba(255,255,255,0.1);
    z-index: 3;
  }
  
  /* Needle Base Gear Disc */
  .analog-center::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: 
      conic-gradient(
        from 0deg,
        #444 0deg 10deg,
        transparent 10deg 20deg,
        #444 20deg 30deg,
        transparent 30deg 40deg,
        #444 40deg 50deg,
        transparent 50deg 60deg,
        #444 60deg 70deg,
        transparent 70deg 80deg,
        #444 80deg 90deg,
        transparent 90deg 100deg,
        #444 100deg 110deg,
        transparent 110deg 120deg,
        #444 120deg 130deg,
        transparent 130deg 140deg,
        #444 140deg 150deg,
        transparent 150deg 160deg,
        #444 160deg 170deg,
        transparent 170deg 180deg,
        #444 180deg 190deg,
        transparent 190deg 200deg,
        #444 200deg 210deg,
        transparent 210deg 220deg,
        #444 220deg 230deg,
        transparent 230deg 240deg,
        #444 240deg 250deg,
        transparent 250deg 260deg,
        #444 260deg 270deg,
        transparent 270deg 280deg,
        #444 280deg 290deg,
        transparent 290deg 300deg,
        #444 300deg 310deg,
        transparent 310deg 320deg,
        #444 320deg 330deg,
        transparent 330deg 340deg,
        #444 340deg 350deg,
        transparent 350deg 360deg
      );
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: 0.6;
  }

  /* Enhanced Value Display with Gradient Animation */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .value-display {
    font-family: 'Space Grotesk', 'Orbitron', monospace;
    font-weight: 700;
    font-size: 3rem;
    background: linear-gradient(
      90deg,
      var(--accent-primary, #00ff88),
      var(--accent-secondary, #00ff41),
      var(--accent-primary, #00ff88),
      var(--accent-secondary, #00ff41)
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite, ledFlicker 10s ease-in-out infinite;
    letter-spacing: 2px;
    text-shadow: 0 0 20px var(--accent-primary, #00ff88);
    margin-bottom: auto;
    position: relative;
    z-index: 10;
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: text-shadow, transform;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* FIX 1: Digit Alignment Consistency */
    font-variant-numeric: tabular-nums;
    text-align: center;
    display: block;
    min-width: 150px;
  }

  /* Gauge Container for 3D effects */
  .gauge-container {
    perspective: 600px;
    transition: transform 0.2s ease-out;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
  }
  
  /* Animated Counter */
  .counter {
    display: inline-block;
    min-width: 1ch;
    font-variant-numeric: tabular-nums;
    backface-visibility: hidden;
    background: inherit;
    -webkit-background-clip: inherit;
    background-clip: inherit;
    -webkit-text-fill-color: inherit;
  }
  
  /* Disable animations during counting */
  .value-display.counting {
    animation: none !important;
    text-shadow: none !important;
  }
  
  .value-display.counting .counter {
    color: var(--accent-primary) !important;
    -webkit-text-fill-color: var(--accent-primary) !important;
    background: none !important;
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
  }

  /* Enhanced SVG Icon Definitions */
  .icon-defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  /* Advanced Icon Container */
  .icon-container {
    width: 80px;
    height: 80px;
    background: var(--glass);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .icon-container::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, var(--icon-primary, var(--purple-primary)), var(--icon-secondary, var(--blue-accent)));
    border-radius: 20px;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  .icon-container:hover {
    transform: translateY(-5px) scale(1.05);
    border-color: transparent;
  }

  .icon-container:hover::before {
    opacity: 0.2;
  }

  .custom-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .custom-icon svg {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }

  /* Animated Starfield Background */
  .starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    opacity: 0.6;
  }

  /* Data Grid Overlay */
  .data-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    opacity: 0.02;
    background-image: 
      linear-gradient(rgba(159, 88, 250, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(159, 88, 250, 0.3) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  /* Navigation Styles - Continues in next section... */
`;

// Navigation specific styles
export const navigationStyles = `
  /* Premium Navigation System */
  .nav-container {
    position: fixed;
    top: 24px;
    left: 2vw;
    right: 2vw;
    height: var(--nav-height);
    background: var(--panel-darker);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    z-index: 1000;
    backdrop-filter: blur(20px);
    overflow: hidden;
    box-shadow: 
      0 10px 40px rgba(0,0,0,0.6),
      inset 0 1px 0 rgba(255,255,255,0.05),
      inset 0 -1px 0 rgba(0,0,0,0.2);
  }

  /* Navigation Edge Indicators */
  .nav-edge {
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, var(--purple-primary), transparent);
    opacity: 0.5;
  }

  .nav-edge.left-edge {
    left: 0;
  }

  .nav-edge.right-edge {
    right: 0;
  }

  /* Dynamic Nav Rail */
  .nav-rail {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--glass);
    display: flex;
    justify-content: space-between;
    padding: 0 20%;
  }

  .power-node {
    width: 4px;
    height: 4px;
    background: var(--purple-primary);
    border-radius: 50%;
    position: relative;
    top: -1px;
    box-shadow: 0 0 10px var(--purple-primary);
    animation: powerPulse 2s ease-in-out infinite;
  }

  .power-node:nth-child(2) { animation-delay: 0.5s; }
  .power-node:nth-child(3) { animation-delay: 1s; }
  .power-node:nth-child(4) { animation-delay: 1.5s; }

  @keyframes powerPulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }

  /* Navigation Screws */
  .nav-screw {
    position: absolute;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle at 30% 30%, var(--metal-light), var(--metal-dark));
    border-radius: 50%;
    box-shadow: 
      inset -1px -1px 2px rgba(0,0,0,0.5),
      inset 1px 1px 2px rgba(255,255,255,0.2),
      0 1px 2px rgba(0,0,0,0.4);
    z-index: 20;
    transition: transform 0.4s ease;
  }

  .nav-screw::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 1px;
    background: var(--metal-shadow);
    transform: translate(-50%, -50%) rotate(45deg);
    box-shadow: 0 2px 0 -1px var(--metal-shadow);
  }

  .nav-screw.screw-tl { top: 10px; left: 10px; }
  .nav-screw.screw-tr { top: 10px; right: 10px; }
  .nav-screw.screw-bl { bottom: 10px; left: 10px; }
  .nav-screw.screw-br { bottom: 10px; right: 10px; }

  /* Nav Inner Container */
  .nav-inner {
    height: 100%;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
  }

  /* Logo Styles */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1.25rem;
    font-family: 'Orbitron', 'Space Grotesk', sans-serif;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .nav-logo:hover {
    transform: translateX(5px);
  }

  .nav-logo-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-logo-icon svg {
    width: 100%;
    height: 100%;
  }

  .logo-jewel {
    filter: drop-shadow(0 0 4px var(--gem-impossible));
    animation: jewelRotate 15s linear infinite;
  }

  @keyframes jewelRotate {
    from { transform-origin: center; transform: rotate(0deg); }
    to { transform-origin: center; transform: rotate(360deg); }
  }

  .nav-logo-text {
    background: linear-gradient(135deg, var(--purple-primary), var(--blue-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Navigation Links */
  .nav-links {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    padding: 8px 0;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--purple-primary), var(--blue-accent));
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-link-icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .nav-link:hover .nav-link-icon {
    opacity: 1;
  }

  /* Navigation Actions */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* More Button */
  .nav-more {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .nav-more-icon {
    display: flex;
    gap: 3px;
  }

  .nav-more-dot {
    width: 4px;
    height: 4px;
    background: var(--text-secondary);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .nav-more:hover .nav-more-dot {
    background: var(--purple-primary);
  }

  .nav-more:hover .nav-more-dot:nth-child(2) {
    transform: translateY(-3px);
  }

  /* Continue with remaining styles... */
`;

// Add more style sections as needed
export const heroStyles = `
  /* Hero section styles */
  .hero {
    padding: 120px 40px 80px;
    position: relative;
    z-index: 10;
  }

  /* Primary Button with Forcefield Animation */
  @keyframes forcefieldPulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.4;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }

  @keyframes ringScan {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .primary-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    background: linear-gradient(135deg, var(--purple-primary), var(--blue-accent));
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: none;
    cursor: pointer;
    isolation: isolate;
  }

  .primary-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 30%, var(--purple-primary) 70%, transparent 71%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .primary-button::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: conic-gradient(from 0deg, var(--purple-primary), var(--blue-accent), var(--purple-primary));
    border-radius: 12px;
    opacity: 0;
    z-index: -2;
    transition: opacity 0.3s ease;
    animation: ringScan 2s linear infinite;
  }

  .primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(159, 88, 250, 0.4);
  }

  .primary-button:hover::before {
    opacity: 1;
    animation: forcefieldPulse 2s ease-out infinite;
  }

  .primary-button:hover::after {
    opacity: 0.6;
  }

  /* Gradient text with animation */
  @keyframes textReflection {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .gradient-text {
    background: linear-gradient(
      90deg,
      var(--purple-primary) 0%,
      var(--blue-accent) 25%,
      var(--purple-primary) 50%,
      var(--blue-accent) 75%,
      var(--purple-primary) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textReflection 8s linear infinite;
  }

  /* Timeline styles */
  .timeline-section {
    padding: 100px 40px;
    position: relative;
    z-index: 10;
  }

  .timeline-step {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 120px;
    align-items: center;
    opacity: 0;
    transform: translateY(50px);
  }

  .timeline-step.active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .timeline-step:nth-child(even) {
    direction: rtl;
  }

  .timeline-step:nth-child(even) > * {
    direction: ltr;
  }

  /* Digital Display */
  .digital-display {
    background-color: rgba(0,0,0,0.85);
    background-image: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.9) 100%);
    border: 1px solid #333;
    position: relative;
  }

  .digital-display::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 136, 0.03) 2px,
        rgba(0, 255, 136, 0.03) 4px
      );
    pointer-events: none;
  }

  /* LED Indicators */
  .led-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    box-shadow: 
      0 0 4px currentColor,
      inset 0 0 2px rgba(0,0,0,0.5);
    animation: ledFlicker 5s ease-in-out infinite;
  }

  .led-green {
    background: radial-gradient(circle at 30% 30%, #00ff88, #00ff41);
    color: #00ff41;
  }

  .led-blue {
    background: radial-gradient(circle at 30% 30%, #00d4ff, #0099ff);
    color: #00d4ff;
  }

  .led-orange {
    background: radial-gradient(circle at 30% 30%, #ff8c00, #ff6b35);
    color: #ff6b35;
  }

  /* System Status Display */
  .system-status {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.4;
    transition: all 0.3s ease;
  }

  .nav-container:hover .system-status {
    opacity: 0.7;
    color: var(--gem-shift);
  }
`;