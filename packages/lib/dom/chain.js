//chained dom operation

import $el from './base.js';

class CDom {
	constructor (sel, root){
		this.els = $el(sel, root);
		if (this.els.length === 0) console.warn('cdom: empty chained dom')
	}
	static extend (obj) {
		Object.assign(this.prototype, obj)
	}
	elEach (fn) {
		this.els.forEach(fn);
		return this
	}
	each (fn) {
		this.els.forEach((el,i,arr) => fn(new CDom(el), i, arr));
		return this
	}
	add (sel) {
		var el = $el(sel);
		this.els.push(...el);
		return this
	}
	get cloneSelf () {
		return new CDom([...this.els])
	}
	get cloneEls () {
		return new CDom([...this.els.map(el => el.cloneNode(true))])
	}
	get first () {
		return new CDom([this.els[0]])
	}
	get last () {
		return new CDom([this.els[this.els.length-1]])
	}
	get (index) {
		return new CDom(this.els[index])
	}
	map (fn) {
		return new CDom(this.els.map(fn))
	}
	filter (fn) {
		return new CDom(this.els.filter(fn))
	}
	slice (start, end) {
		return new CDom(this.els.slice(start, end))
	}
	until (fn) {//loop until a condition is met
		var cond = true;
		return new CDom(this.els.filter(
			(el, i, a) => cond && (cond = !fn(el, i, a))
		))
	}
	untilRev (fn) {//until but reversed
		return this.until.call({els: this.els.reverse()}, fn)
	}
	find (sel) {
		return new CDom(this.els.filter(el => el.matches(sel)))
	}
	removeByArr (arr) {//remove array of elemets
		return new CDom(this.els.filter(el => !arr.includes(el)))
	}
	removeBySel (sel) {//remove by selector
		this.els = this.els.filter(el => !el.matches(sel) || el.remove());
		return this
	}
	has (sel) {
		return this.els.some(el => el.matches(sel))
	}
	all (sel) {
		return this.els.every(el => el.matches(sel))
	}
	index (sel) {
		return this.els.findIndex(el => el.matches(sel))
	}
	closest (sel) {
		return new CDom(this.els[0].closest(sel))
	}
	clean () {//filter elements not in document
		this.els = this.els.filter(el => document.body.contains(el));
		return this
	}
	get isInDom () {
		return document.body.contains(this.els[0])
	}
	get reverse () {
		return new CDom(this.els.reverse())
	}
	select (sel) {
		return new CDom(this.els[0].querySelectorAll(sel))
	}
	get parent () {
		return new CDom(this.els[0].parentElement)
	}
	get parents () {
		var els = [], curEl = this.els[0].parentNode;
		while (curEl) {
			els.push(curEl);
			curEl = curEl.parentElement
		}
		return new CDom(els)
	}
	get children () {
		return new CDom(this.els[0].children)
	}
	get content () {
		return new CDom(this.els[0].childNodes)
	}
	get next () {
		return new CDom(this.els[0].nextElementSibling)
	}
	get prev () {
		return new CDom(this.els[0].previousElementSibling)
	}
	get siblings () {
		return (new CDom(this.els[0].parentElement?.children)).filter(el => el !== this.els[0])
	}
	get nextSiblings () {
		var els = [], curEl = this.els[0].nextElementSibling;
		while (curEl) {
			els.push(curEl);
			curEl = curEl.nextElementSibling
		}
		return new CDom(els)
	}
	get prevSiblings () {
		var els = [], curEl = this.els[0].previousElementSibling;
		while (curEl) {
			els.push(curEl);
			curEl = curEl.previousElementSibling
		}
		return new CDom(els)
	}
	html (str) {
		if (str) this.elEach(el => el.innerHTML = str);
		else return this.els[0].innerHTML;
		return this
	}
	text (str) {
		if (str) this.elEach(el => el.innerText = str);
		else return this.els[0].innerText;
		return this
	}
	addClass (classname) {
		this.elEach(el => el.classList.add(classname));
		return this
	}
	removeClass (classname) {
		this.elEach(el => el.classList.remove(classname));
		return this
	}
	toggleClass (classname) {
		this.elEach(el => el.classList.toggle(classname));
		return this
	}
	hasClass (classname) {
		return this.els[0].classList.contains(classname)
	}
	attr (name, value) {
		if (typeof name === 'string') {
			if (value !== undefined) {
				if (value === null) this.elEach(el => el.removeAttribute(name));
				else this.elEach(el => el.setAttribute(name, value));
			} else {
				return this.els[0].getAttribute(name)
			}
		} else if (name) {
			for (let attr in name) {
				this.elEach(el => el.setAttribute(attr, name[attr]))
			}
		} else {
			return Object.fromEntries(Array.from(this.els[0].attributes).map(i=> [i.name, i.value])) //return attributes of first as object
		}
		return this
	}
	prop (name, value) {
		if (typeof name === 'string') {
			if (value !== undefined) this.elEach(el => el[name] = value);
			else return this.els[0][name]
		} else {
			for (let key in name) {
				this.elEach(el => el[key] = name[key])
			}
		}
		return this
	}
	call (prop, ...args) {
		this.elEach(el => el[prop](...args)); 
		return this
	}
	callr (prop, ...args) {
		return this.els.map(el => el[prop](...args))
	}
	css (name, value) {
		if (typeof name === 'string') {
			if (value) this.elEach(el => el.style.setProperty(name, value))
			else return this.els[0].style.getPropertyValue(name)
		} else if (name) {
			for (let key in name) {
				this.elEach(el => el.style.setProperty(key, name[key]))
			}
		} else {
			var sty = this.els[0].style;
			return Object.fromEntries(Array.from(sty).map(i => {return [i, sty.getPropertyValue(i)]})) //return all styles as object
		}
		return this
	}
	data (name, value) {
		if (typeof name === 'string') {
			if (value) this.elEach(el => el.dataset[name] = value);
			else return this.els[0].dataset[name]
		} else if (name) {
			this.elEach(el => Object.assign(el.dataset, name))
		} else {
			return {...this.els[0].dataset}
		}
		return this
	}
	removeData (name) {
		this.elEach(el => delete el.dataset[name]);
		return this
	}
	empty () {
		this.elEach(el => el.innerHTML = ''); 
		return this
	}
	append (el) {
		var node = $el(el);
		this.elEach(el => el.append(...node.map(el => el.cloneNode(true))));
		return this
	}
	prepend (el) {
		var node = $el(el);
		this.elEach(el => el.prepend(...node.map(el => el.cloneNode(true))));
		return this
	}
	before (el) {
		var node = $el(el);
		this.elEach(el => el.before(...node.map(el => el.cloneNode(true))));
		return this
	}
	after (el) {
		var node = $el(el);
		this.elEach(el => el.after(...node.map(el => el.cloneNode(true))));
		return this
	}
	appendTo (el) {
		el.append(...this.els);
		return this
	}
	prependTo (el) {
		el.prepend(...this.els);
		return this
	}
	insertBefore (el) {
		el.before(...this.els);
		return this
	}
	insertAfter (el) {
		el.after(...this.els);
		return this
	}
	replaceWith (el) {
		var node = $el(el);
		this.elEach(el => el.replaceWith(...node.map(el => el.cloneNode(true))));
		return this
	}
	on (...args) {
		this.elEach(el => el.addEventListener(...args));
		return this
	}
	off (...args) {
		this.elEach(el => el.removeEventListener(...args));
		return this
	}
	once (type, fn, options = {}) {
		this.elEach(el => el.addEventListener(type, fn, {once: true, ...options}));
		return this
	}
	trigger (type, opts ={}) {
		var event = typeof type === 'string' ? new Event(type, opts) : type;
		this.elEach(el => el.dispatchEvent(event));
		return this
	}
	get position () {
		return this.els[0].getBoundingClientRect()
	}
	scrollInto (opts) {
		this.els[0].scrollIntoView(opts);
		return this
	}
	animate (...args) {//return promise
		return this.els[0].animate(...args)
	}
	animateAll (...args) {
		this.elEach(el => el.animate(...args));
		return this
	}
	hide () {
		this.elEach(el => el.style.display = 'none');
		return this
	}
	show () {
		this.elEach(el => el.style.display = 'initial');
		return this
	}
	toggle () {
		this.elEach(el => el.style.display = el.style.display === 'none' ? 'initial' : 'none');
		return this
	}
	wrapEach (el) {
		var node = $el(el)[0];
		this.elEach(el => {
			var sibl = el.previousElementSibling;
			var par = node.cloneNode(true);
			if (sibl) sibl.after(par);
			else if (el.parentNode) el.parentNode.append(par)
			par.append(el);
		});
		return this
	}
	wrapAll (el) {
		var node = $el(el)[0];
		node.append(...this.els);
		return this
	}
	unwrap () {
		this.elEach(el => el.parentNode ? el.parentNode.after(el) : undefined);
		return this
	}
}

$el.chain = (sel, root = document) => {
	return sel ? new CDom(sel, root) : (sel) => new CDom(sel, root)
};

globalThis.CDom = CDom;

export { $el, CDom }