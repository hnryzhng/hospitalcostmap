// app.js

// load packages
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');	// for parsing body of POST request

var icd2hosp = require(path.join(__dirname + '/icd2hosp.js'));

// initialize app object 
var app = express();

// parses body for post request processing
app.use(bodyParser.urlencoded({ extended: false }));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());	// parse application/json

// route: serve index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


// route: serve index.html
app.get('/indexsimple.html', function(req, res) {
	res.sendFile(path.join(__dirname + '/indexsimple.html'));
});

// route: 
app.get('/get_hospital_records/:icdinput', function(req, res){

	var icdInput = req.params.icdinput;	

	console.log('app.js icdInput:', icdInput);

	var hospitalRecordsList = icd2hosp(icdInput);
	console.log('app.js hospitalRecordsList:', hospitalRecordsList);	
	res.send(hospitalRecordsList);

});

// route: serve testajax.html
app.get('/testajax.html', function(req, res){
	res.sendFile(path.join(__dirname + '/testajax.html'));
});
// route: test ajax request
app.get('/ajaxroute', function(req, res){

	// problem: cannot grab list of arrays, just json object (also restructure when outputting to index.html?)
	// var hospitalRecordsList = [{'hospital':'hos1', 'address':'nunya'},{'hospital':'hos2', 'address':''}];	
	// var inputIcd = req.body['ajaxtext'];	// data sent from form with AJAX 
	// console.log('incoming request inputIcd:', inputIcd);	// problem: how to just extract text from parsed request body

	var requestQuery = req.query;
	var requestQueryKeys = Object.keys(requestQuery);

	//console.log('REQUEST DATA:', req);
	//console.log('express request query:', requestQuery);
	//console.log('express request query type:', typeof requestQuery);
	//console.log('express request query keys:', requestQueryKeys.toString());
	var responseStr = 'hi there';
	var responseList = [{'hospital':'hos1', 'address':'nunya'},{'hospital':'hos2', 'address':''}];

	res.send(responseList);
});

// initialize server instance
// http://localhost:portNum
var portNum = 3000;
app.listen(portNum, function() {console.log('Example app listening on port', portNum)});	