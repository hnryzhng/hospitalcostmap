// test docs 
// testing concepts: https://hackernoon.com/a-crash-course-on-testing-with-node-js-6c7428d3da02
// npm install mocha, chai for node testing 
// using mocha, chai: https://www.bignerdranch.com/blog/why-do-javascript-test-frameworks-use-describe-and-beforeeach/

// using rewire to test unexported/unexposed functions: 
// https://stackoverflow.com/questions/14874208/how-to-access-and-test-an-internal-non-exports-function-in-a-node-js-module

// if input file is inpatient.csv (because records vary depending on year)  
// in: user icd str
// out: hospitalRecordsLis
// assert icd2hosp() output should be equal to defined expected output 

var expect = require('chai').expect;
var icd2hosp = require('/icd2hosp.js');

// TASK: if input file is inpatient YEAR csv, then change in, expectedOut since records change annually

describe('icd2hosp()', function() {
	
	// TASK: perhaps describe test env should be separated based on fully matching or partially matching icd input
	// use beforeEach, if not particularly testing partially matching icd inputs 

	describe('when user icd works'. function() {

		it('returns list of hospital record objects', function (){
			var inputIcd = // 
			var expectedOutput = // list of hosp records

			var actualOutput = icd2hosp(inputIcd);

			// assert
			expect(actualOutput).to.be.equal(expectedOut);

		});

		```
		it('icd has successfully been sent through ajax')

		
		it('returns list of hospital record objects given partially matching icd input', function() {
			var inputIcd = // partially matching icd
			var expectedOutput = // 

			var actualOutput = icd2hosp(inputIcd);

			// assert
			expect(actualOutput).to.be.equal(expectedOutput);
		});
		```
	});

	describe('when user icd does not work', function(){
		it('returns null if given meaningless icd input', function () {
			var inputIcd = 'doog';
			var expectedOutput = null;

			var actualOutput = icd2hosp(inputIcd);

			// assert
			expect(actualOutput).to.be.equal(expectedOutput);
		});

		it('returns null if given working icd input with no corresponding drg in drg2hospital.txt because not in inpatient csv', function () {
			var inputIcd = // 
			var expectedOutput = //

			var actualOutput = icd2hosp(inputIcd);

			// assert
			expect(actualOutput).to.be.equal(expectedOutput);
		});
		```
		it('returns null since drg code cannot be found in icd2drgcode.txt')	// put into separate function

		it('returns null since drg name is not in drgCode2Name.txt due to not being in inpatient csv')	// put into separate function
		```

	});


});