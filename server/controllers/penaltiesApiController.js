const User = require('../models/User');
const Event = require('../models/Event');
const Penalty = require('../models/Penalty');

module.exports = {
  /* GET penalties listing */
  index: (req,res,next) => {
    Penalty.find({}).then(penalties =>{
      res.json(penalties);
    })
    .catch( e => res.json(e));
},

  /* POST new penalty */
  new: (req, res, next) => {
  const penalty = new Penalty ({
    payer: req.body.payer,
    eventID: req.body.eventID,
    currencyUnit: req.body.currencyUnit,
    currencyUnitAmount: req.body.currencyUnitAmount,
    totalPenalty: req.body.totalPenalty,
  });
  penalty.save().then(penalty => {
			res.status(201).json({
        message: 'New penalty created!',
        id: penalty._id,
      });
	})
  .catch( e => res.json(e));
},

/* GET a single penalty */
get: (req,res,next) => {
    Penalty.findById(req.params.id).then(penalty =>{
      res.json(penalty);
    })
    .catch( e => res.json(e));
},

/* EDIT a single penalty */
edit: (req,res,next) => {
  const updates = {
    payer: req.body.payer,
    eventID: req.body.eventID,
    currencyUnit: req.body.currencyUnit,
    currencyUnitAmount: req.body.currencyUnitAmount,
    totalPenalty: req.body.totalPenalty,
   };
    Penalty.findByIdAndUpdate(req.params.id, updates).then(penalty =>{
      res.json(penalty);
    })
    .catch( e => res.json(e));
},

/* DELETE a single penalty */
delete: (req,res,next) => {
    Penalty.remove({ _id: req.params.id }).then( () =>{
      res.json({
        message:"Penalty removed"
      });
    })
    .catch( e => res.json(e));
}

};
