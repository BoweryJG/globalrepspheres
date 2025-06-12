import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  IconButton,
  Collapse,
  Alert,
  LinearProgress
} from '@mui/material';
import { Close, Bolt, TrendingUp } from '@mui/icons-material';
import { useSubscription } from '../../contexts/SubscriptionContext';

export default function UpgradePrompt({ feature, onClose, persistent = false }) {
  const { subscription, getUsagePercentage, getUpgradeMessage, usage, limits } = useSubscription();
  const [show, setShow] = React.useState(true);

  const percentage = getUsagePercentage(feature);
  const message = getUpgradeMessage(feature);
  
  if (!message || !show) return null;

  const featureNames = {
    canvas_briefs: 'AI Conversation Briefs',
    ai_prompts: 'AI Workspace Prompts',
    call_analyses: 'Call Analyses',
    market_procedures: 'Market Procedures',
    contacts: 'Verified Contacts',
    ripples: 'Ripples Deployments',
  };

  const nextTier = {
    free: 'explorer',
    explorer: 'professional',
    professional: 'growth',
    growth: 'enterprise',
    enterprise: 'elite',
  };

  const tierNames = {
    explorer: 'Explorer',
    professional: 'Professional',
    growth: 'Growth',
    enterprise: 'Enterprise',
    elite: 'Elite',
  };

  const handleUpgrade = () => {
    // Track upgrade click
    if (window.gtag) {
      window.gtag('event', 'upgrade_prompt_click', {
        event_category: 'engagement',
        event_label: `${feature}_${subscription.tier}_to_${nextTier[subscription.tier]}`,
        value: percentage,
      });
    }
    window.location.href = '/#pricing';
  };

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  return (
    <Collapse in={show}>
      <Paper
        sx={{
          p: 3,
          mb: 2,
          borderRadius: '16px',
          background: message.severity === 'error' 
            ? 'linear-gradient(135deg, rgba(255,0,110,0.1) 0%, rgba(131,56,236,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(123,66,246,0.1) 100%)',
          border: '2px solid',
          borderColor: message.severity === 'error' 
            ? 'rgba(255,0,110,0.3)'
            : 'rgba(0,255,198,0.3)',
          position: 'relative',
        }}
      >
        {!persistent && (
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Bolt sx={{ color: '#00ffc6', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {message.title}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: "'DM Sans', Arial, sans-serif",
            color: 'rgba(255,255,255,0.8)',
            mb: 2,
          }}
        >
          {message.message}
        </Typography>

        {/* Usage Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              {featureNames[feature]} Usage
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              {usage[feature] || 0} / {limits[feature] === -1 ? '∞' : limits[feature]}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(percentage, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: percentage >= 100
                  ? 'linear-gradient(90deg, #ff006e 0%, #8338ec 100%)'
                  : 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              },
            }}
          />
        </Box>

        {/* Upgrade Benefits */}
        {nextTier[subscription.tier] && (
          <Box sx={{ mb: 3, p: 2, borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <Typography
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: '#00ffc6',
                fontSize: '0.9rem',
                mb: 1,
              }}
            >
              Upgrade to {tierNames[nextTier[subscription.tier]]} and get:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', mr: 1 }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
                {nextTier[subscription.tier] === 'elite' 
                  ? 'Unlimited everything'
                  : `${getLimitForNextTier(feature, nextTier[subscription.tier])} ${featureNames[feature].toLowerCase()}/month`}
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleUpgrade}
            sx={{
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
              color: '#0a0a0a',
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0,255,198,0.3)',
              },
            }}
          >
            Upgrade Now
          </Button>
          {!persistent && (
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              Later
            </Button>
          )}
        </Box>
      </Paper>
    </Collapse>
  );

  function getLimitForNextTier(feature, tier) {
    const tierLimits = {
      explorer: { canvas_briefs: 25, ai_prompts: 5, call_analyses: 5, contacts: 10, ripples: 25 },
      professional: { canvas_briefs: 50, ai_prompts: 50, call_analyses: 10, contacts: 25, ripples: 50 },
      growth: { canvas_briefs: 100, ai_prompts: 'Unlimited', call_analyses: 50, contacts: 50, ripples: 100 },
      enterprise: { canvas_briefs: 'Unlimited', ai_prompts: 'Unlimited', call_analyses: 'Unlimited', contacts: 100, ripples: 'Unlimited' },
      elite: { canvas_briefs: 'Unlimited', ai_prompts: 'Unlimited', call_analyses: 'Unlimited', contacts: 'Unlimited', ripples: 'Unlimited' },
    };
    
    return tierLimits[tier]?.[feature] || 'Unlimited';
  }
}