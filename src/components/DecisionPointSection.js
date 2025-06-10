import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Chip, LinearProgress } from '@mui/material';
import { 
  TrendingDown,
  Schedule,
  Shield,
  Speed,
  Phone,
  CheckCircle,
  Warning,
  Timeline,
  ArrowForward
} from '@mui/icons-material';

export default function DecisionPointSection() {
  const [dealsLost, setDealsLost] = useState(47);
  const [competitorMessages, setCompetitorMessages] = useState(23847);
  const [timeRemaining, setTimeRemaining] = useState(72); // hours
  
  // Live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setDealsLost(prev => prev + Math.floor(Math.random() * 2));
      setCompetitorMessages(prev => prev + Math.floor(Math.random() * 15) + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 0.1 : 0);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const timelineSteps = [
    { time: 'Hour 1', action: 'Account setup & onboarding call', icon: CheckCircle },
    { time: 'Hour 12', action: 'Market data sync & territory analysis', icon: CheckCircle },
    { time: 'Hour 24', action: 'Twilio integration & phone line setup', icon: CheckCircle },
    { time: 'Hour 48', action: 'First AI-powered campaigns launching', icon: Speed },
  ];

  return (
    <Box
      id="decision-point"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(15,15,25,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Dramatic background effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,0,110,0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(255,107,107,0.1) 0%, transparent 50%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Urgency Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<Warning sx={{ fontSize: 16, animation: 'pulse 2s infinite' }} />}
            label="THE INTELLIGENCE GAP WIDENS DAILY"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(255,107,107,0.2)',
              color: '#ff6b6b',
              border: '2px solid rgba(255,107,107,0.5)',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              py: 2.5,
              px: 1,
              letterSpacing: '0.05em',
            }}
          />
          
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              background: 'linear-gradient(90deg, #ff6b6b 0%, #ff006e 50%, #8338ec 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(255,107,107,0.3)',
            }}
          >
            Every Day You Wait, You Fall Further Behind
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Left side - FOMO Stats */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: '24px',
                background: 'rgba(255,107,107,0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(255,107,107,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Pulsing glow */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff006e 100%)',
                  opacity: 0.1,
                  filter: 'blur(80px)',
                  top: '-50%',
                  left: '-50%',
                  animation: 'pulse 3s infinite',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: '#ff6b6b',
                    mb: 4,
                    textAlign: 'center',
                  }}
                >
                  Today's Reality Check
                </Typography>

                {/* Live stats */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 800,
                          color: '#ff006e',
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <TrendingDown sx={{ fontSize: 40 }} />
                        {dealsLost}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '1rem',
                        }}
                      >
                        Deals lost today to reps with better intel
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 800,
                          color: '#8338ec',
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <Phone sx={{ fontSize: 40 }} />
                        {competitorMessages.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '1rem',
                        }}
                      >
                        Messages sent by competitors today
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Gap widening progress */}
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      Intelligence Gap Widening
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: '#ff006e',
                        fontWeight: 600,
                      }}
                    >
                      23% monthly
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 6,
                        background: 'linear-gradient(90deg, #ff6b6b 0%, #ff006e 100%)',
                        animation: 'pulse 2s infinite',
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.8rem',
                      mt: 1,
                      display: 'block',
                      textAlign: 'center',
                    }}
                  >
                    Your territory opportunity cost vs. competitors
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right side - 48-Hour Promise */}
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  color: '#fff',
                  mb: 2,
                }}
              >
                But In 48 Hours...
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.2rem',
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                You'll have the most advanced sales intelligence system in medical device sales.
                <strong style={{ color: '#00ffc6' }}> Guaranteed.</strong>
              </Typography>

              {/* Timeline */}
              <Box sx={{ mb: 4 }}>
                {timelineSteps.map((step, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: index < 3 
                          ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)' 
                          : 'linear-gradient(135deg, #ff6b6b 0%, #ff006e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        boxShadow: index < 3
                          ? '0 4px 20px rgba(0,255,198,0.3)'
                          : '0 4px 20px rgba(255,107,107,0.3)',
                      }}
                    >
                      <step.icon sx={{ fontSize: 24, color: '#fff' }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 600,
                          color: index < 3 ? '#00ffc6' : '#ff6b6b',
                          mb: 0.5,
                        }}
                      >
                        {step.time}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '0.95rem',
                        }}
                      >
                        {step.action}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Risk reversal */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(0,255,198,0.1)',
                  border: '1px solid rgba(0,255,198,0.3)',
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Shield sx={{ fontSize: 24, color: '#00ffc6', mr: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#00ffc6',
                    }}
                  >
                    100% Risk-Free Guarantee
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                  }}
                >
                  14-day money-back guarantee. If RepSphere doesn't 10x your research speed 
                  and double your response rates in the first two weeks, we'll refund every penny.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Final CTA */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              color: '#fff',
              mb: 2,
            }}
          >
            The Choice Is Clear
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.2rem',
              mb: 4,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Join the intelligence revolution now, or watch your competitors pull further ahead every single day.
          </Typography>

          {/* Urgency timer */}
          <Box sx={{ mb: 4 }}>
            <Chip
              icon={<Schedule sx={{ fontSize: 16 }} />}
              label={`Early adopter pricing expires in ${Math.floor(timeRemaining)} hours`}
              sx={{
                backgroundColor: 'rgba(255,107,107,0.2)',
                color: '#ff6b6b',
                border: '1px solid rgba(255,107,107,0.4)',
                fontFamily: "'DM Sans', Arial, sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                py: 2.5,
                px: 2,
                mb: 3,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'get_repsphere_now', {
                    event_category: 'engagement',
                    event_label: 'decision_point_section',
                    value: 1
                  });
                }
                window.location.href = '#pricing';
              }}
              sx={{
                px: 6,
                py: 3,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
                color: '#fff',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '1.3rem',
                letterSpacing: '0.02em',
                boxShadow: '0 8px 30px rgba(255,0,110,0.4)',
                transition: 'all 0.3s ease',
                animation: 'pulse 2s infinite',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff006e 0%, #6a1b99 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(255,0,110,0.6)',
                  animation: 'none',
                },
              }}
            >
              Get RepSphere Now
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'watch_demo', {
                    event_category: 'engagement',
                    event_label: 'decision_point_section',
                    value: 1
                  });
                }
                window.location.href = '/demo';
              }}
              sx={{
                px: 6,
                py: 3,
                borderRadius: '50px',
                border: '2px solid rgba(255,255,255,0.3)',
                color: '#fff',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 600,
                fontSize: '1.3rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '2px solid rgba(255,255,255,0.6)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              Watch Demo First
            </Button>
          </Box>

          {/* Final urgency message */}
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1rem',
              mt: 4,
              fontStyle: 'italic',
            }}
          >
            "Every minute you hesitate, a competitor gains ground. Every hour you wait, deals slip away."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}