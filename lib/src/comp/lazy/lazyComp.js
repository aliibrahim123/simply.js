//lazy comp class

export class LazyComp {
	isComp = true;
	static isCompClass = true;
	constructor(name, ...args) {
		this.name = name;
		this.args = args;
		this.fn = this.handle.bind(this);
		$comp.events.on('comp-added', this.fn)
	}
	trigger (name, ...args) {
		if (name === 'appended-to-parent') this.parent = args[0];
		else if (name === 'deleted-child') $comp.events.off('comp-added', this.fn);
		else throw new CompError('lazy comp: undefined event (' + name + ')')
	}
	handle (name, comp) {
		//this function is lister for 'comp-added'
		if (name !== this.name) return;
		$comp.events.off('comp-added', this.fn);
		
		if (!this.parent) throw new CompError('lazy comp: undefined parent');
		
		//create component and replace it with self
		var newComp = new comp(...this.args);
		this.parent.children[this.parent.children.indexOf(this)] = newComp;
		
		newComp.trigger('appended-to-parent', this.parent)
	}
}