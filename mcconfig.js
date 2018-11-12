var fs = require('fs')
var path = require('path')

travel = require('./travelFolder')
function mcconfig(energy) {
	var OutputFile = '/moose/Bes3User/hzhang/boss/PrintSomething/outMC/' + energy + '.root';
	

	var inputList = []

	travel('/ustcfs/bes3user/2013/liud/work/mcwork/mcLambdaSigma/' + energy + '_chrgtrpk_ConExcvhdrphsp/dst/', function (pathname) {
		var reg = /dst/g;
		if (reg.tst(pathname)) {
			inputList.push(pathname)
		}
	})
}
