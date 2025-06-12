import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Chip, CircularProgress, Divider } from '@mui/material';
import { Check, Star, Bolt, Phone, TrendingUp, AutoAwesome, Security } from '@mui/icons-material';
import { createCheckoutSession } from '../stripeService';

const pricingTiers = [
  {
    id: 'pioneer',
    name: 'PIONEER',
    price: '$149',
    strikePrice: '$199',
    period: '/month',
    annualPrice: '$1,490',
    annualPeriod: '/year',
    description: 'First-Mover Intelligence for Territory Leaders',
    tagline: 'FOUNDING 100 PRICING',
    features: [
      '25 AI Research Briefs: Deep insights before first contact',
      '25 Precision Outreach Links: 73% engagement rate guaranteed',
      'Competitive Intelligence Dashboard: Real-time territory insights',
      'Predictive Analytics: AI reveals opportunity timing',
      '10 Call Analysis Sessions: Transform conversations into intelligence',
      '100 Procedure Market Reports: Live industry data',
      'Mobile Command Center: Lead from anywhere'
    ],
    testimonial: '"Closed 3 new accounts in week one. The ROI is immediate and undeniable." - Jake T., Stryker Rep',
    cta: 'Start Pioneering',
    popular: false,
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    stripeMonthly: 'price_1RRurNGRiAPUZqWuklICsE4P', // Using Professional
    stripeAnnual: 'price_1RWMWjGRiAPUZqWu6YBZY7o4',
  },
  {
    id: 'quantum',
    name: 'QUANTUM',
    price: '$399',
    strikePrice: '$599',
    period: '/month',
    annualPrice: '$3,990',
    annualPeriod: '/year',
    description: 'Exponential Territory Growth Through AI Leverage',
    features: [
      '100 Strategic Intelligence Reports: Uncover hidden opportunities',
      '500 Multi-Channel Outreach Sequences: Synchronized engagement',
      '50 Call Insights Transformed: AI identifies exact decision moments',
      'Territory Heat Mapping: Live tracking of 500+ procedures',
      'Innovation Tracker Module: Target emerging technology adopters',
      '5-Seat Team License: Multiply your force effectiveness',
      'Growth Guarantee: 10% territory expansion or money back'
    ],
    testimonial: '"Jumped from #8 to #1 in my region in 90 days. This changes everything." - Maria S., Allergan Rep',
    cta: 'Unlock Quantum Growth',
    popular: true,
    gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
    savings: 'MOST TRANSFORMATIVE',
    stripeMonthly: 'price_1RWMW3GRiAPUZqWuoTA0eLUC', // Using Growth monthly
    stripeAnnual: 'price_1RRus5GRiAPUZqWup3jk1S8U', // Using Growth annual
  },
  {
    id: 'nexus',
    name: 'NEXUS',
    price: '$999',
    strikePrice: '$1,499',
    period: '/month',
    annualPrice: '$9,990',
    annualPeriod: '/year',
    description: 'Complete Market Command Center',
    features: [
      '∞ Unlimited Everything: Research, deploy, analyze without limits',
      'Custom AI Brain: Trained on YOUR products, methods, and wins',
      'Full Communication Suite: Every interaction becomes intelligence',
      'Market Movement Radar: Know mergers & expansions first',
      'Stealth Mode: Your competitive intelligence stays private',
      'Executive Access: Monthly strategy sessions with founder',
      'White-Label Platform: Present as your proprietary system',
      'API Integration Hub: Connect your entire tech stack'
    ],
    testimonial: '"We captured 47% market share in 6 months. Competitors have no idea how." - Regional Director, Fortune 500',
    cta: 'Activate Your Nexus',
    popular: false,
    gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
    highlight: true,
    savings: 'COMPLETE CONTROL',
    stripeMonthly: 'price_1RRushGRiAPUZqWuIvqueK7h', // Using Enterprise
    stripeAnnual: 'price_1RWMT4GRiAPUZqWuqiNhkZfw',
  }
];

// Add-on modules
const specializedModules = [
  {
    id: 'aligners',
    name: 'Aligner Analytics Pro',
    price: '$99/month',
    features: [
      'Track practices transitioning from traditional orthodontics',
      'Identify untapped aligner opportunities',
      'Competitive pricing intelligence by region'
    ],
    icon: '🦷'
  },
  {
    id: 'aesthetics',
    name: 'Aesthetic Intelligence Suite',
    price: '$149/month',
    features: [
      'Injectable usage patterns by practice type',
      'Treatment frequency predictions',
      'Price sensitivity analysis by demographic'
    ],
    icon: '💉'
  },
  {
    id: 'surgical',
    name: 'Surgical Innovation Tracker',
    price: '$199/month',
    features: [
      'OR scheduling pattern analysis',
      'Referral network mapping',
      'Reimbursement trend predictions'
    ],
    icon: '🏥'
  }
];

