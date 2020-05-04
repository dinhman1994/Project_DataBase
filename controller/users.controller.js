var shortid = require('shortid');

var db=require('../db.js');

module.exports.index=function(req,res){
	res.render('login.pug');
};
module.exports.signup=function(req,res){
    var errors=[];
    if(req.body.name==="")
    {
       errors.push('Name is required');
    };
    if(req.body.password==="")
    {
       errors.push('Password is required');
    };
    if(errors.length > 0)
    {
       res.render('login.pug',{
       	errors: errors
       });
       return;
    };
    
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.render('signup.pug');
};