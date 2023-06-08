//array utility

import { drop, dropRight, dropUntil, dropRightUntil } from './arr/drop.js';
import { chunk } from './arr/chunk.js';
import { compact } from './arr/compact.js';
import { flatDeep, flatDepth } from './arr/flat.js';
import { difference, intersection, union } from './arr/set.js';

var $arr = {
	drop,
	dropRight,
	dropUntil,
	dropRightUntil,
	chunk,
	compact,
	flatDeep,
	flatDepth,
	difference,
	intersection,
	union
};

export default $arr;