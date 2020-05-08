var shortid = require('shortid');
var bodyParser = require('body-parser');

var db = require('../db.js');

var dbSQL = require('../dbSQL.js');

module.exports.postLogin = function (req,res,next)
{
  var errors=[];
  queryString="select* from users where email="+"'"+req.body.email+"'";
    dbSQL.authLogin(queryString)
    .then(function(rows){
      if(rows.length>0)
      {
        if(req.body.password===rows[0].password)
        {
          res.cookie('id',rows[0].id);
          next();
        }
        else
        {
          errors.push("WRONG PASSWORD!");
          res.render('login.pug',{
               errors: errors
          });
          return;
        };
      }
      else
      {
        errors.push("DO NOT HAVE ACCOUNT!");
        res.render('login.pug',{
               errors: errors
        });
        return;
      };
    });

};

module.exports.postSignup= function (req,res,next) {
    var errors=[];
    if(!req.body.name)
    {
       errors.push('Name is required');
    };

    if(!req.body.email)
    {
       errors.push('Email is required');
    };

    if(!req.body.password)
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
    if(!req.file){
      console.log("Hay qua");
    }
    else req.body.avatar = req.file.path.split('/').slice(1).join('/');

	  var stringQuery="insert into users(id,fullname,avatar,password,email)"+' '+"value('"+req.body.id+"','"+req.body.name+"','"+req.body.avatar+"','"+req.body.password+"','"+req.body.email+"')"; 
    dbSQL.write(stringQuery);
	  res.cookie('id',req.body.id);
    next();
};

module.exports.authLogin= function(req,res,next) {
    queryString="select* from users where id="+"'"+req.cookies.id+"'";
    dbSQL.authLogin(queryString)
    .then(function(rows){
      if(rows.length>0)
      {
        res.locals.user = rows[0];
        next();
      }
      else
      {
        res.redirect('/login');
        return;
      }
    });
	
};