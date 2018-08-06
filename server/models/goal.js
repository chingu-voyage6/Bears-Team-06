const mongoose       = require('mongoose');

const Schema = mongoose.Schema;

var goalSchema = new mongoose.Schema({
  user_id: { type : Schema.ObjectId, ref : 'user' },
  goal: String,
  bounty_amount: Number,
  non_profit: String,
  due_date: Date,
  last_check_in: Date,
  created_at: { type: Date, default: Date.now }
});

const Goal = mongoose.model('goal', goalSchema);

module.exports = Goal;
