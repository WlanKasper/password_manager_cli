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
const async = require ('async');
// const cipher = require('./src/cipher');

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

	if (input.includes(`add`)){
		data.initTemp(function(){
			data.addCollectionToJSON('google', 'login123', 'psw123');
		}, function(){
			data.saveDataToFile();
		});
	}
	else if (input.includes(`delete`)){
		data.deleteFile();
	}
	else if (input.includes(`find`)){
		data.initTemp(function(){
			console.log(data.getCollectionByCompany('google'));
		}, function(){
			
		});
	}
})();