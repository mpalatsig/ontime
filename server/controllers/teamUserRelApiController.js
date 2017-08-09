const User = require('../models/User');
const Event = require('../models/Event');
const EventUserRelation = require('../models/EventUserRelation');
const Team = require('../models/Team');
const TeamUserRelation = require('../models/TeamUserRelation');

module.exports = {
  /* GET teamusers relations*/
  index: (req, res, next) => {
    const teamId = req.params.id;
    TeamUserRelation.find({
        teamID: teamId
      })
      .exec().then(teamUserRelation => {
        relationsPromise = [];
        teamUserRelation.forEach(relation => {
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

  /* EDIT teamusers relations*/
  edit: (req, res, next) => {
    const relationID = req.params.id;
    EventUserRelation.findById(relationID).then(relation => {
      sumNewPenalties = relation.penalties + req.body.penalties;

      const updatesRel = {
        penalties: sumNewPenalties,
      };

      EventUserRelation.findByIdAndUpdate(relationID, updatesRel, {new: true}).then(relation => {
        res.json(relation);
      });

    }).catch(e => res.json(e));

  },

};
