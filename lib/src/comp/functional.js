//functional api
//manage components in functional paradigm

var func = {
	currentComp: null,
	compStack: [],
	push (comp) {
		if (!comp.isComp) throw new CompError('comp: component of type (' + comp?.constructor?.name + '), expected (@component)');
		this.compStack.push(comp)
		this.currentComp = comp
	},
	pop () {
		this.compStack.pop();
		this.currentComp = this.compStack.length === 0 ? null : this.compStack[this.compStack.length -1]
	},
	getCur (dothrow = true) {
		if (!this.currentComp) {
			if (dothrow) throw new CompError('functional: component stack length is 0');
			return
		} else return this.currentComp
	},
	enableFor (fn) {
		return (comp, ...args) => {
			this.push(comp);
			fn(...args);
			this.pop()
		}
	},
	currentClass: null,
	createComp (createFn, initFn, superClass = Comp) {
		if (typeof createFn !== 'function') throw new CompError('functional: createFn of type (' + createFn?.constructor?.name + '), expected (Function)');
		if (typeof initFn !== 'function') throw new CompError('functional: initFn of type (' + initFn?.constructor?.name + '), expected (Function)');
		var cclass = class FComp extends superClass {
			init () {
				func.push(this);
				var data = initFn();
				if (data) this.set(data);
				func.pop();
				super.init()
			}
			static funs = {...superClass.funs}
			static defaults ={...superClass.defaults}
		}
		this.currentClass = cclass;
		var temp = createFn();
		cclass.defaults.view.temp = temp;
		this.currentClass = null;
		return cclass
	},
	useClass () {
		if (!this.currentClass) throw new CompError('functional: currentClass is not defined');
		return this.currentClass
	},
	useDefaults () {
		return this.useClass().defaults
	},
	setFun (name, fn) {
		this.useClass().funs[name] = this.enableFor(fn)
	},
	useComp () {
		return this.getCur()
	},
	useStore () {
		return this.getCur().model.toProxy()
	},
	useState (prop, value) {
		var comp = this.getCur(), wasset = false;
		if (value && !comp.has(prop)) comp.set(prop, value) && (wasset = true);
		return [
			wasset ? value : comp.get(prop),
			(value) => comp.set(prop, value),
			() => comp.get(prop)
		]
	},
	useEffect (prop, effect) {
		this.getCur().addEffect(prop, typeof effect === 'string' ? effect : this.enableFor(effect))
	},
	useEvent (event, fn) {
		this.getCur().on(event, this.enableFor(fn))
	},
	useTrigger (event, ...args) {
		this.getCur().trigger(event, ...args)
	},
	useSignal (comp, obj) {
		this.getCur().addSignal(comp, obj)
	},
	useCall (fun, ...args) {
		return this.getCur().call(fun, ...args)
	},
	useCallSafe (fun, ...args) {
		return this.getCur().callSafe(fun, ...args)
	},
	useRef (name) {
		return this.getCur().refs[name]
	},
	use$ (...args) {
		return this.getCur().view.$(...args)
	},
	useEl () {
		return this.getCur().el
	},
	useAttr (el, attr, value) {
		return this.getCur().view.attr(el, attr, value)
	}
}
//bind func as this for all methods, for destruction capapilities
for (let i in func) {
	if (func[i]?.bind) func[i] = func[i].bind(func)
} 

export { func }