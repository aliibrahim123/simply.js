//document.execCommand alternative

import { unwrap, getContainer, splitEl, getWrapped } from './edit/utils.js';
import { clean, cleanDom, cleanMap } from './edit/clean.js';

var $edit = {
	unwrap,
	getContainer, 
	splitEl, 
	getWrapped,
	clean,
	cleanDom,
	cleanMap,
	isWrappedWith (tag, fun) {//is selection wrapped with tagname
		return !!getWrapped(tag, fun)
	},
	surround (el, doclean = true, cleanFun, cleanData) {//surround selection by element, optinally clean
		if (!el?.nodeType) throw new TypeError('edit: element of type (' + el?.constructor?.name + '), expected (Element)');
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		el.append(...range.cloneContents().childNodes);
		range.deleteContents();
		if (doclean) clean(el, el.tagName, false, cleanFun, cleanData);
		range.insertNode(el);
		return {success: true, type: 'surround', node: el}
	},
	undo (tag, fun, cleanData) { //unsurround selection by tagname
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		var nodes = range.cloneContents();
		range.deleteContents();
		var el = document.createElement('span');
		el.append(nodes);
		var topNode = getWrapped(tag, fun);
		clean(el, tag, false, fun, cleanData);
		range.insertNode(el);
		if (!topNode) {//selection not wrapped with tagname
			range.insertNode(el);
			unwrap(el);
			return {success: true, type: 'undo'}
		}
		var curNode = el, pars = [curNode];//till topNode
		while (curNode !== topNode) {
			curNode = curNode.parentElement;
			pars.unshift(curNode);
		}
		var lastClonedNode;
		pars.forEach((el, i) => {//split parents
			if (i === 0) return;
			lastClonedNode = splitEl(el.parentElement, el.nextSibling, lastClonedNode);
		});
		var lastClonedPar = pars.reduce((par, el, i) => {
			//clone parents without topnode and append the selected nodes in the bottom one
			if (i === pars.length -1) return par;//skip topNode
			var cloned = el.cloneNode(false);
			if (par === topNode) par.after(cloned);
			else par.append(cloned);
			return cloned
		});
		if (lastClonedPar === topNode) topNode.after(el);
		else lastClonedPar.append(el);
		range.selectNode(lastClonedPar);//reselect the content
		unwrap(el);
		return {success: true, type: 'undo'}
	},
	replace (topaste = '', type = 'text', unwrap = false) {//replace selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		range.deleteContents();
		if (type === 'node') range.insertNode(topaste);
		else {
			let el = document.createElement('span');
			if (type === 'text') el.innerText = topaste;
			else if (type === 'html') el.innerHTML = topaste;
			else throw new Error('edit: undefined replace type (' + type + ')');
			range.insertNode(el);
			if (unwrap) unwrap(el)
		}
		return {success: true, type: 'replace'}
	},
	applyCss (prop, str, tag = 'span', className = 'styled-', clean = true, cleanFun) {// apply style for selection
		var el = document.createElement(tag);
		el.classList.add('styled');
		el.classList.add(className + prop);
		el.style[prop] = str;
		return this.surround(el, clean, cleanFun, {styled: [prop, className]})
	},
	copy () { //return selected text as string
		return getSelection().toString()
	},
	delete () {
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		range.deleteContents();
		return {success: true, type: 'delete'}
	},
	insert (toinsert, type = 'text', unwrap = false) {
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		if (type === 'node') range.insertNode(toinsert);
		else {
			var el = document.createElement('span');
			if (type === 'text') el.innerText = toinsert;
			else if (type === 'html') el.innerHTML = toinsert;
			else throw new Error('edit: undefined insert type (' + type + ')');
			range.insertNode(el);
			if (unwrap) unwrap(el)
		}
		range.insertNode(el);
		return {success: true, type: 'insert'}
	},
	toggle (tag, type = 0, doclean, cleanFun, cleanData) { //toggle surounding of selection with 
		var el;
		if (tag?.nodeType) {//element
			el = tag;
			tag = tag.tagName.toLowerCase();
		} else el = document.createElement(tag); //tagname
		if (type === 0) {
			if (this.isWrappedWith(tag)) return this.undo(tag, cleanFun, cleanData);
			else return this.surround(el, doclean, cleanFun, cleanData)
		} else if (type === 1) {
			return this.surround(el, doclean, cleanFun, cleanData);
		} else if (type === 2) {
			return this.undo(tag, cleanFun, cleanData)
		}
	},
	removeFormat () {
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		var str = selection.toString();
		range.deleteContents();
		range.insertNode(new Text(str));
		return {success: true, type: 'remove-format'}
	},
	selectParagraph () {
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		var topnode = getWrapped('p');
		if (!topnode) return this.selectAll();
		range.selectNode(topnode);
		return {success: true, type: 'select'}
	},
	selectAll () {
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		var container = this.getContainer()
		range.setStart(container.firstChild, 0);
		range.setEnd(container.lastChild, container.lastChild.childNodes.length);
		return {success: true, type: 'select'}
	},
	//common text modifiers
	bold (type) {
		return this.toggle('b', type);
	},
	underline (type) {
		return this.toggle('u', type);
	},
	italic (type) {
		return this.toggle('i', type);
	},
	strikeThrough (type) {
		return this.toggle('s', type);
	},
	subscript (type) {
		return this.toggle('sub', type);
	},
	superscript (type) {
		return this.toggle('sup', type);
	},
	//colors 
	backColor (color) {
		return this.applyCss('background-color', color ? color : 'initial')
	},
	fontColor (color) {
		return this.applyCss('color', color ? color : 'initial')
	},
	//font
	fontName (name) {
		return this.applyCss('font-family', name ? name : 'initial')
	},
	fontSize (size) {
		return this.applyCss('font-size', size ? size : 'initial')
	},
	//embedings
	link (url, undo = false) {
		var el = document.createElement('a');
		el.href = url;
		if (undo && this.isWrappedWith('a')) return this.undo('a');
		else return this.surround(el)
	},
	img (url) {
		var el = document.createElement('img');
		el.src = url;
		return this.insert(el, 'node')
	},
	//containers
	heading (size=1, type) {
		return this.toggle('h' + size, type)
	},
	orderedList () {
		var result = this.surround(document.createElement('li'));
		var el = document.createElement('ol');
		result.node.before(el);
		el.append(result.node)
		return result;
	},
	unorderedList () {
		var result = this.surround(document.createElement('li'));
		var el = document.createElement('li');
		result.node.before(el);
		el.append(result.node);
		return result;
	},
	block (type) {
		return this.toggle('div', type);
	},
	inline (type) {
		return this.toggle('span', type);
	},
	paragraph (type) {
		return this.toggle('p', type);
	},
	
	//other text style
	indent (size) {
		this.selectParagraph();
		return this.applyCss('text-indent', size ? size : 'initial')
	},
	align (type) {
		this.selectParagraph();
		return this.applyCss('text-align', type ? type : 'initial', 'div')
	},
	
	//others
	hr () {
		return this.insert(document.createElement('hr'), 'node')
	},
}

globalThis.$edit = $edit;

export default $edit