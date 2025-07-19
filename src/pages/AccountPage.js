import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccountCircle,
  CreditCard,
  Receipt,
  Settings,
  Upgrade,
  CheckCircle,
  Cancel,
  Info
} from '@mui/icons-material';
import StarryBackground from '../components/StarryBackground_Ultra';
import NavBar from '../components/NavBar';
import { getPricingTiers } from '../stripeService_v2';

const AccountContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, rgba(11, 11, 32, 0.95) 0%, rgba(11, 11, 32, 0.98) 100%)',
  position: 'relative',
  paddingTop: '100px',
  paddingBottom: '60px'
}));

const AccountHeader = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00ffc6 0%, #8338ec 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '2rem',
  fontFamily: "'Space Grotesk', Arial, sans-serif"
}));

const AccountCard = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  backgroundColor: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  height: '100%'
}));

const StatusChip = styled(Chip)(({ status }) => ({
  background: status === 'active' 
    ? 'linear-gradient(135deg, #00ffc6 0%, #00b894 100%)'
    : status === 'trial'
    ? 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)'
    : 'linear-gradient(135deg, #ffa500 0%, #ff6b6b 100%)',
  color: 'white',
  fontWeight: 600
}));

export default function AccountPage() {
  const [userAccount, setUserAccount] = useState({
    name: 'John Smith',
    email: 'john@company.com',
    subscription: {
      tier: 'professional',
      status: 'active',
      billingPeriod: 'monthly',
      nextBilling: '2024-01-15',
      amount: 149
    },
    usage: {
      creditsUsed: 145,
      creditsTotal: 200,
      magicLinksUsed: 12,
      magicLinksTotal: 20
    },
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
      expiry: '12/26'
    }
  });

  const [billingHistory] = useState([
    { date: '2023-12-15', amount: 149, status: 'paid', invoice: 'INV-2023-12-001' },
    { date: '2023-11-15', amount: 149, status: 'paid', invoice: 'INV-2023-11-001' },
    { date: '2023-10-15', amount: 149, status: 'paid', invoice: 'INV-2023-10-001' }
  ]);

  const [pricingTiers, setPricingTiers] = useState({});
  const [loadingPricing, setLoadingPricing] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const tiers = await getPricingTiers();
        setPricingTiers(tiers);
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoadingPricing(false);
      }
    };

    fetchPricing();
  }, []);

  const currentTier = pricingTiers[userAccount.subscription.tier] || { name: 'Professional' };
  const usagePercentage = (userAccount.usage.creditsUsed / userAccount.usage.creditsTotal) * 100;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleUpgrade = () => {
    window.location.href = '/#pricing';
  };

  const handleBilling = () => {
    // This would integrate with Stripe customer portal
    alert('Redirecting to billing portal...');
  };

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      alert('Subscription cancellation requested. You will receive a confirmation email.');
    }
  };

  return (
    <AccountContainer>
      <StarryBackground />
      <NavBar />
      <Container maxWidth="xl">
        <AccountHeader>
          Account Dashboard
        </AccountHeader>

        <Grid container spacing={4}>
          {/* Account Overview */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              {/* Profile Section */}
              <Grid item xs={12}>
                <AccountCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <AccountCircle sx={{ fontSize: 40, color: '#00ffc6', mr: 2 }} />
                    <Box>
                      <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                        {userAccount.name}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {userAccount.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                        Current Plan
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#00ffc6', fontWeight: 600, mr: 2 }}>
                          {currentTier?.name || 'Professional'}
                        </Typography>
                        <StatusChip 
                          label={userAccount.subscription.status}
                          status={userAccount.subscription.status}
                          size="small"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                        Next Billing
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        {formatDate(userAccount.subscription.nextBilling)}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccountCard>
              </Grid>

              {/* Usage Section */}
              <Grid item xs={12}>
                <AccountCard>
                  <Typography variant="h6" sx={{ color: '#00ffc6', fontWeight: 700, mb: 3 }}>
                    Usage This Month
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                        AI Credits
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ color: 'white', mr: 1 }}>
                          {userAccount.usage.creditsUsed}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          / {userAccount.usage.creditsTotal}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={usagePercentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': {
                            background: usagePercentage > 80 
                              ? 'linear-gradient(90deg, #ff6b6b 0%, #ff006e 100%)'
                              : 'linear-gradient(90deg, #00ffc6 0%, #00b894 100%)',
                            borderRadius: 4
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                        Magic Links
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ color: 'white', mr: 1 }}>
                          {userAccount.usage.magicLinksUsed}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          / {userAccount.usage.magicLinksTotal}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(userAccount.usage.magicLinksUsed / userAccount.usage.magicLinksTotal) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #8338ec 0%, #ff006e 100%)',
                            borderRadius: 4
                          }
                        }}
                      />
                    </Grid>
                  </Grid>

                  {usagePercentage > 80 && (
                    <Alert
                      severity="warning"
                      sx={{
                        mt: 3,
                        backgroundColor: 'rgba(255, 171, 0, 0.1)',
                        color: '#ffab00',
                        border: '1px solid rgba(255, 171, 0, 0.3)'
                      }}
                    >
                      You're approaching your credit limit. Consider upgrading to avoid interruptions.
                    </Alert>
                  )}
                </AccountCard>
              </Grid>

              {/* Billing History */}
              <Grid item xs={12}>
                <AccountCard>
                  <Typography variant="h6" sx={{ color: '#00ffc6', fontWeight: 700, mb: 3 }}>
                    Billing History
                  </Typography>
                  
                  <List>
                    {billingHistory.map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          px: 0,
                          borderBottom: index < billingHistory.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                        }}
                      >
                        <ListItemIcon>
                          <Receipt sx={{ color: '#8338ec' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography sx={{ color: 'white' }}>
                                {formatDate(item.date)}
                              </Typography>
                              <Typography sx={{ color: '#00ffc6', fontWeight: 600 }}>
                                ${item.amount}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                                {item.invoice}
                              </Typography>
                              <Chip 
                                label={item.status}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(0, 255, 198, 0.2)',
                                  color: '#00ffc6',
                                  fontSize: '0.75rem'
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccountCard>
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar Actions */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Quick Actions */}
              <Grid item xs={12}>
                <AccountCard>
                  <Typography variant="h6" sx={{ color: '#00ffc6', fontWeight: 700, mb: 3 }}>
                    Quick Actions
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Upgrade />}
                      onClick={handleUpgrade}
                      sx={{
                        background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
                        py: 1.5,
                        borderRadius: '12px',
                        fontWeight: 600
                      }}
                    >
                      Upgrade Plan
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<CreditCard />}
                      onClick={handleBilling}
                      sx={{
                        borderColor: '#00ffc6',
                        color: '#00ffc6',
                        py: 1.5,
                        borderRadius: '12px',
                        fontWeight: 600
                      }}
                    >
                      Manage Billing
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<Settings />}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'rgba(255,255,255,0.7)',
                        py: 1.5,
                        borderRadius: '12px',
                        fontWeight: 600
                      }}
                    >
                      Account Settings
                    </Button>
                  </Box>
                </AccountCard>
              </Grid>

              {/* Payment Method */}
              <Grid item xs={12}>
                <AccountCard>
                  <Typography variant="h6" sx={{ color: '#00ffc6', fontWeight: 700, mb: 3 }}>
                    Payment Method
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CreditCard sx={{ color: '#8338ec', mr: 2 }} />
                    <Box>
                      <Typography sx={{ color: 'white', fontWeight: 600 }}>
                        {userAccount.paymentMethod.type} ****{userAccount.paymentMethod.last4}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                        Expires {userAccount.paymentMethod.expiry}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="text"
                    sx={{
                      color: '#00ffc6',
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    Update Payment Method
                  </Button>
                </AccountCard>
              </Grid>

              {/* Support */}
              <Grid item xs={12}>
                <AccountCard>
                  <Typography variant="h6" sx={{ color: '#00ffc6', fontWeight: 700, mb: 3 }}>
                    Need Help?
                  </Typography>
                  
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, lineHeight: 1.6 }}>
                    Our support team is here to help you get the most out of GlobalRepSpheres.
                  </Typography>
                  
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #00ffc6 0%, #00b894 100%)',
                      color: 'black',
                      py: 1.5,
                      borderRadius: '12px',
                      fontWeight: 600,
                      width: '100%'
                    }}
                  >
                    Contact Support
                  </Button>
                </AccountCard>
              </Grid>

              {/* Danger Zone */}
              <Grid item xs={12}>
                <AccountCard>
                  <Typography variant="h6" sx={{ color: '#ff6b6b', fontWeight: 700, mb: 3 }}>
                    Danger Zone
                  </Typography>
                  
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, fontSize: '0.9rem' }}>
                    Cancel your subscription. Your access will continue until the end of your billing period.
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancelSubscription}
                    sx={{
                      borderColor: '#ff6b6b',
                      color: '#ff6b6b',
                      py: 1.5,
                      borderRadius: '12px',
                      fontWeight: 600,
                      width: '100%'
                    }}
                  >
                    Cancel Subscription
                  </Button>
                </AccountCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AccountContainer>
  );
}