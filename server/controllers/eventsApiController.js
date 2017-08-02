const User = require('../models/User');
const Event = require('../models/Event');

module.exports = {
  /* GET events listing */
  index: (req,res,next) => {
    Event.find({}).then(events =>{
      res.json(events);
    })
    .catch( e => res.json(e));
},

  /* POST new event */
  new: (req, res, next) => {
  const event = new Event ({
    gCalendarID: req.body.gCalendarID,
    summary: req.body.summary,
    description: req.body.description,
    team: req.body.team,
    userOrganizer: req.body.userOrganizer,
    attendees: req.body.attendees,
  });
  event.save().then(event => {
			res.status(201).json({
        message: 'New event created!',
        id: event._id,
        summary: event.summary
      });
	})
  .catch( e => res.json(e));
},

/* GET a single event */
get: (req,res,next) => {
    Event.findById(req.params.id).then(event =>{
      res.json(event);
    })
    .catch( e => res.json(e));
},





};
