//chunk

import { checkarr } from './check.js';

export var chunk = (arr, size = 1) => {
	if (size < 1) throw new Error('arr: size is (' + size + '), expected non zero positive')
	checkarr(arr);
	var chunked = [];
	for (let i = 0; i < arr.length; i += size) {
		chunked.push(arr.slice(i, i + size))
	}
	return chunked
}