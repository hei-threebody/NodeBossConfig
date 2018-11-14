var ora = require('ora')
var travel = require('./travelFolder')
var exec = require('child_process').exec


const spinner = ora('Loading')

spinner.start()


exec('sleep 100', function (error, stdout, stderr) {
    spinner.succeed()
})
// travel('.', function () {
//     for (var i = 1; i < 1e6; i++) {
//         a = a + i
//     }
// })




// setTimeout(() => {
//     spinner.color = 'yellow';
//     spinner.text = 'Loading rainbows';
// }, 1000);

