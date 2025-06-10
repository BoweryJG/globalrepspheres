import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { 
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as IntelligenceIcon,
  Bolt as SpeedIcon
} from '@mui/icons-material';

export default function RevolutionSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(24,24,43,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background animation */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.03,
        }}
      >
        {/* Quiet revolution particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#00ffc6' : '#7B42F6',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${20 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              '@keyframes float': {
                '0%': { transform: 'translateY(100vh) scale(0)' },
                '10%': { transform: 'translateY(80vh) scale(1)' },
                '90%': { transform: 'translateY(20vh) scale(1)' },
                '100%': { transform: 'translateY(0) scale(0)' },
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
            }}
          >
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #ff006e 0%, #7B42F6 50%, #00ffc6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Quiet Revolution
            </Box>
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            While others debate AI's future, early adopters are already there.
            <Box component="span" sx={{ display: 'block', mt: 1, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>
              No hype. No promises. Just results.
            </Box>
          </Typography>
        </Box>

        {/* Reality Stats */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {[
            {
              icon: <SpeedIcon sx={{ fontSize: 48 }} />,
              stat: '10,000+',
              label: 'Messages sent monthly by smart reps',
              subtext: 'Each one perfectly researched and personalized',
              color: '#00ffc6',
            },
            {
              icon: <VisibilityIcon sx={{ fontSize: 48 }} />,
              stat: '2 seconds',
              label: 'To know everything about a practice',
              subtext: 'Before anyone else even knows they exist',
              color: '#3a86ff',
            },
            {
              icon: <IntelligenceIcon sx={{ fontSize: 48 }} />,
              stat: '85%',
              label: 'Higher response rates',
              subtext: 'When you know exactly what matters to them',
              color: '#7B42F6',
            },
            {
              icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
              stat: '3.7x',
              label: 'More deals closed',
              subtext: 'Same territory, exponentially better results',
              color: '#ff006e',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  height: '100%',
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: `${item.color}22`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: `${item.color}44`,
                    boxShadow: `0 20px 40px ${item.color}15`,
                  },
                }}
              >
                <Box sx={{ color: item.color, mb: 3 }}>
                  {item.icon}
                </Box>
                
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    color: item.color,
                    mb: 1,
                  }}
                >
                  {item.stat}
                </Typography>
                
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  {item.label}
                </Typography>
                
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.4,
                  }}
                >
                  {item.subtext}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* The Truth Section */}
        <Box
          sx={{
            p: 6,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(123,66,246,0.05) 0%, rgba(255,0,110,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            mb: 8,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              color: '#fff',
              textAlign: 'center',
              mb: 4,
            }}
          >
            They Already Know
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                point: 'Which practices are growing before it shows in any report',
                icon: '📊',
              },
              {
                point: 'The exact message that resonates with each physician',
                icon: '🎯',
              },
              {
                point: 'When competitors are making moves in their territory',
                icon: '👁️',
              },
              {
                point: 'How to reach 1000 prospects while others reach 10',
                icon: '🚀',
              },
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(40, 20, 70, 0.2)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(40, 20, 70, 0.3)',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '2rem', mr: 3 }}>
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.point}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* The Movement */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              color: '#fff',
              mb: 4,
            }}
          >
            This Isn't a Product Launch
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
            }}
          >
            It's a shift in how the best reps operate. 
            <Box component="span" sx={{ display: 'block', mt: 1, color: '#00ffc6' }}>
              And it's happening right now.
            </Box>
          </Typography>

          {/* Visual separator */}
          <Box
            sx={{
              width: 100,
              height: 4,
              background: 'linear-gradient(90deg, #ff006e 0%, #7B42F6 50%, #00ffc6 100%)',
              borderRadius: 2,
              mx: 'auto',
              mb: 6,
              boxShadow: '0 0 20px rgba(0,255,198,0.5)',
            }}
          />
        </Box>

        {/* Closing Statement */}
        <Box
          sx={{
            p: 6,
            borderRadius: '30px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #ff006e, #00ffc6) 1',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              mb: 3,
              background: 'linear-gradient(90deg, #ff006e 0%, #00ffc6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The Revolution Doesn't Wait
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Every day you're not using intelligence automation, 
            someone else is using it to win in your territory.
            <Box component="span" sx={{ display: 'block', mt: 2, fontWeight: 600, color: '#fff' }}>
              The only question is: which side are you on?
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}