var fs = require('fs')
var path = require('path')
var ProgressBar = require('progress') 
// var ora = require('ora')

// var travel = require('./travelAllAsync')
// var ora = require('ora')
// var chalk = require('chalk')

var listDir = require('./readFile')

function sleep(t) {
    var start = new Date()
    while (true) {
        var end = new Date()
        if (end.getTime() - start.getTime() > t) {
            return
        }
    }
}

function trconfig(energy) {
    var inOut = []

    var outputPrefix =  '/moose/Bes3User/hzhang/boss/PrintSomething/outTR/' + energy + '/'

    var energyJson = JSON.parse(fs.readFileSync('energy.json', 'utf-8'));
    var energyFiltered = energyJson.filter(e => e.energy == energy)

    var start = energyFiltered[0].start
    var end = energyFiltered[0].end

    var inout = {
        input: undefined,
        output: undefined
    }

    console.log(start, end)

    // console.log('start: ' + start)
    // console.log('end :' + end)
    // function travelNum(num) {
    //     console.log(num)
    //     listDir('/ustcfs/bes3data/665p01/rscan/dst')
    //         .then(function (data) {
    //             console.log(data.length)
    //         })
    //     }

    var bar = new ProgressBar('[:bar] :percent :current of :total', { total: end - start + 1 })

    // function travelPromise() {
    return new Promise((resolve, reject) => {

        (function travelNum(num) {
            if (num < end) {
                listDir('/ustcfs/bes3data/665p01/rscan/dst').then(function(data) {
                    bar.tick()

                    filted = data.filter(function (x) {
                        return (x.search('\\.dst') != -1 && x.search(num) != -1)
                    })
                    inOutPart = filted.map(function (x) {
                        return ({input: x, output: outputPrefix + x.match(/([^<>/\\\|:""\*\?]+)\.\w+$/)[1]})
                    })
                    inOut.push(...inOutPart)
                    travelNum(num + 1)
                })
            } else {
                // console.log('done')
                // console.log("inOut.length: " + inOut.length)
                resolve(inOut)
            }
        })(start)

    })
}

// travelPromise().then(function () {
//     console.log(inOut)
//     console.log('all done')
// })
//
// }

// var spin = ora('Loading')
// spin.start()
// sleep(10000)
// spin.succeed('Over')
//
// trconfig(2.9).then(function (data) {
//     data.forEach(function (item) {
//         item.output = item.output.replace(/\//, '_')
//     })
//     console.log(data)
// })
module.exports = trconfig
