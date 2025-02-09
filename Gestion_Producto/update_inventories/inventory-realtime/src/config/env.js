require('dotenv').config();

/**
 * Environment configuration with default values.
 */
const config = {
  port: process.env.PORT || 3000,
  awsRegion: process.env.AWS_REGION || 'us-east-1',
};

module.exports = config;
