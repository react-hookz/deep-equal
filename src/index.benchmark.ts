import {bench, describe, expect} from 'vitest';

/*
   ✓ constructor detection (5) 21974ms
     name                                      hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · instanceofMap                  23,871,761.23  0.0000  0.0746  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.14%  11935883   fastest
   · instanceofMap custom           23,285,757.34  0.0000  0.1779  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.20%  11642881
   · instanceofMap custom (parent)  22,873,165.43  0.0000  0.6809  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.39%  11436585   slowest
   · constructorComparison          23,775,881.24  0.0000  0.2351  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.22%  11887943
   · constructorComparison custom   23,753,986.00  0.0000  0.3845  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.29%  11876993
 */
describe('constructor detection', () => {
	class MyMap extends Map {
		has() {
			return true;
		}
	}

	const a = new Map();
	const b = new MyMap();

	expect(a).toBeInstanceOf(Map);
	expect(a.constructor).not.toEqual(b.constructor);
	expect(b).toBeInstanceOf(MyMap);
	expect(b).toBeInstanceOf(Map);

	bench('instanceofMap', () => {
		const _ = a instanceof Map;
	});
	bench('instanceofMap custom', () => {
		const _ = b instanceof MyMap;
	});
	bench('instanceofMap custom (parent)', () => {
		const _ = b instanceof Map;
	});
	bench('constructorComparison', () => {
		const _ = a.constructor === Map;
	});
	bench('constructorComparison custom', () => {
		const _ = b.constructor === MyMap;
	});
});

/*
   ✓ array detection (3) 11148ms
     name                              hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · instanceofArray        24,471,705.11  0.0000  0.1365  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.15%  12235855   fastest
   · constructorComparison  24,060,848.00  0.0000  0.3725  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.27%  12030424
   · instanceof             24,022,961.20  0.0000  0.4061  0.0000  0.0001  0.0001  0.0001  0.0001  ±0.35%  12011483   slowest
 */
describe('array detection', () => {
	const a: any[] = [];

	expect(a).toBeInstanceOf(Array);
	expect(a.constructor).toEqual(Array);

	bench('Array.isArray', () => {
		Array.isArray(a);
	});
	bench('constructorComparison', () => {
		const v = a.constructor === Array;
	});
	bench('instanceof', () => {
		// eslint-disable-next-line unicorn/no-instanceof-array
		const v = a instanceof Array;
	});
});
