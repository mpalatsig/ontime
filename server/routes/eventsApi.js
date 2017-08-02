const router = require('express').Router();
const eventsApiController = require('../controllers/eventsApiController');


router.get('/events', eventsApiController.index);

router.post('/events', eventsApiController.new );

router.get('/events/:id', eventsApiController.get );

module.exports = router;
