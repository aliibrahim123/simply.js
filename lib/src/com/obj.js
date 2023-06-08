//object utility

import { loop, loopProto, loopStrict } from './obj/loop.js';
import { get, set, remove, update } from './obj/path.js';
import { find, findKey, findTyped, findMultiple } from './obj/find.js';
import { map, mapTyped, mapKeys, mapKeysTyped, reshape, reshapeTyped } from './obj/map.js';
import { filter, filterTyped, clean, cleanTyped } from './obj/filter.js';
import { mergeDeep, mergeMap } from './obj/merge.js';
import { reduce, reduceTyped } from './obj/reduce.js';
import { some, someTyped, every, everyTyped } from './obj/test.js';
import { pick, pickTyped, omit, omitTyped } from './obj/pick-omit.js';

var $obj = {
	loop,
	loopProto,
	loopStrict,
	get,
	set,
	remove,
	update,
	find,
	findKey,
	findTyped,
	findMultiple,
	map,
	mapTyped,
	mapKeys,
	mapKeysTyped,
	reshape,
	reshapeTyped,
	filter,
	filterTyped,
	clean,
	cleanTyped,
	mergeDeep,
	mergeMap,
	reduce,
	reduceTyped,
	some,
	someTyped,
	every,
	everyTyped,
	pick,
	pickTyped,
	omit,
	omitTyped
};

export default $obj;
export { 
	loop, loopProto, loopStrict, get, set, remove, update, find, findKey, findTyped, findMultiple, map, mapTyped, mapKeys, mapKeysTyped,
	reshape, reshapeTyped, filter, filterTyped, clean, cleanTyped, mergeDeep, mergeMap, reduce, reduceTyped, some, someTyped, every, 
	everyTyped, pick, pickTyped, omit, omitTyped
}