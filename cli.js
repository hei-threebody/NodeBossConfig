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
            type: 'int',
            default: 2.9,
            alias: 'e' 
        },
		evtmax: {
			type: 'int',
			default: -1,
			alias: 'n'
		},
		mode: {
			type: 'string',
			default: 'mc',
			alias: 'm'
		},
        all: {
            type: 'boolean',
            default: false
        },
        bg: {
			type: 'double',
		},
		mc: {
			type: 'double',
		},
		tr: {
			type: 'double',
		}
    }
})


console.log(cli[0], cli.flags);
module.exports = cli;
