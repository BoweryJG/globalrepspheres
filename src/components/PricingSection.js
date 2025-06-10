import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import { Check, Star, Bolt, Phone } from '@mui/icons-material';
import { createCheckoutSession } from '../stripeService';

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$297',
    period: '/month',
    description: 'Perfect for individual reps ready to level up',
    features: [
      'Market Insights (Basic)',
      '25 AI Workspace reports/month',
      '10 Conversation analyses/month',
      'Email support',
      'Mobile app access'
    ],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    stripeId: 'price_starter_monthly',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$797',
    period: '/month',
    description: 'For serious closers who want every advantage',
    features: [
      'Full Market Insights with real-time data',
      '100 AI Workspace reports/month',
      'Unlimited Conversation Analysis',
      'Basic Twilio integration',
      'Priority support',
      'Custom report templates'
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
    savings: 'Most Popular',
    stripeId: 'price_professional_monthly',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,297',
    period: '/month',
    description: 'Scale your territory with AI automation',
    features: [
      'Everything in Professional',
      'Full Twilio automation platform',
      'Call transcription & AI insights',
      'Professional phone line',
      'Post-call automated campaigns',
      'Team collaboration (up to 10 users)'
    ],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    stripeId: 'price_growth_monthly',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$1,997',
    period: '/month',
    description: 'Territory management at enterprise level',
    features: [
      'Everything in Growth',
      'Advanced psychological indicators',
      'Custom AI prompt configuration',
      'White-label options',
      'Dedicated account manager',
      'Team collaboration (up to 25 users)'
    ],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
    stripeId: 'price_scale_monthly',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams that refuse to lose',
    features: [
      'Everything in Scale',
      'Custom integrations',
      'On-premise deployment options',
      'SLA guarantee',
      'Advanced analytics dashboard',
      'Unlimited users'
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
    stripeId: null,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$2,997',
    period: '/month',
    description: 'Your personal AI-powered sales acceleration team',
    features: [
      'Everything in Enterprise',
      'Weekly 1:1 strategy sessions',
      'Custom territory analysis',
      'Personal brand development',
      'Exclusive mastermind access',
      'Direct founder access'
    ],
    cta: 'Apply Now',
    popular: false,
    gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
    highlight: true,
    stripeId: 'price_elite_monthly',
  }
];

