#!/usr/bin/env node

/**
 * password-manager
 * password manager project
 *
 * @author wlankasper <no>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const data = require('./src/data');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if (input.includes('add')){
		data.initJSON();
		data.addNewCollection('Google','wlankasper@gmail.com', 'test_psw');
		data.saveDataToFile();
	}
})();
