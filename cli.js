#!/usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import getStdin from 'get-stdin';
import meow from 'meow';
import stripCssComments from 'strip-css-comments';

const cli = meow(`
	Usage
	  $ strip-css-comments <input-file> > <output-file>
	  $ strip-css-comments < <input-string>

	Options
	  --preserve=<regex>  Preserve comments matching a regex [Default: ^!]
	  --no-preserve       Strip all comments including \`/*!\`

	Examples
	  $ strip-css-comments src/app.css > dist/app.css
	  $ strip-css-comments < src/app.css --preserve='^#'
`, {
	importMeta: import.meta,
});

function init(data) {
	console.log(stripCssComments(data, cli.flags));
}

const input = cli.input[0];

if (typeof cli.flags.preserve === 'string') {
	cli.flags.preserve = new RegExp(cli.flags.preserve);
}

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	(async () => {
		init(await getStdin());
	})();
}
