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
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({
      userId: req.user._id,
      username: req.user.name,
      email: req.user.email,
      token: tokenForUser(req.user._id),
    });
  },
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
);
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({
      userId: req.user._id,
      username: req.user.name,
      email: req.user.email,
      token: tokenForUser(req.user._id),
    });
  },
);

router.post('/login', passport.authenticate('login'), function(
  err,
  user,
  info,
) {
  // console.log(req.user);
  res.json({
    userId: req.user._id,
    username: req.user.name,
    email: req.user.email,
    token: tokenForUser(req.user._id),
  });
});
//signup with email
router.post('/signup', function(req, res) {
  const { email, password } = req.body;

  //* Validate email + password

  /**
   * * Find user with this email
   * * if user exists -> error
   * * if not -> create new user
   */

  //* Response
  res.status(200).send({ message: 'data received' });
  // const newUser = req.body;
  // User.findOne(newUser,newUser.password,(err,user)=>{
  // 	if (err){ return res.json(err.message); }
  // 	res.json({
  // 		userId: req.user._id,
  // 		username: req.user.email,
  // 		email: req.user.email,
  // 		token: tokenForUser(req.user._id)
  // 	});

  // });
});

module.exports = router;
