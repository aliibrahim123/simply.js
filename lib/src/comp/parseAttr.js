//attribut parsing and handling

//syntax:
//{prop}: property value
//{@ns:value}: value namespace
//{{expression}}: normal expression, append 'return' on need, called with (comp, model, el, value)
//{{#expression}}: precomputed normal expression, append 'return' on need, called with (comp, model, el, value)
//{$fun(...args)}: function call (fun) with args

//value namespace: computed values

var parse = (str, comp, el, value) => {
	var arr = str.split(parse.regex);
	var bytecode = [];
	arr.forEach(i=>{
		if (i==='') return; //empty, ignore
		else if (i.startsWith('{')) {
			if (i.startsWith('{{#')) return bytecode.push({//precomputed expression
				type: 'val',
				value: Function('comp', 'model', 'el', 'value', i.includes(';') ? i.slice(3,-2) : 'return ' + i.slice(3,-2))(comp, comp.model, el, value)
			});
			if (i.startsWith('{{')) return bytecode.push({//expression
				type:'exp', 
				fun: Function('comp', 'model', 'el', 'value', i.includes(';') ? i.slice(2,-2) : 'return ' + i.slice(2,-2))
			});
			if (i.startsWith('{$')) return bytecode.push(parse.parseFun(i.slice(2,-1))); //function call
			if (i.startsWith('{@')) return bytecode.push({type: 'vNS', value: i.slice(2, -1).split(':')}); //value namespace
			bytecode.push({type: 'prop', name: i.slice(1,-1)}) //property
		}
		else bytecode.push({type: 'val', value: i}) //static value
	})
	return bytecode
}

parse.regex = /({{[^{]+}}|{[^{]+})/;

parse.parseArg = (str) => {
	if (str[0] === '@') return str.slice(1).split(':'); //value namespace
	if (str === 'true') return true;
	if (str === 'false') return false;
	if (str === 'null') return null;
	if (str === 'undefined') return undefined;
	var n = Number(str);
	if (!isNaN(n)) return n;
	return str
}

parse.parseArgs = (str) => {
	return str.split(',').map(i=>i.trim()).map(parse.parseArg)
}

parse.parseFun = (str) => {
	var parts = str.trim().split('(');
	return {
		type: 'call',
		fun: parts[0].trim(),
		args: parse.parseArgs(parts[1].trimEnd().slice(0,-1))
	}
}

parse.valueNS = { 
	attr (comp, el, value, arg) {
		return comp.view.attr(el, arg[1])
	},
	prop (comp, el, value, arg) {
		return comp.get(arg[1])
	}
}

parse.handle = (str, comp, el, value) => { 
	if (!comp?.isComp) throw new CompError('parse attr: component of type (' + comp?.constructor?.name + '), expected (@component)');
	if (!el?.nodeType) throw new CompError('parse attr: element of type (' + el?.constructor?.name + '), expected (Element)');
	var arr = typeof str === 'string' ? parse(str, comp, el, value) : str;
	return arr.map(i=>{
		if (i.type === 'val') return i.value; //static value
		else if (i.type === 'prop') return comp.get(i.name); //property
		else if (i.type === 'exp') return i.fun(comp, comp.model, el, value); //expression
		else if (i.type === 'call') return parse.handleFun(i, comp, el, value); //function call
		else if (i.type === 'vNS') return parse.valueNS[i.value[0]](comp, el, value, i.value); //value namespace
		else throw new CompError('parse attr: undefined attribute expression type ('+i.type+')')
	}).join('')
}

parse.handleFun = (obj, comp, el, value) => {
	return comp.call(obj.fun, ...obj.args.map(i=> Array.isArray(i) ? parse.valueNS[i[0]](comp, el, value, i) : i))
}

export { parse }