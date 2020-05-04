module.exports.login=function(req,res){
	res.render('login.pug');
};
module.exports.user=function(req,res){
	res.render('user.pug');
};
module.exports.signup=function(req,res){
    res.render('signup.pug');
};

module.exports.Buser=function(req,res){
	res.redirect('/user');
};