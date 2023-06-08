export var checkarr = (arr) => {
	if (!Array.isArray(arr)) throw new TypeError('arr: array of type (' + arr?.constructor?.name + '), expected (Array)')
}

export var checkfn = (fn) => {
	if (typeof fn !== 'function') throw new TypeError('arr: fn of type (' + fn?.constructor?.name + '), expected (Function)')
}