const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  gCalendarID: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: 'New Event'
  },
  description: {
    type: String,
    default: ''
  },
  team: {
    type: Schema.Types.ObjectId,
    ref:'Team',
  },
  userOrganizer: {
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  attendees: [Schema.Types.Mixed], // this should be an array of refs to User when the schema type is User
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: false,
  },
  penaltyAmount: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
