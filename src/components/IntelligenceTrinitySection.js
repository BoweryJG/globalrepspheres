import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import { 
  TrendingUp, 
  Psychology, 
  Hub,
  Phone,
  RecordVoiceOver,
  AutoAwesome,
  PlayArrow,
  ArrowForward,
  Security,
  Speed,
  Analytics
} from '@mui/icons-material';

const modules = [
  {
    id: 'market-insights',
    title: 'Market Insights',
    subtitle: 'Real-Time Intelligence Engine',
    description: 'Track market sizes, growth percentages, and breaking news with city-level granularity. 15 years of proprietary data at your fingertips.',
    icon: TrendingUp,
    color: '#00ffc6',
    features: [
      'Real-time market data',
      'City-level insights', 
      'Growth tracking',
      'Competitive analysis',
      'Territory optimization'
    ],
    gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
    demoText: 'See live market data for your territory',
  },
  {
    id: 'canvas',
    title: 'Canvas',
    subtitle: 'AI-Powered Sales Intelligence',
    description: 'Instant doctor verification and intelligent sales briefs. Generate targeted insights with real-time market data and personalized strategies.',
    icon: Psychology,
    color: '#3a86ff',
    features: [
      'Doctor verification',
      'Intelligent analysis',
      'Sales briefs',
      'Real-time insights',
      'Custom AI prompts'
    ],
    gradient: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
    demoText: 'Generate a sales brief in 12 seconds',
  },
  {
    id: 'repsphere-os',
    title: 'RepSphere OS',
    subtitle: 'Your 24/7 AI Sales Assistant',
    description: 'The CRM that never sleeps. Automated Twilio campaigns, call transcription with psychological insights, and seamless workflow management that works while you do.',
    icon: Hub,
    color: '#ff6b6b',
    features: [
      'Twilio automation platform',
      'Call transcription & AI insights',
      'Professional phone line separation',
      'Post-call automated campaigns',
      'Data ownership & control',
      '150+ psychological indicators'
    ],
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    demoText: 'Watch automated campaigns in action',
    highlight: true,
  }
];

