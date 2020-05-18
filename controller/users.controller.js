const express = require('express');
var bodyParser = require('body-parser');

module.exports.login=function(req,res){
	res.render('login.pug');
};

module.exports.logout=function(req,res){
	res.clearCookie('id');
	res.redirect('/');
}
module.exports.user=function(req,res){
	res.render('user.pug',{
		user: res.locals.user,
		posts: res.locals.posts
	});
};
module.exports.signup=function(req,res){
    res.render('signup.pug');
};

module.exports.Buser=function(req,res){
	res.redirect('/user');
};

module.exports.history=function(req,res)
{
	res.render('history.pug',{
		history: res.locals.history
	});
};

module.exports.friends=function(req,res)
{
	res.render('friends.pug',{
		friends: res.locals.friends,
		friendsReq: res.locals.friendsReq
	});
};

module.exports.searchFr=function(req,res)
{
	res.render('searchFr.pug',{
		friendsAccepted:res.locals.friendsAccepted,
		friendsReq:res.locals.friendsReq,
		friendsReqted:res.locals.friendsReqted,
		friends:res.locals.friends
	});
};

module.exports.bFriends=function(req,res)
{
	res.redirect('/user/friends');
};