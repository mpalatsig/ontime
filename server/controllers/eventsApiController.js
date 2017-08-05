const User = require('../models/User');
const Event = require('../models/Event');
const EventUserRelation = require('../models/EventUserRelation');

module.exports = {
  /* GET events listing where a user is listed*/
  index: (req,res,next) => {
    EventUserRelation.find({userID: req.user._id}).exec().then(eventUserRelations => {
      eventsPromise = [];
      eventUserRelations.forEach(e => {
        eventsPromise.push(
          new Promise((resolve, reject) => {
            e.populate('eventID', (err, eventPopulated) => {
              resolve(eventPopulated);
            });
          })
        );
      });
      Promise.all(eventsPromise).then(data => {
        console.log(data);
        res.status(200).json(data);
      });
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
    const attendees = req.body.attendees.split(",");
    attendees.forEach( attendee => {
      User.findOne({email: attendee}, (err,attendeFound) => {
        if(attendeFound !== null) {
          const eventUserRelation = new EventUserRelation({
            eventID: event._id,
            userID: attendeFound._id
          });
          eventUserRelation.save();
        }
      });
    });
        res.status(201).json({
          message: 'New event & eventUserRelation created!',
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

/* EDIT a single event */
edit: (req,res,next) => {
  const updates = {
     summary: req.body.summary,
     description: req.body.description,
   };
    Event.findByIdAndUpdate(req.params.id, updates).then(event =>{
      res.json(event);
    })
    .catch( e => res.json(e));
},

/* DELETE a single event */
delete: (req,res,next) => {
    Event.remove({ _id: req.params.id }).then( () =>{
      res.json({
        message:"Event removed"
      });
    })
    .catch( e => res.json(e));
}

};
