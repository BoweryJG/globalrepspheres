import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Chip, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BusinessIcon from '@mui/icons-material/Business';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  background: 'linear-gradient(180deg, rgba(11, 11, 32, 0.5) 0%, rgba(11, 11, 32, 0.8) 100%)',
}));

const PricingCard = styled(Card)(({ theme, featured }) => ({
  background: featured 
    ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(91, 60, 255, 0.1) 100%)'
    : 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  border: featured 
    ? '2px solid rgba(0, 229, 255, 0.5)'
    : '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: featured
      ? '0 20px 40px rgba(0, 229, 255, 0.3)'
      : '0 20px 40px rgba(255, 255, 255, 0.1)',
  },
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 800,
  lineHeight: 1,
  color: '#ffffff',
  '& span': {
    fontSize: '1.2rem',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.6)',
  },
}));

const CTAButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 30,
  padding: '12px 35px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  width: '100%',
  ...(variant === 'gradient' ? {
    background: 'linear-gradient(45deg, #00E5FF 30%, #5B3CFF 90%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(45deg, #00E5FF 20%, #5B3CFF 100%)',
      boxShadow: '0 5px 25px rgba(0, 229, 255, 0.4)',
    },
  } : {
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    '&:hover': {
      border: '2px solid rgba(255, 255, 255, 0.5)',
      background: 'rgba(255, 255, 255, 0.05)',
    },
  }),
}));

const SavingsBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'linear-gradient(45deg, #FF3B30 30%, #FF6B6B 90%)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.9rem',
  padding: '5px 10px',
}));

