import { execSync } from 'node:child_process';
import * as esbuild from 'esbuild';

var scripts = [
	'com/diff.g.js',
	'com/copy.g.js',
	'com/obj.g.js',
	'dom/base.js',
	'dom/chain.js',
	'dom/edit.js',
	'comp/base.js',
];

esbuild.build({
	entryPoints: scripts.map(script => 'lib/src/' + script),
	bundle: true,
	minify: true,
	keepNames: true,
	metafile: true,
	outdir: 'lib/dist'
}).then(result => esbuild.analyzeMetafile(result.metafile)).then(result => console.log(result))
