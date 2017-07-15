var express = require('express');
var fs = require('fs');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var index = require('./routes/index');
var createPoll = require('./routes/createpoll');
var login = require('./routes/login');
var myPolls = require('./routes/mypolls');
var polls = require('./routes/polls');
var signUp = require('./routes/signup');

mongoose.connect('mongodb://elisal:pdnlxx021@ds151662.mlab.com:51662/build-a-voting-app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connection to the database successful');
});

app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use("/", index);
app.use("/createpoll", createPoll);
app.use("/login", login);
app.use("/mypolls", myPolls);
app.use("/polls", polls);
app.use("/signup", signUp);

var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
