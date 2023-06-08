//component class
//the core components of the framework

//systems:
//	core:
//		events
//	base:
//		model, view
//	binders:
//		effects, signals, binder

//component functions: functions for component handling

import { EventEmmiter } from './event.js';
import { Model } from './model.js';
import { View } from './view.js';
import { EffectEmmiter } from './effect.js';
import { Signal } from './signal.js';
import { Binder } from './binder.js';

class Comp {
	class = this.constructor; //self class
	constructor (el, opts, children = []) {
		opts = this.opts = {
			...this.class.defaults,
			...opts
		};
		
		this.id = typeof opts.id === 'function' ? opts.id() : opts.id;
		this.parent = null;
		$comp.addId(this, this.id);
		
		this.acts = opts.acts;
		this.funs = this.class.funs;
		
		this.events = new EventEmmiter({}, opts.addUndefEvent, opts.warn);
		opts.eventNames.forEach(evt => this.events.add(evt));
		for (let e in opts.events) {
			opts.events[e].forEach(fn => this.events.on(e, fn))
		}
		this.onEventsInit();
		
		this.model = new this.class.model(this, opts.model, opts.data);
		this.view = new this.class.view(this, opts.view, el);
		
		this.binder = new this.class.binder(this, opts.binder, opts.binds);
		this.effects = new this.class.effects(this, opts.effect);
		this.signal = new this.class.signal(this, opts.signal, opts.sChannels);
		
		this.children = [];
		if (!Array.isArray(children)) throw new CompError('comp: children of type (' + children?.constructor?.name + '), expected (Array)');
		children.forEach(child => this.addChild(child));
		
		this.on('appended-to-parent', (self, comp) => this.parent = comp && comp.trigger('init:child', this));
		this.on('deleted-child', (self, comp) => this.children = this.children.filter(c=>c!==comp));
		
		if (!this.waitingNb) this.init() //init if all system is ready
		}
	static defaults = {
		id() { return Math.round(Math.random() * $comp.opts.maxCompRandId) },
		warn: 'warn',
		addUndefEvent: true,
		eventNames: ['appended-to-parent', 'appended-child', 'init', 'delete', 'model:add', 'model:delete', 'model:propag', 'init:model', 'init:view',
			'init:child', 'render', 'deleted', 'deleted-child', 'collection:added'],
		events: {},
		get acts() {return []},
		doAct: true,
		model: {},
		data: {},
		view: {},
		effects: {},
		signal: {},
		binder: {},
		binds: [],
		sChannels: [], //signal channels
		walkChilds: true
	}
	static model = Model;
	static view = View;
	static binder = Binder;
	static effects = EffectEmmiter;
	static signal = Signal;
	static funs = {};
	isComp = true;
	static isCompClass = true;
	isInited = false;
	internal_waitingNb = 0; //the number of subsystems waited to be inited
	get waitingNb () {
		return this.internal_waitingNb
	}
	set waitingNb (val) {
		this.internal_waitingNb = val;
		if (val === 0) this.init()
	}
	init() {
		if (this.opts.walkChilds) this.walk();
		this.isInited = true;
		this.trigger('init');
		this.callSafe('init')
	}
	addChild (comp) {
		var child;
		if (!comp) throw new CompError('comp: adding child of type (' + comp?.constructor?.name + '), expected (@component)');
		if (comp.isComp) child = comp;
		else if (comp.isCompClass) child = new comp();
		else if (comp.isopts) {
			child = new ($comp.get(comp.type)) (comp.el, comp.opts, comp.children)
		} else {
			throw new CompError('comp: adding child of type (' + comp.constructor.name + '), expected (@component)');
			return this
		}
		this.children.push(child);
		this.trigger('appended-child', comp);
		child.trigger('appended-to-parent', this);
		
		return this
	}
	onEventsInit () {} //core system inited but others not
	remove () {
		this.trigger('deleted');
		if (this.parent) this.parent.trigger('deleted-child', this);
		if ($comp.root === this) $comp.events.trigger('delete-root', this) && ($comp.root = null);
		this.el.remove();
		$comp.idmap[this.id] = undefined
	}
	warn(msg) {
		if (this.opts.warn) console[this.opts.warn](msg)
	}
	
	//events
	addEvent (name) {
		this.events.add(name);
		return this
	}
	on (name, fn) {
		this.events.on(name, fn);
		return this
	}
	off (name, fn) {
		this.events.off(name, fn);
		return this
	}
	once (name, fn) {
		this.events.once(name, fn);
		return this
	}
	hasEvent (name) {
		return this.events.has(name)
	}
	trigger (name, ...args) {
		this.events.trigger(name, this, ...args);
		return this
	}
	
	//actions
	addAct (act) {
		if (!act) throw new CompError('comp: undefined action');
		this.acts.push(act);
		return this
	}
	doAct (act) {
		if (!act) throw new CompError('comp: undefined action');
		if (this.opts.doAct) {
			if (act.el) $comp.acts.do(this, {...act, el: this.view.$(act.el)}); //convert from selector to elements
			else $comp.acts.do(this, act)
		}
		else this.addAct(act);
		return this
	}
	doAllActs () {
		this.acts.forEach(act => $comp.doAct(this, act))
	}
	
	//component functions
	call (name, ...args) {
		var parts = name.split(':', 2);
		if (parts.length === 1) { //internal function
			if (!(parts[0] in this.funs)) throw new CompError('comp: undefined function (' + parts[0] + ')');
			return this.funs[parts[0]](this, ...args);
		}
		return $comp.funNS[parts[0]](parts[1], this, false, ...args)
	}
	callSafe (name, ...args) { //call in safe mode
		var parts = name.split(':', 2);
		if (parts.length === 1) { //internal function
			if (!(parts[0] in this.funs)) return undefined;
			return this.funs[parts[0]](this, ...args);
		}
		return $comp.funNS[parts[0]](parts[1], this, true, ...args)
	}
	
	//model
	addProp (name, item, returnProp = false) {
		var prop = this.model.add(name, item, returnProp);
		return returnProp ? prop : this
	}
	set (name, value, returnProp = false) {
		var prop = this.model.set(name, value, returnProp);
		return returnProp ? prop : this
	}
	get (name) {
		return this.model.get(name)
	}
	deleteProp (name) {
		this.model.delete(name);
		return this
	}
	has (name) {
		return this.model.has(name)
	}
	
	//data binders
	addEffect (name, fn) {
		this.effects.add(name, fn);
		return this
	}
	addSignal (comp, obj) {
		this.signal.add(comp, obj);
		return this
	}
	
	//view
	walk (el, forceNS =[]) {
		if (el) this.view.walk(this.view.$(el), forceNS);
		else this.view.walk([...this.el.children], forceNS);
		return this
	}
	addRef (name, el) {
		this.view.addRef(name, el);
		return this
	}
}

export { Comp, Model, View, Binder, EffectEmmiter, Signal }