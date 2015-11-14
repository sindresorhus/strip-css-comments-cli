#!/usr/bin/env node
'use strict';
const fs = require('fs');
const getStdin = require('get-stdin');
const meow = require('meow');
const fn = require('strip-css-comments');

const cli = meow(`
	'Usage
	'  $ strip-css-comments <input-file> > <output-file>
	'  $ strip-css-comments < <input-string>

	'Options
	'  --preserve=<regex>  Preserve comments matching a regex [Default: ^!]
	'  --no-preserve       Strip all comments including \`/*!\`

	'Examples
	'  $ strip-css-comments src/app.css > dist/app.css
	'  $ strip-css-comments < src/app.css --preserve='^#'
`, {
	string: ['_']
});

function init(data) {
	console.log(fn(data, cli.flags));
}

const input = cli.input[0];

if (typeof cli.flags.preserve === 'string') {
	cli.flags.preserve = new RegExp(cli.flags.preserve);
}

if (!input && process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Filepath required');
		process.exit(1);
	}
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	getStdin().then(init);
}
