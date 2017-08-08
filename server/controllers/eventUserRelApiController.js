const User = require('../models/User');
const Event = require('../models/Event');
const EventUserRelation = require('../models/EventUserRelation');
const Team = require('../models/Team');

module.exports = {
  /* GET eventusers relations*/
  index: (req, res, next) => {
    const eventId = req.params.id;
    EventUserRelation.find({
        eventID: eventId
      })
      .exec().then(eventUserRelations => {
        relationsPromise = [];
        eventUserRelations.forEach(relation => {
          relationsPromise.push(
            new Promise((resolve, reject) => {
              relation.populate('userID', (err, userPopulated) => {
                resolve(userPopulated);
              });
            })
          );
        });
        Promise.all(relationsPromise).then(populatedUsersResolved => {
          console.log(populatedUsersResolved);
          res.status(200).json(populatedUsersResolved);
        });
      })
      .catch(e => res.json(e));
  },

  /* EDIT eventusers relations*/
  edit: (req, res, next) => {
    const userId = req.params.id;
    const updates = {
      arrivalDate: "2017-08-07T14:15:26.585Z",
    };
    EventUserRelation.findByIdAndUpdate(userId, updates).then(relation => {
        res.json({
          relation,
          userId,
          updates,
          message: "hollalalal",
        });
      })
      .catch(e => res.json(e));
  },

};
