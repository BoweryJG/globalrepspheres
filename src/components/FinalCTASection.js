import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button, Card, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: 'linear-gradient(180deg, rgba(11, 11, 32, 0.8) 0%, rgba(11, 11, 32, 1) 100%)',
  overflow: 'hidden',
}));

const CTACard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(91, 60, 255, 0.1) 100%)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(0, 229, 255, 0.3)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #00E5FF, #5B3CFF, #00E5FF)',
    borderRadius: theme.spacing(3),
    opacity: 0.3,
    animation: 'pulse 3s ease-in-out infinite',
    zIndex: -1,
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.3 },
    '50%': { opacity: 0.5 },
  },
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00E5FF 30%, #5B3CFF 90%)',
  border: 0,
  borderRadius: 30,
  boxShadow: '0 3px 20px 2px rgba(0, 229, 255, .3)',
  color: 'white',
  padding: '15px 40px',
  fontSize: '1.2rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 5px 30px 2px rgba(0, 229, 255, .5)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 30,
  color: 'white',
  padding: '13px 35px',
  fontSize: '1.1rem',
  fontWeight: 500,
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  '&:hover': {
    border: '2px solid rgba(255, 255, 255, 0.5)',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const FinalCTASection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    // Calculate time until end of current month
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Founder Credibility */}
        <Box mb={8} textAlign="center">
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              mb: 3,
              fontWeight: 300,
            }}
          >
            Built by the team that revolutionized medical aesthetics
          </Typography>
          
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={6} md={3}>
              <StatBox>
                <Typography variant="h3" sx={{ color: '#00E5FF', fontWeight: 700 }}>
                  $2.4B
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  CoolSculpting Exit
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} md={3}>
              <StatBox>
                <Typography variant="h3" sx={{ color: '#5B3CFF', fontWeight: 700 }}>
                  15
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Years of Data
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} md={3}>
              <StatBox>
                <Typography variant="h3" sx={{ color: '#FF3B30', fontWeight: 700 }}>
                  2.4M+
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Provider Records
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} md={3}>
              <StatBox>
                <Typography variant="h3" sx={{ color: '#00E5FF', fontWeight: 700 }}>
                  300+
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  AI Models
                </Typography>
              </StatBox>
            </Grid>
          </Grid>
        </Box>

        {/* Main CTA */}
        <CTACard>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Chip 
                icon={<AccessTimeIcon />} 
                label="LIMITED TIME OFFER" 
                sx={{ 
                  mb: 3,
                  background: 'rgba(255, 59, 48, 0.2)',
                  border: '1px solid rgba(255, 59, 48, 0.5)',
                  color: '#FF3B30',
                  fontWeight: 600,
                }} 
              />
              
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  color: '#ffffff',
                }}
              >
                The Intelligence Gap Is Widening Daily
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Every day without intelligence is opportunity lost. While you're reading this, 
                leaders are closing deals with insights you don't have. Yet.
              </Typography>

              {/* Benefits */}
              <Grid container spacing={2} mb={4}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon sx={{ color: '#00E5FF', mr: 1 }} />
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      Start closing more deals in 7 days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon sx={{ color: '#00E5FF', mr: 1 }} />
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      Zero setup—activate instantly
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon sx={{ color: '#00E5FF', mr: 1 }} />
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      30-day money-back guarantee
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon sx={{ color: '#00E5FF', mr: 1 }} />
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      Cancel anytime, no questions
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* CTA Buttons */}
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                <GlowingButton size="large" onClick={() => window.location.href = '/signup'}>
                  Claim Your Advantage Now
                </GlowingButton>
                <SecondaryButton size="large" onClick={() => window.location.href = '#demo'}>
                  Book a Demo
                </SecondaryButton>
              </Box>
            </Grid>

            {/* Timer */}
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 2 }}>
                  Special Pricing Ends In:
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Box>
                      <Typography variant="h2" sx={{ color: '#00E5FF', fontWeight: 700 }}>
                        {String(timeLeft.days).padStart(2, '0')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        DAYS
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Typography variant="h2" sx={{ color: '#5B3CFF', fontWeight: 700 }}>
                        {String(timeLeft.hours).padStart(2, '0')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        HOURS
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Typography variant="h2" sx={{ color: '#FF3B30', fontWeight: 700 }}>
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        MINUTES
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CTACard>

        {/* Final Message */}
        <Box mt={8} textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            "Join the intelligence revolution—or compete against it. 
            The choice is yours, but the clock is ticking."
          </Typography>
          
          <Box mt={4}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              <GroupsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              437 sales professionals started their free trial this week
            </Typography>
          </Box>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default FinalCTASection;