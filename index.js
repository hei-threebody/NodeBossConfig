var Mustache = require('mustache');
var fs = require('fs');
var path = require('path');
var meow = require('meow');

var config = require('./config');
var cli = require('./cli');


// if (cli.flags.all) {
//         j

config(cli[0], cli.flags);
