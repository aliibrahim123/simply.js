//set:... actions handlers

var setActs = {
	'set:attr' (comp, act) { //simple
		comp.binder.addSet(act.prop, {type: 'attrBasic', el: act.el[0], attr: act.attr})
	},
	'set:attr-temp' (comp, act) {
		comp.binder.addSet(act.prop, {type: 'attr', el: act.el[0], attr: act.attr, temp: $comp.temps.parseAttr(act.temp, comp, act.el[0])})
	},
	'set:attr-call' (comp, act) {
		comp.binder.addSet(act.prop, {type: 'attrCall', el: act.el[0], attr: act.attr, fun: act.fun, args: act.args})
	},
	'set:text' (comp, act) {
		var el = act.el[0];
		el.childNodes.forEach(n=> {
			if (n.nodeType !== n.TEXT_NODE) return;
			var temp = $comp.temps.parseAttr(n.textContent, comp, el);
			comp.binder.addSet(act.prop, {type: 'text', el, node: n, temp})
		});
	},
	'set:html' (comp, act) {
		comp.binder.addSet(act.prop, {type: 'html', el: act.el[0]})
	},
	'set:if' (comp, act) {
		comp.binder.addSet(act.prop, {type: 'if', el: act.el[0], prop: act.prop, cond: act.cond})
	},
	'set:for' (comp, act) {
		comp.binder.addSet(act.prop, {type: 'for', el:act.el[0], mtype: act.mtype, stype: act.stype, args: act.args, onemptyEls: act.onemptyEls})
	}
};

export { setActs }