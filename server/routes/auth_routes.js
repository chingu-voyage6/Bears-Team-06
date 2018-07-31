const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jwt-simple');

// Generates a JWT token.
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user, iat: timestamp }, 'bears');
}

router.get(
  '/google',
  passport.authenticate('google', { scope: 'profile email' }),
);
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    res.json({
      userId: req.user._id,
      email: req.user.google.email,
      token: tokenForUser(req.user._id)
    });
  },
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
);
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  (req, res) => {
    res.status(200).json({
      userId: req.user._id,
      email: req.user.facebook.email,
      token: tokenForUser(req.user._id)
    });
  },
);

router.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(400).send(info);
      return;
    }
    //if user already exists or password error, return message
    if (!user) {
      res.status(400).send(info);
      return;
    }
    var jwt_payload = user._id;
    res.status(200).json({
      userId: user._id,
      email: user.local.email,
      token: tokenForUser(user._id)
    });
  })(req, res, next);
});

//signup with email
router.post('/signup', function(req, res) {
  const { username, email, password } = req.body;
  

  //* Validate email + password

  /**
   * * Find user with this email
   * * if user exists -> error
   * * if not -> create new user
   */

  //* Response
  User.findOne({ 'local.email': email }, function(err, user) {
    if (user) {
      res.status(400).send({ message: 'user already exists' });
      return;
    }

    // if there is no user with that email
    // create the user
    var user = new User();

    // set the user's local credentials
    user.local.email = email;
    user.local.password = user.generateHash(password);

    // save the user
    user.save(function(err, savedUser) {
      if (err) {
        res.status(500).send({ message: 'error adding user to db' });
        return;
      }

      res.status(200).json({
        userId: savedUser._id,
        email: savedUser.local.email,
        token: tokenForUser(savedUser._id)
      });
    });
  });
});


module.exports = router;
