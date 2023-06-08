//handle loop element handling

//array looping:
//	value is not an array: clear element
//	value is empty: clear element
//	value was empty: add all
//	else: apply patch
//patch handling:
//	main type = sub
//		add: append sub
//		remove: remove sub
//		change: replace sub
//	main type = comp
//		add: append component
//		delete: delete component
//		change: update component property
//	main type = collection
//		add: append component
//		delete: delete component
//		change: update component property
//		always reupdate the component property

var handleCreate = (comp, obj, val, ind, prop) => {
	if (obj.mtype === 'sub') comp.view.appendSub(obj.el, obj.stype, ind, val, ...obj.args);
	else if (obj.mtype === 'comp') {
		var child = new ($comp.get(obj.stype))(undefined, ...obj.args.slice(1));
		if (ind === obj.el.children.length) obj.el.append(child.el);
		else obj.el.children[ind].before(child.el)
		child.set(typeof val === 'object' ? val : (obj.args[0] || 'value'), val);
		comp.addChild(child)
	} else if (obj.mtype === 'collection') {
		var child = new ($comp.get(obj.stype))(undefined, ...obj.args.slice(1));
		if (ind === obj.el.children.length) obj.el.append(child.el);
		else obj.el.children[ind].before(child.el)
		child.set(typeof val === 'object' ? val : (obj.args[0] || 'value'), val);
		comp.addChild(child);
		obj.collection.add(child, ind)
	} else comp.warn('binder handler (for): undefined main type (' + obj.mtype + ')')
}

var handleDelete = (comp, obj, ind, prop) => {
	if (obj.mtype === 'sub') obj.el.children[ind].remove();
	else if (obj.mtype === 'comp') obj.el.children[ind].$comp.remove();
	else if (obj.mtype === 'collection') {//debugger
		obj.el.children[ind].$comp.remove();
		obj.collection.remove(ind)
	} else comp.warn('binder handler (for): undefined main type (' + obj.mtype + ')')
}

var handleChange = (comp, obj, val, ind, prop) => {
	if (obj.mtype === 'sub') {
		obj.el.children[ind].remove();
		comp.view.appendSub(obj.el, obj.stype, ind, val, ...obj.args);
	}
	else if (obj.mtype === 'comp') obj.el.children[ind].$comp.set(typeof val === 'object' ? val : (obj.args[0] || 'value'), val);
	else if (obj.mtype === 'collection') obj.collection.setOne(val, ind)
}

export { handleCreate, handleDelete, handleChange }