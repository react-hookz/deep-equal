import {describe, expect, test} from 'vitest';
import {compareArrays, compareDataViews, compareDates, compareRegexps} from './comparators.js';

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

	describe('compareArrayBuffers', () => {
		test.each<{name: string; a: ArrayLike<any>; b: ArrayLike<any>; want: boolean}>([
			{name: 'empty buffers', a: new Uint8Array([]), b: new Uint8Array([]), want: true},
			{name: 'equal buffers', a: new Uint8Array([1, 2]), b: new Uint8Array([1, 2]), want: true},
			{name: 'inequal lengths', a: new Uint8Array([]), b: new Uint8Array([1]), want: false},
			{name: 'inequal elements', a: new Uint8Array([1]), b: new Uint8Array([2]), want: false},
			{
				name: 'inequal elements order',
				a: new Uint8Array([1, 2]),
				b: new Uint8Array([2, 1]),
				want: false,
			},
			{
				name: 'inequal sizes buffers',
				a: new Uint8Array([1, 2]),
				b: new Uint16Array([2, 1]),
				want: false,
			},
		])('$name', ({a, b, want}) => {
			expect(compareArrays(a, b, strictEqual)).toBe(want);
		});
	});

	describe('compareDataViews', () => {
		test.each<{name: string; a: DataView; b: DataView; want: boolean}>([
			{
				name: 'empty views',
				a: new DataView(new Uint8Array([]).buffer),
				b: new DataView(new Uint8Array([]).buffer),
				want: true,
			},
			{
				name: 'equal views',
				a: new DataView(new Uint8Array([2]).buffer),
				b: new DataView(new Uint8Array([0, 2]).buffer, 1),
				want: true,
			},
			{
				name: 'inequal byte size views',
				a: new DataView(new Uint8Array([2]).buffer),
				b: new DataView(new Uint16Array([2]).buffer),
				want: false,
			},
			{
				name: 'inequal lengths',
				a: new DataView(new Uint8Array([2]).buffer),
				b: new DataView(new Uint8Array([2, 1]).buffer),
				want: false,
			},
			{
				name: 'inequal elements order',
				a: new DataView(new Uint8Array([2, 1]).buffer),
				b: new DataView(new Uint8Array([2, 3]).buffer),
				want: false,
			},
			{
				name: 'inequal elements',
				a: new DataView(new Uint8Array([2, 3]).buffer),
				b: new DataView(new Uint8Array([2, 5]).buffer),
				want: false,
			},
		])('$name', ({a, b, want}) => {
			expect(compareDataViews(a, b)).toBe(want);
		});
	});
});
