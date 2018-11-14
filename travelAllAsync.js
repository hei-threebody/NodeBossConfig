var fs = require('fs');
var path = require('path');
var ora = require('ora');

function travelSync(dir, callback, finish){
    fs.readdir(dir, function (e, files) {
         if (e === null) {
            // i 用于定位当前遍历位置
            (function next(i) {
                 // 当i >= files 表示已经遍历完成，进行遍历下一个文件夹
                if(i < files.length){
                    var pathname = path.join(dir, files[i]);
                    if(fs.stat(pathname, function (e, stats) {
                        if(stats.isDirectory()){
                            travelSync(pathname, callback, function () {
                                next(i + 1);
                            });
                        }else{
                            callback(e, pathname, function () {
                                next(i + 1);
                            });
                        }
                    }));
                }else{
                    /** * 当 i >= files.length 时，即表示当前目录已经遍历完了， 需遍历下一个文件夹 * 这里执行的时递归调用 传入的 方法 ， 方法里调用了 next(i) 记录了当前遍历位置 */
                    finish && finish();
                }

            })(0);
        }else{
            callback(e);
        }
    });
}

module.exports = travelSync
// var spin = ora();
// spin.start('Loading')
// travelSync('.', function (e, file, next) {
//     if(e !== null){
//         console.log(e);
//     }
//
//     var a = 0;
//     for (var i = 1; i < 1e7; i ++) {
//         a = i + a
//     }
//     // console.log(file);
//     //获取下一个文件 next 里面调用了 next(i) 记录了当前遍历位置
//     next();
// }, function() {
//     spin.succeed('Done')
// }
// );
// // spin.succeed('Done')
