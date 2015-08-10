#!/usr/bin/env node
'use strict';
var fs = require('fs');
var stdin = require('get-stdin');
var meow = require('meow');
var fn = require('strip-css-comments');

var cli = meow({
	help: [
		'Usage',
		'  $ strip-css-comments <input-file> > <output-file>',
		'  $ strip-css-comments < <input-string>',
		'',
		'Options',
		'  --preserve=<regex>  Preserve comments matching a regex [Default: ^!]',
		'  --no-preserve       Strip all comments including `/*!`',
		'',
		'Examples',
		'  $ strip-css-comments src/app.css > dist/app.css',
		'  $ strip-css-comments < src/app.css --preserve=\'^#\''
	]
}, {
	string: ['_']
});

function init(data) {
	console.log(fn(data, cli.flags));
}

var input = cli.input[0];

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
	stdin(init);
}
