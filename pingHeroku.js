// Heroku App Pinger

// prevent Heroku app from sleeping after 30 minutes for free dynos

var http = require('http');

function pingHeroku(appUrl, pingInterval) {
	setInterval(function() {
		http.get(appUrl);
	}, pingInterval);	// interval in milliseconds
};

module.exports = pingHeroku;