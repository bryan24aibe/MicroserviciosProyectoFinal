const express = require('express');
const { port } = require('./config/env');
const inventoryRoutes = require('./routes/inventoryRoutes');
const initializeWebSocket = require('./services/websocketService');

const app = express();

// Middleware
app.use(express.json());

// API routes
app.use('/api', inventoryRoutes);

// Start server
const server = app.listen(port, () => {
  console.log(`Server running at ws://localhost:${port}`);
});

// Initialize WebSocket server
initializeWebSocket(server);
