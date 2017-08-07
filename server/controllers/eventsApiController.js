const User = require('../models/User');
const Event = require('../models/Event');
const EventUserRelation = require('../models/EventUserRelation');
const Team = require('../models/Team');

module.exports = {
  /* GET events listing where the current user is listed*/
  index: (req,res,next) => {
    EventUserRelation.find({userID: req.user._id})
    .exec().then(eventUserRelations => {
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
      Promise.all(eventsPromise).then(populatedEventsResolved => {
        console.log(populatedEventsResolved);
        res.status(200).json(populatedEventsResolved);
      });
    })
    .catch( e => res.json(e));
},

  /* POST new event and create a eventUserRelation*/
  new: (req, res, next) => {
  const event = new Event ({
    gCalendarID: req.body.gCalendarID,
    summary: req.body.summary,
    description: req.body.description,
    team: req.body.team,
    userOrganizer: req.user._id,
    attendees: req.body.attendees.split(","),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: req.body.status,
    penaltyAmount: req.body.penaltyAmount,
  });
  event.save().then(event => {
    const attendees = req.body.attendees.split(",");
    attendees.forEach( attendee => {
      User.findOne({email: attendee}, (err,attendeFound) => {
        if(attendeFound !== null) {
          const eventUserRelation = new EventUserRelation({
            eventID: event._id,
            userID: attendeFound._id,
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
     team: req.body.team,
     attendees: req.body.attendees.split(","),
     startDate: req.body.startDate,
     endDate: req.body.endDate,
     status: req.body.status,
     penaltyAmount: req.body.penaltyAmount,
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
},

start: (req,res,next) => {
  const updates = {
     status: req.body.status,
   };
   console.log(req.body.status);
   console.log(updates);
    Event.findByIdAndUpdate(req.params.id, updates).then(event =>{
      res.json({
        message: `Status changed to ${req.body.status}`,
      });
    })
    .catch( e => res.json(e));
},

stop: (req,res,next) => {
  const updates = {
     status: req.body.status,
   };
   console.log(req.body.status);
   console.log(updates);
    Event.findByIdAndUpdate(req.params.id, updates).then(event =>{
      res.json({
        message: `Status changed to ${req.body.status}`,
      });
    })
    .catch( e => res.json(e));
},

};
