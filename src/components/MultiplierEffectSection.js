import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, LinearProgress, Chip } from '@mui/material';
import { 
  Send,
  Schedule,
  Psychology,
  TrendingUp,
  PlayArrow,
  Phone,
  AutoAwesome,
  Speed,
  Timeline,
  Bolt
} from '@mui/icons-material';

export default function MultiplierEffectSection() {
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);
  const [responses, setResponses] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Campaign simulation
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCampaignProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 2;
        });
        setMessagesSent(prev => prev + Math.floor(Math.random() * 15) + 5);
        setResponses(prev => prev + Math.floor(Math.random() * 3));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startDemo = () => {
    setCampaignProgress(0);
    setMessagesSent(0);
    setResponses(0);
    setIsRunning(true);
  };

  const caseStudyData = {
    name: "Sarah Chen",
    role: "Territory Manager, Growth Plan ($349/month)",
    territory: "San Francisco Bay Area",
    before: {
      messagesPerWeek: 50,
      responseRate: "3.2%",
      timeSpent: "20 hours",
      deals: "2-3 per month",
      roi: "$8,400"
    },
    after: {
      messagesPerWeek: 2847,
      responseRate: "24.7%", 
      timeSpent: "2 hours",
      deals: "18 per month",
      roi: "$151,200"
    }
  };

  return (
    <Box
      id="multiplier-effect"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,66,246,0.1) 0%, transparent 70%)',
          filter: 'blur(120px)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<Bolt sx={{ fontSize: 16 }} />}
            label="POWERED BY TWILIO"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(123,66,246,0.1)',
              color: '#7B42F6',
              border: '1px solid rgba(123,66,246,0.3)',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '0.9rem',
              py: 2.5,
              px: 1,
            }}
          />
          
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 50%, #3a86ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(123,66,246,0.2)',
            }}
          >
            The Message Multiplier
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Send 10,000 perfectly crafted messages while you sleep.
            Your professional phone line becomes a 24/7 sales machine.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: '#7B42F6',
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Every call transcribed. Every insight automated. Every follow-up perfect.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Left side - Live Demo */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: '24px',
                background: 'rgba(24,24,43,0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(123,66,246,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow effect */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
                  opacity: 0.1,
                  filter: 'blur(80px)',
                  top: '-50%',
                  left: '-50%',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: '#fff',
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  Watch Campaign In Action
                </Typography>

                {/* Campaign Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 800,
                          color: '#00ffc6',
                          mb: 0.5,
                        }}
                      >
                        {messagesSent.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        Messages Sent
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 800,
                          color: '#3a86ff',
                          mb: 0.5,
                        }}
                      >
                        {responses}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        Responses
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Progress Bar */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      Campaign Progress
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: '#7B42F6',
                        fontWeight: 600,
                      }}
                    >
                      {Math.round(campaignProgress)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={campaignProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
                      },
                    }}
                  />
                </Box>

                {/* Demo Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={startDemo}
                  disabled={isRunning}
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    background: isRunning 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
                    color: isRunning ? 'rgba(255,255,255,0.5)' : '#fff',
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                    boxShadow: isRunning ? 'none' : '0 4px 20px rgba(123,66,246,0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: isRunning 
                        ? 'rgba(255,255,255,0.1)' 
                        : 'linear-gradient(135deg, #7B42F6 0%, #4A29C1 100%)',
                      transform: isRunning ? 'none' : 'translateY(-2px)',
                      boxShadow: isRunning ? 'none' : '0 8px 30px rgba(123,66,246,0.5)',
                    },
                  }}
                >
                  {isRunning ? 'Campaign Running...' : 'Start Demo Campaign'}
                </Button>

                {/* Live indicators */}
                {isRunning && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    {[
                      { icon: Send, label: 'Sending' },
                      { icon: Psychology, label: 'Analyzing' },
                      { icon: Schedule, label: 'Queuing' },
                    ].map((item, index) => (
                      <Box key={index} sx={{ textAlign: 'center', opacity: 0.8 }}>
                        <item.icon 
                          sx={{ 
                            fontSize: 20, 
                            color: '#7B42F6', 
                            mb: 0.5,
                            animation: 'pulse 1.5s infinite'
                          }} 
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.7rem',
                            display: 'block',
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Right side - Case Study */}
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  color: '#fff',
                  mb: 1,
                }}
              >
                Real Results: {caseStudyData.name}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.7)',
                  mb: 4,
                }}
              >
                {caseStudyData.role}, {caseStudyData.territory}
              </Typography>

              {/* Before/After Comparison */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(255,107,107,0.1)',
                      border: '1px solid rgba(255,107,107,0.3)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Space Grotesk', Arial, sans-serif",
                        fontWeight: 600,
                        color: '#ff6b6b',
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      Before RepSphere
                    </Typography>
                    
                    {Object.entries(caseStudyData.before).map(([key, value], index) => (
                      <Box key={index} sx={{ mb: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.8rem',
                            textTransform: 'capitalize',
                          }}
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            fontWeight: 700,
                            color: '#ff6b6b',
                          }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(0,255,198,0.1)',
                      border: '1px solid rgba(0,255,198,0.3)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Space Grotesk', Arial, sans-serif",
                        fontWeight: 600,
                        color: '#00ffc6',
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      With RepSphere
                    </Typography>
                    
                    {Object.entries(caseStudyData.after).map(([key, value], index) => (
                      <Box key={index} sx={{ mb: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.8rem',
                            textTransform: 'capitalize',
                          }}
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            fontWeight: 700,
                            color: '#00ffc6',
                          }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>

              {/* ROI Calculation */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 600,
                    color: '#7B42F6',
                    mb: 3,
                  }}
                >
                  ROI Calculation:
                </Typography>
                
                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(123,66,246,0.1)',
                    border: '1px solid rgba(123,66,246,0.3)',
                    mb: 3,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.8rem',
                          mb: 0.5,
                        }}
                      >
                        Monthly Revenue Before
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          color: '#ff6b6b',
                        }}
                      >
                        {caseStudyData.before.roi}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.8rem',
                          mb: 0.5,
                        }}
                      >
                        Monthly Revenue After
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          color: '#00ffc6',
                        }}
                      >
                        {caseStudyData.after.roi}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Box
                    sx={{
                      mt: 2,
                      pt: 2,
                      borderTop: '1px solid rgba(123,66,246,0.3)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Space Grotesk', Arial, sans-serif",
                        fontWeight: 800,
                        color: '#7B42F6',
                        mb: 1,
                      }}
                    >
                      1,700% ROI
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.9rem',
                      }}
                    >
                      Investment: $349/month • Return: $142,800 additional monthly revenue
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {[
                    { label: '5,694% more messages', icon: Send },
                    { label: '772% higher response rate', icon: TrendingUp },
                    { label: '90% less time spent', icon: Speed },
                    { label: '600% more deals closed', icon: Timeline },
                  ].map((metric, index) => (
                    <Chip
                      key={index}
                      icon={<metric.icon sx={{ fontSize: 16 }} />}
                      label={metric.label}
                      sx={{
                        backgroundColor: 'rgba(123,66,246,0.1)',
                        color: '#7B42F6',
                        border: '1px solid rgba(123,66,246,0.3)',
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        py: 2,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.3rem' },
              color: '#fff',
              mb: 2,
            }}
          >
            Your Professional Phone Line Awaits
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Separate your personal life from your pipeline. Own your data. 
            Control your campaigns. Multiply your results.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Phone />}
            href="#pricing"
            sx={{
              px: 5,
              py: 2,
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #7B42F6 0%, #00ffc6 100%)',
              color: '#fff',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(123,66,246,0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #7B42F6 0%, #00b894 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(123,66,246,0.5)',
              },
            }}
          >
            Get Your Professional Line
          </Button>
        </Box>
      </Container>
    </Box>
  );
}