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
    default:'',
  },
  activePenaltyPoints: {
    type: Number,
    default: 0,
  },
  paidPenaltyPoints: {
    type: Number,
    default: 0,
  },
  hourlyRate: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default:'',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
