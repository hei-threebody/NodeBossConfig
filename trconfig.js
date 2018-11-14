var fs = require('fs')
var path = require('path')
var ora = require('ora')

var travel = require('./travelFolder')

function trconfig(energy) {
	var inOut = []

	var outputPrefix =  '/moose/Bes3User/hzhang/boss/PrintSomething/outTR/' + energy + '/'
	
	var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
	var energyFiltered = energyJson.filter(e => e.energy == energy)

	var start = energyFiltered[0].start
	var end = energyFiltered[0].end

	var inout = {
		input: undefined,
		output: undefined
	}

	console.log('start: ' + start)
	console.log('end :' + end)
	
	function travelNum(num) {
		travel('/ustcfs/bes3data/665p01/rscan/dst/', function (pathname) {
			if (pathname.search('\\.dst') != -1 && pathname.search(num) != -1) {
				inout.input = pathname
				inout.output = outputPrefix + pathname.match(/([^<>/\\\|:""\*\?]+\.\w+$)/)[0]
				inOut.push(inout)
			}

		})
	}

	for (var i = start; i <= end; i++) {
		ora.start('Dealing with Run Number ' + i)
        // console.log('Dealing with Run Number ' + i)
		travelNum(i)
		ora.stop()
	}

	return inOut
	
}

// console.log(trconfig(2.9))
module.exports = trconfig
