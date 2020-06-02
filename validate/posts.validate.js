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
     queryString="insert into interNumbers(postID) value ('"+req.body.id+"')";
     return dbSQL.read(queryString);
  })
  .then(function(rows){
     queryString=`update rank set numPosts = numPosts+1 where userID='${req.cookies.id}'`;
     return dbSQL.read(queryString);
  })
  .then(function(rows){
  	 next();
  });
  
};




module.exports.filterPosts = function(req,res,next)
{
  let posts=[];
  let likedPosts=[];	
  let queryString=`select *
                   from post
                   inner join interNumbers
                   on post.id=interNumbers.postID and post.idUser!='${req.cookies.id}' and title='${req.query.title}'`;
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
      	if(row.postID===post.id)
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
};



module.exports.myPosts = function(req,res,next)   
{
  let posts=[];
  let likedPosts=[];
  let queryString=`select *
                   from post
                   inner join interNumbers
                   on post.id=interNumbers.postID and post.idUser='${req.cookies.id}'`;
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
      	if(row.postID===post.id)
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

module.exports.likePost = function(req,res,next)
{
	req.body.id = shortid.generate();
	let queryString="insert into INTERACTIVE(id,typeIn,postID,userLikeID) value('"+req.body.id+"','like','"+req.body.postID+"','"+req.cookies.id+"')";
	dbSQL.read(queryString)
	.then(function(rows){
        queryString=`UPDATE interNumbers SET likes = likes+1 WHERE postID = '${req.body.postID}'`;
        return dbSQL.read(queryString);   
	})
	.then(function(rows){
		queryString=`update rank set likes = likes+1 where userID='${req.cookies.id}'`;
		return dbSQL.read(queryString);
	})
	.then(function(rows){
		next();
	});

};

module.exports.unlikePost = function(req,res,next)
{
	let queryString=`UPDATE interNumbers SET likes = likes-1 WHERE postID = '${req.body.postID}'`;
	dbSQL.read(queryString)
	.then(function(rows){
		queryString=`delete from INTERACTIVE where userLikeID='${req.cookies.id}' and postID='${req.body.postID}'`;
        return dbSQL.read(queryString);
	})
	.then(function(rows){
		queryString=`update rank set likes = likes-1 where userID='${req.cookies.id}'`;
		return dbSQL.read(queryString);
	})
	.then(function(rows){
		next();
	});
}