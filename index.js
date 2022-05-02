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

	if (input.includes(`add`)) {
		data.initTemp(function () {
			data.addCollectionToJSON(flags.company, flags.login, flags.password);
		}, function () {
			data.saveDataToFile();
		});
	} else if (input.includes(`delete`)) {
		data.deleteFile();
	} else if (input.includes(`find`)) {
		data.initTemp(function () {
			console.log(data.getCollectionByCompany(flags.company));
		}, function () {

		});
	}
})();