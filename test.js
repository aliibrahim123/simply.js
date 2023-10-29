//test root

import { run } from './lib/src/debug/test.g.js';
import { load } from './lib/src/debug/test/load.js';
import consoleLogger from './lib/src/debug/test/loggers/console.js';
import make from './lib/src/cli/base.js';
import './lib/src/debug/expect.js';

globalThis.loadedFiles = 0;

var cli = make('tester', 'run tests', '', { logHelpIfEmptyArgs: false });
cli.argument('[...suites]', 'suites to run', [''])
  .option(['-t', '--tags'], '<...tags>', 'include only tests that include these tags')
  .option(['-i', '--interval'], '<ms>', 'interval', 20, { type: 'number in ms' })
  .handle(async ({suites, tags, interval}) => {
	  var id = setInterval(() => {
		  console.clear();
		  console.log(`loading files: ${loadedFiles}`)
	  }, 20)
	  await Promise.all(suites.map(suite => load('./tests/' + suite)));
	  clearInterval(id);
	  run(suites, {tags, interval}, consoleLogger)
  });

cli.parse()
