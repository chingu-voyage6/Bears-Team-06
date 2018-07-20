const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');


const passport       = require('passport');
const passportSetup  = require('./config/passport_setup');
const keys           = require('./config/pass_keys');
const session        = require('express-session');

const app            = express();

const port = 3000;

//connect to db
mongoose.connect(keys.mongodb.dbURI, ()=>{
  console.log("connected");
})

 app.use(bodyParser.json()); // support json encoded bodies
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// For Passport
app.use(session({ secret: 'secret',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use((req, res, next) => {req.user = req.session.user; next()})



//login routes
const authRoutes     = require('./routes/auth_routes');
const goalRoutes     = require('./routes/goal_routes');
app.use('/auth',authRoutes);
app.use('/goal',goalRoutes);


app.listen(port, () => {
  console.log('We are live on ' + port);
});
