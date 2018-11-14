var fs = require('fs')
var path = require('path')

travel = require('./travelFolder')
function mcconfig(energy) {

	var outputPrefix =  '/moose/Bes3User/hzhang/boss/PrintSomething/outMC/' + energy + '/'
	
	var energyStr = (energy == 3) ? (String(energy) + '.0') : String(energy)	

	var inOut = []
	var inout = {
		input: undefined,
		output: undefined
	}

	travel('/ustcfs/bes3user/2013/liud/work/mcwork/mcLambdaSigma/' + energyStr + '_chrgtrk_ConExcvhdrphsp/dst/', function (pathname) {
		if (pathname.search('\\.dst') != -1) {
			inout.input = pathname
			inout.output = outputPrefix + pathname.match(/([^<>/\\\|:""\*\?]+\.\w+$)/)[0]
			inOut.push(inout)
		}
	})

	return inOut
}

module.exports = mcconfig
