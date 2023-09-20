//models
//databases and triggers

//properties: reactive peice of data, acessed by data paths

//model functions: functions for handling data

import { CompError, checkDataProv, checkfn, checkarr } from '../check.js';
import { modelFns } from './modelFns.js';
import { createProxy } from './modelProxy.js';

class Model {
	class = this.constructor; //self class
	constructor (comp, opts = {}, data = {}) {
		checkDataProv(comp, 'model');
		this.comp = comp;
		this.funs = this.class.funs;
		
		//handle options
		this.opts = {
			...this.class.defaults,
			...opts
		};
		checkfn(this.opts.doReact, 'doReact', 'model');
		
		//handle data
		this.data = {};
		for (let name in data) {
			this.addLow(name, data[name])
		}
		
		this.init();
		this.comp.trigger('init:model', this)
	}
	static defaults = {
		addDef: false, //add defined
		propObj: {
			$hasMeta: true,
			meta: {},
			isReactive: true,
			name: ''
		},
		react: true,
		doReact: (oldv, newv) => oldv !== newv
	};
	static funs = modelFns;
	init () {}
	addLow (name, item) { //defining + initing
		//define prop
		if (item?.$hasMeta) {
			var prop = {
				...this.opts.propObj,
				...item,
				name: name
			}
		} else {
			var prop = {
				...this.opts.propObj,
				value: item,
				name: name
			}
		}
		prop.meta = {...prop.meta}; //copy
		
		//check
		if (prop.init) checkfn(prop.init, 'initFn', 'model');
		if (prop.setter) checkfn(prop.init, 'setter', 'model');
		if (prop.getter) checkfn(prop.init, 'getter', 'model');
		
		//add to data
		if (this.data[name]) {
			this.comp.warn('model: adding defined property (' + name + ')');
			if (this.opts.addDef) this.data[name] = prop;
			else return
		} else this.data[name] = prop;
		
		//trigger init and events
		if (prop.init) prop.init(this.comp, prop);
		this.comp.trigger('model:add', this, name, prop);
		return prop
	}
	add (name, item, returnProp = false) {//low level + reactivity 
		var prop = this.addLow(name, item);
		if (prop && prop.isReactive && this.opts.react) this.react(name, prop);
		
		return returnProp ? prop : this
	}
	react (name, prop = this.data[name], oldValue, newValue = prop.value, meta = {}) {
		if (!prop) this.comp.warn('model: reacting to undefined property (' + name + ')');
		else if (meta.force === true || this.opts.doReact(oldValue, newValue)) 
			this.comp.trigger('model:change', this, name, prop, oldValue, newValue, meta);
	}
	get (name, returnProp = false) {
		var prop = this.data[name];
		
		if (!prop) this.comp.warn(`model: getting undefined property (${name})`);
		
		if (returnProp) return prop;
		
		if (prop?.getter) return prop.getter(comp, prop);
		
		return prop?.value
	}
	setLow (name, value) {
		var prop = this.data[name], oldValue = prop?.value;
		
		if (!prop) prop = this.addLow(name, value);
		else if (prop?.setter) value = prop.setter(comp, value);
		else prop.value = value;

		return [prop, oldValue, value]
	}
	set (name, value, returnProp = false, meta = {}) {
		if (typeof name === 'object') {
			for (let n in name) {
				this.set(n, name[n])
			}
			return this
		}
		var [prop, oldVal, newVal] = this.setLow(name, value);
		if (prop.isReactive && this.opts.react) this.react(name, prop, oldVal, newVal, meta);
		return returnProp ? prop : this
	}
	getFn(name, fn, ...args) {
		var Fn = typeof fn === 'function' ? fn : this.funs[fn];
		if (!Fn) throw new CompError('model: undefined function (' + fn + ')');
		
		var fnVal = Fn(this, this.get(name), ...args);
		
		return fnVal?.$hasMeta ? fnVal.value : fnVal
	}
	setFn (name, fn, old = true, ...args) {
		var Fn = typeof fn === 'function' ? fn : this.funs[fn];
		if (!Fn) throw new CompError('model: undefined function (' + fn + ')');
		
		var fnVal = old ? Fn(this, this.get(name), ...args) : Fn(this, ...args);
		var value = fnVal?.$hasMeta ? fnVal.value : fnVal;
		
		this.set(name, value, false, fnVal?.meta);
		return this
	}
	has (name) {
		return !!this.data[name]
	}
	delete (name) {
		if (this.data[name] === undefined) return false;
		this.data[name] = undefined;
		this.comp.trigger('model:delete', this, name)
		return true
	}
	getAllKeys () {
		return Object.keys(this.data).filter(i=>this.data[i] !== undefined)
	}
	toProxy () {
		return createProxy(this)
	}
	toObj () {
		var obj = {};
		for (let name in this.data) {
			obj[name] = this.get(name);
		}
		return obj
	}
	toJSON () {
		return JSON.stringify(this.toObj())
	}
}

export { Model }