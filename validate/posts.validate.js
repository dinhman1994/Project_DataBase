var shortid = require('shortid');
var bodyParser = require('body-parser');
var dbSQL = require('../dbSQL.js');
var moment=require('moment');

module.exports.createPost = function (req,res,next) {
  req.body.id = shortid.generate();
  req.body.times = moment().format('LLLL');
  if(!req.file)
  {
  	console.log("No Image");
  }
  else req.body.image = req.file.path.split('/').slice(1).join('/');
  console.log(req.body);
  let queryString="insert into post(content,times,idUser,id,image,title) value ('"+req.body.content+"','"+req.body.times+"','"+req.cookies.id+"','"+req.body.id+"','"+req.body.image+"','"+req.body.title+"')";
  dbSQL.read(queryString)
  .then(function(rows){
   next();
  });
  
};

module.exports.filterPosts = function(req,res,next)
{
  let queryString="select* from post where title='"+req.query.title+"' and idUser != '"+req.cookies.id+"'";
  dbSQL.read(queryString)
  .then(function(rows){
  	res.locals.posts=rows;
  	next();
  });
};

module.exports.myPosts = function(req,res,next)
{
  let queryString="select* from post where idUser='"+req.cookies.id+"'";
  dbSQL.read(queryString)
  .then(function(rows){
  	res.locals.posts=rows;
  	next();
  });
}

module.exports.likePost = function(req,res,next)
{
	req.body.id = shortid.generate();
	let queryString="insert into INTERACTIVE(id,typeIn,postID,userLikeID) value('"+req.body.id+"','like','"+req.body.postID+"','"+req.cookies.id+"')";
	dbSQL.read(queryString)
	.then(function(rows){
       next();
	});
};