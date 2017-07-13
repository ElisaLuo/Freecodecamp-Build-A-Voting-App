var express = require('express');
var fs = require('fs');
var app = express();
var mongodb = require('mongodb').MongoClient;
var dbUrl = 'mongodb://elisal:pdnlxx021@ds151662.mlab.com:51662/build-a-voting-app';
const index = require('./routes/index');
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", index);

var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
