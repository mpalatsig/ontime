const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamUserRelationSchema = new Schema({
  teamID: {type: Schema.Types.ObjectId, ref:'Team'},
  userID: {type: Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const TeamUserRelation = mongoose.model('TeamUserRelation', teamUserRelationSchema);
module.exports = TeamUserRelation;
