var Mustache = require('mustache')
var fs = require('fs');
var exec = require('child_process').execSync;


for (var i = 1; i < 10; i++) {
    var output = {
        argu: i
    }

    var optionTxt = fs.readFileSync('boss.pub', 'utf-8')
    var res = Mustache.render(optionTxt, output);
    fs.writeFileSync('./bossTmp.pub', res);
    exec('condor_submit bossTmp.pub', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    })
}

