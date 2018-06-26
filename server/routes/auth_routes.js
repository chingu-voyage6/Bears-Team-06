const router = require('express').Router();
const passport = require('passport');

//auth logout
router.get('logout', (req, res) => {
    res.send("log out");
});

//auth with google
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
