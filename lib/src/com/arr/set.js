// array set operation

import { checkarr } from './check.js';

var check = (values, isSet) => {
		if (!(Array.isArray(values) || isSet)) throw new TypeError('arr: values of type (' + values?.constructor?.name + '), epected (Array) or (Set)');
}

export var difference = (arr, values) => {
	checkarr(arr);
	var isSet = values instanceof Set;
	check(values, isSet);
	if (isSet) return arr.filter(i => !values.has(i));
	else return arr.filter(i => !values.includes(i));
};

export var intersection = (arr, values) => {
	checkarr(arr);
	var isSet = values instanceof Set;
	check(values, isSet);
	if (isSet) return arr.filter(i => values.has(i));
	else return arr.filter(i => values.includes(i));
};

export var union = (...values) => {
	const set = new Set();
	values.forEach((arr) => {
		arr.forEach((value) => {
			set.add(value);
		})
	});
	return Array.from(set);
};