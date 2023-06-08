//ui framework core

import { CompError } from './error.js';
import { EventEmmiter } from './event.js';
import { Comp, Model, View, Binder, EffectEmmiter, Signal } from './comp.js';
import { attrManeger } from './attrMan.js';
import { actManager } from './actMan.js';
import { funNS } from './funns.js';
import { tempManager } from './tempMan.js';
import { CompCollection } from './collection.js';
import { func } from './functional.js';
import { lazyCManager, LazyComp } from './lazyCManager.js';

var $comp = {
	isComp: true, //for emulation
	opts: {
		warn: 'warn',
		maxCompRandId: 2 * 32
	},
	warn (msg) {
		if (this.opts.warn) console[this.opts.warn](msg)
	},
	comps: {//component registry
		basic: Comp
	},
	compMans: {
		lazy: lazyCManager
	},
	add (name, comp) {
		if (!comp?.isCompClass) throw new CompError('comp: adding class of type (' + comp?.constructor?.name + '), expected (@component)');
		var parts = name.split(':');
		if (parts.length !== 1) {
			if (!this.compMans[parts[0]]) throw new CompError('comp: undefined component manager (' + parts[0] + ')');
			return this.compMans[parts[0]].add(parts[1]);
		}
		if (name in this.comps) this.warn('comp: adding defined component (' + name + ')');
		this.comps[name] = comp;
		this.events.trigger('comp-added', name, comp)
	},
	get (name) {
		if (name?.isCompClass) return name;
		if (name?.isComp) return name.class;
		var parts = name.split(':');
		if (parts.length !== 1) {
			if (!this.compMans[parts[0]]) throw new CompError('comp: undefined component manager (' + parts[0] + ')');
			return this.compMans[parts[0]].get(parts[1]);
		}
		var comp = this.comps[name];
		if (comp) return comp;
		throw new CompError('comp: component of type (' + comp?.constructor?.name + '), expected (@component)')
	},
	has (name) {
		var parts = name.split(':');
		if (parts.length === 1) return name in this.comps;
		return this.compMans[parts[0]].has(parts[1])
	},
	events: new EventEmmiter(),
	attrs: attrManeger,
	acts: actManager,
	funNS,
	func,
	temps: tempManager,
	walk (comp, el) {//walk attributes
		this.attrs.walk(comp, el)
	},
	doAct (comp, action) {
		this.acts.do(comp, action)
	},
	root: null,
	setRoot (el, name = 'basic', ...args) {
		if (!el?.nodeType) throw new CompError('comp: element of type (' + el?.constructor?.type + '), expected (Element)');
		this.root = name.isComp ? name : new (this.get(name))(el, ...args);
		this.events.trigger('set-root', this.root)
		return this.root
	},
	idmap: {},
	addId (comp, id) { //add component to idmap
		if (!comp?.isComp) this.warn('comp: component of type ('+comp?.constructor?.name + '), expected (@component)');
		else if (this.idmap[id]) this.warn('comp: defined id (' + id +')');
		else (this.idmap[id] = comp) && this.events.trigger('id-added')
	},
	getById (id, Throw = true) {
		var comp = this.idmap[id];
		if (!comp && Throw) throw new CompError('comp: undefined id (' + id + ')');
		return comp
	},
	on (name, fn) {
		this.events.on(name, fn)
	},
	off (name, fn) {
		this.events.off(name, fn)
	},
	trigger (name, ...args) {
		this.events.trigger(name, this, ...args)
	},
	addProp (name, value) {
		return this.model.add(name, value, true)
	},
	setProp (name, value) {
		return this.model.set(name, value, true)
	},
	getProp (name, returnProp = false) {
		return this.model.get(name, returnProp)
	},
	deleteProp (name) {
		return this.model.delete(name)
	},
	hasProp (name) {
		return this.model.has(name)
	},
	addEffect (prop, fn) {
		this.effect.add(prop, fn)
	},
	addSignal(comp, obj) {
		this.signal.add(comp, obj)
	},
	classes: {
		comp: Comp,
		event: EventEmmiter,
		error: CompError,
		model: Model,
		view: View,
		binder: Binder,
		effect: EffectEmmiter,
		signal: Signal,
		collection: CompCollection,
		lazyComp: LazyComp
	},
	Comp,
	EventEmmiter,
	CompError,
	Model,
	View,
	CompCollection,
	Binder,
	EffectEmmiter,
	Signal,
	LazyComp
};

globalThis.$comp = $comp;
globalThis.CompError = CompError;
globalThis.Comp = Comp;

['comp-added', 'set-root', 'delete-root', 'id-added', 'temp-added', 'model:add', 'model:delete', 'model:propag',
	'init:model'].forEach(e => $comp.events.add(e));

Object.assign($comp, {
	model: new Model($comp, {}, {}),
	signal: new Signal($comp, {}, []),
	effect: new EffectEmmiter($comp, {})
});

Comp.defaults.warn = $comp.opts.warn;

export { $comp, EventEmmiter, CompError, Comp, Model, View, EffectEmmiter, Signal };
export default $comp;
export var createComp = func.createComp;
export var enableFor = func.enableFor;
export var useClass = func.useClass;
export var useDefaults = func.useDefaults;
export var setFun = func.setFun;
export var useComp = func.useComp;
export var useStore = func.useStore;
export var useState = func.useState;
export var useEffect = func.useEffect;
export var useEvent = func.useEvent;
export var useTrigger = func.useTrigger;
export var useSignal = func.useSignal;
export var useCall = func.useCall;
export var useCallSafe = func.useCallSafe;
export var useRef = func.useRef;
export var use$ = func.use$;
export var useEl = func.useEl;
export var useAttr = func.useAttr;
