import React from 'react';
import { Box } from '@mui/material';
import ROICalculator from '../components/pricing/ROICalculator';
import StarryBackground from '../components/StarryBackground_Ultra';
import NavBar from '../components/NavBar';

export default function ROICalculatorPage() {
  return (
    <Box>
      <StarryBackground />
      <NavBar />
      <Box sx={{ position: 'relative', zIndex: 1, pt: 10 }}>
        <ROICalculator />
      </Box>
    </Box>
  );
}