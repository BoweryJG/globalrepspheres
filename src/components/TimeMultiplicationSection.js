import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { 
  Timer as TimerIcon,
  TrendingUp as GrowthIcon,
  AutorenewRounded as AutomationIcon,
  Groups as RelationshipIcon
} from '@mui/icons-material';

export default function TimeMultiplicationSection() {
  const [messagesCount, setMessagesCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessagesCount(prev => prev + Math.floor(Math.random() * 10 + 5));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Time multiplication visual effect */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.05,
        }}
      >
        {/* Clock-like radial lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '50%',
              background: 'linear-gradient(180deg, transparent 0%, #00ffc6 100%)',
              left: '50%',
              top: '50%',
              transformOrigin: 'top',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              mb: 3,
              background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            What If You Had 100 Hours in Your Day?
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              lineHeight: 1.6,
            }}
          >
            Send 1000 perfect messages in 60 seconds. Research any practice in 2 seconds. 
            <Box component="span" sx={{ display: 'block', mt: 1, color: '#00ffc6', fontWeight: 500 }}>
              Automation isn't the future. It's the minimum.
            </Box>
          </Typography>
        </Box>

        {/* Time Transformation Grid */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {[
            {
              task: 'Research a Practice',
              before: '2 hours',
              after: '2 seconds',
              multiplier: '3,600x',
              icon: <TimerIcon />,
              color: '#00ffc6',
            },
            {
              task: 'Personalize Outreach',
              before: '30 minutes',
              after: 'Instant',
              multiplier: '∞',
              icon: <AutomationIcon />,
              color: '#3a86ff',
            },
            {
              task: 'Send Messages',
              before: '1 at a time',
              after: '1000 at once',
              multiplier: '1000x',
              icon: <GrowthIcon />,
              color: '#7B42F6',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: `${item.color}33`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: `${item.color}66`,
                    boxShadow: `0 20px 40px ${item.color}22`,
                  },
                }}
              >
                <Box sx={{ color: item.color, mb: 3 }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: 48 } })}
                </Box>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    color: '#fff',
                    mb: 3,
                    fontSize: '1.5rem',
                  }}
                >
                  {item.task}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.5)',
                        mb: 0.5,
                      }}
                    >
                      Before
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Space Grotesk', Arial, sans-serif",
                        fontSize: '1.3rem',
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'line-through',
                      }}
                    >
                      {item.before}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ px: 2 }}>
                    <Typography sx={{ color: item.color, fontSize: '1.5rem' }}>→</Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.5)',
                        mb: 0.5,
                      }}
                    >
                      Now
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Space Grotesk', Arial, sans-serif",
                        fontSize: '1.3rem',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    >
                      {item.after}
                    </Typography>
                  </Box>
                </Box>
                
                <Box
                  sx={{
                    mt: 3,
                    pt: 3,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}CC 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {item.multiplier}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    faster
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Live Counter */}
        <Box
          sx={{
            p: 6,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(58,134,255,0.1) 100%)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #00ffc6, #3a86ff) 1',
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              mb: 3,
              fontSize: '1.3rem',
            }}
          >
            While you read this section, automated reps have sent:
          </Typography>
          
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '4rem' },
              background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
            }}
          >
            {messagesCount.toLocaleString()}
          </Typography>
          
          <Typography
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.1rem',
            }}
          >
            perfectly researched, personalized messages
          </Typography>
        </Box>

        {/* What You Gain Back */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              color: '#fff',
              textAlign: 'center',
              mb: 6,
            }}
          >
            Every Rep Using This Gains 20+ Hours Per Week
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
            }}
          >
            Spend time building relationships, not searching spreadsheets
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {[
              {
                icon: <RelationshipIcon sx={{ fontSize: 40 }} />,
                title: 'Build Real Relationships',
                description: 'Focus on what matters: connecting with physicians',
              },
              {
                icon: <GrowthIcon sx={{ fontSize: 40 }} />,
                title: 'Strategic Territory Planning',
                description: 'See opportunities others miss with AI insights',
              },
              {
                icon: <AutomationIcon sx={{ fontSize: 40 }} />,
                title: 'Scale Without Burnout',
                description: 'Work smarter, not harder—let automation handle the rest',
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    borderRadius: '16px',
                    background: 'rgba(40, 20, 70, 0.2)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(40, 20, 70, 0.3)',
                    },
                  }}
                >
                  <Box sx={{ color: '#00ffc6', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 2,
                      fontSize: '1.2rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '1rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Closing CTA */}
        <Box
          sx={{
            textAlign: 'center',
            p: 5,
            borderRadius: '20px',
            background: 'rgba(255, 0, 110, 0.05)',
            border: '1px solid rgba(255, 0, 110, 0.2)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
            }}
          >
            The question isn't whether you need automation.
            <Box component="span" sx={{ display: 'block', mt: 1, color: '#ff006e' }}>
              It's how many deals you're losing without it.
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}