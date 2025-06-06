import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [renderTime, setRenderTime] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationIdRef = useRef();

  useEffect(() => {
    const measure = () => {
      frameCountRef.current++;
      const now = performance.now();
      const delta = now - lastTimeRef.current;

      // Update FPS every second
      if (delta >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;

        // Check memory if available
        if (performance.memory) {
          const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
          const total = Math.round(performance.memory.totalJSHeapSize / 1048576);
          setMemoryUsage({ used, total });
        }
      }

      // Measure render time
      const renderStart = performance.now();
      requestAnimationFrame(() => {
        setRenderTime(performance.now() - renderStart);
      });

      animationIdRef.current = requestAnimationFrame(measure);
    };

    animationIdRef.current = requestAnimationFrame(measure);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const getFpsColor = () => {
    if (fps >= 50) return '#4caf50';
    if (fps >= 30) return '#ff9800';
    return '#f44336';
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 100,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: 2,
        borderRadius: 1,
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 9999,
        minWidth: 200,
      }}
    >
      <Typography sx={{ color: getFpsColor(), fontWeight: 'bold' }}>
        FPS: {fps}
      </Typography>
      <Typography sx={{ fontSize: '11px' }}>
        Render: {renderTime.toFixed(2)}ms
      </Typography>
      {memoryUsage && (
        <Typography sx={{ fontSize: '11px' }}>
          Memory: {memoryUsage.used}MB / {memoryUsage.total}MB
        </Typography>
      )}
      <Typography sx={{ fontSize: '11px', mt: 1, color: '#ff9800' }}>
        Performance Issues Detected:
      </Typography>
      <Typography sx={{ fontSize: '10px' }}>
        • Heavy blob calculations
      </Typography>
      <Typography sx={{ fontSize: '10px' }}>
        • Too many DOM updates
      </Typography>
      <Typography sx={{ fontSize: '10px' }}>
        • Excessive particle count
      </Typography>
    </Box>
  );
};

export default PerformanceMonitor;