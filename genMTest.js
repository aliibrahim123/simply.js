import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

var logHelp = () => {
	console.log(`
usage: node genMTest.js <src> <force> <log>

args:
	source: whether to use sources file or compressed files
	force: whether to oferwrite files or not
	log: log results
`);
	process.exit()
};
if (process.argv.length !== 5) logHelp();
var usesrc = process.argv[2] === 'false' ? false : process.argv[2] === 'f' ? false : process.argv[2] === 'true' ? true : process.argv[2] === 't' ? true : logHelp();
var useforce = process.argv[3] === 'false' ? false : process.argv[3] === 'f' ? false : process.argv[3] === 'true' ? true : process.argv[3] === 't' ? true : logHelp();
var uselog = process.argv[4] === 'false' ? false : process.argv[4] === 'f' ? false : process.argv[4] === 'true' ? true : process.argv[4] === 't' ? true : logHelp();

[
	'dom',
	'comp',
	'com',
].forEach(i=>{
	fs.mkdir('test manual/' + i + '/', { recursive: true })
});

[
		['com/diff/simple', 3, []],
		['com/diff.g', 2, []],
		['com/copy.g', 2, []],
		['com/obj.g', 2, []],
		['com/arr.g', 2, []],
		['dom/base', 2, []],
		['dom/chain', 2, []],
		['dom/edit', 2, []],
		['comp/base', 2, [['dom/base', 2], ['com/diff.g', 2]]],
		
	].forEach(item => {
		let str = `
<!DOCTYPE html>
${item[2].map(item=>'<script ' + (usesrc === true ? "type = 'module' " : '') + "src='" + '../'.repeat(item[1]) + "lib/" + (usesrc ? 'src' : 'dist') + '/' + item[0] + '.js').join('\n')}
<script ${usesrc === true ? "type = 'module' " : ''}src='${'../'.repeat(item[1])}lib/${usesrc ? 'src' : 'dist'}/${item[0]}.js'></script>
`;
		if (uselog) console.log('test manual/' + item[0] + '.js:\n' + str + '\n');
		if (useforce || !existsSync('test manual/' + item[0] + '.html')) fs.writeFile('test manual/' + item[0] + '.html', str)
});