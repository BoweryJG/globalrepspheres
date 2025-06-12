import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';

const socialProofMessages = [
  "🔥 Sarah from Dallas just upgraded to Enterprise",
  "💪 Mike in Chicago closed 3 deals using Growth features",
  "🚀 47 new reps joined RepSpheres today",
  "⚡ Jennifer from Miami hit 200% quota with Professional",
  "🎯 Tech team in Austin switched from competitor - saving $5k/month",
  "📈 David's team increased close rate by 42% in first month",
  "✨ Amanda just unlocked her 5th territory with Explorer",
  "🏆 Top performer in Boston credits Elite tier for $1.2M year",
  "💎 3 Enterprise teams onboarded this week",
  "🔥 Real-time: Marcus just closed $75k deal using Canvas brief"
];

export default function SocialProofTicker() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % socialProofMessages.length);
        setShow(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mb: 4, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Fade in={show} timeout={500}>
        <Typography
          sx={{
            fontFamily: "'DM Sans', Arial, sans-serif",
            color: '#00ffc6',
            fontSize: '0.9rem',
            textAlign: 'center',
            px: 2,
          }}
        >
          {socialProofMessages[currentMessage]}
        </Typography>
      </Fade>
    </Box>
  );
}