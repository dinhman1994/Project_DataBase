var shortid = require('shortid');

var db = require('../db.js');

module.exports.index=function(req,res){
	res.render('login.pug');
};
module.exports.signup=function(req,res){
    req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.render('signup.pug');
};