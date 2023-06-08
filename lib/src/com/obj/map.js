//object mapping

import checkfn from './checkfn.js';

export var map = (obj, fn) => {
	checkfn(fn)
	var mapped = {};
	for (let prop in obj) {
		mapped[prop] = fn(obj[prop], prop, obj)
	}
	return mapped
};

export var mapTyped = (obj, fn) => {//with prototype
	checkfn(fn)
	var mapped = Object.create(Object.getPrototypeOf(obj));
	Object.keys(obj).forEach(prop=>{
		mapped[prop] = fn(obj[prop], prop, obj)
	});
	return mapped
}; 

export var mapKeys = (obj, fn) => {
	checkfn(fn)
	var mapped = {};
	for (let prop in obj) {
		mapped[fn(prop, obj[prop], obj)] = obj[prop]
	}
	return mapped
};

export var mapKeysTyped = (obj, fn) => {//with prototype
	checkfn(fn)
	var mapped = Object.create(Object.getPrototypeOf(obj));
	Object.keys(obj).forEach(prop=>{
		mapped[fn(prop, obj[prop], obj)] = obj[prop]
	});
	return mapped
};

export var reshape = (obj, fn) => {//map with keys and value
	checkfn(fn)
	var reshaped = {};
	for (let prop in obj) {
		var result = fn(obj[prop], prop, obj);
		reshaped[result[0]] = result[1]
	}
	return reshaped
};

export var reshapeTyped = (obj, fn) => {//with prototype
	checkfn(fn)
	var reshaped = Object.create(Object.getPrototypeOf(obj));
	Object.keys(obj).forEach(prop=>{
		var result = fn(obj[prop], prop, obj);
		reshaped[result[0]] = result[1]
	});
	return reshaped
};