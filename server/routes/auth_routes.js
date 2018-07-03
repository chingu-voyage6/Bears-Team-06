const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user_model');

//is authenticated
router.get("/isAuthenticated",function(req,res){
	if (req.isAuthenticated()){
		res.json({
			userId: req.user._id,
			username: req.user.username,
			isAuthenticated: true
		});
	} else {
		res.json({
			userId: null,
			username: null,
			isAuthenticated: false
		});
	}
});

//auth with google
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',
  passport.authenticate('google', function(req,res){
  	// console.log(req.user);
  	res.json({
  		userId: req.user._id,
  		username: req.user.username,
  		isAuthenticated: true
  	});
 });

//auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',
  passport.authenticate('facebook', function(req,res){
  	// console.log(req.user);
  	res.json({
  		userId: req.user._id,
  		username: req.user.username,
  		isAuthenticated: true
  	});
  });

//login with email
router.post("/login",passport.authenticate('local') ,function(req,res){
	// console.log(req.user);
	res.json({
		userId: req.user._id,
		username: req.user.username,
		isAuthenticated: true
	});
});
//signup with email
router.post("/signup",function(req,res){
	const newUser = req.body;
	User.register(newUser,newUser.password,(err,user)=>{
		if (err){ return res.json(err.message); }
		res.json({
			userId: user._id,
			username: user.username,
			isAuthenticated: true
		});
	});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.json();
});

module.exports = router;
