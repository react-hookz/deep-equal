/* eslint-disable @typescript-eslint/no-unsafe-return,no-restricted-syntax */
// eslint-disable-next-line max-classes-per-file
import { SuiteData } from '../runner';

class MyMap extends Map {}

class MySet extends Set {}

const emptyObj = {};

const skipBigInt = typeof BigInt === 'undefined';
const skipBigIntArray = typeof BigUint64Array === 'undefined';

function map(obj: Record<any, any>, Class?: any) {
  const a = new (Class || Map)();
  // eslint-disable-next-line guard-for-in
  for (const key in obj) a.set(key, obj[key]);
  return a;
}

function myMap(obj: Record<any, any>) {
  return map(obj, MyMap);
}

function set(arr: any[], Class?: any) {
  const a = new (Class || Set)();
  for (const value of arr) a.add(value);
  return a;
}

function mySet(arr: any[]) {
  return set(arr, MySet);
}

// eslint-disable-next-line import/no-default-export
export default [
  {
    description: 'bigint',
    tests: [
      {
        description: 'equal bigints',
        value1: skipBigInt || BigInt(1),
        value2: skipBigInt || BigInt(1),
        equal: true,
        skip: skipBigInt,
      },
      {
        description: 'not equal bigints',
        value1: skipBigInt || BigInt(1),
        value2: skipBigInt || BigInt(2),
        equal: false,
        skip: skipBigInt,
      },
    ],
  },

  {
    description: 'Maps',
    tests: [
      {
        description: 'empty maps are equal',
        value1: new Map(),
        value2: new Map(),
        equal: true,
      },
      {
        description: 'empty maps of different class are not equal',
        value1: new Map(),
        value2: new MyMap(),
        equal: false,
      },
      {
        description: 'equal maps (same key "order")',
        value1: map({ a: 1, b: '2' }),
        value2: map({ a: 1, b: '2' }),
        equal: true,
      },
      {
        description: 'not equal maps (same key "order" - instances of different classes)',
        value1: map({ a: 1, b: '2' }),
        value2: myMap({ a: 1, b: '2' }),
        equal: false,
      },
      {
        description: 'equal maps (different key "order")',
        value1: map({ a: 1, b: '2' }),
        value2: map({ b: '2', a: 1 }),
        equal: true,
      },
      {
        description: 'equal maps (different key "order" - instances of the same subclass)',
        value1: myMap({ a: 1, b: '2' }),
        value2: myMap({ b: '2', a: 1 }),
        equal: true,
      },
      {
        description: 'not equal maps (extra key)',
        value1: map({ a: 1, b: '2' }),
        value2: map({ a: 1, b: '2', c: [] }),
        equal: false,
      },
      {
        description: 'not equal maps (different key value)',
        value1: map({ a: 1, b: '2', c: 3 }),
        value2: map({ a: 1, b: '2', c: 4 }),
        equal: false,
      },
      {
        description: 'not equal maps (different keys)',
        value1: map({ a: 1, b: '2', c: 3 }),
        value2: map({ a: 1, b: '2', d: 3 }),
        equal: false,
      },
      {
        description: 'equal maps (same sub-keys)',
        value1: map({ a: [map({ b: 'c' })] }),
        value2: map({ a: [map({ b: 'c' })] }),
        equal: true,
      },
      {
        description: 'not equal maps (different sub-key value)',
        value1: map({ a: [map({ b: 'c' })] }),
        value2: map({ a: [map({ b: 'd' })] }),
        equal: false,
      },
      {
        description: 'not equal maps (different sub-key)',
        value1: map({ a: [map({ b: 'c' })] }),
        value2: map({ a: [map({ c: 'c' })] }),
        equal: false,
      },
      {
        description: 'empty map and empty object are not equal',
        value1: {},
        value2: new Map(),
        equal: false,
      },
      {
        description: 'map with extra undefined key is not equal #1',
        value1: map({}),
        value2: map({ foo: undefined }),
        equal: false,
      },
      {
        description: 'map with extra undefined key is not equal #2',
        value1: map({ foo: undefined }),
        value2: map({}),
        equal: false,
      },
      {
        description: 'maps with extra undefined keys are not equal #3',
        value1: map({ foo: undefined }),
        value2: map({ bar: undefined }),
        equal: false,
      },
      {
        description: 'null and empty map are not equal',
        value1: null,
        value2: new Map(),
        equal: false,
      },
      {
        description: 'undefined and empty map are not equal',
        value1: undefined,
        value2: new Map(),
        equal: false,
      },
      {
        description: 'map and a pseudo map are not equal',
        value1: map({}),
        value2: {
          constructor: Map,
          size: 0,
          has: () => true,
          get: () => 1,
        },
        equal: false,
      },
    ],
  },

  {
    description: 'Sets',
    tests: [
      {
        description: 'empty sets are equal',
        value1: new Set(),
        value2: new Set(),
        equal: true,
      },
      {
        description: 'empty sets of different class are not equal',
        value1: new Set(),
        value2: new MySet(),
        equal: false,
      },
      {
        description: 'equal sets (same value "order")',
        value1: set(['a', 'b']),
        value2: set(['a', 'b']),
        equal: true,
      },
      {
        description: 'not equal sets (same value "order" - instances of different classes)',
        value1: set(['a', 'b']),
        value2: mySet(['a', 'b']),
        equal: false,
      },
      {
        description: 'equal sets (different value "order")',
        value1: set(['a', 'b']),
        value2: set(['b', 'a']),
        equal: true,
      },
      {
        description: 'equal sets (different value "order" - instances of the same subclass)',
        value1: mySet(['a', 'b']),
        value2: mySet(['b', 'a']),
        equal: true,
      },
      {
        description: 'not equal sets (extra value)',
        value1: set(['a', 'b']),
        value2: set(['a', 'b', 'c']),
        equal: false,
      },
      {
        description: 'not equal sets (different values)',
        value1: set(['a', 'b', 'c']),
        value2: set(['a', 'b', 'd']),
        equal: false,
      },
      {
        description: 'not equal sets (different instances of objects)',
        value1: set(['a', {}]),
        value2: set(['a', {}]),
        equal: false,
      },
      {
        description: 'equal sets (same instances of objects)',
        value1: set(['a', emptyObj]),
        value2: set(['a', emptyObj]),
        equal: true,
      },
      {
        description: 'empty set and empty object are not equal',
        value1: {},
        value2: new Set(),
        equal: false,
      },
      {
        description: 'empty set and empty array are not equal',
        value1: [],
        value2: new Set(),
        equal: false,
      },
      {
        description: 'set with extra undefined value is not equal #1',
        value1: set([]),
        value2: set([undefined]),
        equal: false,
      },
      {
        description: 'set with extra undefined value is not equal #2',
        value1: set([undefined]),
        value2: set([]),
        equal: false,
      },
      {
        description: 'set and pseudo set are not equal',
        value1: new Set(),
        value2: {
          constructor: Set,
          size: 0,
          has: () => true,
        },
        equal: false,
      },
    ],
  },

  {
    description: 'Typed arrays',
    tests: [
      {
        description: 'two empty arrays of the same class are equal',
        value1: new Int32Array([]),
        value2: new Int32Array([]),
        equal: true,
      },
      {
        description: 'two empty arrays of the different class are not equal',
        value1: new Int32Array([]),
        value2: new Int16Array([]),
        equal: false,
      },
      {
        description: 'equal arrays',
        value1: new Int32Array([1, 2, 3]),
        value2: new Int32Array([1, 2, 3]),
        equal: true,
      },
      {
        description: 'equal BigUint64Array arrays',
        value1: skipBigIntArray || new BigUint64Array([1n, 2n, 3n]),
        value2: skipBigIntArray || new BigUint64Array([1n, 2n, 3n]),
        equal: true,
        skip: skipBigIntArray,
      },
      {
        description: 'not equal BigUint64Array arrays',
        value1: skipBigIntArray || new BigUint64Array([1n, 2n, 3n]),
        value2: skipBigIntArray || new BigUint64Array([1n, 2n, 4n]),
        equal: false,
        skip: skipBigIntArray,
      },
      {
        description: 'not equal arrays (same items, different class)',
        value1: new Int32Array([1, 2, 3]),
        value2: new Int16Array([1, 2, 3]),
        equal: false,
      },
      {
        description: 'not equal arrays (different item)',
        value1: new Int32Array([1, 2, 3]),
        value2: new Int32Array([1, 2, 4]),
        equal: false,
      },
      {
        description: 'not equal arrays (different length)',
        value1: new Int32Array([1, 2, 3]),
        value2: new Int32Array([1, 2]),
        equal: false,
      },
      {
        description: 'pseudo array and equivalent typed array are not equal',
        value1: { '0': 1, '1': 2, length: 2, constructor: Int32Array },
        value2: new Int32Array([1, 2]),
        equal: false,
      },
    ],
  },
  {
    description: 'Data views',
    tests: [
      {
        description: 'two empty views are equal',
        value1: new DataView(new Uint16Array([]).buffer),
        value2: new DataView(new Uint16Array([]).buffer),
        equal: true,
      },
      {
        description: 'equal views',
        value1: new DataView(new Uint16Array([1, 2, 3]).buffer),
        value2: new DataView(new Uint16Array([1, 2, 3]).buffer),
        equal: true,
      },
      {
        description: 'not equal views (different item)',
        value1: new DataView(new Uint16Array([1, 2, 3]).buffer),
        value2: new DataView(new Uint16Array([1, 3, 3]).buffer),
        equal: false,
      },
      {
        description: 'not equal views (different length)',
        value1: new DataView(new Uint16Array([1, 2, 3]).buffer),
        value2: new DataView(new Uint16Array([1, 2]).buffer),
        equal: false,
      },
    ],
  },
  {
    description: 'Array buffer',
    tests: [
      {
        description: 'two empty buffers',
        value1: new Uint16Array([]).buffer,
        value2: new Uint16Array([]).buffer,
        equal: true,
      },
      {
        description: 'equal buffers',
        value1: new Uint16Array([1, 2, 3]).buffer,
        value2: new Uint16Array([1, 2, 3]).buffer,
        equal: true,
      },
      {
        description: 'not equal buffers (different item)',
        value1: new Uint16Array([1, 2, 3]).buffer,
        value2: new Uint16Array([1, 3, 3]).buffer,
        equal: false,
      },
      {
        description: 'not equal buffers (different length)',
        value1: new Uint16Array([1, 2, 3]).buffer,
        value2: new Uint16Array([1, 2]).buffer,
        equal: false,
      },
    ],
  },
] as SuiteData;