export default function IntelligenceTrinitySection() {
  const [hoveredModule, setHoveredModule] = useState('repsphere-os');
  const [callsProcessed, setCallsProcessed] = useState(1247);
  const [messagesQueued, setMessagesQueued] = useState(8934);

  // Live counters for Twilio integration
  useEffect(() => {
    const interval = setInterval(() => {
      setCallsProcessed(prev => prev + Math.floor(Math.random() * 2) + 1);
      setMessagesQueued(prev => prev + Math.floor(Math.random() * 5) + 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      id="intelligence-trinity"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(24,24,43,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          top: '20%',
          right: '-20%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,198,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          bottom: '10%',
          left: '-15%',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: 16 }} />}
            label="THE INTELLIGENCE TRINITY"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(255,107,107,0.1)',
              color: '#ff6b6b',
              border: '1px solid rgba(255,107,107,0.3)',
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
              background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 50%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(0,255,198,0.2)',
            }}
          >
            Intelligence That Never Sleeps
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
            }}
          >
            Three AI-powered modules working together as your personal sales acceleration team.
            Market intelligence, sales briefs, and 24/7 automation that works while you sleep.
          </Typography>
        </Box>

        {/* Live Stats for Twilio */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 4, 
          mb: 8,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 800,
                color: '#ff6b6b',
                mb: 0.5,
              }}
            >
              {callsProcessed.toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
              }}
            >
              Calls transcribed today
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 800,
                color: '#00ffc6',
                mb: 0.5,
              }}
            >
              {messagesQueued.toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
              }}
            >
              Automated messages queued
            </Typography>
          </Box>
        </Box>

        {/* Modules Grid */}
        <Grid container spacing={4}>
          {modules.map((module, index) => {
            const Icon = module.icon;
            const isHovered = hoveredModule === module.id;
            const isHighlighted = module.highlight;
            
            return (
              <Grid item xs={12} md={4} key={module.id}>
                <Box
                  onMouseEnter={() => setHoveredModule(module.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHighlighted 
                      ? (isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(-8px) scale(1.02)')
                      : (isHovered ? 'translateY(-8px)' : 'translateY(0)'),
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      padding: isHighlighted ? '3px' : '2px',
                      background: isHighlighted 
                        ? module.gradient 
                        : (isHovered ? module.gradient : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'),
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      transition: 'all 0.4s ease',
                    },
                  }}
                >
                  {/* Highlight badge for RepSphere OS */}
                  {isHighlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        icon={<Phone sx={{ fontSize: 14 }} />}
                        label="TWILIO POWERED"
                        sx={{
                          backgroundColor: '#ff6b6b',
                          color: '#fff',
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          letterSpacing: '0.05em',
                          py: 1.5,
                          px: 0.5,
                          boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
                        }}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(24,24,43,0.8)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      p: 4,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Module glow effect */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: module.gradient,
                        opacity: isHovered ? 0.2 : (isHighlighted ? 0.15 : 0.1),
                        filter: 'blur(60px)',
                        top: '-50px',
                        right: '-50px',
                        transition: 'opacity 0.4s ease',
                      }}
                    />

                    {/* Content */}
                    <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Icon and Title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '16px',
                            background: module.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 3,
                            boxShadow: `0 8px 24px ${module.color}33`,
                            transform: isHovered ? 'rotate(-5deg) scale(1.1)' : 'rotate(0)',
                            transition: 'transform 0.4s ease',
                          }}
                        >
                          <Icon sx={{ fontSize: 32, color: '#fff' }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Space Grotesk', Arial, sans-serif",
                              fontWeight: 700,
                              fontSize: { xs: '1.3rem', md: '1.5rem' },
                              color: '#fff',
                              mb: 0.5,
                            }}
                          >
                            {module.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              color: module.color,
                              fontWeight: 500,
                              fontSize: '0.85rem',
                            }}
                          >
                            {module.subtitle}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.85)',
                          mb: 3,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          flex: 1,
                        }}
                      >
                        {module.description}
                      </Typography>

                      {/* Special Twilio features for RepSphere OS */}
                      {isHighlighted && (
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "'Space Grotesk', Arial, sans-serif",
                              fontWeight: 600,
                              color: module.color,
                              mb: 2,
                              fontSize: '1rem',
                            }}
                          >
                            Professional Phone Line Benefits:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                            {[
                              { icon: Security, text: 'Data ownership' },
                              { icon: Analytics, text: 'Call insights' },
                              { icon: Speed, text: 'Auto campaigns' },
                            ].map((benefit, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5,
                                  backgroundColor: 'rgba(255,107,107,0.1)',
                                  border: '1px solid rgba(255,107,107,0.3)',
                                  borderRadius: '20px',
                                  px: 1.5,
                                  py: 0.5,
                                }}
                              >
                                <benefit.icon sx={{ fontSize: 14, color: module.color }} />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontFamily: "'DM Sans', Arial, sans-serif",
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '0.7rem',
                                  }}
                                >
                                  {benefit.text}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Features */}
                      <Box sx={{ mb: 3 }}>
                        {module.features.slice(0, isHighlighted ? 6 : 5).map((feature, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                              opacity: isHovered ? 1 : 0.8,
                              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                              transition: `all 0.3s ease ${idx * 0.05}s`,
                            }}
                          >
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                backgroundColor: module.color,
                                mr: 1.5,
                                boxShadow: `0 0 8px ${module.color}66`,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "'DM Sans', Arial, sans-serif",
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '0.85rem',
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Demo CTA */}
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PlayArrow />}
                        sx={{
                          borderColor: `${module.color}66`,
                          color: module.color,
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          fontWeight: 500,
                          fontSize: '0.8rem',
                          borderRadius: '20px',
                          py: 1,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: module.color,
                            backgroundColor: `${module.color}11`,
                          },
                        }}
                      >
                        {module.demoText}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Integration Flow Visual */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.3rem' },
              mb: 4,
              color: '#fff',
            }}
          >
            How They Work Together
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            flexWrap: 'wrap',
            mb: 4
          }}>
            {[
              { icon: TrendingUp, text: 'Market Intel', color: '#00ffc6' },
              { icon: ArrowForward, text: '', color: 'rgba(255,255,255,0.3)' },
              { icon: Psychology, text: 'AI Analysis', color: '#3a86ff' },
              { icon: ArrowForward, text: '', color: 'rgba(255,255,255,0.3)' },
              { icon: Phone, text: 'Auto Outreach', color: '#ff6b6b' },
            ].map((step, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <step.icon sx={{ 
                  fontSize: step.text ? 40 : 24, 
                  color: step.color,
                  mb: step.text ? 1 : 0
                }} />
                {step.text && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: step.color,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                    }}
                  >
                    {step.text}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1rem',
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Market insights feed your Canvas intelligence. AI analysis triggers RepSphere OS automation.
            Every call becomes transcribed insights. Every insight becomes perfect follow-ups.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<RecordVoiceOver />}
            sx={{
              px: 4,
              py: 2,
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(255,107,107,0.5)',
              },
            }}
          >
            See The Trinity In Action
          </Button>
        </Box>
      </Container>
    </Box>
  );
}