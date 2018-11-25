var Mustache = require('mustache');
var fs = require('fs');
var path = require('path');
var meow = require('meow');

var config = require('./config');
var cli = require('./cli');


// if (cli.flags.all) {
//         j

config(cli[0], cli.flags);

// function all() {
//     if (flag.all) {
//         console.log(chalk.bold.red('You choose all mode'));
//
//         return new Promise((resolve, reject) => {
//
//             (function travleEnergy(energyNum) {
//                 var flaglocal = flag
//                 if (energyNum < energyList.length) {
//                     flaglocal.energy = energyList[energyNum]
					
