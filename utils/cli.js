const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	company: {
		type: `string`,
		alias: `c`,
		desc: `Use to input company name`
	},
	login: {
		type: `string`,
		alias: `l`,
		desc: `Use to input login`
	},
	password: {
		type: `string`,
		alias: `p`,
		desc: `Use to input password`
	},
	link: {
		type: `string`,
		alias: `lk`,
		desc: `Use to input company link`
	},
	mnemonic: {
		type: `string`,
		alias: `m`,
		desc: `Use to input mnemonic`
	},
	restore_key: {
		type: `string`,
		alias: `r`,
		desc: `Use to input restore key`
	}
};

const commands = {
	help: { desc: `Print help info` },
	add: { desc: `Add new data to storage` },
	find: { desc: `Fins data in storage` },
	delete: { desc: `delete all data from storage` }
};

const helpText = meowHelp({
	name: `psw-m`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
