//check fn and throw

export default function (fn) {
	if (typeof fn !== 'function') throw new TypeError('obj: fn of type (' + fn?.constructor?.name + '), expected (Function)')
}