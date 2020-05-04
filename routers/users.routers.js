var express = require('express');
var router = express.Router();
var db=require('../db.js');

router.get('/login',function(req,res){
	res.render('login.pug');
});
router.post('/signup',function(req,res){
	db.get('users').push(req.body).write();
	res.render('signup.pug');
});

module.exports = router;