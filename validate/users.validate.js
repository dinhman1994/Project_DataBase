module.exports.postCreate= function (req,res) {
	var errors=[];
    if(req.body.name==="")
    {
       errors.push('Name is required');
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
    next();
}