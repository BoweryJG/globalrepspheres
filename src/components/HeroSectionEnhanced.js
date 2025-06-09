import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import CanvasHeader from './CanvasHeader/CanvasHeader';

export default function HeroSectionEnhanced() {
  const heroRef = useRef();
  const [showOrb, setShowOrb] = useState(true);

  useEffect(() => {
    const obs = new window.IntersectionObserver(
      ([entry]) => setShowOrb(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Box
        ref={heroRef}
        data-hero-section
        sx={{
          position: 'relative',
          minHeight: { xs: '90vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          zIndex: 1,
          background: 'transparent',
          overflow: 'hidden',
        }}
      >
        <CanvasHeader height="100%">
          <Container maxWidth="md" sx={{ mt: { xs: 20, md: 24 } }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
                fontWeight: 900,
                fontSize: { xs: '2.8rem', md: '4.5rem', lg: '5.5rem' },
                mb: 3,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #00ffc6 0%, #00d4ff 25%, #7B42F6 50%, #ff006e 75%, #00ffc6 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 8s ease infinite, textGlow 3s ease-in-out infinite alternate',
                  textShadow: '0 0 80px rgba(0,212,255,0.5), 0 0 120px rgba(123,66,246,0.3)',
                  filter: 'drop-shadow(0 4px 16px rgba(0,212,255,0.4))',
                  '@keyframes gradientShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                  },
                  '@keyframes textGlow': {
                    '0%': { 
                      filter: 'drop-shadow(0 4px 16px rgba(0,212,255,0.4)) brightness(1)',
                      transform: 'translateY(0) scale(1)'
                    },
                    '100%': { 
                      filter: 'drop-shadow(0 8px 32px rgba(0,212,255,0.8)) brightness(1.2)',
                      transform: 'translateY(-2px) scale(1.02)'
                    }
                  }
                }}
              >
                The Intelligence Revolution
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  mt: 1,
                  position: 'relative',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(90deg, #fff 0%, #00d4ff 50%, #00ffc6 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 900,
                    animation: 'gradientShift2 6s ease infinite',
                    fontSize: { xs: '0.85em', md: '0.9em' },
                    '@keyframes gradientShift2': {
                      '0%': { backgroundPosition: '100% 50%' },
                      '50%': { backgroundPosition: '0% 50%' },
                      '100%': { backgroundPosition: '100% 50%' }
                    }
                  }}
                >
                  Has Begun
                </Box>
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 6,
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                lineHeight: 1.6,
                fontWeight: 300,
                position: 'relative',
                zIndex: 2,
                maxWidth: '800px',
                mx: 'auto',
                filter: 'drop-shadow(0 2px 8px rgba(0,212,255,0.3))',
              }}
            >
              Welcome to the frontier where artificial intelligence transforms pharmaceutical sales from art to science
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  href="https://marketdata.repspheres.com/"
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, #00ffc6 0%, #00d4ff 100%)',
                    color: '#0a0a0a',
                    borderRadius: '12px',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.3)',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.3)',
                      transform: 'translate(-50%, -50%)',
                      transition: 'width 0.6s, height 0.6s',
                    },
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.4)',
                      background: 'linear-gradient(90deg, #00d4ff 0%, #00ffc6 100%)',
                      '&::before': {
                        width: '300px',
                        height: '300px',
                      }
                    },
                  }}
                >
                  Explore Market Insights
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  href="/demo"
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: '#00d4ff',
                    color: '#00d4ff',
                    borderRadius: '12px',
                    textTransform: 'none',
                    borderWidth: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover': {
                      borderColor: '#00ffc6',
                      color: '#00ffc6',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 30px rgba(0,212,255,0.3)',
                      '&::before': {
                        left: '100%',
                      }
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Grid>
            </Grid>
          </Container>
        </CanvasHeader>
      </Box>
    </>
  );
}