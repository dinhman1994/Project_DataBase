var express = require('express');

var controller=require('../controller/users.controller.js');
var validate = require('../validate/users.validate.js');

var router = express.Router();

router.get('/login',controller.index);
router.post('/signup',validate.postCreate,controller.signup);

module.exports = router;