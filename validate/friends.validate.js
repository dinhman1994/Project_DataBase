var shortid = require('shortid');
var bodyParser = require('body-parser');
var dbSQL = require('../dbSQL.js');

module.exports.unfriend =function (req,res,next) 
{
      
   let queryString="Delete from friends where sender='"+req.cookies.id+"'"+" and receiver='"+req.body.id+"'";
    dbSQL.read(queryString)
    .then(function(rows){
    	queryString="Delete from friends where receiver='"+req.cookies.id+"'"+" and sender='"+req.body.id+"'";
    	return dbSQL.read(queryString);
    })
    .then(function(rows){
    	console.log('UNFRIENDED...');
    	next();
    });  
 
};

module.exports.accepted =function (req,res,next) 
{
	
	let queryString="update friends set sta='accepted' where sender='"+req.body.id+"'"+" and receiver='"+req.cookies.id+"'";
    dbSQL.read(queryString)
    .then(function(rows){
    	queryString="insert into friends(sender,receiver,sta,id) value ('"+req.cookies.id+"','"+req.body.id+"','accepted', '19')";
    	return dbSQL.read(queryString);
    })
    .then(function(rows){
    	console.log('ACCEPTED...');
    	next();

    });
};

module.exports.stop =function (req,res,next) 
{
	
	let queryString="Delete from friends where sender='"+req.cookies.id+"' and receiver='"+req.body.id+"'";
	dbSQL.read(queryString)
	.then(function(rows){
		console.log('STOPPED...');
		next();
	})
};

module.exports.requested =function (req,res,next) 
{
	// console.log('REQUESTED...');
	// console.log(req.body); // body...
	// next(); 
	let queryString="insert into friends(sender,receiver,sta,id) value ('"+req.cookies.id+"', '"+req.body.id+"'"+", 'pending', '19')";
	dbSQL.read(queryString)
	.then(function(rows){
		console.log('REQUESTED...');
		next();
	});

	next();
	
};