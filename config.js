var Mustache = require('mustache')
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

function config(input, flag) {
	console.log(flag);
	var optionTxt = fs.readFileSync('BGPrintSomethingOptions.txt', 'utf-8')
	var inputList = []
	var energy = flag.energy * 10000
	var energyStr = String(energy)[0] + '.' + String(energy).slice(1,)
	var OutputFile = '/moose/Bes3User/hzhang/boss/PrintSomething/outBG/' + energyStr + '.root';

	console.log(chalk.bold.gray('Dealing with MC background analysis'));
	console.log(chalk.bold.gray('Dealing with ') + chalk.bold.red('Energy: ' + energyStr));
	console.log(chalk.bold.gray('Setting log level to ') + chalk.bold.red('Level ' + (flag.log ? 5 : 1)));



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


	travel('/ustcfs/bes3user/2013/xial/qqbar/' + energyStr + '/rec01/', function (pathname) {
		var reg = /dst/g;
		if (reg.test(pathname)) {
			inputList.push(pathname)
		}
	});

	var output = {
		"OutputLevel": (flag.log) ? 1 : 5,
		"EvtMax": flag.EvtMax,
		// inputFile: JSON.stringify(inputList)
		"InputFileList": inputList,
		"OutputFile": OutputFile
	};


	var res = Mustache.render(optionTxt, output);

	fs.writeFileSync('BGOptions.txt', res);

}

module.exports = config;
// console.log(config);
