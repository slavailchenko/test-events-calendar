const router = require('express').Router();
const { check } = require('express-validator/check');
const user = require ('../controllers/users.controller');
const events = require ('../controllers/events.controller');
const userToken = require('../middleware/token.middleware');

router.post('/google', user.arrayOfValidation[2], user.validationFields, user.googleLogin);
router.get('/me', userToken.checkToken, user.getUserMe);

module.exports = router;