import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Chip, CircularProgress } from '@mui/material';
import { Check, Star, Bolt, Phone, TrendingUp, Psychology, Speed, EmojiEvents, Rocket } from '@mui/icons-material';
import { createCheckoutSession } from '../stripeService';
import { API_ENDPOINTS } from '../config/api';

// RepX tier configuration with icons, UI elements, and copy
const defaultTierConfig = {
  repx1: {
    icon: <Phone sx={{ fontSize: 30 }} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    popular: false,
    tagline: 'Professional Business Foundation',
    description: 'Essential professional line with 100 calls monthly - perfect for getting started',
    features: [
      '100 professional calls per month',
      'Basic RepSpheres line features',
      'Call recording and transcription',
      'Basic analytics dashboard',
      'Email support',
      'Mobile app access'
    ],
    testimonial: {
      quote: "RepX1 gave me the foundation I needed. Professional line that just works.",
      author: "Sarah M., Medical Device Rep"
    },
    roi: "Professional presence from day one",
    cta: 'Start Professional'
  },
  repx2: {
    icon: <TrendingUp sx={{ fontSize: 30 }} />,
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
    popular: false,
    tagline: 'Market Intelligence Edge',
    description: 'Advanced intelligence with 200 calls, 50 daily emails, and market insights',
    features: [
      '200 calls per month',
      '50 emails per day',
      '10 Canvas market scans daily',
      'Market intelligence reports',
      'Competitive analysis',
      'Priority support'
    ],
    testimonial: {
      quote: "RepX2 market intelligence helped me spot opportunities before my competition.",
      author: "Mike T., Territory Manager"
    },
    roi: "Market insights = competitive advantage",
    cta: 'Get Intelligence'
  },
  repx3: {
    icon: <Psychology sx={{ fontSize: 30 }} />,
    gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
    popular: true,
    savings: 'MOST POPULAR',
    tagline: 'Territory Command Center',
    description: 'Advanced command center with 400 calls, 100 daily emails, and territory analytics',
    features: [
      '400 calls per month',
      '100 emails per day',
      '25 Canvas scans daily',
      'Advanced market analytics',
      'Territory intelligence reports',
      'Real-time competitor alerts',
      'Advanced CRM integration',
      'Priority phone support'
    ],
    testimonial: {
      quote: "RepX3 Territory Command gave me complete control. I own my territory now.",
      author: "Jennifer K., Regional Sales Manager"
    },
    roi: "Territory dominance through intelligence",
    cta: 'Command Territory'
  },
  repx4: {
    icon: <Speed sx={{ fontSize: 30 }} />,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    popular: false,
    tagline: 'Executive Operations Hub',
    description: 'Executive-level operations with 800 calls, 200 daily emails, and workflow automation',
    features: [
      '800 calls per month',
      '200 emails per day',
      '50 Canvas scans daily',
      'Workflow automation suite',
      'Executive reporting dashboard',
      'Advanced AI coaching',
      'Team collaboration tools',
      'Dedicated account manager'
    ],
    testimonial: {
      quote: "RepX4 automation freed up 20 hours per week. I focus on closing, AI handles the rest.",
      author: "David R., VP of Sales"
    },
    roi: "Executive efficiency = exponential results",
    cta: 'Go Executive'
  },
  repx5: {
    icon: <Rocket sx={{ fontSize: 30 }} />,
    gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
    popular: false,
    savings: 'ELITE TIER',
    tagline: 'Elite Global Dominance',
    description: 'Unlimited everything with dedicated success manager and custom integrations',
    features: [
      'UNLIMITED calls, emails, Canvas scans',
      'Dedicated success manager',
      'Priority support (response within 1 hour)',
      'Custom integrations & API access',
      'White-label reporting',
      'Advanced team collaboration',
      'Custom AI model training',
      'Quarterly strategy sessions',
      'Elite community access'
    ],
    testimonial: {
      quote: "RepX5 Elite transformed our entire organization. We dominate every market we enter.",
      author: "Sarah C., Chief Revenue Officer"
    },
    roi: "Elite performance transcends metrics",
    cta: 'Join Elite'
  }
};

export default function PricingSection() {
  const [hoveredTier, setHoveredTier] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [loadingTier, setLoadingTier] = useState(null);
  const [pricingTiers, setPricingTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pricing data from backend
  useEffect(() => {
    const fetchPricingTiers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.REPX_PLANS);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pricing data');
        }
        
        const backendTiers = await response.json();
        
        // Merge backend data with UI configuration
        const mergedTiers = backendTiers.map(tier => {
          const tierKey = tier.id.toLowerCase(); // Ensure lowercase for matching
          return {
            ...tier,
            ...defaultTierConfig[tierKey],
            // Format prices for display
            price: `$${tier.price.monthly}`,
            period: '/month',
            annualPrice: `$${tier.price.annual.toLocaleString()}`,
            annualPeriod: '/year',
            stripeMonthly: tier.stripeIds?.monthly,
            stripeAnnual: tier.stripeIds?.annual,
            // Use actual backend data for key fields
            name: tier.name,
            features: tier.features || defaultTierConfig[tierKey]?.features || []
          };
        });
        
        setPricingTiers(mergedTiers);
        setError(null);
      } catch (err) {
        console.error('Error fetching pricing:', err);
        setError('Failed to load pricing. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchPricingTiers();
  }, []);

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
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#00ffc6' }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ff6b6b', 
                fontFamily: "'DM Sans', Arial, sans-serif",
                mb: 2 
              }}
            >
              {error}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => window.location.reload()}
              sx={{ 
                borderColor: '#00ffc6', 
                color: '#00ffc6',
                '&:hover': { backgroundColor: 'rgba(0,255,198,0.1)' }
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Content - only show when loaded and no error */}
        {!loading && !error && (
          <>
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
            Choose Your Rep<sup style={{ fontSize: '0.7em', color: '#00ffc6' }}>X</sup> Subscription
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
            Every day without RepSpheres is revenue lost to competitors with better intelligence. 
            Join 3,200+ elite performers already maximizing their Rep<sup style={{ fontSize: '0.6em', color: '#00ffc6' }}>X</sup> potential.
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
              🔥 Sarah from Dallas upgraded to Enterprise Rep<sup style={{ fontSize: '0.6em' }}>X</sup> • Mike in Chicago closed $2.1M with Growth Rep<sup style={{ fontSize: '0.6em' }}>X</sup> • 73 reps subscribed today
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
            The Rep<sup style={{ fontSize: '0.6em', color: '#00ffc6' }}>X</sup> Mathematics
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
            Elite performers with RepSpheres intelligence close 3.4x more high-value deals. 
            Calculate your Rep<sup style={{ fontSize: '0.6em', color: '#00ffc6' }}>X</sup> subscription ROI and commission multiplier.
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
            Calculate Your Rep<sup style={{ fontSize: '0.6em' }}>X</sup> ROI →
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
            Questions About Your Rep<sup style={{ fontSize: '0.6em', color: '#00ffc6' }}>X</sup> Subscription?
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
            See RepSpheres Rep<sup style={{ fontSize: '0.6em', color: '#00ffc6' }}>X</sup> intelligence in action with a personalized demo
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
        </>
        )}
      </Container>
    </Box>
  );
}