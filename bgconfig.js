var fs = require('fs')
var path = require('path')

var travel = require('./travelFolder')

function bgconfig(energy) {
	var inputList = [];
	var energy = flag.energy * 10000
	var energyStr = String(energy)[0] + '.' + String(energy).slice(1,)

	var OutputFile = '/moose/Bes3User/hzhang/boss/PrintSomething/outBG/' + energyStr + '.root';
	
	travel('/ustcfs/bes3user/2013/xial/qqbar/' + energy + '/rec01/', function (pathname) {
		var reg = /dst/g;
		if (reg.test(pathname)) {
			inputList.push(pathname)
		}
	})
}

