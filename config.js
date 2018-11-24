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

	function condor_sub(sub, opt, filename) {
		tmpPrefix = '2.8/'
		// console.log(sub.length, opt.length)
		return new Promise((resolve, reject) => {
			fs.writeFile(tmpPrefix + filename + '.sub', sub, function () {
				// console.log(sub.length)
				fs.writeFile(tmpPrefix + filename + '.txt', opt, function () {
					// console.log(opt.length, filename)
					resolve(tmpPrefix + filename + '.sub')
				})
			})
		})
	}

	function check_log_folder(energy, mode) {
		return new Promise((resolve, reject) => {
			console.log('make config dir')
			fse.ensureDir('/moose/Bes3User/hzhang/boss/PrintSomething/out' + mode.toUpperCase() + '/' + String(energy))
				.then( () => {
					console.log('make log dir')
					fse.ensureDir('/moose/Bes3user/hzhang/boss/PrintSomething/out' + mode.toUpperCase() + '/' + String(energy))
				})
				.then( () => {
					console.log('make output dir')
					resolve()
				})
		})
	}


	var optionTxt = fs.readFileSync('BGPrintSomethingOptions.txt', 'utf-8')
	var subTxt = fs.readFileSync('boss.sub', 'utf-8')

	var energy = flag.energy

	var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
	var energyFiltered = energyJson.filter(e => e.energy == flag.energy)
	var energyList = energyJson.map(e => e.energy)

	var conf = undefined

	if (energyFiltered.length == 0) {
		// console.log(chalk.bold.red('Error, bad energy'))
		return
	}


	switch(flag.mode) {
		case 'mc':
			console.log(chalk.bold.red('mc mode on'))
			console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
			conf = mcconfig
			break
		case 'bg':
			console.log(chalk.bold.red('bg mode on'))
			console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
			conf = bgconfig
			break
		case 'tr':
			console.log(chalk.bold.red('tr mode on'))
			console.log(chalk.bold.gray('Dealing With Energy ') + chalk.bold.red(energy))
			conf = trconfig
			break
	}

	check_log_folder(energy, flag.mode)
		.then( () => {
			conf(energy)
		})
		.then(function (data) {
			var inOut = data
			var inOutBar = new ProgressBar('[:bar] :perent :current of :total', {total: inOut.length})
			inOut.forEach(function (inout) {
				var output = {
					"OutputLevel": (flag.log) ? 1 : 5,
					"EvtMax": flag.evtmax,
					// inputFile: JSON.stringify(inputList)
					"InputFileList": inout.input,
					"OutputFile": inout.output + '.root'
				};

				output_s = inout.output.replace(/\//g, '_')

				var output_sub = {
					"argu": output_s + '.txt',
					"output": output_s
				}

				// var tmpname = tmp.tmpNameSync({ template: '/home/hzhang/Run/NodeBossConfig/config/XXXXXX.txt' })

				var res_txt = Mustache.render(optionTxt, output);
				var res_sub = Mustache.render(subTxt, output_sub);

				// console.log(res_txt, res_sub)
				condor_sub(res_sub, res_txt, output_s).then(function (data) {
					// console.log(data)
					// inOutBar.tick()
					condor_submit(data).then(function () {
						inOutBar.tick()
					})
				})
				// // fs.writeFileSync('tmp/' + inout.output.replace(/\//g, '_') + '.txt', res);
			})
		})

}

module.exports = config;
