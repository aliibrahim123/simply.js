//edit utilities

export var unwrap = (el) => {
	if (!el?.nodeType) throw new TypeError('edit: element of type (' + el?.constructor?.name + '), expected (Element)');
	el.after(...el.childNodes);
	el.remove()
};

export var getContainer = () => { //get nearest parent with contenteditable in selection
	var selection = getSelection();
	if (!selection.rangeCount) return;
	var range = selection.getRangeAt(0);
	var curNode = range.startContainer;
	if (curNode.nodeType !== curNode.ELEMENT_NODE) curNode = curNode.parentElement;
	while (!curNode.hasAttribute('contenteditable')) {
		if (curNode === document.body) return;
		curNode = curNode.parentElement
	}
	return curNode
};

export var splitEl = (el, offsetEl, offsetPar) => {//split element at offset and appened them to a clone and optinally append the cloned one to another element
	if (!el?.nodeType) throw new TypeError('edit: element of type (' + el?.constructor?.name + '), expected (Element)');
	var cloneEl = el.cloneNode(false), doclone = false;
	[...el.childNodes].forEach(child => (doclone || (doclone = child === offsetEl)) && cloneEl.append(child));
	offsetPar ? offsetPar.prepend(cloneEl) : el.after(cloneEl);
	return cloneEl
};

export var getWrapped = (tag, fun) => {//get nearest parent having tagname in selection
	var selection = getSelection();
	if (!selection.rangeCount) return;
	var range = selection.getRangeAt(0);
	var container = getContainer();
	if (!container) return;
	var curNode = range.commonAncestorContainer;
	while (curNode !== container) {
		if (curNode.tagName === tag.toUpperCase() && (fun ? fun(curNode) : true)) return curNode;
		curNode = curNode.parentElement
	}
	return
};