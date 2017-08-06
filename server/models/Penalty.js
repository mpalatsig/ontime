const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penaltySchema = new Schema({
  payer: {
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  eventID: {
    type: Schema.Types.ObjectId,
    ref:'Event',
  },
  teamID: {
    type: Schema.Types.ObjectId,
    ref:'Team'
  },
  currencyUnit: {
    type: String,
    default: 'EUR'
  },
  currencyUnitAmount: {
    type: Number,
    default: 1
  },
  totalPenalty: {
    type: Number
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Penalty = mongoose.model('Penalty', penaltySchema);
module.exports = Penalty;
