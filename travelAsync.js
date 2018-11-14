var fs = require('fs')
var path = require('path')
var ora = require('ora')

fs.readdir('.', function (err, files) {
    console.log(files)
})

function travel(dir, callback) {
    fs.readdir(dir, function (err, files) {
        files.forEach(function (file) {
            var pathname = path.join(dir, file);
            fs.stat(pathname, function (err, stats) {
                if (stats.isDirectory()) {
                    travel(dir, callback)
                }
                else {
                    callback(pathname);
                }
            })
        })
    })
}

const spin = ora()
spin.start('Loading')
travel('.', function(pathname) {
    // console.log(pathname)
})            
spin.succeed()


