const router = require('express').Router();
const teamUserRelApiController = require('../controllers/teamUserRelApiController');


router.get('/teamusers/:id/index', teamUserRelApiController.index);

router.put('/teamusers/:id/edit', teamUserRelApiController.edit);

module.exports = router;
