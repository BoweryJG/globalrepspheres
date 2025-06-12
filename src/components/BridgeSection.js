import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { 
  LocalHospital as SurgeryIcon,
  AutoAwesome as AIIcon,
  Handshake as BridgeIcon
} from '@mui/icons-material';

export default function BridgeSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(24,24,43,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated background streams */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
          overflow: 'hidden',
        }}
      >
        {/* AI data streams converging */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '100%',
              background: `linear-gradient(180deg, transparent 0%, ${i % 2 === 0 ? '#00ffc6' : '#7B42F6'} 50%, transparent 100%)`,
              left: `${20 + i * 15}%`,
              animation: `flowDown ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              '@keyframes flowDown': {
                '0%': { transform: 'translateY(-100%)' },
                '100%': { transform: 'translateY(100%)' },
              },
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
              mb: 4,
              background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI Needs a Translator
          </Typography>

          {/* Surgeon's Scalpel Quote */}
          <Box
            sx={{
              maxWidth: 800,
              mx: 'auto',
              p: 4,
              borderRadius: '20px',
              background: 'rgba(123, 66, 246, 0.1)',
              border: '1px solid rgba(123, 66, 246, 0.3)',
              mb: 4,
            }}
          >
            <SurgeryIcon sx={{ fontSize: 48, color: '#7B42F6', mb: 2 }} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.9)',
                fontStyle: 'italic',
              }}
            >
              "Like a surgeon's scalpel, AI is only as good as the hand that guides it"
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            After 15 years in medical aesthetics—from industry pioneers to NVIDIA-backed surgical robotics—I built the bridge between raw intelligence and real results
          </Typography>
        </Box>

        {/* Visual Bridge Concept */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4} alignItems="center">
            {/* AI Side */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(123, 66, 246, 0.3)',
                }}
              >
                <AIIcon sx={{ fontSize: 64, color: '#7B42F6', mb: 3 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    color: '#fff',
                    mb: 2,
                  }}
                >
                  Raw AI Power
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                  }}
                >
                  Massive intelligence, infinite potential, but needs direction
                </Typography>
              </Box>
            </Grid>

            {/* Bridge (RepSpheres) */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(0,255,198,0.2) 0%, rgba(123,66,246,0.2) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(135deg, #00ffc6, #7B42F6) 1',
                  boxShadow: '0 10px 40px rgba(0,255,198,0.3)',
                  transform: 'scale(1.1)',
                }}
              >
                <BridgeIcon sx={{ fontSize: 64, color: '#00ffc6', mb: 3 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    color: '#fff',
                    mb: 2,
                  }}
                >
                  The Bridge
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1rem',
                    fontWeight: 500,
                  }}
                >
                  15 years of industry expertise coded into every interaction
                </Typography>
              </Box>
            </Grid>

            {/* Results Side */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 255, 198, 0.3)',
                }}
              >
                <Box
                  sx={{
                    fontSize: 64,
                    mb: 3,
                    background: 'linear-gradient(90deg, #00ffc6 0%, #00d4ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  📈
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    color: '#fff',
                    mb: 2,
                  }}
                >
                  Real Results
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                  }}
                >
                  Actionable insights that close deals and build relationships
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Key Differentiators */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              color: '#fff',
              textAlign: 'center',
              mb: 6,
            }}
          >
            This Isn't About AI. It's About What AI Becomes in the Right Hands.
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                title: 'Industry Insider Knowledge',
                description: 'Built by someone who\'s carried the bag and knows what reps actually need',
                color: '#00ffc6',
              },
              {
                title: 'Exclusive Data Access',
                description: 'Connections to intelligence sources others simply don\'t have',
                color: '#3a86ff',
              },
              {
                title: 'Practical Application',
                description: 'Not just data, but exactly how to use it to win in your territory',
                color: '#7B42F6',
              },
              {
                title: 'Continuous Evolution',
                description: 'Learning from thousands of interactions to get smarter every day',
                color: '#ff006e',
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(40, 20, 70, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: `${item.color}33`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      borderColor: `${item.color}66`,
                      boxShadow: `0 10px 30px ${item.color}22`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 40,
                      background: item.color,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '0.95rem',
                      color: 'rgba(255,255,255,0.7)',
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

        {/* Closing Statement */}
        <Box
          sx={{
            textAlign: 'center',
            p: 5,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(123,66,246,0.1) 0%, rgba(0,255,198,0.1) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
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
            AI without industry expertise is just noise.
            <Box component="span" sx={{ display: 'block', mt: 1, color: '#00ffc6' }}>
              With 15 years of experience built in, it becomes your competitive edge.
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}