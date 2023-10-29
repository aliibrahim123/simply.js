import { drop, dropRight, dropUntil, dropRightUntil } from '../../../lib/src/com/arr.js';

loadedFiles++;

var suite = $test.rootSuite.suites.com || $test.suite('com');
suite = suite.suites.com || suite.suite('com');
suite = suite.suites.drop || suite.suite('drop');

var test = suite.injectIntoContext().test;

test('argument validation', () => {
	var arr = [1,2,3,4,5];
	$expect(drop).to.throw(TypeError, '', '', 1);
	$expect(drop).to.throw(TypeError, '', '', arr, 'string');
	$expect(drop).to.throw(TypeError, '', '', arr, -1);
	$expect(dropRight).to.throw(TypeError, '', '', 1);
	$expect(dropRight).to.throw(TypeError, '', '', arr, 'string');
	$expect(dropRight).to.throw(TypeError, '', '', arr, -1);
	$expect(dropUntil).to.throw(TypeError, '', '', 1);
	$expect(dropUntil).to.throw(TypeError, '', '', arr, 'string');
	$expect(dropRightUntil).to.throw(TypeError, '', '', 1);
	$expect(dropRightUntil).to.throw(TypeError, '', '', arr, 'string');
})

test('drop', () => {
	var arr = [1,2,3,4,5];
	$expect(drop(arr, 2)).to.deeply.equal([3,4,5]);
	$expect(drop(arr, 10)).to.deeply.equal([]);
})

test('dropRight', () => {
	var arr = [1,2,3,4,5];
	$expect(dropRight(arr, 2)).to.deeply.equal([1,2,3]);
	$expect(dropRight(arr, 10)).to.deeply.equal([]);
})

test('dropUntil', () => {
	var arr = [1,2,3,4,5];
	$expect(dropUntil(arr, v => v === 3)).to.deeply.equal([3,4,5]);
	$expect(dropUntil(arr, v => false)).to.deeply.equal([]);
})

test('dropRightUntil', () => {
	var arr = [1,2,3,4,5];
	$expect(dropRightUntil(arr, v => v === 3)).to.deeply.equal([1,2,3]);
	$expect(dropRightUntil(arr, v => false)).to.deeply.equal([]);
})