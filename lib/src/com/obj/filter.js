//object filtering

import checkfn from './checkfn.js';

export var filter = (obj, fn) => {
	checkfn(fn)
	var filtered = {};
	for (let prop in obj) {
		if (fn(obj[prop], prop, obj)) filtered[prop] = obj[prop]
	}
	return filtered
};

export var filterTyped = (obj, fn) => {//with prototype
	checkfn(fn)
	var filtered = Object.create(Object.getPrototypeOf(obj));
	Object.keys(obj).forEach(prop=>{
		if (fn(obj[prop], prop, obj)) filtered[prop] = obj[prop]
	})
	return filtered
}; 

export var clean = (obj) => { //remove falsy properties
	var cleaned = {};
	for (let prop in obj) {
		if (obj[prop]) cleaned[prop] = obj[prop]
	}
	return cleaned
};

export var cleanTyped = (obj) => {//with prototype
	var cleaned = Object.create(Object.getPrototypeOf(obj));
	Object.keys(obj).forEach(prop=>{
		if (obj[prop]) cleaned[prop] = obj[prop]
	})
	return cleaned
}; 