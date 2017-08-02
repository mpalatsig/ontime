const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventUserRelationSchema = new Schema({
  eventID: String, // this should be a ref to Event
  userID: String, // this should be a ref to User

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const EventUserRelation = mongoose.model('EventUserRelation', eventUserRelationSchema);
module.exports = EventUserRelation;
