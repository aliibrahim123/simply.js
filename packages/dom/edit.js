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
	surround (wrapper, doclean = true, cleanFun, cleanData) {//surround selection by element, optinally clean
		if (!wrapper?.nodeType) throw new TypeError('edit: wrapper of type (' + wrapper?.constructor?.name + '), expected (Element)');
		
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//append selected elements into wrapper
		wrapper.append(...range.cloneContents().childNodes);
		range.deleteContents();
		
		//clean if possible
		if (doclean) clean(wrapper, wrapper.tagName, false, cleanFun, cleanData);
		
		//insert wrapper into selection
		range.insertNode(wrapper);
		
		return {success: true, type: 'surround', node: wrapper}
	},
	undo (tag, fun, cleanData) { //unsurround selection by tagname
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//extract nodes
		var nodes = range.cloneContents();
		range.deleteContents();
		
		//append nodes into temp
		var temp = document.createElement('span');
		temp.append(nodes);
		
		//clean
		clean(temp, tag, false, fun, cleanData);
		
		//insert temp into dom
		range.insertNode(temp);
		
		//if selection not wrapped with tagname, insert into dom and return
		var topNode = getWrapped(tag, fun);
		if (!topNode) {
			unwrap(temp);
			return {success: true, type: 'undo'}
		}
		
		//get parents until topNode
		var curNode = temp, pars = [curNode];//till topNode
		while (curNode !== topNode) {
			curNode = curNode.parentElement;
			pars.unshift(curNode);
		}
		
		//split parents at temp
		var lastClonedNode;
		pars.forEach((el, i) => {
			if (i === 0) return; //skip temp
			lastClonedNode = splitEl(el.parentElement, el.nextSibling, lastClonedNode);
		});
		
		//readd text modifiers for temp without the undo one
		var lastClonedPar = pars.reduce((par, el, i) => {
			//clone parents without topnode and append the selected nodes in the bottom one
			if (i === pars.length -1) return par;//skip topNode
			var cloned = el.cloneNode(false);
			if (par === topNode) par.after(cloned);
			else par.append(cloned);
			return cloned
		});
		
		//append temp
		if (lastClonedPar === topNode) topNode.after(temp);
		else lastClonedPar.append(temp);
		
		range.selectNode(lastClonedPar);//reselect the content
		unwrap(temp);
		
		return {success: true, type: 'undo'}
	},
	replace (topaste = '', type = 'text', unwrap = false) {//replace selection
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//delete content
		range.deleteContents();
		
		//handle insertion
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
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//handle insertion
		if (type === 'node') range.insertNode(toinsert);
		else {
			var el = document.createElement('span');
			if (type === 'text') el.innerText = toinsert;
			else if (type === 'html') el.innerHTML = toinsert;
			else throw new Error('edit: undefined insert type (' + type + ')');
			range.insertNode(el);
			if (unwrap) unwrap(el)
		}
		return {success: true, type: 'insert'}
	},
	toggle (tag, type = 0, doclean, cleanFun, cleanData) { //toggle surounding of selection with 
		//handle element
		var el;
		if (tag?.nodeType) {//element
			el = tag;
			tag = tag.tagName.toLowerCase();
		} else el = document.createElement(tag); //tagname
		
		if (type === 0) { //surround/undo
			if (this.isWrappedWith(tag)) return this.undo(tag, cleanFun, cleanData);
			else return this.surround(el, doclean, cleanFun, cleanData)
		} else if (type === 1) { //forced surround
			return this.surround(el, doclean, cleanFun, cleanData);
		} else if (type === 2) { //forced undo
			return this.undo(tag, cleanFun, cleanData)
		} else throw new Error('edit: toggle type is (' + type + '), expected 0, 1, or 2')
	},
	removeFormat () {
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//translate into string
		var str = selection.toString();
		
		//replace with text node
		range.deleteContents();
		range.insertNode(new Text(str));
		
		return {success: true, type: 'remove-format'}
	},
	selectParagraph () {
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//get node and select it or all
		var topnode = getWrapped('p');
		if (!topnode) return this.selectAll();
		range.selectNode(topnode);
		return {success: true, type: 'select'}
	},
	selectAll () {
		//get selection
		var selection = getSelection();
		if (!selection.rangeCount) return {success: false};
		var range = selection.getRangeAt(0);
		
		//get container and select it
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