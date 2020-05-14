var shortid = require('shortid');
var bodyParser = require('body-parser');
var moment=require('moment');

var db = require('../db.js');

var dbSQL = require('../dbSQL.js');

module.exports.postLogin = function (req,res,next)
{
  var errors=[];
  queryString="select* from users where email="+"'"+req.body.email+"'";
    dbSQL.read(queryString)
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

	  queryString="insert into users(id,fullname,avatar,password,email)"+' '+"value('"+req.body.id+"','"+req.body.name+"','"+req.body.avatar+"','"+req.body.password+"','"+req.body.email+"')"; 
    dbSQL.write(queryString);
	  res.cookie('id',req.body.id);
    next();
};

module.exports.authLogin = function(req,res,next) {
    queryString="select* from users where id="+"'"+req.cookies.id+"'";
    dbSQL.read(queryString)
    .then(function(rows){
      if(rows.length>0)
      {
        res.locals.user = rows[0];
        let authTime=moment().format('LLLL');
        queryString="insert into accountLogin(id,timeLogin)value('"+rows[0].id+"','"+authTime+"')";
        dbSQL.write(queryString);
        queryString="Select* from post where id='"+rows[0].id+"'";
        dbSQL.read(queryString)
        .then(function(rows){
          res.locals.posts=rows;
          next();
        });
      }
      else
      {
        res.redirect('/login');
        return;
      }
    });
    
	
};

module.exports.findHistory = function(req,res,next)
{
  queryString="Select* from accountLogin where id='"+req.cookies.id+"'";
  dbSQL.read(queryString)
  .then(function(rows){
    res.locals.history=rows;
    next();
  });
};

module.exports.findFriends = function(req,res,next)
{
  queryString="select friends.*, users.fullname from friends as friends, users as users where sender='"+req.cookies.id+"' "+"and friends.receiver=users.id and sta='accepted'";
  dbSQL.read(queryString)
  .then(function(rows){
    res.locals.friends=rows;
    queryString="select friends.*, users.fullname from friends as friends, users as users where receiver='"+req.cookies.id+"' "+"and friends.sender=users.id and sta='pending'";
    return dbSQL.read(queryString);
  })
  .then(function(rows){
    res.locals.friendsReq=rows;
    next();
  });
  
};

module.exports.filterFriends = function(req,res,next)
{
  let friends=[];
  queryString="select* from users where fullname like '%"+req.query.q+"%'"+" and id != '"+req.cookies.id+"'";
  let queryString2="select friends.*, users.fullname from friends, users where friends.sender='"+req.cookies.id+"'"+" and friends.receiver=users.id and friends.sta='accepted'";
  let queryString3="select friends.*, users.fullname from friends, users where friends.receiver='"+req.cookies.id+"'"+" and friends.sender=users.id and friends.sta='pending'";
  let queryString4="select friends.*, users.fullname from friends, users where friends.sender='"+req.cookies.id+"'"+" and friends.receiver=users.id and friends.sta='pending'";
  
  dbSQL.read(queryString)
  .then(function(rows){
       friends=rows;
       return dbSQL.read(queryString2)
  })
  .then(function(rows){
       res.locals.friendsAccepted=rows;
       for(row of rows)
       {
        for(friend of friends)
        {
          if(row.receiver==friend.id)
          {
            friends.slice(friends.indexOf(friend),1);
            break;
          }
        }
       };
       console.log('Find friends accepted');
       return dbSQL.read(queryString3);
  })
  .then(function(rows){
       res.locals.friendsReq=rows;
       for(row of rows)
       {
        for(friend of friends)
        {
          if(row.sender==friend.id)
          {
            friends.slice(friends.indexOf(friend),1);
            break;
          }
        }
       };
       console.log('Find friends request');
       return dbSQL.read(queryString4);
  })
  .then(function(rows){
       res.locals.friendsReqted=rows;
       for(row of rows)
       {
        for(friend of friends)
        {
          if(row.receiver==friend.id)
          {
            friends.slice(friends.indexOf(friend),1);
            break;
          }
        }
       };
       res.locals.friends=friends;
       console.log('Find friends requested');
       next();
  });

  
};