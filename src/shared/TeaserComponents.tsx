import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Alert,
  Grid,
  Paper,
  Backdrop,
  styled,
  alpha,
} from '@mui/material';
import {
  LockOutlined,
  TrendingUp,
  Visibility,
  Star,
  ArrowUpward,
} from '@mui/icons-material';

// Styled components for teaser mode
const BlurredContent = styled(Box)(({ theme }) => ({
  filter: 'blur(4px)',
  transition: 'filter 0.3s ease',
  userSelect: 'none',
  pointerEvents: 'none',
}));

const PremiumOverlay = styled(Backdrop)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  backdropFilter: 'blur(2px)',
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
}));

const UpgradeButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7B42F6 30%, #00ffc6 90%)',
  borderRadius: '20px',
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(123, 66, 246, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #6B32E6 30%, #00e6b6 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 2px rgba(123, 66, 246, .4)',
  },
}));

// Types
interface TeaserData {
  name: string;
  category: string;
  price?: number;
  growth?: number;
  volume?: number;
  rank?: number;
}

interface TeaserTableProps {
  data: TeaserData[];
  title: string;
  description?: string;
  onUpgradeClick: () => void;
  maxRows?: number;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  isLocked?: boolean;
  onUpgradeClick: () => void;
  children?: React.ReactNode;
}

interface TeaserStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    isBlurred?: boolean;
  }>;
  onUpgradeClick: () => void;
}

/**
 * Teaser table component for showing limited data
 */
export const TeaserTable: React.FC<TeaserTableProps> = ({
  data,
  title,
  description,
  onUpgradeClick,
  maxRows = 20,
}) => {
  const displayData = data.slice(0, maxRows);
  const hasMoreData = data.length > maxRows;

  return (
    <Card sx={{ position: 'relative', overflow: 'visible' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="primary" />
            {title}
            <Chip 
              label="Preview" 
              size="small" 
              color="warning"
              variant="outlined"
            />
          </Box>
        }
        subheader={description}
        action={
          <UpgradeButton onClick={onUpgradeClick}>
            Unlock Full Data
          </UpgradeButton>
        }
      />
      
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Procedure Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Avg. Price</TableCell>
              <TableCell>Growth</TableCell>
              <TableCell>Market Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Chip 
                    label={`#${index + 1}`} 
                    color="primary" 
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {item.name}
                  </Typography>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {index < 5 ? (
                    <Typography variant="body2">
                      ${item.price?.toLocaleString() || 'N/A'}
                    </Typography>
                  ) : (
                    <BlurredContent>
                      <Typography variant="body2">
                        ${(Math.random() * 5000 + 1000).toFixed(0)}
                      </Typography>
                    </BlurredContent>
                  )}
                </TableCell>
                <TableCell>
                  {index < 5 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ArrowUpward color="success" fontSize="small" />
                      <Typography variant="body2" color="success.main">
                        {item.growth || Math.random() * 50 + 10}%
                      </Typography>
                    </Box>
                  ) : (
                    <BlurredContent>
                      <Typography variant="body2">+XX%</Typography>
                    </BlurredContent>
                  )}
                </TableCell>
                <TableCell>
                  {index < 5 ? (
                    <Typography variant="body2">
                      {(item.volume || Math.random() * 1000 + 100).toFixed(0)}K
                    </Typography>
                  ) : (
                    <BlurredContent>
                      <Typography variant="body2">XXXk</Typography>
                    </BlurredContent>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {hasMoreData && (
          <Alert 
            severity="info" 
            sx={{ mt: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={onUpgradeClick}
              >
                View All
              </Button>
            }
          >
            Showing {maxRows} of {data.length} procedures. 
            Upgrade to see complete market intelligence.
          </Alert>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', p: 3 }}>
        <UpgradeButton 
          onClick={onUpgradeClick}
          size="large"
          startIcon={<Star />}
        >
          Unlock Full Market Intelligence
        </UpgradeButton>
      </CardActions>
    </Card>
  );
};

/**
 * Feature card with optional lock overlay
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  isLocked = false,
  onUpgradeClick,
  children,
}) => {
  return (
    <Card sx={{ position: 'relative', height: '100%' }}>
      {isLocked && (
        <PremiumOverlay open={true}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 2,
              p: 4 
            }}
          >
            <LockOutlined sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" color="primary" textAlign="center">
              Premium Feature
            </Typography>
            <UpgradeButton onClick={onUpgradeClick}>
              Upgrade Now
            </UpgradeButton>
          </Box>
        </PremiumOverlay>
      )}
      
      <CardHeader
        avatar={icon}
        title={title}
        subheader={description}
      />
      
      <CardContent sx={{ filter: isLocked ? 'blur(4px)' : 'none' }}>
        {children}
      </CardContent>
    </Card>
  );
};

/**
 * Stats grid with premium content blurred
 */
export const TeaserStats: React.FC<TeaserStatsProps> = ({
  stats,
  onUpgradeClick,
}) => {
  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              position: 'relative',
              filter: stat.isBlurred ? 'blur(2px)' : 'none',
            }}
          >
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stat.isBlurred ? 'XXX' : stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
            
            {stat.isBlurred && (
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: alpha('#000', 0.1),
                  borderRadius: 1,
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={onUpgradeClick}
                  startIcon={<Visibility />}
                >
                  Unlock
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

/**
 * Call-to-action banner for teaser mode
 */
export const TeaserCTA: React.FC<{
  onSignUpClick: () => void;
  onLoginClick: () => void;
}> = ({ onSignUpClick, onLoginClick }) => {
  return (
    <Alert 
      severity="info" 
      sx={{ 
        mb: 4, 
        background: 'linear-gradient(135deg, rgba(123, 66, 246, 0.1) 0%, rgba(0, 255, 198, 0.1) 100%)',
        border: '1px solid rgba(123, 66, 246, 0.3)',
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            🚀 Ready to unlock full market intelligence?
          </Typography>
          <Typography variant="body2">
            Get access to complete procedure data, pricing trends, and market insights.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onLoginClick}
          >
            Log In
          </Button>
          <UpgradeButton onClick={onSignUpClick}>
            Start Free Trial
          </UpgradeButton>
        </Box>
      </Box>
    </Alert>
  );
};

export default {
  TeaserTable,
  FeatureCard,
  TeaserStats,
  TeaserCTA,
};