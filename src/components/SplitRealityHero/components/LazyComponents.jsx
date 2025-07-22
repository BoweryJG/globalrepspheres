import React, { lazy, Suspense } from 'react';

/**
 * Loading fallback for lazy components
 */
const ComponentLoader = ({ height = '100%' }) => (
  <div style={{
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(159, 88, 250, 0.1)',
      borderTopColor: '#9F58FA',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

// Lazy load heavy components
export const LazyDarkReality = lazy(() => 
  import('./DarkReality').then(module => ({
    default: module.default
  }))
);

export const LazyLightReality = lazy(() => 
  import('./LightReality').then(module => ({
    default: module.default
  }))
);

export const LazyRealityTear = lazy(() => 
  import('./RealityTear').then(module => ({
    default: module.default
  }))
);

export const LazyAutomationFlow = lazy(() => 
  import('./AutomationFlow').then(module => ({
    default: module.default
  }))
);

// Wrapper components with suspense
export const DarkRealityLazy = (props) => (
  <Suspense fallback={<ComponentLoader />}>
    <LazyDarkReality {...props} />
  </Suspense>
);

export const LightRealityLazy = (props) => (
  <Suspense fallback={<ComponentLoader />}>
    <LazyLightReality {...props} />
  </Suspense>
);

export const RealityTearLazy = (props) => (
  <Suspense fallback={<ComponentLoader />}>
    <LazyRealityTear {...props} />
  </Suspense>
);

export const AutomationFlowLazy = (props) => (
  <Suspense fallback={<ComponentLoader />}>
    <LazyAutomationFlow {...props} />
  </Suspense>
);

// CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);