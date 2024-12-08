import {describe, expect, test} from 'vitest';
import {compareArrays, compareDates, compareRegexps} from './comparators.js';

const strictEqual = (a: any, b: any): boolean => a === b;

describe('comparators', () => {
	describe('compareDates', () => {
		test.each<{a: Date; b: Date; want: boolean}>([
			{a: new Date('2021-01-01'), b: new Date('2021-01-01'), want: true},
			{a: new Date('2021-01-01'), b: new Date('2021-01-02'), want: false},
		])('compareDates($a, $b) => $want', ({a, b, want}) => {
			expect(compareDates(a, b)).toBe(want);
		});
	});

	describe('compareRegexps', () => {
		test.each<{a: RegExp; b: RegExp; want: boolean}>([
			{a: /a/, b: /a/, want: true},
			{a: /a/g, b: /a/g, want: true},
			{a: /a/, b: /b/, want: false},
			{a: /a/g, b: /a/i, want: false},
		])('compareRegexps($a, $b) => $want', ({a, b, want}) => {
			expect(compareRegexps(a, b)).toBe(want);
		});
	});

	describe('compareArrays', () => {
		test.each<{name: string; a: any[]; b: any[]; want: boolean}>([
			{name: 'empty arrays', a: [], b: [], want: true},
			{name: 'equal arrays', a: [1, 2], b: [1, 2], want: true},
			{name: 'inequal lengths', a: [], b: [1], want: false},
			{name: 'inequal elements', a: [1], b: [2], want: false},
			{name: 'inequal elements order', a: [1, '2'], b: ['2', 1], want: false},
		])('$name', ({a, b, want}) => {
			expect(compareArrays(a, b, strictEqual)).toBe(want);
		});
	});
});
