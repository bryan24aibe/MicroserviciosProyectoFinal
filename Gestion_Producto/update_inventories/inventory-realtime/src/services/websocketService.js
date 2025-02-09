const WebSocket = require('ws');

/**
 * Initialize WebSocket server.
 * @param {Object} server - HTTP server instance.
 */
const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log('Message received:', message);
      ws.send(`Echo: ${message}`); // Echo the message back
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server initialized');
};

module.exports = initializeWebSocket;
