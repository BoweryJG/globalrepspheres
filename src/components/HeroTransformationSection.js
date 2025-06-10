import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { 
  TrendingUp, 
  Speed, 
  Psychology, 
  AutoAwesome,
  ArrowForward,
  PlayArrow
} from '@mui/icons-material';

export default function HeroTransformationSection() {
  const [messageCount, setMessageCount] = useState(2847);
  const [transformationStep, setTransformationStep] = useState(0);

  // Live counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Transformation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTransformationStep(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const transformationSteps = [
    { label: "Research Time", value: "4 hours", color: "#ff6b6b" },
    { label: "With RepSphere", value: "12 seconds", color: "#00ffc6" },
    { label: "Time Saved", value: "1,200x faster", color: "#7B42F6" }
  ];

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.95) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
        pt: { xs: 12, md: 8 },
        pb: { xs: 8, md: 12 },
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(circle at 30% 20%, rgba(0,255,198,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(123,66,246,0.1) 0%, transparent 50%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Live Activity Indicator */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: 16, animation: 'pulse 2s infinite' }} />}
            label={`${messageCount.toLocaleString()} messages sent by RepSphere users today`}
            sx={{
              backgroundColor: 'rgba(0,255,198,0.1)',
              color: '#00ffc6',
              border: '1px solid rgba(0,255,198,0.3)',
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 500,
              fontSize: '0.9rem',
              py: 2.5,
              px: 1,
              mb: 2,
            }}
          />
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Left side - Hook and value prop */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              {/* MapQuest Hook */}
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                  lineHeight: { xs: 1.2, md: 1.1 },
                  mb: 3,
                  background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 50%, #7B42F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 4px 20px rgba(0,255,198,0.2)',
                }}
              >
                Remember MapQuest?
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '1.8rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: 1.2,
                  color: '#fff',
                  mb: 4,
                }}
              >
                The Same Revolution is Happening in{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#00ffc6',
                    fontWeight: 800,
                  }}
                >
                  Medical Sales
                </Typography>
              </Typography>

              {/* Value proposition */}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: { lg: '90%' },
                }}
              >
                From printing directions to GPS. From cold calling to warm intelligence.
                <strong style={{ color: '#00ffc6' }}> Join 500+ top performers</strong> who've already made the jump.
              </Typography>

              {/* Trust indicators */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                {['$2.4B Exit Experience', 'HIPAA Compliant', '48hr Setup'].map((indicator, index) => (
                  <Chip
                    key={index}
                    label={indicator}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '0.85rem',
                    }}
                  />
                ))}
              </Box>

              {/* CTAs */}
              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  href="#pricing"
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
                    color: '#0a0a0a',
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 20px rgba(0,255,198,0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00ffc6 0%, #00b894 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(0,255,198,0.5)',
                    },
                  }}
                >
                  Start Free Trial
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  href="#demo"
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: '30px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '2px solid rgba(255,255,255,0.6)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Transformation visualization */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}>
              {/* Before/After comparison */}
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    textAlign: 'center',
                    mb: 4,
                    color: '#fff',
                  }}
                >
                  From Guessing to Knowing
                </Typography>

                <Grid container spacing={3}>
                  {/* Before */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        background: 'rgba(255,107,107,0.1)',
                        border: '1px solid rgba(255,107,107,0.3)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(255,107,107,0.2)',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 600,
                          color: '#ff6b6b',
                          mb: 2,
                        }}
                      >
                        Before RepSphere
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                        }}
                      >
                        • 4+ hours of research per prospect<br/>
                        • Outdated contact information<br/>
                        • Generic, ineffective outreach<br/>
                        • Low response rates
                      </Typography>
                    </Box>
                  </Grid>

                  {/* After */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        background: 'rgba(0,255,198,0.1)',
                        border: '1px solid rgba(0,255,198,0.3)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(0,255,198,0.2)',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 600,
                          color: '#00ffc6',
                          mb: 2,
                        }}
                      >
                        With RepSphere
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                        }}
                      >
                        • 12 seconds to complete intelligence<br/>
                        • Verified, real-time data<br/>
                        • AI-powered personalization<br/>
                        • 10x higher response rates
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Transformation metrics */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                mt: 2,
              }}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${transformationSteps[transformationStep].color}22 0%, ${transformationSteps[transformationStep].color}11 100%)`,
                    border: `1px solid ${transformationSteps[transformationStep].color}33`,
                    minWidth: 120,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 800,
                      color: transformationSteps[transformationStep].color,
                      mb: 0.5,
                    }}
                  >
                    {transformationSteps[transformationStep].value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {transformationSteps[transformationStep].label}
                  </Typography>
                </Box>
              </Box>

              {/* Speed indicators */}
              <Box sx={{ display: 'flex', gap: 4, mt: 2, justifyContent: 'center' }}>
                {[
                  { icon: Speed, label: '120x Faster Research', color: '#00ffc6' },
                  { icon: Psychology, label: '1000x Better Insights', color: '#3a86ff' },
                  { icon: TrendingUp, label: '∞ More Opportunities', color: '#7B42F6' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      textAlign: 'center',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <item.icon sx={{ fontSize: 32, color: item.color, mb: 1 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: item.color,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        display: 'block',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}