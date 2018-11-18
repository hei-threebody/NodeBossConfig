var exec = require('child_process').execSync;

var result = exec('condor_q | grep hzhang | wc -l', function (error, stdout, stderr) {
    console.log('stdout: ' + error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
}).toString('utf-8')

// console.log(result)
var resultNum = parseInt(result)
console.log(resultNum)
