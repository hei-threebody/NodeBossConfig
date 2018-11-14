var fs = require('fs')
var path = require('path')

var travel = require('./travelFolder')

function bgconfig(energy) {

	var inOut = [];
    var energy = energy * 10000
    var energyStr = String(energy)[0] + '.' + String(energy).slice(1,)

	var outputPrefix = '/moose/Bes3User/hzhang/boss/PrintSomething/outBG/' + energy + '/'

	var inout = {
		input: undefined,
		output: undefined
	}

    travel('/ustcfs/bes3user/2013/xial/qqbar/' + energyStr + '/rec01/', function (pathname) {
        if (pathname.search('\\.dst') != -1) {
			inout.input = pathname
			inout.output = outputPrefix +  pathname.match(/([^<>/\\\|:""\*\?]+\.\w+$)/)[0]
            inputList.push(pathname)
        }
    })

    return inOut
}

module.exports = bgconfig
