//binder class
//bind properties to elements

//handlers: handle the bind
//prehandlers: prehandle the bind by type

//binds: fire on property change
//sets: fre on define and on call

import { handlers } from './binderHndls.js';
import { prehandlers } from './binderPrehndls.js';

class Binder {
	constructor (comp, opts, binds) {
		if (!comp?.isComp) throw new CompError('binder: component of type (' + comp?.constructor?.name + '), expected (@componnt)');
		this.comp = comp;
		this.binds = {};
		this.sets = {};
		this.opts = {
			...this.constructor.defaults,
			...opts
		};
		this.handlers = handlers;
		this.prehandlers = prehandlers;
		binds.forEach(b=>this.add(b));
		comp.on('model:propag', this.patch.bind(this));
		if (this.opts.setOnInit) comp.on('init', () => this.fireSet())
	}
	static defaults = {
		setOnDefine: true,
		setOnInit: true,
		prehandle: true
	}
	patch (comp, model, name, prop, oldv, newv, meta) {
		if (this.binds[name]) {
			((meta.prehandle === undefined && this.opts.prehandle) || meta.prehandle) && (meta = this.prehandle(prop, oldv, newv, meta));
			this.binds[name].forEach(b=>this.handlers[b.type] (b, newv, this.comp, oldv, prop, name, meta))
		}
	}
	prehandle (prop, oldv, newv, meta) {
		if (newv?.constructor?.name in this.prehandlers) return this.prehandlers[newv?.constructor?.name](this.comp, prop, oldv, newv, meta);
		else return meta
	}
	addB (prop, obj, set = true, prehandle = this.opts.prehandle) {//add bind
		var val, Prop, meta;
		if (!obj?.el?.nodeType) throw new CompError('binder: element of type (' + el?.constructor?.type + '), expected (Element)');
		if (Array.isArray(prop)) prop.forEach(p=>this.binds[p] ? this.binds[p].push(obj) : this.binds[p] = [obj]);
		else this.binds[prop] ? this.binds[prop].push(obj) : this.binds[prop] = [obj];
		if (!Array.isArray(prop)) [val, Prop] = this.comp.model.getLow(prop);
		if (set && this.opts.setOnDefine) {
			if (obj.type in this.handlers) {
				prehandle && (meta = this.prehandle(prop, val, val, {}));
				this.handlers[obj.type] (obj, val, this.comp, val, Prop, prop, {...meta, set:true});
			}
			else this.comp.warn('binder: undefined bind type (' + obj.type +')')
		}
		return this
	}
	addS (prop, obj, set = true, prehandle = this.opts.prehandle) {//add set
		var val, Prop, meta;
		if (!obj?.el?.nodeType) throw new CompError('binder: element of type (' + el?.constructor?.type + '), expected (Element)');
		if (Array.isArray(prop)) prop.forEach(p=>this.sets[p] ? this.sets[p].push(obj) : this.sets[p] = [obj]);
		else this.sets[prop] ? this.sets[prop].push(obj) : this.sets[prop] = [obj];
		if (!Array.isArray(prop)) [val, Prop] = this.comp.model.getLow(prop);
		if (set && this.opts.setOnDefine) {
			if (obj.type in this.handlers) {
				prehandle && (meta = this.prehandle(prop, val, val, {}));
				this.handlers[obj.type] (obj, val, this.comp, val, Prop, prop, {set:true});
			}
			else this.comp.warn('binder: undefined bind type (' + obj.type +')')
		}
		return this
	}
	remove (el, prop) {
		if (!el) {
			this.binds[prop] = [];
			this.sets[prop] = []
		}
		if (!el.nodeType) throw new CompError('binder: element of type (' + el?.constructor?.type + '), expected (Element)');
		if (prop) {
			this.binds[prop] = this.binds[prop].filter(i=>i.el !== el);
			this.sets[prop] = this.sets[prop].filter(i=>i.el !== el)
		} else {
			for (let prop in this.binds) {this.binds[prop] = this.binds[prop].filter(i=>i.el !== el)}
			for (let prop in this.sets) {this.sets[prop] = this.sets[prop].filter(i=>i.el !== el)}
		}
		return this
	}
	fireSet (name, meta = {}, prehandle = this.opts.prehandle) {
		if (!name) {
			for (let s in this.sets) {
				this.fireSet(s)
			}
			return
		}
		var [val, prop] = this.comp.model.getLow(name);
		if (name in this.sets) {
			prehandle && (meta = this.prehandle(prop, val, val, meta));
			this.sets[name].forEach(s=>this.handlers[s.type] (s, val, this.comp, undefined, prop, name, {...meta, set:true, reset: true}))
			
		} else this.comp.warn('binder: undefined property (' + name +')');
		return this
	}
	clean () {//filter the binds of element not in document
		for (let name in this.binds) {
			this.binds[name] = this.binds[name].filter(b => $doc.contains(b.el))
		}
		for (let name in this.sets) {
			this.sets[name] = this.sets[name].filter(s => $doc.contains(s.el))
		}
		return this
	}
}

export { Binder }