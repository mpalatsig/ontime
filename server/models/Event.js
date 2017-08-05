const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  gCalendarID: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  team: {
    type: String, // this should be a ref to Team
    default: ''
  },
  userOrganizer: {
    type: Schema.Types.ObjectId,
    ref:'User',
  }, 
  attendees: {
    type: [String],
    default: ['']
  }, // this should be an array of refs to User
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

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
