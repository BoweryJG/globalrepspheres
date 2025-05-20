import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Podcasts from './components/Podcasts';

export default function PodcastPage() {
  return (
    <>
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #7B42F6 0%, #00ffc6 100%)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            RepSpheres Podcast
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Insights, interviews and strategies for elite sales reps.
          </Typography>
        </Container>
      </Box>
      <Podcasts />
    </>
  );
}
