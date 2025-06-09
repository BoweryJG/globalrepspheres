import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const EnvTest = () => {
  // Test all environment variables
  const envVars = {
    REACT_APP_OPENROUTER_API_KEY: process.env.REACT_APP_OPENROUTER_API_KEY,
    REACT_APP_BRAVE_API_KEY: process.env.REACT_APP_BRAVE_API_KEY,
    REACT_APP_GA_ID: process.env.REACT_APP_GA_ID,
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  // Check if any REACT_APP_ variables exist in process.env
  const allEnvKeys = Object.keys(process.env);
  const reactAppKeys = allEnvKeys.filter(key => key.startsWith('REACT_APP_'));

  return (
    <Paper sx={{ p: 4, m: 4 }}>
      <Typography variant="h4" gutterBottom>
        Environment Variables Test
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Expected Environment Variables:
        </Typography>
        {Object.entries(envVars).map(([key, value]) => (
          <Typography key={key} sx={{ fontFamily: 'monospace', mb: 1 }}>
            {key}: {value ? `${value.substring(0, 10)}...` : 'UNDEFINED'}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          All REACT_APP_ keys found in process.env:
        </Typography>
        {reactAppKeys.length > 0 ? (
          reactAppKeys.map(key => (
            <Typography key={key} sx={{ fontFamily: 'monospace', mb: 1 }}>
              {key}: {process.env[key]?.substring(0, 10)}...
            </Typography>
          ))
        ) : (
          <Typography color="error">
            No REACT_APP_ environment variables found!
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Debug Info:
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', mb: 1 }}>
          Total env keys: {allEnvKeys.length}
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', mb: 1 }}>
          Working directory: {window.location.origin}
        </Typography>
      </Box>
    </Paper>
  );
};

export default EnvTest;