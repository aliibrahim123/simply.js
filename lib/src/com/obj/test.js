//object testing

import checkfn from './checkfn.js';

export var some = (obj, fn) => {
	checkfn(fn);
	for (let prop in obj) {
		if (fn(obj[prop], prop, obj)) return true
	}
	return false
};

export var someTyped = (obj, fn) => {//without prototype
	checkfn(fn);
	var result = false;
	Object.keys(obj).forEach(prop => {
		result = result ? true : fn(obj[prop], prop, obj)
	})
	return result
};

export var every = (obj, fn) => {
	checkfn(fn);
	for (let prop in obj) {
		if (!fn(obj[prop], prop, obj)) return false
	}
	return true
};

export var everyTyped = (obj, fn) => {//without prototype
	checkfn(fn);
	var result = true;
	Object.keys(obj).forEach(prop => {
		result = result ? fn(obj[prop], prop, obj) : false
	})
	return result
};