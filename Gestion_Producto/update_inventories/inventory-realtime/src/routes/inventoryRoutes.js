const express = require('express');
const { getAllItems } = require('../controllers/inventoryController');

const router = express.Router();

/**
 * Routes for inventory management.
 */
router.get('/inventory', getAllItems);

module.exports = router;
