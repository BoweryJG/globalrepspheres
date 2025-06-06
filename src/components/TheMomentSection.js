import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: 'linear-gradient(180deg, rgba(11, 11, 32, 0) 0%, rgba(11, 11, 32, 0.5) 50%, rgba(11, 11, 32, 0) 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    transform: 'translateY(-5px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(91, 60, 255, 0.2) 100%)',
  border: '1px solid rgba(0, 229, 255, 0.3)',
  marginBottom: theme.spacing(2),
}));

const TheMomentSection = () => {
  const principles = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 30, color: '#00E5FF' }} />,
      title: "Quality Over Quantity",
      description: "The best reps aren't sending more emails—they're asking better questions. Intelligence amplifies intuition."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 30, color: '#5B3CFF' }} />,
      title: "Evolution, Not Revolution",
      description: "This isn't about replacing reps—it's about amplifying excellence. Your relationships + our intelligence = unstoppable."
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 30, color: '#00E5FF' }} />,
      title: "The Intelligence Gap",
      description: "While others chase yesterday's playbook, leaders leverage tomorrow's intelligence. The gap widens daily."
    }
  ];

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #00E5FF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sales Intelligence Has Evolved. Have You?
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            The future of medical sales isn't about artificial replacing authentic—
            it's about intelligence amplifying excellence.
          </Typography>
        </Box>

        {/* The Choice */}
        <Box mb={8} textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 600,
              mb: 4,
              color: '#ffffff',
            }}
          >
            You Have a Choice to Make
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 2,
                  background: 'rgba(255, 59, 48, 0.1)',
                  border: '1px solid rgba(255, 59, 48, 0.3)',
                }}
              >
                <Typography variant="h5" sx={{ color: '#FF3B30', mb: 2, fontWeight: 600 }}>
                  Continue the Old Way
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  • Generic email blasts<br/>
                  • Outdated call lists<br/>
                  • Guessing at objections<br/>
                  • Hoping for the best<br/>
                  • Falling behind daily
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 2,
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                }}
              >
                <Typography variant="h5" sx={{ color: '#00E5FF', mb: 2, fontWeight: 600 }}>
                  Embrace Intelligence
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  • Precision-targeted outreach<br/>
                  • Real-time verified contacts<br/>
                  • AI-powered conversation prep<br/>
                  • Data-driven confidence<br/>
                  • Leading the market
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Three Principles */}
        <Grid container spacing={4}>
          {principles.map((principle, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <IconWrapper>
                    {principle.icon}
                  </IconWrapper>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: '#ffffff',
                    }}
                  >
                    {principle.title}
                  </Typography>
                  
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.6,
                    }}
                  >
                    {principle.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Unifying Message */}
        <Box mt={8} textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.3rem', md: '1.8rem' },
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            "You bring the relationships. We bring the intelligence. 
            Together, we transform healthcare conversations."
          </Typography>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default TheMomentSection;