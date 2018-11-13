var Mustache = require('mustache')
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

function config(input, flag) {
	// console.log(flag);
	var optionTxt = fs.readFileSync('BGPrintSomethingOptions.txt', 'utf-8')
	var inputList = []

	var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
	var energyFiltered = energyJson.filter(e => e.energy == flag.energy)
	var energyList = energyJson.map(e => e.energy)

	// console.log(energyFiltered)
	
	if (energyFiltered.length == 0) {
		console.log(chalk.bold.red('Error, bad energy'))
		return
	}

	if (flag.all) {
		console.log(chalk.bold.red('Warning, you are running the program on all the energy poin'))
		switch(flag.mode) {
			case 'mc':
				console.log(chalk.bold.red('mc mode on'))
				energyList.forEach(function (energy) {
					console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
					mcconfig(energy)	
				})
			case 'bg':
				console.log(chalk.bold.red('bc mode no'))
				energyList.forEach(function (energy) {
					console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
					bgconfig(energy)
				})
			case 'tr':
				console.log(chalk.bold.red('tr mode on'))
				energyList.forEach(function (energy) {
					console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
					trconfig(energy)
				})
		}
	} else {
		switch(flag.mode) {
			case 'mc':
			case 'bg':
			case 'tr':
		}
	}

	switch(flag.mode) {
		case 'mc':
		case 'bg':
		case 'tr':
	}

	console.log(chalk.bold.gray('Dealing with MC background analysis'));
	console.log(chalk.bold.gray('Dealing with ') + chalk.bold.red('Energy: ' + flag.energy));
	console.log(chalk.bold.gray('Setting log level to ') + chalk.bold.red('Level ' + (flag.log ? 5 : 1)));

	console.log(chalk.bold.gray('The number of dst to analysis is ') + chalk.bold.red(inputList.length));
	// console.log(chalk.bold.gray('The file of output is ') + chalk.bold.red(OutputFile));

	var output = {
		"OutputLevel": (flag.log) ? 1 : 5,
		"EvtMax": flag.EvtMax,
		// inputFile: JSON.stringify(inputList)
		"InputFileList": inputList,
		// "OutputFile": OutputFile
	};


	var res = Mustache.render(optionTxt, output);

	fs.writeFileSync('BGOptions.txt', res);

}

module.exports = config;
// console.log(config);
