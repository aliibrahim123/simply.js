//on:... actions handlers

import { handleListen } from '../listnerHndl.js';

var useOnActs = {
	'on:call' (comp, act) {
		handleListen(comp, act.el[0], (e) => comp.call(act.fun, ...act.args), act.events, act.modifs)
	},
	'on:set' (comp, act) {
		handleListen(comp, act.el[0], (e) => comp.set(act.prop, act.value), act.events, act.modifs)
	},
	'on:set-fun' (comp, act) {
		handleListen(comp, act.el[0], (e) => comp.model.setFn(act.prop, act.fun, true, act.value, act.args), act.events, act.modifs)
	},
	'on:set-attr' (comp, act) {
		handleListen(comp, act.el[0], (e) => comp.set(act.prop, comp.view.attr(act.el, act.attr)), act.events, act.modifs)
	},
	'on:set-attr-fun' (comp, act) {
		handleListen(comp, act.el[0], (e) => comp.model.setFn(act.prop, act.fun, false, comp.view.attr(act.el, act.attr), ...act.args), act.events, act.modifs)
	}
};

export { useOnActs }