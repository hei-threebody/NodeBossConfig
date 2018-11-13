var fs = require('fs')
var path = require('path')

var travel = require('./travelFolder')

function trconfig(energy) {
	var inputList = []
	var OutputFile = '/moose/Bes3User/hzhang/boss/PrintSomething/outTR/' + energy + '.root';

	
	var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
	var energyFiltered = energyJson.filter(e => e.energy == energy)

	var start = energyFiltered[0].start
	var end = energyFiltered[0].end

	console.log('start: ' + start)
	console.log('end :' + end)
	// return
	
	function travelNum(num) {
		travel('/ustcfs/bes3data/665p01/rscan/dst/', function (pathname) {
			if (pathname.search('\\.dst') != -1 && pathname.search(num) != -1) {
				inputList.push(pathname)
			}

		})
	}
	for (var i = start; i <= end; i++) {
		// console.log(i)
		travelNum(i)
	}
	
	return {
		inputList,
		OutputFile
	}
}

console.log(trconfig(2.9))
module.exports = trconfig
