const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  displayName: {
    type: String,
    default:'',
  },
  googleID: {
    type: String,
  },
  activePenaltyPoints: {
    type: Number,
  },
  paidPenaltyPoints: {
    type: Number,
  },
  hourlyRate: {
    type: Number,
  },
  currency: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