// Intelligence packs
const intelligencePacks = [
  {
    type: 'Precision Outreach Links',
    packs: [
      { name: 'Pay-per-link', price: '$2 each', description: 'After first 25 free' },
      { name: 'Starter Pack', price: '100 for $150', description: 'Save 25%' },
      { name: 'Scale Pack', price: '1,000 for $1,000', description: 'Save 50%' }
    ]
  },
  {
    type: 'Multi-Channel Sequences',
    packs: [
      { name: 'Single Deploy', price: '$1 each', description: 'After monthly limit' },
      { name: 'Burst Pack', price: '100 for $75', description: '' },
      { name: 'Territory Flood', price: '1,000 for $500', description: '' }
    ]
  },
  {
    type: 'AI Research Briefs',
    packs: [
      { name: '20-Pack', price: '$40', description: 'Deep-dive intelligence' },
      { name: '100-Pack', price: '$150', description: '' },
      { name: 'Unlimited', price: 'Upgrade your plan', description: '' }
    ]
  }
];

export default function PricingSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [loadingTier, setLoadingTier] = useState(null);

  const handleSubscribe = async (tier) => {
    setLoadingTier(tier.id);
    
    // Track subscription attempt with Google Analytics
    if (window.gtag) {
      window.gtag('event', 'subscription_attempt', {
        event_category: 'engagement',
        event_label: `pricing_${tier.id}_${billingPeriod}`,
        value: billingPeriod === 'annual' ? 
          parseInt(tier.annualPrice.replace(/[^0-9]/g, '')) : 
          parseInt(tier.price.replace(/[^0-9]/g, ''))
      });
    }
    
    try {
      const priceId = billingPeriod === 'annual' ? tier.stripeAnnual : tier.stripeMonthly;
      
      if (priceId) {
        await createCheckoutSession(priceId);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setLoadingTier(null);
    }
  };

  return (
    <Box
      id="pricing"
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
          width: '80vw',
          height: '80vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,198,0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
          top: '50%',
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
            label="🚀 THE INDUSTRY'S FIRST AI-POWERED INTELLIGENCE PLATFORM"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(0,212,255,0.1)',
              color: '#00d4ff',
              border: '1px solid rgba(0,212,255,0.3)',
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              py: 2.5,
              px: 2,
            }}
          />
          
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ffc6 50%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(0,212,255,0.3)',
            }}
          >
            FOUNDING 100 PRICING
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
              mb: 4,
            }}
          >
            Limited time offer for the first 100 medical pioneers ready to transform their territory. 
            Lock in lifetime founder pricing before it's gone forever.
          </Typography>

          {/* Billing Period Toggle */}
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                backgroundColor: 'rgba(24,24,43,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.1)',
                p: 0.5,
              }}
            >
              <Button
                variant={billingPeriod === 'monthly' ? 'contained' : 'text'}
                onClick={() => setBillingPeriod('monthly')}
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: billingPeriod === 'monthly' 
                    ? 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)'
                    : 'transparent',
                  color: billingPeriod === 'monthly' ? '#fff' : 'rgba(255,255,255,0.7)',
                  '&:hover': {
                    backgroundColor: billingPeriod === 'monthly' 
                      ? 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)'
                      : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === 'annual' ? 'contained' : 'text'}
                onClick={() => setBillingPeriod('annual')}
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: billingPeriod === 'annual' 
                    ? 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)'
                    : 'transparent',
                  color: billingPeriod === 'annual' ? '#fff' : 'rgba(255,255,255,0.7)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: billingPeriod === 'annual' 
                      ? 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)'
                      : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Annual
                <Chip
                  label="Save up to 20%"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -10,
                    backgroundColor: '#00ffc6',
                    color: '#0a0a0a',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    height: 16,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Pricing Grid */}
        <Grid container spacing={4} justifyContent="center">
          {pricingTiers.map((tier) => {
            const isHovered = hoveredTier === tier.id;
            const isPopular = tier.popular;
            const isHighlight = tier.highlight;
            
            return (
              <Grid item xs={12} md={4} key={tier.id}>
                <Box
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'visible',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isPopular 
                      ? (isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(-8px) scale(1.02)')
                      : (isHovered ? 'translateY(-8px)' : 'translateY(0)'),
                  }}
                >
                  {/* Popular/Elite badge */}
                  {(isPopular || isHighlight) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        icon={isPopular ? <Star sx={{ fontSize: 16 }} /> : <AutoAwesome sx={{ fontSize: 16 }} />}
                        label={tier.savings}
                        sx={{
                          backgroundColor: isPopular ? '#00ffc6' : '#7B42F6',
                          color: isPopular ? '#0a0a0a' : '#fff',
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em',
                          py: 2,
                          px: 1,
                          boxShadow: isPopular 
                            ? '0 4px 20px rgba(0,255,198,0.4)'
                            : '0 4px 20px rgba(123,66,246,0.4)',
                        }}
                      />
                    </Box>
                  )}

                  {/* Tagline badge */}
                  {tier.tagline && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: isPopular || isHighlight ? 20 : -16,
                        left: 20,
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        label={tier.tagline}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(0,212,255,0.1)',
                          color: '#00d4ff',
                          border: '1px solid rgba(0,212,255,0.3)',
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          height: 20,
                        }}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      height: '100%',
                      position: 'relative',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '24px',
                        padding: isPopular ? '2px' : '1px',
                        background: isPopular 
                          ? tier.gradient 
                          : (isHovered ? tier.gradient : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'),
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        transition: 'all 0.4s ease',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(24,24,43,0.9)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Glow effect */}
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '150%',
                          height: '150%',
                          borderRadius: '50%',
                          background: tier.gradient,
                          opacity: isHovered ? 0.15 : 0.08,
                          filter: 'blur(80px)',
                          top: '-25%',
                          left: '-25%',
                          transition: 'opacity 0.4s ease',
                        }}
                      />

                      {/* Content */}
                      <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Tier name */}
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            fontWeight: 800,
                            fontSize: '1.8rem',
                            color: '#fff',
                            mb: 1,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {tier.name}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: '1.1rem',
                            lineHeight: 1.4,
                            mb: 3,
                            fontStyle: 'italic',
                          }}
                        >
                          "{tier.description}"
                        </Typography>

                        {/* Price */}
                        <Box sx={{ mb: 4 }}>
                          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                            <Typography
                              component="span"
                              sx={{
                                fontFamily: "'Space Grotesk', Arial, sans-serif",
                                fontWeight: 800,
                                fontSize: { xs: '3rem', md: '3.5rem' },
                                color: '#fff',
                                lineHeight: 1,
                              }}
                            >
                              {billingPeriod === 'annual' ? tier.annualPrice : tier.price}
                            </Typography>
                            {tier.strikePrice && (
                              <Typography
                                component="span"
                                sx={{
                                  fontFamily: "'DM Sans', Arial, sans-serif",
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '1.5rem',
                                  textDecoration: 'line-through',
                                }}
                              >
                                {tier.strikePrice}
                              </Typography>
                            )}
                          </Box>
                          <Typography
                            component="span"
                            sx={{
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: '1.1rem',
                            }}
                          >
                            {billingPeriod === 'annual' ? tier.annualPeriod : tier.period}
                          </Typography>
                        </Box>

                        {/* Features */}
                        <Box sx={{ mb: 3, flex: 1 }}>
                          {tier.features.map((feature, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                mb: 2,
                                opacity: isHovered ? 1 : 0.85,
                                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                transition: `all 0.3s ease ${idx * 0.03}s`,
                              }}
                            >
                              <Check 
                                sx={{ 
                                  fontSize: 18, 
                                  color: '#00ffc6',
                                  mr: 1.5,
                                  mt: 0.2,
                                  flexShrink: 0,
                                }} 
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "'DM Sans', Arial, sans-serif",
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: '0.95rem',
                                  lineHeight: 1.4,
                                }}
                              >
                                <strong>{feature.split(':')[0]}:</strong>
                                {feature.split(':')[1]}
                              </Typography>
                            </Box>
                          ))}
                        </Box>

                        {/* Testimonial */}
                        {tier.testimonial && (
                          <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "'DM Sans', Arial, sans-serif",
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.85rem',
                                fontStyle: 'italic',
                                lineHeight: 1.5,
                              }}
                            >
                              {tier.testimonial}
                            </Typography>
                          </Box>
                        )}

                        {/* CTA Button */}
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleSubscribe(tier)}
                          disabled={loadingTier === tier.id}
                          sx={{
                            py: 2,
                            borderRadius: '12px',
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            letterSpacing: '0.02em',
                            background: tier.gradient,
                            color: '#fff',
                            boxShadow: '0 4px 20px rgba(0,255,198,0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: tier.gradient,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 30px rgba(0,255,198,0.4)',
                            },
                            '&:disabled': {
                              opacity: 0.7,
                              cursor: 'not-allowed',
                            },
                          }}
                        >
                          {loadingTier === tier.id ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress size={20} sx={{ color: 'inherit' }} />
                              Processing...
                            </Box>
                          ) : (
                            tier.cta
                          )}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Specialized Intelligence Modules */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            🎯 SPECIALIZED INTELLIGENCE MODULES
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              mb: 6,
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Precision-engineered analytics for specific market segments
          </Typography>

          <Grid container spacing={3}>
            {specializedModules.map((module) => (
              <Grid item xs={12} md={4} key={module.id}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(24,24,43,0.6)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(0,255,198,0.3)',
                      backgroundColor: 'rgba(24,24,43,0.8)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ mr: 2 }}>{module.icon}</Typography>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          color: '#fff',
                          mb: 0.5,
                        }}
                      >
                        {module.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: '#00ffc6',
                          fontWeight: 600,
                        }}
                      >
                        {module.price}
                      </Typography>
                    </Box>
                  </Box>
                  {module.features.map((feature, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.9rem',
                        mb: 1,
                        pl: 2,
                        position: 'relative',
                        '&::before': {
                          content: '"→"',
                          position: 'absolute',
                          left: 0,
                          color: 'rgba(0,255,198,0.5)',
                        },
                      }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Intelligence Packs */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            💊 INTELLIGENCE EXPANSION PACKS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              mb: 6,
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Scale your insights when monthly limits aren't enough
          </Typography>

          <Grid container spacing={4}>
            {intelligencePacks.map((category) => (
              <Grid item xs={12} md={4} key={category.type}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 700,
                      color: '#00ffc6',
                      mb: 3,
                      textAlign: 'center',
                    }}
                  >
                    {category.type}
                  </Typography>
                  {category.packs.map((pack, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backgroundColor: 'rgba(24,24,43,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'rgba(0,255,198,0.3)',
                          backgroundColor: 'rgba(24,24,43,0.6)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: '#fff',
                            fontWeight: 600,
                          }}
                        >
                          {pack.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            color: '#00ffc6',
                            fontWeight: 700,
                          }}
                        >
                          {pack.price}
                        </Typography>
                      </Box>
                      {pack.description && (
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.85rem',
                            mt: 0.5,
                          }}
                        >
                          {pack.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Founding 100 Advantage */}
        <Box sx={{ mt: 10, p: 4, borderRadius: '24px', background: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(123,66,246,0.1) 100%)', border: '1px solid rgba(0,212,255,0.3)' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 3,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            🏆 THE FOUNDING 100 ADVANTAGE
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 48, color: '#00ffc6', mb: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#fff', mb: 1 }}>
                  Lifetime Pricing
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'DM Sans', Arial, sans-serif", color: 'rgba(255,255,255,0.7)' }}>
                  Never pay increases
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Star sx={{ fontSize: 48, color: '#00d4ff', mb: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#fff', mb: 1 }}>
                  Pioneer Badge
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'DM Sans', Arial, sans-serif", color: 'rgba(255,255,255,0.7)' }}>
                  Show you innovated first
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Phone sx={{ fontSize: 48, color: '#7B42F6', mb: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#fff', mb: 1 }}>
                  Direct CEO Line
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'DM Sans', Arial, sans-serif", color: 'rgba(255,255,255,0.7)' }}>
                  My personal number
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <AutoAwesome sx={{ fontSize: 48, color: '#00ffc6', mb: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#fff', mb: 1 }}>
                  10% Revenue Share
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'DM Sans', Arial, sans-serif", color: 'rgba(255,255,255,0.7)' }}>
                  Forever on all referrals
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Performance Guarantee */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Security sx={{ fontSize: 64, color: '#00ffc6', mb: 2 }} />
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
              color: '#fff',
            }}
          >
            🔥 PERFORMANCE GUARANTEE
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1.3rem',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            2X your close rate in 90 days or we work for FREE until you do
          </Typography>
          <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', borderRadius: '16px', backgroundColor: 'rgba(0,255,198,0.05)', border: '1px solid rgba(0,255,198,0.2)' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
              }}
            >
              "In 15 years of med device sales, I've never seen technology this transformative. It's an unfair advantage."
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.6)',
                mt: 2,
              }}
            >
              - Anonymous VP of Sales, Top 5 Device Company
            </Typography>
          </Box>
        </Box>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ffc6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ready to transform your territory with AI-powered intelligence?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'start_transformation', {
                  event_category: 'engagement',
                  event_label: 'pricing_section_bottom',
                  value: 1
                });
              }
              window.location.href = '#pricing';
            }}
            sx={{
              px: 6,
              py: 2.5,
              mt: 3,
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ffc6 100%)',
              color: '#fff',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(0,212,255,0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(0,212,255,0.5)',
              },
            }}
          >
            START YOUR TRANSFORMATION TODAY
          </Button>
        </Box>

        {/* Trust indicators */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.9rem',
                }}
              >
                🔒 Bank-level security & HIPAA compliant
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.9rem',
                }}
              >
                ⚡ Setup in 5 minutes, results in 24 hours
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.9rem',
                }}
              >
                🎯 Built by industry veterans who understand your world
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}