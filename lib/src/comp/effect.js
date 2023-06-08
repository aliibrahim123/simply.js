//effect class
//call functions on property change

class EffectEmmiter {
	constructor (comp, opts) {
		if (!comp?.isComp) throw new CompError('effect: component of type (' + comp?.constructor?.name + '), expected (@componnt)');
		this.comp = comp;
		this.effects = {...opts};
		comp.on('model:propag', this.patch.bind(this))
	}
	patch (comp, model, name, prop, oldv, newv, meta) {
		this.effects[name] && this.effects[name].forEach(e=>typeof e === 'string' ? comp.call(e, newv, oldv, prop, name, meta) : e(comp, newv, oldv, prop, name, meta))
	}
	add (name, fn) {
		if (typeof fn !== 'function' && typeof fn !== 'string') {
			this.comp.warn('effect: effect of type (' + fn?.constructor?.name + '), expected (Function)');
			return this
		}
		if (Array.isArray(name)) name.forEach(n=>this.add(n, fn));
		else if (name in this.effects) this.effects[name].push(fn)
		else this.effects[name] = [fn];
		return this
	}
	remove (name, fn) {
		if (fn) {
			if (this.effects[name]) this.effects[name] = this.effects[name].filter(e=>e!==fn);
			else this.comp.warn('effect: undefined property (' + name + ')')
		} else {
			if (this.effects[name]) this.effects[name] = undefined;
			else this.comp.warn('effect: undefined property (' + name + ')')
		}
		return this
	}
}

export { EffectEmmiter }