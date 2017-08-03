const User = require('../models/User');
const Event = require('../models/Event');

module.exports = {
  /* GET users listing */
  index: (req,res,next) => {
    User.find({}).then(users =>{
      res.json(users);
    })
    .catch( e => res.json(e));
},

  /* POST new user */
  new: (req, res, next) => {
  const user = new User ({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
    googleID: req.body.googleID,
    activePenaltyPoints: req.body.activePenaltyPoints,
    paidPenaltyPoints: req.body.paidPenaltyPoints,
    hourlyRate: req.body.hourlyRate,
    currency: req.body.currency,
  });
  user.save().then(user => {
			res.status(201).json({
        message: 'New user created!',
        id: user._id,
        username: user.username
      });
	})
  .catch( e => res.json(e));
},

/* GET a single user */
get: (req,res,next) => {
    User.findById(req.params.id).then(user =>{
      res.json(user);
    })
    .catch( e => res.json(e));
},

/* EDIT a single user */
edit: (req,res,next) => {
  const updates = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
    googleID: req.body.googleID,
    activePenaltyPoints: req.body.activePenaltyPoints,
    paidPenaltyPoints: req.body.paidPenaltyPoints,
    hourlyRate: req.body.hourlyRate,
    currency: req.body.currency,
   };
    User.findByIdAndUpdate(req.params.id, updates).then(user =>{
      res.json(user);
    })
    .catch( e => res.json(e));
},

/* DELETE a single user */
delete: (req,res,next) => {
    User.remove({ _id: req.params.id }).then( () =>{
      res.json({
        message:"User removed"
      });
    })
    .catch( e => res.json(e));
}

};
