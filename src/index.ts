/* eslint-disable @typescript-eslint/no-use-before-define */

import {
  compareArrayBuffers,
  compareArrays,
  compareDataViews,
  compareDates,
  compareMaps,
  compareObjects,
  compareRegexps,
  compareSets,
} from './comparators';

const { valueOf, toString } = Object.prototype;

export function isEqual(a: any, b: any): boolean {
  // try to
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ctor = a.constructor;

    if (ctor !== b.constructor) return false;

    if (ctor === Array) return compareArrays(a, b, isEqual);

    if (ctor === Date) return compareDates(a, b);

    if (ctor === RegExp) return compareRegexps(a, b);

    if (ctor === Map) return compareMaps(a, b, isEqual);

    if (ctor === Set) return compareSets(a, b);

    if (ctor === DataView) return compareDataViews(a, b);

    if (ArrayBuffer.isView(a)) {
      return compareArrayBuffers(a as any, b as any);
    }

    if (a.valueOf !== valueOf) return a.valueOf() === b.valueOf();

    if (a.toString !== toString) return a.toString() === b.toString();

    return compareObjects(a, b, isEqual);
  }

  // true if both NaN, false otherwise
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b;
}
