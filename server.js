//Imports dependencies, and function files
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const index = require('./routes/index');
const createPoll = require('./routes/createpoll');
const login = require('./routes/login');
const myPolls = require('./routes/mypolls');
const polls = require('./routes/polls');
const signUp = require('./routes/signup');
const session = require('client-sessions');
const logout = require('./routes/logout'); //Allows logout to run

process.env.NODE_ENV = 'production';

//connects to mLab with mongoose
mongoose.connect('mongodb://elisal:Pdnlxx021@ds021999.mlab.com:21999/build-a-voting-app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connection to the database successful');
});

//Sets up local cookie (see https://www.npmjs.com/package/client-sessions)
app.use(express.static('public'));
app.use(session({
  cookieName: 'session',
  secret: 'asfasFHDFDHJDFJr5e4rwrsefzawq5',
  duration: 24 * 60 * 60 * 1000
}));

app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets up links for different sites
app.use("/", index);
app.use("/createpoll", createPoll);
app.use("/login", login);
app.use("/mypolls", myPolls);
app.use("/polls", polls);
app.use("/signup", signUp);
app.use("/logout", logout); //Creates link for logout so function could be run

//Starts port
var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
