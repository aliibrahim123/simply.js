//reduce object

import checkfn from './checkfn.js';

export var reduce = (obj, fn, init) => {
	checkfn(fn)
	for (let prop in obj) {
		init = fn(init, obj[prop], prop, obj)
	}
	return init
};

export var reduceTyped = (obj, fn, init) => { //with prototype
	checkfn(fn)
	Object.keys(obj).forEach(prop=>{
		init = fn(init, obj[prop], prop, obj)
	});
	return init
}