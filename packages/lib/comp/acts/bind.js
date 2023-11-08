//bind:... actions handlers

var bindActs = {
	'bind:attr' (comp, act) { //simple
		comp.binder.addBind(act.prop, {type: 'attrBasic', el: act.el[0], attr: act.attr})
	},
	'bind:attr-temp' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'attr', el: act.el[0], attr: act.attr, temp: $comp.temps.parseAttr(act.temp, comp, act.el[0])})
	},
	'bind:attr-call' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'attrCall', el: act.el[0], attr: act.attr, fun: act.fun, args: act.args})
	},
	'bind:class-one' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'classOne', el: act.el[0], name: act.name})
	},
	'bind:class-all' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'classAll', el: act.el[0]})
	},
	'bind:style' (comp, act) {
		comp.binder.addBind(act.prop, 
			{type: 'style', el: act.el[0], prop: act.name, temp: act.temp && $comp.temps.parseAttr(act.temp, comp, act.el[0])}
		)
	},
	'bind:text' (comp, act) {
		var el = act.el[0];
		el.childNodes.forEach(n=> {
			if (n.nodeType !== n.TEXT_NODE) return;
			var temp = $comp.temps.parseAttr(n.textContent, comp, el);
			comp.binder.addBind(act.prop, {type: 'text', el, node: n, temp})
		});
	},
	'bind:html' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'html', el: act.el[0]})
	},
	'bind:if' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'if', el: act.el[0], prop: act.prop, cond: act.cond})
	},
	'bind:for' (comp, act) {
		comp.binder.addBind(act.prop, {type: 'for', el:act.el[0], mtype: act.mtype, stype: act.stype, args: act.args, onemptyEls: act.onemptyEls})
	}
};

export { bindActs }