const PricingSection = () => {
  const tiers = [
    {
      name: 'Explorer',
      tagline: 'Your Secret Weapon Starts Here',
      price: '$49',
      period: 'per month',
      icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#00E5FF' }} />,
      features: [
        'Market X-Ray Vision: Track growth on 100+ hot procedures',
        '5 AI Power Plays that get callbacks',
        'Weekly Intelligence Briefings before competition',
        'Explorer Elite Status in private community',
        'Basic category insights & market trends',
        'Mobile app access',
      ],
      cta: 'Start Dominating',
      ctaVariant: 'outlined',
      featured: false,
    },
    {
      name: 'Professional',
      tagline: 'Turn Territory Management Into Territory Domination',
      price: '$149',
      period: 'per month',
      icon: <StarIcon sx={{ fontSize: 40, color: '#5B3CFF' }} />,
      features: [
        'Complete Market Intelligence: 500+ procedures with surgeon insights',
        '50 AI Sales Conversations worth $10K+ each',
        '10 Conversation Forensics revealing why you win/lose',
        'Real-time alerts on expansions & competitor issues',
        'Fortune 500 level reports on demand',
        'VIP Support: We answer before your second ring',
        'Professional Badge + priority everything',
      ],
      savings: 'MOST POPULAR',
      cta: 'Claim Your Territory',
      ctaVariant: 'gradient',
      featured: true,
    },
    {
      name: 'Growth',
      tagline: 'Scale From Rep to Regional Force',
      price: '$349',
      period: 'per month',
      icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: '#FF6B6B' }} />,
      features: [
        'UNLIMITED AI Brain Power for brilliant talking points',
        '50 Call Transformations into masterclasses',
        '3 Custom Territory Intelligence Reports monthly',
        'Wolf Pack Mode: Share wins with 3 team members',
        'API Weapon: Connect CRM & automate dominance',
        'Quarterly War Room with $5M+ producers',
        'Growth Badge + quarterly strategy calls',
      ],
      cta: 'Build Your Empire',
      ctaVariant: 'outlined',
      featured: false,
    },
    {
      name: 'Enterprise',
      tagline: 'Build Your Sales Empire',
      price: '$749',
      period: 'per month',
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#7B42F6' }} />,
      features: [
        'UNLIMITED Everything: Every call, every brief, every opportunity',
        '5 AI Automation Workflows running while you golf',
        'Custom AI Training on your secret sauce',
        '10-Seat Strike Team armament',
        'White-Label Reports that stun C-suite',
        'Monthly Strategy Summit with enterprise team',
        'API Priority Access for custom integrations',
        'Enterprise Badge + dedicated success line',
      ],
      savings: 'Save $1,498/year',
      cta: 'Command The Market',
      ctaVariant: 'outlined',
      featured: false,
    },
    {
      name: 'Elite',
      tagline: 'For Those Who Refuse To Lose',
      price: '$1,499',
      period: 'per month',
      icon: <StarIcon sx={{ fontSize: 40, color: '#FF006E' }} />,
      features: [
        'INFINITE POWER: Every limit removed',
        'Your AI Army trained on YOUR wins 24/7',
        'Done-For-You reports while you close',
        'War General who personally closed $50M+',
        'Weekly Battle Planning sessions',
        'Unlimited team member access',
        'First access to game-breaking features',
        'Elite Inner Circle quarterly meetups',
        'Custom everything: AI, reports, strategies',
      ],
      savings: 'Save $2,998/year',
      cta: 'Join The Elite',
      ctaVariant: 'gradient',
      featured: false,
    },
  ];

  return (
    <SectionContainer id="pricing">
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box textAlign="center" mb={8}>
          <Chip 
            icon={<LocalOfferIcon />} 
            label="TRANSPARENT PRICING" 
            sx={{ 
              mb: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#00E5FF',
              fontWeight: 600,
            }} 
          />
          
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
            Choose Your Competitive Advantage
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Start free. Scale when ready. Cancel anytime.
            <br />
            <strong style={{ color: '#00E5FF' }}>No setup fees. No hidden costs.</strong>
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} alignItems="stretch">
          {tiers.map((tier, index) => (
            <Grid item xs={12} md={4} key={tier.name}>
              <PricingCard featured={tier.featured}>
                {tier.savings && <SavingsBadge label={tier.savings} />}
                
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <Box mb={3}>
                    {tier.icon}
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#ffffff', mt: 2 }}>
                      {tier.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                      {tier.tagline}
                    </Typography>
                  </Box>

                  {/* Price */}
                  <Box mb={4}>
                    <PriceTag>
                      {tier.price}
                      <span> {tier.period}</span>
                    </PriceTag>
                  </Box>

                  {/* Features */}
                  <List dense sx={{ flex: 1 }}>
                    {tier.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckIcon sx={{ fontSize: 20, color: tier.featured ? '#00E5FF' : 'rgba(255, 255, 255, 0.6)' }} />
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

                  {/* Limitations for Starter */}
                  {tier.limitations && (
                    <Box mt={2} mb={3}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Limitations:
                      </Typography>
                      {tier.limitations.map((limit, idx) => (
                        <Typography key={idx} variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          • {limit}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* CTA */}
                  <Box mt={3}>
                    <CTAButton variant={tier.ctaVariant}>
                      {tier.cta}
                    </CTAButton>
                  </Box>
                </CardContent>
              </PricingCard>
            </Grid>
          ))}
        </Grid>

        {/* Value Props */}
        <Box mt={8}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={3} textAlign="center">
              <AutoAwesomeIcon sx={{ fontSize: 40, color: '#00E5FF', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                Start in Minutes
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                Zero setup required. Instant activation through secure links.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3} textAlign="center">
              <AutoAwesomeIcon sx={{ fontSize: 40, color: '#5B3CFF', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                No Contracts
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                Month-to-month billing. Upgrade, downgrade, or cancel anytime.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3} textAlign="center">
              <AutoAwesomeIcon sx={{ fontSize: 40, color: '#FF3B30', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                ROI Guarantee
              </Typography>
              <Typography sx({ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                See results in 30 days or get your money back. No questions asked.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* FAQ Link */}
        <Box mt={6} textAlign="center">
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Questions about pricing? <Button sx={{ color: '#00E5FF', textTransform: 'none' }}>View pricing FAQ</Button>
          </Typography>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default PricingSection;