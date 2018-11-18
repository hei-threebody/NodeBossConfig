var ProgressBar = require('progress');
var exec = require('child_process').exec;

var bar = new ProgressBar('[:bar] :percent :current of :total', { total: 20 });
// var timer = setInterval(function () {
//     bar.tick();
//     if (bar.complete) {
//         console.log('\ncomplete\n');
//         clearInterval(timer);
//     }
// }, 100);

(function next(num) {
	exec('condor_q | grep hzhang | wc -l', function(err, stdout, stderr) {
		var chunk = parseInt(stdout);
		// console.log(chunk)
		bar.tick(20 - num - chunk);

		if (!bar.complete) {
			setTimeout(function () {
				next(20 - chunk)
			}, 1000)
		}
	}
)})(0);
