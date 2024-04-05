// This file stores all the API endpoints for making calls to the "clients" collection in the MongoDB database

// Import functionalities
const express = require('express');
const router = express.Router();

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

const app = require('../app.js');

const pool = require('../DbConnection.js');


app.get('/Trackorder/get', (req, res) => {
  const clientId = req.params.id;

  // Construct the SQL query to fetch data from the database
  const sql = 'SELECT * FROM Purchase_Order';

  // Execute the query
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'Failed to fetch data from database' });
      return;
    }

    // Check if any rows were returned by the query
    if (results.length === 0) {
      // No rows were returned, indicating the entry with the provided ID doesn't exist
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    // Data fetched successfully
    const clientData = results; // Assuming only one row is expected
    res.status(200).json(clientData);
  });
});


module.exports = router;