const router = require('express').Router();
const passport = require('passport');

//auth logout
router.get('/logout', (req, res) => {

});

//auth with google
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',
  passport.authenticate('google', {
      successRedirect : '/profile',
      failureRedirect : '/signup'
  }));

//auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',
  passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/signup'
  }));

//login with email
router.post('/login',
   passport.authenticate('local', {
       successRedirect : '/profile',
       failureRedirect : '/signup'
   }));

//signup with email
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup'
    }));

module.exports = router;
