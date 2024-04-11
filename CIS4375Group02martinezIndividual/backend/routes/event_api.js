/* eslint-disable prettier/prettier */
const express = require('express');
/*const db = require('../DbConnection');*/

/*const bodyParser = require('body-parser');*/
const pool = require('../DbConnection.js');
const app = require('../app.js');
const router = express.Router();

// Get all events
/*router.get('/events', (req, res) => {
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
});*/

app.get('/api/events', (req, res) => {
  // Construct the SQL query to fetch data from the database
  const query = `
    SELECT e.*, ec.Event_Category, es.Event_Status
    FROM Event e
    JOIN Event_Category ec ON e.Event_Category_ID = ec.Event_Category_ID
    JOIN Event_Status es ON e.Event_Status_ID = es.Event_Status_ID
  `;

  // Execute the query
  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});


// Create a new event
/*router.post('/api/events', (req, res) => {
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
});*/

app.post('/api/events', (req, res) => {
  const { Event_Date, Address, City, Zipcode, Event_Description, Event_Category_ID, Event_Status_ID } = req.body;

  const query = `
    INSERT INTO Event (Event_Date, Address, City, Zipcode, Event_Description, Event_Category_ID, Event_Status_ID, State_Province_Territory_ID)
    VALUES (?, ?, ?, ?, ?, ?, ?, 48)
  `;
  const values = [Event_Date, Address, City, Zipcode, Event_Description, Event_Category_ID, Event_Status_ID];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Event created successfully', id: result.insertId });
  });
});

// Update an event
/*router.put('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { Event_Status_ID, Event_Category_ID, Event_Date, Event_Description, Address, City, Zipcode } = req.body;

  const query = `
    UPDATE Event
    SET Event_Status_ID = COALESCE(?, Event_Status_ID),
        Event_Category_ID = COALESCE(?, Event_Category_ID),
        Event_Date = COALESCE(?, Event_Date),
        Event_Description = COALESCE(?, Event_Description),
        Address = COALESCE(?, Address),
        City = COALESCE(?, City),
        Zipcode = COALESCE(?, Zipcode)
    WHERE Event_ID = ?
  `;
  const values = [Event_Status_ID, Event_Category_ID, Event_Date, Event_Description, Address, City, Zipcode, eventId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Event updated successfully' });
  });
});*/

app.put('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { Event_Status_ID, Event_Category_ID, Event_Date, Event_Description, Address, City, Zipcode } = req.body;

  const query = `
    UPDATE Event
    SET Event_Status_ID = COALESCE(?, Event_Status_ID),
        Event_Category_ID = COALESCE(?, Event_Category_ID),
        Event_Date = COALESCE(?, Event_Date),
        Event_Description = COALESCE(?, Event_Description),
        Address = COALESCE(?, Address),
        City = COALESCE(?, City),
        Zipcode = COALESCE(?, Zipcode)
    WHERE Event_ID = ?
  `;
  const values = [Event_Status_ID, Event_Category_ID, Event_Date, Event_Description, Address, City, Zipcode, eventId];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Event updated successfully' });
  });
});

module.exports = router;