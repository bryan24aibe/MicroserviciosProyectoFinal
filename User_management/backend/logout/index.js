const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/logout', (req, res) => {
  res.status(200).json({ Status: 'Success', Message: 'Logged out successfully' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
