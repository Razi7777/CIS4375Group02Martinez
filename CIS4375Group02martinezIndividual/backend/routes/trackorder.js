
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
app.get('/purchaseorder/get', (req, res) => {
  const purchaseId = req.params.id;

  // Construct the SQL query to fetch data from the database
  const sql =  `SELECT Purchase_Order.*, Customer.Customer_Name, Product.Product_Name, Product.Price FROM Purchase_Order JOIN Customer ON Purchase_Order.Customer_ID = Customer.Customer_ID JOIN Product ON Purchase_Order.Product_ID = Product.Product_ID ORDER BY Purchase_Order_ID`;

;

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
    const purchaseData = results; 
    res.status(200).json(purchaseData);
  });
});

//get request to get access to state/province/territory entries 
app.get('/customername/get', (req, res) => {
  const clientId = req.params.id;

  // Construct the SQL query to fetch data from the database
  const sql = 'SELECT * FROM Customer';

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
    const CustomerData = results; 
    res.status(200).json(CustomerData);
  });
});

app.get('/productname/get', (req, res) => {
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
    const ProductData = results; 
    res.status(200).json(ProductData);
  });
});



app.post('/purchaseorder/Post', function(req, res) {
  // Data from Clientspage
  const purchaseData = req.body;
  console.log(req.body);

  //this is the utilization of pool.query, creating an array of values allows us to pass this array into [[values]] and insert them into our sqlquery
  const values = [
    purchaseData.Purchase_Order_Date,
    purchaseData.Purchase_Order_Category_ID,
    purchaseData.Purchase_Order_Status_ID,
    purchaseData.Customer_ID,
    purchaseData.Product_ID,
  ];

  // SQL query to insert data into the Customer table
  const sql = 'INSERT INTO Purchase_Order (Purchase_Order_Date, Purchase_Order_Category_ID, Purchase_Order_Status_ID, Customer_ID, Product_ID) VALUES ?';

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

app.put('/purchaseorder/Put/:id', function(req, res) {

  const purchaseId = req.params.id;


  const purchaseData = req.body;


  const values = [
    purchaseData.Purchase_Order_Date,
    purchaseData.Purchase_Order_Category_ID,
    purchaseData.Purchase_Order_Status_ID,
    purchaseData.Customer_ID,
    purchaseData.Product_ID,
    purchaseId 
  ];


  const sql = 'UPDATE Purchase_Order SET Purchase_Order_Date = ?, Purchase_Order_Category_ID = ?, Purchase_Order_Status_ID = ?, Customer_ID = ?, Product_ID = ?  WHERE Purchase_Order_ID = ?';

 
  pool.query(sql, values, function(error, results, fields) {
    if (error) {
      console.error('Error updating data in database:', error);
      res.status(500).json({ error: 'Failed to update data in database' });
      return;
    }


    if (results.affectedRows === 0) {
    
      res.status(404).json({ error: 'Customer not found' });
      return;
    }


    res.status(200).json({ message: 'Data updated successfully' });
  });
});

//delete api, similar structure to the post one
app.delete('/purchaseorder/Delete/:id', function(req, res) {
  const purchaseId = req.params.id;

  // SQL query to delete data from the Customer table based on Customer_ID
  const sql = 'DELETE FROM Purchase_Order WHERE Purchase_Order_ID = ?';

  // Execute the query
  pool.query(sql, [purchaseId], function(error, results, fields) {
    if (error) {
      console.error('Error deleting data from database:', error);
      res.status(500).json({ error: 'Failed to delete data from database' });
      return;
    }

    // Check if any rows were affected by the query
    if (results.affectedRows === 0) {
      // No rows were affected, indicating the customer with the provided ID doesn't exist
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    // Data deleted successfully
    res.status(200).json({ message: 'Data deleted successfully' });
  });
});



module.exports = router;
























// importing data model schemas
//const { clients, events } = require('../models/models');
//const { ObjectId } = require('mongodb');

//reading the org id from the environment variable
//const org = process.env.ORG_ID;

//API Endpoint to Get all clients
/*router.get('/', authMiddleWare, async (req, res) => {
 try {
    const cli = await clients.find({});
    res.json(cli);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API endpoint to GET single client by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  clients.findOne({ _id : req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Client not found');
    } else {
      res.json(data);
    }
  });
});

 //API endpoint to GET entries based on search query
 Ex: '...?firstName=Bob&lastName=&searchBy=name'
 router.get('/search', authMiddleWare, (req, res, next) => {
  const dbQuery = { orgs: org };
  let queryArray = [];
  let regexOptions = 'i';

  switch (req.query.searchBy) {
    case "name":
      if (req.query.firstName) {
        const firstNameRegex = new RegExp(
          `.*${req.query.firstName}.*`,
          regexOptions
        );
        queryArray.push({ firstName: { $regex: firstNameRegex } });
      }
      if (req.query.lastName) {
        const lastNameRegex = new RegExp(
          `.*${req.query.lastName}.*`,
          regexOptions
        );
        queryArray.push({ lastName: { $regex: lastNameRegex } });
      }
     break;
    case "number":
      if (req.query.phoneNumber) {
        const phoneNumberRegex = new RegExp(
          `.*${req.query.phoneNumber}.*`,
          regexOptions
        );
        queryArray.push({
          "phoneNumber.primary": { $regex: phoneNumberRegex },
        });
      }
      break;
    default:
      return res.status(400).send("invalid searchBy");
  }

  dbQuery["$and"] = queryArray;
  clients.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
  });

 //POST create new client
router.post('/', authMiddleWare, (req, res, next) => {
  const newClient = req.body;
  newClient.orgs = [org];
  clients.create(newClient, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("New client created successfully");
    }
  });
});

 //API endpoint to PUT update client
router.put("/update/:id", authMiddleWare, (req, res, next) => {
  clients.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (!data)
        res.status(400).send("Client not found.")
      else
        res.status(201).send("Client updated successfully");
    }
  });
});

// API endpoint to hard delete client by ID, can be only be done if client is not signed up for events
router.delete("/:id", authMiddleWare, (req, res, next) => {
  clients.findOne({ _id : req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send("Client not found");
    } else {
      events.find({ attendees: req.params.id, org: org }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          // only delete event if no client is not signed up for any event
          if (data.length === 0)
            clients.findByIdAndDelete(req.params.id, (error, data) => {
              if (error) {
                return next(error);
              } else if (!data) {
                res.status(400).send('Client not found');
              } else {
                res.status(200).send("Client deleted successfully");
              }
            });
          else 
            res.status(406).send("Client is signed up for events and can't be deleted.");
        }
      });
    }
  });
});

// GET clients by zip code for dashboard
router.get('/byzip', (req, res, next) => {
  clients.aggregate(
    [
      {
        $match: {
          "address.zip": { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$address.zip",
          count: { $sum: 1 }
        }
      }
    ],
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json(data);
      }
    }
  );
});
*/
module.exports = router;

