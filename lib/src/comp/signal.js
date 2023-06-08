//signal class
//bind component own properties to other components

class Signal {
	constructor (comp, opts, channels) {
		if (!comp?.isComp) throw new CompError('signal: component of type (' + comp?.constructor?.name + '), expected (@componnt)');
		this.comp = comp;
		this.channels = {};
		this.opts = {
			...this.constructor.defaults,
			...opts
		};
		this.add(channels);
		comp.on('model:propag', this.patch.bind(this))
	}
	static defaults = {
		fireOnAdd: true
	}
	patch (comp, model, name, prop, oldv, newv, meta) {
		if (this.channels[name]) this.channels[name].forEach(i=> i[0].set(i[1], newv))
	}
	add (comp, obj) {
		if (Array.isArray(comp)) comp.forEach(i=>this.add(i[0], i[1]));
		else {
			if (!comp?.isComp) {
				this.comp.warn('signal: component of type (' + comp?.constructor?.name + '), expected (@component)');
				return
			}
			for (let p in obj) {
				this.channels[p] ? (this.channels[p].push([comp, obj[p]])) : (this.channels[p] = [[comp, obj[p]]]);
				if (this.opts.fireOnAdd) comp.set(obj[p], this.comp.get(p))
			}
		}
	}
	remove (comp, prop) {
		if (comp?.isComp) {
			if (prop) {
				if (!this.channels[prop]) this.comp.warn('signal: undefined property (' + prop + ')')
				else this.channels[prop] = this.channels[prop].filter((i)=> i[0] !== comp)
			}
			else for (let chn in this.channels) {
				if (this.channels[chn]) this.channels[chn] = this.channels[chn].filter((i)=> i[0] !== comp)
			}
		} else {
			if (!this.channels[comp]) this.comp.warn('signal: undefined property (' + comp + ')')
			this.channels[comp] = undefined
		}
	}
}

export { Signal }