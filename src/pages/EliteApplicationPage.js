import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarryBackground from '../components/StarryBackground_Ultra';
import NavBar from '../components/NavBar';
import { API_ENDPOINTS } from '../config/api';

const EliteContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, rgba(11, 11, 32, 0.95) 0%, rgba(11, 11, 32, 0.98) 100%)',
  position: 'relative',
  paddingTop: '100px',
  paddingBottom: '60px'
}));

const EliteHeader = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '2rem',
  fontFamily: "'Space Grotesk', Arial, sans-serif"
}));

const steps = ['Basic Info', 'Business Details', 'Goals & Requirements'];

export default function EliteApplicationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    
    // Step 2: Business Details
    industry: '',
    teamSize: '',
    currentRevenue: '',
    territorySize: '',
    currentCRM: '',
    painPoints: '',
    
    // Step 3: Goals & Requirements
    revenueGoals: '',
    timeframe: '',
    budgetRange: '',
    integrationNeeds: '',
    customRequirements: '',
    executiveSupport: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Submit application to backend
      const response = await fetch(API_ENDPOINTS.ELITE_APPLICATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          submittedAt: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('There was an error submitting your application. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={formData.company}
                onChange={handleInputChange('company')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Industry"
                value={formData.industry}
                onChange={handleInputChange('industry')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Team Size"
                value={formData.teamSize}
                onChange={handleInputChange('teamSize')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Annual Revenue"
                value={formData.currentRevenue}
                onChange={handleInputChange('currentRevenue')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Territory Size"
                value={formData.territorySize}
                onChange={handleInputChange('territorySize')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current CRM/Sales Tools"
                value={formData.currentCRM}
                onChange={handleInputChange('currentCRM')}
                multiline
                rows={2}
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Pain Points & Challenges"
                value={formData.painPoints}
                onChange={handleInputChange('painPoints')}
                multiline
                rows={3}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Revenue Goals (Next 12 Months)"
                value={formData.revenueGoals}
                onChange={handleInputChange('revenueGoals')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Implementation Timeframe"
                value={formData.timeframe}
                onChange={handleInputChange('timeframe')}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Integration Requirements"
                value={formData.integrationNeeds}
                onChange={handleInputChange('integrationNeeds')}
                multiline
                rows={2}
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Custom Requirements & Special Needs"
                value={formData.customRequirements}
                onChange={handleInputChange('customRequirements')}
                multiline
                rows={3}
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Executive Support & Decision Timeline"
                value={formData.executiveSupport}
                onChange={handleInputChange('executiveSupport')}
                multiline
                rows={2}
                required
                sx={{ '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
            </Grid>
          </Grid>
        );
      
      default:
        return 'Unknown step';
    }
  };

  if (submitted) {
    return (
      <EliteContainer>
        <StarryBackground />
        <NavBar />
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 6,
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#00ffc6',
                fontWeight: 700,
                mb: 3,
                fontFamily: "'Space Grotesk', Arial, sans-serif"
              }}
            >
              Application Submitted!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                lineHeight: 1.6
              }}
            >
              Thank you for your Elite application. Our team will review your submission and contact you within 24 hours to schedule your strategy consultation.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mb: 4
              }}
            >
              In the meantime, check your email for our Elite Welcome Package with exclusive resources.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => window.location.href = '/'}
              sx={{
                background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
                px: 4,
                py: 2,
                borderRadius: '50px',
                fontWeight: 600
              }}
            >
              Return to Homepage
            </Button>
          </Paper>
        </Container>
      </EliteContainer>
    );
  }

  return (
    <EliteContainer>
      <StarryBackground />
      <NavBar />
      <Container maxWidth="lg">
        <EliteHeader>
          Elite Application
        </EliteHeader>
        
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            mb: 6,
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          Join the Elite Inner Circle. This exclusive tier is reserved for top performers ready to dominate their markets with unlimited AI power and personal strategy support.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4
          }}
        >
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.7)' } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </EliteContainer>
  );
}