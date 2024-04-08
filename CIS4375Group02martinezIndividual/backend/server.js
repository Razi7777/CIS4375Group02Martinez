/* eslint-disable prettier/prettier */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/event_api');
const db = require('./DbConnection');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
      process.exit(1);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});