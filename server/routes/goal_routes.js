const router = require('express').Router();
const Goal = require('../models/goal');
const User = require('../models/user');

//post goal
router.post('/submit', function(req, res) {
  const {goal, bounty_amount, non_profit, due_date } = req.body;

    //is user set
    if(!req.session || !req.user){
      res.status(500).send({ message: 'no user set' });
      return;
    }

    // create new goal
     var userGoal = new Goal();

     userGoal.user_id = req.session.user.id;
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

      res.status(200).json({
        userId: savedGoal.user_id,
        goalId: savedGoal._id,
        goal: savedGoal.goal,
        bounty_amount: savedGoal.bounty_amount,
        non_profit: savedGoal.non_profit,
        due_date: savedGoal.due_date
      });
    });
 });


module.exports = router;
