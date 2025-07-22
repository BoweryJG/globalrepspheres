import { useEffect, useState, useCallback } from 'react';

/**
 * Performance optimization hook for Split Reality Hero
 * Handles lazy loading, reduced motion, and performance monitoring
 */
export const usePerformance = () => {
  const [performanceMode, setPerformanceMode] = useState(() => {
    // Check for saved preference
    return localStorage.getItem('performanceMode') === 'true';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [fps, setFps] = useState(60);

  // Detect low-end devices
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Check for low memory
      const memoryInfo = performance.memory;
      const lowMemory = memoryInfo && memoryInfo.totalJSHeapSize / memoryInfo.jsHeapSizeLimit > 0.8;
      
      // Check for low core count
      const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      
      // Check connection type
      const connection = navigator.connection;
      const slowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData === true
      );

      // Check device memory (Chrome only)
      const deviceMemory = navigator.deviceMemory;
      const lowDeviceMemory = deviceMemory && deviceMemory <= 4;

      setIsLowEndDevice(lowMemory || lowCores || slowConnection || lowDeviceMemory);
    };

    checkDeviceCapabilities();

    // Listen for connection changes
    if (navigator.connection) {
      navigator.connection.addEventListener('change', checkDeviceCapabilities);
    }

    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', checkDeviceCapabilities);
      }
    };
  }, []);

  // Monitor FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Auto-enable performance mode on low FPS
  useEffect(() => {
    if (fps < 30 && !performanceMode) {
      console.log('Low FPS detected, enabling performance mode');
      setPerformanceMode(true);
      localStorage.setItem('performanceMode', 'true');
    }
  }, [fps, performanceMode]);

  // Listen for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      setReducedMotion(e.matches);
    };

    // Safari doesn't support addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const togglePerformanceMode = useCallback(() => {
    const newMode = !performanceMode;
    setPerformanceMode(newMode);
    localStorage.setItem('performanceMode', String(newMode));
  }, [performanceMode]);

  return {
    performanceMode: performanceMode || isLowEndDevice,
    reducedMotion,
    isLowEndDevice,
    fps,
    togglePerformanceMode
  };
};

/**
 * Lazy loading hook for components and images
 */
export const useLazyLoad = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasLoaded]);

  return { ref: setRef, isIntersecting, hasLoaded };
};

/**
 * Debounced resize hook
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Throttled scroll hook
 */
export const useThrottle = (callback, delay) => {
  const [lastRun, setLastRun] = useState(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      setLastRun(now);
      return callback(...args);
    }
  }, [callback, delay, lastRun]);
};