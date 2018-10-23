// icd2hosp.js

// input: string of user's diagnosis or disease
// output: list of matching hospital records

// load data maps
var icd2drgcode = require('/static/icd2drgCode.txt');	// drg codes from cms website
var drgcode2name = require('/static/drgCode2Name.txt');	// drg names from inpatient csv
var drg2hospitals = require('/static/drg2hospitals.txt');	// drg names, hospitals from inpatient csv

var icd2hosp = function() {};	// initialize object

icd2hosp.convert(usericd) {

	var hospitalRecordsList = [];	// list of hospitals to be returned

	// if drg names (inpatient 2016) cannot be found given drg code (cms website), then alert user
	// TASK: future icd2drgcodes can have drgName as value to drgCode (regex)

	// var drgcodelist = icd2drgcode;	// (codes from cms website)
	// var drgnameslist = drgcode2name.convert(drgcodelist);	// names from inpatient csv, so codes incomplete

	// TASK: feature - icd can be searched in part or whole 
	if (icd2drgcode.hasOwnProperty(usericd)) {
		var drgCodesArray = icd2drgcode[usericd];

		// for code in drg, if code is in drgcode2name
		for (var i=0; i<drgCodesArray.length; i++) {
			var drgCode = drgCodesArray[i];
			if (drgcode2name.hasOwnProperty(drgCode)) {
				var drgName = drgcode2name[drgCode];

				// grab hospital records for each drg name
				if (drg2hospitals.hasOwnProperty(drgName)) {
					var drghospitalsList = drg2hospitals[drgName];

					for (var j=0; j<drghospitalsList.length; j++) {
						var hospitalRecord = drgHospitalsList[j];
						hospitalRecordsList.push(hospitalRecord);
					};

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
module.exports() = icd2hosp;