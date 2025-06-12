import React from 'react';
import { Box, Typography, CircularProgress, Tooltip, Chip } from '@mui/material';
import { Bolt, TrendingUp } from '@mui/icons-material';
import { useSubscription } from '../../contexts/SubscriptionContext';

export default function UsageMeter({ feature, compact = false }) {
  const { subscription, usage, limits, getUsagePercentage } = useSubscription();
  
  if (!subscription || !feature) return null;

  const currentUsage = usage[feature] || 0;
  const limit = limits[feature];
  const percentage = getUsagePercentage(feature);
  const isUnlimited = limit === -1;

  const featureIcons = {
    canvas_briefs: '🎯',
    ai_prompts: '🤖',
    call_analyses: '📞',
    market_procedures: '📊',
    contacts: '👥',
    ripples: '🌊',
  };

  const featureNames = {
    canvas_briefs: 'Canvas Briefs',
    ai_prompts: 'AI Prompts',
    call_analyses: 'Call Analyses',
    market_procedures: 'Procedures',
    contacts: 'Contacts',
    ripples: 'Ripples',
  };

  const getColor = () => {
    if (isUnlimited) return '#00ffc6';
    if (percentage >= 100) return '#ff006e';
    if (percentage >= 80) return '#ffa726';
    return '#00ffc6';
  };

  if (compact) {
    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="body2">{featureNames[feature]}</Typography>
            <Typography variant="caption">
              {isUnlimited ? 'Unlimited' : `${currentUsage} / ${limit} used`}
            </Typography>
          </Box>
        }
      >
        <Chip
          size="small"
          icon={
            isUnlimited ? (
              <Bolt sx={{ fontSize: 16 }} />
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={Math.min(percentage, 100)}
                  size={20}
                  thickness={4}
                  sx={{
                    color: getColor(),
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ 
                      color: '#fff',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                    }}
                  >
                    {currentUsage}
                  </Typography>
                </Box>
              </Box>
            )
          }
          label={featureIcons[feature]}
          sx={{
            backgroundColor: 'rgba(24,24,43,0.8)',
            border: '1px solid',
            borderColor: getColor() + '33',
            '& .MuiChip-icon': {
              marginLeft: '4px',
            },
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '12px',
        background: 'rgba(24,24,43,0.8)',
        border: '1px solid',
        borderColor: getColor() + '33',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 1 }}>{featureIcons[feature]}</Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
            }}
          >
            {featureNames[feature]}
          </Typography>
        </Box>
        {percentage >= 80 && !isUnlimited && (
          <TrendingUp sx={{ fontSize: 16, color: getColor() }} />
        )}
      </Box>

      {isUnlimited ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Bolt sx={{ fontSize: 20, color: '#00ffc6', mr: 1 }} />
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              color: '#00ffc6',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}
          >
            Unlimited
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                color: getColor(),
              }}
            >
              {currentUsage}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.6)',
                ml: 1,
              }}
            >
              / {limit}
            </Typography>
          </Box>
          
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${Math.min(percentage, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${getColor()} 0%, ${getColor()}CC 100%)`,
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          </Box>

          {percentage >= 80 && (
            <Typography
              variant="caption"
              sx={{
                color: getColor(),
                mt: 0.5,
                display: 'block',
              }}
            >
              {percentage >= 100 ? 'Limit reached!' : `${limit - currentUsage} remaining`}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}