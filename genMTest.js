//generate manual tests

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import make from './lib/src/cli/base.js';

var program = make('generate', '0.0.1')
	.describe('generate manual test', 'used to generate files to manualy test the api');
	
	program.option(['-c', '--comp', '--compressed'], '', 'use minified files', false)
	.option(['-f', '--force'], '', 'overwrite files', false)
	.option(['-l', '--log'], '', 'log results', false)

program.handle(async (args) => {
	//create folders
	await Promise.all([
		'dom',
		'comp',
		'com',
		'debug',
		'encode'
	].map(i=>{
		return mkdir('test manual/' + i + '/', { recursive: true });
	}));
	
	//create files
	[	//[filename, depth]
		['com/diff.g', 2],
		['com/copy.g', 2],
		['com/obj.g', 2],
		['com/arr.g', 2],
		['com/str.g', 2],
		['com/set.g', 2],
		['com/is.g', 2],
		['com/match.g', 2],
		['com/function.g', 2],
		['com/functional.g', 2],
		['com/timing.g', 2],
		['com/reactive.g', 2],
		['com/type.g', 2],
		['com/promise.g', 2],
		['dom/base', 2],
		['dom/chain', 2],
		['dom/edit', 2],
		['encode/csv.g', 2],
		['encode/toml.g', 2],
		['encode/mine.g', 2],
		['encode/mine.lite.g', 2],
		['comp/base', 2],
		['debug/expect', 2],
		['debug/assert.g', 2],
		['debug/test.g', 2],
	].forEach(item => {
		let str = `<!DOCTYPE html>
<script type = 'module' src='${'../'.repeat(item[1])}lib/${args.dist ? 'dist' : 'src'}/${item[0]}.js'></script>
`;
		if (args.force || !existsSync('test manual/' + item[0] + '.html')) {
			writeFile('test manual/' + item[0] + '.html', str);
			if (args.log) console.log('generated: test manual/' + item[0] + '.html')
		}
	});
})

program.parse()