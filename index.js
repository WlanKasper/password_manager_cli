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
const { check } = require('prettier');

const input = cli.input;
const flags = cli.flags;
const {
	clear,
	start,
	debug
} = flags;

(async () => {

	init({
		clear
	});

	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if (input.includes('create_key'))
	{
		cipher.createKeyPair(flags.authorization);
	}

	if (input.includes('add'))
	{
		data.initTemp
		(
			flags.authorization,
			function () {
			data.addCollectionToJSON(flags.company, flags.login, flags.password);
			},
			function () {
			data.saveDataToFile();
			}
		);
	}

	if (input.includes(`find`))
	{
		data.initTemp
		(
			flags.authorization,
			function () {
				console.log(data.getCollectionByCompany(flags.company));
			},
			function () {
				// null
			}
		);
	}

	if (input.includes('delete'))
	{
		data.deleteFile();
	}

	// if (input.includes(`test`)) {
	// 	let data = cipher.encrypt('privet');
	// 	console.log('\ndata: ' + data.toString("base64"));
	// 	let res = cipher.decrypt(data);
	// 	console.log('\nres: ' + res.toString());
	// }

})();