const User = require('../models/User');
const Event = require('../models/Event');
const Team = require('../models/Team');
const TeamUserRelation = require('../models/TeamUserRelation');


module.exports = {
  /* GET team listing where the current user is listed*/
  index: (req,res,next) => {
    TeamUserRelation.find({userID: req.user._id})
    .exec().then(teamUserRelation => {
      let teamsPromise = [];
      teamUserRelation.forEach(e => {
        teamsPromise.push(
          new Promise((resolve,reject) => {
            e.populate('teamID',(err,teamPopulated) => {
              resolve(teamPopulated);
            });
          })
        );
      });
      Promise.all(teamsPromise).then(populatedTeamsResolved => {
        console.log(populatedTeamsResolved);
        res.status(200).json(populatedTeamsResolved);
      });
    })
    .catch(e => res.json(e));
},

  /* POST new team and create a teamUserRelation*/
  new: (req, res, next) => {
  const team = new Team ({
    teamName: req.body.teamName,
    members: req.body.members,
  });
  team.save().then(team => {
    const members = req.body.members.split(",");
    members.forEach( member => {
      User.findOne({email: member},(err,memberFound) => {
        if(memberFound !== null) {
          const teamUserRelation = new TeamUserRelation({
            teamID: team._id,
            userID: memberFound._id
          });
          teamUserRelation.save();
        }
      });
    });
			res.status(201).json({
        message: 'New team & teamUserRelation created!',
        id: team._id,
        teamName: team.teamName,
      });
	})
  .catch( e => res.json(e));
},

/* GET a single user */
get: (req,res,next) => {
    Team.findById(req.params.id).then(team =>{
      res.json(team);
    })
    .catch( e => res.json(e));
},

/* EDIT a single user */
edit: (req,res,next) => {

  Team.findById(req.params.id).then(team => {
    sumNewPenalties = team.penalties + req.body.penalties;

    let updates = {
      penalties: sumNewPenalties
     };

     Team.findByIdAndUpdate(req.params.id, updates, {new: true}).then(team =>{
       res.json(team);
     });

  }).catch( e => res.json(e));





},

/* DELETE a single user */
delete: (req,res,next) => {
    Team.remove({ _id: req.params.id }).then( () =>{
      res.json({
        message:"Team removed"
      });
    })
    .catch( e => res.json(e));
}

};
