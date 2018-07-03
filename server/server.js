const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');

const authRoutes    = require('./routes/auth_routes');
const passportSetup = require('./config/passport_setup');

const keys           = require('./config/keys');
const app            = express();

const port = 3000;

//connect to db
mongoose.connect(keys.mongodb.dbURI, ()=>{
  console.log("connected");
})

//login routes
app.use('/auth',authRoutes);


app.listen(port, () => {
  console.log('We are live on ' + port);
});
