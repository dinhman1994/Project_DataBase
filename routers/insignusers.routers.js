var express = require('express');

var controller=require('../controller/users.controller.js');
var validate = require('../validate/users.validate.js');

var router = express.Router();

router.get('/',validate.authLogin,controller.user);
router.get('/history',validate.findHistory,controller.history);
router.get('/friends',validate.findFriends,controller.friends);
router.get('/friends/search',validate.filterFriends,controller.searchFr);

router.post('/',controller.logout);


module.exports = router;