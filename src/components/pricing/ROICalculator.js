import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  Slider,
  Chip
} from '@mui/material';
import { TrendingUp, AttachMoney, Speed } from '@mui/icons-material';

export default function ROICalculator() {
  const [currentDeals, setCurrentDeals] = useState(4);
  const [averageDealSize, setAverageDealSize] = useState(25000);
  const [closeRate, setCloseRate] = useState(20);
  const [selectedTier, setSelectedTier] = useState('professional');

  const tierPrices = {
    explorer: 49,
    professional: 149,
    growth: 349,
    enterprise: 749,
    elite: 1499
  };

  const tierMultipliers = {
    explorer: 1.15,
    professional: 1.35,
    growth: 1.65,
    enterprise: 2.1,
    elite: 2.5
  };

  const calculateROI = () => {
    const currentRevenue = currentDeals * averageDealSize * (closeRate / 100);
    const projectedDeals = currentDeals * tierMultipliers[selectedTier];
    const projectedCloseRate = Math.min(closeRate * 1.3, 80); // Cap at 80%
    const projectedRevenue = projectedDeals * averageDealSize * (projectedCloseRate / 100);
    const revenueIncrease = projectedRevenue - currentRevenue;
    const monthlyInvestment = tierPrices[selectedTier];
    const annualROI = ((revenueIncrease * 12) - (monthlyInvestment * 12)) / (monthlyInvestment * 12) * 100;
    const paybackDays = Math.ceil((monthlyInvestment / (revenueIncrease / 30)));

    return {
      currentRevenue,
      projectedRevenue,
      revenueIncrease,
      annualROI,
      paybackDays,
      projectedDeals,
      projectedCloseRate
    };
  };

  const results = calculateROI();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Space Grotesk', Arial, sans-serif",
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 3,
            background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Calculate Your RepSpheres ROI
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'DM Sans', Arial, sans-serif",
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          See how much more you could be earning with AI-powered sales intelligence
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              borderRadius: '24px',
              background: 'rgba(24,24,43,0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                mb: 4,
                color: '#fff',
              }}
            >
              Your Current Performance
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
                Deals Closed Per Month: <strong>{currentDeals}</strong>
              </Typography>
              <Slider
                value={currentDeals}
                onChange={(e, val) => setCurrentDeals(val)}
                min={1}
                max={20}
                sx={{
                  color: '#00ffc6',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#00ffc6',
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
                Average Deal Size: <strong>${averageDealSize.toLocaleString()}</strong>
              </Typography>
              <Slider
                value={averageDealSize}
                onChange={(e, val) => setAverageDealSize(val)}
                min={5000}
                max={100000}
                step={5000}
                sx={{
                  color: '#00ffc6',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#00ffc6',
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
                Current Close Rate: <strong>{closeRate}%</strong>
              </Typography>
              <Slider
                value={closeRate}
                onChange={(e, val) => setCloseRate(val)}
                min={5}
                max={50}
                sx={{
                  color: '#00ffc6',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#00ffc6',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
                Select Your RepSpheres Tier
              </Typography>
              <Grid container spacing={1}>
                {Object.keys(tierPrices).map((tier) => (
                  <Grid item xs={12} sm={6} key={tier}>
                    <Button
                      fullWidth
                      variant={selectedTier === tier ? "contained" : "outlined"}
                      onClick={() => setSelectedTier(tier)}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'capitalize',
                        background: selectedTier === tier 
                          ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)'
                          : 'transparent',
                        color: selectedTier === tier ? '#0a0a0a' : '#00ffc6',
                        border: '1px solid',
                        borderColor: selectedTier === tier ? 'transparent' : 'rgba(0,255,198,0.3)',
                        '&:hover': {
                          background: selectedTier === tier 
                            ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)'
                            : 'rgba(0,255,198,0.1)',
                        },
                      }}
                    >
                      {tier} - ${tierPrices[tier]}/mo
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(123,66,246,0.1) 100%)',
              border: '2px solid rgba(0,255,198,0.3)',
              height: '100%',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                mb: 4,
                color: '#fff',
              }}
            >
              Your Projected Results
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: '#00ffc6', mr: 2 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Monthly Revenue Increase
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 800,
                  color: '#00ffc6',
                }}
              >
                +${results.revenueIncrease.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ color: '#7B42F6', mr: 2 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Annual ROI
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 800,
                  color: '#7B42F6',
                }}
              >
                {results.annualROI.toFixed(0)}%
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Speed sx={{ color: '#ff6b6b', mr: 2 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Payback Period
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 800,
                  color: '#ff6b6b',
                }}
              >
                {results.paybackDays} days
              </Typography>
            </Box>

            <Box sx={{ 
              p: 3, 
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.05)',
              mb: 3,
            }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
                With RepSpheres {selectedTier}, you'll close
              </Typography>
              <Typography sx={{ color: '#00ffc6', fontSize: '1.2rem', fontWeight: 600 }}>
                {results.projectedDeals.toFixed(1)} deals/month at {results.projectedCloseRate.toFixed(0)}% close rate
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => window.location.href = '#pricing'}
              sx={{
                py: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
                color: '#0a0a0a',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(0,255,198,0.4)',
                },
              }}
            >
              Start Your {results.paybackDays}-Day Payback
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Message */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography
          sx={{
            fontFamily: "'DM Sans', Arial, sans-serif",
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
          }}
        >
          * Based on average performance improvements from 2,847+ RepSpheres users
        </Typography>
      </Box>
    </Container>
  );
}