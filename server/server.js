const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');

const authRoutes    = require('./routes/auth_routes');


const keys           = require('./config/keys');
const session        = require('express-session');

const app            = express();

const port = 3000;

//connect to db
mongoose.connect(keys.mongodb.dbURI, ()=>{
  console.log("connected");
})


// For Passport
app.use(session({ secret: 'secret',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
const passportSetup = require('./config/passport_setup');


//login routes
app.use('/auth',authRoutes);


app.listen(port, () => {
  console.log('We are live on ' + port);
});
