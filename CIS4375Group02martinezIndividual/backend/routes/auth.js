// auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../DbConnection'); // Adjust the path if necessary
const router = express.Router();

router.post('/login', (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Check username and password against the database
  pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      // Handle error after the release.
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(401).send('Incorrect username or password');
    }

    // Compare submitted password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) {
      return res.status(401).send('Incorrect username or password');
    }

    // If password matches, create a token
    const token = jwt.sign(
      { userId: results[0].id },
      'secret_key', // Use an environment variable for the secret key
      { expiresIn: '1h' }
    );

    // Send the token to the client
    res.status(200).json({
      token: token,
      userId: results[0].id
    });
  });
});

module.exports = router;
