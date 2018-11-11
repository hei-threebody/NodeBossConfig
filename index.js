var Mustache = require('Mustache')
var fs = require('fs');
var path = require('path');

var optionTxt = fs.readFileSync('options.txt', 'utf-8');

var view = {
  inputFile: "Joe",
  outputFile: "Output" 
};

var inputList = []

function travel(dir, callback) {
	fs.readdirSync(dir).forEach(function (file) {
		var pathname = path.join(dir, file);

		if (fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		} else {
			callback(pathname);
		}
	});
}

travel('/Users/hei_threebody/moose', function (pathname) {
	var reg = /11/g;
	if (reg.test(pathname)) {
		inputList.push(pathname)
	}
});

// console.log(JSON.stringify(inputList));


var output = {
	// inputFile: JSON.stringify(inputList)
	"inputFile": inputList
};

console.log(output);

var res = Mustache.render(optionTxt, output);

console.log(res);

