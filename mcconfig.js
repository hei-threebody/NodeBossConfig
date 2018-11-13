var fs = require('fs')
var path = require('path')

travel = require('./travelFolder')
function mcconfig(energy) {
	var OutputFile = '/moose/Bes3User/hzhang/boss/PrintSomething/outMC/' + energy + '.root';
    var energyStr = (energy == 3) ? (String(energy) + '.0') : String(energy)	

	var inputList = []

	travel('/ustcfs/bes3user/2013/liud/work/mcwork/mcLambdaSigma/' + energyStr + '_chrgtrk_ConExcvhdrphsp/dst/', function (pathname) {
		var reg = /dst/g;
		if (reg.test(pathname)) {
			inputList.push(pathname)
		}
	})

	return {
		inputList,
		OutputFile
	}
}

module.exports = mcconfig
