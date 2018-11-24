var Mustache = require('mustache')
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var tmp = require('tmp');
var ProgressBar = require('progress')

var exec = require('child_process').exec;

var mcconfig = require('./mcconfig')
var bgconfig = require('./bgconfig')
var trconfig = require('./trconfig')

var fse = require('fs-extra')

function config(input, flag) {
	function condor_submit(filename) {
		function random(min, max) {
			return min* 1000 + Math.floor((max-min) * Math.random()) * 1000
		}

		function exec_always(command, callback) {
			exec(command, function (err, stdout, stderr) {
				if (err) {
                    console.log(err)
                    // console.log('err occcured')
					setTimeout( function () {
						exec_always(command, callback)
					} ,random(1, 10))
				} else {
					// console.log(stdout)
					// console.log(stderr)
					callback()
				}
			})
		}


		return new Promise((resolve, reject) => {
			setTimeout( function () {
				exec_always('condor_submit ' + filename, function () {
					resolve()
				})
			} , random(1, 100))
		})
	}

	function condor_sub(sub, opt) {
		// console.log(sub.length, opt.length)
		return new Promise((resolve, reject) => {
			fs.writeFile( logDir + '/' + inoutStr + '.sub', sub, function () {
				// console.log(sub.length)
				fs.writeFile(output_sub.argu, opt, function () {
					// console.log(opt.length, filename)
					resolve( logDir + '/' + inoutStr + '.sub' )
				})
			})
		})
	}

	function check_log_folder(energy, mode) {

        configDir = '/moose/Bes3User/hzhang/boss/PrintSomething/out' + mode.toUpperCase() + '_CONF' + '/' + String(energy)
        logDir = '/moose/Bes3User/hzhang/boss/PrintSomething/out' + mode.toUpperCase() + '_LOG' + '/' + String(energy)
		outputDir = '/moose/Bes3User/hzhang/boss/PrintSomething/out' + mode.toUpperCase() + '/' + String(energy)

		return new Promise((resolve, reject) => {
			console.log('Make config dir ' + chalk.bold.red(configDir))

			fse.ensureDir(configDir)
				.then( () => {
					console.log('Make log dir ' + chalk.bold.red(logDir))
					return fse.ensureDir(logDir)
				})
				.then( () => {
					console.log('make output dir ' + chalk.bold.red(outputDir))
					return fse.ensureDir(outputDir)
				})
				.then( () => {
					resolve()
				})
		})

	}

    var outputDir = undefined
    var logDir = undefined
    var configDir = undefined

	var optionTxt = fs.readFileSync('BGPrintSomethingOptions.txt', 'utf-8')
	var subTxt = fs.readFileSync('boss.sub', 'utf-8')

	var energy = flag.energy

	var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
	var energyFiltered = energyJson.filter(e => e.energy == flag.energy)
	var energyList = energyJson.map(e => e.energy)

	var conf = undefined
	var output_sub = undefined

	if (energyFiltered.length == 0) {
		console.log(chalk.bold.red('Error, bad energy'))
		return
	}


	switch(flag.mode) {
		case 'mc':
			console.log(chalk.bold.red('mc mode on'))
			conf = mcconfig
			break
		case 'bg':
			console.log(chalk.bold.red('bg mode on'))
			conf = bgconfig
			break
		case 'tr':
			console.log(chalk.bold.red('tr mode on'))
			conf = trconfig
			break
	}

	console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))

	check_log_folder(energy, flag.mode)
		.then( () => {
			return conf(energy)
		})
		.then(function (data) {
            // console.log(data)
			var inOut = data
            console.log(inOut.length)
            // console.log(inOut)
			var inOutBar = new ProgressBar('[:bar] :perent :current of :total', {total: inOut.length})
			inOut.forEach(function (inout) {
				inoutStr = inout.match(/([^<>/\\\|:""\*\?]+)\.\w+$/)[1].replace(/\//g, '_')

				var output = {
					"OutputLevel": (flag.log) ? 1 : 5,
					"EvtMax": flag.evtmax,
					// inputFile: JSON.stringify(inputList)
					"InputFileList": inout,
					"OutputFile": outputDir + '/' + inoutStr + '.root'
				};

				output_sub = {
					"argu": configDir + '/' + inoutStr + '.txt',
					"output": logDir + '/' +  inoutStr + '.log'
				}

				var res_txt = Mustache.render(optionTxt, output);
				var res_sub = Mustache.render(subTxt, output_sub);

				condor_sub(res_sub, res_txt)
				.then( (data) => {
					return condor_submit(data)
				})
				.then( () => {
					inOutBar.tick()
				})
			})
		})

}

module.exports = config;
