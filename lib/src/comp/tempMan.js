//template manager
//defining templates and subs

import { parse } from './parseAttr.js';

var tempManager = {
	temps: {},
	subs: {},
	add (name, temp) {
		if (name in this.temps) $comp.opts.warn && console[$comp.opts.warn]('comp: adding defined template (' + name + ')');
		var els;
		if (typeof temp === 'string') {//constuct from html string
			els = $el(temp);
			this.temps[name] = () => {return {els: els.map(el => el.cloneNode(true)), acts: []}};
		} else if (temp?.nodeType === 1) this.temps[name] = () => {return {els: [...temp.cloneNode(true).childNodes], acts: []}}; //clone existing element 
		else this.temps[name] = temp;
		$comp.events.trigger('temp-added', name, this.temps[name])
	},
	has (name) {
		return name in this.temps
	},
	get (name) {
		if (!(name in this.temps)) throw new CompError('comp: undefined template');
		return this.temps[name]
	},
	getLazy (view, name) {
		var fn = (tname) => {debugger
			if (tname !== name) return;
			$comp.events.off('temp-added', fn)
			view.render();
			view.comp.waitingNb -= 1;
		};
		if (this.temps[name]) fn(name);
		else $comp.events.on('temp-added', fn)
	},
	addSub (name, sub) {
		if (name in this.subs) $comp.opts.warn && console[$comp.opts.warn]('comp: adding defined sub (' + name + ')');
		var els;
		if (typeof sub === 'string') {//constuct from html string
			els = $el(sub);
			this.subs[name] = {$isSub: true, fn() {return {el: els.map(el => el.cloneNode(true)), acts: []}}};
		} else if (sub?.nodeType === 1) this.subs[name] = {$isSub: true, fn() {return {el: [...sub.cloneNode(true).childNodes], acts: []}}}; //clone existing element
		else this.subs[name] = sub;
	},
	hasSub (name) {
		return name in this.subs
	},
	getSub (name) {
		if (!(name in this.subs)) throw new CompError('comp: undefined sub');
		return this.subs[name]
	},
	parseAttr: parse //attribute parsing
};

export { tempManager }