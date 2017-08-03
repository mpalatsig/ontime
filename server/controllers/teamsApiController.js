const User = require('../models/User');
const Event = require('../models/Event');
const Team = require('../models/Team');

module.exports = {
  /* GET users listing */
  index: (req,res,next) => {
    Team.find({}).then(teams =>{
      res.json(teams);
    })
    .catch( e => res.json(e));
},

  /* POST new user */
  new: (req, res, next) => {
  const team = new Team ({
    teamName: req.body.teamName,
  });
  team.save().then(user => {
			res.status(201).json({
        message: 'New team created!',
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
  const updates = {
    teamName: req.body.teamName,
   };
    Team.findByIdAndUpdate(req.params.id, updates).then(team =>{
      res.json(team);
    })
    .catch( e => res.json(e));
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
