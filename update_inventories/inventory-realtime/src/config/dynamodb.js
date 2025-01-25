const AWS = require('aws-sdk');
const { awsRegion } = require('./env');

/**
 * Initialize DynamoDB client.
 */
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: awsRegion,
});

module.exports = dynamoDB;
