const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('keys');


passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
    },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID:keys.facebook.clientID,
    clientSecret:keys.facebook.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
