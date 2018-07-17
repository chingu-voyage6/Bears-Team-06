const passport  = require('passport');
const request = require('request');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const keys = require('./pass_keys');
const User = require('../models/user');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
      if (req.user) {
        User.findOne({ 'google.id': profile.id }, (err, existingUser) => {
          if (err) { return done(err); }
          if (existingUser) {
            done(err);
          } else {
            User.findById(req.user.id, (err, user) => {
              if (err) { return done(err); }
              user.google.id = profile.id;
              user.google.name = profile.displayName;
              user.google.token = accessToken;
              user.google.email = profile.emails[0].value;

              user.save((err) => {
                done(err, user);
              });
            });
          }
        });
      } else {
        User.findOne({ 'google.id': profile.id }, (err, existingUser) => {
          if (err) { return done(err); }
          if (existingUser) {
            return done(null, existingUser);
          }
          User.findOne({ 'google.email': profile.emails[0].value }, (err, existingEmailUser) => {
            if (err) { return done(err); }
            if (existingEmailUser) {
              done(err);
            } else {
              const user = new User();
              user.google.id = profile.id;
              user.google.name = profile.displayName;
              user.google.token = accessToken;
              user.google.email = profile.emails[0].value;

              user.save((err) => {
                done(err, user);
              });
            }
          });
        });
      }
    }));


passport.use(
  new FacebookStrategy({
    clientID:keys.facebook.clientID,
    clientSecret:keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['name', 'email'],
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ 'facebook.id': profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.facebook.id = profile.id;
          user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.facebook.token = accessToken;
          user.facebook.email = profile._json.email;

          user.save((err) => {
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ 'facebook.id': profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ 'facebook.email': profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          done(err);
        } else {
          const user = new User();
          user.facebook.id = profile.id;
          user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.facebook.token = accessToken;
          user.facebook.email = profile._json.email;

          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));


passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

    // if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err) {
          return done(err, {message: 'error in finding user'});
        }

        // if no user is found, return the message
        if (!user) {
          return done(null, false, {message: 'No user found'});
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect Password'});
        }

        // all is well, return successful user
        return done(null, user);
    });
}));
