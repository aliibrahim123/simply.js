//attribute manager
//defining and handling elements attributes

//propagAttrs: doesnt stop walking on hit
//unpropagAttrs: stop walking on hit

import { useCompHandler } from './attrs/useComp.js';
import { useBindHandler } from './attrs/useBind.js';
import { useSetHandler } from './attrs/useSet.js';
import { useOnHandler } from './attrs/useOn.js';

var attrManeger = {
	handlers: {
		'use:comp': useCompHandler,
		'use:bind': useBindHandler,
		'use:set': useSetHandler,
		'use:on': useOnHandler,
	},
	curEl: null,
	curAttr: null,
	add (name, handler) {
		this.handlers[name] = handler
	},
	walk (comp, el, forceNS = []) {//walking through elemets and their attributes
		if (!comp?.isComp) throw new CompError('comp: component of type (' + comp?.constructor?.name + '), expected (@component)');
		if (!el?.nodeType) throw new CompError('comp: element of type (' + el?.constructor?.name + '), expected (Element)');
		if (el.hasAttribute('is:static')) return;
		this.curEl = el;
		var attrs = el.getAttributeNames();
		var dowalkChilds = true; //walk through children
		[...forceNS, ...attrs.filter(a=>a.startsWith('use') && !forceNS.includes(a))].forEach(attr => {
			let handler = this.handlers[attr];
			if (handler.handle) return dowalkChilds = (handler.handle(comp, el, attrs) || dowalkChilds);
			attrs.forEach(attr => {
				this.curAttr = attr;
				if (attr in handler.propagAttrs) {
					handler.propagAttrs[attr](comp, el, el.getAttribute(attr))
				}
				if (attr in handler.unpropagAttrs) {
					handler.unpropagAttrs[attr](comp, el, el.getAttribute(attr));
					dowalkChilds = false
				}
			})
		});
		if (dowalkChilds) {
			[...el.children].forEach(el => el.$comp ? el.$comp.walk() : this.walk(comp, el))
		}
	},
	clean (el) { //clean the dom from use:... attributes
		if (!el?.nodeType) throw new CompError('comp: element of type (' + el?.constructor?.name + '), expected (Element)');
		el.getAttributeNames().forEach(attr=>{
			if (attr.startsWith('use')) el.removeAttribute(attr)
		});
		[...el.children].forEach(el=>this.clean(el))
	}
};

export { attrManeger }