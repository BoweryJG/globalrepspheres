const webpack = require('webpack');
require('dotenv').config();

module.exports = function override(config, env) {
  // Ensure environment variables are injected
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_OPENROUTER_API_KEY': JSON.stringify(process.env.REACT_APP_OPENROUTER_API_KEY),
      'process.env.REACT_APP_BRAVE_API_KEY': JSON.stringify(process.env.REACT_APP_BRAVE_API_KEY),
      'process.env.REACT_APP_GA_ID': JSON.stringify(process.env.REACT_APP_GA_ID),
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY),
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL)
    })
  );
  
  return config;
};
