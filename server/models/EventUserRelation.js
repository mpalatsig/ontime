const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventUserRelationSchema = new Schema({
  eventID: {
    type: Schema.Types.ObjectId,
    ref:'Event'
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  arrivalDate: {
    type: Date, 
    default: null
  },
  timeLate: {
    type: Number,
    default: null
  },
  computed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const EventUserRelation = mongoose.model('EventUserRelation', eventUserRelationSchema);
module.exports = EventUserRelation;
