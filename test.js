import test from 'ava';
import execa from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture.css']);
	t.is(stdout, 'body{}\n');
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {input: 'body{/*comment*/}'});
	t.is(stdout, 'body{}');
});
