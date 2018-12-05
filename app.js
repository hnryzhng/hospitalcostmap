// app.js

// load built-in modules
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');	// for parsing body of POST request
var fs = require('fs');

// load special modules
var icd2hosp = require(path.join(__dirname + '/icd2hosp.js'));
var icd2drgObj = JSON.parse(fs.readFileSync(path.join(__dirname + '/static/icd2drgCode.txt'), 'utf8'))	// read in JSON file
var pingHeroku = require(path.join(__dirname + '/pingHeroku.js'));

// initialize app object 
var app = express();

// parses body for post request processing
app.use(bodyParser.urlencoded({ extended: false }));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());	// parse application/json

// Heroku app: send ping at intervals to prevent sleeping
pingHeroku("https://hospital-cost-map.herokuapp.com/", 900000);

// route: serve index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

// route: serve file based on relative path from query
app.get('/:relpath', function(req, res){
	relpath = req.params.relpath;
	res.sendFile(path.join(__dirname + '/client/' + relpath));
});

// route: send icd2drgCode json for fast filter feature
app.get('/static/icd2drgCode.txt', function(req, res){
	res.json(icd2drgObj);
});

// route: serve list of hospital records based on query from user input
app.get('/get_hospital_records_test/:userObj', function(req, res){
	// send array as param
	userObject = JSON.parse(req.params.userObj);

	var userIcd = userObject["userIcd"];
	var userGeoCoords = userObject["geocoords"];
	var userRadius = userObject["radius"];

	console.log('app.js icdInput test:', userIcd);
	console.log('app.js userGeoCoord:', userGeoCoords);
	console.log('app.js userRadius:', userRadius);


	var hospitalRecordsList = icd2hosp(userIcd, userGeoCoords, userRadius);
	console.log('app.js hospitalRecordsList:', hospitalRecordsList);	
	res.send(hospitalRecordsList);

});


// initialize server instance
// http://localhost:portNum
var portNum = process.env.PORT || 3000;
app.listen(portNum, function() {console.log('Example app listening on port', portNum)});	