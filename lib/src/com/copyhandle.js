//deep copy handling

export var handlecopy = (obj, opts, cache) => {
	var typeOf = typeof obj, clonedObj = {};
	if (typeOf !== 'object' && typeOf !== 'function') return obj; //primitive types exept symbol
	if (obj === null) return null;
	var instanceOf = obj.constructor.name;//class name of value
	if (typeOf === 'function' && !opts.function) return value;
	if (cache.has(obj)) return cache.get(obj);//return as reference
	var handler = opts.copiers[instanceOf];
	if (handler) {
		clonedObj = handler(obj, opts, cache);
		if (clonedObj === obj) return obj; //if handler didnt copy, return original
	} else if ('Node' in globalThis && obj instanceof Node) clonedObj = handleDom(obj, opts, cache);
	else {
		if (opts.refs) cache.set(obj, clonedObj);
		if (!opts.strict) copyPropsNormal(obj, clonedObj, opts, cache, instanceOf);
	}
	if (opts.strict) copyPropsStrict(obj, clonedObj, opts, cache, instanceOf)
	if (opts.refs === 'circular') cache.delete(obj);
	return clonedObj
};

export var copiers = {//copiers handler per type
	Array (obj, opts, cache) {
		var clone = [];
		if (opts.refs) cache.set(obj, clone);
		for (let i = 0; i < obj.length; i++) {
			clone[i] = handlecopy(obj[i], opts, cache)
		}
		return clone
	},
	Function (obj, opts, cache) {
		var clone = function(...args) {
			return obj.call(this, ...args)
		};
		if (opts.refs) cache.set(obj, clone);
		return clone
	},
	Promise (obj, opts, cache) {
		if (!opts.function) return obj
		var clone = new Promise((resolve, reject) => {
			obj.then(resolve);
			obj.catch(reject)
		});
		if (opts.refs) cache.set(obj, clone);
		return clone
	},
	Generator (obj, opts, cache) {
		if (!opts.function) return obj
		var clone = function* (...args) {
			return obj.call(this, ...args)
		};
		if (opts.refs) cache.set(obj, clone);
		return clone
	},
	Date (obj) {
		return new Date(obj)
	},
	RegExp (obj) {
		return new RegExp(obj)
	},
	Map (map, opts, cache) {
		var clone = new Map();
		if (opts.refs) cache.set(map, clone);
		map.forEach((value, key) => {
			clone.set(key, handlecopy(value, opts, cache));
		});
		return clone;
	},
	Set (set, opts, cache) {
		var clone = new Set();
		if (opts.refs) cache.set(set, clone);
		set.forEach(value => {
			clone.add(handlecopy(value, opts, cache));
		});
		return clone
	},
	WeakMap (map) {
		return map
	},
	WeakSet (set) {
		return set
	},
	
	Number (obj, opts, cache) {
		if (opts.toPrimitive) return obj.valueOf();
		return new Number(obj.valueOf())
	},
	String (obj, opts, cache) {
		if (opts.toPrimitive) return obj.valueOf();
		return new String(obj.valueOf())
	},
	Boolean (obj, opts, cache) {
		if (opts.toPrimitive) return obj.valueOf();
		return new Boolean(obj.valueOf())
	},
	BigInt (obj, opts, cache) {
		if (opts.toPrimitive) return obj.valueOf();
		return new BigInt(obj.valueOf())
	},
	
	//error
	Error (error) {
		return error
	},
	AggregateError (error) {
		return error
	},
	EvalError (error) {
		return error
	},
	RangeError (error) {
		return error
	},
	ReferenceError (error) {
		return error
	}, 
	SyntaxError (error) {
		return error
	},
	TypeError (error) {
		return error
	},
	//array buffer
	ArrayBuffer (arr) {
		return arr.slice(0)
	},
	Float32Array (arr) {
		return arr.slice(0)
	},
	Float64Array (arr) {
		return arr.slice(0)
	}, 
	Int8Array (arr) {
		return arr.slice(0)
	}, 
	Int16Array (arr) {
		return arr.slice(0)
	}, 
	Int32Array (arr) {
		return arr.slice(0)
	}, 
	Uint8Array (arr) {
		return arr.slice(0)
	},
	Uint8ClampedArray (arr) {
		return arr.slice(0)
	},
	Uint16Array (arr) {
		return arr.slice(0)
	},
	Uint32Array (arr) {
		return arr.slice(0)
	},
	Uint64Array (arr) {
		return arr.slice(0)
	},
	Blob (blob) {
		return blob.slice(0, blob.size, blob.type)
	},
	DataView (obj) {
		return new DataView(obj.buffer.slice(0))
	}
};

export var handleDom = (node, opts, cache) => { //handle Dom element
	if (!opts.domNode) return node;
	var cloned = node.cloneNode(true);
	handleDomNode(node, cloned, opts, cache)
	return cloned
};

var handleDomNode = (node, cloned, opts, cache) => {
	cache.set(node, cloned);
	[...node.children].forEach((c,i) => handleDomNode(c, cloned.children[i], opts, cache));
	if (opts.domNodeProps) {
		if (opts.strict) copyPropsStrict(node, cloned, opts, cache);
		else copyPropsNormal(node, cloned, opts, cache);
	}
};

export var copyPropsNormal = (obj, clonedObj, opts, cache, instanceOf) => {//copy properties, not strict mode
	Object.keys(obj).forEach(n=>{
		if (opts.skip.includes(n)) return;
		if (opts.donotCopy.includes(n)) return obj[n];
		clonedObj[n] = handlecopy(obj[n], opts, cache);
		if (instanceOf !== 'Object') Object.setPrototypeOf(clonedObj, Object.getPrototypeOf(obj));//keep prototype
	})
};

export var copyPropsStrict = (obj, clonedObj, opts, cache, instanceOf) => {//copy properties, strict mode
	if (opts.refs) cache.set(obj, clonedObj); //force caching
	Object.getOwnPropertyNames(obj).forEach(name => {
		if (name in clonedObj) return; //skip already defiened properties
		if (opts.skip.includes(name)) return;
		let disc = Object.getOwnPropertyDescriptor(obj, name);
		if (opts.donotCopy.includes(name)) Object.defineProperty(clonedObj, name, disc);
		Object.defineProperty(clonedObj, name, 'value' in disc ? {...disc, value: handlecopy(disc.value, opts, cache)} : disc);
	});
	Object.getOwnPropertySymbols(obj).forEach(symbol => {
		if (symbol in clonedObj) return; //skip already defiened Symbol
		if (opts.skip.includes(symbol)) return;
		let disc = Object.getOwnPropertyDescriptor(obj, symbol);
		if (opts.donotCopy.includes(symbol)) Object.defineProperty(clonedObj, symbol, disc);
		Object.defineProperty(clonedObj, symbol, 'value' in disc ? {...disc, value: handlecopy(disc.value, opts, cache)} : disc);
	});
	if (instanceOf !== 'Object') Object.setPrototypeOf(clonedObj, Object.getPrototypeOf(obj));//keep prototype
};