import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { 
  Map as MapIcon, 
  MyLocation as LocationIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

export default function TransformationSection() {
  return (
    <Box
      id="transformation"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background effect */}
      <Box
        sx={{
          position: 'absolute',
          width: '80vw',
          height: '80vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

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
              background: 'linear-gradient(90deg, #00ffc6 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            From Guessing to Knowing in Seconds
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
            Just as GPS knows every road, we've mapped every practice, procedure, and physician preference in America
          </Typography>
        </Box>

        {/* Comparison Grid */}
        <Grid container spacing={4} alignItems="stretch">
          {/* Then Column */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                p: 4,
                borderRadius: '24px',
                background: 'rgba(40, 20, 70, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0.7,
              }}
            >
              {/* Faded overlay effect */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
                  zIndex: 1,
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <MapIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 3 }} />
                
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: 'rgba(255,255,255,0.5)',
                    mb: 3,
                  }}
                >
                  Then: Manual Navigation
                </Typography>

                <Box sx={{ mb: 4 }}>
                  {[
                    'Print territory maps',
                    'Hours researching each doctor',
                    'Cold calling blindly',
                    'Hoping you found the right contact',
                    'Manually tracking procedures',
                    'Guessing at growth trends',
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CancelIcon sx={{ color: 'rgba(255,0,110,0.5)', mr: 2, fontSize: 20 }} />
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '1.05rem',
                          textDecoration: 'line-through',
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(255,0,110,0.1)',
                    border: '1px solid rgba(255,0,110,0.2)',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.6)',
                      fontStyle: 'italic',
                    }}
                  >
                    "I spent 3 hours researching one practice, only to find out they don't even do the procedures I sell"
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Now Column */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                p: 4,
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(0,212,255,0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '2px solid',
                borderImage: 'linear-gradient(135deg, #00ffc6, #00d4ff) 1',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,212,255,0.2)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,255,198,0.3) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                  top: '-50px',
                  right: '-50px',
                }}
              />
              
              <LocationIcon sx={{ fontSize: 48, color: '#00ffc6', mb: 3 }} />
              
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  color: '#fff',
                  mb: 3,
                }}
              >
                Now: Digital Intelligence
              </Typography>

              <Box sx={{ mb: 4 }}>
                {[
                  'Every physician digitally mapped',
                  'Instant verification & insights',
                  'Know before you go',
                  'Direct connections revealed',
                  'Real-time procedure volumes',
                  'AI-predicted growth opportunities',
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckIcon sx={{ color: '#00ffc6', mr: 2, fontSize: 20 }} />
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '1.05rem',
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(0,255,198,0.1)',
                  border: '1px solid rgba(0,255,198,0.3)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                  }}
                >
                  "I craft better messages in seconds than I used to write in hours - and send exactly the right amount"
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Speed Comparison */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <SpeedIcon sx={{ fontSize: 40, color: '#00ffc6', mb: 2 }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '3rem',
                    background: 'linear-gradient(90deg, #00ffc6 0%, #00d4ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1,
                  }}
                >
                  120x
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '1.1rem',
                  }}
                >
                  Faster Research
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '3rem',
                    background: 'linear-gradient(90deg, #3a86ff 0%, #7B42F6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1,
                    mt: 6,
                  }}
                >
                  1000x
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '1.1rem',
                  }}
                >
                  More Outreach
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '3rem',
                    background: 'linear-gradient(90deg, #ff006e 0%, #ff6b6b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1,
                    mt: 6,
                  }}
                >
                  ∞
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '1.1rem',
                  }}
                >
                  Scaling Potential
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}