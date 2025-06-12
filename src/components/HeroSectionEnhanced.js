import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Grid, Fade } from '@mui/material';

export default function HeroSectionEnhanced() {
  const heroRef = useRef();
  const [showOrb, setShowOrb] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const obs = new window.IntersectionObserver(
      ([entry]) => setShowOrb(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    
    // Trigger content animation
    setTimeout(() => setShowContent(true), 100);
    
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={heroRef}
      data-hero-section
      sx={{
        position: 'relative',
        minHeight: { xs: '100vh', md: '100vh' },
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
      <Container maxWidth="lg">
        <Fade in={showContent} timeout={1000}>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 800,
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                mb: 2,
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
                  background: 'linear-gradient(90deg, #00ffc6 0%, #00d4ff 50%, #7B42F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 60px rgba(0,212,255,0.5)',
                }}
              >
                Remember MapQuest?
              </Box>
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mb: 3,
                color: 'rgba(255,255,255,0.95)',
                fontSize: { xs: '1.8rem', md: '2.5rem', lg: '3rem' },
                lineHeight: 1.3,
                fontWeight: 600,
                position: 'relative',
                zIndex: 2,
                maxWidth: '900px',
                mx: 'auto',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
              }}
            >
              The Same Revolution is Happening in Medical Sales
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 6,
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                lineHeight: 1.6,
                fontWeight: 400,
                position: 'relative',
                zIndex: 2,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Every physician. Every procedure. Every insight. 
              <Box component="span" sx={{ display: 'block', mt: 1, color: '#00ffc6', fontWeight: 500 }}>
                Digitally mapped and instantly accessible.
              </Box>
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  href="#transformation"
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
                    boxShadow: '0 4px 20px rgba(0,212,255,0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 30px rgba(0,212,255,0.5)',
                      background: 'linear-gradient(90deg, #00d4ff 0%, #00ffc6 100%)',
                    },
                  }}
                >
                  See The Future
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  href="/pricing"
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00ffc6',
                      color: '#00ffc6',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 30px rgba(0,212,255,0.3)',
                    },
                  }}
                >
                  Join Early Access
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}