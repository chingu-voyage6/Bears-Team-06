const router = require('express').Router();
const Goal = require('../models/goal');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jwt-simple');

//post goal
router.post('/submit', function(req, res) {
  const {goal, bounty_amount, non_profit, due_date } = req.body;
  const user_id = req.user._id;

    //is user set
    if(!user_id){
      res.status(500).send({ message: 'no user set' });
      return;
    }

    // create new goal
     var userGoal = new Goal();

     userGoal.user_id = user_id;
     userGoal.goal = goal;
     userGoal.bounty_amount = bounty_amount;
     userGoal.non_profit = non_profit;
     userGoal.due_date = due_date;
    // save the goal
    userGoal.save(function(err, savedGoal) {
      if (err) {
        res.status(500).send({ message: 'error adding goal to db' });
        return;
      }
      res.status(200).json({savedGoal});
    });
 });

//get all goals
router.get('/', function(req, res) {
  const user_id = req.user._id;
     // if no user set
     if(!user_id){
       res.status(500).send({ message: 'no user set' });
       return;
     }

     //find all goals for one user
     Goal.find({user_id:user_id } , function(err, goals){
       if (err) {
          res.status(500).send({ message: 'error getting goals' });
          return;
        }

        if(goals.length < 1){
          res.status(500).send({ message: 'user has no goals' });
          return;
        }

        res.status(200).json({goals});
    });
});


module.exports = router;
