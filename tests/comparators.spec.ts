import {
  compareArrayBuffers,
  compareArrays,
  compareDataViews,
  compareDates,
  compareMaps,
  compareObjects,
  compareObjectsReact,
  compareRegexps,
  compareSets,
} from '../src/comparators';

const strictEqual = (a: any, b: any) => a === b;

describe('comparators', () => {
  it('should correctly compare arrays', () => {
    expect(compareArrays([], [], strictEqual)).toBe(true);
    expect(compareArrays([1, 'a'], [1, 'a'], strictEqual)).toBe(true);
    expect(compareArrays([1, 'a'], ['a', 1], strictEqual)).toBe(false);
    expect(compareArrays([1, 'a'], [1, 2, 3], strictEqual)).toBe(false);
  });

  it('should correctly compare regexps', () => {
    expect(compareRegexps(/[a-c]+/, /[a-c]+/)).toBe(true);
    expect(compareRegexps(/[a-c]+/, /[a-d]+/)).toBe(false);
    expect(compareRegexps(/[a-c]+/, /[a-c]+/i)).toBe(false);
  });

  it('should correctly compare dates', () => {
    expect(compareDates(new Date('2021-01-01'), new Date('2021-01-01'))).toBe(true);
    expect(compareDates(new Date('2021-01-01'), new Date('2021-01-02'))).toBe(false);
  });

  it('should correctly compare maps', () => {
    expect(compareMaps(new Map<any, any>(), new Map<any, any>(), strictEqual)).toBe(true);
    expect(
      compareMaps(
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'bar'],
        ]),
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'bar'],
        ]),
        strictEqual
      )
    ).toBe(true);
    expect(
      compareMaps(
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'bar'],
        ]),
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'baz'],
        ]),
        strictEqual
      )
    ).toBe(false);
    expect(
      compareMaps(
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'bar'],
        ]),
        new Map<any, any>([
          [1, 'a'],
          ['bux', 'bar'],
        ]),
        strictEqual
      )
    ).toBe(false);
    expect(
      compareMaps(
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'bar'],
        ]),
        new Map<any, any>([
          [1, 'a'],
          ['foo', 'bar'],
          ['bux', 2],
        ]),
        strictEqual
      )
    ).toBe(false);
  });

  it('should correctly compare sets', () => {
    expect(compareSets(new Set(), new Set())).toBe(true);
    expect(compareSets(new Set<any>(['foo', 'bar']), new Set<any>(['foo', 'bar']))).toBe(true);
    expect(compareSets(new Set<any>(['foo', 'bar']), new Set<any>(['bar', 'foo']))).toBe(true);
    expect(compareSets(new Set<any>(['foo', 'bar']), new Set<any>(['foo', 2]))).toBe(false);
    expect(compareSets(new Set<any>(['foo', 'bar']), new Set<any>(['foo', 'bar', 1]))).toBe(false);
  });

  it('should correctly compare data views', () => {
    expect(
      compareDataViews(
        new DataView(new Uint16Array([]).buffer),
        new DataView(new Uint16Array([]).buffer)
      )
    ).toBe(true);
    expect(
      compareDataViews(
        new DataView(new Uint16Array([1, 2, 3]).buffer),
        new DataView(new Uint16Array([1, 2, 3]).buffer)
      )
    ).toBe(true);
    expect(
      compareDataViews(
        new DataView(new Uint16Array([1, 2, 3]).buffer),
        new DataView(new Uint16Array([1, 3, 3]).buffer)
      )
    ).toBe(false);
    expect(
      compareDataViews(
        new DataView(new Uint16Array([1, 2, 3]).buffer),
        new DataView(new Uint16Array([1, 2, 3, 4]).buffer)
      )
    ).toBe(false);
    expect(
      compareDataViews(
        new DataView(new Uint16Array([1, 2, 3]).buffer),
        new DataView(new Uint16Array([1, 3, 2]).buffer)
      )
    ).toBe(false);
  });

  it('should correctly compare array buffers', () => {
    expect(compareArrayBuffers(new Uint16Array([]), new Uint16Array([]))).toBe(true);
    expect(compareArrayBuffers(new Uint16Array([1, 2, 3]), new Uint16Array([1, 2, 3]))).toBe(true);
    expect(compareArrayBuffers(new Uint16Array([1, 2, 3]), new Uint16Array([1, 3, 3]))).toBe(false);
    expect(compareArrayBuffers(new Uint16Array([1, 2, 3]), new Uint16Array([1, 2, 3, 4]))).toBe(
      false
    );
    expect(compareArrayBuffers(new Uint16Array([1, 2, 3]), new Uint16Array([1, 3, 2]))).toBe(false);
    expect(compareArrayBuffers(new Uint16Array([1, 2, 3]), new Uint8Array([1, 3, 2]))).toBe(false);
  });

  it('should correctly compare objects', () => {
    expect(compareObjects({}, {}, strictEqual)).toBe(true);

    expect(
      compareObjects(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, foo: 'bar', bax: 'qux' },
        strictEqual
      )
    ).toBe(true);

    expect(
      compareObjects(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, bax: 'qux', foo: 'bar' },
        strictEqual
      )
    ).toBe(true);

    expect(
      compareObjects({ a: 1, foo: 'bar', bax: 'qux' }, { a: 1, bax: 'qux', foo: 2 }, strictEqual)
    ).toBe(false);

    expect(
      compareObjects(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, bax: 'qux', foo: 'bar', 2: 3 },
        strictEqual
      )
    ).toBe(false);

    expect(
      compareObjects(
        { a: 1, bax: 'qux', foo: 'bar', 2: 3 },
        { a: 1, foo: 'bar', bax: 'qux' },
        strictEqual
      )
    ).toBe(false);
  });

  it('should correctly compare react objects', () => {
    expect(compareObjects({}, {}, strictEqual)).toBe(true);
    expect(
      compareObjectsReact(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, foo: 'bar', bax: 'qux' },
        strictEqual
      )
    ).toBe(true);

    expect(
      compareObjectsReact(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, bax: 'qux', foo: 'bar' },
        strictEqual
      )
    ).toBe(true);

    expect(
      compareObjectsReact(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, bax: 'qux', foo: 2 },
        strictEqual
      )
    ).toBe(false);

    expect(
      compareObjectsReact(
        { a: 1, foo: 'bar', bax: 'qux' },
        { a: 1, bax: 'qux', foo: 'bar', 2: 3 },
        strictEqual
      )
    ).toBe(false);

    expect(
      compareObjectsReact(
        { a: 1, bax: 'qux', foo: 'bar', 2: 3 },
        { a: 1, foo: 'bar', bax: 'qux' },
        strictEqual
      )
    ).toBe(false);

    expect(
      compareObjectsReact(
        { a: 1, foo: 'bar', bax: 'qux', $$typeof: true, _owner: 1 },
        { a: 1, bax: 'qux', foo: 'bar', $$typeof: true, _owner: 2 },
        strictEqual
      )
    ).toBe(true);
  });
});
