// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

const authRoutes    = require('./routes/auth_routes');
const passportSetup = require('./config/passport_setup');


const app            = express();

const port = 3000;

//login route
app.use('/auth',authRoutes);


app.listen(port, () => {
  console.log('We are live on ' + port);
});
