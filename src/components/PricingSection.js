import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Chip, CircularProgress } from '@mui/material';
import { Check, Star, Bolt, Phone, TrendingUp, Psychology, Speed, EmojiEvents, Rocket } from '@mui/icons-material';
import { createCheckoutSession } from '../stripeService';

const pricingTiers = [
  {
    id: 'explorer',
    name: 'Explorer',
    tagline: 'Your Secret Weapon Starts Here',
    price: '$49',
    period: '/month',
    annualPrice: '$490',
    annualPeriod: '/year',
    description: 'The edge that pays for itself with just one extra appointment',
    features: [
      'Market X-Ray Vision: Track growth on 100+ hot procedures',
      '5 AI Power Plays that get callbacks',
      'Weekly Intelligence Briefings before competition',
      'Explorer Elite Status in private community',
      'Basic category insights & market trends',
      'Mobile app access'
    ],
    testimonial: {
      quote: "I booked 3 meetings my first week using Explorer insights. This is cheating.",
      author: "Mike D., Zimmer Rep"
    },
    roi: "One extra appointment pays for 6 months",
    cta: 'Start Dominating',
    popular: false,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: <TrendingUp sx={{ fontSize: 30 }} />,
    stripeMonthly: 'price_1RRuqbGRiAPUZqWu3f91wnNx',
    stripeAnnual: 'price_1RWMXEGRiAPUZqWuPwcgrovN',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Turn Territory Management Into Territory Domination',
    price: '$149',
    period: '/month',
    annualPrice: '$1,490',
    annualPeriod: '/year',
    description: 'Your unfair advantage arsenal for crushing quota',
    features: [
      'Complete Market Intelligence: 500+ procedures with surgeon insights',
      '50 AI Sales Conversations worth $10K+ each',
      '10 Conversation Forensics revealing why you win/lose',
      'Real-time alerts on expansions & competitor issues',
      'Fortune 500 level reports on demand',
      'VIP Support: We answer before your second ring',
      'Professional Badge + priority everything'
    ],
    testimonial: {
      quote: "Jumped from #12 to #2 in district within 90 days. My manager asked what changed.",
      author: "Sarah K., Allergan"
    },
    roi: "One small deal = full year paid",
    cta: 'Claim Your Territory',
    popular: true,
    gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
    icon: <Psychology sx={{ fontSize: 30 }} />,
    savings: 'MOST POPULAR',
    stripeMonthly: 'price_1RRurNGRiAPUZqWuklICsE4P',
    stripeAnnual: 'price_1RWMWjGRiAPUZqWu6YBZY7o4',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Scale From Rep to Regional Force',
    price: '$349',
    period: '/month',
    annualPrice: '$3,490',
    annualPeriod: '/year',
    description: 'Your revenue multiplication system',
    features: [
      'UNLIMITED AI Brain Power for brilliant talking points',
      '50 Call Transformations into masterclasses',
      '3 Custom Territory Intelligence Reports monthly',
      'Wolf Pack Mode: Share wins with 3 team members',
      'API Weapon: Connect CRM & automate dominance',
      'Quarterly War Room with $5M+ producers',
      'Growth Badge + quarterly strategy calls'
    ],
    testimonial: {
      quote: "My team's close rate went from 18% to 47%. We're unstoppable now.",
      author: "Regional Manager, Top 5 Device Company"
    },
    roi: "5% close rate increase = 10x return",
    cta: 'Build Your Empire',
    popular: false,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    icon: <Speed sx={{ fontSize: 30 }} />,
    stripeMonthly: 'price_1RWMW3GRiAPUZqWuoTA0eLUC',
    stripeAnnual: 'price_1RRus5GRiAPUZqWup3jk1S8U',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Build Your Sales Empire',
    price: '$749',
    period: '/month',
    annualPrice: '$7,490',
    annualPeriod: '/year',
    description: 'Your market domination platform',
    features: [
      'UNLIMITED Everything: Every call, every brief, every opportunity',
      '5 AI Automation Workflows running while you golf',
      'Custom AI Training on your secret sauce',
      '10-Seat Strike Team armament',
      'White-Label Reports that stun C-suite',
      'Monthly Strategy Summit with enterprise team',
      'API Priority Access for custom integrations',
      'Enterprise Badge + dedicated success line'
    ],
    testimonial: {
      quote: "We took 62% market share in 8 months. Competitors think we have insider info. We do.",
      author: "VP Sales, PE-Backed Aesthetic Company"
    },
    roi: "10% market share gain = 50x return",
    cta: 'Command The Market',
    popular: false,
    gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
    icon: <EmojiEvents sx={{ fontSize: 30 }} />,
    savings: 'Save $1,498/year',
    stripeMonthly: 'price_1RRushGRiAPUZqWuIvqueK7h',
    stripeAnnual: 'price_1RWMT4GRiAPUZqWuqiNhkZfw',
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'For Those Who Refuse To Lose',
    price: '$1,499',
    period: '/month',
    annualPrice: '$14,990',
    annualPeriod: '/year',
    description: 'Your personal sales special forces',
    features: [
      'INFINITE POWER: Every limit removed',
      'Your AI Army trained on YOUR wins 24/7',
      'Done-For-You reports while you close',
      'War General who\'s personally closed $50M+',
      'Weekly Battle Planning sessions',
      'Unlimited team member access',
      'First access to game-breaking features',
      'Elite Inner Circle quarterly meetups',
      'Custom everything: AI, reports, strategies'
    ],
    testimonial: {
      quote: "My commission went from $400K to $1.3M. Elite pays for itself every 10 days.",
      author: "National Account Director"
    },
    roi: "ROI is for people who think small",
    cta: 'Join The Elite',
    popular: false,
    gradient: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
    icon: <Rocket sx={{ fontSize: 30 }} />,
    highlight: true,
    savings: 'Save $2,998/year',
    stripeMonthly: 'price_1RRutVGRiAPUZqWuDMSAqHsD',
    stripeAnnual: 'price_1RWMSCGRiAPUZqWu30j19b9G',
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
      } else if (tier.id === 'elite') {
        window.location.href = '/elite-application';
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

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<Bolt sx={{ fontSize: 16 }} />}
            label="ENGINEERED FOR DOMINANCE"
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
            Join 2,847+ top performers already dominating their markets.
          </Typography>

          {/* Social Proof Ticker */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: '#00ffc6',
                fontSize: '0.9rem',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 0.7 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.7 },
                },
              }}
            >
              🔥 Sarah from Dallas just upgraded to Enterprise • Mike in Chicago closed 3 deals with Growth • 47 reps joined today
            </Typography>
          </Box>

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
                    ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)'
                    : 'transparent',
                  color: billingPeriod === 'monthly' ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
                  '&:hover': {
                    backgroundColor: billingPeriod === 'monthly' 
                      ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)'
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
                    ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)'
                    : 'transparent',
                  color: billingPeriod === 'annual' ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: billingPeriod === 'annual' 
                      ? 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)'
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
                    backgroundColor: '#ff006e',
                    color: '#fff',
                    fontSize: '0.6rem',
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
        <Grid container spacing={3} alignItems="stretch">
          {pricingTiers.map((tier) => {
            const isHovered = hoveredTier === tier.id;
            const isPopular = tier.popular;
            const isHighlight = tier.highlight;
            
            return (
              <Grid item xs={12} sm={6} lg={4} xl={2.4} key={tier.id}>
                <Box
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'visible',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isPopular || isHighlight
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
                        label={tier.savings}
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
                        padding: isPopular || isHighlight ? '2px' : '1px',
                        background: isPopular || isHighlight
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
                        p: 3,
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
                        {/* Icon and Tier name */}
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: '16px',
                              background: tier.gradient,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2,
                              boxShadow: `0 8px 24px ${tier.gradient.match(/#[a-f0-9]{6}/gi)?.[0]}33`,
                              transform: isHovered ? 'rotate(-5deg) scale(1.1)' : 'rotate(0)',
                              transition: 'transform 0.4s ease',
                            }}
                          >
                            {tier.icon}
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Space Grotesk', Arial, sans-serif",
                              fontWeight: 700,
                              fontSize: '1.5rem',
                              color: '#fff',
                              mb: 0.5,
                            }}
                          >
                            {tier.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              color: 'rgba(255,255,255,0.7)',
                              fontSize: '0.85rem',
                              fontStyle: 'italic',
                              mb: 2,
                            }}
                          >
                            "{tier.tagline}"
                          </Typography>
                        </Box>

                        {/* Price */}
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                          <Typography
                            component="span"
                            sx={{
                              fontFamily: "'Space Grotesk', Arial, sans-serif",
                              fontWeight: 800,
                              fontSize: { xs: '2.2rem', md: '2.5rem' },
                              color: '#fff',
                              lineHeight: 1,
                            }}
                          >
                            {billingPeriod === 'annual' ? tier.annualPrice : tier.price}
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: '1rem',
                              ml: 0.5,
                            }}
                          >
                            {billingPeriod === 'annual' ? tier.annualPeriod : tier.period}
                          </Typography>
                        </Box>

                        {/* ROI Badge */}
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                          <Chip
                            label={tier.roi}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(0,255,198,0.1)',
                              color: '#00ffc6',
                              border: '1px solid rgba(0,255,198,0.3)',
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              fontSize: '0.8rem',
                              width: 'fit-content',
                            }}
                          />
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            mb: 2,
                            textAlign: 'center',
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
                                mb: 1,
                                opacity: isHovered ? 1 : 0.85,
                                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                transition: `all 0.3s ease ${idx * 0.03}s`,
                              }}
                            >
                              <Check 
                                sx={{ 
                                  fontSize: 16, 
                                  color: isPopular || isHighlight ? '#00ffc6' : 'rgba(255,255,255,0.5)',
                                  mr: 1,
                                  mt: 0.2,
                                  flexShrink: 0,
                                }} 
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "'DM Sans', Arial, sans-serif",
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: '0.85rem',
                                  lineHeight: 1.4,
                                }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                        </Box>

                        {/* Testimonial */}
                        {tier.testimonial && (
                          <Box sx={{ mb: 3, p: 2, borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "'DM Sans', Arial, sans-serif",
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.8rem',
                                fontStyle: 'italic',
                                mb: 1,
                              }}
                            >
                              "{tier.testimonial.quote}"
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontFamily: "'DM Sans', Arial, sans-serif",
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '0.75rem',
                              }}
                            >
                              — {tier.testimonial.author}
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

        {/* ROI Calculator CTA */}
        <Box sx={{ 
          mt: 8, 
          p: 4, 
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(123,66,246,0.1) 100%)',
          border: '2px solid rgba(0,255,198,0.3)',
          textAlign: 'center',
        }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              mb: 2,
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Math That Matters
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              mb: 3,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Top performers use RepSpheres to close 2.3x more deals. 
            Calculate your potential commission increase.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => window.location.href = '/roi-calculator'}
            sx={{
              px: 5,
              py: 2,
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
              color: '#0a0a0a',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: '1.1rem',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(0,255,198,0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(0,255,198,0.5)',
              },
            }}
          >
            Calculate Your ROI →
          </Button>
        </Box>

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
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'book_demo', {
                  event_category: 'engagement',
                  event_label: 'pricing_section_bottom',
                  value: 1
                });
              }
              window.location.href = '/demo';
            }}
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