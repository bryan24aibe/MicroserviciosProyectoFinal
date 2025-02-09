const dynamoDB = require('../config/dynamodb');

/**
 * Fetch all inventory items from DynamoDB.
 */
const getAllItems = async (req, res) => {
  try {
    const params = {
      TableName: 'Inventory',
    };
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
};

module.exports = { getAllItems };
