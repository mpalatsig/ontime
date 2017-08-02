const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penaltySchema = new Schema({
  payer: String, // this should be a ref to User
  eventID: String, // this should be a ref to Event
  currencyUnit: String, 
  currencyUnitAmount: Number,
  totalPenalty: Number

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Penalty = mongoose.model('Penalty', penaltySchema);
module.exports = Penalty;
