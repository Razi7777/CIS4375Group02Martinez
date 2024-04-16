
const express = require('express');
const router = express.Router();

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

const app = require('../app.js');
const bodyParser = require('body-parser');
const pool = require('../DbConnection.js');

//bodyparser is needed to parse json bodies for post request, otherwise you run into undefined errors
app.use(bodyParser.json());


//standard get request, can use clientID but not needed. 
app.get('/products/get', (req, res) => {
  const clientId = req.params.id;

  // Construct the SQL query to fetch data from the database
  const sql = 'SELECT * FROM Product';

  // Execute the query
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'Failed to fetch data from database' });
      return;
    }


    if (results.length === 0) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    // Data fetched successfully
    const clientData = results; 
    res.status(200).json(clientData);
  });
});
//get request to get access to state/province/territory entries 
app.get('/supplier/get', (req, res) => {
  const clientId = req.params.id;

  // Construct the SQL query to fetch data from the database
  const sql = 'SELECT * FROM Supplier';

  // Execute the query
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'Failed to fetch data from database' });
      return;
    }


    if (results.length === 0) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    // Data fetched successfully
    const clientData = results; 
    res.status(200).json(clientData);
  });
});

app.post('/products/Post', function(req, res) {
  // Data from Clientspage
  const ProductData = req.body;
  console.log(req.body);

  //this is the utilization of pool.query, creating an array of values allows us to pass this array into [[values]] and insert them into our sqlquery
  const values = [
    ProductData.Product_Name,
    ProductData.Product_Description,
    ProductData.Quantity,
    ProductData.Price,
    ProductData.Supplier_ID,
    ProductData.Product_Category_ID,
    ProductData.Product_Type_ID,
    ProductData.Product_Status_ID,

  ];

  // SQL query to insert data into the Customer table
  const sql = 'INSERT INTO Product (Product_Name, Product_Description, Quantity, Price, Supplier_ID, Product_Category_ID, Product_Type_ID, Product_Status_ID) VALUES ?';

 //query execution
  pool.query(sql, [[values]], function(error, results, fields) {
    if (error) {
      console.error('Error Inserting Data:', error);
      res.status(500).json({ error: 'Failed to insert data into database' });
      return;
    }

    // Data inserted successfully
    res.status(200).json({ message: 'Data inserted successfully!' });
  });
});

//put request here, using id as a parameter from the page

app.put('/products/Put/:id', function(req, res) {

  const ProductID = req.params.id;


  const ProductData = req.body;


  const values = [
    ProductData.Product_Name,
    ProductData.Product_Description,
    ProductData.Quantity,
    ProductData.Price,
    ProductData.Supplier_ID,
    ProductData.Product_Category_ID,
    ProductData.Product_Type_ID,
    ProductData.Product_Status_ID,
    ProductID
  ];


  const sql = 'UPDATE Product SET Product_Name = ?,  Product_Description = ?, Quantity = ?, Price = ?, Supplier_ID = ?, Product_Category_ID = ?, Product_Type_ID = ?, Product_Status_ID = ? WHERE Product_ID = ?';

 
  pool.query(sql, values, function(error, results, fields) {
    if (error) {
      console.error('Error updating data in database:', error);
      res.status(500).json({ error: 'Failed to update data in database' });
      return;
    }


    if (results.affectedRows === 0) {
    
      res.status(404).json({ error: 'Product not found' });
      return;
    }


    res.status(200).json({ message: 'Data updated successfully' });
  });
});

//delete api, similar structure to the post one
app.delete('/products/Delete/:id', function(req, res) {
  const productId = req.params.id;


  const sql = 'DELETE FROM Product WHERE Product_ID = ?';

  // Execute the query
  pool.query(sql, [productId], function(error, results, fields) {
    if (error) {
      console.error('Error deleting data from database:', error);
      res.status(500).json({ error: 'Failed to delete data from database' });
      return;
    }

    // Check if any rows were affected by the query
    if (results.affectedRows === 0) {
      // No rows were affected, indicating the customer with the provided ID doesn't exist
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Data deleted successfully
    res.status(200).json({ message: 'Data deleted successfully' });
  });
});



module.exports = router;

