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

/*
   ✓ ArrayBuffer comparators (4) 18451ms
     name                                 hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · arrayComparator equal     12,138,214.79  0.0000  0.1537  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.10%  12138216   slowest
   · arrayComparator inequal   15,715,982.43  0.0000  0.2720  0.0001  0.0001  0.0001  0.0001  0.0001  ±0.20%  15715984
   · bufferComparator equal    12,214,531.00  0.0000  0.2237  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.13%  12214531
   · bufferComparator inequal  15,799,871.42  0.0000  0.2085  0.0001  0.0001  0.0001  0.0001  0.0001  ±0.15%  15799873   fastest

	Results of the benchmarks shows that there is no measurable difference between the
	array buffer and array comparison implementations, and there is no need in having two functions.
 */
describe('ArrayBuffer comparators', () => {
	const strictEqual = (a: any, b: any): boolean => a === b;

	const arrayComparator = (a: ArrayLike<any>, b: ArrayLike<any>, equal: (a: any, b: any) => boolean) => {
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

	const arrayBufferComparator = (a: ArrayLike<any>, b: ArrayLike<any>): boolean => {
		if (a.length !== b.length) {
			return false;
		}

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {
				return false;
			}
		}

		return true;
	};

	const bufferViewComparator = (a: ArrayBufferView, b: ArrayBufferView): boolean => {
		if (a.byteLength !== b.byteLength) {
			return false;
		}

		const adv = new DataView(a.buffer, a.byteOffset, a.byteLength);
		const bdv = new DataView(b.buffer, b.byteOffset, b.byteLength);

		for (let i = 0; i < a.byteLength; i++) {
			if (adv.getInt8(i) !== bdv.getInt8(i)) {
				return false;
			}
		}

		return true;
	};

	const a = new Uint32Array(100).fill(2);
	const b = new Uint32Array(100).fill(2);
	const c = new Uint32Array(100).fill(2);
	c[50] = 1;

	bench('arrayComparator equal', () => {
		arrayComparator(a, b, strictEqual);
	}, {time: 1000});
	bench('arrayComparator inequal', () => {
		arrayComparator(a, c, strictEqual);
	}, {time: 1000});

	bench('arrayBufferComparator equal', () => {
		arrayBufferComparator(a, b);
	}, {time: 1000});
	bench('arrayBufferComparator inequal', () => {
		arrayBufferComparator(a, c);
	}, {time: 1000});

	bench('bufferViewComparator equal', () => {
		bufferViewComparator(a, b);
	}, {time: 1000});
	bench('bufferViewComparator inequal', () => {
		bufferViewComparator(a, c);
	}, {time: 1000});
});
