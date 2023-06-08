//model functions

var modelFns = {
	toStr (model, value) {
		return String(value)
	},
	toJSON (model, value) {
		return JSON.stringify(value)
	},
	toBase64 (model, value) {
		return btoa(value)
	},
	toNb (model, value) {
		return Number(value)
	},
	toggle (model, value, checklist) {//toggle between chicklist
		if (!Array.isArray(checklist)) {
			model.comp.warn('model fn (toggle): checklist of type (' + checklist?.constructor?.name + '), expected (Array)');
			return value
		} else {
			if (checklist.length === 0) model.comp.warn('model fn (toggle): checklist is empty');
			var i = checklist.indexOf(value) + 1;
			return checklist[i > checklist.length -1 ? 0 : i]
		}
	},
	toggleBl (model, value) {
		return value ? false : true
	},
	inc (model, value, step = 1) {
		var n = Number(value);
		return isNaN(n) ? 0 : n + (step-0)
	},
	incMinMax (model, value, min = 0, max = 60, step = 1) {
		var n = Number(value);
		return isNaN(n) ? min : Math.max(Math.min(n + step, max), min)
	},
	incCircular (model, value, min = 0, max = 60, step = 1) {
		var n = Number(value);
		if (isNaN(n)) return min;
		var nb = n + step;
		var maxSmin = max - min;
		return (nb - min) % maxSmin + (nb < min ? min + maxSmin : min)
	},
	random (model, value, min = 0, max = 100, round = true) {
		var nb = Math.random() * (max - min) + min;
		return round ? Math.round(nb) : nb
	},
	min (model, value, min = 0) {
		var n = Number(value);
		return isNaN(n) ? min : Math.min(n, min)
	},
	max (model, value, max = 100) {
		var n = Number(value);
		return isNaN(n) ? max : Math.max(n, max)
	},
	minMax (model, value, min = 0, max = 100) {
		var n = Number(value);
		return isNaN(n) ? min : Math.max(min, Math.min(n, max))
	},
	circular (model, value, min = 0, max = 60) {
		var n = Number(value);
		if (isNaN(n)) return min;
		var maxSmin = max - min;
		return (n - min) % maxSmin + (n < min ? min + maxSmin : min)
	},
	round (model, value) {
		return Math.round(Number(value))
	},
	split (model, value, item) {
		if (!value?.split) {
			model.comp.warn('model fn (split): value does not has (split)');
			return value
		}
		return value.split(item)
	},
	replace (model, value, str1, str2) {
		if (!value?.replaceAll) {
			model.comp.warn('model fn (replace): value does not has (replaceAll)');
			return value
		}
		return value.replaceAll(str1, str2)
	},
	join (model, value, item) {
		if (!value?.join) {
			model.comp.warn('model fn (join): value does not has (join)');
			return value
		}
		return value.join(item)
	},
	//array operations
	push (model, value, item) {
		if (!value?.push) {
			model.comp.warn('model fn (push): value does not has (push)');
			return value
		}
		value.push(item)
		return {
			$hasMeta: true,
			value: value,
			meta: {'arr:op': 'add', force: true, ind: value.length -1, values: [item]}
		}
	},
	pop (model, value) {
		if (!value?.pop) {
			model.comp.warn('model fn (pop): value does not has (pop)');
			return value
		}
		if (value.length === 0) return value;
		value.pop();
		return {
			$hasMeta: true,
			value: value,
			meta: {'arr:op': 'delete', force: true, ind: value.length}
		}
	},
	unshift (model, value, item) {
		if (!value?.unshift) {
			model.comp.warn('model fn (unshift): value does not has (unshift)');
			return value
		}
		value.unshift(item)
		return {
			$hasMeta: true,
			value: value,
			meta: {'arr:op': 'add', force: true, ind: 0, values: [item]}
		}
	},
	shift (model, value) {
		if (!value?.shift) {
			model.comp.warn('model fn (shift): value does not has (shift)');
			return value
		}
		if (value.length === 0) return value;
		value.shift();
		return {
			$hasMeta: true,
			value: value,
			meta: {'arr:op': 'delete', force: true, ind: 0}
		}
	},
	arrSet (model, arr, value, at = 0) {
		if (!Array.isArray(arr)) {
			model.comp.warn('model fn (arrSet): property of type (' + arr?.constructor?.name + '), expected (Array)');
			return arr
		}
		if (arr.length <= at) model.comp.warn('model fn (arrSet): index ( ' + at + ' ) greater than length ( ' + arr.length + ' )');
		arr[at] = value;
		return {
			$hasMeta: true,
			value: arr,
			meta: {'arr:op': 'change', force: true, ind: at, values: [value]}
		}
	},
	arrIns (model, arr, value, at = 0) {
		if (!Array.isArray(arr)) {
			model.comp.warn('model fn (arrSet): property of type (' + arr?.constructor?.name + '), expected (Array)');
			return arr
		}
		if (arr.length < at) model.comp.warn('model fn (arrSet): index ( ' + at + ' ) greater than length ( ' + arr.length + ' )');
		arr.splice(at, 0, value);
		return {
			$hasMeta: true,
			value: arr,
			meta: {'arr:op': 'add', force: true, ind: at, values: [value]}
		}
	},
	arrDel (model, arr, at = 0) {
		if (!Array.isArray(arr)) {
			model.comp.warn('model fn (arrDel): property of type (' + arr?.constructor?.name + '), expected (Array)');
			return arr
		}
		if (arr.length <= at) model.comp.warn('model fn (arrDel): index ( ' + at + ' ) greater than length ( ' + arr.length + ' )');
		arr.splice(at, 1);
		return {
			$hasMeta: true,
			value: arr,
			meta: {'arr:op': 'delete', force: true, ind: at}
		}
	}
};

export { modelFns }