// icd2hosp.js

// input: string of user's diagnosis or disease
// output: list of matching hospital records

var icd2drgcode = require('/static/icd2drgcodemap.js');
var drgcode2name = require('/static/drgcode2namemap.js');


var icd2hosp = function() {};	// initialize object

icd2hosp.convert(usericd) {
	// var drgcodelist = icd2drgcode.convert(icd);
	// var drgnameslist = drgcode2name.convert(drgcodelist);
	// grab hospital records of each drg name
};

// make sure to create module for export


module.exports() = icd2hosp;