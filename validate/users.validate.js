var shortid = require('shortid');
var bodyParser = require('body-parser');
var moment=require('moment');
var dbSQL = require('../dbSQL.js');

module.exports.postLogin = async function (req,res,next)
{
  var errors=[];
  queryString="select* from users where email="+"'"+req.body.email+"'";
 
  let rows= await dbSQL.read(queryString);
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
};

module.exports.postSignup=  async function (req,res,next) {
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
    let rows= await dbSQL.read(queryString);
    res.cookie('id',req.body.id);
    queryString=`insert into rank(userID) value ('${req.body.id}')`;
    let rows2= await dbSQL.read(queryString);
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
        queryString="insert into accountLogin(userID,timeLogin)value('"+rows[0].id+"','"+authTime+"')";
        dbSQL.write(queryString);
        if(Object.keys(req.query).length===0)
        {
          console.log('Success !');
        }
        else
        {
          console.log('Have query !');
        };
        let posts=[];
        let likedPosts=[];
        queryString=`select *
                     from post
                     inner join interNumbers
                     on post.id=interNumbers.postID and post.idUser!='${req.cookies.id}'`;
        dbSQL.read(queryString)
        .then(function(rows){
            posts=rows;
            queryString=`select * from INTERACTIVE where userLikeID='${req.cookies.id}'`;
            return dbSQL.read(queryString);
        })
        .then(function(rows){
            for(let row of rows)
            {
              for(let post of posts)
              {
                if(row.postID===post.postID)
                {
                   likedPosts.push(post);
                   posts.splice(posts.indexOf(post),1);
                }
              }
            }

           res.locals.posts=posts;
           res.locals.likedPosts=likedPosts;
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
  queryString="Select* from accountLogin where userID='"+req.cookies.id+"'";
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
  let queryString2="select friends.*, users.fullname from friends, users where friends.sender='"+req.cookies.id+"'"+" and friends.receiver=users.id and friends.sta='accepted' and fullname like '%"+req.query.q+"%'";
  let queryString3="select friends.*, users.fullname from friends, users where friends.receiver='"+req.cookies.id+"'"+" and friends.sender=users.id and friends.sta='pending' and fullname like '%"+req.query.q+"%'";
  let queryString4="select friends.*, users.fullname from friends, users where friends.sender='"+req.cookies.id+"'"+" and friends.receiver=users.id and friends.sta='pending' and fullname like '%"+req.query.q+"%'";
  
  dbSQL.read(queryString)
  .then(function(rows){
       if(req.query.q!=""){
          friends=rows;
       };
       return dbSQL.read(queryString2)
  })
  .then(function(rows){
       res.locals.friendsAccepted=rows;
       for(let row of rows)
       {
        for(let friend of friends)
        {
          if(row.receiver===friend.id)
          {
            friends.splice(friends.indexOf(friend),1);
            break;
          }
        }
       };
       return dbSQL.read(queryString3);
  })
  .then(function(rows){
       res.locals.friendsReq=rows;
       for(let row of rows)
       {
        for(let friend of friends)
        {
          if(row.sender===friend.id)
          {
            friends.splice(friends.indexOf(friend),1);
            break;
          }
        }
       };
       return dbSQL.read(queryString4);
  })
  .then(function(rows){
       res.locals.friendsReqted=rows;
       for(let row of rows)
       {
        for(let friend of friends)
        {
          if(row.receiver===friend.id)
          {
            friends.splice(friends.indexOf(friend),1);
            break;
          }
        }
       };
       res.locals.friends=friends;
       next();
  });

};

module.exports.rank = function(req,res,next)
{
  let queryString=`select * from rank where userID='${req.cookies.id}'`;
  dbSQL.read(queryString)
  .then(function(rows){
    res.locals.rank=rows;
    next();
  });
};