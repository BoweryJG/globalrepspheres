import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { 
  Speed as SpeedIcon,
  AutoAwesome as AutomationIcon,
  Psychology as IntelligenceIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';

export default function CTASection() {
  return (
    <Box 
      id="cta" 
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient effect */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0,255,198,0.1) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 6, md: 10 },
            borderRadius: '32px',
            background: 'linear-gradient(135deg, rgba(40,20,70,0.6) 0%, rgba(20,10,40,0.8) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 100px rgba(0,255,198,0.1)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #00ffc6, #7B42F6) 1',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow effect */}
          <Box
            sx={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,255,198,0.1) 0%, transparent 70%)',
              top: '-50%',
              left: '-25%',
              zIndex: 0,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 3,
                background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 50%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0,255,198,0.2)',
                lineHeight: 1.1,
              }}
            >
              The Future is Available Now
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.9)',
                mb: 5,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Like early GPS adopters, those who move first shape the industry.
              <Box component="span" sx={{ display: 'block', mt: 1, color: '#00ffc6', fontWeight: 500 }}>
                Join pioneering reps already transforming their territories.
              </Box>
            </Typography>

            {/* Quick Benefits */}
            <Grid container spacing={4} sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(0,255,198,0.3)',
                    }}
                  >
                    <SpeedIcon sx={{ fontSize: 40, color: '#0a0a0a' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    Start in 48 Hours
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                    }}
                  >
                    No complex setup. No IT team. Just transformation.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(58,134,255,0.3)',
                    }}
                  >
                    <AutomationIcon sx={{ fontSize: 40, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    First Campaign in 60 Seconds
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Send perfectly researched messages - 10 or 10,000, your choice
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(123,66,246,0.3)',
                    }}
                  >
                    <IntelligenceIcon sx={{ fontSize: 40, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    See Results Tomorrow
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Watch response rates soar with AI-powered personalization
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Main CTAs */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  color: '#fff',
                  mb: 4,
                }}
              >
                Start Today. See Results Tomorrow.
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  href="/pricing"
                  endIcon={<ArrowIcon />}
                  sx={{
                    px: 6,
                    py: 2.5,
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                    borderRadius: '16px',
                    background: 'linear-gradient(90deg, #00ffc6 0%, #00d4a8 100%)',
                    boxShadow: '0 8px 32px rgba(0,255,198,0.3), 0 0 80px rgba(0,255,198,0.1)',
                    color: '#0a0a0a',
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #00ffc6 0%, #00b894 100%)',
                      boxShadow: '0 12px 40px rgba(0,255,198,0.4), 0 0 100px rgba(0,255,198,0.15)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  Choose Your Plan
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  href="/demo"
                  sx={{
                    px: 6,
                    py: 2.4,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '2px solid rgba(255,255,255,0.5)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  See It In Action
                </Button>
              </Box>
            </Box>

            {/* Trust indicators */}
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.8 }}>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box component="span" sx={{ color: '#00ffc6' }}>✓</Box>
                No credit card required
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box component="span" sx={{ color: '#00ffc6' }}>✓</Box>
                Setup in 48 hours
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box component="span" sx={{ color: '#00ffc6' }}>✓</Box>
                Cancel anytime
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom message */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: 'rgba(255,255,255,0.9)',
              mb: 2,
            }}
          >
            The advantage is here. The question is: will you take it?
          </Typography>
          <Typography
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.1rem',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Every day without automation is another day your competitors pull ahead.
            <Box component="span" sx={{ display: 'block', mt: 1, color: '#ff006e', fontWeight: 500 }}>
              The cost of waiting has never been higher.
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}