const router = require('express').Router();
const eventUserRelApiController = require('../controllers/eventUserRelApiController');


router.get('/events/eventusers/:id', eventUserRelApiController.edit);
router.get('/events/:id/users', eventUserRelApiController.index);

module.exports = router;
