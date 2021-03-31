// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const port = 3000;

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
////////////////////////////////////////////////////////////////////////////////////


// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route