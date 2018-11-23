var fs = require('fs')
var path = require('path')
var ProgressBar = require('progress') 
var listDir = require('./readFile')

function bgconfig(energy) {

    var inOut = [];
    var energy = energy * 10000
    var energyStr = String(energy)[0] + '.' + String(energy).slice(1,)

    var outputPrefix = '/moose/Bes3User/hzhang/boss/PrintSomething/outBG/' + energy + '/'

    var inout = {
        input: undefined,
        output: undefined
    }

    return new Promise((resolve, reject) => {
        listDir('/ustcfs/bes3user/2013/xial/qqbar/' + energyStr + '/rec01/').then(function (data) {
            filted = data.filter(function (x) {
                return (x.search('\\.dst') != -1)
            })

            inOut = filted.map(function (x) {
                return ({input: x, output: outputPrefix + x.match(/([^<>/\\\|:""\*\?]+)\.\w+$/)[1]})
            })
        })

        return inOut
    })
}

module.exports = bgconfig
