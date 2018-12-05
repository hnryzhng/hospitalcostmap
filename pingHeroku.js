// Heroku App Pinger

// prevent Heroku app from sleeping after 30 minutes for free dynos

var http = require('http');

function pingHeroku(appUrl, pingInterval) {
	setInterval(function() {
		http.get(appUrl);	// url: https://hospital-cost-map.herokuapp.com/
		//console.log("pinged");	// perhaps log message with timestamp 
	}, pingInterval);	// interval: 300000 = send every 5 minutes
};

module.exports = pingHeroku;