var express = require('express');

var controller=require('../controller/users.controller.js');
var validate = require('../validate/users.validate.js');

var router = express.Router();

router.get('/login',controller.login);
router.get('/user',controller.user);
router.get('/signup',controller.signup);

router.post('/login',validate.postLogin,controller.Buser);
router.post('/signup',validate.postSignup,controller.Buser);

module.exports = router;