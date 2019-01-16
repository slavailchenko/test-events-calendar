const router = require('express').Router();
const { check } = require('express-validator/check');
const events = require ('../controllers/events.controller');
const userToken = require('../middleware/token.middleware');

router.use('/', userToken.checkToken);

router.post('/', events.arrayOfValidation, events.validationFields, events.newEvent);
router.delete('/:id', events.removeEvent);

module.exports = router;