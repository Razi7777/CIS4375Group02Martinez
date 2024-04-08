/* eslint-disable prettier/prettier */
const express = require('express');
const db = require('../DbConnection');

const router = express.Router();

// Get all events
router.get('/events', (req, res) => {
  const query = `
    SELECT e.*, ec.Event_Category, es.Event_Status
    FROM Event e
    JOIN Event_Category ec ON e.Event_Category_ID = ec.Event_Category_ID
    JOIN Event_Status es ON e.Event_Status_ID = es.Event_Status_ID
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Create a new event
router.post('/events', (req, res) => {
  const { Event_Date, Address, City, Zipcode, Event_Description, Event_Category_ID, Event_Status_ID } = req.body;

  const query = `
    INSERT INTO Event (Event_Date, Address, City, Zipcode, Event_Description, Event_Category_ID, Event_Status_ID, State_Province_Territory_ID)
    VALUES (?, ?, ?, ?, ?, ?, ?, 48)
  `;
  const values = [Event_Date, Address, City, Zipcode, Event_Description, Event_Category_ID, Event_Status_ID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Event created successfully', id: result.insertId });
  });
});

// Update an event
router.put('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { Event_Status_ID } = req.body;

  const query = `
    UPDATE Event
    SET Event_Status_ID = ?
    WHERE Event_ID = ?
  `;
  const values = [Event_Status_ID, eventId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Event updated successfully' });
  });
});

module.exports = router;