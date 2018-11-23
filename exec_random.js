var exec = require('child_process').exec;

function random(min, max) {
    return min* 1000 + Math.floor((max-min) * Math.random()) * 1000
}

function exec_always(command, callback) {
    exec(command, function (err, stdout, stderr) {
        if (err) {
            console.log('err occcured')
            setTimeout( function () {
                    exec_always(command, callback)
                } ,random(1, 10))
        } else {
            console.log(stdout)
            console.log(stderr)
            callback()
        }
    })
}


exec_always('condor', function () {
    console.log('done')
})
