//bind:... attributes handlers
var bindHandler = {
	handle (comp, el, attrs) {
		attrs.forEach(attr=>{
			if (!attr.startsWith('bind(')) return;
			
			//split according to syntax: bind(...props):method:arg1
			var arg1, parenEnd = attr.indexOf(')'); //parenthesis end;
			var props = attr.slice(attr.indexOf('(')+1, parenEnd).split(',')
				.map(p => p.replaceAll(/-./g, s => s[1].toUpperCase()));
			var method = attr.slice(parenEnd + 2);
			if (method.includes(':')) [method, arg1] = method.split(':');
			
			if (!this.methods[method]) throw new CompError('bind:attrs: undefined method (' + method + ')');
			this.methods[method](comp, el, el.getAttribute(attr), props, attr, arg1 ? arg1.replaceAll(/--./g, (i)=>i[2].toUpperCase()) : undefined);
		})
		return true
	},
	methods: {
		'attr' (comp, el, value, prop, attr, arg1) {
			if (value) comp.doAct({type: 'bind:attr-temp', attr: arg1, prop, el, temp: value});
			else comp.doAct({type: 'bind:attr', el, prop, attr: arg1});
			el.removeAttribute(attr);
		},
		'attr-call' (comp, el, value, prop, attr, arg1) {
			var args = JSON.parse(value);
			comp.doAct({type: 'bind:attr-call', el, prop, attr: arg1, fun: args[0], args: args.slice(1)});
			el.removeAttribute(attr);
		},
		'class' (comp, el, value, prop, attr, arg1) {
			if (arg1) comp.doAct({type: 'bind:class-one', el, prop, name: arg1});
			else comp.doAct({type: 'bind:class-all', el, prop});
			el.removeAttribute(attr);
		},
		'style' (comp, el, value, prop, attr, arg1) {
			comp.doAct({type: 'bind:style', el, prop, name: arg1, temp: value});
			el.removeAttribute(attr);
		},
		'text' (comp, el, value, prop, attr) {
			comp.doAct({type: 'bind:text', el, prop});
			el.removeAttribute(attr);
		},
		'html' (comp, el, value, prop, attr) {
			comp.doAct({type: 'bind:html', el, prop});
			el.removeAttribute(attr);
		},
		'if' (comp, el, value, prop, attr) {
			comp.doAct({
				type: 'bind:if', el, prop, 
				cond: Function('comp', 'el', prop, value.includes(';') ? value : 'return ' + value), 
			});
			el.removeAttribute(attr);
		},
		'for' (comp, el, value, prop, attr, arg1) {
			var args = JSON.parse(value);
			comp.doAct({type: 'bind:for', el, prop, mtype: arg1, stype: args[0], args: args.slice(1), onemptyEls: Array.from(el.childNodes)});
			el.removeAttribute(attr)
		}
	}
};

export { bindHandler }