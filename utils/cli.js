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
		alias: `company`,
		desc: `Add company name: Google`
	},
	login: {
		type: `string`,
		alias: `login`,
		desc: `Add login: example@mail.com`
	},
	password: {
		type: `string`,
		alias: `password`,
		desc: `Add password: example123`
	},
	link: {
		type: `string`,
		alias: `link`,
		desc: `Add link: example.com`
	},
	mnemonic: {
		type: `string`,
		alias: `mnemonic`,
		desc: `Add mnemonic: example-example-...`
	},
	restore_key: {
		type: `string`,
		alias: `restore_key`,
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
