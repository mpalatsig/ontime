const router = require('express').Router();
const eventsApiController = require('../controllers/eventsApiController');


router.get('/events', eventsApiController.index);

router.post('/events', eventsApiController.new);

router.get('/events/:id', eventsApiController.get);

router.put('/events/edit/:id', eventsApiController.edit);

router.put('/events/start/:id', eventsApiController.start);

router.put('/events/stop/:id', eventsApiController.stop);

router.delete('/events/:id', eventsApiController.delete);




module.exports = router;
