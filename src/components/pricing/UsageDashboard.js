import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Chip,
  Button,
  LinearProgress
} from '@mui/material';
import { TrendingUp, Bolt, Speed } from '@mui/icons-material';
import { useSubscription } from '../../contexts/SubscriptionContext';
import UsageMeter from './UsageMeter';
import UpgradePrompt from './UpgradePrompt';

export default function UsageDashboard() {
  const { subscription, usage, limits, loading } = useSubscription();

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography>Loading usage data...</Typography>
        </Box>
      </Container>
    );
  }

  const features = [
    { key: 'canvas_briefs', name: 'Canvas Briefs', icon: '🎯' },
    { key: 'ai_prompts', name: 'AI Prompts', icon: '🤖' },
    { key: 'call_analyses', name: 'Call Analyses', icon: '📞' },
    { key: 'contacts', name: 'Contacts', icon: '👥' },
    { key: 'ripples', name: 'Ripples', icon: '🌊' },
  ];

  const tierColors = {
    free: '#666',
    explorer: '#667eea',
    professional: '#00ffc6',
    growth: '#ff6b6b',
    enterprise: '#7B42F6',
    elite: '#ff006e',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Space Grotesk', Arial, sans-serif",
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Usage Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
          <Chip
            label={subscription?.tier || 'free'}
            sx={{
              backgroundColor: tierColors[subscription?.tier] || '#666',
              color: '#fff',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'uppercase',
              px: 2,
            }}
          />
          <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Current Plan
          </Typography>
        </Box>
      </Box>

      {/* Usage Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} lg={4} key={feature.key}>
            <UsageMeter feature={feature.key} />
          </Grid>
        ))}
      </Grid>

      {/* Upgrade Prompts */}
      <Box sx={{ mb: 6 }}>
        {features.map((feature) => {
          const percentage = usage[feature.key] 
            ? (usage[feature.key] / (limits[feature.key] || 1)) * 100 
            : 0;
          
          if (percentage >= 80 && limits[feature.key] !== -1) {
            return (
              <UpgradePrompt 
                key={`upgrade-${feature.key}`}
                feature={feature.key}
                persistent={percentage >= 100}
              />
            );
          }
          return null;
        })}
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'rgba(24,24,43,0.8)',
              border: '1px solid rgba(0,255,198,0.3)',
              textAlign: 'center',
            }}
          >
            <TrendingUp sx={{ fontSize: 40, color: '#00ffc6', mb: 2 }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                color: '#00ffc6',
                mb: 1,
              }}
            >
              {Object.values(usage).reduce((sum, val) => sum + (val || 0), 0)}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Total Usage This Month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'rgba(24,24,43,0.8)',
              border: '1px solid rgba(123,66,246,0.3)',
              textAlign: 'center',
            }}
          >
            <Bolt sx={{ fontSize: 40, color: '#7B42F6', mb: 2 }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                color: '#7B42F6',
                mb: 1,
              }}
            >
              {features.filter(f => limits[f.key] === -1).length}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Unlimited Features
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'rgba(24,24,43,0.8)',
              border: '1px solid rgba(255,107,107,0.3)',
              textAlign: 'center',
            }}
          >
            <Speed sx={{ fontSize: 40, color: '#ff6b6b', mb: 2 }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                color: '#ff6b6b',
                mb: 1,
              }}
            >
              {new Date().getDate()}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Days Into Month
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Upgrade CTA */}
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(123,66,246,0.1) 100%)',
          border: '2px solid rgba(0,255,198,0.3)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Space Grotesk', Arial, sans-serif",
            fontWeight: 700,
            mb: 2,
            color: '#fff',
          }}
        >
          Ready for More Power?
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
          Upgrade your plan to unlock unlimited features and accelerate your success
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => window.location.href = '/#pricing'}
          sx={{
            px: 5,
            py: 2,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
            color: '#0a0a0a',
            fontFamily: "'Space Grotesk', Arial, sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 30px rgba(0,255,198,0.4)',
            },
          }}
        >
          Upgrade Now
        </Button>
      </Box>
    </Container>
  );
}