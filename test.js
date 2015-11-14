import childProcess from 'child_process';
import test from 'ava';
import pify from 'pify';

test('main', async t => {
	const stdout = await pify(childProcess.execFile)('./cli.js', ['fixture.css']);
	t.is(stdout.trim(), 'body{}');
});

test('stdin', async t => {
	const stdout = await pify(childProcess.exec)('echo \'body{/*comment*/}\' | ./cli.js');
	t.is(stdout.trim(), 'body{}');
});
