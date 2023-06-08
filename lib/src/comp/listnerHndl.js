//event listner handler

var handleListen = (comp, el, fun, events, modifiers, ...args) => {
	var preventD= modifiers.includes('preventdefaults'),
		once= modifiers.includes('once'),
		capture= modifiers.includes('capture'),
		passive= modifiers.includes('passive'),
		stopProp= modifiers.includes('stoppropagation'),
		self= modifiers.includes('self'),
		trusted= modifiers.includes('trusted');
	var fn = (e) => {
		if (trusted && !e.isTrusted) return;
		if (self && e.target !== el) return;
		if (preventD) e.preventDefault();
		if (stopProp) e.stopPropagation();
		fun(comp, el, e, ...args)
	}
	events.forEach(e=>el.addEventListener(e, fn, {once, capture, passive}))
}

export { handleListen }