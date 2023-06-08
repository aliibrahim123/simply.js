//pick/omit properties from Object

var checkProps = (props) => {
	if (!Array.isArray(props)) throw new TypeError('obj: props of type (' + props?.constructor?.name + '), expected (Array)');
}

export var pick = (obj, props) => {
	checkProps(props);
	var toreturn = {};
	props.forEach(prop => {
		toreturn[prop] = obj[prop]
	});
	return toreturn
};

export var pickTyped = (obj, props) => {//with prototype
	checkProps(props);
	var toreturn = Object.create(Object.getPrototypeOf(obj));
	props.forEach(prop => {
		toreturn[prop] = obj[prop]
	});
	return toreturn
};

export var omit = (obj, props) => {
	checkProps(props);
	var toreturn = {};
	for (let prop in obj) {
		if (!props.includes(prop)) toreturn[prop] = obj[prop]
	}
	return toreturn
}

export var omitTyped = (obj, props) => {//with prototype
	checkProps(props);
	var toreturn = Object.create(Object.getPrototypeOf(obj));
	Object.keys(obj).forEach(prop => {
		if (!props.includes(prop)) toreturn[prop] = obj[prop]
	});
	return toreturn
};