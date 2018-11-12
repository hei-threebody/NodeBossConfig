var meow = require('meow');
const cli = meow(`
    Usage
        $ config

    Options
        --log, -l Set the OutputLevel of Algo to 1 and get the detail log of Algo
        --energy, -e Set the EnergyLever of Algo
        --no-log Set the OutputLevel of Algo to 5 and this is default options

    Examples
        $ config
`, {
    booleanDefault: undefined,
    flags: {
        log: {
            type: 'boolean',
            default: false,
            alias: 'l'
        },
        energy: {
            type: 'string',
            default: 2.9,
            alias: 'e' 
        }
    }
})


// config(cli.input[0], cli.flags);
//

function config(input, flags) {
console.log(o);
}

console.log(cli.input[0], cli.flags);
config(cli.flags);
