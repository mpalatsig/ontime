const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  gCalendarID: String,
  summary: String,
  description: String,
  team: String, // this should be a ref to Team
  userOrganizer: String, // this should be a ref to User
  attendees: String, // this should be an array of refs to User
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
