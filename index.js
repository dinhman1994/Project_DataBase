const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var bodyParser = require('body-parser');

const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();
const port = 3333;

db.defaults({ users: [] })
  .write();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function (req,res) {
	res.render('index.pug');
});

app.get('/login',function(req,res){
	res.render('login.pug');
});
app.post('/signup',function(req,res){
	db.get('users').push(req.body).write();
	res.render('signup.pug');
});
app.listen(port,function(){

});

