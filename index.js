const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var usersRouters = require('./routers/users.routers.js');
var insignUsersRoutes = require('./routers/insignusers.routers.js');

const app = express();
const port = 3333;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function (req,res) {
	res.render('index.pug');
});

app.use('/user',insignUsersRoutes);
app.use('/',usersRouters);

app.listen(port,function(){

});


