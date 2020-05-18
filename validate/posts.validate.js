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

  let queryString="insert into post(content,times,idUser,id,image) value ('"+req.body.content+"','"+req.body.times+"','"+req.cookies.id+"','"+req.body.id+"','"+req.body.image+"')";
  dbSQL.read(queryString)
  .then(function(rows){
   next();
  });
  
};