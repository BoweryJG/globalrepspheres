const webpack = require('webpack');

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = function override(config, env) {
  // Create React App already handles REACT_APP_ env vars, so we just need to ensure they're available
  console.log('Environment variables check:');
  console.log('REACT_APP_OPENROUTER_API_KEY:', process.env.REACT_APP_OPENROUTER_API_KEY ? 'Set' : 'Not set');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  return config;
};
