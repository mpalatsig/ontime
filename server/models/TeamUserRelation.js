const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamUserRelationSchema = new Schema({
  teamID: String, // this should be a ref to Team
  userID: String, // this should be a ref to User

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const TeamUserRelation = mongoose.model('TeamUserRelation', teamUserRelationSchema);
module.exports = TeamUserRelation;
