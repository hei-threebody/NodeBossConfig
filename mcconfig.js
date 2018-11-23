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

    return new Promise((resolve, reject) => {

        listDir('/ustcfs/bes3user/2013/liud/work/mcwork/mcLambdaSigma/' + energyStr + '_chrgtrk_ConExcvhdrphsp/dst/').then(function (data) {
            filted = data.filter(function (x) {
                return (x.search('\\.dst') != -1)
            })

            inOut = filted.map(function (x) {
                return ({input: x, output: outputPrefix + x.match(/([^<>/\\\|:""\*\?]+)\.\w+$/)[1]})
            })
        })
    })

}

module.exports = mcconfig
