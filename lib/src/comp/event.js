//event emiter

class EventEmmiter {
	constructor (events = {}, addUndef = true, warn = 'warn') {
		this.events = events;
		this.warn = warn;
		this.addUndef = addUndef //add undefined event
	}
	add (name) {
		if (name in this.events) this.warn && console[this.warn]('event: adding defined event (' + name + ')');
		this.events[name] = [];
		return this
	}
	has (name) {
		return name in this.events
	}
	on (name, fn) {
		if (typeof name === 'object') {
			for (let e in name) {this.on(e, name[e])};
			return this
		}
		if (typeof fn !== 'function') {
			if (this.warn) console[this.warn]('event: value of type (' + (fn?.constructor?.name || fn) + '), expected (Function)');
			return this
		}
		if (name in this.events) this.events[name].push(fn);
		else if (this.addUndef) this.events[name] = [fn];
		else this.warn && console[this.warn]('event: udefined event (' + name + ')');
		return this
	}
	off (name, fn) {
		if (!(name in this.events)) this.warn && console[this.warn]('event: udefined event (' + name + ')');
		if (fn) this.events[name].splice(this.events[name].indexOf(fn), 1);
		else this.events[name] = [];
		return this
	}
	once (name, fn) {
		if (name in this.events) {
			var onceFn = (...args) => {
				fn(...args);
				this.off(name, onceFn)
			}
			this.on(name, onceFn)
		} else if (this.addUndef) this.events[name] = [fn];
		else this.warn && console[this.warn]('event: udefined event (' + name + ')');
		return this
	}
	trigger (name, ...args) {
		if (name in this.events) this.events[name].forEach(fn => fn(...args));
		else this.warn && console[this.warn]('event: udefined event (' + name + ')');
		return this
	}
}

export { EventEmmiter }