/* eslint-disable unicorn/consistent-function-scoping */
import {bench, describe} from 'vitest';

/*
   ✓ RegExp comparators (2) 7178ms
     name                       hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · toString         2,692,505.46  0.0003  1.7709  0.0004  0.0004  0.0005  0.0006  0.0008  ±0.40%   2692506
   · sourceAndFlags  16,199,970.00  0.0000  0.1665  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.07%  16199970   fastest
 */
describe('RegExp comparators', () => {
	const toString = (a: RegExp, b: RegExp): boolean => a.toString() === b.toString();
	const sourceAndFlags = (a: RegExp, b: RegExp): boolean => a.source === b.source && a.flags === b.flags;

	bench('toString', () => {
		toString(/foo/, /foo/);
	}, {time: 1000});

	bench('sourceAndFlags', () => {
		sourceAndFlags(/foo/, /foo/);
	}, {time: 1000});
});

/*
   ✓ Array comparators (4) 15466ms
     name                          hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · whileLoop equal     8,462,886.15  0.0001  0.2138  0.0001  0.0001  0.0002  0.0002  0.0002  ±0.12%   8462887   slowest
   · whileLoop inequal  12,470,275.00  0.0000  0.2334  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.16%  12470275
   · forLoop equal       9,986,822.00  0.0000  0.3348  0.0001  0.0001  0.0002  0.0002  0.0002  ±0.13%   9986823
   · forLoop inequal    13,899,585.61  0.0000  0.2102  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.15%  13899587   fastest
 */
describe('Array comparators', () => {
	const strictEqual = (a: any, b: any): boolean => a === b;

	const whileLoop = (a: any[], b: any[], equal: (a: any, b: any) => boolean): boolean => {
		let l = a.length;
		if (l !== b.length) {
			return false;
		}

		// eslint-disable-next-line no-empty
		while (l-- && equal(a[l], b[l])) {}

		return l === -1;
	};

	const forLoop = (a: any[], b: any[], equal: (a: any, b: any) => boolean) => {
		if (a.length !== b.length) {
			return false;
		}

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < a.length; i++) {
			if (!equal(a[i], b[i])) {
				return false;
			}
		}

		return true;
	};

	const a = Array.from({length: 100}).fill(2);
	const b = Array.from({length: 100}).fill(2);
	const c = Array.from({length: 100}).fill(2);
	c[50] = 1;

	bench('whileLoop equal', () => {
		whileLoop(a, b, strictEqual);
	}, {time: 1000});
	bench('whileLoop inequal', () => {
		whileLoop(a, c, strictEqual);
	}, {time: 1000});

	bench('forLoop equal', () => {
		forLoop(a, b, strictEqual);
	}, {time: 1000});
	bench('forLoop inequal', () => {
		forLoop(a, c, strictEqual);
	}, {time: 1000});
});
