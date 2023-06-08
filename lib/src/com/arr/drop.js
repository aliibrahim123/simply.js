//create array by dropping elements

import { checkarr, checkfn } from './check.js';

export var drop = (arr, n = 1) => {
	checkarr(arr);
	return arr.slice(n) 
};

export var dropRight = (arr, n = 1) => {
	checkarr(arr);
	return arr.slice(0, Math.max(0, arr.length - n)) 
};

export var dropUntil = (arr, fn, keepHit = true) => {
	checkarr(arr);
	checkfn(fn);
	var ind = arr.findIndex(fn);
	return arr.slice(ind + (keepHit ? 0 : 1))
};

export var dropRightUntil = (arr, fn, keepHit = true) => {
	checkarr(arr);
	checkfn(fn);
	var ind = arr.findIndex(fn);
	return arr.slice(0, ind + (keepHit ? 1 : 0))
};