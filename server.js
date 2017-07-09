'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var app = express();
var mongoUrl = 'mongodb://elisal:pdnlxx021@ds151662.mlab.com:51662/build-a-voting-app';

require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', stormpath.getUser, function(req, res){
	if(req.user){
		res.render('pages/index', {user: req.user.email});
	}
	else{
		res.render('pages/index', {user: null});
	}
});

app.get('/singlePoll', stormpath.getUser, function(req, res){
	if(req.user){
		res.render('pages/singlePoll', {user: req.user.email});
	}
	else{
		res.render('pages/singlePoll', {user: null});
	}
});

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
