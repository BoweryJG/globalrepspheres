import React from 'react';
import { Box, Typography, Button, Container, Grid, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  background: 'transparent',
  color: '#ffffff',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(8),
    minHeight: 'auto',
  },
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00E5FF 30%, #5B3CFF 90%)',
  border: 0,
  borderRadius: 30,
  boxShadow: '0 3px 20px 2px rgba(0, 229, 255, .3)',
  color: 'white',
  padding: '12px 35px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 25px 2px rgba(0, 229, 255, .4)',
    background: 'linear-gradient(45deg, #00E5FF 20%, #5B3CFF 100%)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 30,
  color: 'white',
  padding: '10px 30px',
  fontSize: '1.1rem',
  fontWeight: 500,
  textTransform: 'none',
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '2px solid rgba(255, 255, 255, 0.5)',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontWeight: 500,
  '& .MuiChip-icon': {
    color: '#00E5FF',
  },
}));

const HeroSection = () => {
  return (
    <HeroContainer data-testid="hero-section">
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            {/* New Category Badge */}
            <Box mb={3}>
              <FeatureChip 
                icon={<AutoAwesomeIcon />} 
                label="Intelligence Operating System™" 
                size="medium"
              />
            </Box>

            {/* Main Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #00E5FF 50%, #5B3CFF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Where 15 Years of Market Intelligence Meets Real-Time AI
            </Typography>

            {/* Subheadline */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 300,
                mb: 4,
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
              }}
            >
              The medical sales intelligence platform that turns conversations into conversions—
              instantly, intelligently, inevitably.
            </Typography>

            {/* Key Features */}
            <Stack direction="row" spacing={2} flexWrap="wrap" mb={4}>
              <FeatureChip 
                icon={<VerifiedIcon />} 
                label="Instant Doctor Verification" 
                sx={{ mb: 1 }}
              />
              <FeatureChip 
                icon={<AccessTimeIcon />} 
                label="Zero Setup Required" 
                sx={{ mb: 1 }}
              />
              <FeatureChip 
                icon={<TrendingUpIcon />} 
                label="500+ Procedures Mapped" 
                sx={{ mb: 1 }}
              />
            </Stack>

            {/* Value Props */}
            <Box mb={5}>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong style={{ color: '#00E5FF' }}>✓</strong> Intelligent search that auto-enhances from just 3 letters
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong style={{ color: '#00E5FF' }}>✓</strong> Deploy instantly with secure activation links—no IT required
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong style={{ color: '#00E5FF' }}>✓</strong> Built on the industry's deepest provider intelligence network
              </Typography>
            </Box>

            {/* CTA Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
              <GlowingButton 
                size="large"
                onClick={() => window.location.href = '/signup'}
              >
                Start Free Trial
              </GlowingButton>
              <SecondaryButton 
                size="large"
                onClick={() => window.location.href = '#demo'}
              >
                See Canvas in Action
              </SecondaryButton>
            </Stack>

            {/* Trust Indicator */}
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.9rem',
              }}
            >
              Trusted by top medical device companies. Built by the team behind the $2.4B CoolSculpting exit.
            </Typography>
          </Grid>

          {/* Right side could have a demo video or animated preview */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 300, md: 500 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Placeholder for Canvas demo preview */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: 'monospace',
                  }}
                >
                  CANVAS PREVIEW
                </Typography>
                
                {/* Simulated search bar */}
                <Box
                  sx={{
                    width: '80%',
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 229, 255, 0.5)',
                  }}
                >
                  <Typography sx={{ color: '#00E5FF', mb: 1, fontSize: '0.9rem' }}>
                    Search: "Dr. Smi..."
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem' }}>
                    ✓ Dr. Smith, John - Dermatology, Beverly Hills<br/>
                    ✓ Dr. Smith, Sarah - Aesthetic Medicine, Malibu<br/>
                    ✓ Dr. Smithson, Robert - Plastic Surgery, Newport
                  </Typography>
                </Box>

                {/* Floating metrics */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(91, 60, 255, 0.2)',
                    border: '1px solid rgba(91, 60, 255, 0.5)',
                  }}
                >
                  <Typography sx={{ color: '#5B3CFF', fontSize: '0.8rem', fontWeight: 600 }}>
                    15 Years of Data
                  </Typography>
                  <Typography sx={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700 }}>
                    2.4M+ Providers
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;