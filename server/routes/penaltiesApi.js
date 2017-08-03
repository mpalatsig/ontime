const router = require('express').Router();
const penaltiesApiController = require('../controllers/penaltiesApiController');


router.get('/penalties', penaltiesApiController.index);

router.post('/penalties', penaltiesApiController.new);

router.get('/penalties/:id', penaltiesApiController.get);

router.put('/penalties/:id', penaltiesApiController.edit);

router.delete('/penalties/:id', penaltiesApiController.delete);

module.exports = router;
