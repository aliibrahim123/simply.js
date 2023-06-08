//view class
//elements handling

//templates: reusable blockes of ui, one for each componnt
//subs: reusable blockes of elements: many for many components

//view functions: functions for handling elements

import { attrs } from './viewAttrs.js';
import { viewFns } from './viewFns.js';

class View {
	class = this.constructor; //self class
	constructor(comp, opts = {}, el) {
		if (!comp?.isComp) throw new CompError('view: component of type (' + comp?.constructor?.name + '), expected (@componnt)');
		this.comp = comp
		this.opts = {
			...this.class.defaults,
			...opts
		}
		el = el?.nodeType === 1 ? el : this.$(this.opts.el)[0]; //if not element, constuct it
		el.$comp = comp; //mark element as component element
		this.el = el;
		this.comp.el = el;
		this.attrs = this.class.attrs;
		this.funs = this.class.funs;
		this.subs = this.opts.subs;
		this.subs = {};
		for (let name in this.opts.subs) {
			let sub = this.opts.subs[name];
			this.subs[name] = sub.$isSub ? sub : this.$(sub)[0] //construct if needed
		}
		this.refs = {}; //references to elements
		var refs = this.opts.refs
		for (let ref in refs) {
			this.refs[ref] = this.$(refs[ref])
		}
		this.comp.refs = this.refs;
		if (this.opts.lazyTemp) {
			this.comp.waitingNb++;
			$comp.temps.getLazy(this, this.opts.temp);
		}
		else this.render();
		comp.trigger('init:view', this)
	}
	static defaults = {
		tempAppendMode: 'append',
		temp: '<span></span>',
		lazyTemp: false,
		el: '<div></div>', //core element
		subs: {},
		refs: {}
	}
	static attrs = attrs;
	static funs = viewFns;
	$ (a, root = this.el) { //element query and creation
		return $el(a, root)
	}
	render () {
		var temp = this.opts.temp, el = this.el, tels /* template elements */, acts = [], appendM = this.opts.tempAppendMode;
		if (typeof temp === 'string') {
			if (temp[0] === '<') tels =  this.$(temp); //construct from html string
			else ({els: tels, acts = []} = $comp.temps.get(temp)(this)); //get from template manager
		} else if (temp.nodeType === 1) tels = temp.cloneNode(true).childNodes; //clone from node
		else ({els: tels = '', acts = []} = temp(this));
		if (appendM === 'replace') el.replaceChildren(...tels);
		else if (appendM === 'append') el.append(...tels);
		else if (appendM === 'prepend') el.prepend(...tels);
		else throw new CompError('view: undefined append mode (' + appendM + ')');
		acts.forEach(act => this.comp.doAct(act));
		this.comp.trigger('render', this);
		return this
	}
	walk (el, forceNS = []) {//walk 
		el.forEach(el => $comp.attrs.walk(this.comp, el, forceNS));
		return this
	}
	addRef (name, el) {//add reference
		var els = this.$(el);
		if (els.length === 0) this.comp.warn('view: no element with specific selector (' + el + ')');
		else this.refs[name] ? this.refs[name].push(...els) : this.refs[name] = els;
		return this
	}
	attr (el, name, val) {
		var els = this.$(el);
		if (val === undefined) {
			if (name in this.attrs) return this.attrs[name](els[0]);
			else if (name in els[0]) return els[0][name];
			else return els[0].getAttribute(name)
		} else {els.forEach(el => {
			if (name in this.attrs) this.attrs[name](el, val);
			else if (name in el) el[name] = val;
			else el.setAttribute(name, val)
		})}
	}
	call (el, name, ...args) { //call view function
		if (name in this.funs) return this.funs[name](this.$(el), ...args);
		else this.comp.warn('view: undefined function (' + name + ')');
		return;
	}
	appendSub (el, name, ind = -1, ...args) {
		var sub = this.subs[name], subel, acts = [];
		if (!sub) throw new CompError('view: undefined sub (' + name + ')');
		this.$(el).forEach(el => {
			if (sub.$isSub) ({el: subel, acts} = sub.fn(el, this, true, ...args)); //call if sub
			else subel = sub[0].cloneNode(true); //clone else
			subel.$isSub = true; //mark element as sub element
			if (ind === -1 || ind === el.children.length) el.append(subel); 
			else if (ind === 0) el.prepend(subel);
			else el.children[ind].before(subel);
			if (!('dowalk' in sub) || sub.dowalk) this.walk([subel]);
			acts?.forEach?.(it => this.comp.doAct(it))
		});
		return this
	}
	setSub (el, name, appendM = 'append', ...args) {
		var sub = this.subs[name], subels, acts = [];
		if (!sub) throw new CompError('view: undefined sub (' + name + ')');
		this.$(el).forEach(el => {
			if (sub.$isSub) ({el: subels, acts} = sub.fn(el, this, false, ...args)); //call if sub
			else subels = sub.cloneNode(true); //else clone node
			if (appendM === 'append') el.append(...subels);
			else if (appendM === 'prepend') el.prepend(...subels);
			else if (appendM === 'replace') el.replaceChildren(...subels);
			else throw new CompError('view: undefined append mode (' + appendM + ')');
			if (!('dowalk' in sub) || sub.dowalk) this.walk([...el.children]);
			acts?.forEach?.(it => this.comp.doAct(it))
		});
		return this
	}
}

export { View }