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
          res.status(200).json(populatedUsersResolved);
        });
      })
      .catch(e => res.json(e));
  },

  /* EDIT eventusers relations*/
  edit: (req, res, next) => {
    const eventStartDate = new Date(req.body.startDate);
    const timeNow = new Date();
    const relationID = req.params.id;
    const rest = Math.abs(eventStartDate.getTime() - timeNow.getTime());
    const restInMin = Math.ceil(rest / (1000 * 60));
    const updatesRel = {
      arrivalDate: timeNow,
      timeLate: restInMin,
    };

    EventUserRelation.findByIdAndUpdate(relationID, updatesRel, {new: true}).then(relation => {
        res.json(relation);
      })
      .catch(e => res.json(e));
  },

};
