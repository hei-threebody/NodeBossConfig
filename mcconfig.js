var fs = require('fs')
var path = require('path')

var listDir = require('./readFile')
function mcconfig(energy) {

    var energyStr = (energy == 3) ? (String(energy) + '.0') : String(energy)

    return new Promise((resolve, reject) => {
        listDir('/ustcfs/bes3user/2013/liud/work/mcwork/mcLambdaSigma/' + energyStr + '_chrgtrk_ConExcvhdrphsp/dst/').then(function (data) {
            var inOut = data.filter(function (x) {
                return (x.search('\\.dst') != -1)
            })

			// inOut = filted.map(function (x) {
				// return ({input: x, output: outputPrefix + x.match(/([^<>/\\\|:""\*\?]+)\.\w+$/)[1]})
			// })
            // console.log(inOut)
            resolve(inOut)
        })
    })

}

module.exports = mcconfig
