'use strict';
var test = require('ava');
var childProcess = require('child_process');

test('main', function (t) {
	t.plan(2);

	childProcess.execFile('./cli.js', ['fixture.css'], {cwd: __dirname}, function (err, stdout) {
		t.assert(!err, err);
		t.assert(stdout.trim() === 'body{}');
	});
});

test('stdin', function (t) {
	t.plan(2);

	childProcess.exec('echo \'body{/*comment*/}\' | ./cli.js', {cwd: __dirname}, function (err, stdout) {
		t.assert(!err, err);
		t.assert(stdout.trim() === 'body{}');
	});
});
