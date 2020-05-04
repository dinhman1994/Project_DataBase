var shortid = require('shortid');

var db = require('../db.js');

module.exports.postLogin= function (req,res,next) {
    var errors=[];

    if(req.body.email==="")
    {
       errors.push('Email is required');
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

    var email = req.body.email;
    if(!db.get('users').find({email: email}).value()){
    	errors.push('Account does not exits');
    	res.render('login.pug',{
       	    errors: errors
             });
        return;
    };

    var password = req.body.password;
    if(!db.get('users').find({password: password}).value()){
    	errors.push('Wrong password!');
    	res.render('login.pug',{
       	    errors: errors
             });
        return;
    };
    next();
};

module.exports.postSignup= function (req,res,next) {
    var errors=[];
    if(req.body.name==="")
    {
       errors.push('Name is required');
    };

    if(req.body.email==="")
    {
       errors.push('Email is required');
    };

    if(req.body.password==="")
    {
       errors.push('Password is required');
    };

    if(errors.length > 0)
    {
       res.render('signup.pug',{
       	errors: errors
       });
       return;
    };
    req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
    next();
};

