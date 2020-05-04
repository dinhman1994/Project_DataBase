var express = require('express');

var controller=require('../controller/users.controller.js');

var router = express.Router();

router.get('/login',controller.index);
router.post('/signup',controller.signup);

module.exports = router;