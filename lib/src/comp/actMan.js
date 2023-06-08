//action manager
//defining and handling actions on elements

import { useCompActs } from './acts/useComp.js';
import { useBindActs } from './acts/useBind.js';
import { useSetActs } from './acts/useSet.js';
import { useOnActs } from './acts/useOn.js';

var actManager = {
	actions: {
		...useCompActs,
		...useBindActs,
		...useSetActs,
		...useOnActs
	},
	add (type, action) {
		if (typeof action !== 'function') throw new CompError('comp: action of type (' + (action?.constructor?.name || action) + '), expected (Function)');
		this.actions[type] = action
	},
	do (comp, action) {
		if (!comp?.isComp) throw new CompError('comp: component of type (' + comp?.constructor?.name + '), expected (@component)');
		if (!action?.type || !(action.type in this.actions)) throw new CompError('comp: undefined action type (' + action?.type + ')');
		this.actions[action.type](comp, action);
	}
}

export { actManager }