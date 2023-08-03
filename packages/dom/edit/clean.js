//clean
//clean class: an element class specifing a custom clean handler
//clean handler: custom functon to handle specific cleaning

import { unwrap } from './utils.js'

export var clean = (el, tag, includeParent = true, fun, data = {}) => { //unwrap elements with tagname
	//get elements
	tag = tag.toLowerCase();
	var els = [...el.getElementsByTagName(tag)];
	if (includeParent && el.tagName === tag.toUpperCase()) els.push(el);
	
	//filter them based on their class and clean function
	els = els.filter(el => [...el.classList].every(cls => cls in cleanMap ? cleanMap[cls](el, data[cls]) : true));
	if (fun) els = els.filter(fun);
	
	//unwrap 
	els.forEach(el => unwrap(el))
};

export var cleanDom = (node, tagset = new Set()) => {
	if (!node?.nodeType) throw new TypeError('edit: element of type (' + node?.constructor?.name + '), expected (Element)');
	if (node.nodeType === node.ELEMENT_NODE) {
		var children = [...node.childNodes];
		if (node.childNodes.length === 0) node.remove(); //if empty, remove
		else if (node.tagName === node.previousSibling?.tagName) { //if it and previous sibling share same tag, merge
			node.previousSibling.append(...children);
			node.remove()
		} else if (tagset.has(node.tagName) && !([...node.classList].some(item => item in cleanMap))) {
			//if tagname is like one of parents and is cleanable, remove
			node.after(...children);
			node.remove()
		}
		children.forEach(child => cleanDom(child, new Set([...tagset, node.tagName])))
	} else { //text node
		if (node.textContent === '') node.remove(); //if empty, remove
		else if (node.previousSibling?.nodeType === node.TEXT_NODE) { //if its previous sibling is text node, merge
			node.previousSibling.textContent += node.textContent;
			node.remove()
		}
	}
};

export var cleanMap = { //custom clean by class
	styled (el, data) { //handle styling cleaning
		if (!data) return false;
		var [prop, className] = data;
		if (el.classList.contains(className + prop)) {
			el.classList.remove(className + prop);
			el.style[prop] = ''
		}
		if ([...el.classList].reduce((n, cls) => cls.startsWith(className) ? n+1 : n, 0) === 0) return true //if still styled, do not clean
		return false
	}
};