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
		let {length} = a;
		if (length === b.length) {
			// eslint-disable-next-line curly
			while (length-- && equal(a[length], b[length])) ;
		}

		return length === -1;
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

	const forof = (a: any[], b: any[], equal: (a: any, b: any) => boolean) => {
		if (a.length !== b.length) {
			return false;
		}

		for (const [i, element] of a.entries()) {
			if (!equal(element, b[i])) {
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

	bench('forof equal', () => {
		forof(a, b, strictEqual);
	}, {time: 1000});
	bench('forof inequal', () => {
		forof(a, c, strictEqual);
	}, {time: 1000});
});

/*
   ✓ ArrayBuffer comparators (6) 22219ms
     name                                      hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · arrayComparator equal          12,114,927.79  0.0000  0.1074  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.09%  12114929
   · arrayComparator inequal        15,708,412.00  0.0000  0.2769  0.0001  0.0001  0.0001  0.0001  0.0001  ±0.18%  15708412
   · arrayBufferComparator equal    12,037,955.00  0.0000  0.7597  0.0001  0.0001  0.0001  0.0002  0.0002  ±0.20%  12037955
   · arrayBufferComparator inequal  15,738,921.00  0.0000  0.3089  0.0001  0.0001  0.0001  0.0001  0.0001  ±0.17%  15738921   fastest
   · bufferViewComparator equal      2,619,937.95  0.0003  0.4032  0.0004  0.0004  0.0004  0.0005  0.0006  ±0.35%   2619939   slowest
   · bufferViewComparator inequal    3,828,156.23  0.0002  0.2081  0.0003  0.0003  0.0003  0.0004  0.0005  ±0.22%   3828157

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

/*
   ✓ Map comparators (4) 5857ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · entriesIteration equal       1,155,421.42  0.0007  0.6233  0.0009  0.0008  0.0011  0.0014  0.0027  ±0.34%  1155422
   · entriesIteration inequal     2,092,715.00  0.0004  0.1124  0.0005  0.0005  0.0007  0.0007  0.0009  ±0.29%  2092715   fastest
   · keyGuardedIteration equal    1,016,810.00  0.0008  4.9140  0.0010  0.0010  0.0012  0.0015  0.0040  ±1.00%  1016810   slowest
   · keyGuardedIteration inequal  1,433,657.86  0.0006  0.1476  0.0007  0.0007  0.0009  0.0010  0.0014  ±0.24%  1433658
 */
describe('Map comparators', () => {
	const strictEqual = (a: any, b: any): boolean => a === b;

	const entriesIteration = (a: Map<any, any>, b: Map<any, any>, equal: (a: any, b: any) => boolean): boolean => {
		if (a.size !== b.size) {
			return false;
		}

		for (const [k, v] of a) {
			if (!b.has(k) || !equal(v, b.get(k))) {
				return false;
			}
		}

		return true;
	};

	const keyGuardedIteration = (a: Map<any, any>, b: Map<any, any>, equal: (a: any, b: any) => boolean) => {
		if (a.size !== b.size) {
			return false;
		}

		// avoid diving deep into the map values if the keys are different
		for (const i of a.keys()) {
			if (!b.has(i)) {
				return false;
			}
		}

		for (const entry of a.entries()) {
			if (!equal(entry[1], b.get(entry[0]))) {
				return false;
			}
		}

		return true;
	};

	const a = new Map(Array.from({length: 100}, (_, i) => [i, 2]));
	const b = new Map(Array.from({length: 100}, (_, i) => [i, 2]));
	const c = new Map(Array.from({length: 100}, (_, i) => [i, 2]));
	c.set(50, 1);

	bench('entriesIteration equal', () => {
		entriesIteration(a, b, strictEqual);
	}, {time: 1000});
	bench('entriesIteration inequal', () => {
		entriesIteration(a, c, strictEqual);
	}, {time: 1000});

	bench('keyGuardedIteration equal', () => {
		keyGuardedIteration(a, b, strictEqual);
	}, {time: 1000});
	bench('keyGuardedIteration inequal', () => {
		keyGuardedIteration(a, c, strictEqual);
	}, {time: 1000});
});

/*
   ✓ Set comparators (8) 47792ms
     name                                hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · difference equal         12,569,324.74  0.0000  0.1063  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.10%  12569326   slowest
   · difference inequal       23,735,366.00  0.0000  0.2325  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.15%  23735366
   · subsetOf equal           13,633,925.00  0.0000  0.4027  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.21%  13633925
   · subsetOf inequal         23,634,312.64  0.0000  0.3505  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.26%  23634315
   · iteration equal          21,418,580.86  0.0000  0.2170  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.13%  21418583
   · iteration inequal        23,379,696.66  0.0000  0.0972  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.10%  23379699
   · doubleIteration equal    22,169,491.00  0.0000  0.3412  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.18%  22169491
   · doubleIteration inequal  23,819,648.62  0.0000  1.6414  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.36%  23819651   fastest
 */
describe('Set comparators', () => {
	const difference = (a: Set<any>, b: Set<any>): boolean => {
		if (a.size !== b.size) {
			return false;
		}

		return a.intersection(b).size === a.size;
	};

	const subsetOf = (a: Set<any>, b: Set<any>): boolean => {
		if (a.size !== b.size) {
			return false;
		}

		return a.isSubsetOf(b);
	};

	const iteration = (a: Set<any>, b: Set<any>): boolean => {
		if (a.size !== b.size) {
			return false;
		}

		for (const i of a.values()) {
			if (!b.has(i)) {
				return false;
			}
		}

		return true;
	};

	// this one changes approach to comparing sets, requiring them to have same order,
	// which is kind of breaking the set concept
	const doubleIteration = (a: Set<any>, b: Set<any>): boolean => {
		if (a.size !== b.size) {
			return false;
		}

		const itA = a.values();
		const itB = b.values();

		for (const i of itA) {
			if (i !== itB.next().value) {
				return false;
			}
		}

		return true;
	};

	const a = new Set(Array.from({length: 100}, (_v, idx) => idx));
	const b = new Set(Array.from({length: 100}, (_v, idx) => idx));
	const c = new Set([
		...Array.from({length: 49}, (_v, idx) => idx),
		1,
		...Array.from({length: 50}, (_v, idx) => idx + 50),
	]);

	bench('difference equal', () => {
		difference(a, b);
	}, {time: 1000});
	bench('difference inequal', () => {
		difference(a, c);
	}, {time: 1000});

	bench('subsetOf equal', () => {
		subsetOf(a, b);
	}, {time: 1000});
	bench('subsetOf inequal', () => {
		subsetOf(a, c);
	}, {time: 1000});

	bench('iteration equal', () => {
		iteration(a, b);
	}, {time: 1000});
	bench('iteration inequal', () => {
		iteration(a, c);
	}, {time: 1000});

	bench('doubleIteration equal', () => {
		doubleIteration(a, b);
	}, {time: 1000});
	bench('doubleIteration inequal', () => {
		doubleIteration(a, c);
	}, {time: 1000});
});

/*
   ✓ Object comparators (4) 4933ms
     name                                hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · prototypeHOP equal          291,830.62  0.0032  0.4844  0.0034  0.0034  0.0037  0.0048  0.0066  ±0.46%   291831
   · prototypeHOP inequal      1,119,874.34  0.0007  0.6262  0.0009  0.0009  0.0011  0.0014  0.0018  ±0.58%  1120044   fastest
   · getOwnProperties equal      150,191.14  0.0060  0.3125  0.0067  0.0066  0.0077  0.0098  0.0129  ±0.41%   150192   slowest
   · getOwnProperties inequal    337,285.73  0.0026  0.3275  0.0030  0.0029  0.0036  0.0050  0.0092  ±0.46%   337286
 */
describe('Object comparators', () => {
	const strictEqual = (a: any, b: any): boolean => a === b;

	const hasOwn = (
		a: Record<any, any>,
		b: Record<any, any>,
		equal: (a: any, b: any) => boolean,
	): boolean => {
		let length = 0;

		for (const i in a) {
			// not own property (inherited)
			if (!Object.hasOwn(a, i)) {
				continue;
			}

			length++;

			if (!Object.hasOwn(b, i) || !equal(a[i], b[i])) {
				return false;
			}
		}

		return Object.keys(b).length === length;
	};

	const hasOwnWithReact = (
		a: Record<any, any>,
		b: Record<any, any>,
		equal: (a: any, b: any) => boolean,
		react = false,
	): boolean => {
		let length = 0;

		for (const i in a) {
			if (react && a.$$typeof && (i === '_owner' || i === '__v' || i === '__o')) {
				// In React and Preact these properties contain circular references
				// .$$typeof is just reasonable marker of element

				continue;
			}

			// not own property (inherited)
			if (!Object.hasOwn(a, i)) {
				continue;
			}

			length++;

			if (!Object.hasOwn(b, i) || !equal(a[i], b[i])) {
				return false;
			}
		}

		return Object.keys(b).length === length;
	};

	const objectKeys = (
		a: Record<any, any>,
		b: Record<any, any>,
		equal: (a: any, b: any) => boolean,
		react = false,
	): boolean => {
		const aKeys = Object.keys(a);

		for (const key of aKeys) {
			if (react && a.$$typeof && (key === '_owner' || key === '__v' || key === '__o')) {
				// In React and Preact these properties contain circular references
				// .$$typeof is just reasonable marker of element

				continue;
			}

			if (!Object.hasOwn(b, key) || !equal(a[key], b[key])) {
				return false;
			}
		}

		return Object.keys(b).length === aKeys.length;
	};

	const a: Record<number, number> = {};
	const b: Record<number, number> = {};
	const c: Record<number, number> = {};

	for (let i = 0; i < 100; i++) {
		a[i] = 2;
		b[i] = 2;
		c[i] = i % 50;
	}

	bench('hasOwn equal', () => {
		hasOwn(a, b, strictEqual);
	}, {time: 1000});
	bench('hasOwn inequal', () => {
		hasOwn(a, c, strictEqual);
	}, {time: 1000});

	bench('hasOwnWithReact equal', () => {
		hasOwnWithReact(a, b, strictEqual);
	}, {time: 1000});
	bench('hasOwnWithReact equal react enabled', () => {
		hasOwnWithReact(a, b, strictEqual, true);
	}, {time: 1000});

	bench('objectKeys equal', () => {
		objectKeys(a, b, strictEqual);
	}, {time: 1000});
	bench('objectKeys equal react enabled', () => {
		objectKeys(a, b, strictEqual, true);
	}, {time: 1000});
	bench('objectKeys inequal', () => {
		objectKeys(a, c, strictEqual);
	}, {time: 1000});
});
