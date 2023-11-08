//build source files into compressed files

import { execSync } from 'node:child_process';
import * as esbuild from 'esbuild';

//in comp/..., the path to base.js is replaced with '../src/comp/base.js'
var fixCompPath = {
	name: 'fix-comp-path',
	setup(build) {
		build.onResolve({ filter: /^\.\.\/comp\/base\.js$/ }, args => {
			return { path: args.path, external: true }
		})
	},
}

var scripts = [
	'com/diff.g.js',
	'com/diff.js',
	'com/copy.g.js',
	'com/copy.js',
	'com/arr.g.js',
	'com/arr.js',
	'com/obj.g.js',
	'com/obj.js',
	'com/str.g.js',
	'com/str.js',
	'com/set.g.js',
	'com/set.js',
	'com/is.g.js',
	'com/is.js',
	'com/match.g.js',
	'com/match.js',
	'com/function.g.js',
	'com/function.js',
	'com/functional.g.js',
	'com/functional.js',
	'com/type.js',
	'com/type.g.js',
	'com/reactive.g.js',
	'com/reactive.js',
	'com/promise.g.js',
	'com/promise.js',
	'com/structure/events.g.js',
	'com/structure/events.js',
	'com/timing.g.js',
	'com/timing.js',
	'dom/base.js',
	'dom/base.g.js',
	'dom/els.js',
	'dom/els.g.js',
	'dom/chain.js',
	'dom/chain.g.js',
	'dom/router.js',
	'dom/router.g.js',
	'dom/edit.js',
	'comp/base.js',
	'comp/router.js',
	'cli/base.g.js',
	'cli/base.js',
	'cli/ansi.g.js',
	'cli/ansi.js',
	'cli/prompt.g.js',
	'cli/prompt.js',
	'encode/csv.js',
	'encode/csv.g.js',
	'encode/toml.js',
	'encode/toml.g.js',
	'encode/mine.js',
	'encode/mine.g.js',
	'encode/mine.lite.js',
	'encode/mine.lite.g.js',
	'debug/expect.js',
	'debug/assert.g.js',
	'debug/assert.js',
	'debug/test.g.js',
	'debug/test.js',
	'debug/test/load.js',
	'debug/test/loggers/console.js',
	'debug/test/inputters/cli.js',
	'serve/base.js',
	'serve/base.g.js',
	'serve/body.js',
	'serve/body.g.js'
];

esbuild.build({
	entryPoints: scripts.map(script => 'lib/src/' + script),
	bundle: true,
	minify: true,
	platform: 'neutral',
	keepNames: true,
	metafile: true,
	external: [
		//node modules
		'node:fs/promises',
		'node:path/posix',
		'node:stream',
		'node:readline',
		'node:readline/promises',
		
		//inner dependencies
		'./lib/src/comp/base.js'
	],
	outdir: 'lib/dist',
	plugins: [fixCompPath]
}).then(result => esbuild.analyzeMetafile(result.metafile)).then(result => console.log(result))
