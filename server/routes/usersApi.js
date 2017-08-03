const router = require('express').Router();
const usersApiController = require('../controllers/usersApiController');


router.get('/users', usersApiController.index);

router.post('/users', usersApiController.new);

router.get('/users/:id', usersApiController.get);

router.put('/users/:id', usersApiController.edit);

router.delete('/users/:id', usersApiController.delete);

module.exports = router;
