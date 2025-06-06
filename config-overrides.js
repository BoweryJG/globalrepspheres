const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function override(config, env) {
  // Add chatbot entry point
  config.entry = {
    main: config.entry,
    chatbot: path.resolve(__dirname, 'src/chatbot.js')
  };

  // Update output to use proper naming
  config.output.filename = 'static/js/[name].[contenthash:8].js';

  // Add HtmlWebpackPlugin for chatbot
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['chatbot'],
      template: path.resolve(__dirname, 'public/chatbot.html'),
      filename: 'chatbot.html',
      ...(env === 'production'
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined),
    })
  );

  // Update the main HTML plugin to only include main chunks
  const htmlPlugin = config.plugins.find(
    plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
  );
  if (htmlPlugin) {
    htmlPlugin.userOptions.chunks = ['main'];
  }

  return config;
};