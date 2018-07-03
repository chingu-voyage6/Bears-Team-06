const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const keys = require('./pass_keys');
const User = require('../models/user_model');

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({token: profile.id}).then((currentUser) => {
            if(currentUser){
                return done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    token: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    return done(null, newUser);
                });
            }
        });
    })
);

passport.use(
  new FacebookStrategy({
    clientID:keys.facebook.clientID,
    clientSecret:keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({facebookId: profile.id}).then((currentUser) => {
        if(currentUser){
            return done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                token: profile.id,
                username: profile.displayName
            }).save().then((newUser) => {
                return done(null, newUser);
            });
        }
    });
})
);

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        username: 'username',
        email:'email',
        password: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err) {
                return done(err);
            }

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });
}));

passport.use('local-login', new LocalStrategy({
    username: 'username',
    email:'email',
    password: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

    // if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err) {
            return done(err);
        }

        // if no user is found, return the message
        if (!user) {
            return done(null, false);
            //TODO:send a message about no user
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
            return done(null, false);
            //TODO:send a message about wrong password
        }

        // all is well, return successful user
        return done(null, user);
    });
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
