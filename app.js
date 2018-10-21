// app.js

// load packages
var http = require('http');
var express = require('express');
var icd2hosp = require('/icd2hosp.js');

// initialize app object 
var app = express();

// route to home page
app.get('/', function(request, response) {
	// serve index.html
});

// route: index request user input diagnosis 
app.get('/ajaxroute', function(req, res){
	// input: user diagnosis string

	// TASK: port wrangleData() to Python, and then wrangle inpatient2016 before hand
	// output: list of relevant hospital records

});

// initialize server instance
var portNum = // what is the port number? 8080?
http.createServer(app).listen(portNum);