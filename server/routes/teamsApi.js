const router = require('express').Router();
const teamsApiController = require('../controllers/teamsApiController');


router.get('/teams', teamsApiController.index);

router.post('/teams', teamsApiController.new);

router.get('/teams/:id', teamsApiController.get);

router.put('/teams/:id', teamsApiController.edit);

router.delete('/teams/:id', teamsApiController.delete);

module.exports = router;
