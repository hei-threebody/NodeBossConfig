var ora = require('ora')
var travel = require('./travelFolder')


const spinner = ora('Loading').start()
var a = 0
return
travel('.', function () {
	for (var i = 1; i < 1e6; i++) {
		a = a + i
	}
})




// setTimeout(() => {
//     spinner.color = 'yellow';
//     spinner.text = 'Loading rainbows';
// }, 1000);

