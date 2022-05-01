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
const data = require('./src/manager');
const cipher = require('./src/cipher');

const input = cli.input;
const flags = cli.flags;
const {
	clear,
	debug
} = flags;

(async () => {

	init({
		clear
	});
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if (input.concat(`test`)){
		// cipher.saveKey();
		data.initTemp();

		// var text = 'alskfs fsdfjkls fsdj kf230929d s f{}][[ dsdf';
		// console.log('\ntext:' + text);

		// var encrypted = cipher.encrypt(text);

		// var decrypted = cipher.decrypt(encrypted);
	}
})();