var express = require('express');
var multer  = require('multer');

var controller=require('../controller/users.controller.js');
var validate = require('../validate/users.validate.js');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/login',controller.login);
router.get('/signup',controller.signup);


router.post('/login',validate.postLogin,controller.Buser);
router.post('/signup',
	upload.single('avatar'),
	validate.postSignup,
	controller.Buser
	);

module.exports = router;