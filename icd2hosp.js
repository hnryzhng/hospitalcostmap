// icd2hosp.js

// input: string of user's diagnosis or disease
// output: list of matching hospital records

// load modules
var path = require('path');
var fs = require('fs');
var cd = require(path.join(__dirname + '/calcDistance.js'));

// load data maps
var icd2drgcode = JSON.parse(fs.readFileSync(path.join(__dirname + '/static/icd2drgCode.txt')));	// fs reads file sync, then JSON.parse turns into object
var drgcode2name = JSON.parse(fs.readFileSync(path.join(__dirname + '/static/drgCode2Name.txt')));
var drg2hospitals = JSON.parse(fs.readFileSync(path.join(__dirname + '/static/drg2hospitals.txt')));

function icd2hosp(usericd, userGeoCoords, userRadius) {
	var hospitalRecordsList = [];	// list of hospitals to be returned

	// if drg names (inpatient 2016) cannot be found given drg code (cms website), then alert user
	// TASK: future icd2drgcodes can have drgName as value to drgCode (regex)

	// var drgcodelist = icd2drgcode;	// (codes from cms website)
	// var drgnameslist = drgcode2name.convert(drgcodelist);	// names from inpatient csv, so codes incomplete

	// TASK: feature - icd can be searched in part or whole 
	if (icd2drgcode.hasOwnProperty(usericd)) {
		var drgCodesArray = icd2drgcode[usericd];
		console.log('drgCodesArray:', drgCodesArray);

		var drgCodesKeys = Object.keys(drgCodesArray);

		// for code in drg, if code is in drgcode2name
		for (var i=0; i<drgCodesKeys.length; i++) {
			var drgCode = drgCodesKeys[i];
			console.log('drgCode', i, ':', drgCode);			

			if (drgcode2name.hasOwnProperty(drgCode)) {
				var drgName = drgcode2name[drgCode];
				console.log('drgName ', i, ':', drgName);			

				// grab hospital records for each drg name
				if (drg2hospitals.hasOwnProperty(drgName)) {
					var drgHospitalsList= drg2hospitals[drgName];
					console.log('drgHospitalsList:', drgHospitalsList);			

					for (var j=0; j<drgHospitalsList.length; j++) {
						var hospitalRecord = drgHospitalsList[j];

						var hospitalGeoCoords = hospitalRecord["geocoded_address"];
						var distance =  cd(userGeoCoords, hospitalGeoCoords);
						if (distance <= userRadius) {
							// if distance between user and hospital is equal to/less than specified radius, add hospital record 
							hospitalRecord["distance"] = distance;	// add distance to hospital record;
							hospitalRecordsList.push(hospitalRecord);
							console.log("icd2hosp usericd:", usericd);
							console.log("icd2hosp hospital record added:", hospitalRecord);
							
						} else {	
							console.log("hospital record not within radius:", hospitalRecord)
					};	};

				} else {
					
					// TASK: throw ERROR?
					console.log("your diagnosis ", usericd, " could not be found: no hospital records");
					return null;
				};

			} else {
				console.log("your diagnosis ", usericd, " could not be found: no matching drg name");
				return null;
			};
		};

		return hospitalRecordsList;

	} else {
		console.log("your diagnosis ", usericd, " could not be found: no matching drg code");
		return null;
	}

};

// export object as module
module.exports = icd2hosp;