import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Tab, Tabs, Card, Chip, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import BrushIcon from '@mui/icons-material/Brush';
import HubIcon from '@mui/icons-material/Hub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: 'rgba(11, 11, 32, 0.5)',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#00E5FF',
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.6)',
  '&.Mui-selected': {
    color: '#00E5FF',
  },
  '&:hover': {
    color: '#ffffff',
  },
}));

const PillarCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.3s ease',
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(0, 229, 255, 0.1)',
  border: '1px solid rgba(0, 229, 255, 0.3)',
  color: '#00E5FF',
  fontWeight: 500,
  margin: theme.spacing(0.5),
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );
};

const ThePlatformSection = () => {
  const [tabValue, setTabValue] = useState(0);

  const pillars = [
    {
      id: 'insights',
      icon: <InsightsIcon sx={{ fontSize: 40 }} />,
      title: 'Market Insights',
      tagline: 'The Foundation',
      description: 'Real-time market intelligence across 500+ procedures',
      color: '#00E5FF',
      features: [
        'Growth trajectories for dental, aesthetic & regenerative procedures',
        'Competitive landscape analysis with pricing intelligence',
        'Territory heat maps and opportunity scoring',
        'Physician adoption patterns and referral networks',
        'Real-time reimbursement updates and coding changes'
      ],
      chips: ['500+ Procedures', 'Real-Time Data', 'Predictive Analytics']
    },
    {
      id: 'canvas',
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      title: 'Canvas',
      tagline: 'The Intelligence Layer',
      description: 'AI-powered sales intelligence that adapts to every conversation',
      color: '#5B3CFF',
      features: [
        'Intelligent doctor search with auto-enhancement from 3 letters',
        'AI-generated conversation briefs in seconds',
        'Dynamic sales collateral that adapts to each prospect',
        'Instant deployment through secure activation links',
        'Zero setup required—activate and go'
      ],
      chips: ['Instant Intelligence', 'No Setup', 'Auto-Enhancement']
    },
    {
      id: 'os',
      icon: <HubIcon sx={{ fontSize: 40 }} />,
      title: 'RepSphere OS',
      tagline: 'The Execution Engine',
      description: 'Where intelligence meets action with 150+ psychological indicators',
      color: '#FF3B30',
      features: [
        'Linguistics analyzer for perfect messaging',
        'Conversation tracking with AI learning',
        'Automated follow-up sequencing',
        'Relationship mapping and influence scoring',
        'Performance analytics with predictive insights'
      ],
      chips: ['150+ Indicators', 'AI Learning', 'Predictive Analytics']
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
              background: 'linear-gradient(135deg, #ffffff 0%, #00E5FF 50%, #5B3CFF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Three Pillars of Intelligence
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            A complete intelligence operating system that transforms how elite medical sales teams operate
          </Typography>
        </Box>

        {/* Desktop View - Three Columns */}
        <Grid container spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, mb: 8 }}>
          {pillars.map((pillar, index) => (
            <Grid item md={4} key={pillar.id}>
              <PillarCard>
                <Box sx={{ color: pillar.color, mb: 2 }}>
                  {pillar.icon}
                </Box>
                
                <Typography variant="overline" sx={{ color: pillar.color, fontWeight: 600 }}>
                  {pillar.tagline}
                </Typography>
                
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ffffff', mb: 2 }}>
                  {pillar.title}
                </Typography>
                
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  {pillar.description}
                </Typography>
                
                <Box mb={3}>
                  {pillar.chips.map((chip) => (
                    <FeatureChip key={chip} label={chip} size="small" />
                  ))}
                </Box>
                
                <List dense>
                  {pillar.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: pillar.color }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ 
                          sx: { fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' } 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </PillarCard>
            </Grid>
          ))}
        </Grid>

        {/* Mobile View - Tabs */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <StyledTabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
            <StyledTab label="Market Insights" />
            <StyledTab label="Canvas" />
            <StyledTab label="RepSphere OS" />
          </StyledTabs>
          
          {pillars.map((pillar, index) => (
            <TabPanel key={pillar.id} value={tabValue} index={index}>
              <PillarCard>
                <Box sx={{ color: pillar.color, mb: 2 }}>
                  {pillar.icon}
                </Box>
                
                <Typography variant="overline" sx={{ color: pillar.color, fontWeight: 600 }}>
                  {pillar.tagline}
                </Typography>
                
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ffffff', mb: 2 }}>
                  {pillar.title}
                </Typography>
                
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  {pillar.description}
                </Typography>
                
                <Box mb={3}>
                  {pillar.chips.map((chip) => (
                    <FeatureChip key={chip} label={chip} size="small" />
                  ))}
                </Box>
                
                <List dense>
                  {pillar.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: pillar.color }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ 
                          sx: { fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' } 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </PillarCard>
            </TabPanel>
          ))}
        </Box>

        {/* Integration Message */}
        <Box mt={8} textAlign="center">
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <SpeedIcon sx={{ fontSize: 40, color: '#00E5FF' }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  0
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Setup Time<br/>Required
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <AutoGraphIcon sx={{ fontSize: 40, color: '#5B3CFF' }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  300+
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  AI Models<br/>Working
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <ConnectWithoutContactIcon sx={{ fontSize: 40, color: '#FF3B30' }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  15
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Years of<br/>Intelligence
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Bottom CTA */}
        <Box mt={6} textAlign="center">
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            "Your CRM stores data. Your Intelligence OS creates advantage."
          </Typography>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default ThePlatformSection;