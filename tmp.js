var listDir = require('./readFile.js')

listDir('/usr/bin').then(function (data) {
	console.log(data)
})
