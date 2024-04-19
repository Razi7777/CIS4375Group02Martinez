const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../DbConnection'); // Ensure this path is correct.

// API endpoint to handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to select the user from the database
  const query = 'SELECT * FROM users WHERE username = ?'; // Adjust the table name as necessary

  pool.query(query, [username], async (error, results) => {
    if (error) {
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    // User exists, now we check the password
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user.id, // Use a unique attribute from the user record
      name: user.name, // This and other fields depend on your database schema
      role: user.role
    };

    // Sign the JWT token and populate the payload with the user id, name, and role
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, // Make sure to have your JWT_SECRET in your .env file
      { expiresIn: '30d' } // Consider shortening this duration for better security practices
    );

    // Send the JWT token to the client
    res.json({ token });
  });
});

module.exports = router;
