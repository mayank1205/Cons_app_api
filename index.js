// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const users = require('./src/routes/users');
const company = require('./src/routes/company');
const sites = require('./src/routes/sites');
const verifyToken = require('./src/middleware/verify');

// defining the Express app
const app = express();
require("dotenv").config();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

// defining an endpoint to return all ads
app.use('', users);
app.use('/company', verifyToken, company);
app.use('/sites', verifyToken, sites);

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
