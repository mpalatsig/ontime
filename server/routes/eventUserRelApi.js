const router = require('express').Router();
const eventUserRelApiController = require('../controllers/eventUserRelApiController');


router.get('/events/:id/users', eventUserRelApiController.index);

router.put('/events/users/:id/users', eventUserRelApiController.edit);

module.exports = router;
