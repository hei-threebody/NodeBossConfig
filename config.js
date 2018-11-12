var Mustache = require('mustache')
var fs = require('fs');
var path = require('path');

var optionTxt = fs.readFileSync('BGPrintSomethingOptions.txt', 'utf-8')

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

var energy = 2.9 * 10000
var energyStr = String(energy)[0] + '.' + String(energy).slice(1,)

travel('/ustcfs/bes3user/2013/xial/qqbar/' + energyStr + '/rec01/', function (pathname) {
	var reg = /dst/g;
	if (reg.test(pathname)) {
		inputList.push(pathname)
	}
});

// console.log(JSON.stringify(inputList));

var OutputFile = '/moose/Bes3User/hzhang/boss/PrintSomething/outBG/' + energyStr + '.root';


var output = {
    "OutputLevel": 5,
    "EvtMax": -1,
	// inputFile: JSON.stringify(inputList)
	"InputFileList": inputList,
    "OutputFile": OutputFile
};

// console.log(output);

var res = Mustache.render(optionTxt, output);

fs.writeFileSync('BGOptions.txt', res);

console.log(res);
console.log(cli.flags);

