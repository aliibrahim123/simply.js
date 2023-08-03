//base dom manipulation
//query and creation of elements

function $el (a, root = document) { //element creation or querieng
	if (!a) return [];
	if (!root?.querySelectorAll) throw new TypeError('el: root element of type (' + root?.constructor?.name + '), expected (Element) or (Document)');
	if (typeof a === 'string') {
		if (a.startsWith('<')) { //construct elements from string
			var temp = $el.tag('div');
			temp.innerHTML = a;
			return Array.from(temp.children)
		}
		return Array.from(root.querySelectorAll(a))
	} else if (a instanceof HTMLElement) { 
		return [a]
	} else if (Array.isArray(a)) {
		return a
	} else if ('length' in a) { //if arraylike
		return [...a]
	} else {
		return $el.obj(a)
	}
}

Object.assign($el, {
	tag: document.createElement.bind(document),
	obj (props = {}) { //element creation from object
		if (typeof props === 'string') return document.createTextNode(props);
		var {tag = 'div', text, classList, style, attr, event, children, ...others} = props;
		var el = $el.tag(tag);
		if (Array.isArray(classList)) {
			el.className = classList.join(' ')
		} else if (typeof classList === 'string') {
			el.className = classList
		}
		if (attr) {
			for (let name in attr) {
				el.setAttribute(name, attr[name])
			}
		}
		if (text) {
			el.innerText = text
		}
		if (style) {
			Object.assign(el.style, style)
		}
		if (event) {
			for (let name in event) {
				event[name].forEach(callback => el.addEventListener(name, callback))
			}
		}
		Object.assign(el, others);
		if (Array.isArray(children)) {
			children.forEach(obj => {el.append($el.obj(obj))})
		}
		return el
	}
});

globalThis.$el = $el;

export default $el