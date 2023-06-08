//binder prehandlers

var prehandlers = {
	Array (comp, prop, oldv, newv, meta) {
		var nmeta,/* new meta */ oldarr = prop.meta['arr:old'];
		if (meta.set) nmeta = {...meta, 'arr:wasempty': true}; //is set
		else if ((!oldarr || oldarr.length === 0) && newv.length !== 0) nmeta = {...meta, 'arr:wasempty': true} //was not array or empty
		else if (meta['arr:op']) nmeta = {...meta, 'arr:patch': [{...meta, type: meta['arr:op']}]} //array operation
		else if (newv.length === 0) nmeta = {...meta, 'arr:empty': true} //empty
		else nmeta = {...meta, 'arr:patch': $diff.simple(oldarr, newv).map(i=>{return {...i, values: newv.slice(i.nind, i.nind + i.count)}})} //differencing
		prop.meta['arr:old'] = [...newv];
		nmeta.arr = true;
		return nmeta
	} 
};

export { prehandlers }