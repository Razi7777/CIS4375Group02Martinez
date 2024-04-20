/* eslint-disable prettier/prettier */
const express = require('express');
const crypto = require('crypto');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
console.log('JWT Secret:', process.env.JWT_SECRET);


// creates a new instance of express application
const app = express();
app.use(express.json()); // Ensure JSON parsing is enabled
app.use(helmet()); // Set security-related HTTP headers
app.use(cors({
    origin: process.env.CORS_ORIGIN // Define allowed origins in your .env file
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per window
});
app.use(limiter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


const pool = require('./DbConnection.js');

const allowedOrigins = [
  'http://localhost:3000',  // Your server port
  'http://localhost:5173',  // Your Vue app port
  // Add any other origins you want to allow
];

app.use(cors(corsOptions));


const userRoutes = require('./routes/users'); // The file where your /login route is defined
app.use('/users', userRoutes);

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

// add cors header to the server
app.use(
  cors({
    origin: '*'
  })
);


function checkConnection() {
  pool.query('SELECT * FROM Purchase_Order;', (error, results, fields) => {
    if (error) {
      console.error('Error checking MySQL connection: ' + error.message);
      return;
    }
    console.log('MySQL connection is working. Result: ', results[0]);
  });
}

// Call the function to trigger the query
checkConnection();



// Function to hash passwords using crypto
function hashPassword(password) {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');
  // Hash the password with the salt
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hashedPassword };
}
// Example usage of the hashPassword function
const { salt, hashedPassword } = hashPassword('password123');
console.log('Salt:', salt);
console.log('Hashed Password:', hashedPassword);

module.exports = app;


app.use('/clients', require('./routes/clients'));
app.use('/events', require('./routes/events'));
app.use('/org', require('./routes/org'));
app.use('/services', require('./routes/services'));
app.use('/users', require('./routes/users'));
app.use('/trackorder', require('./routes/trackorder'));
app.use('/api/events', require('./routes/event_api'));
app.use('/products', require('./routes/product_api')); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});














// suppress mongoose warning to prepare for new version
//mongoose.set('strictQuery', false);

// sets up mongoose for the mongoDB connection
//mongoose
 // .connect(process.env.MONGO_URL)
 // .then(() => {
 //   console.log('Database connection Success!');
 // })
 // .catch((err) => {
  //  console.error('Mongo Connection Error', err);
 // });

// declare port number for the api


// setup and access request body
//app.use(express.json());
//app.use(morgan('dev'));

// setup middle ware for routes


// error handler
/*app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});*/
