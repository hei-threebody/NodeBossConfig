var Mustache = require('mustache')
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var mcconfig = require('./mcconfig')
var bgconfig = require('./bgconfig')
var trconfig = require('./trconfig')

function config(input, flag) {
	// console.log(flag);
	var optionTxt = fs.readFileSync('BGPrintSomethingOptions.txt', 'utf-8')
	var inputList = []

	var energy = flag.energy

	var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
	var energyFiltered = energyJson.filter(e => e.energy == flag.energy)
	var energyList = energyJson.map(e => e.energy)

	// console.log(energyFiltered)
    //
    var conf = undefined

	
	if (energyFiltered.length == 0) {
		console.log(chalk.bold.red('Error, bad energy'))
		return
	}

	if (flag.all) {
		console.log(chalk.bold.red('Warning, you are running the program on all the energy point'))
		switch(flag.mode) {
			case 'mc':
				console.log(chalk.bold.red('mc mode on'))
				energyList.forEach(function (energy) {
					// console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
                    flag.all = false;
                    flag.energy = energy;
                    flag.e = energy;
                    config(input, flag);
				// conf = mcconfig(energy)
				})
                return
			case 'bg':
				console.log(chalk.bold.red('bg mode no'))
				energyList.forEach(function (energy) {
					console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
                    flag.all = false;
                    flag.energy = energy;
                    flag.e = energy;
                    config(input, flag);
				})
                return
			case 'tr':
				console.log(chalk.bold.red('tr mode on'))
				energyList.forEach(function (energy) {
					console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
                    flag.all = false;
                    flag.energy = energy;
                    flag.e = energy;
                    config(input, flag);
				})
                return
		}
	} else {
		switch(flag.mode) {
			case 'mc':
				console.log(chalk.bold.red('mc mode on'))
				console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
				conf = mcconfig(energy)	
                break
			case 'bg':
				console.log(chalk.bold.red('bg mode on'))
				console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
				conf = bgconfig(energy)	
                break
			case 'tr':
				console.log(chalk.bold.red('tr mode on'))
				console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
				conf = trconfig(energy)	
                break
		}
	}

	console.log(chalk.bold.gray('Setting log level to ') + chalk.bold.red('Level ' + (flag.log ? 5 : 1)));

	console.log(chalk.bold.gray('The number of dst to analysis is ') + chalk.bold.red(conf.inputList.length));
	// console.log(chalk.bold.gray('The file of output is ') + chalk.bold.red(OutputFile));

	var output = {
		"OutputLevel": (flag.log) ? 1 : 5,
		"EvtMax": flag.EvtMax,
		// inputFile: JSON.stringify(inputList)
		"InputFileList": conf.inputList,
        "OutputFile": conf.OutputFile
	};


	var res = Mustache.render(optionTxt, output);

	fs.writeFileSync('BGOptions.txt', res);

}

module.exports = config;
// console.log(config);
