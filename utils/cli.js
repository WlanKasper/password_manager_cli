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
		alias: `cp`,
		desc: `Add company name: Google`
	},
	login: {
		type: `string`,
		alias: `l`,
		desc: `Add login: example@mail.com`
	},
	password: {
		type: `string`,
		alias: `p`,
		desc: `Add password: example123`
	},
	link: {
		type: `string`,
		alias: `lk`,
		desc: `Add link: example.com`
	},
	mnemonic: {
		type: `string`,
		alias: `m`,
		desc: `Add mnemonic: example-example-...`
	},
	restore_key: {
		type: `string`,
		alias: `rk`,
		desc: `Add restore_key: example-example-...`
	}
};

const commands = {
	help: { desc: `Print help info` }
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
