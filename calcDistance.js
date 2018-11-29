var math = require('mathjs');


function deg2rad(deg) {
	// convert coordinates to radians
	return deg * (math.pi/180);
}

function calcDistance(geoCoordObj1, geoCoordObj2) {
	/**
	Haversine Formula

	R = 6367 km OR 3956 mi

	deltalon = deg2rad(lng2 - lng1)
	deltalat = deg2rad(lat2 - lat1)
	a = (sin(deltalat/2))^2 + cos(deg2rad(lat1)) * cos(deg2rad(lat2)) * (sin(deltalon/2))^2
	c = 2 * atan2( sqrt(a), sqrt(1-a) )
	distance = R * c (R is radius of Earth)

	**/

	console.log("lat1, lng1:", geoCoordObj1["lat"], ",", geoCoordObj1["lng"]);
	console.log("lat2, lng2:", geoCoordObj2["lat"], ",", geoCoordObj2["lng"]);

	lat1 = parseFloat(geoCoordObj1["lat"]);
	lng1 = parseFloat(geoCoordObj1["lng"]);
	lat2 = parseFloat(geoCoordObj2["lat"]);
	lng2 = parseFloat(geoCoordObj2["lng"]);


	R = 3956;	// approx. radius of Earth in miles

	deltalon = deg2rad(lng2 - lng1);	// convert coords to radians
	deltalat = deg2rad(lat2 - lat1);
	a = math.square(math.sin(deltalat/2)) + math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * math.square(math.sin(deltalon/2));
	console.log("a:", a);
	c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a));
	distance = R * c;

	console.log("calcDistance:", distance);
	return distance;
 
};


// export function as module
module.exports = calcDistance;