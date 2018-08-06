const router = require('express').Router();
const Goal = require('../models/goal');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jwt-simple');
const moment = require('moment');

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
     userGoal.last_check_in = moment().format("YYYY-MM-DD");
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
router.get('/check', function(req, res) {
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

//daily checkin for goal
router.post('/checkin', function(req, res) {
  const user_id = req.user._id;
  const goal = req.body.goal;

     // if no user set
     if(!user_id){
       res.status(500).send({ message: 'no user set' });
       return;
     }

     // if no goal set
     if(!goal){
       res.status(500).send({ message: 'no goal set' });
       return;
     }

     //find the goal for one user
     Goal.findOne({user_id:user_id, goal:goal} , function(err, goals){
       if (err) {
          res.status(500).send({ message: 'error getting goals' });
          return;
        }

        var yesterday     = moment().subtract(1, 'days').format("YYYY-MM-DD");
        var today         = moment().format("YYYY-MM-DD");
        var last_check_in = moment(goals.last_check_in).format('YYYY-MM-DD');
        var due_date      = moment(goals.due_date).format('YYYY-MM-DD');

        //was last checkin yesterday and not today(already checked in)
        if(last_check_in != yesterday && last_check_in != today){
          res.status(500).send({ message: 'O dear! You missed a check in on your goal. You have failed.' });
          return;
        }

        //is today equal to due date
        if(today == due_date){
          goals.last_check_in = moment().format("YYYY-MM-DD");
          res.status(200).send({ message: 'Congratulations! You have completed your goal.' });
          return;
        }

        //if last checkin was yesterday
        if(last_check_in == yesterday){
          goals.last_check_in = moment().format("YYYY-MM-DD");
          res.status(200).send({ message: 'Successfully checked in for today. Keep up the great work!' });
          return;
        }
    });
});

module.exports = router;
