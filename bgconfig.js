var fs = require('fs')
var path = require('path')
var ProgressBar = require('progress') 
var listDir = require('./readFile')

function bgconfig(energy) {

    var energy = energy * 10000
    var energyStr = String(energy)[0] + '.' + String(energy).slice(1,)

    return new Promise((resolve, reject) => {
        listDir('/ustcfs/bes3user/2013/xial/qqbar/' + energyStr + '/rec01/').then(function (data) {
            var inOut = data.filter(function (x) {
                return (x.search('\\.dst') != -1)
            })

        resolve(inOut)
        })

    })
}

module.exports = bgconfig
