var Mustache = require('mustache')
var fs = require('fs');
var exec = require('child_process').execSync;

function random(min, max) {
    var rand = Math.random()
    return min + Math.round((max - min) * rand)
}

for (var i = 1; i <= 20; i++) {
    var rand = random(10, 200)
    console.log(rand)
    var output = {
        argu: rand
    }

    var optionTxt = fs.readFileSync('sleep.sub', 'utf-8')
    var res = Mustache.render(optionTxt, output);
    fs.writeFileSync('./sleepTmp.sub', res);
    exec('condor_submit sleepTmp.sub', function (error, stdout, stderr) {
        console.log(error)
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    })
}

