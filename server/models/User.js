const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  displayName: String,
  googleID: String,
  activePenaltyPoints: Number,
  paidPenaltyPoints: Number,
  hourlyRate: Number,
  currency: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
