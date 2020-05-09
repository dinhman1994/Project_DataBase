var express = require('express');

var controller=require('../controller/users.controller.js');
var validate = require('../validate/users.validate.js');

var router = express.Router();

router.get('/',validate.authLogin,controller.user);
router.get('/history',controller.history);

router.post('/',controller.logout);


module.exports = router;