export default function PricingSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const handleSubscribe = async (tier) => {
    if (tier.stripeId) {
      await createCheckoutSession(tier.stripeId);
    } else if (tier.id === 'enterprise') {
      window.location.href = '/contact-sales';
    } else if (tier.id === 'elite') {
      window.location.href = '/elite-application';
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
            label="NEW: 6 Complete Tiers Available"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(0,255,198,0.1)',
              color: '#00ffc6',
              border: '1px solid rgba(0,255,198,0.3)',
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 500,
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
              background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 50%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(0,255,198,0.2)',
            }}
          >
            Choose Your Competitive Edge
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Every day without RepSpheres is deals lost to competitors with better intel. 
            Join 500+ top performers already dominating their markets.
          </Typography>

          {/* ROI Calculator Link */}
          <Box sx={{ mb: 6 }}>
            <Button
              variant="text"
              sx={{
                color: '#00ffc6',
                fontFamily: "'DM Sans', Arial, sans-serif",
                fontWeight: 500,
                fontSize: '1rem',
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'rgba(0,255,198,0.05)',
                },
              }}
            >
              Calculate Your ROI →
            </Button>
          </Box>
        </Box>

        {/* Pricing Grid */}
        <Grid container spacing={3} alignItems="stretch">
          {pricingTiers.map((tier) => {
            const isHovered = hoveredTier === tier.id;
            const isPopular = tier.popular;
            const isHighlight = tier.highlight;
            
            return (
              <Grid item xs={12} sm={6} lg={4} xl={2} key={tier.id}>
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
                  {/* Popular badge */}
                  {isPopular && (
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
                        icon={<Star sx={{ fontSize: 16 }} />}
                        label="MOST POPULAR"
                        sx={{
                          backgroundColor: '#00ffc6',
                          color: '#0a0a0a',
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em',
                          py: 2,
                          px: 1,
                          boxShadow: '0 4px 20px rgba(0,255,198,0.4)',
                        }}
                      />
                    </Box>
                  )}

                  {/* Elite badge */}
                  {isHighlight && (
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
                        icon={<Phone sx={{ fontSize: 16 }} />}
                        label="ELITE ACCESS"
                        sx={{
                          backgroundColor: '#ff006e',
                          color: '#fff',
                          fontFamily: "'Space Grotesk', Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em',
                          py: 2,
                          px: 1,
                          boxShadow: '0 4px 20px rgba(255,0,110,0.4)',
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
                          variant="h5"
                          sx={{
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            fontWeight: 600,
                            fontSize: '1.3rem',
                            color: 'rgba(255,255,255,0.7)',
                            mb: 2,
                          }}
                        >
                          {tier.name}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            component="span"
                            sx={{
                              fontFamily: "'Space Grotesk', Arial, sans-serif",
                              fontWeight: 800,
                              fontSize: { xs: '2.5rem', md: '3rem' },
                              color: '#fff',
                              lineHeight: 1,
                            }}
                          >
                            {tier.price}
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: '1.1rem',
                              ml: 0.5,
                            }}
                          >
                            {tier.period}
                          </Typography>
                        </Box>

                        {/* Savings badge */}
                        {tier.savings && (
                          <Chip
                            label={tier.savings}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(0,255,198,0.1)',
                              color: '#00ffc6',
                              border: '1px solid rgba(0,255,198,0.3)',
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              fontSize: '0.8rem',
                              mb: 2,
                              width: 'fit-content',
                            }}
                          />
                        )}

                        {/* Description */}
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1rem',
                            lineHeight: 1.5,
                            mb: 3,
                          }}
                        >
                          {tier.description}
                        </Typography>

                        {/* Features */}
                        <Box sx={{ mb: 3, flex: 1 }}>
                          {tier.features.map((feature, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                mb: 1.5,
                                opacity: isHovered ? 1 : 0.85,
                                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                transition: `all 0.3s ease ${idx * 0.03}s`,
                              }}
                            >
                              <Check 
                                sx={{ 
                                  fontSize: 18, 
                                  color: isPopular ? '#00ffc6' : 'rgba(255,255,255,0.5)',
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
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                        </Box>

                        {/* CTA Button */}
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleSubscribe(tier)}
                          sx={{
                            py: 2,
                            borderRadius: '12px',
                            fontFamily: "'Space Grotesk', Arial, sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            letterSpacing: '0.02em',
                            background: (isPopular || isHighlight) ? tier.gradient : 'rgba(255,255,255,0.1)',
                            color: (isPopular || isHighlight) ? '#fff' : 'rgba(255,255,255,0.9)',
                            border: (isPopular || isHighlight) ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            boxShadow: (isPopular || isHighlight) ? '0 4px 20px rgba(0,255,198,0.3)' : 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: (isPopular || isHighlight)
                                ? tier.gradient
                                : 'rgba(255,255,255,0.15)',
                              transform: 'translateY(-2px)',
                              boxShadow: (isPopular || isHighlight)
                                ? '0 8px 30px rgba(0,255,198,0.4)'
                                : '0 4px 20px rgba(255,255,255,0.1)',
                            },
                          }}
                        >
                          {tier.cta}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>


        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 2,
              color: '#fff',
            }}
          >
            Still Have Questions?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              mb: 4,
            }}
          >
            See RepSpheres in action with a personalized demo
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 5,
              py: 2,
              borderRadius: '30px',
              border: '2px solid rgba(0,255,198,0.5)',
              color: '#00ffc6',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '1.1rem',
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '2px solid #00ffc6',
                backgroundColor: 'rgba(0,255,198,0.1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0,255,198,0.3)',
              },
            }}
          >
            Book a Demo
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
                🔒 Bank-level security
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
                ✓ HIPAA compliant
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
                ↻ Cancel anytime
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
